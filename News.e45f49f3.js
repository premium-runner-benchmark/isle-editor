/*! For license information please see News.e45f49f3.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[208],{1052:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var r=i(0);function n(t){var e=Object(r.useRef)(null);return Object(r.useEffect)((function(){e.current=t})),e.current}},1071:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var r=i(0);function n(){var t=Object(r.useRef)(!0),e=Object(r.useRef)((function(){return t.current}));return Object(r.useEffect)((function(){return function(){t.current=!1}}),[]),e.current}},1072:function(t,e,i){"use strict";function r(t,e){return t.contains?t.contains(e):t.compareDocumentPosition?t===e||!!(16&t.compareDocumentPosition(e)):void 0}i.d(e,"a",(function(){return r}))},1119:function(t,e,i){"use strict";function r(t,e){return t.classList?!!e&&t.classList.contains(e):-1!==(" "+(t.className.baseVal||t.className)+" ").indexOf(" "+e+" ")}i.d(e,"a",(function(){return r}))},1173:function(t,e,i){"use strict";var r=i(452),n=i(1250)(5),s=!0;"find"in[]&&Array(1).find((function(){s=!1})),r(r.P+r.F*s,"Array",{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),i(821)("find")},3283:function(t,e,i){"use strict";var r=i(3284);t.exports=r},3284:function(t,e,i){"use strict";var r=i(392).isPrimitive;t.exports=function(t){if(!r(t))throw new TypeError("invalid argument. First argument must be a string primitive. Value: `"+t+"`.");return""===t?"":t.charAt(0).toUpperCase()+t.slice(1)}},400:function(t,e,i){"use strict";function r(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}i.d(e,"a",(function(){return r}))},432:function(t,e,i){"use strict";i.d(e,"a",(function(){return s}));var r=i(0);var n=function(t){var e=Object(r.useRef)(t);return Object(r.useEffect)((function(){e.current=t}),[t]),e};function s(t){var e=n(t);return Object(r.useCallback)((function(){return e.current&&e.current.apply(e,arguments)}),[e])}},465:function(t,e,i){"use strict";e.a=!("undefined"==typeof window||!window.document||!window.document.createElement)},479:function(t,e,i){"use strict";var r=i(465),n=!1,s=!1;try{var a={get passive(){return n=!0},get once(){return s=n=!0}};r.a&&(window.addEventListener("test",a,a),window.removeEventListener("test",a,!0))}catch(o){}e.a=function(t,e,i,r){if(r&&"boolean"!=typeof r&&!s){var a=r.once,o=r.capture,c=i;!s&&a&&(c=i.__once||function t(r){this.removeEventListener(e,t,o),i.call(this,r)},i.__once=c),t.addEventListener(e,c,n?r:o)}t.addEventListener(e,i,r)}},480:function(t,e,i){"use strict";e.a=function(t,e,i,r){var n=r&&"boolean"!=typeof r?r.capture:r;t.removeEventListener(e,i,n),i.__once&&t.removeEventListener(e,i.__once,n)}},484:function(t,e,i){"use strict";function r(t){return t&&t.ownerDocument||document}i.d(e,"a",(function(){return r}))},495:function(t,e,i){"use strict";var r=i(479),n=i(480);e.a=function(t,e,i,s){return Object(r.a)(t,e,i,s),function(){Object(n.a)(t,e,i,s)}}},5167:function(t){t.exports=JSON.parse('[{"title":"ABC News","trig":"abc-news-aus"},{"title":"Ars Technica","trig":"ars technica"},{"title":"BBC News","trig":"bbc-news"},{"title":"Bild","trig":"bild"},{"title":"Business Insider (UK)","trig":"business-insider-uk"},{"title":"BBC News","trig":"bbc-news"},{"title":"CNBC","trig":"cnbc"},{"title":"Daily Mail","trig":"daily-mail"},{"title":"Die Zeit","trig":"die-zeit"},{"title":"Entertainment Weekly","trig":"entertainment-weekly"},{"title":"ESPN Cric Info","trig":"espn-cric-info"},{"title":"Focus","trig":"focus"},{"title":"Fortune","trig":"fortune"},{"title":"BBC News","trig":"bbc-news"},{"title":"Fox Sports","trig":"fox-sports"},{"title":"Gruenderszene","trig":"gruenderszene"},{"title":"Handelsblatt","trig":"handelsblatt"},{"title":"Independent","trig":"independent"},{"title":"Metro","trig":"metro"},{"title":"National Geographic","trig":"national-geographic"},{"title":"MTVNews","trig":"mtv-news"},{"title":"Newsweek","trig":"newsweek"},{"title":"BBC News","trig":"bbc-news"},{"title":"NFL News","trig":"nfl-news"},{"title":"Recode","trig":"recode"},{"title":"Reuters","trig":"reuters"},{"title":"T3n","trig":"t3n"},{"title":"TechCrunch","trig":"techcrunch"},{"title":"The Economist","trig":"the-economist"},{"title":"The Guardian (UK)","trig":"the-guardian-uk"},{"title":"The Huffington Post","trig":"the-huffington-post"},{"title":"The New York Times","trig":"the-new-york-times"},{"title":"The Sport Bible","trig":"the-sport-bible"},{"title":"The Times of India","trig":"the-times-of-india"},{"title":"The Wall Street Journal","trig":"the-wall-street-journal"},{"title":"Time","trig":"time"},{"title":"Wired.de","trig":"wired-de"},{"title":"Al Jazeera English","trig":"al-jazeera-english"},{"title":"Associated Press","trig":"associated-press"},{"title":"BBC Sport","trig":"bbc-sport"},{"title":"Bloomberg","trig":"bloomberg"},{"title":"Business Insider","trig":"business-insider"},{"title":"Buzzfeed","trig":"buzzfeed"},{"title":"CNN","trig":"cnn"},{"title":"Der Tagesspiegel","trig":"der-tagesspiegel"},{"title":"Engadget","trig":"engadget"},{"title":"ESPN","trig":"espn"},{"title":"Financial Times","trig":"financial-times"},{"title":"Football Italia","trig":"football-italia"},{"title":"FourFourTwo","trig":"four-four-two"},{"title":"GoogleNews","trig":"google-news"},{"title":"Hacker News","trig":"hacker-news"},{"title":"IGN","trig":"ign"},{"title":"Mashable","trig":"mashable"},{"title":"Mirror","trig":"mirror"},{"title":"MTV News","trig":"mtv-news-uk"},{"title":"New Scientist","trig":"new-scientist"},{"title":"New York Magazine","trig":"new-york-magazine"},{"title":"Polygon","trig":"polygon"},{"title":"Reddit/r/all","trig":"reddit-r-all"},{"title":"Spiegel Online","trig":"spiegel-online"},{"title":"TalkSport","trig":"talksport"},{"title":"TechRadar","trig":"techradar"},{"title":"The Guardian (AU)","trig":"the-guardian-au"},{"title":"The Hindu","trig":"the-hindu"},{"title":"The Lad Bible","trig":"the-lad-bible"},{"title":"The Next Web","trig":"the-next-web"},{"title":"The Telegraph","trig":"the-telegraph"},{"title":"The Verge","trig":"the-verge"},{"title":"The Washington Post","trig":"the-washington-post"},{"title":"USA Today","trig":"usa-today"}]')},5168:function(t){t.exports=JSON.parse('{"techcrunch":"TechChrunch","tech crunch":"TechChrunch","next web":"Next Web","LAD Bible":"Lad Bible","talkSPORT":"TalkSport","Redditch":"Reddit/r/all","New York magine":"New York Magazine","new Scientist":"New Scientist","hacker news":"Hacker News","Google News":"GoogleNews","four four two":"FourFourTwo","football Italia":"Football Italia","BuzzFeed":"Buzzfeed","Turkish speaker":"Tagesspiegel","associated Press":"Associated Press","wired":"Wired","Wyatt":"Wired","time":"The Time","times of India":"Times of India","sport Bible":"Sport Bible","t3n":"T3n","Rogers":"Reuters","writers":"Reuters","recalled":"Recode","Leek Road":"Recode","newsweek":"Newsweek","Frodsham":"Fortune","entertainment weekly":"Entertainment Weekly","Deeside":"Die Zeit","ask Technica":"Ars Technica","ars Technica":"Ars Technica"}')},518:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var r=Function.prototype.bind.call(Function.prototype.call,[].slice);function n(t,e){return r(t.querySelectorAll(e))}},5726:function(t,e,i){"use strict";i.r(e);i(360),i(352),i(363);var r=i(362),n=i.n(r),s=(i(1173),i(1337),i(782),i(353)),a=i.n(s),o=i(354),c=i.n(o),l=i(369),u=i.n(l),g=i(357),d=i.n(g),f=i(358),h=i.n(f),p=i(355),v=i.n(p),w=i(350),b=i.n(w),m=i(0),y=(i(341),i(396)),T=i.n(y),N=i(701),k=i(397),B=i(3283),S=i.n(B),A=i(1168),R=i(438),E=i(5167),F=i(5168);i(279);function C(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var i,r=v()(t);if(e){var n=v()(this).constructor;i=Reflect.construct(r,arguments,n)}else i=r.apply(this,arguments);return h()(this,i)}}var D=T()("isle:news");var x=n()("span",{className:"article-header"},void 0,"NEWS"),O=function(t){d()(i,t);var e=C(i);function i(t){var r;return a()(this,i),r=e.call(this,t),b()(u()(r),"register",(function(){r.context.speechInterface.register({name:r.props.voiceID,ref:u()(r),commands:[{command:"trigger",trigger:["news","articles"],text:!0},{command:"hide",trigger:["close"]}]})})),b()(u()(r),"displayArticles",(function(t){r.props.onArticles(t),r.setState({visible:!0,articles:t})})),b()(u()(r),"find",(function(t){t=function(t){var e=F[t];return e||S()(t)}(t=t.replace("the ",""));for(var e=null,i=0;i<E.length;i++){-1!==E[i].title.search(t)&&(e=E[i].trig)}e&&r.getArticles(e)})),b()(u()(r),"trigger",(function(t){D("News component is externally triggered...");var e="in";switch(r.props.language){case"en-US":case"de-DE":e="in";break;case"fr-FR":e="dans";break;default:e="in"}var i=t.search(e);if(-1!==i){i+=e.length+1;var n=t.substring(i,t.length);r.find(n)}})),b()(u()(r),"hide",(function(){r.setState({visible:null})})),r.state={articles:null,visible:null},r}return c()(i,[{key:"componentDidMount",value:function(){this.list=E,this.props.voiceID&&this.register()}},{key:"getArticles",value:function(t){var e=this,i="https://newsapi.org/v1/articles?source="+t+"&sortBy=latest&apiKey="+this.props.key;fetch(i).then((function(t){return t.json()})).then((function(t){t.articles&&e.displayArticles(t.articles)})).catch((function(t){e.addNotification({title:"Couldn't retrieve data.",message:t.message,position:"tr",level:"failure"})}))}},{key:"getDate",value:function(t){return new Date(t).toLocaleString(this.props.language)}},{key:"getArticle",value:function(t,e){var i=t.author;"null"===i&&(i="");var r=this.getDate(t.publishedAt);return n()("div",{className:"article"},void 0,n()("div",{className:"article-author"},void 0,i),n()("div",{className:"article-title"},void 0,t.title),n()("div",{className:"image"},void 0,n()("img",{src:t.urlToImage,alt:"Article Preview"})),n()("div",{className:"article-description"},void 0,t.description),n()("div",{className:"article-source"},void 0,n()("a",{href:t.url},void 0,r)))}},{key:"articles",value:function(){if(!this.state.articles)return null;for(var t=[],e=0;e<this.state.articles.length;e++){var i=this.state.articles[e];t.push(this.getArticle(i,e))}return t}},{key:"renderArticles",value:function(){return this.state.visible?n()(N.a.Body,{className:"articles"},void 0,this.articles()):null}},{key:"render",value:function(){return n()(N.a,{show:this.state.visible||!this.props.invisible,id:this.props.id,className:"article-container",backdrop:!1,enforceFocus:!1},void 0,n()(N.a.Header,{},void 0,x,this.props.invisible?null:n()(A.a,{placeholder:"Pick a newspaper",style:{float:"left",width:"45%",marginTop:10},language:this.props.language,onSubmit:this.find,onFinalText:this.trigger}),this.state.articles?n()(k.a,{onClick:this.hide,className:"articles-exit"},void 0,"Clear"):null),this.renderArticles())}}]),i}(m.Component);O.defaultProps={language:"en-US",invisible:!1,key:"2987fd19bd374249979c4e38e40ef8b8",voiceID:null,onArticles:function(){}},O.contextType=R.a,e.default=O},786:function(t,e,i){"use strict";i.d(e,"a",(function(){return n}));var r=i(0);function n(){return Object(r.useState)(null)}}}]);