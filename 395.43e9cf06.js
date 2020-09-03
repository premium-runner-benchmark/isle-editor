(window.webpackJsonp=window.webpackJsonp||[]).push([[395],{5745:function(e,t,a){"use strict";a.r(t);a(360),a(352),a(363);var n=a(353),r=a.n(n),o=a(354),i=a.n(o),l=a(357),s=a.n(l),c=a(358),u=a.n(c),d=a(355),v=a.n(d),f=a(350),g=a.n(f),p=a(362),h=a.n(p),b=a(0),y=(a(341),a(396)),m=a.n(y),w=a(983),V=a(397),C=a(447),F=a(664),R=a(556),P=a(508),x=a(549),S=a.n(x),q=a(498),D=a.n(q),T=a(1292),k=a.n(T),A=a(1293),G=a.n(A),B=a(703),J=a.n(B),z=a(389),H=a.n(z),N=a(443),X=a(741);function Y(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var a,n=v()(e);if(t){var r=v()(this).constructor;a=Reflect.construct(n,arguments,r)}else a=n.apply(this,arguments);return u()(this,a)}}var j=m()("isle:data-explorer:contingency-table"),E={numeric:!0},I=h()("br",{}),K=h()(b.Fragment,{},void 0,h()("br",{}),"(1.0)"),L=h()("th",{},void 0,"Row Totals"),M=h()("br",{}),O=h()("br",{}),Q=h()(b.Fragment,{},void 0,h()("br",{}),"(1.0)"),U=h()("br",{}),W=h()("th",{},void 0,"Column Totals"),Z=h()(b.Fragment,{},void 0,h()("br",{}),"(1.0)"),$=h()(b.Fragment,{},void 0,h()("br",{}),"(1.0)"),_=function(e,t,a,n,r,o){var i,l,s={},c={},u=e[t],d=e[a],v=u.length,f=k()(u,G.a),g=k()(d,G.a),p=S()(o,"Row Percent"),y=S()(o,"Column Percent");t.categories?i=t.categories:(i=D()(f)).sort((function(e,t){return e.localeCompare(t,void 0,E)})),a.categories?l=a.categories:(l=D()(g)).sort((function(e,t){return e.localeCompare(t,void 0,E)}));for(var m=0;m<i.length;m++)for(var V=0;V<l.length;V++){for(var C=i[m],F=l[V],R=0,P=0;P<v;P++)String(u[P])===C&&String(d[P])===F&&(R+=1);s[C+"-"+F]=R,c[C+"-"+F]=R/v}var x=[];for(var q in g)if(H()(g,q)){var T=g[q],A=null;p&&!n&&(A=h()(b.Fragment,{},void 0,I,"(",(T/v).toFixed(r),")")),n&&(T=(T/=v).toFixed(r)),x.push(h()("td",{},void 0,T,A,y?K:null))}return h()(w.a,{bordered:!0,size:"sm"},void 0,h()("thead",{},void 0,h()("tr",{},void 0,h()("th",{},void 0,t," \\ ",a),l.map((function(e,t){return h()("th",{},t,e)})),L)),h()("tbody",{},void 0,i.map((function(e,t){return h()("tr",{},t,h()("th",{},void 0,e),l.map((function(a,o){var i=s[e+"-"+a],l=c[e+"-"+a];return h()("td",{},"".concat(t,":").concat(o),n?l.toFixed(r):i,p?h()(b.Fragment,{},void 0,M,"(",(i/f[e]).toFixed(r),")"):null,y?h()(b.Fragment,{},void 0,O,"(",(i/g[a]).toFixed(r),")"):null)})),h()("td",{},void 0,n?(f[e]/v).toFixed(r):f[e],p?Q:null,y&&!n?h()(b.Fragment,{},void 0,U,"(",(f[e]/v).toFixed(r),")"):null))}))),h()("tbody",{},void 0,h()("tr",{},void 0,W,x,h()("th",{},void 0,n?1..toFixed(r):v,p?Z:null,y?$:null))))},ee=h()(C.a.Header,{as:"h4"},void 0,"Contingency Table",h()(X.a,{title:"Contingency Table",content:"A contingency table displays either the raw absolute or relative frequencies of two categorical variable's values alongside their row and column totals."})),te=function(e){s()(a,e);var t=Y(a);function a(e){var n;return r()(this,a),(n=t.call(this,e)).state={relativeFreqs:!1,rowVar:e.defaultRowVar||e.variables[0],colVar:e.defaultColVar||e.variables[1],group:null,nDecimalPlaces:3,variables:e.variables,display:[]},n}return i()(a,[{key:"generateContingencyTable",value:function(){var e,t=this.state,a=t.rowVar,n=t.colVar,r=t.group,o=t.relativeFreqs,i=t.nDecimalPlaces,l=t.display;if(!a||!n)return this.props.session.addNotification({title:"Select Variables",message:"You need to select a row and column variable for the contingency table",level:"warning",position:"tr"});if(r)e=function(e,t,a,n,r,o,i){for(var l={},s=0;s<e[n].length;s++){var c,u=e[n][s];if(!J()(l[u]))l[u]=(c={},g()(c,t,[]),g()(c,a,[]),c);l[u][t].push(e[t][s]),l[u][a].push(e[a][s])}for(var d=[],v=n.categories||D()(l),f=0;f<v.length;f++){var p=v[f];d.push(_(l[p],t,a,r,o,i))}return{variable:"".concat(t," by ").concat(a),type:"Contingency Table",value:h()("div",{style:{overflowX:"auto",width:"100%"}},void 0,h()("label",{},void 0,"Grouped by ".concat(n,":")),d.map((function(e,t){return h()("div",{},t,h()("label",{},void 0,"".concat(v[t]),": "),e)})))}}(this.props.data,a,n,r,o,i,l);else{var s=_(this.props.data,a,n,o,i,l);e={variable:"".concat(a," by ").concat(n),type:"Contingency Table",value:s}}this.props.logAction(N.h,{rowVar:a,colVar:n,group:r,relativeFreqs:o}),this.props.onCreated(e)}},{key:"render",value:function(){var e=this,t=this.props,a=t.variables,n=t.groupingVariables;return h()(C.a,{},void 0,ee,h()(C.a.Body,{},void 0,h()(R.a,{legend:"Row Variable:",defaultValue:this.state.rowVar,options:a,onChange:function(t){e.setState({rowVar:t})}}),h()(R.a,{legend:"Column Variable:",defaultValue:this.state.colVar,options:a,onChange:function(t){e.setState({colVar:t})}}),h()(R.a,{legend:"Group By:",options:n,clearable:!0,menuPlacement:"top",onChange:function(t){e.setState({group:t})},tooltip:"Generate a contingency table for each category of a chosen grouping variable"}),h()(F.a,{legend:"Relative Frequency",defaultValue:!1,onChange:function(){e.setState({relativeFreqs:!e.state.relativeFreqs})}}),h()(R.a,{legend:"Display:",options:["Row Percent","Column Percent"],multi:!0,onChange:function(t){e.setState({display:t||[]})}}),this.state.relativeFreqs||this.state.display.length>0?h()("p",{},void 0,"Report relative frequencies to",h()(P.b,{inline:!0,width:50,max:16,min:0,defaultValue:this.state.nDecimalPlaces,onChange:function(t){e.setState({nDecimalPlaces:t})}}),"decimal place(s)."):null,h()(V.a,{variant:"primary",block:!0,onClick:this.generateContingencyTable.bind(this)},void 0,"Generate")))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.variables.length!==t.variables.length?(j("Available variables have changed..."),{rowVar:e.defaultRowVar||e.variables[0],colVar:e.defaultColVar||e.variables[1],variables:e.variables}):null}}]),a}(b.Component);te.defaultProps={defaultRowVar:null,defaultColVar:null,groupingVariables:null,logAction:function(){},session:{}},t.default=te}}]);