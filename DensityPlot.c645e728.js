(window.webpackJsonp=window.webpackJsonp||[]).push([[148],{3224:function(t,e,n){"use strict";n(408),n(405),n(391),n(387),n(402),n(360),n(352),n(363);var r=n(362),a=n.n(r),i=n(353),s=n.n(i),o=n(354),l=n.n(o),c=n(357),p=n.n(c),u=n(358),h=n.n(u),f=n(355),d=n.n(f),y=n(350),m=n.n(y),g=n(0),x=(n(341),n(20)),b=n(1161);function v(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=d()(t);if(e){var a=d()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return h()(this,n)}}function w(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function k(t){return function(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?w(Object(n),!0).forEach((function(e){m()(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):w(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}({margin:{top:20,bottom:30,left:50,right:50},xaxis:{orientation:"bottom"},yaxis:{orientation:"left"}},void 0===t?{}:t)}var O=function(t){p()(n,t);var e=v(n);function n(t){var r;return s()(this,n),(r=e.call(this,t)).opts=k(t.options),r}return l()(n,[{key:"componentDidMount",value:function(){this.chart=b.u(Object(x.findDOMNode)(this)).append("g").attr("transform","translate("+this.opts.margin.left+","+this.opts.margin.top+")"),this.initialize(this.chart,this.props.data,this.opts)}},{key:"componentDidUpdate",value:function(){this.update(this.chart,this.props.data,this.opts)}},{key:"render",value:function(){var t=this.props,e=t.className,n=t.width,r=t.height,i=k(t.options),s="d3-plot";return e&&(s=s.concat(" ",this.props.className)),a()("svg",{className:s,width:n+i.margin.left+i.margin.right,height:r+i.margin.top+i.margin.bottom,style:{display:"block",margin:"auto"}})}}]),n}(g.Component);O.defaultProps={className:"",options:{}},e.a=O},5689:function(t,e,n){"use strict";n.r(e);n(360),n(352),n(363);var r=n(353),a=n.n(r),i=n(354),s=n.n(i),o=n(357),l=n.n(o),c=n(358),p=n.n(c),u=n(355),h=n.n(u),f=(n(0),n(341)),d=n.n(f),y=n(3224),m=n(1161),g=n(366),x=n.n(g),b=n(419),v=n.n(b);function w(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var n,r=h()(t);if(e){var a=h()(this).constructor;n=Reflect.construct(r,arguments,a)}else n=r.apply(this,arguments);return p()(this,n)}}var k=["#3366cc","#dc3912","#ff9900","#109618","#990099","#0099c6","#dd4477","#66aa00","#b82e2e","#316395","#994499","#22aa99","#aaaa11","#6633cc","#e67300","#8b0707","#651067","#329262","#5574a6","#3b3eac"];var O=function(t){l()(n,t);var e=w(n);function n(t){var r;a()(this,n),r=e.call(this,t);var i=t.width-r.opts.margin.left-r.opts.margin.right,s=t.height-r.opts.margin.top-r.opts.margin.bottom,o=m.r().domain([t.xmin,t.xmax]).range([0,i]),l=m.r().domain([0,r.props.ymax]).range([s,0]),c=m.n().x((function(t){return o(t[0])})).y((function(t){return l(t[1])}));return r.state={x:o,y:l,line:c},r}return s()(n,[{key:"initialize",value:function(t,e,n){var r=this.props.width-n.margin.left-n.margin.right,a=this.props.height-n.margin.top-n.margin.bottom,i=m.b(this.state.x),s=m.c(this.state.y);t.append("g").attr("class","x axis").attr("transform","translate(0,"+a+")").call(i).append("text").attr("class","d3label").attr("x",r).attr("y",-6).style("fill","none").text(this.props.xlab);var o=this.props.vline;void 0!==o&&(t.append("line").attr("y1",this.state.y(0)).attr("y2",this.state.y(this.props.ymax)).attr("x1",this.state.x(o.value)).attr("x2",this.state.x(o.value)).attr("stroke","black").attr("stroke-width","2"),t.append("text").attr("x",1.1*this.state.x(o.value)).attr("y",this.state.y(this.props.ymax/1.2)).attr("y",".2em").text(o.label)),t.select(".line").style("fill","none").style("stroke","#000").style("stroke-width","1.5px"),t.select(".axis path").style("fill","none").style("stroke","#000").style("shape-rendering","crispEdges"),t.select(".axis line").style("fill","none").style("stroke","#000").style("shape-rendering","crispEdges"),t.append("g").attr("class","y axis").call(s),t.select(".y.axis path").style("display","none")}},{key:"update",value:function(t,e,n){var r,a=this;if(v()(e)){var i=function(t,e){return function(n){return e.map((function(e){return[e,m.o(n,(function(n){return t(e-n)}))]}))}}((r=this.props.bandwidth,function(t){return t/=r,x()(t)<=1?.75*(1-t*t)/r:0}),this.state.x.ticks(100)),s=this.props.height-n.margin.top-n.margin.bottom;if(t.selectAll(".dline").remove(),t.selectAll(".bar").remove(),v()(e[0]))e.forEach((function(e,n){t.append("path").datum(i(e)).attr("class","dline").attr("d",a.state.line).style("fill","none").style("stroke",k[n]).style("stroke-width","1.5px")}));else{if(this.props.histogram){var o=m.l().domain([this.props.xmin,this.props.xmax]).thresholds(this.props.nBins)(e),l=this.state,c=l.x,p=l.y;t.selectAll(".bar").data(o).enter().insert("rect",".axis").attr("class","bar").attr("x",1).attr("transform",(function(t){return"translate("+c(t.x0)+","+p(t.length/e.length)+")"})).attr("width",(function(t){return c(t.x1)-c(t.x0)-1})).attr("height",(function(t){return s-p(t.length/e.length)})).style("fill","#bbb").style("shape-rendering","crispEdges")}t.append("path").datum(i(e)).attr("class","dline").attr("d",this.state.line).style("fill","none").style("stroke","steelblue").style("stroke-width","1.5px")}}}}]),n}(y.a);O.propTypes={bandwidth:d.a.number,histogram:d.a.bool,nBins:d.a.number,vline:d.a.object,xlab:d.a.string,xmax:d.a.number,xmin:d.a.number,ymax:d.a.number},O.defaultProps={bandwidth:4,height:300,histogram:!0,nBins:8,vline:void 0,width:600,xlab:"value",xmax:1,xmin:0,ymax:.15},e.default=O}}]);