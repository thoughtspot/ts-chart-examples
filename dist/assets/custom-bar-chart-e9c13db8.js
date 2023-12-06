import{g as p,C as m,l as s,a as g}from"./index-ae8788bc.js";import"./auto.esm-c3926bfe.js";import{C as b,p as v}from"./chartjs-plugin-datalabels.esm-3e57def8.js";const h=console;b.register(v);let C;const y=["red","green","blue"],u={0:"color",1:"accordion.Color2",2:"accordion.datalabels"};function d(e,t){const l=s.findIndex(t.columns,a=>e.id===a);return s.map(t.dataValue,a=>a[l])}function E(e,t,l,a){const o=(e==null?void 0:e[0].columns)??[],i=(e==null?void 0:e[1].columns)??[];return{getLabels:()=>d(o[0],t),getDatasets:()=>s.map(i,(n,r)=>({label:n.name,data:d(n,t),yAxisID:`${l}-y${r.toString()}`,type:`${l}`,backgroundColor:s.get(a,u==null?void 0:u[r],y[r]),borderColor:s.get(a,u==null?void 0:u[r],y[r]),datalabels:{anchor:"end"}})),getScales:()=>s.reduce(i,(n,r,c)=>(n[`${l}-y${c.toString()}`]={grid:{display:!0},position:c===0?"left":"right",title:{display:!0,text:`${r.name}`}},n),{}),getPointDetails:(n,r)=>[{columnId:o[0].id,value:d(o[0],t)[n]},{columnId:i[r].id,value:d(i[r],t)[n]}]}}function x(e){var l,a,o;return E(((a=(l=e.config)==null?void 0:l.chartConfig)==null?void 0:a[0].dimensions)??[],((o=e.data)==null?void 0:o[0].data)??[],"bar",e.visualProps)}function w(e){return s.pick(e.native,["clientX","clientY"])}function k(e){const t=e.getChartModel(),l=x(t),a=s.get(t.visualProps,u[2],!1);if(l)try{const o=document.getElementById("chart");o.getContext("2d").clearRect(0,0,o.width,o.height),C=new b(o,{type:"bar",data:{labels:l.getLabels(),datasets:l.getDatasets()},options:{scales:l.getScales(),animation:{duration:0},plugins:{datalabels:{display:a,color:"blue",labels:{title:{font:{weight:"bold"}},value:{color:"green"}}}},maintainAspectRatio:!1,interaction:{mode:"point",intersect:!0},onClick:i=>{const n=i.chart.getActiveElements()[0],r=n.index,c=n.datasetIndex;h.info("ChartPoint",r,c,l.getPointDetails(r,c)),e.emitEvent(m.OpenContextMenu,{event:w(i),clickedPoint:{tuple:l.getPointDetails(r,c)}})}}})}catch(o){throw h.error("renderfailed",o),o}}const f=async e=>{C&&C.destroy();try{e.emitEvent(m.RenderStart),k(e)}catch(t){e.emitEvent(m.RenderError,{hasError:!0,error:t})}finally{e.emitEvent(m.RenderComplete)}};(async()=>{const e=await p({getDefaultChartConfig:t=>{const l=t.columns,a=s.filter(l,n=>n.type===g.MEASURE);return[{key:"column",dimensions:[{key:"x",columns:[s.filter(l,n=>n.type===g.ATTRIBUTE)[0]]},{key:"y",columns:a.slice(0,2)}]}]},getQueriesFromChartConfig:t=>t.map(a=>s.reduce(a.dimensions,(o,i)=>({queryColumns:[...o.queryColumns,...i.columns]}),{queryColumns:[]})),renderChart:t=>f(t),chartConfigEditorDefinition:[{key:"column",label:"Custom Column",descriptionText:"X Axis can only have attributes, Y Axis can only have measures, Color can only have attributes. Should have just 1 column in Y axis with colors columns.",columnSections:[{key:"x",label:"Custom X Axis",allowAttributeColumns:!0,allowMeasureColumns:!1,allowTimeSeriesColumns:!0,maxColumnCount:1},{key:"y",label:"Custom Y Axis",allowAttributeColumns:!1,allowMeasureColumns:!0,allowTimeSeriesColumns:!1}]}],visualPropEditorDefinition:{elements:[{key:"color",type:"radio",defaultValue:"red",values:["red","green","yellow"],label:"Colors"},{type:"section",key:"accordion",label:"Accordion",children:[{key:"Color2",type:"radio",defaultValue:"blue",values:["blue","white","red"],label:"Color2"},{key:"datalabels",type:"toggle",defaultValue:!1,label:"Data Labels"}]}]},validateConfig:(t,l)=>{if(t.length!==1)return{isValid:!1,validationErrorMessage:["invalid config. no config found"]};const a=t[0].dimensions;return a[0].columns.length===0||a[1].columns.length===0?{isValid:!1,validationErrorMessage:["Invalid config. X or Y axis columns cannot be empty."]}:{isValid:!0}}});f(e)})();