(window.webpackJsonp=window.webpackJsonp||[]).push([[376],{1510:function(t,e,r){"use strict";var n=r(851),o=r.n(n),a=r(393);e.a=function(t,e){var r=o()(e);if(!o()(t))throw new TypeError("invalid input argument. Must provide an array. Value: `"+t+"`.");if(!r&&!Object(a.isPrimitive)(e))throw new TypeError("invalid input argument. Second argument must either be an array or number primitive. Value: `"+e+"`.");var n=t.length,i=new Array(n);if(r){if(n!==e.length)throw new Error("invalid input argument. Array to be added must have a length equal to that of the input array.");for(var s=0;s<n;s++)i[s]=t[s]-e[s]}else for(var c=0;c<n;c++)i[c]=t[c]-e;return i}},4253:function(t,e,r){"use strict";r(1331);e.a=function(t,e){for(var r=t.shape[0],n=t.shape[1],o=new Float64Array(r),a=0;a<r;a++){for(var i=0,s=0;s<n;s++)i+=t.get(a,s)*e[s];o[a]=i}return o}},4254:function(t,e,r){"use strict";var n=r(1710),o=r.n(n)()("float64",2);e.a=function(t){var e=[t.shape[1],t.shape[0]],r=[t.strides[1],t.strides[0]],n=t.offset,a=t.order;return o(t._buffer,e,r,n,a)}},5784:function(t,e,r){"use strict";r.r(e);r(360),r(352),r(363);var n=r(353),o=r.n(n),a=r(354),i=r.n(a),s=r(369),c=r.n(s),l=r(357),d=r.n(l),u=r(358),f=r.n(u),v=r(355),p=r.n(v),h=r(350),g=r.n(h),y=(r(812),r(362)),m=r.n(y),b=(r(1331),r(0)),w=(r(341),r(840)),A=r.n(w),x=r(397),F=r(669),S=r(2558),C=r(980),E=r(447),R=r(439),O=r(500),k=r(983),P=r(1502),T=r.n(P),V=r(549),j=r.n(V),z=r(555),q=r.n(z),_=r(419),D=r.n(_),I=r(620),M=r.n(I),L=r(366),N=r.n(L),J=r(965),X=r.n(J),Y=r(556),B=r(664),G=r(630),H=r(499),U=r(443),W=r(1510),K=r(741),Q=(r(1188),r(445)),Z=r.n(Q),$=r(5795),tt=r(1332),et=r(371),rt=r.n(et),nt=r(374),ot=r.n(nt),at=r(367),it=r.n(at),st=r(5514),ct=r.n(st),lt=r(435),dt=r.n(lt),ut=r(5516),ft=r.n(ut),vt=r(372),pt=r.n(vt),ht=r(4253),gt=r(4254);var yt=function(t,e){for(var r=Z()(t.shape,2),n=r[0],o=r[1],a=e.shape[1],i=tt.b.zeros(n,a),s=new Float64Array(o),c=0;c<a;c++){for(var l=0;l<o;l++)s[l]=e.get(l,c);for(var d=0;d<n;d++){for(var u=0,f=0;f<o;f++)u+=t.get(d,f)*s[f];i.set(d,c,u)}}return i};var mt=function(t,e){for(var r=Z()(t.shape,2),n=r[0],o=r[1],a=T()(new Float64Array(n*o),{shape:[n,o]}),i=0;i<n;i++)for(var s=0;s<o;s++)a.set(i,s,t.get(i,s)*e[i]);return a};var bt=function(t,e){for(var r=t.length,n=new Array(r),o=0;o<r;o++)n[o]=t[o]*e[o];return n},wt=function(t){for(var e=0,r=0;r<t.length;r++)e+=t[r];return e},At=function(t){for(var e=new Float64Array(t.length),r=0;r<t.length;r++)e[r]=t[r]*(1-t[r]);return e},xt=function(t){for(var e=t.length,r=new Float64Array(e),n=0;n<e;n++){var o=t[n];if(N()(o)>30)r[n]=dt.a;else{var a=it()(o);r[n]=a/(1+a)}}return r},Ft=function(t){for(var e=t.length,r=new Float64Array(e),n=0;n<e;n++){var o=t[n];N()(o)>30?r[n]=dt.a:r[n]=it()(o)/ot()(1+it()(o),2)}return r},St=function(t,e,r){for(var n=0,o=0;o<t.length;o++)n+=rt()(ft()(t[o],e[o]));return-2*n+2*r},Ct=function(t,e,r){for(var n=t.length,o=new Float64Array(n),a=0;a<n;a++){var i=e[a],s=t[a];o[a]=2*r[a]*(ct()(s,s/i)+ct()(1-s,(1-s)/(1-i)))}return o},Et=function(t,e,r){for(var n=new Float64Array(t.length),o=0;o<t.length;o++)n[o]=t[o]*(e[o]*e[o]/r[o]);return n},Rt=function(t,e,r,n){for(var o=new Float64Array(e.length),a=0;a<e.length;a++)o[a]=t[a]+(e[a]-r[a])/n[a];return o};function Ot(t,e){for(var r=new Float64Array(e.length),n=0;n<r.length;n++)r[n]=e[n]*(1-e[n]);for(var o=Z()(t.shape,2),a=o[0],i=o[1],s=new Float64Array(i),c=0;c<s.length;c++){for(var l=0,d=0;d<a;d++)l+=ot()(t.get(d,c),2)*r[d];s[c]=pt()(1/l)}return s}var kt=function(t,e,r){for(var n=Object(gt.a)(t),o=new Array(r).fill(1),a=new Float64Array(o.length),i=0;i<r;i++)a[i]=(o[i]*e[i]+.5)/(o[i]+1);var s,c,l=function(t){for(var e=t.length,r=new Float64Array(e),n=0;n<e;n++)r[n]=rt()(t[n]/(1-t[n]));return r}(a),d=xt(l),u=wt(Ct(e,d,o)),f=!1;for(c=0;c<25;c++){var v=At(d),p=Ft(l),h=Rt(l,e,d,p),g=Et(o,p,v),y=bt(g,h),m=mt(t,g),b=yt(n,m),w=Object(ht.a)(n,y);s=Object($.a)(b,tt.b.columnVector(w)),l=Object(ht.a)(t,s.to1DArray()),d=xt(l);var A=wt(Ct(e,d,o));if(N()(A-u)/(.1+N()(A))<1e-8){f=!0;break}u=A}var x=s.to1DArray(),F=function(t){return function(t){for(var e=new Float64Array(t.length),r=0;r<t.length;r++)e[r]=1/(1+it()(-t[r]));return e}(Object(ht.a)(t,x))},S=F(t);return{aic:St(e,xt(l),x.length),stdErrors:Ot(t,S),fitted:S,coefficients:x,iterations:c,converged:f,predict:F}};function Pt(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var r,n=p()(t);if(e){var o=p()(this).constructor;r=Reflect.construct(n,arguments,o)}else r=n.apply(this,arguments);return f()(this,r)}}var Tt=0;function Vt(t,e,r,n){for(var o=[],a={},i=e[t[0]].length,s=0;s<t.length;s++){var c=e[t[s]];if(j()(r,t[s]))o.push(t[s]);else{for(var l=t[s].categories||A()(c.slice()),d=n?1:0;d<l.length;d++)o.push("".concat(t[s],"_").concat(l[d]));a[t[s]]=l}}for(var u=new Float64Array(i*(o.length+1)),f=0;f<i;f++){n&&(u[(o.length+1)*f]=1);for(var v=0,p=0;p<t.length;p++){var h=e[t[p]];if(j()(r,t[p]))v+=1,u[(o.length+1)*f+v]=h[f];else for(var g=a[t[p]],y=h[f],m=n?1:0;m<g.length;m++)v+=1,u[(o.length+1)*f+v]=y===g[m]?1:0}}return{matrix:T()(u,{shape:[i,o.length+1]}),predictors:o}}var jt=m()("thead",{},void 0,m()("tr",{},void 0,m()(H.a,{placement:"right",tooltip:"Name of predictor"},void 0,m()("th",{},void 0,"Predictor")),m()(H.a,{placement:"right",tooltip:"Change in log odds associated with unit-increase in respective predictor"},void 0,m()("th",{},void 0,"Coefficient")),m()(H.a,{placement:"left",tooltip:"Standard deviation of coefficient estimate"},void 0,m()("th",{},void 0,"Std. Error")),m()(H.a,{placement:"left",tooltip:m()("span",{},void 0,"Test statistic for hypothesis that coefficient is zero ",m()(G.a,{displayMode:!0,raw:"t = \\tfrac{\\text{Coefficient}}{\\text{Std. Error}}"}))},void 0,m()("th",{},void 0,"t")),m()(H.a,{placement:"left",tooltip:m()("span",{},void 0,"p-value for hypothesis that coefficient is zero ",m()(G.a,{displayMode:!0,raw:"2 \\Phi( |t| )"}))},void 0,m()("th",{},void 0,"p-value")))),zt=m()("th",{},void 0,"Intercept"),qt=function(t,e,r){return m()(k.a,{bordered:!0,size:"sm"},void 0,jt,m()("tbody",{},void 0,e?m()("tr",{},void 0,zt,m()("td",{},void 0,r.coefficients[0].toFixed(6)),m()("td",{},void 0,r.stdErrors[0].toFixed(4)),m()("td",{},void 0,(r.coefficients[0]/r.stdErrors[0]).toFixed(4)),m()("td",{},void 0,(2*X()(-N()(r.coefficients[0]/r.stdErrors[0]),0,1)).toFixed(4))):null,t.map((function(t,n){n+=Number(e);var o=r.coefficients[n]/r.stdErrors[n],a=2*X()(-N()(o),0,1);return m()("tr",{},n,m()("th",{},void 0,t),m()("td",{},void 0,r.coefficients[n].toFixed(6)),m()("td",{},void 0,r.stdErrors[n].toFixed(4)),m()("td",{},void 0,o.toFixed(4)),m()("td",{},void 0,a.toFixed(4)))}))))},_t=m()(b.Fragment,{},void 0,"did ",m()("b",{},void 0,"not")," converge"),Dt=m()(S.a.Prepend,{},void 0,m()(S.a.Text,{},void 0,"Threshold:")),It=m()(E.a.Header,{as:"h4"},void 0,"Logistic Regression",m()(K.a,{title:"Logistic Regression",content:"Predict a categorical response variable using one or more explanatory variables."})),Mt=function(t){d()(r,t);var e=Pt(r);function r(t){var n,a,i,s;if(o()(this,r),n=e.call(this,t),g()(c()(n),"compute",(function(){Tt+=1;var t=n.state,e=t.y,r=t.success,o=t.x,a=t.intercept,i=n.props.data[e].map((function(t){return t===r?1:0})),s=i.length;D()(o)||(o=[o]);var c=Vt(o,n.props.data,n.props.quantitative,a),l=c.matrix,d=c.predictors,u=kt(l,i,s);n.props.logAction(U.u,{y:e,x:o,intercept:a});var f={variable:"Regression Summary",type:"Logistic Regression",value:m()("div",{style:{overflowX:"auto",width:"100%"}},void 0,m()("span",{className:"title"},void 0,"Regression Summary for Response ",e," (model id: logis",Tt,")"),qt(d,a,u),m()("i",{},void 0,"The algorithm ",u.converged?"converged":_t," after ",u.iterations," Fisher Scoring iterations"),m()("p",{},void 0,"Akaike Information Criterion (AIC): ",M()(u.aic,-3)),m()(F.a,{},void 0,m()(H.a,{tooltip:"Probabilities, residuals, and predicted categories (using the chosen probability threshold to be exceeded for predicting a success) will be attached to the data table"},void 0,m()(x.a,{variant:"secondary",size:"sm",onClick:function(){var t=Vt(o,n.props.data,n.props.quantitative,a).matrix,i=u.predict(t),s=n.props.data[e].map((function(t){return t===r?1:0})),c=Object(W.a)(i,s),l=q()(n.props.data,1),d=n.props.quantitative.slice(),f=n.props.categorical.slice(),v="probs_logis"+Tt;l[v]=i,j()(d,v)||d.push(v);var p=i.map((function(t){return t>n.state.probabilityThreshold}));l[v="pred_logis"+Tt]=p,j()(f,v)||f.push(v),v="resid_logis"+Tt,j()(d,v)||d.push(v),l[v]=c,n.props.onGenerate(d,f,l)}},void 0,"Use this model to predict for currently selected data")),m()(S.a,{size:"sm"},void 0,Dt,m()(C.a,{type:"number",min:0,max:1,defaultValue:.5,step:.01,onChange:function(t){n.setState({probabilityThreshold:t.target.value})}}))))};n.props.onCreated(f)})),D()(t.categorical)&&t.categorical.length>0){if((i=t.categorical[0]).categories)a=i.categories;else{var l=t.data[i];l&&(a=l.slice(),A()(a))}s=a[a.length-1]}else a=[],s=null;return n.state={categories:a,y:i,success:s,x:t.quantitative[0],intercept:!0,probabilityThreshold:.5},n}return i()(r,[{key:"render",value:function(){var t=this,e=this.props,r=e.categorical,n=e.quantitative,o=e.data,a=this.state,i=a.x,s=a.y,c=a.categories,l=a.success,d=a.intercept;return m()(E.a,{style:{fontSize:"14px",maxWidth:500}},void 0,It,m()(E.a.Body,{},void 0,m()(R.a,{},void 0,m()(O.a,{md:6},void 0,m()(Y.a,{legend:"Outcome (Y):",options:r,defaultValue:s,onChange:function(e){var r=o[e].slice();A()(r),t.setState({categories:r,success:r[r.length-1],y:e})}})),m()(O.a,{md:6},void 0,m()(Y.a,{legend:"Success (Y = 1):",defaultValue:l,options:c,onChange:function(e){t.setState({success:e})}}))),m()(Y.a,{legend:"Predictors (X):",multi:!0,options:A()(n.concat(r)),defaultValue:i||"",onChange:function(e){return t.setState({x:e})},closeMenuOnSelect:!1,selectAllOption:!0}),m()(B.a,{legend:"Include intercept?",defaultValue:d,onChange:function(e){return t.setState({intercept:e})}}),m()(x.a,{disabled:!i||0===i.length,variant:"primary",block:!0,onClick:this.compute},void 0,"Calculate")))}}]),r}(b.Component);Mt.defaultProps={logAction:function(){}};e.default=Mt}}]);