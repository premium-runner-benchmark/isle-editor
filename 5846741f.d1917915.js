(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{153:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return s}));var a=n(2),r=n(6),i=(n(0),n(368)),l={id:"draggable-list",title:"Draggable List",sidebar_label:"Draggable List"},o={unversionedId:"draggable-list",id:"draggable-list",isDocsHomePage:!1,title:"Draggable List",description:"A list of draggable elements that can be re-ordered by the students.",source:"@site/docs/draggable-list.md",slug:"/draggable-list",permalink:"/docs/draggable-list",editUrl:"https://github.com/isle-project/isle-editor/edit/master/docusaurus/website/docs/draggable-list.md",version:"current",lastUpdatedBy:"Planeshifter",lastUpdatedAt:1597542154,sidebar_label:"Draggable List",sidebar:"docs",previous:{title:"Color Picker",permalink:"/docs/color-picker"},next:{title:"Flippable Card",permalink:"/docs/flippable-card"}},c=[{value:"Example",id:"example",children:[]},{value:"Options",id:"options",children:[]}],b={rightToc:c};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},b,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"A list of draggable elements that can be re-ordered by the students."),Object(i.b)("h2",{id:"example"},"Example"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{className:"language-jsx",metastring:"live",live:!0}),'<DraggableList\n    data={[\n        { id: 0, text: "Compact" },\n        { id: 1, text: "Large" },\n        { id: 2, text: "Midsize" },\n        { id: 3, text: "Small" }\n    ]}\n    onChange={ ( data ) => {\n        let str = data\n            .map( x => \'"\'+x.text+\'"\' )\n            .join( \', \');\n        alert( str );\n    }}\n/>\n')),Object(i.b)("h2",{id:"options"},"Options"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"data")," | ",Object(i.b)("inlineCode",{parentName:"li"},"array (required)"),": array of objects with ",Object(i.b)("inlineCode",{parentName:"li"},"id")," and ",Object(i.b)("inlineCode",{parentName:"li"},"text")," keys. Default: ",Object(i.b)("inlineCode",{parentName:"li"},"none"),"."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"onChange")," | ",Object(i.b)("inlineCode",{parentName:"li"},"function"),": callback invoked with newly ordered data array on each change. Default: ",Object(i.b)("inlineCode",{parentName:"li"},"onChange(){}"),"."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"onInit")," | ",Object(i.b)("inlineCode",{parentName:"li"},"function"),": callback function invoked after mounting of component. Default: ",Object(i.b)("inlineCode",{parentName:"li"},"onInit(){}"),"."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"shuffle")," | ",Object(i.b)("inlineCode",{parentName:"li"},"boolean"),": controls whether data elements should be shuffled in initial display. Default: ",Object(i.b)("inlineCode",{parentName:"li"},"false"),"."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"disabled")," | ",Object(i.b)("inlineCode",{parentName:"li"},"boolean"),": controls whether elements can be dragged or not. Default: ",Object(i.b)("inlineCode",{parentName:"li"},"false"),"."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"className")," | ",Object(i.b)("inlineCode",{parentName:"li"},"string"),": class name. Default: ",Object(i.b)("inlineCode",{parentName:"li"},"''"),"."),Object(i.b)("li",{parentName:"ul"},Object(i.b)("strong",{parentName:"li"},"style")," | ",Object(i.b)("inlineCode",{parentName:"li"},"object"),": CSS inline styles. Default: ",Object(i.b)("inlineCode",{parentName:"li"},"{}"),".")))}s.isMDXComponent=!0},368:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var b=r.a.createContext({}),s=function(e){var t=r.a.useContext(b),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},p=function(e){var t=s(e.components);return r.a.createElement(b.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,l=e.parentName,b=c(e,["components","mdxType","originalType","parentName"]),p=s(n),u=a,m=p["".concat(l,".").concat(u)]||p[u]||d[u]||i;return n?r.a.createElement(m,o(o({ref:t},b),{},{components:n})):r.a.createElement(m,o({ref:t},b))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,l=new Array(i);l[0]=u;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:a,l[1]=o;for(var b=2;b<i;b++)l[b]=n[b];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);