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
    ChartColumn,
    ChartConfig,
    ChartConfigEditorDefinition,
    ChartModel,
    ChartToTSEvent,
    ColumnType,
    CustomChartContext,
    DataPointsArray,
    getCfForColumn,
    getChartContext,
    PointVal,
    Query,
    ValidationResponse,
    VisualPropEditorDefinition,
    VisualProps,
} from '@thoughtspot/ts-chart-sdk';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import _ from 'lodash';
import { getBackgroundColor, getPlotLinesAndBandsFromConditionalFormatting, visualPropKeyMap } from './custom-chart.utils';
import { createPlotbandPlugin, createPlotlinePlugin } from './custom-chart-plugins';

const logger = console;

Chart.register(ChartDataLabels);

let globalChartReference: Chart;

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
    const idx = _.findIndex(dataArr.columns, colId => column.id === colId);
    return _.map(dataArr.dataValue, row => row[idx]);
}

function getColumnDataModel(
    configDimensions,
    dataArr: DataPointsArray,
    type,
    visualProps: VisualProps,
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
                      null,
                      visualProps,
                      idx,
                      dataArr,
                      CFforColumn,
                      index,
                      col.id,
                  ),
              );
              const { plotlines, plotbands } =
                  getPlotLinesAndBandsFromConditionalFormatting(
                      CFforColumn,
                      axisId,
                  );

              return {
                  label: col.name,
                  data: coldata,
                  yAxisID: axisId,
                  type: `${type}`,
                  backgroundColor: color,
                  borderColor: color,
                  datalabels: {
                      anchor: 'end',
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
                        position: idx === 0 ? 'left' : 'right',
                        title: {
                            display: true,
                            text: `${_val.name}`,
                        },
                    };
                    return obj;
                },
                {},
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

function getDataModel(chartModel: ChartModel) {
    // column chart model
    const columnChartModel = getColumnDataModel(
        chartModel.config?.chartConfig?.[0].dimensions ?? [],
        chartModel.data?.[0].data ?? ([] as any),
        'bar',
        chartModel.visualProps as any,
    );

    return columnChartModel;
}

function getParsedEvent(evt: any) {
    return _.pick(evt.native, ['clientX', 'clientY']);
}

function render(ctx: CustomChartContext) {
    const chartModel = ctx.getChartModel();
    const dataModel = getDataModel(chartModel);
    const allowLabels = _.get(
        chartModel.visualProps,
        visualPropKeyMap[2],
        false,
    );
    if (!dataModel) {
        return;
    }

    try {
        const canvas = document.getElementById('chart') as any;
        // clear canvas.
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        globalChartReference = new Chart(canvas as any, {
            type: 'bar',
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
                        display: allowLabels? "auto" : false,
                        formatter: (value) => numberFormatter(value),
                        color: "blue",
                        textStrokeColor: "white",
                        textStrokeWidth: 5,
                        labels: {
                          title: {
                            font: {
                              weight: "bold",
                            },
                          },
                          value: {
                            color: "black",
                          },
                        },
                    },
                },
                // responsive: true,
                maintainAspectRatio: false,
                interaction: {
                    mode: 'point',
                    intersect: true,
                },
                onClick: (e: any) => {
                    const activeElement = e.chart.getActiveElements()[0];
                    const dataX = activeElement.index;
                    const dataY = activeElement.datasetIndex;

                    logger.info(
                        'ChartPoint',
                        dataX,
                        dataY,
                        dataModel.getPointDetails(dataX, dataY),
                    );
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
        logger.error('renderfailed', e);
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
          key: 'column',
          dimensions: [
            {
              key: 'x',
              columns: [attributeColumns[0]],
            },
            {
              key: 'y',
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
      renderChart: (ctx) => renderChart(ctx),
      chartConfigEditorDefinition: (
        currentChartConfig: ChartModel,
        ctx: CustomChartContext
      ): ChartConfigEditorDefinition[] => {
        const { config, visualProps } = currentChartConfig;

        const yColumns = config?.chartConfig?.[0]?.dimensions.find(
          (dimension) => dimension.key === 'y' && dimension.columns
        );

        const configDefinition = [
          {
            key: 'column',
            label: 'Custom Column',
            descriptionText:
              'X Axis can only have attributes, Y Axis can only have measures, Color can only have attributes. ' +
              'Should have just 1 column in Y axis with colors columns.',
            columnSections: [
              {
                key: 'x',
                label: 'Custom X Axis',
                allowAttributeColumns: true,
                allowMeasureColumns: false,
                allowTimeSeriesColumns: true,
                maxColumnCount: 1,
              },
              {
                key: 'y',
                label: 'Custom Y Axis',
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
        ctx: CustomChartContext
      ): VisualPropEditorDefinition => {
        const { visualProps } = currentVisualProps as any;
        const elements: any = [
          {
            key: 'color',
            type: 'radio',
            defaultValue: 'red',
            values: ['red', 'green', 'yellow'],
            label: 'Colors',
          },
          {
            type: 'section',
            key: 'accordion',
            label: 'Accordion',
            children: [
              {
                key: 'datalabels',
                type: 'toggle',
                defaultValue: false,
                label: 'Data Labels',
              },
            ],
          },
        ];
        if (visualProps?.length !== 0) {
          if (visualProps?.accordion?.datalabels) {
            elements[1].children?.push({
              key: 'Color2',
              type: 'radio',
              defaultValue: 'blue',
              values: ['blue', 'white', 'red'],
              label: 'Color2',
            });
          }
        }
        return { elements };
      },
      validateConfig: (updatedConfig, chartModel): ValidationResponse => {
        if (updatedConfig.length !== 1) {
          return {
            isValid: false,
            validationErrorMessage: ['invalid config. no config found'],
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
              'Invalid config. X or Y axis columns cannot be empty.',
            ],
          };
        }
        return {
          isValid: true,
        };
      },
      allowedConfigurations: {
        allowColumnConditionalFormatting: true,
      },
    });

    renderChart(ctx);
})();
