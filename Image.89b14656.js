(window.webpackJsonp=window.webpackJsonp||[]).push([[161],{4285:function(t,e,o){"use strict";o.r(e);o(360),o(352),o(363);var a=o(362),s=o.n(a),i=o(353),n=o.n(i),r=o(354),c=o.n(r),l=o(369),p=o.n(l),h=o(357),d=o.n(h),u=o(358),v=o.n(u),y=o(355),g=o.n(y),f=o(350),m=o.n(f),w=o(0),k=o.n(w),M=(o(341),o(739)),S=o(397),C=o(701),b=o(3229),D=o.n(b),x=o(915),E=o(4698),N=o.n(E),R=o(615),G=o(4699);R.a.addResources("de","image",G.DE),R.a.addResources("en","image",G.EN),R.a.addResources("es","image",G.ES);o(265);function T(t){var e=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(t){return!1}}();return function(){var o,a=g()(t);if(e){var s=g()(this).constructor;o=Reflect.construct(a,arguments,s)}else o=a.apply(this,arguments);return v()(this,o)}}var L=function(t){d()(o,t);var e=T(o);function o(t){var a;return n()(this,o),a=e.call(this,t),m()(p()(a),"closeModal",(function(){a.setState({showModal:!1})})),a.state={showModal:!1},a}return c()(o,[{key:"renderModal",value:function(){var t=this;return this.state.showModal?s()(w.Fragment,{},void 0,s()(C.a,{show:this.state.showModal,onHide:this.closeModal,title:this.props.alt,backdrop:!0,dialogClassName:"modal-100w"},void 0,s()(C.a.Body,{style:{height:"calc(100vh - 80px)",position:"relative"}},void 0,k.a.createElement("div",{style:{height:"100%"},ref:function(e){t.containerDiv||(t.containerDiv=e,t.forceUpdate())}}),this.containerDiv?s()(N.a,{container:this.containerDiv,visible:this.state.showModal,images:[{src:this.props.src,alt:this.props.alt}],noNavbar:!0,noClose:!0,showTotal:!1,downloadable:!1,changeable:!1,zoomSpeed:.1}):null),s()(C.a.Footer,{},void 0,this.props.body?s()(D.a,{text:this.props.body,onCopy:this.closeModal},void 0,s()(S.a,{variant:"secondary"},void 0,this.props.t("copy-svg"))):null,this.props.onShare?s()(S.a,{variant:"secondary",onClick:function(){t.props.onShare(t.props.src),t.closeModal()}},void 0,this.props.t("share")):null,s()(D.a,{text:'<img src="'.concat(this.props.src,'" width="400" height="300" />'),onCopy:this.closeModal},void 0,s()(S.a,{variant:"secondary"},void 0,this.props.t("copy-link"))),s()(S.a,{variant:"secondary",href:this.props.src,download:"image.png"},void 0,this.props.t("save-image")),s()(S.a,{variant:"secondary",onClick:this.closeModal},void 0,this.props.t("close"))))):(this.containerDiv=null,null)}},{key:"render",value:function(){var t=this;return s()(w.Fragment,{},void 0,s()("img",{className:"isle-image ".concat(this.props.className),alt:this.props.alt,src:this.props.src,width:this.props.width,height:this.props.height,role:"presentation",onClick:function(){t.props.showModal&&t.setState({showModal:!0})},onDragStart:function(e){var o={key:"\x3c!--IMAGE_LOG:".concat(t.props.id,"_").concat(Object(x.a)(6),"--\x3e"),value:'<img src="'.concat(t.props.body,'" width="400" height="300" style="display: block; margin: 0 auto;" />')};e.dataTransfer.setData("text",'<img src="'.concat(t.props.src,'" width="400" height="300" />')),e.dataTransfer.setData("text/html",o.value),e.dataTransfer.setData("text/plain",o.key)},style:this.props.style}),this.renderModal())}}]),o}(w.Component);L.defaultProps={body:null,className:"",id:null,height:null,width:null,onShare:null,showModal:!0,alt:"",style:{}};e.default=Object(M.a)("image")(L)},4699:function(t){t.exports=JSON.parse('{"DE":{"close":"Schlie\xdfen","copy-link":"Link kopieren","copy-svg":"SVG kopieren","save-image":"Bild speichern","share":"Teilen"},"EN":{"close":"Close","copy-link":"Copy Link","copy-svg":"Copy SVG","save-image":"Save Image","share":"Share"},"ES":{"close":"Cerca","copy-link":"Copiar Link","copy-svg":"Copiar SVG","save-image":"Descargar imagen","share":"Compartir"}}')}}]);