(window.webpackJsonp=window.webpackJsonp||[]).push([[160],{5694:function(t,e,r){"use strict";r.r(e);r(408),r(405),r(391),r(387),r(402),r(360),r(352),r(363);var i=r(362),n=r.n(i),s=r(350),h=r.n(s),o=r(353),c=r.n(o),u=r(354),a=r.n(u),p=r(357),l=r.n(p),f=r(358),d=r.n(f),w=r(355),g=r.n(w),y=r(0),b=(r(341),r(447));function O(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,i)}return r}function v(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?O(Object(r),!0).forEach((function(e){h()(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):O(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}function P(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,i=g()(t);if(e){var n=g()(this).constructor;r=Reflect.construct(i,arguments,n)}else r=i.apply(this,arguments);return d()(this,r)}}var j=function(t){l()(r,t);var e=P(r);function r(t){var i;return c()(this,r),(i=e.call(this,t)).state={width:t.width||window.innerWidth,height:t.height||window.innerHeight},i}return a()(r,[{key:"render",value:function(){var t;return t=this.props.fullscreen?v({position:"absolute",width:this.state.width,height:this.state.height,top:0,left:0},this.props.style):v({width:this.state.width,height:this.state.height},this.props.style),n()(b.a,{id:this.props.id,className:this.props.className,style:t},void 0,n()("iframe",{src:this.props.src,width:this.state.width,height:this.state.height,title:this.props.title}))}}],[{key:"getDerivedStateFromProps",value:function(t,e){return t.fullscreen?{width:window.innerWidth,height:window.innerHeight}:e.width!==t.width||e.height!==t.height?{width:t.width,height:t.height}:null}}]),r}(y.Component);j.defaultProps={title:"An iFrame",fullscreen:!1,width:900,height:600,className:"",style:{}},j.defaultProps={},e.default=j}}]);