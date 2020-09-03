/*! For license information please see Revealer.d9646c2c.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[236],{433:function(e,t,n){"use strict";function r(){if(console&&console.warn){for(var e,t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];"string"==typeof n[0]&&(n[0]="react-i18next:: ".concat(n[0])),(e=console).warn.apply(e,n)}}n.d(t,"d",(function(){return r})),n.d(t,"e",(function(){return a})),n.d(t,"c",(function(){return i})),n.d(t,"b",(function(){return s})),n.d(t,"a",(function(){return c}));var o={};function a(){for(var e=arguments.length,t=new Array(e),n=0;n<e;n++)t[n]=arguments[n];"string"==typeof t[0]&&o[t[0]]||("string"==typeof t[0]&&(o[t[0]]=new Date),r.apply(void 0,t))}function i(e,t,n){e.loadNamespaces(t,(function(){if(e.isInitialized)n();else{e.on("initialized",(function t(){setTimeout((function(){e.off("initialized",t)}),0),n()}))}}))}function s(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};if(!t.languages||!t.languages.length)return a("i18n.languages were undefined or empty",t.languages),!0;var r=t.languages[0],o=!!t.options&&t.options.fallbackLng,i=t.languages[t.languages.length-1];if("cimode"===r.toLowerCase())return!0;var s=function(e,n){var r=t.services.backendConnector.state["".concat(e,"|").concat(n)];return-1===r||2===r};return!(n.bindI18n&&n.bindI18n.indexOf("languageChanging")>-1&&t.services.backendConnector.backend&&t.isLanguageChangingTo&&!s(t.isLanguageChangingTo,e))&&(!!t.hasResourceBundle(r,e)||(!t.services.backendConnector.backend||!(!s(r,e)||o&&!s(i,e))))}function c(e){return e.displayName||e.name||("string"==typeof e&&e.length>0?e:"Unknown")}},466:function(e,t,n){var r=n(489);e.exports=function(e,t){if(null==e)return{};var n,o,a=r(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(o=0;o<i.length;o++)n=i[o],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}},489:function(e,t){e.exports=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}},5213:function(e){e.exports=JSON.parse('{"DE":{"all-students":"Alle Studenten","contents-of":"Inhalt von ","from":"von","hide":"Ausblenden","message":"Vom Instruktor verborgener Inhalt","reveal":"Aufdecken","to":"zu"},"EN":{"all-students":"All students","contents-of":"contents of ","from":"from","hide":"Hide","message":"Content hidden by instructor","reveal":"Reveal","to":"to"},"ES":{"all-students":"Todos los estudiantes","contents-of":"contenido de ","from":"de","hide":"Esconder","message":"Contenido oculto por el instructor","reveal":"Revelar","to":"a"}}')},5805:function(e,t,n){"use strict";n.r(t);n(360),n(352),n(363);var r=n(362),o=n.n(r),a=n(353),i=n.n(a),s=n(354),c=n.n(s),u=n(369),l=n.n(u),d=n(357),f=n.n(d),h=n(358),p=n.n(h),v=n(355),g=n.n(v),b=n(350),y=n.n(b),m=n(0),w=n(396),O=n.n(w),C=(n(341),n(739)),j=n(397),P=n(698),R=n.n(P),S=n(631),x=n(792),k=n(682),E=n(438),N=n(443),D=n(639),I=n(615),A=n(5213);function M(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=g()(e);if(t){var o=g()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return p()(this,n)}}I.a.addResources("de","revealer",A.DE),I.a.addResources("en","revealer",A.EN),I.a.addResources("es","revealer",A.ES);var T=O()("isle:revealer"),z=Object(k.a)("revealer"),L=function(e){f()(n,e);var t=M(n);function n(e){var r;return i()(this,n),r=t.call(this,e),y()(l()(r),"readMetadata",(function(){var e=r.context;if(e&&e.metadata&&e.metadata.revealer&&e.metadata.revealer[r.id]){var t=e.metadata.revealer[r.id][e.cohort||"all"];!0!==t&&!1!==t||r.setState({showChildren:t})}})),y()(l()(r),"toggleContent",(function(){r.setState({showChildren:!r.state.showChildren},(function(){var e=r.context,t=e.metadata.revealer[r.id]||{};r.state.showChildren?(e.log({id:r.id,type:N.Yb,value:r.state.selectedCohort},"members"),t[r.state.selectedCohort||"all"]=!0,e.updateMetadata("revealer",r.id,t)):(e.log({id:r.id,type:N.mb,value:r.state.selectedCohort},"members"),t[r.state.selectedCohort||"all"]=!1,e.updateMetadata("revealer",r.id,t))}))})),y()(l()(r),"handleCohortChange",(function(e){var t=e.target.value;(t!==r.state.selectedCohort||"all"===t&&R()(r.state.selectedCohort))&&(T("Handle cohort change: "+t),r.setState({selectedCohort:"all"===t?null:t}))})),y()(l()(r),"stopPropagation",(function(e){e.stopPropagation()})),r.id=e.id||z(e),r.state={showChildren:e.show,selectedCohort:null,showProp:e.show},r}return c()(n,[{key:"componentDidMount",value:function(){var e=this;T("Component ".concat(this.id," did mount..."));var t=this.context;t&&(this.readMetadata(),this.unsubscribe=t.subscribe((function(n,r){if(n===D.y)e.forceUpdate();else if(n===D.u)e.readMetadata();else if(n===D.n&&r.id===e.id){var o=r.value;T("Received action for cohort ".concat(o,": ")),!o||t.cohort&&t.cohort===o?r.type===N.Yb?(T("Reveal content for ".concat(e.id,"...")),e.setState({showChildren:!0})):r.type===N.mb&&(T("Hide content for ".concat(e.id,"...")),e.setState({showChildren:!1})):e.state.selectedCohort===o&&(r.type===N.Yb?(T("Reveal content of ".concat(e.id," for cohort ").concat(o,"...")),e.setState({showChildren:!0})):r.type===N.mb&&(T("Hide content of ".concat(e.id," for cohort ").concat(o,"...")),e.setState({showChildren:!1})))}})))}},{key:"componentWillUnmount",value:function(){T("Component ".concat(this.id," will unmount...")),this.unsubscribe&&this.unsubscribe()}},{key:"render",value:function(){var e=this.context.cohorts||[],t=o()("h3",{className:"center"},void 0,this.props.message||this.props.t("message"));return o()(m.Fragment,{},void 0,o()(x.a,{owner:!0},void 0,o()(S.a,{className:"center",style:{marginBottom:"10px",width:"fit-content"}},void 0,o()(j.a,{onClick:this.toggleContent,style:{marginRight:10}},void 0,this.state.showChildren?this.props.t("hide"):this.props.t("reveal")),this.props.t("contents-of"),o()("i",{},void 0,this.id)," ",this.state.showChildren?this.props.t("from"):this.props.t("to"),o()("select",{style:{width:"150px",background:"#2e4468",marginLeft:"10px",padding:"2px",color:"white"},onChange:this.handleCohortChange,onBlur:this.handleCohortChange,onClick:this.stopPropagation,value:this.state.selectedCohort||"all"},void 0,o()("option",{value:"all"},void 0,this.props.t("all-students")),e.map((function(e,t){return o()("option",{value:e.title},t,e.title)}))))),this.state.showChildren?this.props.children:t)}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.show!==t.showProp?{showChildren:e.show,showProp:e.show}:null}}]),n}(m.Component);L.defaultProps={message:null,show:!1},L.contextType=E.a;t.default=Object(C.a)("revealer")(L)},698:function(e,t,n){"use strict";var r=n(919);e.exports=r},739:function(e,t,n){"use strict";n.d(t,"a",(function(){return y}));var r=n(350),o=n.n(r),a=n(445),i=n.n(a),s=n(466),c=n.n(s),u=n(0),l=n.n(u),d=n(681),f=n(433);function h(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?h(Object(n),!0).forEach((function(t){o()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):h(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function v(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=t.i18n,r=Object(u.useContext)(d.a)||{},o=r.i18n,a=r.defaultNS,s=n||o||Object(d.d)();if(s&&!s.reportNamespaces&&(s.reportNamespaces=new d.b),!s){Object(f.e)("You will need to pass in an i18next instance by using initReactI18next");var c=function(e){return Array.isArray(e)?e[e.length-1]:e},l=[c,{},!1];return l.t=c,l.i18n={},l.ready=!1,l}var h=p(p(p({},Object(d.c)()),s.options.react),t),v=h.useSuspense,g=e||a||s.options&&s.options.defaultNS;g="string"==typeof g?[g]:g||["translation"],s.reportNamespaces.addUsedNamespaces&&s.reportNamespaces.addUsedNamespaces(g);var b=(s.isInitialized||s.initializedStoreOnce)&&g.every((function(e){return Object(f.b)(e,s,h)}));function y(){return{t:s.getFixedT(null,"fallback"===h.nsMode?g:g[0])}}var m=Object(u.useState)(y()),w=i()(m,2),O=w[0],C=w[1],j=Object(u.useRef)(!0);Object(u.useEffect)((function(){var e=h.bindI18n,t=h.bindI18nStore;function n(){j.current&&C(y())}return j.current=!0,b||v||Object(f.c)(s,g,(function(){j.current&&C(y())})),e&&s&&s.on(e,n),t&&s&&s.store.on(t,n),function(){j.current=!1,e&&s&&e.split(" ").forEach((function(e){return s.off(e,n)})),t&&s&&t.split(" ").forEach((function(e){return s.store.off(e,n)}))}}),[g.join()]);var P=[O.t,s,b];if(P.t=O.t,P.i18n=s,P.ready=b,b)return P;if(!b&&!v)return P;throw new Promise((function(e){Object(f.c)(s,g,(function(){e()}))}))}function g(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function b(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?g(Object(n),!0).forEach((function(t){o()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):g(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function y(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return function(n){function r(r){var o=r.forwardedRef,a=c()(r,["forwardedRef"]),s=v(e,a),u=i()(s,3),d=u[0],f=u[1],h=u[2],p=b(b({},a),{},{t:d,i18n:f,tReady:h});return t.withRef&&o?p.ref=o:!t.withRef&&o&&(p.forwardedRef=o),l.a.createElement(n,p)}r.displayName="withI18nextTranslation(".concat(Object(f.a)(n),")"),r.WrappedComponent=n;return t.withRef?l.a.forwardRef((function(e,t){return l.a.createElement(r,Object.assign({},e,{forwardedRef:t}))})):r}}},919:function(e,t,n){"use strict";e.exports=function(e){return null===e}}}]);