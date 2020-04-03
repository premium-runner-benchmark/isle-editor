(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{243:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return p}));var a=n(1),r=n(10),l=(n(0),n(257)),i={id:"r-shell",title:"R Shell",sidebar_label:"R Shell"},o={id:"r/r-shell",title:"R Shell",description:"An interactive R Shell that can be used to execute R commands in the cloud using [OpenCPU](https://www.opencpu.org/).",source:"@site/docs/r/shell.md",permalink:"/docs/r/r-shell",editUrl:"https://github.com/isle-project/isle-editor/edit/master/docusaurus/website/docs/r/shell.md",lastUpdatedBy:"Planeshifter",lastUpdatedAt:1584924745,sidebar_label:"R Shell",sidebar:"docs",previous:{title:"R Plot",permalink:"/docs/r/r-plot"},next:{title:"R Table",permalink:"/docs/r/r-table"}},c=[{value:"Example",id:"example",children:[]},{value:"Options",id:"options",children:[]}],b={rightToc:c};function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(l.b)("wrapper",Object(a.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(l.b)("p",null,"An interactive R Shell that can be used to execute R commands in the cloud using ",Object(l.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.opencpu.org/"}),"OpenCPU"),"."),Object(l.b)("h2",{id:"example"},"Example"),Object(l.b)("pre",null,Object(l.b)("code",Object(a.a)({parentName:"pre"},{className:"language-js"}),'<RShell\n    code="abs(c(-2,3,-1))"\n/>\n')),Object(l.b)("p",null,Object(l.b)("a",Object(a.a)({parentName:"p"},{href:"https://isle.heinz.cmu.edu/components/r-shell/"}),"Open interactive preview")),Object(l.b)("h2",{id:"options"},"Options"),Object(l.b)("ul",null,Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"code")," | ",Object(l.b)("inlineCode",{parentName:"li"},"string"),": R code to be evaluated. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"''"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"solution")," | ",Object(l.b)("inlineCode",{parentName:"li"},"string"),": for programming questions, R code ",Object(l.b)("inlineCode",{parentName:"li"},"string")," representing the official solution for the problem. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"''"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"hints")," | ",Object(l.b)("inlineCode",{parentName:"li"},"array"),": for programming questions, an array of hints providing guidance on how to approach the problem. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"[]"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"addPreceding")," | ",Object(l.b)("inlineCode",{parentName:"li"},"boolean"),": if set to true, the shell will evaluate all the code from the current component and all previous ones occurring in the lesson. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"false"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"libraries")," | ",Object(l.b)("inlineCode",{parentName:"li"},"array"),": R libraries that should be loaded automatically when the input ",Object(l.b)("inlineCode",{parentName:"li"},"code")," is executed. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"[]"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"precompute")," | ",Object(l.b)("inlineCode",{parentName:"li"},"boolean"),": controls whether the default code should be executed once the component has mounted. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"false"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"prependCode")," | ",Object(l.b)("inlineCode",{parentName:"li"},"(string|array)"),": R code ",Object(l.b)("inlineCode",{parentName:"li"},"string")," (or ",Object(l.b)("inlineCode",{parentName:"li"},"array")," of R code blocks) to be prepended to the code stored in ",Object(l.b)("inlineCode",{parentName:"li"},"code")," when evaluating. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"''"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"chat")," | ",Object(l.b)("inlineCode",{parentName:"li"},"boolean"),": controls whether group chat functionality should be enabled. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"false"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"disabled")," | ",Object(l.b)("inlineCode",{parentName:"li"},"boolean"),": controls whether to disable all user inputs and make the code block static. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"false"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"lines")," | ",Object(l.b)("inlineCode",{parentName:"li"},"number"),": number of lines to display. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"5"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"resettable")," | ",Object(l.b)("inlineCode",{parentName:"li"},"boolean"),": controls whether to display a reset button for restoring the default code input. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"false"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"style")," | ",Object(l.b)("inlineCode",{parentName:"li"},"object"),": CSS inline styles. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"{}"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"onChange")," | ",Object(l.b)("inlineCode",{parentName:"li"},"function"),": callback invoked whenever the text field input changes. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"onChange() {}"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"onEvaluate")," | ",Object(l.b)("inlineCode",{parentName:"li"},"function"),": callback invoked whenever the ",Object(l.b)("inlineCode",{parentName:"li"},"Evaluate")," button is clicked. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"onEvaluate(){}"),"."),Object(l.b)("li",{parentName:"ul"},Object(l.b)("strong",{parentName:"li"},"onResult")," | ",Object(l.b)("inlineCode",{parentName:"li"},"function"),": callback invoked whenever the result of a code execution is obtained from the cloud. The result ",Object(l.b)("inlineCode",{parentName:"li"},"string")," is passed as the only argument to the callback function. Default: ",Object(l.b)("inlineCode",{parentName:"li"},"onResult() {}"),".")))}p.isMDXComponent=!0},257:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},l=Object.keys(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(a=0;a<l.length;a++)n=l[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var b=r.a.createContext({}),p=function(e){var t=r.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):o({},t,{},e)),n},u=function(e){var t=p(e.components);return r.a.createElement(b.Provider,{value:t},e.children)},s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,l=e.originalType,i=e.parentName,b=c(e,["components","mdxType","originalType","parentName"]),u=p(n),d=a,m=u["".concat(i,".").concat(d)]||u[d]||s[d]||l;return n?r.a.createElement(m,o({ref:t},b,{components:n})):r.a.createElement(m,o({ref:t},b))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=n.length,i=new Array(l);i[0]=d;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,i[1]=o;for(var b=2;b<l;b++)i[b]=n[b];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);