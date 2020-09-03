/*! For license information please see 353.1693abda.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[353],{2537:function(t,e,n){"use strict";var r=n(370),i=n(2538);r(i,"factory",n(2539)),t.exports=i},2538:function(t,e,n){"use strict";var r=n(700),i=n(346),a=n(365);t.exports=function(t,e,n){return i(t)||i(e)||i(n)||e<=0||n<=0?NaN:t<=0?0:t===a?1:e*t>n?r(e*t/(n+e*t),e/2,n/2,!0,!1):r(n/(n+e*t),n/2,e/2,!0,!0)}},2539:function(t,e,n){"use strict";var r=n(395),i=n(700),a=n(346),o=n(365);t.exports=function(t,e){return a(t)||a(e)||t<=0||e<=0?r(NaN):function(n){if(a(n))return NaN;if(n<=0)return 0;if(n===o)return 1;if(t*n>e)return i(t*n/(e+t*n),t/2,e/2,!0,!1);return i(e/(e+t*n),e/2,t/2,!0,!0)}}},4240:function(t,e,n){"use strict";var r=n(4241);t.exports=r},4241:function(t,e,n){"use strict";var r=n(715).isPrimitive,i=n(392).isPrimitive,a=n(1294);t.exports=function(t,e){var n,o;if(!i(t))throw new TypeError("invalid argument. First argument must be a string. Value: `"+t+"`.");if(!r(e))throw new TypeError("invalid argument. Second argument must be a nonnegative integer. Value: `"+e+"`.");if(0===t.length||0===e)return"";if(t.length*e>a)throw new RangeError("invalid argument. Output string length exceeds maximum allowed string length.");for(n="",o=e;1==(1&o)&&(n+=t),0!==(o>>>=1);)t+=t;return n}},5562:function(t,e,n){"use strict";var r=n(5563);t.exports=r},5563:function(t,e,n){"use strict";var r=n(1120).primitives,i=n(1345),a=n(419),o=n(1190),u=n(389),s=n(2537),l=n(555),p=n(5564),g=n(5565),f=n(5566),m=n(5567),c=n(5570),h=n(5571);t.exports=function(t,e,n){var v,d,w,S,b,y,x,E,N,V,T,O,A,R,j,F,P,z,M,q;if(!i(t)&&!r(t))throw new TypeError("invalid argument. First argument must be a numeric array. Value: `"+t+"`.");if(F=l(p),arguments.length>2&&(P=g(F,n)))throw P;if((R=t.length)<=1)throw new RangeError("invalid argument. First argument must have at least two elements. Value: `"+t+"`.");if(!a(e))throw new TypeError("invalid argument. Second argument must be an array. Value: `"+V+"`.");if((E=(V=f(e)).length)<=1)throw new RangeError("invalid argument. Second argument must contain at least two unique elements. Value: `"+V+"`.");if(R!==e.length)throw new RangeError("invalid arguments. Arguments `x` and `factor` must be arrays of the same length.");for(S=0,w=0,T=m(t,e,V),x=c(t),q=0;q<R;q++)S+=M=(t[q]-x)*(t[q]-x);for(y in M=0,T)u(T,y)&&(M=(T[y].mean-x)*(T[y].mean-x),w+=T[y].sampleSize*M);return j=1-s(N=(v=w/(O=E-1))/(d=(b=S-w)/(A=R-E)),O,A),z={},o(y={},"df",O),o(y,"ss",w),o(y,"ms",v),o(z,"treatment",y),o(P={},"df",A),o(P,"ss",b),o(P,"ms",d),o(z,"error",P),o(z,"statistic",N),o(z,"pValue",j),o(z,"means",T),o(z,"method","One-Way ANOVA"),o(z,"alpha",F.alpha),o(z,"rejected",j<=F.alpha),o(z,"print",h(z)),z}},5564:function(t){t.exports=JSON.parse('{"alpha":0.05}')},5565:function(t,e,n){"use strict";var r=n(389),i=n(437),a=n(393).isPrimitive,o=n(538);t.exports=function(t,e){if(!i(e))return new TypeError("invalid argument. Options must be an object. Value: `"+e+"`.");if(r(e,"alpha")){if(t.alpha=e.alpha,!a(t.alpha)||o(t.alpha))return new TypeError("invalid option. `alpha` option must be a number primitive. Option: `"+t.alpha+"`.");if(t.alpha<0||t.alpha>1)return new RangeError("invalid option. `alpha` must be a number in [0,1].")}return null}},5566:function(t,e,n){"use strict";var r={numeric:!0};function i(t,e){return String(t).localeCompare(String(e),void 0,r)}t.exports=function(t){var e,n,r,a,o;for(e=(n=Array.prototype.slice.call(t)).length,n.sort(i),a=1,o=0;a<e;a++)r=n[a],n[o]!==r&&(n[o+=1]=r);return n.length=o+1,n}},5567:function(t,e,n){"use strict";var r=n(5568);t.exports=function(t,e,n){var i,a,o,u,s,l,p;for(a=n.length,i={},s=0;s<a;s++)for(o=r(),i[n[s]]={mean:0,sampleSize:0,SD:o},l=0;l<t.length;l++)e[l]===n[s]&&(i[n[s]].SD=o(t[l]));for(l=0;l<t.length;l++)i[e[l]].mean+=t[l],i[e[l]].sampleSize+=1;for(p=0;p<a;p++)u=i[n[p]].mean/i[n[p]].sampleSize,i[n[p]].mean=u;return i}},5568:function(t,e,n){"use strict";var r=n(5569);t.exports=r},5569:function(t,e,n){"use strict";var r=n(393).isPrimitive,i=n(372),a=n(346);t.exports=function(t){var e,n,o,u;if(o=0,u=0,arguments.length){if(!r(t))throw new TypeError("invalid argument. Must provide a number primitive. Value: `"+t+"`.");return n=t,l}return n=0,s;function s(t){return 0===arguments.length?0===u?null:1===u?a(o)?NaN:0:i(o/(u-1)):(o+=(e=t-n)*(t-(n+=e/(u+=1))),u<2?a(o)?NaN:0:i(o/(u-1)))}function l(t){return 0===arguments.length?0===u?null:i(o/u):i((o+=(e=t-n)*e)/(u+=1))}}},5570:function(t,e,n){"use strict";t.exports=function(t){var e,n,r;for(n=0,e=t.length,r=0;r<e;r++)n+=(t[r]-n)/(r+1);return n}},5571:function(t,e,n){"use strict";var r=n(704),i=n(437),a=n(389),o=n(620),u=n(4240),s=n(444),l=n(523).isPrimitive;function p(t){return t<=0?"":u(" ",t)}t.exports=function(t){return function(e){var n,u,g,f,m,c,h,v,d,w,S,b,y,x;if(y=4,u=!0,arguments.length>0){if(!i(e))throw new TypeError("invalid argument. First argument must be an options object. Value: `"+e+"`.");if(a(e,"digits")){if(!r(e.digits))throw new TypeError("invalid option. `digits` option must be a positive integer. Option: `"+e.digits+"`.");y=e.digits}if(a(e,"decision")){if(!l(e.decision))throw new TypeError("invalid option. `decision` option must be a boolean primitive. Option: `"+e.decision+"`.");u=e.decision}}b=-y,x="",x+=t.method,x+="\n\n",x+="Null Hypothesis: All Means Equal",x+="\n",x+="Alternate Hypothesis: At Least one Mean not Equal",x+="\n\n",m=o(t.treatment.ss,b).toString(),S=o(t.error.ss,b).toString(),g=o(t.treatment.ms,b).toString(),d=o(t.error.ms,b).toString(),f=t.treatment.df.toString(),w=t.error.df.toString(),n=o(t.statistic,b).toString(),c=s(s(f.length,w.length),2),h=s(s(m.length,S.length),2),v=s(s(g.length,d.length),3),x+="              ",x+="df",x+=p(1+c),x+="SS",x+=p(2+h),x+="MS",x+=p(1+v),x+="F Score",x+=p(s(7,n.length)-7+2),x+="P Value",x+="\n",x+="Treatment",x+=p(5),x+=t.treatment.df,x+=p(3+c-f.length),x+=m,x+=p(4+h-m.length),x+=g,x+=p(3+v-g.length),x+=n,x+=p(s(7,n.length)-n.length+2),x+=o(t.pValue,b),x+="\n",x+="Errors",x+="        ",x+=t.error.df,x+=p(3+c-w.length),x+=S,x+=p(4+h-S.length),x+=d,u&&(x+="\n\n",t.rejected?(x+="Reject Null: ",x+=o(t.pValue,b),x+=" <= ",x+=t.alpha):(x+="Fail to Reject Null: ",x+=o(t.pValue,b),x+=" >= ",x+=t.alpha));return x}}}}]);