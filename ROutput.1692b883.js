(window.webpackJsonp=window.webpackJsonp||[]).push([[226],{1913:function(t,n,e){"use strict";var r=e(419),o=e.n(r);n.a=function(t,n,e){var r=e.config.rshell;r&&r.libraries&&(t=t.concat(r.libraries));var i=function(t){return t.map((function(t){return"library("+t+");"})).join(" ")}(t);return r&&r.global&&(i+=r.global+"\n"),n=o()(n)?n.join("\n"):n,i+=n+="\n"}},4140:function(t,n,e){"use strict";e.r(n);e(360),e(352),e(363);var r=e(353),o=e.n(r),i=e(354),s=e.n(i),u=e(369),a=e.n(u),c=e(357),p=e.n(c),l=e(358),f=e.n(l),d=e(355),g=e.n(d),h=e(350),v=e.n(h),m=e(362),R=e.n(m),y=e(0),b=(e(341),e(4372)),x=e.n(b),w=e(1524),k=e(1913),P=e(438);function S(t){var n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var e,r=g()(t);if(n){var o=g()(this).constructor;e=Reflect.construct(r,arguments,o)}else e=r.apply(this,arguments);return f()(this,e)}}var C=R()("span",{}),D=R()("span",{}),T=R()("span",{}),j=function(t){p()(e,t);var n=S(e);function e(t){var r;return o()(this,e),r=n.call(this,t),v()(a()(r),"getResult",(function(t){var n;if((n=t?t.code:r.props.code)!==r.state.last){r.setState({last:r.props.code,running:!0});var e=r.context,o=Object(k.a)(r.props.libraries,r.props.prependCode,e)+n;e.executeRCode({code:o,onError:function(t){r.setState({result:t,running:!1}),r.props.onResult(t)},onPlots:r.props.onPlots,onResult:function(t,n,e){r.setState({result:e,running:!1}),r.props.onResult(t,e)}})}})),r.state={result:null,running:!1,last:""},r}return s()(e,[{key:"componentDidMount",value:function(){this.getResult(this.props)}},{key:"componentDidUpdate",value:function(){this.getResult(this.props)}},{key:"render",value:function(){return R()("span",{className:"ROutput"},void 0,this.state.result?R()("div",{style:{marginLeft:"auto",marginRight:"auto",marginTop:"10px",marginBottom:"10px"}},void 0,R()(w.a,{width:128,height:64,style:{marginTop:"8px",marginBottom:"-12px"},running:this.state.running}),this.state.running?D:function(t){if(t){var n={__html:x.a.sanitize(t)};return R()("pre",{id:"output"},void 0,R()("span",{dangerouslySetInnerHTML:n}))}return C}(this.state.result)):T)}}]),e}(y.Component);j.defaultProps={code:"",libraries:[],prependCode:"",onPlots:function(){},onResult:function(){}},j.contextType=P.a,n.default=j}}]);