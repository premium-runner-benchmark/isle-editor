(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{253:function(e,a,t){"use strict";t.r(a);var r=t(0),n=t.n(r),l=t(260),m=t(272),o=t(257);var c=function(e){var a=e.nextItem,t=e.prevItem;return n.a.createElement("nav",{className:"pagination-nav"},n.a.createElement("div",{className:"pagination-nav__item"},t&&n.a.createElement(o.a,{className:"pagination-nav__link",to:t.permalink},n.a.createElement("h5",{className:"pagination-nav__link--sublabel"},"Previous Post"),n.a.createElement("h4",{className:"pagination-nav__link--label"},"\xab ",t.title))),n.a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},a&&n.a.createElement(o.a,{className:"pagination-nav__link",to:a.permalink},n.a.createElement("h5",{className:"pagination-nav__link--sublabel"},"Next Post"),n.a.createElement("h4",{className:"pagination-nav__link--label"},a.title," \xbb"))))};a.default=function(e){var a=e.content,t=a.frontMatter,r=a.metadata;return n.a.createElement(l.a,{title:r.title,description:r.description},a&&n.a.createElement("div",{className:"container margin-vert--xl"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col col--8 col--offset-2"},n.a.createElement(m.a,{frontMatter:t,metadata:r,isBlogPostPage:!0},n.a.createElement(a,null)),(r.nextItem||r.prevItem)&&n.a.createElement("div",{className:"margin-vert--xl"},n.a.createElement(c,{nextItem:r.nextItem,prevItem:r.prevItem}))))))}},261:function(e,a,t){"use strict";var r=t(1),n=t(10),l=t(0),m=t.n(l),o=t(256),c=t.n(o),i=t(257),s=t(255),u=t(258),v=t(137),E=t.n(v);function _(e){var a=e.to,t=e.href,l=e.label,o=Object(n.a)(e,["to","href","label"]),c=Object(u.a)(a);return m.a.createElement(i.a,Object(r.a)({className:"footer__link-item"},t?{target:"_blank",rel:"noopener noreferrer",href:t}:{to:c},o),l)}var g=function(e){var a=e.url,t=e.alt;return m.a.createElement("img",{className:"footer__logo",alt:t,src:a})};a.a=function(){var e=Object(s.a)().siteConfig,a=(void 0===e?{}:e).themeConfig,t=(void 0===a?{}:a).footer,r=t||{},n=r.copyright,l=r.links,o=void 0===l?[]:l,i=r.logo,v=void 0===i?{}:i,f=Object(u.a)(v.src);return t?m.a.createElement("footer",{className:c()("footer",{"footer--dark":"dark"===t.style})},m.a.createElement("div",{className:"container"},o&&o.length>0&&m.a.createElement("div",{className:"row footer__links"},o.map((function(e,a){return m.a.createElement("div",{key:a,className:"col footer__col"},null!=e.title?m.a.createElement("h4",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?m.a.createElement("ul",{className:"footer__items"},e.items.map((function(e,a){return e.html?m.a.createElement("li",{key:a,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):m.a.createElement("li",{key:e.href||e.to,className:"footer__item"},m.a.createElement(_,e))}))):null)}))),(v||n)&&m.a.createElement("div",{className:"text--center"},v&&v.src&&m.a.createElement("div",{className:"margin-bottom--sm"},v.href?m.a.createElement("a",{href:v.href,target:"_blank",rel:"noopener noreferrer",className:E.a.footerLogoLink},m.a.createElement(g,{alt:v.alt,url:f})):m.a.createElement(g,{alt:v.alt,url:f})),m.a.createElement("div",{dangerouslySetInnerHTML:{__html:n}})))):null}},272:function(e,a,t){"use strict";t(77),t(79);var r=t(0),n=t.n(r),l=t(256),m=t.n(l),o=t(254),c=t(257),i=t(275),s=t(138),u=t.n(s),v=["January","February","March","April","May","June","July","August","September","October","November","December"];a.a=function(e){var a,t,r,l,s,E=e.children,_=e.frontMatter,g=e.metadata,f=e.truncated,d=e.isBlogPostPage,N=void 0!==d&&d,h=g.date,p=g.permalink,b=g.tags,k=_.author,y=_.title,I=_.author_url||_.authorURL,x=_.author_title||_.authorTitle,w=_.author_image_url||_.authorImageURL;return n.a.createElement("article",{className:N?void 0:"margin-bottom--xl"},(a=N?"h1":"h2",t=h.substring(0,10).split("-"),r=t[0],l=v[parseInt(t[1],10)-1],s=parseInt(t[2],10),n.a.createElement("header",null,n.a.createElement(a,{className:m()("margin-bottom--sm",u.a.blogPostTitle)},N?y:n.a.createElement(c.a,{to:p},y)),n.a.createElement("div",{className:"margin-bottom--sm"},n.a.createElement("time",{dateTime:h,className:u.a.blogPostDate},l," ",s,", ",r)),n.a.createElement("div",{className:"avatar margin-bottom--md"},w&&n.a.createElement("a",{className:"avatar__photo-link",href:I,target:"_blank",rel:"noreferrer noopener"},n.a.createElement("img",{className:"avatar__photo",src:w,alt:k})),n.a.createElement("div",{className:"avatar__intro"},k&&n.a.createElement(n.a.Fragment,null,n.a.createElement("h4",{className:"avatar__name"},n.a.createElement("a",{href:I,target:"_blank",rel:"noreferrer noopener"},k)),n.a.createElement("small",{className:"avatar__subtitle"},x)))))),n.a.createElement("section",{className:"markdown"},n.a.createElement(o.a,{components:i.a},E)),(b.length>0||f)&&n.a.createElement("footer",{className:"row margin-vert--lg"},b.length>0&&n.a.createElement("div",{className:"col"},n.a.createElement("strong",null,"Tags:"),b.map((function(e){var a=e.label,t=e.permalink;return n.a.createElement(c.a,{key:t,className:"margin-horiz--sm",to:t},a)}))),f&&n.a.createElement("div",{className:"col text--right"},n.a.createElement(c.a,{to:g.permalink,"aria-label":"Read more about "+y},n.a.createElement("strong",null,"Read More")))))}}}]);