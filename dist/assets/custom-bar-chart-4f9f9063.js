import{g as p,C as m,l as i,a as g}from"./index-37fd7add.js";import"./auto.esm-c3926bfe.js";import{C as y,p as x}from"./chartjs-plugin-datalabels.esm-3e57def8.js";const f=console;y.register(x);let C;const h=["red","green","blue"],u={0:"color",1:"accordion.Color2",2:"accordion.datalabels"},v=e=>e>1e9?(e/1e9).toFixed(2)+"B":e>1e6?(e/1e6).toFixed(2)+"M":e>1e3?(e/1e3).toFixed(2)+"K":e;function d(e,t){const o=i.findIndex(t.columns,l=>e.id===l);return i.map(t.dataValue,l=>l[o])}function E(e,t,o,l){const a=(e==null?void 0:e[0].columns)??[],s=(e==null?void 0:e[1].columns)??[];return{getLabels:()=>d(a[0],t),getDatasets:()=>i.map(s,(n,r)=>({label:n.name,data:d(n,t),yAxisID:`${o}-y${r.toString()}`,type:`${o}`,backgroundColor:i.get(l,u==null?void 0:u[r],h[r]),borderColor:i.get(l,u==null?void 0:u[r],h[r]),datalabels:{anchor:"end"}})),getScales:()=>i.reduce(s,(n,r,c)=>(n[`${o}-y${c.toString()}`]={grid:{display:!0},position:c===0?"left":"right",title:{display:!0,text:`${r.name}`}},n),{}),getPointDetails:(n,r)=>[{columnId:a[0].id,value:d(a[0],t)[n]},{columnId:s[r].id,value:d(s[r],t)[n]}]}}function k(e){var o,l,a;return E(((l=(o=e.config)==null?void 0:o.chartConfig)==null?void 0:l[0].dimensions)??[],((a=e.data)==null?void 0:a[0].data)??[],"bar",e.visualProps)}function w(e){return i.pick(e.native,["clientX","clientY"])}function S(e){const t=e.getChartModel(),o=k(t),l=i.get(t.visualProps,u[2],!1);if(o)try{const a=document.getElementById("chart");a.getContext("2d").clearRect(0,0,a.width,a.height),C=new y(a,{type:"bar",data:{labels:o.getLabels(),datasets:o.getDatasets()},options:{scales:o.getScales(),animation:{duration:0},plugins:{datalabels:{display:l?"auto":!1,formatter:s=>v(s),color:"blue",textStrokeColor:"white",textStrokeWidth:5,labels:{title:{font:{weight:"bold"}},value:{color:"black"}}}},maintainAspectRatio:!1,interaction:{mode:"point",intersect:!0},onClick:s=>{const n=s.chart.getActiveElements()[0],r=n.index,c=n.datasetIndex;f.info("ChartPoint",r,c,o.getPointDetails(r,c)),e.emitEvent(m.OpenContextMenu,{event:w(s),clickedPoint:{tuple:o.getPointDetails(r,c)}})}}})}catch(a){throw f.error("renderfailed",a),a}}const b=async e=>{C&&C.destroy();try{e.emitEvent(m.RenderStart),S(e)}catch(t){e.emitEvent(m.RenderError,{hasError:!0,error:t})}finally{e.emitEvent(m.RenderComplete)}};(async()=>{const e=await p({getDefaultChartConfig:t=>{const o=t.columns,l=i.filter(o,n=>n.type===g.MEASURE);return[{key:"column",dimensions:[{key:"x",columns:[i.filter(o,n=>n.type===g.ATTRIBUTE)[0]]},{key:"y",columns:l.slice(0,2)}]}]},getQueriesFromChartConfig:t=>t.map(l=>i.reduce(l.dimensions,(a,s)=>({queryColumns:[...a.queryColumns,...s.columns]}),{queryColumns:[]})),renderChart:t=>b(t),chartConfigEditorDefinition:[{key:"column",label:"Custom Column",descriptionText:"X Axis can only have attributes, Y Axis can only have measures, Color can only have attributes. Should have just 1 column in Y axis with colors columns.",columnSections:[{key:"x",label:"Custom X Axis",allowAttributeColumns:!0,allowMeasureColumns:!1,allowTimeSeriesColumns:!0,maxColumnCount:1},{key:"y",label:"Custom Y Axis",allowAttributeColumns:!1,allowMeasureColumns:!0,allowTimeSeriesColumns:!1}]}],visualPropEditorDefinition:{elements:[{key:"color",type:"radio",defaultValue:"red",values:["red","green","yellow"],label:"Colors"},{type:"section",key:"accordion",label:"Accordion",children:[{key:"Color2",type:"radio",defaultValue:"blue",values:["blue","white","red"],label:"Color2"},{key:"datalabels",type:"toggle",defaultValue:!1,label:"Data Labels"}]}]},validateConfig:(t,o)=>{if(t.length!==1)return{isValid:!1,validationErrorMessage:["invalid config. no config found"]};const l=t[0].dimensions;return l[0].columns.length===0||l[1].columns.length===0?{isValid:!1,validationErrorMessage:["Invalid config. X or Y axis columns cannot be empty."]}:{isValid:!0}}});b(e)})();
