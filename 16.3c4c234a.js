(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{1332:function(t,e,r){"use strict";r.d(e,"a",(function(){return x})),r.d(e,"b",(function(){return S}));var o=r(4255),s=r.n(o);var n=function(t){if(!s()(t))throw new TypeError("input must be an array");if(0===t.length)throw new TypeError("input must not be empty");for(var e=t[0],r=1;r<t.length;r++)t[r]>e&&(e=t[r]);return e};var i=function(t){if(!s()(t))throw new TypeError("input must be an array");if(0===t.length)throw new TypeError("input must not be empty");for(var e=t[0],r=1;r<t.length;r++)t[r]<e&&(e=t[r]);return e};var h=function(t){var e,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!s()(t))throw new TypeError("input must be an array");if(0===t.length)throw new TypeError("input must not be empty");if(void 0!==r.output){if(!s()(r.output))throw new TypeError("output option must be an array if specified");e=r.output}else e=new Array(t.length);var o=i(t),h=n(t);if(o===h)throw new RangeError("minimum and maximum input values are equal. Cannot rescale a constant array");var u=r.min,l=void 0===u?r.autoMinMax?o:0:u,c=r.max,f=void 0===c?r.autoMinMax?h:1:c;if(l>=f)throw new RangeError("min option must be smaller than max option");for(var a=(f-l)/(h-o),m=0;m<t.length;m++)e[m]=(t[m]-o)*a+l;return e};const u=" ".repeat(2),l=" ".repeat(4);function c(t,e={}){const{maxRows:r=15,maxColumns:o=10,maxNumSize:s=8}=e;return`${t.constructor.name} {\n${u}[\n${l}${function(t,e,r,o){const{rows:s,columns:n}=t,i=Math.min(s,e),h=Math.min(n,r),u=[];for(let l=0;l<i;l++){let e=[];for(let r=0;r<h;r++)e.push(f(t.get(l,r),o));u.push(""+e.join(" "))}h!==n&&(u[u.length-1]+=` ... ${n-r} more columns`);i!==s&&u.push(`... ${s-e} more rows`);return u.join("\n"+l)}(t,r,o,s)}\n${u}]\n${u}rows: ${t.rows}\n${u}columns: ${t.columns}\n}`}function f(t,e){const r=String(t);if(r.length<=e)return r.padEnd(e," ");const o=t.toPrecision(e-2);if(o.length<=e)return o;const s=t.toExponential(e-2),n=s.indexOf("e"),i=s.slice(n);return s.slice(0,e-i.length)+i}function a(t,e,r){let o=r?t.rows:t.rows-1;if(e<0||e>o)throw new RangeError("Row index out of range")}function m(t,e,r){let o=r?t.columns:t.columns-1;if(e<0||e>o)throw new RangeError("Column index out of range")}function w(t,e){if(e.to1DArray&&(e=e.to1DArray()),e.length!==t.columns)throw new RangeError("vector size must be the same as the number of columns");return e}function p(t,e){if(e.to1DArray&&(e=e.to1DArray()),e.length!==t.rows)throw new RangeError("vector size must be the same as the number of rows");return e}function g(t,e){if("object"!=typeof e)throw new TypeError("unexpected type for row indices");if(e.some(e=>e<0||e>=t.rows))throw new RangeError("row indices are out of range");return Array.isArray(e)||(e=Array.from(e)),e}function y(t,e){if("object"!=typeof e)throw new TypeError("unexpected type for column indices");if(e.some(e=>e<0||e>=t.columns))throw new RangeError("column indices are out of range");return Array.isArray(e)||(e=Array.from(e)),e}function d(t,e,r,o,s){if(5!==arguments.length)throw new RangeError("expected 4 arguments");if(M("startRow",e),M("endRow",r),M("startColumn",o),M("endColumn",s),e>r||o>s||e<0||e>=t.rows||r<0||r>=t.rows||o<0||o>=t.columns||s<0||s>=t.columns)throw new RangeError("Submatrix indices are out of range")}function b(t,e=0){let r=[];for(let o=0;o<t;o++)r.push(e);return r}function M(t,e){if("number"!=typeof e)throw new TypeError(t+" must be a number")}class x{static from1DArray(t,e,r){if(t*e!==r.length)throw new RangeError("data length does not match given dimensions");let o=new S(t,e);for(let s=0;s<t;s++)for(let t=0;t<e;t++)o.set(s,t,r[s*e+t]);return o}static rowVector(t){let e=new S(1,t.length);for(let r=0;r<t.length;r++)e.set(0,r,t[r]);return e}static columnVector(t){let e=new S(t.length,1);for(let r=0;r<t.length;r++)e.set(r,0,t[r]);return e}static zeros(t,e){return new S(t,e)}static ones(t,e){return new S(t,e).fill(1)}static rand(t,e,r={}){if("object"!=typeof r)throw new TypeError("options must be an object");const{random:o=Math.random}=r;let s=new S(t,e);for(let n=0;n<t;n++)for(let t=0;t<e;t++)s.set(n,t,o());return s}static randInt(t,e,r={}){if("object"!=typeof r)throw new TypeError("options must be an object");const{min:o=0,max:s=1e3,random:n=Math.random}=r;if(!Number.isInteger(o))throw new TypeError("min must be an integer");if(!Number.isInteger(s))throw new TypeError("max must be an integer");if(o>=s)throw new RangeError("min must be smaller than max");let i=s-o,h=new S(t,e);for(let u=0;u<t;u++)for(let t=0;t<e;t++){let e=o+Math.round(n()*i);h.set(u,t,e)}return h}static eye(t,e,r){void 0===e&&(e=t),void 0===r&&(r=1);let o=Math.min(t,e),s=this.zeros(t,e);for(let n=0;n<o;n++)s.set(n,n,r);return s}static diag(t,e,r){let o=t.length;void 0===e&&(e=o),void 0===r&&(r=e);let s=Math.min(o,e,r),n=this.zeros(e,r);for(let i=0;i<s;i++)n.set(i,i,t[i]);return n}static min(t,e){t=this.checkMatrix(t),e=this.checkMatrix(e);let r=t.rows,o=t.columns,s=new S(r,o);for(let n=0;n<r;n++)for(let r=0;r<o;r++)s.set(n,r,Math.min(t.get(n,r),e.get(n,r)));return s}static max(t,e){t=this.checkMatrix(t),e=this.checkMatrix(e);let r=t.rows,o=t.columns,s=new this(r,o);for(let n=0;n<r;n++)for(let r=0;r<o;r++)s.set(n,r,Math.max(t.get(n,r),e.get(n,r)));return s}static checkMatrix(t){return x.isMatrix(t)?t:new S(t)}static isMatrix(t){return null!=t&&"Matrix"===t.klass}get size(){return this.rows*this.columns}apply(t){if("function"!=typeof t)throw new TypeError("callback must be a function");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)t.call(this,e,r);return this}to1DArray(){let t=[];for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)t.push(this.get(e,r));return t}to2DArray(){let t=[];for(let e=0;e<this.rows;e++){t.push([]);for(let r=0;r<this.columns;r++)t[e].push(this.get(e,r))}return t}toJSON(){return this.to2DArray()}isRowVector(){return 1===this.rows}isColumnVector(){return 1===this.columns}isVector(){return 1===this.rows||1===this.columns}isSquare(){return this.rows===this.columns}isSymmetric(){if(this.isSquare()){for(let t=0;t<this.rows;t++)for(let e=0;e<=t;e++)if(this.get(t,e)!==this.get(e,t))return!1;return!0}return!1}isEchelonForm(){let t=0,e=0,r=-1,o=!0,s=!1;for(;t<this.rows&&o;){for(e=0,s=!1;e<this.columns&&!1===s;)0===this.get(t,e)?e++:1===this.get(t,e)&&e>r?(s=!0,r=e):(o=!1,s=!0);t++}return o}isReducedEchelonForm(){let t=0,e=0,r=-1,o=!0,s=!1;for(;t<this.rows&&o;){for(e=0,s=!1;e<this.columns&&!1===s;)0===this.get(t,e)?e++:1===this.get(t,e)&&e>r?(s=!0,r=e):(o=!1,s=!0);for(let r=e+1;r<this.rows;r++)0!==this.get(t,r)&&(o=!1);t++}return o}echelonForm(){let t=this.clone(),e=0,r=0;for(;e<t.rows&&r<t.columns;){let o=e;for(let s=e;s<t.rows;s++)t.get(s,r)>t.get(o,r)&&(o=s);if(0===t.get(o,r))r++;else{t.swapRows(e,o);let s=t.get(e,r);for(let o=r;o<t.columns;o++)t.set(e,o,t.get(e,o)/s);for(let o=e+1;o<t.rows;o++){let s=t.get(o,r)/t.get(e,r);t.set(o,r,0);for(let n=r+1;n<t.columns;n++)t.set(o,n,t.get(o,n)-t.get(e,n)*s)}e++,r++}}return t}reducedEchelonForm(){let t=this.echelonForm(),e=t.columns,r=t.rows,o=r-1;for(;o>=0;)if(0===t.maxRow(o))o--;else{let s=0,n=!1;for(;s<r&&!1===n;)1===t.get(o,s)?n=!0:s++;for(let r=0;r<o;r++){let n=t.get(r,s);for(let i=s;i<e;i++){let e=t.get(r,i)-n*t.get(o,i);t.set(r,i,e)}}o--}return t}set(){throw new Error("set method is unimplemented")}get(){throw new Error("get method is unimplemented")}repeat(t={}){if("object"!=typeof t)throw new TypeError("options must be an object");const{rows:e=1,columns:r=1}=t;if(!Number.isInteger(e)||e<=0)throw new TypeError("rows must be a positive integer");if(!Number.isInteger(r)||r<=0)throw new TypeError("columns must be a positive integer");let o=new S(this.rows*e,this.columns*r);for(let s=0;s<e;s++)for(let t=0;t<r;t++)o.setSubMatrix(this,this.rows*s,this.columns*t);return o}fill(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,t);return this}neg(){return this.mulS(-1)}getRow(t){a(this,t);let e=[];for(let r=0;r<this.columns;r++)e.push(this.get(t,r));return e}getRowVector(t){return S.rowVector(this.getRow(t))}setRow(t,e){a(this,t),e=w(this,e);for(let r=0;r<this.columns;r++)this.set(t,r,e[r]);return this}swapRows(t,e){a(this,t),a(this,e);for(let r=0;r<this.columns;r++){let o=this.get(t,r);this.set(t,r,this.get(e,r)),this.set(e,r,o)}return this}getColumn(t){m(this,t);let e=[];for(let r=0;r<this.rows;r++)e.push(this.get(r,t));return e}getColumnVector(t){return S.columnVector(this.getColumn(t))}setColumn(t,e){m(this,t),e=p(this,e);for(let r=0;r<this.rows;r++)this.set(r,t,e[r]);return this}swapColumns(t,e){m(this,t),m(this,e);for(let r=0;r<this.rows;r++){let o=this.get(r,t);this.set(r,t,this.get(r,e)),this.set(r,e,o)}return this}addRowVector(t){t=w(this,t);for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)+t[r]);return this}subRowVector(t){t=w(this,t);for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)-t[r]);return this}mulRowVector(t){t=w(this,t);for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)*t[r]);return this}divRowVector(t){t=w(this,t);for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)/t[r]);return this}addColumnVector(t){t=p(this,t);for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)+t[e]);return this}subColumnVector(t){t=p(this,t);for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)-t[e]);return this}mulColumnVector(t){t=p(this,t);for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)*t[e]);return this}divColumnVector(t){t=p(this,t);for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)/t[e]);return this}mulRow(t,e){a(this,t);for(let r=0;r<this.columns;r++)this.set(t,r,this.get(t,r)*e);return this}mulColumn(t,e){m(this,t);for(let r=0;r<this.rows;r++)this.set(r,t,this.get(r,t)*e);return this}max(){let t=this.get(0,0);for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.get(e,r)>t&&(t=this.get(e,r));return t}maxIndex(){let t=this.get(0,0),e=[0,0];for(let r=0;r<this.rows;r++)for(let o=0;o<this.columns;o++)this.get(r,o)>t&&(t=this.get(r,o),e[0]=r,e[1]=o);return e}min(){let t=this.get(0,0);for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.get(e,r)<t&&(t=this.get(e,r));return t}minIndex(){let t=this.get(0,0),e=[0,0];for(let r=0;r<this.rows;r++)for(let o=0;o<this.columns;o++)this.get(r,o)<t&&(t=this.get(r,o),e[0]=r,e[1]=o);return e}maxRow(t){a(this,t);let e=this.get(t,0);for(let r=1;r<this.columns;r++)this.get(t,r)>e&&(e=this.get(t,r));return e}maxRowIndex(t){a(this,t);let e=this.get(t,0),r=[t,0];for(let o=1;o<this.columns;o++)this.get(t,o)>e&&(e=this.get(t,o),r[1]=o);return r}minRow(t){a(this,t);let e=this.get(t,0);for(let r=1;r<this.columns;r++)this.get(t,r)<e&&(e=this.get(t,r));return e}minRowIndex(t){a(this,t);let e=this.get(t,0),r=[t,0];for(let o=1;o<this.columns;o++)this.get(t,o)<e&&(e=this.get(t,o),r[1]=o);return r}maxColumn(t){m(this,t);let e=this.get(0,t);for(let r=1;r<this.rows;r++)this.get(r,t)>e&&(e=this.get(r,t));return e}maxColumnIndex(t){m(this,t);let e=this.get(0,t),r=[0,t];for(let o=1;o<this.rows;o++)this.get(o,t)>e&&(e=this.get(o,t),r[0]=o);return r}minColumn(t){m(this,t);let e=this.get(0,t);for(let r=1;r<this.rows;r++)this.get(r,t)<e&&(e=this.get(r,t));return e}minColumnIndex(t){m(this,t);let e=this.get(0,t),r=[0,t];for(let o=1;o<this.rows;o++)this.get(o,t)<e&&(e=this.get(o,t),r[0]=o);return r}diag(){let t=Math.min(this.rows,this.columns),e=[];for(let r=0;r<t;r++)e.push(this.get(r,r));return e}norm(t="frobenius"){let e=0;if("max"===t)return this.max();if("frobenius"===t){for(let t=0;t<this.rows;t++)for(let r=0;r<this.columns;r++)e+=this.get(t,r)*this.get(t,r);return Math.sqrt(e)}throw new RangeError("unknown norm type: "+t)}cumulativeSum(){let t=0;for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)t+=this.get(e,r),this.set(e,r,t);return this}dot(t){x.isMatrix(t)&&(t=t.to1DArray());let e=this.to1DArray();if(e.length!==t.length)throw new RangeError("vectors do not have the same size");let r=0;for(let o=0;o<e.length;o++)r+=e[o]*t[o];return r}mmul(t){t=S.checkMatrix(t);let e=this.rows,r=this.columns,o=t.columns,s=new S(e,o),n=new Float64Array(r);for(let i=0;i<o;i++){for(let e=0;e<r;e++)n[e]=t.get(e,i);for(let t=0;t<e;t++){let e=0;for(let o=0;o<r;o++)e+=this.get(t,o)*n[o];s.set(t,i,e)}}return s}strassen2x2(t){t=S.checkMatrix(t);let e=new S(2,2);const r=this.get(0,0),o=t.get(0,0),s=this.get(0,1),n=t.get(0,1),i=this.get(1,0),h=t.get(1,0),u=this.get(1,1),l=t.get(1,1),c=(r+u)*(o+l),f=(i+u)*o,a=r*(n-l),m=u*(h-o),w=(r+s)*l,p=c+m-w+(s-u)*(h+l),g=a+w,y=f+m,d=c-f+a+(i-r)*(o+n);return e.set(0,0,p),e.set(0,1,g),e.set(1,0,y),e.set(1,1,d),e}strassen3x3(t){t=S.checkMatrix(t);let e=new S(3,3);const r=this.get(0,0),o=this.get(0,1),s=this.get(0,2),n=this.get(1,0),i=this.get(1,1),h=this.get(1,2),u=this.get(2,0),l=this.get(2,1),c=this.get(2,2),f=t.get(0,0),a=t.get(0,1),m=t.get(0,2),w=t.get(1,0),p=t.get(1,1),g=t.get(1,2),y=t.get(2,0),d=t.get(2,1),b=t.get(2,2),M=(r-n)*(-a+p),x=(-r+n+i)*(f-a+p),E=(n+i)*(-f+a),v=r*f,R=(-r+u+l)*(f-m+g),A=(-r+u)*(m-g),T=(u+l)*(-f+m),k=(-s+l+c)*(p+y-d),C=(s-c)*(p-d),j=s*y,q=(l+c)*(-y+d),z=(-s+i+h)*(g+y-b),F=(s-h)*(g-b),I=(i+h)*(-y+b),V=v+j+o*w,$=(r+o+s-n-i-l-c)*p+x+E+v+k+j+q,D=v+R+T+(r+o+s-i-h-u-l)*g+j+z+I,N=M+i*(-f+a+w-p-g-y+b)+x+v+j+z+F,P=M+x+E+v+h*d,J=j+z+F+I+n*m,O=v+R+A+l*(-f+m+w-p-g-y+d)+k+C+j,W=k+C+j+q+u*a,B=v+R+A+T+c*b;return e.set(0,0,V),e.set(0,1,$),e.set(0,2,D),e.set(1,0,N),e.set(1,1,P),e.set(1,2,J),e.set(2,0,O),e.set(2,1,W),e.set(2,2,B),e}mmulStrassen(t){t=S.checkMatrix(t);let e=this.clone(),r=e.rows,o=e.columns,s=t.rows,n=t.columns;function i(t,e,r){let o=t.rows,s=t.columns;if(o===e&&s===r)return t;{let o=x.zeros(e,r);return o=o.setSubMatrix(t,0,0),o}}o!==s&&console.warn(`Multiplying ${r} x ${o} and ${s} x ${n} matrix: dimensions do not match.`);let h=Math.max(r,s),u=Math.max(o,n);return e=i(e,h,u),function t(e,r,o,s){if(o<=512||s<=512)return e.mmul(r);o%2==1&&s%2==1?(e=i(e,o+1,s+1),r=i(r,o+1,s+1)):o%2==1?(e=i(e,o+1,s),r=i(r,o+1,s)):s%2==1&&(e=i(e,o,s+1),r=i(r,o,s+1));let n=parseInt(e.rows/2,10),h=parseInt(e.columns/2,10),u=e.subMatrix(0,n-1,0,h-1),l=r.subMatrix(0,n-1,0,h-1),c=e.subMatrix(0,n-1,h,e.columns-1),f=r.subMatrix(0,n-1,h,r.columns-1),a=e.subMatrix(n,e.rows-1,0,h-1),m=r.subMatrix(n,r.rows-1,0,h-1),w=e.subMatrix(n,e.rows-1,h,e.columns-1),p=r.subMatrix(n,r.rows-1,h,r.columns-1),g=t(x.add(u,w),x.add(l,p),n,h),y=t(x.add(a,w),l,n,h),d=t(u,x.sub(f,p),n,h),b=t(w,x.sub(m,l),n,h),M=t(x.add(u,c),p,n,h),E=t(x.sub(a,u),x.add(l,f),n,h),S=t(x.sub(c,w),x.add(m,p),n,h),v=x.add(g,b);v.sub(M),v.add(S);let R=x.add(d,M),A=x.add(y,b),T=x.sub(g,y);T.add(d),T.add(E);let k=x.zeros(2*v.rows,2*v.columns);return k=k.setSubMatrix(v,0,0),k=k.setSubMatrix(R,v.rows,0),k=k.setSubMatrix(A,0,v.columns),k=k.setSubMatrix(T,v.rows,v.columns),k.subMatrix(0,o-1,0,s-1)}(e,t=i(t,h,u),h,u)}scaleRows(t={}){if("object"!=typeof t)throw new TypeError("options must be an object");const{min:e=0,max:r=1}=t;if(!Number.isFinite(e))throw new TypeError("min must be a number");if(!Number.isFinite(r))throw new TypeError("max must be a number");if(e>=r)throw new RangeError("min must be smaller than max");let o=new S(this.rows,this.columns);for(let s=0;s<this.rows;s++){const t=this.getRow(s);h(t,{min:e,max:r,output:t}),o.setRow(s,t)}return o}scaleColumns(t={}){if("object"!=typeof t)throw new TypeError("options must be an object");const{min:e=0,max:r=1}=t;if(!Number.isFinite(e))throw new TypeError("min must be a number");if(!Number.isFinite(r))throw new TypeError("max must be a number");if(e>=r)throw new RangeError("min must be smaller than max");let o=new S(this.rows,this.columns);for(let s=0;s<this.columns;s++){const t=this.getColumn(s);h(t,{min:e,max:r,output:t}),o.setColumn(s,t)}return o}flipRows(){const t=Math.ceil(this.columns/2);for(let e=0;e<this.rows;e++)for(let r=0;r<t;r++){let t=this.get(e,r),o=this.get(e,this.columns-1-r);this.set(e,r,o),this.set(e,this.columns-1-r,t)}return this}flipColumns(){const t=Math.ceil(this.rows/2);for(let e=0;e<this.columns;e++)for(let r=0;r<t;r++){let t=this.get(r,e),o=this.get(this.rows-1-r,e);this.set(r,e,o),this.set(this.rows-1-r,e,t)}return this}kroneckerProduct(t){t=S.checkMatrix(t);let e=this.rows,r=this.columns,o=t.rows,s=t.columns,n=new S(e*o,r*s);for(let i=0;i<e;i++)for(let e=0;e<r;e++)for(let r=0;r<o;r++)for(let h=0;h<s;h++)n.set(o*i+r,s*e+h,this.get(i,e)*t.get(r,h));return n}transpose(){let t=new S(this.columns,this.rows);for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)t.set(r,e,this.get(e,r));return t}sortRows(t=E){for(let e=0;e<this.rows;e++)this.setRow(e,this.getRow(e).sort(t));return this}sortColumns(t=E){for(let e=0;e<this.columns;e++)this.setColumn(e,this.getColumn(e).sort(t));return this}subMatrix(t,e,r,o){d(this,t,e,r,o);let s=new S(e-t+1,o-r+1);for(let n=t;n<=e;n++)for(let e=r;e<=o;e++)s.set(n-t,e-r,this.get(n,e));return s}subMatrixRow(t,e,r){if(void 0===e&&(e=0),void 0===r&&(r=this.columns-1),e>r||e<0||e>=this.columns||r<0||r>=this.columns)throw new RangeError("Argument out of range");let o=new S(t.length,r-e+1);for(let s=0;s<t.length;s++)for(let n=e;n<=r;n++){if(t[s]<0||t[s]>=this.rows)throw new RangeError("Row index out of range: "+t[s]);o.set(s,n-e,this.get(t[s],n))}return o}subMatrixColumn(t,e,r){if(void 0===e&&(e=0),void 0===r&&(r=this.rows-1),e>r||e<0||e>=this.rows||r<0||r>=this.rows)throw new RangeError("Argument out of range");let o=new S(r-e+1,t.length);for(let s=0;s<t.length;s++)for(let n=e;n<=r;n++){if(t[s]<0||t[s]>=this.columns)throw new RangeError("Column index out of range: "+t[s]);o.set(n-e,s,this.get(n,t[s]))}return o}setSubMatrix(t,e,r){d(this,e,e+(t=S.checkMatrix(t)).rows-1,r,r+t.columns-1);for(let o=0;o<t.rows;o++)for(let s=0;s<t.columns;s++)this.set(e+o,r+s,t.get(o,s));return this}selection(t,e){let r=function(t,e,r){return{row:g(t,e),column:y(t,r)}}(this,t,e),o=new S(t.length,e.length);for(let s=0;s<r.row.length;s++){let t=r.row[s];for(let e=0;e<r.column.length;e++){let n=r.column[e];o.set(s,e,this.get(t,n))}}return o}trace(){let t=Math.min(this.rows,this.columns),e=0;for(let r=0;r<t;r++)e+=this.get(r,r);return e}clone(){let t=new S(this.rows,this.columns);for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)t.set(e,r,this.get(e,r));return t}sum(t){switch(t){case"row":return function(t){let e=b(t.rows);for(let r=0;r<t.rows;++r)for(let o=0;o<t.columns;++o)e[r]+=t.get(r,o);return e}(this);case"column":return function(t){let e=b(t.columns);for(let r=0;r<t.rows;++r)for(let o=0;o<t.columns;++o)e[o]+=t.get(r,o);return e}(this);case void 0:return function(t){let e=0;for(let r=0;r<t.rows;r++)for(let o=0;o<t.columns;o++)e+=t.get(r,o);return e}(this);default:throw new Error("invalid option: "+t)}}product(t){switch(t){case"row":return function(t){let e=b(t.rows,1);for(let r=0;r<t.rows;++r)for(let o=0;o<t.columns;++o)e[r]*=t.get(r,o);return e}(this);case"column":return function(t){let e=b(t.columns,1);for(let r=0;r<t.rows;++r)for(let o=0;o<t.columns;++o)e[o]*=t.get(r,o);return e}(this);case void 0:return function(t){let e=1;for(let r=0;r<t.rows;r++)for(let o=0;o<t.columns;o++)e*=t.get(r,o);return e}(this);default:throw new Error("invalid option: "+t)}}mean(t){const e=this.sum(t);switch(t){case"row":for(let t=0;t<this.rows;t++)e[t]/=this.columns;return e;case"column":for(let t=0;t<this.columns;t++)e[t]/=this.rows;return e;case void 0:return e/this.size;default:throw new Error("invalid option: "+t)}}variance(t,e={}){if("object"==typeof t&&(e=t,t=void 0),"object"!=typeof e)throw new TypeError("options must be an object");const{unbiased:r=!0,mean:o=this.mean(t)}=e;if("boolean"!=typeof r)throw new TypeError("unbiased must be a boolean");switch(t){case"row":if(!Array.isArray(o))throw new TypeError("mean must be an array");return function(t,e,r){const o=t.rows,s=t.columns,n=[];for(let i=0;i<o;i++){let o=0,h=0,u=0;for(let e=0;e<s;e++)u=t.get(i,e)-r[i],o+=u,h+=u*u;e?n.push((h-o*o/s)/(s-1)):n.push((h-o*o/s)/s)}return n}(this,r,o);case"column":if(!Array.isArray(o))throw new TypeError("mean must be an array");return function(t,e,r){const o=t.rows,s=t.columns,n=[];for(let i=0;i<s;i++){let s=0,h=0,u=0;for(let e=0;e<o;e++)u=t.get(e,i)-r[i],s+=u,h+=u*u;e?n.push((h-s*s/o)/(o-1)):n.push((h-s*s/o)/o)}return n}(this,r,o);case void 0:if("number"!=typeof o)throw new TypeError("mean must be a number");return function(t,e,r){const o=t.rows,s=t.columns,n=o*s;let i=0,h=0,u=0;for(let l=0;l<o;l++)for(let e=0;e<s;e++)u=t.get(l,e)-r,i+=u,h+=u*u;return e?(h-i*i/n)/(n-1):(h-i*i/n)/n}(this,r,o);default:throw new Error("invalid option: "+t)}}standardDeviation(t,e){"object"==typeof t&&(e=t,t=void 0);const r=this.variance(t,e);if(void 0===t)return Math.sqrt(r);for(let o=0;o<r.length;o++)r[o]=Math.sqrt(r[o]);return r}center(t,e={}){if("object"==typeof t&&(e=t,t=void 0),"object"!=typeof e)throw new TypeError("options must be an object");const{center:r=this.mean(t)}=e;switch(t){case"row":if(!Array.isArray(r))throw new TypeError("center must be an array");return function(t,e){for(let r=0;r<t.rows;r++)for(let o=0;o<t.columns;o++)t.set(r,o,t.get(r,o)-e[r])}(this,r),this;case"column":if(!Array.isArray(r))throw new TypeError("center must be an array");return function(t,e){for(let r=0;r<t.rows;r++)for(let o=0;o<t.columns;o++)t.set(r,o,t.get(r,o)-e[o])}(this,r),this;case void 0:if("number"!=typeof r)throw new TypeError("center must be a number");return function(t,e){for(let r=0;r<t.rows;r++)for(let o=0;o<t.columns;o++)t.set(r,o,t.get(r,o)-e)}(this,r),this;default:throw new Error("invalid option: "+t)}}scale(t,e={}){if("object"==typeof t&&(e=t,t=void 0),"object"!=typeof e)throw new TypeError("options must be an object");let r=e.scale;switch(t){case"row":if(void 0===r)r=function(t){const e=[];for(let r=0;r<t.rows;r++){let o=0;for(let e=0;e<t.columns;e++)o+=Math.pow(t.get(r,e),2)/(t.columns-1);e.push(Math.sqrt(o))}return e}(this);else if(!Array.isArray(r))throw new TypeError("scale must be an array");return function(t,e){for(let r=0;r<t.rows;r++)for(let o=0;o<t.columns;o++)t.set(r,o,t.get(r,o)/e[r])}(this,r),this;case"column":if(void 0===r)r=function(t){const e=[];for(let r=0;r<t.columns;r++){let o=0;for(let e=0;e<t.rows;e++)o+=Math.pow(t.get(e,r),2)/(t.rows-1);e.push(Math.sqrt(o))}return e}(this);else if(!Array.isArray(r))throw new TypeError("scale must be an array");return function(t,e){for(let r=0;r<t.rows;r++)for(let o=0;o<t.columns;o++)t.set(r,o,t.get(r,o)/e[o])}(this,r),this;case void 0:if(void 0===r)r=function(t){const e=t.size-1;let r=0;for(let o=0;o<t.columns;o++)for(let s=0;s<t.rows;s++)r+=Math.pow(t.get(s,o),2)/e;return Math.sqrt(r)}(this);else if("number"!=typeof r)throw new TypeError("scale must be a number");return function(t,e){for(let r=0;r<t.rows;r++)for(let o=0;o<t.columns;o++)t.set(r,o,t.get(r,o)/e)}(this,r),this;default:throw new Error("invalid option: "+t)}}toString(t){return c(this,t)}}function E(t,e){return t-e}x.prototype.klass="Matrix","undefined"!=typeof Symbol&&(x.prototype[Symbol.for("nodejs.util.inspect.custom")]=function(){return c(this)}),x.random=x.rand,x.randomInt=x.randInt,x.diagonal=x.diag,x.prototype.diagonal=x.prototype.diag,x.identity=x.eye,x.prototype.negate=x.prototype.neg,x.prototype.tensorProduct=x.prototype.kroneckerProduct;class S extends x{constructor(t,e){if(super(),S.isMatrix(t))return t.clone();if(Number.isInteger(t)&&t>0){if(this.data=[],!(Number.isInteger(e)&&e>0))throw new TypeError("nColumns must be a positive integer");for(let r=0;r<t;r++)this.data.push(new Float64Array(e))}else{if(!Array.isArray(t))throw new TypeError("First argument must be a positive number or an array");{const r=t;if(t=r.length,"number"!=typeof(e=r[0].length)||0===e)throw new TypeError("Data must be a 2D array with at least one element");this.data=[];for(let o=0;o<t;o++){if(r[o].length!==e)throw new RangeError("Inconsistent array dimensions");this.data.push(Float64Array.from(r[o]))}}}return this.rows=t,this.columns=e,this}set(t,e,r){return this.data[t][e]=r,this}get(t,e){return this.data[t][e]}removeRow(t){if(a(this,t),1===this.rows)throw new RangeError("A matrix cannot have less than one row");return this.data.splice(t,1),this.rows-=1,this}addRow(t,e){return void 0===e&&(e=t,t=this.rows),a(this,t,!0),e=Float64Array.from(w(this,e)),this.data.splice(t,0,e),this.rows+=1,this}removeColumn(t){if(m(this,t),1===this.columns)throw new RangeError("A matrix cannot have less than one column");for(let e=0;e<this.rows;e++){const r=new Float64Array(this.columns-1);for(let o=0;o<t;o++)r[o]=this.data[e][o];for(let o=t+1;o<this.columns;o++)r[o-1]=this.data[e][o];this.data[e]=r}return this.columns-=1,this}addColumn(t,e){void 0===e&&(e=t,t=this.columns),m(this,t,!0),e=p(this,e);for(let r=0;r<this.rows;r++){const o=new Float64Array(this.columns+1);let s=0;for(;s<t;s++)o[s]=this.data[r][s];for(o[s++]=e[r];s<this.columns+1;s++)o[s]=this.data[r][s-1];this.data[r]=o}return this.columns+=1,this}}var v,R;R=S,(v=x).prototype.add=function(t){return"number"==typeof t?this.addS(t):this.addM(t)},v.prototype.addS=function(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)+t);return this},v.prototype.addM=function(t){if(t=R.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)+t.get(e,r));return this},v.add=function(t,e){return new R(t).add(e)},v.prototype.sub=function(t){return"number"==typeof t?this.subS(t):this.subM(t)},v.prototype.subS=function(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)-t);return this},v.prototype.subM=function(t){if(t=R.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)-t.get(e,r));return this},v.sub=function(t,e){return new R(t).sub(e)},v.prototype.subtract=v.prototype.sub,v.prototype.subtractS=v.prototype.subS,v.prototype.subtractM=v.prototype.subM,v.subtract=v.sub,v.prototype.mul=function(t){return"number"==typeof t?this.mulS(t):this.mulM(t)},v.prototype.mulS=function(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)*t);return this},v.prototype.mulM=function(t){if(t=R.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)*t.get(e,r));return this},v.mul=function(t,e){return new R(t).mul(e)},v.prototype.multiply=v.prototype.mul,v.prototype.multiplyS=v.prototype.mulS,v.prototype.multiplyM=v.prototype.mulM,v.multiply=v.mul,v.prototype.div=function(t){return"number"==typeof t?this.divS(t):this.divM(t)},v.prototype.divS=function(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)/t);return this},v.prototype.divM=function(t){if(t=R.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)/t.get(e,r));return this},v.div=function(t,e){return new R(t).div(e)},v.prototype.divide=v.prototype.div,v.prototype.divideS=v.prototype.divS,v.prototype.divideM=v.prototype.divM,v.divide=v.div,v.prototype.mod=function(t){return"number"==typeof t?this.modS(t):this.modM(t)},v.prototype.modS=function(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)%t);return this},v.prototype.modM=function(t){if(t=R.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)%t.get(e,r));return this},v.mod=function(t,e){return new R(t).mod(e)},v.prototype.modulus=v.prototype.mod,v.prototype.modulusS=v.prototype.modS,v.prototype.modulusM=v.prototype.modM,v.modulus=v.mod,v.prototype.and=function(t){return"number"==typeof t?this.andS(t):this.andM(t)},v.prototype.andS=function(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)&t);return this},v.prototype.andM=function(t){if(t=R.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)&t.get(e,r));return this},v.and=function(t,e){return new R(t).and(e)},v.prototype.or=function(t){return"number"==typeof t?this.orS(t):this.orM(t)},v.prototype.orS=function(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)|t);return this},v.prototype.orM=function(t){if(t=R.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)|t.get(e,r));return this},v.or=function(t,e){return new R(t).or(e)},v.prototype.xor=function(t){return"number"==typeof t?this.xorS(t):this.xorM(t)},v.prototype.xorS=function(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)^t);return this},v.prototype.xorM=function(t){if(t=R.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)^t.get(e,r));return this},v.xor=function(t,e){return new R(t).xor(e)},v.prototype.leftShift=function(t){return"number"==typeof t?this.leftShiftS(t):this.leftShiftM(t)},v.prototype.leftShiftS=function(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)<<t);return this},v.prototype.leftShiftM=function(t){if(t=R.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)<<t.get(e,r));return this},v.leftShift=function(t,e){return new R(t).leftShift(e)},v.prototype.signPropagatingRightShift=function(t){return"number"==typeof t?this.signPropagatingRightShiftS(t):this.signPropagatingRightShiftM(t)},v.prototype.signPropagatingRightShiftS=function(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)>>t);return this},v.prototype.signPropagatingRightShiftM=function(t){if(t=R.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)>>t.get(e,r));return this},v.signPropagatingRightShift=function(t,e){return new R(t).signPropagatingRightShift(e)},v.prototype.rightShift=function(t){return"number"==typeof t?this.rightShiftS(t):this.rightShiftM(t)},v.prototype.rightShiftS=function(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)>>>t);return this},v.prototype.rightShiftM=function(t){if(t=R.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,this.get(e,r)>>>t.get(e,r));return this},v.rightShift=function(t,e){return new R(t).rightShift(e)},v.prototype.zeroFillRightShift=v.prototype.rightShift,v.prototype.zeroFillRightShiftS=v.prototype.rightShiftS,v.prototype.zeroFillRightShiftM=v.prototype.rightShiftM,v.zeroFillRightShift=v.rightShift,v.prototype.not=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,~this.get(t,e));return this},v.not=function(t){return new R(t).not()},v.prototype.abs=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.abs(this.get(t,e)));return this},v.abs=function(t){return new R(t).abs()},v.prototype.acos=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.acos(this.get(t,e)));return this},v.acos=function(t){return new R(t).acos()},v.prototype.acosh=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.acosh(this.get(t,e)));return this},v.acosh=function(t){return new R(t).acosh()},v.prototype.asin=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.asin(this.get(t,e)));return this},v.asin=function(t){return new R(t).asin()},v.prototype.asinh=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.asinh(this.get(t,e)));return this},v.asinh=function(t){return new R(t).asinh()},v.prototype.atan=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.atan(this.get(t,e)));return this},v.atan=function(t){return new R(t).atan()},v.prototype.atanh=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.atanh(this.get(t,e)));return this},v.atanh=function(t){return new R(t).atanh()},v.prototype.cbrt=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.cbrt(this.get(t,e)));return this},v.cbrt=function(t){return new R(t).cbrt()},v.prototype.ceil=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.ceil(this.get(t,e)));return this},v.ceil=function(t){return new R(t).ceil()},v.prototype.clz32=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.clz32(this.get(t,e)));return this},v.clz32=function(t){return new R(t).clz32()},v.prototype.cos=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.cos(this.get(t,e)));return this},v.cos=function(t){return new R(t).cos()},v.prototype.cosh=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.cosh(this.get(t,e)));return this},v.cosh=function(t){return new R(t).cosh()},v.prototype.exp=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.exp(this.get(t,e)));return this},v.exp=function(t){return new R(t).exp()},v.prototype.expm1=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.expm1(this.get(t,e)));return this},v.expm1=function(t){return new R(t).expm1()},v.prototype.floor=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.floor(this.get(t,e)));return this},v.floor=function(t){return new R(t).floor()},v.prototype.fround=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.fround(this.get(t,e)));return this},v.fround=function(t){return new R(t).fround()},v.prototype.log=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.log(this.get(t,e)));return this},v.log=function(t){return new R(t).log()},v.prototype.log1p=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.log1p(this.get(t,e)));return this},v.log1p=function(t){return new R(t).log1p()},v.prototype.log10=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.log10(this.get(t,e)));return this},v.log10=function(t){return new R(t).log10()},v.prototype.log2=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.log2(this.get(t,e)));return this},v.log2=function(t){return new R(t).log2()},v.prototype.round=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.round(this.get(t,e)));return this},v.round=function(t){return new R(t).round()},v.prototype.sign=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.sign(this.get(t,e)));return this},v.sign=function(t){return new R(t).sign()},v.prototype.sin=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.sin(this.get(t,e)));return this},v.sin=function(t){return new R(t).sin()},v.prototype.sinh=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.sinh(this.get(t,e)));return this},v.sinh=function(t){return new R(t).sinh()},v.prototype.sqrt=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.sqrt(this.get(t,e)));return this},v.sqrt=function(t){return new R(t).sqrt()},v.prototype.tan=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.tan(this.get(t,e)));return this},v.tan=function(t){return new R(t).tan()},v.prototype.tanh=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.tanh(this.get(t,e)));return this},v.tanh=function(t){return new R(t).tanh()},v.prototype.trunc=function(){for(let t=0;t<this.rows;t++)for(let e=0;e<this.columns;e++)this.set(t,e,Math.trunc(this.get(t,e)));return this},v.trunc=function(t){return new R(t).trunc()},v.pow=function(t,e){return new R(t).pow(e)},v.prototype.pow=function(t){return"number"==typeof t?this.powS(t):this.powM(t)},v.prototype.powS=function(t){for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,Math.pow(this.get(e,r),t));return this},v.prototype.powM=function(t){if(t=R.checkMatrix(t),this.rows!==t.rows||this.columns!==t.columns)throw new RangeError("Matrices dimensions must be equal");for(let e=0;e<this.rows;e++)for(let r=0;r<this.columns;r++)this.set(e,r,Math.pow(this.get(e,r),t.get(e,r)));return this}},4255:function(t,e,r){"use strict";const o=Object.prototype.toString;t.exports=function(t){return o.call(t).endsWith("Array]")}}}]);