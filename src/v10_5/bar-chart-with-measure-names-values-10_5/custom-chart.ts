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
    ChartConfigDimension,
    ChartModel,
    ChartSpecificColumnType,
    ChartToTSEvent,
    ColumnType,
    CustomChartContext,
    DataPointsArray,
    getChartContext,
    PointVal,
    Query,
    VisualProps,
} from '@thoughtspot/ts-chart-sdk';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import _ from 'lodash';

const logger = console;

Chart.register(ChartDataLabels);

let globalChartReference: Chart;

const availableColor = ['red', 'green', 'blue'];

const visualPropKeyMap = {
    0: 'color',
    1: 'accordion.Color2',
    2: 'accordion.datalabels',
};

function getDataForxAxisColumn(column: ChartColumn, dataArr: DataPointsArray) {
    const idx = _.findIndex(dataArr.columns, colId => column.id === colId);
    // since we are using measure names and values, we will get duplicated entry
    // for x axis values, so we will use set to get unique values
    return [...new Set(_.map(dataArr.dataValue, row => row[idx]))];
}

// fetch data for regular columns
function getDataForColumn(column: ChartColumn, dataArr: DataPointsArray) {
    const idx = _.findIndex(dataArr.columns, colId => column.id === colId);
    return _.map(dataArr.dataValue, row => row[idx]);
}

// fetch data for measure value columns
function getDataForMeasureValuesColumn(
    column: ChartColumn,
    dataArr: DataPointsArray,
    measureValuesCol?: ChartColumn,
    measureNameCol?: ChartColumn,
) {
    // if measure Values column and measure name column is not present,
    // we cant parse the data
    if (measureValuesCol && measureNameCol) {
        const measureValue_idx = _.findIndex(
            dataArr.columns,
            colId => measureValuesCol.id === colId,
        );
        const measurename_idx = _.findIndex(
            dataArr.columns,
            colId => measureNameCol.id === colId,
        );
        const dataArrWithMeasureValues = _.filter(
            dataArr.dataValue,
            row => row[measurename_idx] === column.name,
        );
        return _.map(dataArrWithMeasureValues, row => row[measureValue_idx]);
    }

    const idx = _.findIndex(dataArr.columns, colId => column.id === colId);
    return _.map(dataArr.dataValue, row => row[idx]);
}

function getColumnDataModel(
    configDimensions: ChartConfigDimension[],
    dataArr: DataPointsArray,
    type,
    visualProps: VisualProps,
) {
    const xAxisColumns =
        configDimensions?.find(dimension => dimension.key === 'x')?.columns ??
        [];
    const yAxisColumns =
        configDimensions?.find(dimension => dimension.key === 'y')?.columns ??
        [];
    const measureValuesColumns =
        configDimensions?.find(dimension => dimension.key === 'measureValues')
            ?.columns ?? [];

    let yAxisColumnsIncludingMeauresValues: ChartColumn[] = [];
    let measureValueColumn;

    yAxisColumns.forEach(col => {
        if (
            xAxisColumns[0].chartSpecificColumnType !==
            ChartSpecificColumnType.MEASURE_NAMES &&
            col.chartSpecificColumnType ===
            ChartSpecificColumnType.MEASURE_VALUES
        ) {
            measureValueColumn = col;
            yAxisColumnsIncludingMeauresValues = yAxisColumnsIncludingMeauresValues.concat(
                measureValuesColumns,
            );
        } else {
            yAxisColumnsIncludingMeauresValues.push(col);
        }
    });
    const measureNameColumn = xAxisColumns.find(
        col =>
            col.chartSpecificColumnType ===
            ChartSpecificColumnType.MEASURE_NAMES,
    );

    const measureValuesColIds = _.map(measureValuesColumns, 'id');
    return {
        getLabels: () => getDataForxAxisColumn(xAxisColumns[0], dataArr),
        getDatasets: () => {
            const getYAxisId = col => {
                if (
                    measureValueColumn &&
                    measureValuesColIds.includes(col.id)
                ) {
                    return `${type}-y${measureValueColumn.id.toString()}`;
                }
                return `${type}-y${col.id.toString()}`;
            };
            return _.map(yAxisColumnsIncludingMeauresValues, (col, idx) => {
                return {
                    label: col.name,
                    data: !measureValuesColIds.includes(col.id)
                        ? getDataForColumn(col, dataArr)
                        : getDataForMeasureValuesColumn(
                            col,
                            dataArr,
                            measureValueColumn,
                            measureNameColumn,
                        ),
                    yAxisID: getYAxisId(col),
                    type: `${type}`,
                    backgroundColor: _.get(
                        visualProps,
                        visualPropKeyMap?.[idx],
                        availableColor[idx],
                    ),
                    borderColor: _.get(
                        visualProps,
                        visualPropKeyMap?.[idx],
                        availableColor[idx],
                    ),
                    datalabels: {
                        anchor: 'end',
                    },
                };
            });
        },
        getScales: () => {
            return _.reduce(
                yAxisColumns,
                (obj: any, _val, idx: number) => {
                    // eslint-disable-next-line no-param-reassign
                    obj[`${type}-y${_val.id.toString()}`] = {
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
            );
        },
        getPointDetails: (xPos: number, yPos: number): PointVal[] => {
            const yAxisColumn = yAxisColumnsIncludingMeauresValues[yPos];
            const yAxisDataArr = !measureValuesColIds.includes(yAxisColumn.id)
                ? getDataForColumn(yAxisColumn, dataArr)
                : getDataForMeasureValuesColumn(
                    yAxisColumn,
                    dataArr,
                    measureValueColumn,
                    measureNameColumn,
                );
            return [
                {
                    columnId: xAxisColumns[0].id,
                    value: getDataForColumn(xAxisColumns[0], dataArr)[xPos],
                },
                {
                    columnId: yAxisColumn.id,
                    value: yAxisDataArr[xPos],
                },
            ];
        },
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
        let canvas;
        if (ctx.containerEl) {
            canvas = document.createElement('canvas');
            canvas.style.cssText = 'width: 100%; height: 100%;';
            ctx.containerEl.appendChild(canvas);
        } else {
            canvas = document.getElementById('chart') as any;
        }

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
                        display: allowLabels,
                        color: 'blue',
                        labels: {
                            title: {
                                font: {
                                    weight: 'bold',
                                },
                            },
                            value: {
                                color: 'green',
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
        allowedConfigurations: {
            allowColumnConditionalFormatting: false,
            allowColumnNumberFormatting: false,
            allowMeasureNamesAndValues: true,
        },
        chartConfigParameters: {
            measureNameValueColumns: {
                enableMeasureNameColumn: true,
                enableMeasureValueColumn: true,
                measureNameColumnAlias: 'Measure Name',
                measureValueColumnAlias: 'Measure Value',
            },
        },

        getDefaultChartConfig: (chartModel: ChartModel): ChartConfig[] => {
            const cols = chartModel.columns;

            const measureNameCol = cols.find(
                col =>
                    col.chartSpecificColumnType ===
                    ChartSpecificColumnType.MEASURE_NAMES,
            );

            const measureValuesCol = cols.find(
                col =>
                    col.chartSpecificColumnType ===
                    ChartSpecificColumnType.MEASURE_VALUES,
            );

            const measureColumns = _.filter(
                cols,
                col => col.type === ColumnType.MEASURE,
            );

            const attributeColumns = _.filter(
                cols,
                col => col.type === ColumnType.ATTRIBUTE,
            );

            const xAxisColumns = measureNameCol
                ? [...attributeColumns.splice(0, 1), measureNameCol]
                : [attributeColumns[0]];
            const yAxisColumns = measureValuesCol
                ? [measureValuesCol]
                : measureColumns.slice(0, 3);
            const measureValuesAxisColumns = measureValuesCol
                ? measureColumns.slice(0, 3)
                : [];

            // add measure name in x axis
            // add measure values column in y axis
            // add all measures in measureValues key
            const axisConfig: ChartConfig = {
                key: 'column',
                dimensions: [
                    {
                        key: 'x',
                        columns: xAxisColumns,
                    },
                    {
                        key: 'y',
                        columns: yAxisColumns,
                    },
                    {
                        key: 'measureValues',
                        columns: measureValuesAxisColumns,
                    },
                ],
            };
            return [axisConfig];
        },
        getQueriesFromChartConfig: (
            chartConfig: ChartConfig[],
        ): Array<Query> => {
            const queries = chartConfig.map(
                (config: ChartConfig): Query =>
                    _.reduce(
                        config.dimensions,
                        (acc: Query, dimension) => ({
                            queryColumns: [
                                ...acc.queryColumns,
                                ...dimension.columns.map(col => {
                                    return {
                                        ...col,
                                        isMeasureValue:
                                            dimension.key === 'measureValues',
                                    };
                                }),
                            ],
                        }),
                        {
                            queryColumns: [],
                        } as Query,
                    ),
            );
            return queries;
        },
        renderChart: ctx => renderChart(ctx),
        chartConfigEditorDefinition: [
            {
                key: 'column',
                label: 'Custom Column',
                descriptionText:
                    'X Axis can only have 1 attribute and measure name, Y Axis can only have measures and measure value. ' +
                    'Custom measure values should have atleast 1 measure column.' +
                    'measure name column and measure value column is mandatory.',
                columnSections: [
                    {
                        key: 'x',
                        label: 'Custom X Axis',
                        allowAttributeColumns: true,
                        allowMeasureColumns: false,
                        allowTimeSeriesColumns: true,
                        allowMeasureNameColumn: true,
                        allowMeasureValueColumn: false,
                        maxColumnCount: 2,
                    },
                    {
                        key: 'y',
                        label: 'Custom Y Axis',
                        allowAttributeColumns: false,
                        allowMeasureColumns: true,
                        allowTimeSeriesColumns: false,
                        allowMeasureNameColumn: false,
                        allowMeasureValueColumn: true,
                    },
                    {
                        key: 'measureValues',
                        label: 'Custom measure values',
                        allowAttributeColumns: false,
                        allowMeasureColumns: true,
                        allowTimeSeriesColumns: false,
                        allowMeasureNameColumn: false,
                        allowMeasureValueColumn: false,
                    },
                ],
            },
        ],
        visualPropEditorDefinition: {
            elements: [
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
                            key: 'Color2',
                            type: 'radio',
                            defaultValue: 'blue',
                            values: ['blue', 'white', 'red'],
                            label: 'Color2',
                        },
                        {
                            key: 'datalabels',
                            type: 'toggle',
                            defaultValue: false,
                            label: 'Data Labels',
                        },
                    ],
                },
            ],
        },
    });

    renderChart(ctx);
})();
