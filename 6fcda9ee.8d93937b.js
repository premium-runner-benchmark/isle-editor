(window.webpackJsonp=window.webpackJsonp||[]).push([[100],{169:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return i})),n.d(t,"rightToc",(function(){return b})),n.d(t,"SolutionButton",(function(){return c})),n.d(t,"default",(function(){return s}));var a=n(2),r=n(6),o=(n(0),n(368)),l={id:"editor-text",title:"Entering Text",sidebar_label:"Text"},i={unversionedId:"tutorials/editor-text",id:"tutorials/editor-text",isDocsHomePage:!1,title:"Entering Text",description:"Markdown",source:"@site/docs/tutorials/editor-text.md",slug:"/tutorials/editor-text",permalink:"/docs/tutorials/editor-text",editUrl:"https://github.com/isle-project/isle-editor/edit/master/docusaurus/website/docs/tutorials/editor-text.md",version:"current",lastUpdatedBy:"Planeshifter",lastUpdatedAt:1598888897,sidebar_label:"Text",sidebar:"docs",previous:{title:"Introduction to the Editor",permalink:"/docs/tutorials/editor-intro"},next:{title:"Including Images and Videos",permalink:"/docs/tutorials/editor-images"}},b=[{value:"Markdown",id:"markdown",children:[]},{value:"LaTeX",id:"latex",children:[]},{value:"HTML",id:"html",children:[]},{value:"Your Turn",id:"your-turn",children:[]}],c=function(e){return Object(o.b)("div",null,Object(o.b)("button",{className:"solution_button",onClick:function(){var e=document.getElementById("solution_text");"none"===e.style.display?e.style.display="block":e.style.display="none"}}," Show solution "))},p={rightToc:b,SolutionButton:c};function s(e){var t=e.components,l=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},p,l,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"markdown"},"Markdown"),Object(o.b)("p",null,Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://daringfireball.net/projects/markdown/"}),"Markdown")," (a readable syntax that gets converted to HTML) is used to write most of the text in ISLE lessons. If you haven't used Markdown before, don't worry! Markdown is light-weight, and much of what you want can be typed directly into the editor with little or no additional syntax. Below is a list of a few common text formatting tools; a nice summary of basic syntax can be found ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.markdownguide.org/basic-syntax/"}),"here")," and an extensive guide can also be found ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://daringfireball.net/projects/markdown/syntax"}),"here"),"."),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Headings"),":"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("inlineCode",{parentName:"p"},"# Sample")," is rendered as ",Object(o.b)("span",null," ",Object(o.b)("h1",null," Sample ")," ")),Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("inlineCode",{parentName:"p"},"## Sample")," is rendered as ",Object(o.b)("span",null," ",Object(o.b)("h2",null," Sample ")," ")),Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("inlineCode",{parentName:"p"},"### Sample")," is rendered as ",Object(o.b)("span",null," ",Object(o.b)("h3",null," Sample ")," "))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Emphasis"),":"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("inlineCode",{parentName:"p"},"*sample*")," is rendered as ",Object(o.b)("em",{parentName:"p"},"sample")),Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("inlineCode",{parentName:"p"},"**sample**")," is rendered as ",Object(o.b)("strong",{parentName:"p"},"sample"))),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Links"),":"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},Object(o.b)("inlineCode",{parentName:"p"},"[Ada Lovelace](https://en.wikipedia.org/wiki/Ada_Lovelace)")," renders as ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://en.wikipedia.org/wiki/Ada_Lovelace"}),"Ada Lovelace")," (and you can click to follow the link)")),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Lists"),":"),Object(o.b)("p",null,"Markdown supports both ordered and unordered lists. An unordered list is made with asterisks (",Object(o.b)("inlineCode",{parentName:"p"},"*"),") and hyphens (",Object(o.b)("inlineCode",{parentName:"p"},"-"),") for the bullet points. For example,"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"* Item 1\n* Item 2\n    - sub-item\n")),Object(o.b)("p",null,"renders as"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Item 1"),Object(o.b)("li",{parentName:"ul"},"Item 2",Object(o.b)("ul",{parentName:"li"},Object(o.b)("li",{parentName:"ul"},"sub-item")))),Object(o.b)("p",null,"For an ordered list, we use numbers:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"1. Item 1\n2. Item 2\n3. Item 3\n")),Object(o.b)("p",null,"becomes"),Object(o.b)("ol",null,Object(o.b)("li",{parentName:"ol"},"Item 1"),Object(o.b)("li",{parentName:"ol"},"Item 2"),Object(o.b)("li",{parentName:"ol"},"Item 3")),Object(o.b)("br",null),Object(o.b)("p",null,Object(o.b)("strong",{parentName:"p"},"Tables"),":"),Object(o.b)("p",null,"To make tables in Markdown, vertical bars (",Object(o.b)("inlineCode",{parentName:"p"},"|"),") are used to define columns and three or more hyphens (",Object(o.b)("inlineCode",{parentName:"p"},"---"),") specify the column headings. For example,"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"| Book | Author |\n| --- | --- |\n| Harry Potter and the Goblet of Fire | J.K. Rowling |\n| 1984 | George Orwell |\n| Americanah | Chimamanda Ngozi Adichie |\n")),Object(o.b)("p",null,"is rendered similar to"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Book"),Object(o.b)("th",Object(a.a)({parentName:"tr"},{align:null}),"Author"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Harry Potter and the Goblet of Fire"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"J.K. Rowling")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"1984"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"George Orwell")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Americanah"),Object(o.b)("td",Object(a.a)({parentName:"tr"},{align:null}),"Chimamanda Ngozi Adichie")))),Object(o.b)("h2",{id:"latex"},"LaTeX"),Object(o.b)("p",null,"LaTeX equations can be included by using the special ",Object(o.b)("inlineCode",{parentName:"p"},"TeX")," tag. Full details of the tag options can be found in the ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://isledocs.com/docs/tex"}),"docs"),"; the options you will use most are"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"raw"),": the LaTeX code to render."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"displayMode"),": inline (false) or display mode (true). Defaults to false."),Object(o.b)("li",{parentName:"ul"},Object(o.b)("strong",{parentName:"li"},"numbered"),": whether to display an equation number of display mode equations. Defaults to false.")),Object(o.b)("p",null,"For example, ",Object(o.b)("inlineCode",{parentName:"p"},'<TeX raw="\\frac{1}{\\sqrt{2\\pi}\\sigma^2} e^{-\\frac{1}{2\\sigma^2}(x - \\mu)^2}"  displayMode={true} />')," is rendered as"),Object(o.b)("img",{src:"http://latex.codecogs.com/gif.latex?\\frac{1}{\\sqrt{2\\pi}\\sigma^2} e^{-\\frac{1}{2\\sigma^2}(x - \\mu)^2}"}),Object(o.b)("p",null,"Alternatively, inline LaTeX can be written with ",Object(o.b)("inlineCode",{parentName:"p"},"$ $")," (or ",Object(o.b)("inlineCode",{parentName:"p"},"\\( \\)"),") and display-mode LaTeX equations can also be written with ",Object(o.b)("inlineCode",{parentName:"p"},"$$ $$")," (or ",Object(o.b)("inlineCode",{parentName:"p"},"\\[ \\]"),") rather than the ",Object(o.b)("inlineCode",{parentName:"p"},"TeX")," tag. For example, the same equation as above can be created by"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"\\[\\frac{1}{\\sqrt{2\\pi}\\sigma^2} e^{-\\frac{1}{2\\sigma^2}(x - \\mu)^2}\\]\n")),Object(o.b)("p",null,"and"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"$$\\frac{1}{\\sqrt{2\\pi}\\sigma^2} e^{-\\frac{1}{2\\sigma^2}(x - \\mu)^2}$$\n")),Object(o.b)("h2",{id:"html"},"HTML"),Object(o.b)("p",null,"In addition to custom ISLE tags like ",Object(o.b)("inlineCode",{parentName:"p"},"TeX"),", standard HTML tags are supported by ISLE. For example,"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"    <ul> \n        <li> visualization </li>\n        <li> data analysis </li>\n        <li> statistical modeling </li>\n    </ul>\n")),Object(o.b)("p",null,"is rendered as"),Object(o.b)("ul",null,Object(o.b)("li",null," visualization "),Object(o.b)("li",null," data analysis "),Object(o.b)("li",null," statistical modeling ")),Object(o.b)("p",null,"A comprehensive cheat sheet on HTML tags can be found ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://digital.com/tools/html-cheatsheet/"}),"here"),"."),Object(o.b)("h2",{id:"your-turn"},"Your Turn"),Object(o.b)("p",null,"In the ISLE editor, re-create the text pictured below. To show the solution, click the ",Object(o.b)("strong",{parentName:"p"},"Show solution")," button below the image."),Object(o.b)("p",null,Object(o.b)("img",{alt:"ISLE Text Example",src:n(4513).default})),Object(o.b)("pre",{id:"solution_text",style:{display:"none",wordBreak:"normal",wordWrap:"normal",whiteSpace:"pre-wrap",color:"rgb(191, 199, 213)",backgroundColor:"rgb(41, 45, 62)",padding:12}},'(Here\'s the solution - your preamble probably looks different)\n\n---\ntitle: "Tutorial example"\nauthor: Ciaran\ndate: 17/07/2019\nstate:\n---\n\n# Intro to the ISLE Editor\n\nThe ISLE editor allows users to write and and export instructional content.\n\n## Entering Text \n\n**Text** in ISLE is entered using Markdown and HTML syntax. You can learn more about Markdown at the [Markdown home page](https://daringfireball.net/projects/markdown/). \n\n## LaTeX Equations\n\n*Inline* and *display mode* LaTeX equations can be included, like <TeX raw="E(X) = int limits_{-infty}^infty x f(x) dx" /> and <TeX raw="V(X) = E(X^2) - E(X)^2" displayMode={true}/>\n\n\n## Sample Types of ISLE Lessons\n\n* Labs\n* Homeworks\n* Projects\n* Lecture Notes\n'),Object(o.b)(c,{mdxType:"SolutionButton"}))}s.isMDXComponent=!0},368:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return m}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function b(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var c=r.a.createContext({}),p=function(e){var t=r.a.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=p(e.components);return r.a.createElement(c.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},u=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,l=e.parentName,c=b(e,["components","mdxType","originalType","parentName"]),s=p(n),u=a,m=s["".concat(l,".").concat(u)]||s[u]||d[u]||o;return n?r.a.createElement(m,i(i({ref:t},c),{},{components:n})):r.a.createElement(m,i({ref:t},c))}));function m(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,l=new Array(o);l[0]=u;var i={};for(var b in t)hasOwnProperty.call(t,b)&&(i[b]=t[b]);i.originalType=e,i.mdxType="string"==typeof e?e:a,l[1]=i;for(var c=2;c<o;c++)l[c]=n[c];return r.a.createElement.apply(null,l)}return r.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},4513:function(e,t,n){"use strict";n.r(t),t.default=n.p+"assets/images/isle_text_example-e880dd8a368814d69c70ae7bc5f894e2.png"}}]);