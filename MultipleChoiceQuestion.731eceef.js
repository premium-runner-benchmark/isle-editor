(window.webpackJsonp=window.webpackJsonp||[]).push([[205],{2527:function(e,t,n){"use strict";var r=n(419),s=n.n(r),a=n(703),i=n.n(a);t.a=function(e,t,n){if(i()(e)){var r=e[t];if(s()(r)&&(r=r.filter((function(e){return e.type===n}))).length>0)return r[0].value}return null}},2826:function(e,t,n){"use strict";var r=n(0),s=n(396),a=n.n(s),i=n(419),o=n.n(i),c=n(437),u=n.n(c),l=n(555),p=n.n(l),d=n(630),v=n(1695),b=n(1702),h=n(1970),m=n(1699),f=n(1703),w=n(1704),g=n(1705),k=n(1706),y=a()("isle:convert-json");t.a=function e(t){y("Convert JSON ".concat(t.component," object to React element..."));var n=p()(t.children);if(o()(n))for(var s=0;s<n.length;s++){var a=n[s];u()(a)&&(n[s]=e(a))}else u()(n)&&(n=e(n));var i=t.component;switch(i){case"Fragment":i=r.Fragment;break;case"TeX":i=d.a;break;case"FreeTextQuestion":i=v.a;break;case"MultipleChoiceMatrix":i=h.a;break;case"MultipleChoiceQuestion":i=b.a;break;case"MatchListQuestion":i=m.a;break;case"NumberQuestion":i=f.a;break;case"OrderQuestion":i=w.a;break;case"RangeQuestion":i=g.a;break;case"SelectQuestion":i=k.a;break;default:i=t.component}var c=t.props||{};return Object(r.createElement)(i,c,n)}},4270:function(e,t,n){"use strict";n.r(t);n(408),n(405),n(391),n(387),n(402),n(360),n(352),n(363);var r=n(362),s=n.n(r),a=n(353),i=n.n(a),o=n(354),c=n.n(o),u=n(369),l=n.n(u),p=n(357),d=n.n(p),v=n(358),b=n.n(v),h=n(355),m=n.n(h),f=n(350),w=n.n(f),g=n(0),k=n.n(g),y=(n(341),n(739)),S=n(397),O=n(1344),C=n(447),A=n(396),x=n.n(A),j=n(419),E=n.n(j),P=n(393),N=n(698),D=n.n(N),F=n(549),q=n.n(F),R=n(984),z=n(789),Q=n(994),M=n(785),H=n(1170),L=n(438),T=n(2444),J=n.n(T);var U=function(e){switch(e=J()(e)){case"zeroth":case"zero":case"0":return 0;case"first":case"one":case"1":return 1;case"second":case"two":case"2":return 2;case"third":case"three":case"3":return 3;case"fourth":case"four":case"4":return 4;case"fifth":case"five":case"5":return 5;case"sixth":case"six":case"6":return 6;case"sevent":case"seven":case"7":return 7;case"eighth":case"eight":case"8":return 8;case"ninth":case"nine":case"9":return 9;case"tenth":case"ten":case"10":return 10}},I=n(682),Y=n(2527),W=n(443),B=n(639),V=n(5165),X=n(1077),_=n(1073),G=n(437),K=n.n(G),Z=n(1062),$=n(2826);n(68);var ee=function(e){var t;!0===e.correct?t="success":!1===e.correct?t="danger":!0===e.solution&&(t="warning");var n,r=(n=e.answerContent,K()(n)&&n.component?Object($.a)(e.answerContent):e.answerContent),a=s()(_.a,{id:e.no},void 0,s()("strong",{},void 0,e.solution?"Correct answer":"Incorrect answer",e.answerExplanation?": ":""),e.answerExplanation);return e.disabled?s()(X.a,{className:"multiple-choice-answer",variant:t,disabled:!0},void 0,r):e.submitted?s()(Z.a,{trigger:["click","hover"],placement:"right",overlay:a},void 0,s()(X.a,{className:"multiple-choice-answer",onClick:e.onAnswerSelected,variant:t},void 0,r)):s()(X.a,{className:"multiple-choice-answer",onClick:e.onAnswerSelected,active:e.active},void 0,r)};ee.defaultProps={correct:null};var te=ee,ne=n(523);var re=function(e){var t;!0===e.correct?t="success":!1===e.correct&&(t="danger");var n,r=(n=e.answerContent,K()(n)&&n.component?Object($.a)(e.answerContent):e.answerContent);if(e.disabled)return s()(X.a,{className:"multiple-choice-answer",variant:t,disabled:!0},void 0,r);if(Object(ne.isPrimitive)(e.correct)){var a=s()(_.a,{id:e.no},void 0,s()("strong",{},void 0,e.solution?"Correct answer":"Incorrect answer",e.answerExplanation?": ":""),e.answerExplanation);return s()(Z.a,{trigger:["click","hover"],placement:"right",overlay:a},void 0,s()(X.a,{className:"multiple-choice-answer",onClick:e.onAnswerSelected,variant:t},void 0,r))}return s()(X.a,{className:"multiple-choice-answer",onClick:e.onAnswerSelected,active:e.active},void 0,r)};re.defaultProps={correct:null};var se=re;var ae=function(e){var t;Object(ne.isPrimitive)(e.correct)&&(t="info");var n,r=(n=e.answerContent,K()(n)&&n.component?Object($.a)(e.answerContent):e.answerContent);return e.disabled?s()(X.a,{className:"multiple-choice-answer",variant:t,disabled:!0},void 0,r):s()(X.a,{className:"multiple-choice-answer",variant:t,onClick:e.onAnswerSelected,active:e.active},void 0,r)};ae.defaultProps={correct:null};var ie=ae,oe=n(392),ce=s()("br",{}),ue=function(e){var t=e.content;return Object(oe.isPrimitive)(t)&&(t=s()("label",{},void 0,t)),s()("span",{className:"question"},void 0,t,ce,s()("i",{style:{fontSize:"0.8rem"}},void 0,e.task,":"))},le=n(615),pe=n(5166);function de(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function ve(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?de(Object(n),!0).forEach((function(t){w()(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):de(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function be(e){var t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}();return function(){var n,r=m()(e);if(t){var s=m()(this).constructor;n=Reflect.construct(r,arguments,s)}else n=r.apply(this,arguments);return b()(this,n)}}le.a.addResources("de","multiple-choice-question",pe.DE),le.a.addResources("en","multiple-choice-question",pe.EN),le.a.addResources("es","multiple-choice-question",pe.ES);var he=x()("isle:multiple-choice-question"),me=Object(I.a)("multiple-choice-question"),fe=function(e){d()(n,e);var t=be(n);function n(e,r){var a;i()(this,n),a=t.call(this,e),w()(l()(a),"logHint",(function(e){he("Logging hint..."),a.context.log({id:a.id,type:W.Bb,value:e})})),w()(l()(a),"sendSubmitNotification",(function(){var e,t,n=a.context,r=a.props.solution,s=!D()(r);if(s&&E()(r)){e=!0;for(var i=0;i<r.length;i++)if(!a.state.correct[r[i]]){e=!1;break}}else{e=!1;for(var o=0;o<a.state.correct.length;o++)if(!0===a.state.correct[o]){e=!0;break}}var c="success";"incremental"===a.props.provideFeedback&&s?e?t=a.props.t("answer-correct"):(t=a.props.t("answer-incorrect-incremental"),c="error"):"full"===a.props.provideFeedback&&s?e?t=a.props.t("answer-correct"):(t=a.props.t("answer-incorrect-full"),function(e){for(var t=0;t<e.length;t++)if(e[t].explanation)return!0;return!1}(a.props.answers)&&(t+=a.props.t("answer-incorrect-explanations")),c="error"):t=a.props.t("answer-submitted-nofeedback"),n.addNotification({title:a.props.t("answer-submitted"),message:t,level:c})})),w()(l()(a),"submitQuestion",(function(){var e=a.props.solution,t=D()(e),n=a.context,r="incremental"!==a.props.provideFeedback||t?new Array(a.props.answers.length):a.state.correct.slice();if(n.log({id:a.id,type:W.Cb,value:a.state.active}),E()(e)){for(var s=0;s<a.state.active.length;s++)!0===a.state.active[s]&&(q()(e,s)?r[s]=!0:r[s]=!1);var i=new Array(a.props.answers.length);a.setState({correct:r,submitted:!0,active:i},(function(){a.props.disableSubmitNotification||a.sendSubmitNotification()}))}else{for(var o=0;o<r.length;o++)a.state.active===o&&(r[o]=!(o!==e&&!t));a.setState({correct:r,submitted:!0,active:null},(function(){a.props.disableSubmitNotification||a.sendSubmitNotification()}))}a.props.onSubmit(a.state.active)})),w()(l()(a),"checkDisabledStatus",(function(){var e=E()(a.props.solution)&&E()(a.state.active);if(a.props.disabled)return!0;if(!e&&!Object(P.isPrimitive)(a.state.active))return!0;if(D()(a.props.solution))return!1;switch(a.props.provideFeedback){case"full":return e?a.state.submitted:a.state.submitted||!a.state.answerSelected;case"incremental":if(D()(a.state.active))return!0;if(!a.state.submitted)return!1;for(var t=a.props.solution.length,n=0;n<a.state.correct.length;n++)!0===a.state.correct[n]&&(t-=1);return 0===t}return!1})),w()(l()(a),"triggerFocusEvent",(function(){var e=a.context;e.log({type:B.h,value:e.user.email,id:a.id,noSave:!0},"owners")})),w()(l()(a),"renderAnswerOptionsMultiple",(function(e,t){if("none"===a.props.provideFeedback||D()(a.props.solution))return s()(ie,{answerContent:e.content,active:a.state.active[t],correct:a.state.correct[t],disabled:a.props.disabled,onAnswerSelected:function(){a.triggerFocusEvent();var e=a.state.active.slice();e[t]=!e[t],a.setState({active:e}),a.props.onChange(e)}},e.content);var n=q()(a.props.solution,t),r={key:e.content,no:t,answerContent:e.content,answerExplanation:e.explanation,active:a.state.active[t],correct:a.state.correct[t],disabled:a.props.disabled,submitted:a.state.submitted,solution:n,onAnswerSelected:function(){if(a.triggerFocusEvent(),!a.state.submitted||"incremental"===a.props.provideFeedback){var e=a.state.active.slice();e[t]=!e[t],a.setState({active:e}),a.props.onChange(e)}}};return"full"===a.props.provideFeedback?k.a.createElement(te,r):k.a.createElement(se,r)})),w()(l()(a),"renderAnswerOptionsSingle",(function(e,t){if("none"===a.props.provideFeedback||D()(a.props.solution))return s()(ie,{answerContent:e.content,active:a.state.active===t,correct:a.state.correct[t],disabled:a.props.disabled,onAnswerSelected:function(){a.triggerFocusEvent(),a.setState({active:t,answerSelected:!0}),a.props.onChange(t)}},t);var n=a.props.solution===t,r={key:t,no:t,answerContent:e.content,answerExplanation:e.explanation,active:a.state.active===t,correct:a.state.correct[t],provideFeedback:a.props.provideFeedback,disabled:a.props.disabled,submitted:a.state.submitted,solution:n,onAnswerSelected:function(){a.triggerFocusEvent(),a.state.submitted&&"incremental"!==a.props.provideFeedback||(a.setState({active:t,answerSelected:!0}),a.props.onChange(t))}};return"full"===a.props.provideFeedback?k.a.createElement(te,r):k.a.createElement(se,r)})),a.id=e.id||me(e);var o=r.currentUserActions,c=Object(Y.a)(o,a.id,W.Cb);return a.state={correct:new Array(e.answers.length),answerSelected:!1,question:e.question},e.displaySolution?(a.state.submitted=!0,a.state.active=a.props.solution):E()(c)||Object(P.isPrimitive)(c)?(a.state.active=c,a.state.submitted=!0):(a.state.active=E()(a.props.solution)?new Array(e.answers.length):null,a.state.submitted=!1),a}return c()(n,[{key:"componentDidMount",value:function(){var e=this;this.props.displaySolution&&this.submitQuestion();var t=this.context;t&&(this.unsubscribe=t.subscribe((function(t,n){if(t===B.z){var r=n[e.id];if(E()(r)&&(r=r.filter((function(e){return e.type===W.Cb}))).length>0){var s=r[0].value;e.setState({active:s,submitted:"none"===e.props.provideFeedback})}}})))}},{key:"componentDidUpdate",value:function(e){if(e.solution!==this.props.solution){var t=E()(this.props.solution)?new Array(this.props.answers.length):null;this.setState({active:t})}}},{key:"componentWillUnmount",value:function(){this.unsubscribe&&this.unsubscribe()}},{key:"selectAnswer",value:function(e){he("Parse input: ".concat(e)),e=U(e)-1,he("Select answer at position ".concat(e)),this.setState({active:e,answerSelected:!0})}},{key:"render",value:function(){var e,t=this.props,n=t.answers,r=t.hints,a=t.chat,i=t.hintPlacement,o=t.question,c=E()(this.props.solution)&&E()(this.state.active),u=r.length,l={};if(this.props.feedback?(l.width="calc(100%-60px)",l.display="inline-block"):l.width="100%",this.state.submitted)switch(this.props.provideFeedback){case"none":e=this.props.t("resubmit");break;case"full":default:e=this.props.t("submitted");break;case"incremental":e=this.props.t("submit")}else e=this.props.t("submit");return s()(C.a,{id:this.id,className:"multiple-choice-question-container",style:ve({},this.props.style)},void 0,s()(C.a.Body,{style:l},void 0,s()(ue,{content:o,task:c?this.props.t("chose-all-apply"):this.props.t("select-answer")}),s()(O.a,{},void 0,c?n.map(this.renderAnswerOptionsMultiple):n.map(this.renderAnswerOptionsSingle)),s()("div",{className:"multiple-choice-question-toolbar"},void 0,s()(S.a,{className:"submit-button",size:"small",onClick:this.submitQuestion,disabled:this.checkDisabledStatus(),block:!0},void 0,e),u>0?s()(Q.a,{size:"small",onClick:this.logHint,hints:r,placement:i}):null,a&&this.id?s()("div",{style:{display:"inline-block"}},void 0,s()(z.a,{size:"small",for:this.id})):null,s()(H.a,{reference:this,id:this.props.voiceID,commands:V})),this.id?s()("div",{style:{marginTop:"6px"}},void 0,s()(R.a,{buttonLabel:this.props.t("answers"),id:this.id,data:{type:"factor",levels:this.props.answers.map((function(e){return e.content})),question:this.props.question,solution:this.props.solution},info:W.Cb}),this.props.feedback?s()(M.a,{id:this.id+"_feedback"}):null):null))}}],[{key:"getDerivedStateFromProps",value:function(e,t){return e.question!==t.question?{submitted:!1,question:e.question}:null}}]),n}(g.Component);fe.defaultProps={question:"",solution:null,hints:[],hintPlacement:"bottom",feedback:!0,disabled:!1,displaySolution:!1,chat:!1,provideFeedback:"incremental",disableSubmitNotification:!1,voiceID:null,style:{},onChange:function(){},onSubmit:function(){}},fe.contextType=L.a;t.default=Object(y.a)("multiple-choice-question")(fe)},5165:function(e){e.exports=JSON.parse('[{"command":"selectAnswer","trigger":["choose","pick","take"],"description":"Select an answer","params":["no"],"regexp":["/(?:choose|pick|take) (?:the )?(?<no>[\\\\s\\\\S]*) answer/i","/(?:choose|pick|take) (?:[\\\\s\\\\S]*?)?answer (?:number )?(?<no>[\\\\s\\\\S]*)/i"]},{"command":"submitQuestion","trigger":["submit"],"description":"Submit answer"}]')},5166:function(e){e.exports=JSON.parse('{"DE":{"answers":"Antworten","answer-correct":"Hurra, Deine Antwort ist richtig!","answer-incorrect-explanations":"Du kannst mit der Maus \xfcber die verschiedenen Antwortm\xf6glichkeiten fahren, um einen Tooltip mit einer Erkl\xe4rung, warum die jeweilige Antwort falsch ist, anzuzeigen.","answer-incorrect-full":"Leider ist Deine Antwort falsch. Die richtige Antwort wird in orange angezeigt.","answer-incorrect-incremental":"Leider ist Deine Antwort falsch. Du k\xf6nntest es erneut versuchen, indem Du eine andere Antwortm\xf6glichkeit w\xe4hlst.","answer-submitted":"Antwort eingereicht.","chose-all-apply":"W\xe4hle alle zutreffenden Antworten","resubmit":"Erneut einreichen","select-answer":"W\xe4hle eine Antwort","submit":"Abschicken","submitted":"Eingereicht"},"EN":{"answers":"Answers","answer-correct":"Hooray, your answer is correct!","answer-incorrect-explanations":"You may hover over the different answer choices to bring up a tooltip with an explanation why the respective answer is wrong","answer-incorrect-full":"Unfortunately, your answer is incorrect. The correct answer is displayed in orange.","answer-incorrect-incremental":"Unfortunately, your answer is incorrect. You may try again by selecting another answer choice.","answer-submitted":"Answer submitted.","answer-submitted-nofeedback":"You have successfully submitted your answer. You may change your answer and re-submit if you want to.","chose-all-apply":"Choose all that apply","resubmit":"Resubmit","select-answer":"Select an answer","submit":"Submit","submitted":"Submitted"},"ES":{"answers":"Respuestas","answer-correct":"\xa1Hurra, su respuesta es correcta!","answer-incorrect-explanations":"Puede pasar el cursor sobre las diferentes opciones de respuesta para obtener una herramienta con una explicaci\xf3n de por qu\xe9 la respectiva respuesta es incorrecta","answer-incorrect-full":"Desafortunadamente, su respuesta es incorrecta. La respuesta correcta aparece en naranja.","answer-incorrect-incremental":"Desafortunadamente, su respuesta es incorrecta. Puedes intentarlo de nuevo seleccionando otra opci\xf3n de respuesta.","answer-submitted":"Respuesta presentada.","answer-submitted-nofeedback":"Has enviado tu respuesta con \xe9xito. Puede cambiar su respuesta y volver a enviarla si lo desea.","chose-all-apply":"Elija todos los que apliquen","resubmit":"Volver a presentar","select-answer":"Selecciona una respuesta","submit":"Presentar","submitted":"Presentado"}}')},789:function(e,t,n){"use strict";var r=n(349),s=Object(r.a)((function(){return n.e(137).then(n.bind(null,1273))}));t.a=s},994:function(e,t,n){"use strict";var r=n(349),s=Object(r.a)((function(){return n.e(159).then(n.bind(null,1484))}));t.a=s}}]);