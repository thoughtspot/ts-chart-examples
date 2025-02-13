import{g as Dt,l as C,b as dt,C as X}from"./number-formatting-70b2729e.js";import{S as L,U as g,H as F,d as _,D as $t,F as kt,C as Ut,L as Wt,T as E,i as At,G as ut}from"./TreeUtilities-c1a62f3d.js";var Vt=L.seriesTypes.column.prototype,jt=g.addEvent,zt=g.defined,Q;(function(a){var r=[];a.pointMembers={dataLabelOnNull:!0,moveToTopOnHover:!0,isValid:o},a.seriesMembers={colorKey:"value",axisTypes:["xAxis","yAxis","colorAxis"],parallelArrays:["x","y","value"],pointArrayMap:["value"],trackerGroups:["group","markerGroup","dataLabelsGroup"],colorAttribs:i,pointAttribs:Vt.pointAttribs};function t(l){var s=l.prototype.pointClass;return r.indexOf(s)===-1&&(r.push(s),jt(s,"afterSetState",e)),l}a.compose=t;function e(l){var s=this;s.moveToTopOnHover&&s.graphic&&s.graphic.attr({zIndex:l&&l.state==="hover"?1:0})}function o(){return this.value!==null&&this.value!==1/0&&this.value!==-1/0&&(this.value===void 0||!isNaN(this.value))}function i(l){var s={};return zt(l.color)&&(!l.state||l.state==="normal")&&(s[this.colorProp||"fill"]=l.color),s}})(Q||(Q={}));const St=Q;var Ft=function(){function a(r,t,e,o){this.height=r,this.width=t,this.plot=o,this.direction=e,this.startDirection=e,this.total=0,this.nW=0,this.lW=0,this.nH=0,this.lH=0,this.elArr=[],this.lP={total:0,lH:0,nH:0,lW:0,nW:0,nR:0,lR:0,aspectRatio:function(i,l){return Math.max(i/l,l/i)}}}return a.prototype.addElement=function(r){this.lP.total=this.elArr[this.elArr.length-1],this.total=this.total+r,this.direction===0?(this.lW=this.nW,this.lP.lH=this.lP.total/this.lW,this.lP.lR=this.lP.aspectRatio(this.lW,this.lP.lH),this.nW=this.total/this.height,this.lP.nH=this.lP.total/this.nW,this.lP.nR=this.lP.aspectRatio(this.nW,this.lP.nH)):(this.lH=this.nH,this.lP.lW=this.lP.total/this.lH,this.lP.lR=this.lP.aspectRatio(this.lP.lW,this.lH),this.nH=this.total/this.width,this.lP.nW=this.lP.total/this.nH,this.lP.nR=this.lP.aspectRatio(this.lP.nW,this.nH)),this.elArr.push(r)},a.prototype.reset=function(){this.nW=0,this.lW=0,this.elArr=[],this.total=0},a}(),Ht=g.isNumber;function Xt(a,r){var t=r.animatableAttribs,e=r.onComplete,o=r.css,i=r.renderer,l=a.series&&a.series.chart.hasRendered?void 0:a.series&&a.series.options.animation,s=a.graphic;if(r.attribs=r.attribs||{},r.attribs.class=a.getClassName(),Rt(a))s||(a.graphic=s=r.shapeType==="text"?i.text():i[r.shapeType](r.shapeArgs||{}),s.add(r.group)),o&&s.css(o),s.attr(r.attribs).animate(t,r.isNew?!1:l,e);else if(s){var n=function(){a.graphic=s=s&&s.destroy(),typeof e=="function"&&e()};Object.keys(t).length?s.animate(t,void 0,function(){return n()}):n()}}function Rt(a){switch(a.series&&a.series.type){case"treemap":return Ht(a.plotY)&&a.y!==null;default:return!a.isNull}}var ht={draw:Xt,shouldDraw:Rt},Gt=globalThis&&globalThis.__extends||function(){var a=function(r,t){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])},a(r,t)};return function(r,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");a(r,t);function e(){this.constructor=r}r.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}}(),pt=L.series.prototype.pointClass,Ot=L.seriesTypes,Yt=Ot.pie.prototype.pointClass,Kt=Ot.scatter.prototype.pointClass,qt=g.extend,Zt=g.isNumber,Qt=g.pick,Ct=function(a){Gt(r,a);function r(){var t=a!==null&&a.apply(this,arguments)||this;return t.name=void 0,t.node=void 0,t.options=void 0,t.series=void 0,t.value=void 0,t}return r.prototype.draw=function(t){ht.draw(this,t)},r.prototype.getClassName=function(){var t=pt.prototype.getClassName.call(this),e=this.series,o=e.options;return this.node.level<=e.nodeMap[e.rootNode].level?t+=" highcharts-above-level":!this.node.isLeaf&&!Qt(o.interactByLeaf,!o.allowTraversingTree)?t+=" highcharts-internal-node-interactive":this.node.isLeaf||(t+=" highcharts-internal-node"),t},r.prototype.isValid=function(){return!!(this.id||Zt(this.value))},r.prototype.setState=function(t){pt.prototype.setState.call(this,t),this.graphic&&this.graphic.attr({zIndex:t==="hover"?1:0})},r.prototype.shouldDraw=function(){return ht.shouldDraw(this)},r}(Kt);qt(Ct.prototype,{setVisible:Yt.prototype.setVisible});var Jt=g.objectEach,J;(function(a){a.AXIS_MAX=100;function r(o){return typeof o=="boolean"}a.isBoolean=r;function t(o,i,l){l=l||this,Jt(o,function(s,n){i.call(l,s,n,o)})}a.eachObject=t;function e(o,i,l){l===void 0&&(l=this);var s;s=i.call(l,o),s!==!1&&e(s,i,l)}a.recursive=e})(J||(J={}));const R=J;var te=$t.defaultOptions,ee=kt.format,N=g.addEvent,ct=g.objectEach,re=g.extend,oe=g.fireEvent,W=g.merge,G=g.pick,ie=g.defined,se=g.isString;re(te.lang,{mainBreadcrumb:"Main"});var Et=function(){function a(r,t){this.group=void 0,this.list=[],this.elementList={},this.isDirty=!0,this.level=0,this.options=void 0;var e=W(r.options.drilldown&&r.options.drilldown.drillUpButton,a.defaultBreadcrumbsOptions,r.options.navigation&&r.options.navigation.breadcrumbs,t);this.chart=r,this.options=e||{}}return a.prototype.updateProperties=function(r){this.setList(r),this.setLevel(),this.isDirty=!0},a.prototype.setList=function(r){this.list=r},a.prototype.setLevel=function(){this.level=this.list.length&&this.list.length-1},a.prototype.getLevel=function(){return this.level},a.prototype.getButtonText=function(r){var t=this,e=t.chart,o=t.options,i=e.options.lang,l=G(o.format,o.showFullPath?"{level.name}":"← {level.name}"),s=i&&G(i.drillUpText,i.mainBreadcrumb),n=o.formatter&&o.formatter(r)||ee(l,{level:r.levelOptions},e)||"";return(se(n)&&!n.length||n==="← ")&&ie(s)&&(n=o.showFullPath?s:"← "+s),n},a.prototype.redraw=function(){this.isDirty&&this.render(),this.group&&this.group.align(),this.isDirty=!1},a.prototype.render=function(){var r=this,t=r.chart,e=r.options;!r.group&&e&&(r.group=t.renderer.g("breadcrumbs-group").addClass("highcharts-no-tooltip highcharts-breadcrumbs").attr({zIndex:e.zIndex}).add()),e.showFullPath?this.renderFullPathButtons():this.renderSingleButton(),this.alignBreadcrumbsGroup()},a.prototype.renderFullPathButtons=function(){this.destroySingleButton(),this.resetElementListState(),this.updateListElements(),this.destroyListElements()},a.prototype.renderSingleButton=function(){var r=this,t=r.chart,e=r.list,o=r.options,i=o.buttonSpacing;this.destroyListElements();var l=r.group?r.group.getBBox().width:i,s=i,n=e[e.length-2];!t.drillUpButton&&this.level>0?t.drillUpButton=r.renderButton(n,l,s):t.drillUpButton&&(this.level>0?this.updateSingleButton():this.destroySingleButton())},a.prototype.alignBreadcrumbsGroup=function(r){var t=this;if(t.group){var e=t.options,o=e.buttonTheme,i=e.position,l=e.relativeTo==="chart"||e.relativeTo==="spacingBox"?void 0:"scrollablePlotBox",s=t.group.getBBox(),n=2*(o.padding||0)+e.buttonSpacing;i.width=s.width+n,i.height=s.height+n;var u=W(i);r&&(u.x+=r),t.options.rtl&&(u.x+=i.width),u.y=G(u.y,this.yOffset,0),t.group.align(u,!0,l)}},a.prototype.renderButton=function(r,t,e){var o=this,i=this.chart,l=o.options,s=W(l.buttonTheme),n=i.renderer.button(o.getButtonText(r),t,e,function(u){var h=l.events&&l.events.click,p;h&&(p=h.call(o,u,r)),p!==!1&&(l.showFullPath?u.newLevel=r.level:u.newLevel=o.level-1,oe(o,"up",u))},s).addClass("highcharts-breadcrumbs-button").add(o.group);return i.styledMode||n.attr(l.style),n},a.prototype.renderSeparator=function(r,t){var e=this,o=this.chart,i=e.options,l=i.separator,s=o.renderer.label(l.text,r,t,void 0,void 0,void 0,!1).addClass("highcharts-breadcrumbs-separator").add(e.group);return o.styledMode||s.css(l.style),s},a.prototype.update=function(r){W(!0,this.options,r),this.destroy(),this.isDirty=!0},a.prototype.updateSingleButton=function(){var r=this.chart,t=this.list[this.level-1];r.drillUpButton&&r.drillUpButton.attr({text:this.getButtonText(t)})},a.prototype.destroy=function(){this.destroySingleButton(),this.destroyListElements(!0),this.group&&this.group.destroy(),this.group=void 0},a.prototype.destroyListElements=function(r){var t=this.elementList;ct(t,function(e,o){(r||!t[o].updated)&&(e=t[o],e.button&&e.button.destroy(),e.separator&&e.separator.destroy(),delete e.button,delete e.separator,delete t[o])}),r&&(this.elementList={})},a.prototype.destroySingleButton=function(){this.chart.drillUpButton&&(this.chart.drillUpButton.destroy(),this.chart.drillUpButton=void 0)},a.prototype.resetElementListState=function(){ct(this.elementList,function(r){r.updated=!1})},a.prototype.updateListElements=function(){var r=this,t=r.elementList,e=r.options.buttonSpacing,o=r.list,i=r.options.rtl,l=i?-1:1,s=function(d,c){return l*d.getBBox().width+l*c},n=function(d,c,f){d.translate(c-d.getBBox().width,f)},u=r.group?s(r.group,e):e,h=e,p;o.forEach(function(d,c){var f=c===o.length-1,v,y;t[d.level]?(p=t[d.level],v=p.button,!p.separator&&!f?(u+=l*e,p.separator=r.renderSeparator(u,h),i&&n(p.separator,u,h),u+=s(p.separator,e)):p.separator&&f&&(p.separator.destroy(),delete p.separator),t[d.level].updated=!0):(v=r.renderButton(d,u,h),i&&n(v,u,h),u+=s(v,e),f||(y=r.renderSeparator(u,h),i&&n(y,u,h),u+=s(y,e)),t[d.level]={button:v,separator:y,updated:!0}),v&&v.setState(f?2:0)})},a.defaultBreadcrumbsOptions={buttonTheme:{fill:"none",height:18,padding:2,"stroke-width":0,zIndex:7,states:{select:{fill:"none"}},style:{color:"#335cad"}},buttonSpacing:5,floating:!1,format:void 0,relativeTo:"plotBox",rtl:!1,position:{align:"left",verticalAlign:"top",x:0,y:void 0},separator:{text:"/",style:{color:"#666666"}},showFullPath:!0,style:{},useHTML:!1,zIndex:7},a}();F.Breadcrumbs||(F.Breadcrumbs=Et,N(_,"getMargins",function(){var a=this.breadcrumbs;if(a&&!a.options.floating&&a.level){var r=a.options,t=r.buttonTheme,e=(t.height||0)+2*(t.padding||0)+r.buttonSpacing,o=r.position.verticalAlign;o==="bottom"?(this.marginBottom=(this.marginBottom||0)+e,a.yOffset=e):o!=="middle"?(this.plotTop+=e,a.yOffset=-e):a.yOffset=void 0}}),N(_,"redraw",function(){this.breadcrumbs&&this.breadcrumbs.redraw()}),N(_,"destroy",function(){this.breadcrumbs&&(this.breadcrumbs.destroy(),this.breadcrumbs=void 0)}),N(_,"afterShowResetZoom",function(){var a=this;if(a.breadcrumbs){var r=a.resetZoomButton&&a.resetZoomButton.getBBox(),t=a.breadcrumbs.options;r&&t.position.align==="right"&&t.relativeTo==="plotBox"&&a.breadcrumbs.alignBreadcrumbsGroup(-r.width-t.buttonSpacing)}}),N(_,"selection",function(a){a.resetSelection===!0&&this.breadcrumbs&&this.breadcrumbs.alignBreadcrumbsGroup()}));var ae=L.series,ne=g.addEvent,ft=g.extend,Y=!1;ne(ae,"afterBindAxes",function(){var a=this,r=a.xAxis,t=a.yAxis,e;r&&t&&(a.is("treemap")?(e={endOnTick:!1,gridLineWidth:0,lineWidth:0,min:0,minPadding:0,max:R.AXIS_MAX,maxPadding:0,startOnTick:!1,title:void 0,tickPositions:[]},ft(t.options,e),ft(r.options,e),Y=!0):Y&&(t.setOptions(t.userOptions),r.setOptions(r.userOptions),Y=!1))});var le=globalThis&&globalThis.__extends||function(){var a=function(r,t){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])},a(r,t)};return function(r,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");a(r,t);function e(){this.constructor=r}r.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}}(),vt=Ut.parse,gt=F.noop,B=L.series,it=L.seriesTypes,de=it.column,ue=it.heatmap,yt=it.scatter,he=E.getColor,pe=E.getLevelOptions,ce=E.updateRootId,I=g.addEvent,fe=g.correctFloat,D=g.defined,ve=g.error,V=g.extend,ge=g.fireEvent,mt=g.isArray,ye=g.isObject,K=g.isString,O=g.merge,S=g.pick,me=g.stableSort,st=function(a){le(r,a);function r(){var t=a!==null&&a.apply(this,arguments)||this;return t.axisRatio=void 0,t.data=void 0,t.mapOptionsToLevel=void 0,t.nodeMap=void 0,t.options=void 0,t.points=void 0,t.rootNode=void 0,t.tree=void 0,t.level=void 0,t}return r.prototype.algorithmCalcPoints=function(t,e,o,i){var l,s,n,u,h=o.lW,p=o.lH,d=o.plot,c,f=0,v=o.elArr.length-1;e?(h=o.nW,p=o.nH):c=o.elArr[o.elArr.length-1],o.elArr.forEach(function(y){(e||f<v)&&(o.direction===0?(l=d.x,s=d.y,n=h,u=y/n):(l=d.x,s=d.y,u=p,n=y/u),i.push({x:l,y:s,width:n,height:fe(u)}),o.direction===0?d.y=d.y+u:d.x=d.x+n),f=f+1}),o.reset(),o.direction===0?o.width=o.width-h:o.height=o.height-p,d.y=d.parent.y+(d.parent.height-o.height),d.x=d.parent.x+(d.parent.width-o.width),t&&(o.direction=1-o.direction),e||o.addElement(c)},r.prototype.algorithmFill=function(t,e,o){var i=[],l,s=e.direction,n=e.x,u=e.y,h=e.width,p=e.height,d,c,f,v;return o.forEach(function(y){l=e.width*e.height*(y.val/e.val),d=n,c=u,s===0?(v=p,f=l/v,h=h-f,n=n+f):(f=h,v=l/f,p=p-v,u=u+v),i.push({x:d,y:c,width:f,height:v}),t&&(s=1-s)}),i},r.prototype.algorithmLowAspectRatio=function(t,e,o){var i=[],l=this,s,n={x:e.x,y:e.y,parent:e},u=e.direction,h=0,p=o.length-1,d=new Ft(e.height,e.width,u,n);return o.forEach(function(c){s=e.width*e.height*(c.val/e.val),d.addElement(s),d.lP.nR>d.lP.lR&&l.algorithmCalcPoints(t,!1,d,i,n),h===p&&l.algorithmCalcPoints(t,!0,d,i,n),h=h+1}),i},r.prototype.alignDataLabel=function(t,e,o){var i=o.style;i&&!D(i.textOverflow)&&e.text&&e.getBBox().width>e.text.textWidth&&e.css({textOverflow:"ellipsis",width:i.width+="px"}),de.prototype.alignDataLabel.apply(this,arguments),t.dataLabel&&t.dataLabel.attr({zIndex:(t.node.zIndex||0)+1})},r.prototype.buildNode=function(t,e,o,i,l){var s=this,n=[],u=s.points[e],h=0,p,d;return(i[t]||[]).forEach(function(c){d=s.buildNode(s.points[c].id,c,o+1,i,t),h=Math.max(d.height+1,h),n.push(d)}),p={id:t,i:e,children:n,height:h,level:o,parent:l,visible:!1},s.nodeMap[p.id]=p,u&&(u.node=p),p},r.prototype.calculateChildrenAreas=function(t,e){var o=this,i=o.options,l=o.mapOptionsToLevel,s=l[t.level+1],n=S(o[s&&s.layoutAlgorithm]&&s.layoutAlgorithm,i.layoutAlgorithm),u=i.alternateStartingDirection,h=[],p;p=t.children.filter(function(d){return!d.ignore}),s&&s.layoutStartingDirection&&(e.direction=s.layoutStartingDirection==="vertical"?0:1),h=o[n](e,p),p.forEach(function(d,c){var f=h[c];d.values=O(f,{val:d.childrenTotal,direction:u?1-e.direction:e.direction}),d.pointValues=O(f,{x:f.x/o.axisRatio,y:R.AXIS_MAX-f.y-f.height,width:f.width/o.axisRatio}),d.children.length&&o.calculateChildrenAreas(d,d.values)})},r.prototype.createList=function(t){var e=this.chart,o=e.breadcrumbs,i=[];if(o){var l=0;i.push({level:l,levelOptions:e.series[0]});for(var s=t.target.nodeMap[t.newRootId],n=[];s.parent||s.parent==="";)n.push(s),s=t.target.nodeMap[s.parent];n.reverse().forEach(function(u){i.push({level:++l,levelOptions:u})}),i.length<=1&&(i.length=0)}return i},r.prototype.drawDataLabels=function(){var t=this,e=t.mapOptionsToLevel,o=t.points.filter(function(s){return s.node.visible}),i,l;o.forEach(function(s){l=e[s.node.level],i={style:{}},s.node.isLeaf||(i.enabled=!1),l&&l.dataLabels&&(i=O(i,l.dataLabels),t._hasPointLabels=!0),s.shapeArgs&&(i.style.width=s.shapeArgs.width,s.dataLabel&&s.dataLabel.css({width:s.shapeArgs.width+"px"})),s.dlOptions=O(i,s.options.dataLabels)}),B.prototype.drawDataLabels.call(this)},r.prototype.drawPoints=function(){var t=this,e=t.chart,o=e.renderer,i=t.points,l=e.styledMode,s=t.options,n=l?{}:s.shadow,u=s.borderRadius,h=e.pointCount<s.animationLimit,p=s.allowTraversingTree;i.forEach(function(d){var c=d.node.levelDynamic,f={},v={},y={},m="level-group-"+d.node.level,b=!!d.graphic,w=h&&b,T=d.shapeArgs;d.shouldDraw()&&(d.isInside=!0,u&&(v.r=u),O(!0,w?f:v,b?T:{},l?{}:t.pointAttribs(d,d.selected?"select":void 0)),t.colorAttribs&&l&&V(y,t.colorAttribs(d)),t[m]||(t[m]=o.g(m).attr({zIndex:1e3-(c||0)}).add(t.group),t[m].survive=!0)),d.draw({animatableAttribs:f,attribs:v,css:y,group:t[m],renderer:o,shadow:n,shapeArgs:T,shapeType:"rect"}),p&&d.graphic&&(d.drillId=s.interactByLeaf?t.drillToByLeaf(d):t.drillToByGroup(d))})},r.prototype.drillToByGroup=function(t){var e=this,o=!1;return t.node.level-e.nodeMap[e.rootNode].level===1&&!t.node.isLeaf&&(o=t.id),o},r.prototype.drillToByLeaf=function(t){var e=this,o=!1,i;if(t.node.parent!==e.rootNode&&t.node.isLeaf)for(i=t.node;!o;)i=e.nodeMap[i.parent],i.parent===e.rootNode&&(o=i.id);return o},r.prototype.drillToNode=function(t,e){ve(32,!1,void 0,{"treemap.drillToNode":"use treemap.setRootNode"}),this.setRootNode(t,e)},r.prototype.drillUp=function(){var t=this,e=t.nodeMap[t.rootNode];e&&K(e.parent)&&t.setRootNode(e.parent,!0,{trigger:"traverseUpButton"})},r.prototype.getExtremes=function(){var t=B.prototype.getExtremes.call(this,this.colorValueData),e=t.dataMin,o=t.dataMax;return this.valueMin=e,this.valueMax=o,B.prototype.getExtremes.call(this)},r.prototype.getListOfParents=function(t,e){var o=mt(t)?t:[],i=mt(e)?e:[],l=o.reduce(function(s,n,u){var h=S(n.parent,"");return typeof s[h]>"u"&&(s[h]=[]),s[h].push(u),s},{"":[]});return R.eachObject(l,function(s,n,u){n!==""&&i.indexOf(n)===-1&&(s.forEach(function(h){u[""].push(h)}),delete u[n])}),l},r.prototype.getTree=function(){var t=this,e=this.data.map(function(i){return i.id}),o=t.getListOfParents(this.data,e);return t.nodeMap={},t.buildNode("",-1,0,o)},r.prototype.hasData=function(){return!!this.processedXData.length},r.prototype.init=function(t,e){var o=this,i=O(e.drillUpButton,e.breadcrumbs),l;l=I(o,"setOptions",function(s){var n=s.userOptions;D(n.allowDrillToNode)&&!D(n.allowTraversingTree)&&(n.allowTraversingTree=n.allowDrillToNode,delete n.allowDrillToNode),D(n.drillUpButton)&&!D(n.traverseUpButton)&&(n.traverseUpButton=n.drillUpButton,delete n.drillUpButton)}),B.prototype.init.call(o,t,e),delete o.opacity,o.eventsToUnbind.push(l),o.options.allowTraversingTree&&(o.eventsToUnbind.push(I(o,"click",o.onClickDrillToNode)),o.eventsToUnbind.push(I(o,"setRootNode",function(s){var n=o.chart;n.breadcrumbs&&n.breadcrumbs.updateProperties(o.createList(s))})),o.eventsToUnbind.push(I(o,"update",function(s,n){var u=this.chart.breadcrumbs;u&&s.options.breadcrumbs&&u.update(s.options.breadcrumbs)})),o.eventsToUnbind.push(I(o,"destroy",function(n){var u=this.chart;u.breadcrumbs&&(u.breadcrumbs.destroy(),n.keepEventsForUpdate||(u.breadcrumbs=void 0))}))),t.breadcrumbs||(t.breadcrumbs=new Et(t,i)),o.eventsToUnbind.push(I(t.breadcrumbs,"up",function(s){for(var n=this.level-s.newLevel,u=0;u<n;u++)o.drillUp()}))},r.prototype.onClickDrillToNode=function(t){var e=this,o=t.point,i=o&&o.drillId;K(i)&&(o.setState(""),e.setRootNode(i,!0,{trigger:"click"}))},r.prototype.pointAttribs=function(t,e){var o=this,i=ye(o.mapOptionsToLevel)?o.mapOptionsToLevel:{},l=t&&i[t.node.level]||{},s=this.options,n,u=e&&s.states&&s.states[e]||{},h=t&&t.getClassName()||"",p;return n={stroke:t&&t.borderColor||l.borderColor||u.borderColor||s.borderColor,"stroke-width":S(t&&t.borderWidth,l.borderWidth,u.borderWidth,s.borderWidth),dashstyle:t&&t.borderDashStyle||l.borderDashStyle||u.borderDashStyle||s.borderDashStyle,fill:t&&t.color||this.color},h.indexOf("highcharts-above-level")!==-1?(n.fill="none",n["stroke-width"]=0):h.indexOf("highcharts-internal-node-interactive")!==-1?(p=S(u.opacity,s.opacity),n.fill=vt(n.fill).setOpacity(p).get(),n.cursor="pointer"):h.indexOf("highcharts-internal-node")!==-1?n.fill="none":e&&(n.fill=vt(n.fill).brighten(u.brightness).get()),n},r.prototype.setColorRecursive=function(t,e,o,i,l){var s=this,n=s&&s.chart,u=n&&n.options&&n.options.colors,h,p;t&&(h=he(t,{colors:u,index:i,mapOptionsToLevel:s.mapOptionsToLevel,parentColor:e,parentColorIndex:o,series:s,siblings:l}),p=s.points[t.i],p&&(p.color=h.color,p.colorIndex=h.colorIndex),(t.children||[]).forEach(function(d,c){s.setColorRecursive(d,h.color,h.colorIndex,c,t.children.length)}))},r.prototype.setPointValues=function(){var t=this,e=t.points,o=t.xAxis,i=t.yAxis,l=t.chart.styledMode,s=function(n){return l?0:(t.pointAttribs(n)["stroke-width"]||0)%2/2};e.forEach(function(n){var u=n.node,h=u.pointValues,p=u.visible;if(h&&p){var d=h.height,c=h.width,f=h.x,v=h.y,y=s(n),m=Math.round(o.toPixels(f,!0))-y,b=Math.round(o.toPixels(f+c,!0))-y,w=Math.round(i.toPixels(v,!0))-y,T=Math.round(i.toPixels(v+d,!0))-y,P={x:Math.min(m,b),y:Math.min(w,T),width:Math.abs(b-m),height:Math.abs(T-w)};n.plotX=P.x+P.width/2,n.plotY=P.y+P.height/2,n.shapeArgs=P}else delete n.plotX,delete n.plotY})},r.prototype.setRootNode=function(t,e,o){var i=this,l=V({newRootId:t,previousRootId:i.rootNode,redraw:S(e,!0),series:i},o),s=function(n){var u=n.series;u.idPreviousRoot=n.previousRootId,u.rootNode=n.newRootId,u.isDirty=!0,n.redraw&&u.chart.redraw()};ge(i,"setRootNode",l,s)},r.prototype.setState=function(t){this.options.inactiveOtherPoints=!0,B.prototype.setState.call(this,t,!1),this.options.inactiveOtherPoints=!1},r.prototype.setTreeValues=function(t){var e=this,o=e.options,i=e.rootNode,l=e.nodeMap,s=l[i],n=R.isBoolean(o.levelIsConstant)?o.levelIsConstant:!0,u=0,h=[],p,d=e.points[t.i];return t.children.forEach(function(c){c=e.setTreeValues(c),h.push(c),c.ignore||(u+=c.val)}),me(h,function(c,f){return(c.sortIndex||0)-(f.sortIndex||0)}),p=S(d&&d.options.value,u),d&&(d.value=p),V(t,{children:h,childrenTotal:u,ignore:!(S(d&&d.visible,!0)&&p>0),isLeaf:t.visible&&!u,levelDynamic:t.level-(n?0:s.level),name:S(d&&d.name,""),sortIndex:S(d&&d.sortIndex,-p),val:p}),t},r.prototype.sliceAndDice=function(t,e){return this.algorithmFill(!0,t,e)},r.prototype.squarified=function(t,e){return this.algorithmLowAspectRatio(!0,t,e)},r.prototype.strip=function(t,e){return this.algorithmLowAspectRatio(!1,t,e)},r.prototype.stripes=function(t,e){return this.algorithmFill(!1,t,e)},r.prototype.translate=function(){var t=this,e=t.options,o=ce(t),i,l,s,n,u;B.prototype.translate.call(t),n=t.tree=t.getTree(),i=t.nodeMap[o],o!==""&&(!i||!i.children.length)&&(t.setRootNode("",!1),o=t.rootNode,i=t.nodeMap[o]),t.mapOptionsToLevel=pe({from:i.level+1,levels:e.levels,to:n.height,defaults:{levelIsConstant:t.options.levelIsConstant,colorByPoint:e.colorByPoint}}),R.recursive(t.nodeMap[t.rootNode],function(h){var p=!1,d=h.parent;return h.visible=!0,(d||d==="")&&(p=t.nodeMap[d]),p}),R.recursive(t.nodeMap[t.rootNode].children,function(h){var p=!1;return h.forEach(function(d){d.visible=!0,d.children.length&&(p=(p||[]).concat(d.children))}),p}),t.setTreeValues(n),t.axisRatio=t.xAxis.len/t.yAxis.len,t.nodeMap[""].pointValues=l={x:0,y:0,width:R.AXIS_MAX,height:R.AXIS_MAX},t.nodeMap[""].values=s=O(l,{width:l.width*t.axisRatio,direction:e.layoutStartingDirection==="vertical"?0:1,val:n.val}),t.calculateChildrenAreas(n,s),!t.colorAxis&&!e.colorByPoint&&t.setColorRecursive(t.tree),e.allowTraversingTree&&(u=i.pointValues,t.xAxis.setExtremes(u.x,u.x+u.width,!1),t.yAxis.setExtremes(u.y,u.y+u.height,!1),t.xAxis.setScale(),t.yAxis.setScale()),t.setPointValues()},r.defaultOptions=O(yt.defaultOptions,{allowTraversingTree:!1,animationLimit:250,borderRadius:0,showInLegend:!1,marker:void 0,colorByPoint:!1,dataLabels:{defer:!1,enabled:!0,formatter:function(){var t=this&&this.point?this.point:{},e=K(t.name)?t.name:"";return e},inside:!0,verticalAlign:"middle"},tooltip:{headerFormat:"",pointFormat:"<b>{point.name}</b>: {point.value}<br/>"},ignoreHiddenPoint:!0,layoutAlgorithm:"sliceAndDice",layoutStartingDirection:"vertical",alternateStartingDirection:!1,levelIsConstant:!0,traverseUpButton:{position:{align:"right",x:-10,y:10}},borderColor:"#e6e6e6",borderWidth:1,colorKey:"colorValue",opacity:.15,states:{hover:{borderColor:"#999999",brightness:ue?0:.1,halo:!1,opacity:.75,shadow:!1}}}),r}(yt);V(st.prototype,{buildKDTree:gt,colorAttribs:St.seriesMembers.colorAttribs,colorKey:"colorValue",directTouch:!0,drawLegendSymbol:Wt.drawRectangle,getExtremesFromAll:!0,getSymbol:gt,optionalAxis:"colorAxis",parallelArrays:["x","y","value","colorValue"],pointArrayMap:["value"],pointClass:Ct,trackerGroups:["group","dataLabelsGroup"],utils:{recursive:R.recursive}});St.compose(st);L.registerSeriesType("treemap",st);var be=globalThis&&globalThis.__extends||function(){var a=function(r,t){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])},a(r,t)};return function(r,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");a(r,t);function e(){this.constructor=r}r.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}}(),q=L.series.prototype.pointClass,xe=L.seriesTypes.treemap.prototype.pointClass,bt=g.correctFloat,Te=g.extend,Bt=function(a){be(r,a);function r(){var t=a!==null&&a.apply(this,arguments)||this;return t.node=void 0,t.options=void 0,t.series=void 0,t.shapeExisting=void 0,t}return r.prototype.getDataLabelPath=function(t){var e=this.series.chart.renderer,o=this.shapeExisting,i=o.start,l=o.end,s=i+(l-i)/2,n=s<0&&s>-Math.PI||s>Math.PI,u=o.r+(t.options.distance||0),h;return i===-Math.PI/2&&bt(l)===bt(Math.PI*1.5)&&(i=-Math.PI+Math.PI/360,l=-Math.PI/360,n=!0),l-i>Math.PI&&(n=!1,h=!0),this.dataLabelPath&&(this.dataLabelPath=this.dataLabelPath.destroy()),this.dataLabelPath=e.arc({open:!0,longArc:h?1:0}).add(t),this.dataLabelPath.attr({start:n?i:l,end:n?l:i,clockwise:+n,x:o.x,y:o.y,r:(u+o.innerR)/2}),this.dataLabelPath},r.prototype.isValid=function(){return!0},r}(xe);Te(Bt.prototype,{getClassName:q.prototype.getClassName,haloPath:q.prototype.haloPath,setState:q.prototype.setState});var Le=L.seriesTypes.treemap,$=g.isNumber,xt=g.isObject,we=g.merge,tt;(function(a){a.recursive=Le.prototype.utils.recursive;function r(o,i){var l,s=xt(i)?i:{},n=0,u,h,p,d,c,f;return xt(o)&&(l=we({},o),c=$(s.from)?s.from:0,f=$(s.to)?s.to:0,h=e(c,f),p=Object.keys(l).filter(function(v){return h.indexOf(+v)===-1}),u=d=$(s.diffRadius)?s.diffRadius:0,h.forEach(function(v){var y=l[v],m=y.levelSize.unit,b=y.levelSize.value;m==="weight"?n+=b:m==="percentage"?(y.levelSize={unit:"pixels",value:b/100*u},d-=y.levelSize.value):m==="pixels"&&(d-=b)}),h.forEach(function(v){var y=l[v],m;y.levelSize.unit==="weight"&&(m=y.levelSize.value,l[v].levelSize={unit:"pixels",value:m/n*d})}),p.forEach(function(v){l[v].levelSize={value:0,unit:"pixels"}})),l}a.calculateLevelSizes=r;function t(o){var i=o.level,l=o.height,s=i>0?i:1,n=i+l;return{from:s,to:n}}a.getLevelFromAndTo=t;function e(o,i){var l=[],s;if($(o)&&$(i)&&o<=i)for(s=o;s<=i;s++)l.push(s);return l}a.range=e})(tt||(tt={}));const et=tt;var Pe=globalThis&&globalThis.__extends||function(){var a=function(r,t){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,o){e.__proto__=o}||function(e,o){for(var i in o)Object.prototype.hasOwnProperty.call(o,i)&&(e[i]=o[i])},a(r,t)};return function(r,t){if(typeof t!="function"&&t!==null)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");a(r,t);function e(){this.constructor=r}r.prototype=t===null?Object.create(t):(e.prototype=t.prototype,new e)}}(),Ae=At.getCenter,Se=At.getStartAndEndRadians,Re=F.noop,Z=L.series,It=L.seriesTypes,Oe=It.column,Tt=It.treemap,Ce=E.getColor,Ee=E.getLevelOptions,Be=E.setTreeValues,Ie=E.updateRootId,Me=g.error,rt=g.extend,ot=g.isNumber,j=g.isObject,_e=g.isString,z=g.merge,Ne=g.splat,De=180/Math.PI;function $e(a){return typeof a=="boolean"}var Lt=function(r,t,e,o){return{x:r+Math.cos(e)*o,y:t+Math.sin(e)*o}};function ke(a){var r=a.point,t=j(a.shapeArgs)?a.shapeArgs:{},e=j(a.optionsPoint)?a.optionsPoint.dataLabels:{},o=Ne(j(a.level)?a.level.dataLabels:{})[0],i=z({style:{}},o,e),l,s,n=i.rotationMode;return ot(i.rotation)||((n==="auto"||n==="circular")&&(r.innerArcLength<1&&r.outerArcLength>t.radius?(l=0,r.dataLabelPath&&n==="circular"&&(i.textPath={enabled:!0})):r.innerArcLength>1&&r.outerArcLength>1.5*t.radius?n==="circular"?i.textPath={enabled:!0,attributes:{dy:5}}:n="parallel":(r.dataLabel&&r.dataLabel.textPathWrapper&&n==="circular"&&(i.textPath={enabled:!1}),n="perpendicular")),n!=="auto"&&n!=="circular"&&(l=t.end-(t.end-t.start)/2),n==="parallel"?i.style.width=Math.min(t.radius*2.5,(r.outerArcLength+r.innerArcLength)/2):i.style.width=t.radius,n==="perpendicular"&&r.series.chart.renderer.fontMetrics(i.style.fontSize).h>r.outerArcLength&&(i.style.width=1),i.style.width=Math.max(i.style.width-2*(i.padding||0),1),s=l*De%180,n==="parallel"&&(s-=90),s>90?s-=180:s<-90&&(s+=180),i.rotation=s),i.textPath&&(r.shapeExisting.innerR===0&&i.textPath.enabled?(i.rotation=0,i.textPath.enabled=!1,i.style.width=Math.max(r.shapeExisting.r*2-2*(i.padding||0),1)):r.dlOptions&&r.dlOptions.textPath&&!r.dlOptions.textPath.enabled&&n==="circular"&&(i.textPath.enabled=!0),i.textPath.enabled&&(i.rotation=0,i.style.width=Math.max((r.outerArcLength+r.innerArcLength)/2-2*(i.padding||0),1))),i.rotation===0&&(i.rotation=.001),i}function Ue(a,r){var t=r.point,e=r.radians,o=r.innerR,i=r.idRoot,l=r.idPreviousRoot,s=r.shapeExisting,n=r.shapeRoot,u=r.shapePreviousRoot,h=r.visible,p={},d={end:a.end,start:a.start,innerR:a.innerR,r:a.r,x:a.x,y:a.y};return h?!t.graphic&&u&&(i===t.id?p={start:e.start,end:e.end}:p=u.end<=a.start?{start:e.end,end:e.end}:{start:e.start,end:e.start},p.innerR=p.r=o):t.graphic&&(l===t.id?d={innerR:o,r:o}:n&&(d=n.end<=s.start?{innerR:o,r:o,start:e.end,end:e.end}:{innerR:o,r:o,start:e.start,end:e.start})),{from:p,to:d}}function We(a,r,t){var e,o=a.node,i;return o.isLeaf||(r===a.id?(i=t[r],e=i.parent):e=a.id),e}function Ve(a,r){var t=r.mapIdToNode,e=t[a.parent],o=r.series,i=o.chart,l=o.points,s=l[a.i],n=o.options.colors||i&&i.options.colors,u=Ce(a,{colors:n,colorIndex:o.colorIndex,index:r.index,mapOptionsToLevel:r.mapOptionsToLevel,parentColor:e&&e.color,parentColorIndex:e&&e.colorIndex,series:r.series,siblings:r.siblings});return a.color=u.color,a.colorIndex=u.colorIndex,s&&(s.color=a.color,s.colorIndex=a.colorIndex,a.sliced=a.id!==r.idRoot?s.sliced:!1),a}var Mt=function(a){Pe(r,a);function r(){var t=a!==null&&a.apply(this,arguments)||this;return t.center=void 0,t.data=void 0,t.mapOptionsToLevel=void 0,t.nodeMap=void 0,t.options=void 0,t.points=void 0,t.shapeRoot=void 0,t.startAndEndRadians=void 0,t.tree=void 0,t}return r.prototype.alignDataLabel=function(t,e,o){if(!(o.textPath&&o.textPath.enabled))return a.prototype.alignDataLabel.apply(this,arguments)},r.prototype.animate=function(t){var e=this.chart,o=[e.plotWidth/2,e.plotHeight/2],i=e.plotLeft,l=e.plotTop,s,n=this.group;t?(s={translateX:o[0]+i,translateY:o[1]+l,scaleX:.001,scaleY:.001,rotation:10,opacity:.01},n.attr(s)):(s={translateX:i,translateY:l,scaleX:1,scaleY:1,rotation:0,opacity:1},n.animate(s,this.options.animation))},r.prototype.drawPoints=function(){var t=this,e=t.mapOptionsToLevel,o=t.shapeRoot,i=t.group,l=t.hasRendered,s=t.rootNode,n=t.idPreviousRoot,u=t.nodeMap,h=u[n],p=h&&h.shapeArgs,d=t.points,c=t.startAndEndRadians,f=t.chart,v=f&&f.options&&f.options.chart||{},y=$e(v.animation)?v.animation:!0,m=t.center,b={x:m[0],y:m[1]},w=m[3]/2,T=t.chart.renderer,P,at=!1,H=!1,nt=!!(y&&l&&s!==n&&t.dataLabelsGroup);nt&&(t.dataLabelsGroup.attr({opacity:0}),P=function(){var x=t;at=!0,x.dataLabelsGroup&&x.dataLabelsGroup.animate({opacity:1,visibility:"inherit"})}),d.forEach(function(x){var M=x.node,_t=e[M.level],Nt=x.shapeExisting||{},A=M.shapeArgs||{},k,lt,U=!!(M.visible&&M.shapeArgs);l&&y?k=Ue(A,{center:b,point:x,radians:c,innerR:w,idRoot:s,idPreviousRoot:n,shapeExisting:Nt,shapeRoot:o,shapePreviousRoot:p,visible:U}):k={to:A,from:{}},rt(x,{shapeExisting:A,tooltipPos:[A.plotX,A.plotY],drillId:We(x,s,u),name:""+(x.name||x.id||x.index),plotX:A.plotX,plotY:A.plotY,value:M.val,isInside:U,isNull:!U}),x.dlOptions=ke({point:x,level:_t,optionsPoint:x.options,shapeArgs:A}),!H&&U&&(H=!0,lt=P),x.draw({animatableAttribs:k.to,attribs:rt(k.from,!f.styledMode&&t.pointAttribs(x,x.selected&&"select")),onComplete:lt,group:i,renderer:T,shapeType:"arc",shapeArgs:A})}),nt&&H?(t.hasRendered=!1,t.options.dataLabels.defer=!0,Z.prototype.drawDataLabels.call(t),t.hasRendered=!0,at&&P()):Z.prototype.drawDataLabels.call(t)},r.prototype.layoutAlgorithm=function(t,e,o){var i=t.start,l=t.end-i,s=t.val,n=t.x,u=t.y,h=o&&j(o.levelSize)&&ot(o.levelSize.value)?o.levelSize.value:0,p=t.r,d=p+h,c=o&&ot(o.slicedOffset)?o.slicedOffset:0;return(e||[]).reduce(function(f,v){var y=1/s*v.val,m=y*l,b=i+m/2,w=Lt(n,u,b,c),T={x:v.sliced?w.x:n,y:v.sliced?w.y:u,innerR:p,r:d,radius:h,start:i,end:i+m};return f.push(T),i=T.end,f},[])},r.prototype.setShapeArgs=function(t,e,o){var i=[],l=t.level+1,s=o[l],n=t.children.filter(function(h){return h.visible}),u=6.28;i=this.layoutAlgorithm(e,n,s),n.forEach(function(h,p){var d=i[p],c=d.start+(d.end-d.start)/2,f=d.innerR+(d.r-d.innerR)/2,v=d.end-d.start,y=d.innerR===0&&v>u,m=y?{x:d.x,y:d.y}:Lt(d.x,d.y,c,f),b=h.val?h.childrenTotal>h.val?h.childrenTotal:h.val:h.childrenTotal;this.points[h.i]&&(this.points[h.i].innerArcLength=v*d.innerR,this.points[h.i].outerArcLength=v*d.r),h.shapeArgs=z(d,{plotX:m.x,plotY:m.y+4*Math.abs(Math.cos(c))}),h.values=z(d,{val:b}),h.children.length&&this.setShapeArgs(h,h.values,o)},this)},r.prototype.translate=function(){var t=this,e=t.options,o=t.center=t.getCenter(),i=t.startAndEndRadians=Se(e.startAngle,e.endAngle),l=o[3]/2,s=o[2]/2,n=s-l,u=Ie(t),h=t.nodeMap,p,d,c=h&&h[u],f,v,y,m={};t.shapeRoot=c&&c.shapeArgs,Z.prototype.translate.call(t),v=t.tree=t.getTree(),h=t.nodeMap,c=h[u],d=_e(c.parent)?c.parent:"",f=h[d];var b=et.getLevelFromAndTo(c),w=b.from,T=b.to;p=Ee({from:w,levels:t.options.levels,to:T,defaults:{colorByPoint:e.colorByPoint,dataLabels:e.dataLabels,levelIsConstant:e.levelIsConstant,levelSize:e.levelSize,slicedOffset:e.slicedOffset}}),p=et.calculateLevelSizes(p,{diffRadius:n,from:w,to:T}),Be(v,{before:Ve,idRoot:u,levelIsConstant:e.levelIsConstant,mapOptionsToLevel:p,mapIdToNode:h,points:t.points,series:t}),y=h[""].shapeArgs={end:i.end,r:l,start:i.start,val:c.val,x:o[0],y:o[1]},this.setShapeArgs(f,y,p),t.mapOptionsToLevel=p,t.data.forEach(function(P){m[P.id]&&Me(31,!1,t.chart),m[P.id]=!0}),m={}},r.defaultOptions=z(Tt.defaultOptions,{center:["50%","50%"],colorByPoint:!1,opacity:1,dataLabels:{allowOverlap:!0,defer:!0,rotationMode:"auto",style:{textOverflow:"ellipsis"}},rootId:void 0,levelIsConstant:!0,levelSize:{value:1,unit:"weight"},slicedOffset:10}),r}(Tt);rt(Mt.prototype,{drawDataLabels:Re,getCenter:Ae,onPointSupported:!0,pointAttribs:Oe.prototype.pointAttribs,pointClass:Bt,utils:et});L.registerSeriesType("sunburst",Mt);const je=console;function wt(a,r){const t=C.findIndex(r==null?void 0:r.columns,e=>a.id===e);return C.map(r==null?void 0:r.dataValue,e=>e[t])}function ze(a){var s,n,u;const r=((n=(s=a.config)==null?void 0:s.chartConfig)==null?void 0:n[0].dimensions)??[],t=((u=a.data)==null?void 0:u[0].data)??void 0,e=(r==null?void 0:r[0].columns)??[],o=(r==null?void 0:r[1].columns)??[],i={},l=wt(o[0],t);return t==null||t.dataValue.forEach((h,p)=>{let d="";e.forEach((c,f)=>{const v=wt(c,t),y=f===0?C.kebabCase(`${v[p]}`):C.kebabCase(`${d}-${v[p]}`);i[y]={parent:d,id:y,name:v[p]},f===e.length-1&&(i[y].value=l[p]),d=y})}),{values:C.values(i)}}function Fe(a){const r=a.getChartModel(),t=ze(r);try{const e=ut.chart({chart:{renderTo:"chart"},plotOptions:{series:{animation:!1}},colors:["transparent"].concat(ut.getOptions().colors),series:[{type:"sunburst",turboThreshold:t.values.length,data:t.values,name:"Root",allowDrillToNode:!0,borderRadius:3,cursor:"pointer",dataLabels:{format:"{point.name}",filter:{property:"innerArcLength",operator:">",value:16}},levels:[{level:1,colorByPoint:!0,dataLabels:{filter:{property:"outerArcLength",operator:">",value:64}}},{level:2,colorVariation:{key:"brightness",to:-.5}},{level:3,colorVariation:{key:"brightness",to:.5}},{level:4,colorVariation:{key:"brightness",to:-.5}}]}]})}catch(e){throw je.error("renderfailed",e),e}}const Pt=async a=>{try{a.emitEvent(X.RenderStart),Fe(a)}catch(r){a.emitEvent(X.RenderError,{hasError:!0,error:r})}finally{a.emitEvent(X.RenderComplete)}},He=async()=>{const a=await Dt({getDefaultChartConfig:r=>{const t=r.columns,e=C.filter(t,l=>l.type===dt.MEASURE);return[{key:"default",dimensions:[{key:"segments",columns:[...C.filter(t,l=>l.type===dt.ATTRIBUTE)]},{key:"values",columns:e.slice(0,1)}]}]},getQueriesFromChartConfig:r=>r.map(t=>C.reduce(t.dimensions,(e,o)=>({queryColumns:[...e.queryColumns,...o.columns]}),{queryColumns:[]})),renderChart:r=>Pt(r)});Pt(a)};He();
