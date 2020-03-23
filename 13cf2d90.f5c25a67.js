(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{149:function(e,t,o){"use strict";o.r(t),o.d(t,"frontMatter",(function(){return r})),o.d(t,"metadata",(function(){return l})),o.d(t,"rightToc",(function(){return c})),o.d(t,"default",(function(){return u}));var a=o(1),n=o(10),i=(o(0),o(254)),r={id:"editor-images",title:"Including Images and Videos",sidebar_label:"Images"},l={id:"tutorials/editor-images",title:"Including Images and Videos",description:"## Images",source:"@site/docs/tutorials/editor-images.md",permalink:"/docs/tutorials/editor-images",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/tutorials/editor-images.md",lastUpdatedBy:"Planeshifter",lastUpdatedAt:1584938738,sidebar_label:"Images",sidebar:"docs",previous:{title:"Entering Text",permalink:"/docs/tutorials/editor-text"},next:{title:"How to Use Questions",permalink:"/docs/tutorials/question-components"}},c=[{value:"Images",id:"images",children:[{value:"Uploading Images to Course Files",id:"uploading-images-to-course-files",children:[]}]},{value:"Videos",id:"videos",children:[]}],s={rightToc:c};function u(e){var t=e.components,o=Object(n.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},s,o,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h2",{id:"images"},"Images"),Object(i.b)("p",null,"Markdown syntax can be used to embed images in ISLE lessons, which takes the general form"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'![Alt text](path "optional title")\n')),Object(i.b)("p",null,"To embed an image in an ISLE lesson, the image must be hosted online (since ISLE users will not have access to your local files). So for example, to include a picture of Paul the octopus from the 2010 World Cup, we could do"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'![Paul the octopus](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Oktopus-Orakel_Paul_mit_Schuh.JPG/1280px-Oktopus-Orakel_Paul_mit_Schuh.JPG "Paul the octopus")\n')),Object(i.b)("p",null,"which renders to"),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Oktopus-Orakel_Paul_mit_Schuh.JPG/1280px-Oktopus-Orakel_Paul_mit_Schuh.JPG",alt:"Paul",title:"Paul the octopus"}))),Object(i.b)("p",null,"(hover over the image to see the title provided)."),Object(i.b)("p",null,"Alternatively, images can be included with custom ",Object(i.b)("inlineCode",{parentName:"p"},"<Image />")," tags. Since Markdown ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://daringfireball.net/projects/markdown/syntax#img"}),"does not currently")," support specifying image dimensions, you can use HTML ",Object(i.b)("inlineCode",{parentName:"p"},"<Image />")," syntax to include an image and change the dimension. For example, to specify dimensions for the picture of Paul the octopus:"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'<Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Oktopus-Orakel_Paul_mit_Schuh.JPG/1280px-Oktopus-Orakel_Paul_mit_Schuh.JPG" width="200" height="200" />\n')),Object(i.b)("p",null,"which becomes"),Object(i.b)("img",{src:"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Oktopus-Orakel_Paul_mit_Schuh.JPG/1280px-Oktopus-Orakel_Paul_mit_Schuh.JPG",width:"200",height:"200"}),Object(i.b)("h3",{id:"uploading-images-to-course-files"},"Uploading Images to Course Files"),Object(i.b)("p",null,Object(i.b)("strong",{parentName:"p"},"But what if we want to use an image we've created locally, rather than one hosted on the web?")," Well, the image will still need to be hosted, but we can do that easily by just uploading it to the ISLE course dashboard. Suppose we have the following plot that we want to embed in our lesson:"),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"https://isle.heinz.cmu.edu/Demo_histograms.png",alt:"histograms"}))),Object(i.b)("ol",null,Object(i.b)("li",{parentName:"ol"},"Go to your ISLE dashboard and select the course."),Object(i.b)("li",{parentName:"ol"},"Click the blue ",Object(i.b)("strong",{parentName:"li"},"Course Data")," button (pie-chart symbol) in the top bar."),Object(i.b)("li",{parentName:"ol"},"Click ",Object(i.b)("strong",{parentName:"li"},"Files"),"."),Object(i.b)("li",{parentName:"ol"},"Click ",Object(i.b)("strong",{parentName:"li"},"Upload file"),"; select the file you wish to upload."),Object(i.b)("li",{parentName:"ol"},"To see the uploaded file and get the url, click ",Object(i.b)("strong",{parentName:"li"},"Open")," next to the file name.")),Object(i.b)("p",null,Object(i.b)("img",Object(a.a)({parentName:"p"},{src:"assets/gifs/upload_file.gif",alt:"Add Owner"}))),Object(i.b)("p",null,"Now you can use the url of the uploaded image to embed the image in your ISLE lesson. For example, we can include the plot above by"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),"![histograms](https://isle.heinz.cmu.edu/Demo_histograms.png)\n")),Object(i.b)("br",null),Object(i.b)("h2",{id:"videos"},"Videos"),Object(i.b)("p",null,"As with images, videos must be hosted online (such as on YouTube) to be embedded in an ISLE lesson. To include a video, you can use ISLE's custom ",Object(i.b)("inlineCode",{parentName:"p"},"<VideoPlayer />")," tag. For example, to include ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.youtube.com/watch?v=wPqtzj5VZus"}),"this")," video of Trevor Hastie speaking on gradient boosting, we could use"),Object(i.b)("pre",null,Object(i.b)("code",Object(a.a)({parentName:"pre"},{}),'<VideoPlayer url="https://www.youtube.com/watch?v=wPqtzj5VZus" />\n')),Object(i.b)("p",null,"This tag also provides several customization options, including the dimensions of the embedded video, whether or not it plays automatically, and the start time of the video. Full details can be found in the ",Object(i.b)("a",Object(a.a)({parentName:"p"},{href:"https://isledocs.com/docs/video-player"}),"ISLE docs"),"."))}u.isMDXComponent=!0},254:function(e,t,o){"use strict";o.d(t,"a",(function(){return p})),o.d(t,"b",(function(){return m}));var a=o(0),n=o.n(a);function i(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}function r(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),o.push.apply(o,a)}return o}function l(e){for(var t=1;t<arguments.length;t++){var o=null!=arguments[t]?arguments[t]:{};t%2?r(Object(o),!0).forEach((function(t){i(e,t,o[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):r(Object(o)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(o,t))}))}return e}function c(e,t){if(null==e)return{};var o,a,n=function(e,t){if(null==e)return{};var o,a,n={},i=Object.keys(e);for(a=0;a<i.length;a++)o=i[a],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)o=i[a],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var s=n.a.createContext({}),u=function(e){var t=n.a.useContext(s),o=t;return e&&(o="function"==typeof e?e(t):l({},t,{},e)),o},p=function(e){var t=u(e.components);return n.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return n.a.createElement(n.a.Fragment,{},t)}},d=Object(a.forwardRef)((function(e,t){var o=e.components,a=e.mdxType,i=e.originalType,r=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),p=u(o),d=a,m=p["".concat(r,".").concat(d)]||p[d]||b[d]||i;return o?n.a.createElement(m,l({ref:t},s,{components:o})):n.a.createElement(m,l({ref:t},s))}));function m(e,t){var o=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=o.length,r=new Array(i);r[0]=d;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:a,r[1]=l;for(var s=2;s<i;s++)r[s]=o[s];return n.a.createElement.apply(null,r)}return n.a.createElement.apply(null,o)}d.displayName="MDXCreateElement"}}]);