(window.webpackJsonp=window.webpackJsonp||[]).push([[389],{2867:function(e,t){function a(e){var t=new Error("Cannot find module '"+e+"'");throw t.code="MODULE_NOT_FOUND",t}a.keys=function(){return[]},a.resolve=a,e.exports=a,a.id=2867},5758:function(e,t,a){"use strict";a.r(t);a(360),a(352),a(363);var n=a(362),o=a.n(n),i=a(353),r=a.n(i),c=a(354),s=a.n(c),l=a(369),p=a.n(l),u=a(357),d=a.n(u),f=a(358),v=a.n(f),h=a(355),g=a.n(h),y=a(350),b=a.n(y),w=a(0),m=(a(341),a(447)),S=a(397),C=a(508),D=a(556),O=a(630),P=a(419),T=a.n(P),V=a(4256),k=a.n(V),x=a(372),R=a.n(x),_=a(620),H=a.n(_),A=a(654),E=a.n(A),I=a(840),J=a.n(I),L=a(863),M=a(443),N=a(741);function U(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=g()(e);if(t){var o=g()(this).constructor;a=Reflect.construct(n,arguments,o)}else a=n.apply(this,arguments);return v()(this,a)}}var j=/\d{2}% confidence interval: \[-Infinity,-?[\d.]+\]/,q=/\d{2}% confidence interval: \[-?[\d.]+,Infinity\]/,z=o()("span",{},void 0,"We test"),B=o()(m.a.Header,{as:"h4"},void 0,"One-Sample Proportion Test",o()(N.a,{title:"One-Sample Proportion Test",content:"A test for the proportion of a selected category of a qualitative variable."})),F=o()(O.a,{raw:"p_0"}),W=o()("span",{},void 0,"Significance level ",o()(O.a,{raw:"\\alpha"})),X=function(e){d()(a,e);var t=U(a);function a(e){var n,i;if(r()(this,a),n=t.call(this,e),b()(p()(n),"calculatePropTest",(function(){var e=n.state,t=e.variable,a=e.success,i=e.p0,r=e.direction,c=e.alpha,s=n.props.data[t].map((function(e){return e===a?1:0})),l="\\ne";"less"===r?l="<":"greater"===r&&(l=">");var p=k()(s,R()(i*(1-i)),{alpha:c,alternative:r,mu:i}).print({decision:n.props.showDecision});p=E()(p,j,""),p=E()(p,q,"");var u={variable:"One-Sample Proportion Test for ".concat(t),type:"Test",value:o()("div",{style:{overflowX:"auto",width:"100%"}},void 0,o()("label",{},void 0,"Hypothesis test for ",t,":"),o()("p",{},void 0,"Let p be the population probability of ",o()("code",{},void 0,t)," being ",o()("code",{},void 0,a),"."),z,o()(O.a,{displayMode:!0,raw:"H_0: p = ".concat(i," \\; vs. \\; H_1: p ").concat(l," ").concat(i),tag:""}),o()("label",{},void 0,"Sample proportion: ",H()(Object(L.a)(s),-3)),o()("pre",{},void 0,p))};n.props.logAction(M.V,{variable:t,success:a,p0:i,direction:r,alpha:c}),n.props.onCreated(u)})),T()(e.categorical)&&e.categorical.length>0){var c=e.data[e.categorical[0]];c&&(i=c.slice(),J()(i))}else i=[];return n.state={variable:e.categorical[0],success:i[0],p0:.5,direction:"two-sided",alpha:.05,categories:i},n}return s()(a,[{key:"render",value:function(){var e=this,t=this.props.categorical;return o()(m.a,{style:{fontSize:"14px"}},void 0,B,o()(m.a.Body,{},void 0,o()(D.a,{legend:"Variable:",defaultValue:this.state.variable,options:t,onChange:function(t){var a,n=e.props.data[t];n&&(a=n.slice(),J()(a)),e.setState({categories:a,variable:t,success:a[0]})}}),o()(D.a,{legend:"Success:",defaultValue:this.state.success,options:this.state.categories,onChange:function(t){e.setState({success:t})}}),o()(C.b,{legend:F,defaultValue:this.state.p0,min:.001,max:.999,step:"any",onChange:function(t){e.setState({p0:t})}}),o()(D.a,{legend:"Direction:",defaultValue:this.state.direction,options:["less","greater","two-sided"],onChange:function(t){e.setState({direction:t})}}),o()(C.b,{legend:W,defaultValue:this.state.alpha,min:0,max:1,step:"any",onChange:function(t){e.setState({alpha:t})}}),o()(S.a,{variant:"primary",block:!0,onClick:this.calculatePropTest},void 0,"Calculate")))}}]),a}(w.Component);X.defaultProps={categorical:null,logAction:function(){},showDecision:!0},t.default=X}}]);