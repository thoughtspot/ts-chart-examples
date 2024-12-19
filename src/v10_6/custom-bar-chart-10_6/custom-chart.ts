/**
 * @file Custom Chart Implementation from chart.js library
 *
 * @fileoverview
 *
 * @author Chetan Agrawal <chetan.agrawal@thoughtspot.com>
 *
 * Copyright: ThoughtSpot Inc. 2023
 */

import {
  AppConfig,
  ChartColumn,
  ColumnProp,
  ChartConfig,
  ChartModel,
  ChartSdkCustomStylingConfig,
  ChartToTSEvent,
  ColumnType,
  CustomChartContext,
  DataPointsArray,
  getCfForColumn,
  getChartContext,
  getCustomCalendarGuidFromColumn,
  getFormattedValue,
  initGlobalize,
  isDateColumn,
  isDateNumColumn,
  PointVal,
  Query,
  ValidationResponse,
  VisualPropEditorDefinition,
  VisualProps,
} from "@thoughtspot/ts-chart-sdk";
import { ChartConfigEditorDefinition } from "@thoughtspot/ts-chart-sdk/src";
import {
  generateMapOptions,
  getDataFormatter,
} from "@thoughtspot/ts-chart-sdk/src/utils/formatting-util";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import _ from "lodash";
import {
  availableColor,
  getBackgroundColor,
  getPlotLinesAndBandsFromConditionalFormatting,
  visualPropKeyMap,
} from "./custom-chart.utils";
import {
  createPlotbandPlugin,
  createPlotlinePlugin,
} from "./custom-chart-plugins";

const logger = console;

const exampleClientState = {
  id: "chart-id",
  name: "custom-bar-chart",
  library: "chartJs",
};

Chart.register(ChartDataLabels);

let globalChartReference: Chart;
let appConfigGlobal: AppConfig;

const numberFormatter = (value) => {
  if (value > 1000000000) {
    return (value / 1000000000).toFixed(2) + "B";
  }
  if (value > 1000000) {
    return (value / 1000000).toFixed(2) + "M";
  }
  if (value > 1000) {
    return (value / 1000).toFixed(2) + "K";
  }
  return value;
};

function getDataForColumn(column: ChartColumn, dataArr: DataPointsArray) {
  const formatter = getDataFormatter(column, { isMillisIncluded: false });
  const idx = _.findIndex(dataArr.columns, (colId) => column.id === colId);
  const dataForCol = _.map(dataArr.dataValue, (row) => {
    const colValue = row[idx];
    return colValue;
  });
  const options = generateMapOptions(appConfigGlobal, column, dataForCol);
  const formattedValuesForData = _.map(dataArr.dataValue, (row) => {
    const colValue = row[idx];
    if (getCustomCalendarGuidFromColumn(column))
      return formatter(colValue.v.s, options);
    return formatter(colValue, options);
  });

  return formattedValuesForData;
}

function getColumnDataModel(
  configDimensions,
  dataArr: DataPointsArray,
  type,
  visualProps: VisualProps,
  customStyleConfig: ChartSdkCustomStylingConfig
) {
  // this should be handled in a better way
  const xAxisColumns = configDimensions?.[0].columns ?? [];
  const yAxisColumns = configDimensions?.[1].columns ?? [];

  return {
    getLabels: () => getDataForColumn(xAxisColumns[0], dataArr),
    getDatasets: () =>
      _.map(yAxisColumns, (col, idx) => {
        const coldata = getDataForColumn(col, dataArr);
        const CFforColumn = getCfForColumn(col);
        const axisId = `${type}-y${idx.toString()}`;
        const color = coldata.map((value, index) =>
          getBackgroundColor(
            customStyleConfig,
            visualProps,
            idx,
            dataArr,
            CFforColumn,
            index,
            col.id
          )
        );
        const { plotlines, plotbands } =
          getPlotLinesAndBandsFromConditionalFormatting(CFforColumn, axisId);
        const borderRadius =
          Number(visualProps?.columnVisualProps?.[col.id]?.borderRadius) || 2;
        const borderThickness =
          Number(visualProps?.columnVisualProps?.[col.id]?.borderThickness) ||
          2;
        return {
          label: col.name,
          data: coldata,
          yAxisID: axisId,
          type: `${type}`,
          backgroundColor: color,
          borderColor: "blue",
          borderRadius,
          borderWidth: borderThickness,
          // barThickness: 100,
          datalabels: {
            anchor: "end",
            align: "end",
            formatter: (value) => {
              return getFormattedValue(
                value,
                col.columnProperties.numberFormatting,
                col.format
              );
            },
          },
          plotlines,
          plotbands,
        };
      }),
    getScales: () =>
      _.reduce(
        yAxisColumns,
        (obj: any, _val, idx: number) => {
          // eslint-disable-next-line no-param-reassign
          obj[`${type}-y${idx.toString()}`] = {
            grid: {
              display: true,
            },
            position: idx === 0 ? "left" : "right",
            title: {
              display: true,
              text: `${_val.name}`,
            },
          };
          return obj;
        },
        {}
      ),
    getPointDetails: (xPos: number, yPos: number): PointVal[] => [
      {
        columnId: xAxisColumns[0].id,
        value: getDataForColumn(xAxisColumns[0], dataArr)[xPos],
      },
      {
        columnId: yAxisColumns[yPos].id,
        value: getDataForColumn(yAxisColumns[yPos], dataArr)[xPos],
      },
    ],
  };
}

function getDataModel(
  chartModel: ChartModel,
  customStyleConfig: ChartSdkCustomStylingConfig | undefined
) {
  // column chart model
  const columnChartModel = getColumnDataModel(
    chartModel.config?.chartConfig?.[0].dimensions ?? [],
    chartModel.data?.[0].data ?? ([] as any),
    "bar",
    chartModel.visualProps as any,
    customStyleConfig
  );

  return columnChartModel;
}

function getParsedEvent(evt: any) {
  return _.pick(evt.native, ["clientX", "clientY"]);
}

// To apply custom font, Note: chart url will need to be whitelisted for
// font-src for this to work and not through CORS error

function insertCustomFont(customFontFaces) {
  customFontFaces.forEach((it: any) => {
    const font = new FontFace(it.family, `url(${it.url})`);
    document.fonts.add(font);
  });
}

function render(ctx: CustomChartContext) {
  const chartModel = ctx.getChartModel();
  const appConfig = ctx.getAppConfig();
  appConfigGlobal = appConfig;
  initGlobalize(appConfig.localeOptions?.locale);
  if (
    appConfig?.styleConfig?.customFontFaces?.length &&
    appConfig?.styleConfig?.customFontFaces?.length > 0
  ) {
    insertCustomFont(appConfig.styleConfig?.customFontFaces);
  }
  const appColor = appConfig?.styleConfig?.appPanelColor?.color || "";
  const labelColor = _.get(
    chartModel.visualProps,
    visualPropKeyMap[1],
    availableColor[0]
  );
  const dataModel = getDataModel(chartModel, appConfig?.styleConfig);
  const allowLabels = _.get(chartModel.visualProps, visualPropKeyMap[2], false);
  if (!dataModel) {
    return;
  }

  try {
    const canvas = document.getElementById("chart") as any;
    // clear canvas.
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

    globalChartReference = new Chart(canvas as any, {
      type: "bar",
      data: {
        labels: dataModel.getLabels(),
        datasets: dataModel.getDatasets() as any,
      },
      options: {
        scales: dataModel.getScales(),
        animation: {
          duration: 0,
        },
        plugins: {
          // Change options for ALL labels of THIS CHART
          datalabels: {
            display: allowLabels,
            color: labelColor,
            labels: {
              title: {
                font: {
                  weight: "bold",
                  size: 12,
                  family: "Custom font",
                },
              },

              value: {
                color: appColor,
              },
            },
          },
        },
        // responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: "point",
          intersect: true,
        },
        onClick: (e: any) => {
          const activeElement = e.chart.getActiveElements()[0];
          const dataX = activeElement.index;
          const dataY = activeElement.datasetIndex;

          logger.info(
            "ChartPoint",
            dataX,
            dataY,
            dataModel.getPointDetails(dataX, dataY)
          );
          if (typeof chartModel?.visualProps === "object") {
            ctx.emitEvent(ChartToTSEvent.UpdateVisualProps, {
              visualProps: {
                ...chartModel?.visualProps,
                clientState: JSON.stringify({
                  x: dataX,
                  y: dataY,
                }),
              },
            });
          }
          ctx.emitEvent(ChartToTSEvent.OpenContextMenu, {
            event: getParsedEvent(e),
            clickedPoint: {
              tuple: dataModel.getPointDetails(dataX, dataY),
            },
          });
        },
      },
      plugins: [
        createPlotlinePlugin(dataModel),
        createPlotbandPlugin(dataModel),
      ],
    });
  } catch (e) {
    logger.error("renderfailed", e);
    throw e;
  }
}

const renderChart = async (ctx: CustomChartContext): Promise<void> => {
  if (globalChartReference) {
    globalChartReference.destroy();
  }
  try {
    ctx.emitEvent(ChartToTSEvent.RenderStart);
    render(ctx);
  } catch (e) {
    ctx.emitEvent(ChartToTSEvent.RenderError, {
      hasError: true,
      error: e,
    });
  } finally {
    ctx.emitEvent(ChartToTSEvent.RenderComplete);
  }
};

(async () => {
  const ctx = await getChartContext({
    getDefaultChartConfig: (chartModel: ChartModel): ChartConfig[] => {
      const cols = chartModel.columns;

      const measureColumns = _.filter(
        cols,
        (col) => col.type === ColumnType.MEASURE
      );

      const attributeColumns = _.filter(
        cols,
        (col) => col.type === ColumnType.ATTRIBUTE
      );

      const axisConfig: ChartConfig = {
        key: "column",
        dimensions: [
          {
            key: "x",
            columns: [attributeColumns[0]],
          },
          {
            key: "y",
            columns: measureColumns.slice(0, 2),
          },
        ],
      };
      return [axisConfig];
    },
    getQueriesFromChartConfig: (chartConfig: ChartConfig[]): Array<Query> => {
      const queries = chartConfig.map(
        (config: ChartConfig): Query =>
          _.reduce(
            config.dimensions,
            (acc: Query, dimension) => ({
              queryColumns: [...acc.queryColumns, ...dimension.columns],
            }),
            {
              queryColumns: [],
            } as Query
          )
      );
      return queries;
    },
    validateVisualProps: (visualProps: any, chartModel: any) => {
      if (visualProps?.tooltipconfig1?.columnIds?.length > 2) {
        return {
          isValid: false,
          validationErrorMessage: ["Invalid visual props"],
        };
      }
      return {
        isValid: true,
      };
    },
    renderChart: (ctx) => renderChart(ctx),
    chartConfigEditorDefinition: (
      currentChartConfig: ChartModel,
      ctx: CustomChartContext
    ): ChartConfigEditorDefinition[] => {
      const { config, visualProps } = currentChartConfig;

      const yColumns = config?.chartConfig?.[0]?.dimensions.find(
        (dimension) => dimension.key === "y" && dimension.columns
      );

      const configDefinition = [
        {
          key: "column",
          label: "Custom Column",
          descriptionText:
            "X Axis can only have attributes, Y Axis can only have measures, Color can only have attributes. " +
            "Should have just 1 column in Y axis with colors columns.",
          columnSections: [
            {
              key: "x",
              label: "Custom X Axis",
              allowAttributeColumns: true,
              allowMeasureColumns: false,
              allowTimeSeriesColumns: true,
              maxColumnCount: 10000,
            },
            {
              key: "y",
              label: "Custom Y Axis",
              allowAttributeColumns: false,
              allowMeasureColumns: true,
              allowTimeSeriesColumns: false,
            },
          ],
        },
      ];
      if (yColumns?.columns.length) {
        for (let i = 0; i < yColumns.columns.length; i++) {
          configDefinition[0].columnSections.push({
            key: `layers${i}`,
            label: `Measures layer${i}`,
            allowAttributeColumns: false,
            allowMeasureColumns: true,
            allowTimeSeriesColumns: false,
          });
        }
      }
      return configDefinition;
    },
    visualPropEditorDefinition: (
      currentVisualProps: ChartModel,
      ctx: CustomChartContext,
      activeColumnId: string
    ): VisualPropEditorDefinition => {
      const { visualProps, columns } = currentVisualProps;
      const measureColumns = _.filter(
        columns,
        (col) => col.type === ColumnType.MEASURE
      );

      const attributeColumns = _.filter(
        columns,
        (col) => col.type === ColumnType.ATTRIBUTE
      );

      console.warn(attributeColumns, measureColumns);

      const elements: any = [
        {
          key: "color",
          type: "radio",
          defaultValue: "red",
          values: ["red", "green", "yellow"],
          label: "Colors",
        },
        {
          key: "tooltipconfig1",
          type: "tooltipconfig",
          defaultValue: {
            columnIds: [],
          },
          label: "ToolTip",
        },
        {
          type: "section",
          key: "accordion",
          label: "Accordion",
          children: [
            {
              key: "datalabels",
              type: "toggle",
              defaultValue: false,
              label: "Data Labels",
            },
          ],
        },
      ];
      // This is lazy have proper checks for unknown types. We can do better.
      if ((visualProps as any)?.length !== 0) {
        if (
          (visualProps as any)?.accordion?.datalabels ||
          (visualProps as any)?.columnVisualProps?.[activeColumnId]?.accordion
            ?.datalabels
        ) {
          elements[1].children?.push({
            key: "Color2",
            type: "radio",
            defaultValue: "blue",
            values: ["blue", "white", "red"],
            label: "Color2",
          });
        }
      }
      const columnPropMeasure: ColumnProp = {
        type: ColumnType.MEASURE,
        columnSettingsDefinition: measureColumns.reduce(
          (prev: any, next: ChartColumn) => {
            prev[next.id] = {
              elements: [
                {
                  key: "borderRadius",
                  type: "radio",
                  defaultValue: "5",
                  values: ["5", "10", "15"],
                  label: "Border Radius",
                },
                {
                  key: "borderThickness",
                  type: "dropdown",
                  defaultValue: "2",
                  values: ["2", "4", "6", "8", "10", "12", "14", "16"],
                  label: "Border Thickness",
                },
              ],
            };
            return prev;
          },
          {}
        ),
      };
      const columnPropMeasure1: ColumnProp = {
        type: ColumnType.MEASURE,
        columnSettingsDefinition: measureColumns.reduce(
          (prev: any, next: ChartColumn) => {
            prev[next.id] = {
              elements: [
                {
                  key: "borderRadius",
                  type: "radio",
                  defaultValue: "5",
                  values: ["5", "10", "15"],
                  label: "Border Radius",
                },
                {
                  key: "borderThickness",
                  type: "dropdown",
                  defaultValue: "2",
                  values: ["2", "4", "6", "8", "10", "12", "14", "16"],
                  label: "Border Thickness",
                },
              ],
            };
            return prev;
          },
          {}
        ),
      };
      const columnPropAttribute: ColumnProp = {
        type: ColumnType.ATTRIBUTE,
        columnSettingsDefinition: attributeColumns.reduce(
          (prev: any, next: ChartColumn) => {
            prev[next.id] = {
              elements: [
                {
                  key: "borderRadius",
                  type: "radio",
                  defaultValue: "5",
                  values: ["5", "10", "15"],
                  label: "Border Radius",
                },
                {
                  key: "borderThickness",
                  type: "dropdown",
                  defaultValue: "2",
                  values: ["2", "4", "6", "8", "10", "12", "14", "16"],
                  label: "Border Thickness",
                },
                {
                  key: "datalabels",
                  type: "checkbox",
                  defaultValue: false,
                  label: "Datalabel",
                  disabled: false,
                },
              ],
            };
            return prev;
          },
          {}
        ),
      };
      return {
        elements,
        columnsVizPropDefinition: [columnPropMeasure],
      };
    },
    validateConfig: (updatedConfig, chartModel): ValidationResponse => {
      if (updatedConfig.length !== 1) {
        return {
          isValid: false,
          validationErrorMessage: ["invalid config. no config found"],
        };
      }
      // assuming 0 is x dimension
      const dimensions = updatedConfig[0].dimensions;
      if (
        dimensions[0].columns.length === 0 ||
        dimensions[1].columns.length === 0
      ) {
        return {
          isValid: false,
          validationErrorMessage: [
            "Invalid config. X or Y axis columns cannot be empty.",
          ],
        };
      }
      return {
        isValid: true,
      };
    },
    allowedConfigurations: {
      allowColumnConditionalFormatting: true,
      allowColumnNumberFormatting: true,
      allowMeasureNamesAndValues: true,
    },
    chartConfigParameters: {
      measureNameValueColumns: {
        enableMeasureNameColumn: true,
        enableMeasureValueColumn: true,
        measureNameColumnAlias: "Name",
        measureValueColumnAlias: "Value",
      },
      batchSizeLimit: 20000,
    },
  });

  renderChart(ctx);
})();
