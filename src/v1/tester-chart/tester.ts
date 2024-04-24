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
    ChartModel,
    ChartToTSEvent,
    ColumnType,
    CustomChartContext,
    DataPointsArray,
    getChartContext,
    PointVal,
    Query,
    ValidationResponse,
    VisualProps,
} from '@thoughtspot/ts-chart-sdk';
import Chart from 'chart.js/auto';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import _ from 'lodash';

Chart.register(ChartDataLabels);

let globalChartReference: Chart;

const availableColor = ['red', 'green', 'blue'];

const visualPropKeyMap: any = {
    0: 'color',
    1: 'accordion.Color2',
    2: 'accordion.datalabels',
};

function getDataForColumn(column: ChartColumn, dataArr: DataPointsArray) {
    const idx = _.findIndex(dataArr.columns, colId => column.id === colId);
    return _.map(dataArr.dataValue, row => row[idx]);
}

function getColumnDataModel(
    configDimensions: any,
    dataArr: DataPointsArray,
    type: string,
    visualProps: VisualProps | undefined,
) {
    // this should be handled in a better way
    const xAxisColumns = configDimensions?.[0].columns ?? [];
    const yAxisColumns = configDimensions?.[1].columns ?? [];

    return {
        getLabels: () => getDataForColumn(xAxisColumns[0], dataArr),
        getDatasets: () =>
            _.map(yAxisColumns, (col, idx: number) => ({
                label: col.name,
                data: getDataForColumn(col, dataArr),
                yAxisID: `${type}-y${idx.toString()}`,
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
            })),
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
    if (!chartModel.data) {
        return null;
    }
    // column chart model
    const columnChartModel = getColumnDataModel(
        chartModel.config?.chartConfig?.[0].dimensions ?? [],
        chartModel.data?.[0].data ?? ([] as any),
        'bar',
        chartModel.visualProps,
    );

    return columnChartModel;
}

function getParsedEvent(evt: any) {
    return _.pick(evt.native, ['clientX', 'clientY']);
}

function updateTMLString(ctx: CustomChartContext) {
    const tmlString =
        (document.getElementById('tml-string-input') as any).value ?? '';
    ctx.emitEvent(ChartToTSEvent.SetTMLString, {
        tmlString,
    });
}

async function renderTML(ctx: CustomChartContext) {
    // debugger;
    const data = await ctx.emitEvent(ChartToTSEvent.GetTMLString);
    const tmlBox: any = document.getElementById('tml-box');
    if (!!tmlBox && !!data) {
        // eslint-disable-next-line no-unsanitized/property
        tmlBox.innerHTML = `<div>
            <input id="tml-string-input" value="${data.data.tmlString}" />
            <button id="submit-button">Submit</button>
        </div>`;
    }
    document.getElementById('submit-button')?.addEventListener('click', () => {
        updateTMLString(ctx);
    });
}

async function renderKPIs(ctx: CustomChartContext) {
    const chartModel = ctx.getChartModel();
    const chartConfigs = chartModel.config.chartConfig ?? [];
    const queries = chartConfigs.map(
        (config: ChartConfig): Query =>
            _.reduce(
                config.dimensions,
                (acc: Query, dimension) => ({
                    queryColumns: [
                        ...acc.queryColumns,
                        ...dimension.columns,
                    ].filter(col => col.type === ColumnType.MEASURE),
                }),
                {
                    queryColumns: [],
                } as Query,
            ),
    );
    const res = await ctx.emitEvent(ChartToTSEvent.GetDataForQuery, {
        queries,
    });
    console.log('KPI DATA', res);
    const { columns, dataValue } = res.data[0].data;
    const kpiBox: any = document.getElementById('kpi-box');
    if (kpiBox) {
        const innerHTML = _.reduce(
            columns,
            (acc, colId, idx) => {
                const column = _.find(
                    chartModel.columns,
                    col => col.id === colId,
                );
                if (_.isNil(column)) return acc;
                return `${acc}<div>${column.name}: ${dataValue[0][idx]}</div>`;
            },
            '',
        );
        // eslint-disable-next-line no-unsanitized/property
        kpiBox.innerHTML = `
            <div>${innerHTML}</div>
        `;
    }
}

async function handleAxisMenuButtons(ctx: CustomChartContext) {
    document.getElementById('open-axis-menu')?.addEventListener('click', ev => {
        const chartModel = ctx.getChartModel();
        const colIds = chartModel.columns.map(col => col.id);

        ctx.emitEvent(ChartToTSEvent.OpenAxisMenu, {
            event: {
                clientX: ev.clientX,
                clientY: ev.clientY,
            },
            columnIds: colIds,
            customActions: [
                {
                    id: 'custom-axis-action',
                    label: 'Custom axis action',
                    icon: '',
                    onClick: (...arg) => {
                        console.log('custom axis action triggered', arg);
                    },
                },
            ],
        });
    });

    document
        .getElementById('open-single-column-menu')
        ?.addEventListener('click', ev => {
            const chartModel = ctx.getChartModel();
            const colIds = chartModel.columns.map(col => col.id).slice(0, 1);

            ctx.emitEvent(ChartToTSEvent.OpenAxisMenu, {
                event: {
                    clientX: ev.clientX,
                    clientY: ev.clientY,
                },
                columnIds: colIds,
            });
        });

    document
        .getElementById('close-axis-menu')
        ?.addEventListener('click', ev => {
            ctx.emitEvent(ChartToTSEvent.CloseAxisMenu);
        })

    document
        .getElementById('close-context-menu')
        ?.addEventListener('click', ev => {
            ctx.emitEvent(ChartToTSEvent.CloseContextMenu);
        });

    document
        .getElementById('show-event-error')
        ?.addEventListener('click', ev => {
            ctx.emitEvent(ChartToTSEvent.OpenAxisMenu, {
                event: {
                    clientX: ev.clientX,
                    clientY: ev.clientY,
                    x: ev.x,
                } as any,
                columnIds: [],
            });
        });

    document
        .getElementById('open-context-menu')
        ?.addEventListener('click', ev => {
            const chartModel = ctx.getChartModel();
            const colIds = chartModel.columns.map(col => col.id);
            ctx.emitEvent(ChartToTSEvent.OpenContextMenu, {
                event: {
                    clientX: ev.clientX,
                    clientY: ev.clientY,
                },
                clickedPoint: {
                    tuple: [
                        {
                            "columnId": colIds[0],
                            "value": "x"
                        },
                        {
                            "columnId": colIds[1],
                            "value": "y"
                        }
                    ],
                },
                customActions: [
                    {
                        id: 'custom-context-action',
                        label: 'Custom context action',
                        icon: '',
                        onClick: (...arg) => {
                            console.log('custom context action triggered', arg);
                        },
                    },
                ],
            });
        });
}

async function handleLiveboardContextSection(ctx: CustomChartContext) {
    const {isLiveboardContext = false} = ctx.getAppConfig().appOptions;
    document.getElementById('context-status').style.display = 'inline';
    document.getElementById('context-status').textContent += `${isLiveboardContext}`;
    document.getElementById('context-edit').style.opacity = isLiveboardContext ? '.4': '1';
}

async function handleLocaleInfo(ctx: CustomChartContext) {
    const {locale = window.navigator.language} = ctx.getAppConfig().localeOptions;
    document.getElementById('locale-info').style.display = 'inline';
    document.getElementById('locale-info').textContent += `${locale}`;
}

async function render(ctx: CustomChartContext) {
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

                    console.log(
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
        console.error('renderfailed', e);
        throw e;
    }
}

const renderChart = async (ctx: CustomChartContext): Promise<void> => {
    if (globalChartReference) {
        globalChartReference.destroy();
    }
    try {
        ctx.emitEvent(ChartToTSEvent.RenderStart);
        await renderTML(ctx);
        await renderKPIs(ctx);
        await handleAxisMenuButtons(ctx);
        await handleLiveboardContextSection(ctx);
        await handleLocaleInfo(ctx);
    } catch (e) {
        ctx.emitEvent(ChartToTSEvent.RenderError, {
            hasError: true,
            error: e?.message ?? 'Unknown Error',
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
                col => col.type === ColumnType.MEASURE,
            );

            const attributeColumns = _.filter(
                cols,
                col => col.type === ColumnType.ATTRIBUTE,
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
                                ...dimension.columns,
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
        ],
        visualPropEditorDefinition: {
            elements: [
                {
                    key: 'showError',
                    type: 'toggle',
                    defaultValue: false,
                    label: 'Show Error',
                },
            ],
        },
        validateConfig: (updatedConfig): ValidationResponse => {
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
        validateVisualProps: (updatedVisualProps: any) => {
            if (updatedVisualProps.showError === true) {
                return {
                    isValid: false,
                    validationErrorMessage: ['Change it to false again!'],
                }
            }
            return {
                isValid: true,
            }
        }
    });

    renderChart(ctx);
})();
