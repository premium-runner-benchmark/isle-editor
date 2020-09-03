/*! For license information please see DataSampler.fa2a599d.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[145],{481:function(e,t,a){"use strict";var n=a(510);e.exports=n},510:function(e,t,a){"use strict";var n=Math.ceil;e.exports=n},5687:function(e,t,a){"use strict";a.r(t);a(360),a(352),a(363);var n=a(362),r=a.n(n),i=a(353),s=a.n(i),l=a(354),o=a.n(l),u=a(369),c=a.n(u),p=a(357),f=a.n(p),m=a(358),h=a.n(m),d=a(355),v=a.n(d),S=a(350),g=a.n(S),z=a(0),b=(a(341),a(397)),w=a(631),y=a(508),x=a(1116),D=a.n(x),k=a(775),R=a.n(k),C=a(714),E=a.n(C),P=a(419),V=a.n(P),T=a(476),J=a.n(T),N=a(549),F=a.n(N),G=a(498),I=a.n(G),M=a(695),W=a.n(M);function j(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=v()(e);if(t){var r=v()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return h()(this,a)}}var q=function(e){f()(a,e);var t=j(a);function a(e){var n;s()(this,a),n=t.call(this,e),g()(c()(n),"handleNumberChange",(function(e){n.setState({sampleSize:e})})),g()(c()(n),"drawSample",(function(){for(var e=R()(0,n.state.nobs,1),t=D()(e,{size:n.state.sampleSize,replace:!1}),a={},i=n.state.originalData,s=0;s<n.state.variables.length;s++){var l=n.state.variables[s];a[l]=i[l].filter((function(e,a){return F()(t,a)}))}var o="".concat(t[0],"-").concat(t[1],"-").concat(t[2]),u=W.a;if(J()(n.props.children))u=n.props.children;else if(V()(n.props.children))for(var c=0;c<n.props.children.length;c++){var p=n.props.children[c];if(J()(p)){u=p;break}}n.setState({children:r()("div",{style:{animation:"roll-in-left 1s"}},o,u(a))})}));var i=I()(e.data),l=e.data[i[0]].length;return n.state={originalData:e.data,sampleSize:e.sampleSize,originalSampleSize:e.sampleSize,children:null,variables:i,nobs:l},n}return o()(a,[{key:"render",value:function(){return r()("div",{},void 0,r()(w.a,{style:{maxWidth:900}},void 0,r()(y.b,{legend:"Sample size",defaultValue:this.state.sampleSize,min:this.props.minSampleSize,max:this.props.maxSampleSize||this.state.nobs,step:1,onChange:this.handleNumberChange}),r()(b.a,{onClick:this.drawSample},void 0,"Draw Sample")),this.state.children)}}],[{key:"getDerivedStateFromProps",value:function(e,t){var a={};if(e.sampleSize!==t.originalSampleSize&&(a.sampleSize=e.sampleSize),e.data!==t.originalData){var n=I()(e.data),r=e.data[n[0]].length;a.nobs=r,a.variables=n,a.originalData=e.data}return E()(a)?null:a}}]),a}(z.Component);q.defaultProps={sampleSize:50,minSampleSize:1,maxSampleSize:null},t.default=q},775:function(e,t,a){"use strict";var n=a(920);e.exports=n},920:function(e,t,a){"use strict";var n=a(481),r=a(393).isPrimitive,i=a(346),s=a(811);e.exports=function(e,t,a){var l,o,u,c;if(!r(e)||i(e))throw new TypeError("invalid argument. Start must be numeric. Value: `"+e+"`.");if(!r(t)||i(t))throw new TypeError("invalid argument. Stop must be numeric. Value: `"+t+"`.");if(arguments.length<3)u=1;else if(!r(u=a)||i(u))throw new TypeError("invalid argument. Increment must be numeric. Value: `"+u+"`.");if((o=n((t-e)/u))>s)throw new RangeError("invalid arguments. Generated array exceeds maximum array length.");if(o<=1)return[e];for((l=[]).push(e),c=1;c<o;c++)l.push(e+u*c);return l}}}]);