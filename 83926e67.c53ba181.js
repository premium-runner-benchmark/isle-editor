(window.webpackJsonp=window.webpackJsonp||[]).push([[62],{206:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return o})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return s}));var r=n(1),i=n(10),a=(n(0),n(254)),l={id:"multiple-choice-survey",title:"Multiple Choice Survey",sidebar_label:"Multiple Choice Survey"},o={id:"multiple-choice-survey",title:"Multiple Choice Survey",description:"A survey component in which the instructor may collect multiple-choice survey data from students in real-time.",source:"@site/docs/multiple-choice-survey.md",permalink:"/docs/multiple-choice-survey",editUrl:"https://github.com/facebook/docusaurus/edit/master/website/docs/multiple-choice-survey.md",lastUpdatedBy:"Planeshifter",lastUpdatedAt:1584924745,sidebar_label:"Multiple Choice Survey",sidebar:"docs",previous:{title:"Free Text Survey",permalink:"/docs/free-text-survey"},next:{title:"Number Survey",permalink:"/docs/number-survey"}},c=[{value:"Example",id:"example",children:[]},{value:"Options",id:"options",children:[]}],u={rightToc:c};function s(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"A survey component in which the instructor may collect multiple-choice survey data from students in real-time."),Object(a.b)("h2",{id:"example"},"Example"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"<MultipleChoiceSurvey\n    anonymous\n    question=\"Are you left- or right-handed\"\n    answers={[ 'Left-handed', 'Right-handed' ]}/>\n/>\n")),Object(a.b)("p",null,Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://isle.heinz.cmu.edu/components/multiple-choice-survey"}),"Open interactive preview")),Object(a.b)("h2",{id:"options"},"Options"),Object(a.b)("ul",null,Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"id")," | ",Object(a.b)("inlineCode",{parentName:"li"},"string (required)"),": undefined. Default: ",Object(a.b)("inlineCode",{parentName:"li"},"none"),"."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"question")," | ",Object(a.b)("inlineCode",{parentName:"li"},"string"),": string indicating the question to ask the students. Default: ",Object(a.b)("inlineCode",{parentName:"li"},"''"),"."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"allowMultipleAnswers")," | ",Object(a.b)("inlineCode",{parentName:"li"},"boolean"),": controls whether one wishes to allow students to answer the survey multiple times. Default: ",Object(a.b)("inlineCode",{parentName:"li"},"false"),"."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"anonymous")," | ",Object(a.b)("inlineCode",{parentName:"li"},"boolean"),": controls whether student answers are anonymized. Default: ",Object(a.b)("inlineCode",{parentName:"li"},"false"),"."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"answers")," | ",Object(a.b)("inlineCode",{parentName:"li"},"array"),": array indicating answer choices for the students. Default: ",Object(a.b)("inlineCode",{parentName:"li"},"[]"),"."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"multipleAnswers")," | ",Object(a.b)("inlineCode",{parentName:"li"},"boolean"),": indicates whether students may select more than one answer. Note that this differs from allowMultipleAnswers in that allow makes students able to submit the question multiple times. Default: ",Object(a.b)("inlineCode",{parentName:"li"},"false"),"."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"title")," | ",Object(a.b)("inlineCode",{parentName:"li"},"string"),": panel title. Default: ",Object(a.b)("inlineCode",{parentName:"li"},"'Survey'"),"."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"style")," | ",Object(a.b)("inlineCode",{parentName:"li"},"object"),": CSS inline styles. Default: ",Object(a.b)("inlineCode",{parentName:"li"},"{}"),"."),Object(a.b)("li",{parentName:"ul"},Object(a.b)("strong",{parentName:"li"},"onSubmit")," | ",Object(a.b)("inlineCode",{parentName:"li"},"function"),": function to be called when an answer is submitted. Default: ",Object(a.b)("inlineCode",{parentName:"li"},"onSubmit() {}"),".")))}s.isMDXComponent=!0},254:function(e,t,n){"use strict";n.d(t,"a",(function(){return b})),n.d(t,"b",(function(){return d}));var r=n(0),i=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}var u=i.a.createContext({}),s=function(e){var t=i.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):o({},t,{},e)),n},b=function(e){var t=s(e.components);return i.a.createElement(u.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},m=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,l=e.parentName,u=c(e,["components","mdxType","originalType","parentName"]),b=s(n),m=r,d=b["".concat(l,".").concat(m)]||b[m]||p[m]||a;return n?i.a.createElement(d,o({ref:t},u,{components:n})):i.a.createElement(d,o({ref:t},u))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,l=new Array(a);l[0]=m;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var u=2;u<a;u++)l[u]=n[u];return i.a.createElement.apply(null,l)}return i.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"}}]);