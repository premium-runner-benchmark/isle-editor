(window.webpackJsonp=window.webpackJsonp||[]).push([[64],{209:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return l}));var r=n(1),o=n(10),i=(n(0),n(255)),a={id:"packaging",title:"Exporting lessons",sidebar_label:"Exporting lessons"},s={id:"overview/packaging",title:"Exporting lessons",description:'To bundle an ISLE lesson as a single-page application, go to the "Export" page inside the editor. After selecting an appropriate output directory, you can start the bundling process. It might take a few minutes, especially if you choose to create a minified bundle. The reduction in file size due to minification is beneficial if the exported lesson is going to be served over the Internet.',source:"@site/docs/overview/packaging.md",permalink:"/docs/overview/packaging",editUrl:"https://github.com/isle-project/isle-editor/edit/master/docusaurus/website/docs/overview/packaging.md",lastUpdatedBy:"Planeshifter",lastUpdatedAt:1584927098,sidebar_label:"Exporting lessons",sidebar:"docs",previous:{title:"Building a first ISLE lesson",permalink:"/docs/overview/first-lesson"},next:{title:"Components",permalink:"/docs/overview/components"}},c=[],p={rightToc:c};function l(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,'To bundle an ISLE lesson as a single-page application, go to the "Export" page inside the editor. After selecting an appropriate output directory, you can start the bundling process. It might take a few minutes, especially if you choose to create a minified bundle. The reduction in file size due to minification is beneficial if the exported lesson is going to be served over the Internet.'),Object(i.b)("p",null,"After the export process is finished, a new directory is created in the chosen output directory, named after the title of the lesson specified in the ISLE preamble. The exported lesson is viewable in any major web browser, and can be easily hosted on personal websites, GitHub pages or any other hosting service."),Object(i.b)("p",null,Object(i.b)("img",Object(r.a)({parentName:"p"},{src:"/gifs/export.gif",alt:"Export gif"}))))}l.isMDXComponent=!0},255:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return b}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=o.a.createContext({}),l=function(e){var t=o.a.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):s({},t,{},e)),n},u=function(e){var t=l(e.components);return o.a.createElement(p.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},f=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=l(n),f=r,b=u["".concat(a,".").concat(f)]||u[f]||d[f]||i;return n?o.a.createElement(b,s({ref:t},p,{components:n})):o.a.createElement(b,s({ref:t},p))}));function b(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=f;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var p=2;p<i;p++)a[p]=n[p];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);