import{l as f,g as P,C as v,a as I}from"./index-37fd7add.js";import"./auto.esm-c3926bfe.js";import{C as Y,p as R}from"./chartjs-plugin-datalabels.esm-3e57def8.js";const W=(e,n)=>{const o=document.getElementById(n);let s=o.querySelector("ul");return s||(s=document.createElement("ul"),s.style.display="flex",s.style.flexDirection="column",s.style.margin="0",s.style.height="95vh",s.style.overflowY="overlay",o.appendChild(s)),s},X={id:"htmlLegendPlugin",afterUpdate(e,n,o){const s=W(e,"legend");for(;s.firstChild;)s.firstChild.remove();const i={column:[],line:[],stack:[],scatter:[]};e.options.plugins.legend.labels.generateLabels(e).forEach(r=>{switch(r.text.split("- ")[1]){case"bar":i.column.push(r);break;case"line":i.line.push(r);break;case"bar-stack":i.stack.push(r);break;case"scatter":i.scatter.push(r);break}}),f.entries(i).forEach(r=>{const y=document.createElement("div");y.innerHTML=`<p style="
      font-family: sans-serif; font-size:14px;
  ">${r[0].charAt(0).toUpperCase()+r[0].slice(1)}</p>`,r[1].forEach(t=>{const c=document.createElement("li");c.style.alignItems="center",c.style.cursor="pointer",c.style.display="flex",c.style.flexDirection="row",c.style.marginLeft="10px",c.style.marginBottom="10px",c.style.minWidth="110px",c.style.opacity=t.hidden?"0.3":"1",c.onclick=()=>{const{type:g}=e.config;g==="pie"||g==="doughnut"?e.toggleDataVisibility(t.index):e.setDatasetVisibility(t.datasetIndex,!e.isDatasetVisible(t.datasetIndex)),e.update()};const u=document.createElement("span");u.style.background=t.fillStyle,u.style.borderColor=t.strokeStyle,u.style.borderWidth=t.lineWidth+"px",u.style.display="inline-block",u.style.flexShrink="0",u.style.height="10px",u.style.marginRight="10px",u.style.width="10px",u.style.borderRadius="100%";const l=document.createElement("p");l.style.color=t.fontColor,l.style.margin="0",l.style.padding="0",l.style.fontFamily="sans-serif",l.style.fontWeight="500",l.style.fontSize="0.85rem";const a=document.createTextNode(t.text.split("- ")[0]);l.appendChild(a),c.appendChild(u),c.appendChild(l),s.appendChild(y),y.appendChild(c)})})}},V=console;Y.register(R);let D;const T=["datalabels","hideLegend"],L=["#66CCFF","#E3394A","#F5CB4E","#32CD32","#FF00FF","#00FFFF","#FF4500","#8A2BE2","#1E90FF","#FFD700","#9932CC","#8B0000","#228B22","#008080","#FF6347","#40E0D0","#800080","#2E8B57","#FF8C00","#8B4513","#008B8B","#FF69B4","#7CFC00","#4169E1","#FF1493","#ADFF2F","#800000","#20B2AA","#F08080"],C={bar:"bar",line:"line",stack:"bar-stack",scatter:"scatter"},q=300,$={bar:0,line:-1,stack:0,scatter:-2},A=e=>e>1e9?(e/1e9).toFixed(2)+"B":e>1e6?(e/1e6).toFixed(2)+"M":e>1e3?(e/1e3).toFixed(2)+"K":e;function x(e,n){const o=f.findIndex(n.columns,s=>e.id===s);return f.uniq(f.map(n.dataValue,s=>s[o]))}function O(e,n){const o=f.findIndex(n.columns,s=>e.id===s);return f.uniq(f.map(n.dataValue,s=>s[o]))}function _(e,n,o){const s=f.findIndex(n.columns,i=>e.id===i);return n.dataValue.filter(i=>i[2]===o).map(i=>i[s])}function F(e,n,o){var t,c,u;const s=((t=e.find(l=>l.key==="x"))==null?void 0:t.columns)??[],i=((c=e.find(l=>l.key==="y"))==null?void 0:c.columns)??[],m=((u=e.find(l=>l.key==="legend"))==null?void 0:u.columns[0])??[],r=o.split("-")[0],y=o.split("-").length>1;return{getLabels:()=>x(s[0],n),getDatasets:()=>f.isEmpty(m)?f.map(i,(l,a)=>({label:`${l.name}- ${o}`,data:x(l,n),stack:`${r}-x0${y?"-stacked":"y"+a.toString()}`,type:`${r}`,backgroundColor:"",borderColor:"",yPos:a,datalabels:{anchor:"end"},order:$[o]})):f.map(O(m,n),(l,a)=>({label:`${l}- ${o}`,data:_(i[0],n,l),type:`${r}`,stack:`${r}-x0${y?"-stacked":"y"+a.toString()}`,yPos:a,backgroundColor:"",borderColor:"",datalabels:{anchor:"end"},order:$[o]})),getPointDetails:(l,a)=>f.isEmpty(m)?[{columnId:s[0].id,value:x(s[0],n)[l]},{columnId:i[a].id,value:x(i[a],n)[l]}]:[{columnId:m.id,value:x(m,n)[a]},{columnId:s[0].id,value:x(s[0],n)[l]},{columnId:i[0].id,value:x(i[0],n)[l]}]}}function H(e){var r,y,t,c,u,l,a,g,h,w,E,S,k,M;const n=(y=(r=e.config)==null?void 0:r.chartConfig)==null?void 0:y.find(d=>d.key==="xAxis").dimensions.filter(d=>d.key==="x")[0],o=F([n,...(c=(t=e.config)==null?void 0:t.chartConfig)==null?void 0:c.find(d=>d.key===C.bar).dimensions],((u=e.data)==null?void 0:u[1].data)??[],C.bar),s=F([n,...(a=(l=e.config)==null?void 0:l.chartConfig)==null?void 0:a.find(d=>d.key===C.line).dimensions],((g=e.data)==null?void 0:g[2].data)??[],C.line),i=F([n,...(w=(h=e.config)==null?void 0:h.chartConfig)==null?void 0:w.find(d=>d.key===C.stack).dimensions],((E=e.data)==null?void 0:E[3].data)??[],C.stack),m=F([n,...(k=(S=e.config)==null?void 0:S.chartConfig)==null?void 0:k.find(d=>d.key===C.scatter).dimensions],((M=e.data)==null?void 0:M[4].data)??[],C.scatter);return{getLabels:o.getLabels,getDatasets:()=>{const d=[...o.getDatasets(),...s.getDatasets(),...i.getDatasets(),...m.getDatasets()];return d.forEach((b,p)=>{b.backgroundColor=L[p%30],b.borderColor=L[p%30]}),d},getPointDetails:(d,b,p)=>{if(p===C.bar)return o.getPointDetails(d,b);if(p===C.line)return s.getPointDetails(d,b);if(p===C.stack)return i.getPointDetails(d,b);if(p===C.scatter)return m.getPointDetails(d,b)}}}function N(e){return f.pick(e.native,["clientX","clientY"])}function U(e){var r,y;const n=e.getChartModel(),o=H(n),s=(y=(r=n.config)==null?void 0:r.chartConfig)==null?void 0:y.find(t=>t.key==="xAxis").dimensions.filter(t=>t.key==="x")[0].columns[0].name,i=f.get(n.visualProps,T[0],!1),m=f.get(n.visualProps,T[1],!0);if(o)try{const t=document.getElementById("chart"),c=document.getElementById("legend"),u=document.getElementById("chartWrapper");c.style.display="flex",u.style.width="100%",t.getContext("2d").clearRect(0,0,t.width,t.height);const l=new Intl.NumberFormat("en-US");D=new Y(t,{type:"bar",data:{labels:o.getLabels(),datasets:o.getDatasets()},options:{animation:{duration:0},scales:{y:{ticks:{callback:a=>{if(a>1e7)return A(a)}}}},plugins:{datalabels:{display:i?"auto":!1,formatter:a=>A(a),color:"blue",textStrokeColor:"white",textStrokeWidth:5,labels:{title:{font:{weight:"bold"}},value:{color:"black"}}},tooltip:{enabled:!0,displayColors:!1,position:"nearest",callbacks:{label:a=>{const g=a.dataset.data[a.dataIndex],h=A(g);return`${a.dataset.label.split("-")[0]}: ${h}`},title:a=>(console.log(a),`${s}: ${a[0].label}`)},titleFont:{size:11,weight:"none"}},legend:{display:!1}},maintainAspectRatio:!1,interaction:{mode:"point",intersect:!0},onClick:a=>{const g=a.chart.getActiveElements()[0];if(!g){e.emitEvent(v.CloseContextMenu);return}const h=g==null?void 0:g.index;let{type:w,stack:E,yPos:S}=g==null?void 0:g.element.$datalabels[0].$context.dataset;const k=S;E.includes("stack")&&(w="bar-stack"),V.info("ChartPoint",h,k,o.getPointDetails(h,k)),e.emitEvent(v.OpenContextMenu,{event:N(a),clickedPoint:{tuple:o.getPointDetails(h,k,w)}})}},plugins:[X]}),window.addEventListener("resize",()=>{window.document.activeElement.getBoundingClientRect().width<q?c.style.display="none":c.style.display="flex"})}catch(t){throw V.error("renderfailed",t),t}}const B=async e=>{D&&D.destroy();try{e.emitEvent(v.RenderStart),U(e)}catch(n){e.emitEvent(v.RenderError,{hasError:!0,error:n})}finally{e.emitEvent(v.RenderComplete)}};(async()=>{const e=await P({getDefaultChartConfig:n=>{const o=n.columns,s=f.filter(o,r=>r.type===I.MEASURE);return[{key:"xAxis",dimensions:[{key:"x",columns:[f.filter(o,r=>r.type===I.ATTRIBUTE)[0]]}]},{key:"bar",dimensions:[{key:"y",columns:s.slice(0,2)}]},{key:"line",dimensions:[]},{key:"bar-stack",dimensions:[]},{key:"scatter",dimensions:[]}]},getQueriesFromChartConfig:n=>{const o=n[0].dimensions.filter(i=>i.key==="x")[0].columns;return n.map(i=>f.reduce(i.dimensions,(m,r)=>r.key==="x"?m:{queryColumns:[...m.queryColumns,...r.columns]},{queryColumns:[o[0]]}))},renderChart:n=>B(n),chartConfigEditorDefinition:[{key:"xAxis",label:"Common Axis",descriptionText:"X Axis can only have attributes",columnSections:[{key:"x",label:"X Axis",allowAttributeColumns:!0,allowMeasureColumns:!1,allowTimeSeriesColumns:!0,maxColumnCount:1}]},{key:"bar",label:"Column",descriptionText:"X Axis can only have attributes, Y Axis can only have measures, Color can only have attributes. Should have just 1 column in Y axis with colors columns.",columnSections:[{key:"y",label:"Y Axis",allowAttributeColumns:!1,allowMeasureColumns:!0,allowTimeSeriesColumns:!1},{key:"legend",label:"Slice with color",allowAttributeColumns:!0,allowMeasureColumns:!1,allowTimeSeriesColumns:!1}]},{key:"line",label:"Line",descriptionText:"X Axis can only have attributes, Y Axis can only have measures, Color can only have attributes. Should have just 1 column in Y axis with colors columns.",columnSections:[{key:"y",label:"Y Axis",allowAttributeColumns:!1,allowMeasureColumns:!0,allowTimeSeriesColumns:!1},{key:"legend",label:"Slice with color",allowAttributeColumns:!0,allowMeasureColumns:!1,allowTimeSeriesColumns:!1}]},{key:"bar-stack",label:"Stacked Column",descriptionText:"X Axis can only have attributes, Y Axis can only have measures, Color can only have attributes. Should have just 1 column in Y axis with colors columns.",columnSections:[{key:"y",label:"Y Axis",allowAttributeColumns:!1,allowMeasureColumns:!0,allowTimeSeriesColumns:!1},{key:"legend",label:"Slice with color",allowAttributeColumns:!0,allowMeasureColumns:!1,allowTimeSeriesColumns:!1}]},{key:"scatter",label:"Scatter",descriptionText:"X Axis can only have attributes, Y Axis can only have measures, Color can only have attributes. Should have just 1 column in Y axis with colors columns.",columnSections:[{key:"y",label:"Y Axis",allowAttributeColumns:!1,allowMeasureColumns:!0,allowTimeSeriesColumns:!1},{key:"legend",label:"Slice with color",allowAttributeColumns:!0,allowMeasureColumns:!1,allowTimeSeriesColumns:!1}]}],visualPropEditorDefinition:{elements:[{key:"datalabels",type:"checkbox",defaultValue:!1,label:"Data Labels"},{key:"hideLegend",type:"checkbox",defaultValue:!0,label:"Legends"}]},validateConfig:(n,o)=>{if(n.length<=0)return{isValid:!1,validationErrorMessage:["Invalid config. no config found"]};const s=n.find(t=>t.key==="xAxis"),i=n.map(t=>({type:t.key,dimensions:t.dimensions})).filter(t=>t.dimensions.filter(u=>u.key==="y").length),m=()=>{const t={isValid:!0,errorMessage:void 0};for(const c of n){const u=c.dimensions.find(l=>l.key==="legend");if(u&&u.columns.length>0){const l=c.dimensions.find(a=>a.key==="y");if(l){if(l.columns.length===0)return t.isValid=!1,t.errorMessage=`Invalid config. Y axis column should not be empty for ${c.key} chart while slicing with an attribute`,t;if(l.columns.length>1)return t.isValid=!1,t.errorMessage=`Invalid config. Y axis column should not be more than 1 for ${c.key} chart while slicing with an attribute`,t;if(u.columns.length>1)return t.isValid=!1,t.errorMessage=`Invalid config. Legend column should not be more than 1 for ${c.key} chart`,t}}}return t},r=()=>s.dimensions[0].columns.length===0?{isValid:!1,errorMessage:"Invalid config. X axis columns cannot be empty"}:{isValid:!0},y=()=>i.length!==0?{isValid:!0}:{isValid:!1,errorMessage:"Invalid config. Y axis column cannot be empty (need one y-axis column for any of the chart type)"};return!r().isValid||!y().isValid||!m().isValid?{isValid:!1,validationErrorMessage:[r().errorMessage||y().errorMessage||m().errorMessage]}:{isValid:!0}}});B(e)})();
