(window.webpackJsonp=window.webpackJsonp||[]).push([[202],{5150:function(e){e.exports=JSON.parse('{"DE":{"copy-link":"Link kopieren","open-link-tab":"Link in neuer Registerkarte \xf6ffnen","open-link-window":"Link in neuem Fenster \xf6ffnen","read-aloud":"Laut vorlesen"},"EN":{"copy-link":"Copy link","open-link-tab":"Open link in new tab","open-link-window":"Open link in new window","read-aloud":"Read aloud"},"ES":{"copy-link":"Copiar enlace","open-link-tab":"Abrir enlace en nueva pesta\xf1a","open-link-window":"Abrir enlace en nueva ventana","read-aloud":"Leer en voz alta"}}')},5790:function(e,t,n){"use strict";n.r(t);n(360),n(352),n(363);var r=n(362),o=n.n(r),i=n(353),a=n.n(i),s=n(354),c=n.n(s),l=n(357),p=n.n(l),u=n(358),f=n.n(u),h=n(355),d=n.n(h),k=n(0),v=(n(341),n(739)),w=n(1969),y=n(392),b=n(1487),g=n.n(b),m=n(438),R=n(369),S=n.n(R),x=n(350),C=n.n(x),T=n(396),D=n.n(T),O=n(443);function P(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=d()(e);if(t){var o=d()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f()(this,n)}}var E=D()("isle:link:contextmenu"),I=function(e){p()(n,e);var t=P(n);function n(e){var r;return a()(this,n),r=t.call(this,e),C()(S()(r),"copyToClipboard",(function(e){E("Copying selection to clipboard... "),navigator.clipboard.writeText(r.props.url)})),C()(S()(r),"textToSpeech",(function(){var e=r.props.url,t=r.props.session,n=new SpeechSynthesisUtterance(e);n.lang=t.config.language||"en-US",window.speechSynthesis.speak(n)})),C()(S()(r),"openInTab",(function(){var e=r.props.url;E("Open ".concat(e," in new tab")),window.open(e,"_blank"),r.props.session.log({id:e,type:O.Hb,value:"tab"})})),C()(S()(r),"openInWindow",(function(){var e=r.props.url;E("Open ".concat(e," in new window")),window.open(e,"_blank","location=no,scrollbars=yes,status=yes"),r.props.session.log({id:e,type:O.Hb,value:"window"})})),r}return c()(n,[{key:"render",value:function(){var e=[o()(w.c,{onClick:this.copyToClipboard},0,this.props.t("copy-link"))];return"_blank"===this.props.target?(e.push(o()(w.c,{onClick:this.openInTab},1,this.props.t("open-link-tab"))),e.push(o()(w.c,{onClick:this.openInWindow},2,this.props.t("open-link-window")))):e=[],e.push(o()(w.c,{onClick:this.textToSpeech},3,this.props.t("read-aloud"))),o()(w.a,{id:"".concat(this.props.url,"-context-menu")},void 0,e)}}]),n}(k.Component);I.defaultProps={url:""};var N=I,L=n(615),_=n(5150);function F(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=d()(e);if(t){var o=d()(this).constructor;n=Reflect.construct(r,arguments,o)}else n=r.apply(this,arguments);return f()(this,n)}}L.a.addResources("de","link",_.DE),L.a.addResources("en","link",_.EN),L.a.addResources("es","link",_.ES);var J=function(e){p()(n,e);var t=F(n);function n(e){var r;return a()(this,n),(r=t.call(this,e)).state={url:null,href:null,target:e.target},r}return c()(n,[{key:"render",value:function(){return o()(k.Fragment,{},void 0,o()(w.b,{holdToDisplay:-1,disableIfShiftIsPressed:!0,id:"".concat(this.state.url,"-context-menu"),renderTag:"span"},void 0,o()("a",{className:this.props.className,href:this.state.url,target:this.state.target,style:this.props.style},void 0,this.props.children)),o()(N,{session:this.context,url:this.state.url,target:this.state.target,t:this.props.t}))}}],[{key:"getDerivedStateFromProps",value:function(e,t){if(e.href!==t.href){var n={href:e.href};return!Object(y.isPrimitive)(e.href)||g()(e.href,"http")||g()(e.href,"mailto")||g()(e.href,"#")?(n.url=e.href,n.target=e.target):(n.url="http://"+e.href,n.target=e.target),n}return null}}]),n}(k.Component);J.defaultProps={target:"_blank",className:"",style:{}},J.contextType=m.a;t.default=Object(v.a)("link")(J)}}]);