(window.webpackJsonp=window.webpackJsonp||[]).push([[78],{252:function(e,a,t){"use strict";t.r(a);t(77);var r=t(0),n=t.n(r),l=t(255),m=t(260),o=t(272),c=t(257);var i=function(e){var a=e.metadata,t=a.previousPage,r=a.nextPage;return n.a.createElement("nav",{className:"pagination-nav"},n.a.createElement("div",{className:"pagination-nav__item"},t&&n.a.createElement(c.a,{className:"pagination-nav__link",to:t},n.a.createElement("h4",{className:"pagination-nav__link--label"},"\xab Newer Entries"))),n.a.createElement("div",{className:"pagination-nav__item pagination-nav__item--next"},r&&n.a.createElement(c.a,{className:"pagination-nav__link",to:r},n.a.createElement("h4",{className:"pagination-nav__link--label"},"Older Entries \xbb"))))};a.default=function(e){var a=e.metadata,t=e.items,r=Object(l.a)().siteConfig.title,c="/"===a.permalink?r:"Blog";return n.a.createElement(m.a,{title:c,description:"Blog"},n.a.createElement("div",{className:"container margin-vert--xl"},n.a.createElement("div",{className:"row"},n.a.createElement("div",{className:"col col--8 col--offset-2"},t.map((function(e){var a=e.content;return n.a.createElement(o.a,{key:a.metadata.permalink,frontMatter:a.frontMatter,metadata:a.metadata,truncated:a.metadata.truncated},n.a.createElement(a,null))})),n.a.createElement(i,{metadata:a})))))}},261:function(e,a,t){"use strict";var r=t(1),n=t(10),l=t(0),m=t.n(l),o=t(256),c=t.n(o),i=t(257),s=t(255),u=t(258),E=t(137),g=t.n(E);function v(e){var a=e.to,t=e.href,l=e.label,o=Object(n.a)(e,["to","href","label"]),c=Object(u.a)(a);return m.a.createElement(i.a,Object(r.a)({className:"footer__link-item"},t?{target:"_blank",rel:"noopener noreferrer",href:t}:{to:c},o),l)}var _=function(e){var a=e.url,t=e.alt;return m.a.createElement("img",{className:"footer__logo",alt:t,src:a})};a.a=function(){var e=Object(s.a)().siteConfig,a=(void 0===e?{}:e).themeConfig,t=(void 0===a?{}:a).footer,r=t||{},n=r.copyright,l=r.links,o=void 0===l?[]:l,i=r.logo,E=void 0===i?{}:i,d=Object(u.a)(E.src);return t?m.a.createElement("footer",{className:c()("footer",{"footer--dark":"dark"===t.style})},m.a.createElement("div",{className:"container"},o&&o.length>0&&m.a.createElement("div",{className:"row footer__links"},o.map((function(e,a){return m.a.createElement("div",{key:a,className:"col footer__col"},null!=e.title?m.a.createElement("h4",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?m.a.createElement("ul",{className:"footer__items"},e.items.map((function(e,a){return e.html?m.a.createElement("li",{key:a,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):m.a.createElement("li",{key:e.href||e.to,className:"footer__item"},m.a.createElement(v,e))}))):null)}))),(E||n)&&m.a.createElement("div",{className:"text--center"},E&&E.src&&m.a.createElement("div",{className:"margin-bottom--sm"},E.href?m.a.createElement("a",{href:E.href,target:"_blank",rel:"noopener noreferrer",className:g.a.footerLogoLink},m.a.createElement(_,{alt:E.alt,url:d})):m.a.createElement(_,{alt:E.alt,url:d})),m.a.createElement("div",{dangerouslySetInnerHTML:{__html:n}})))):null}},272:function(e,a,t){"use strict";t(77),t(79);var r=t(0),n=t.n(r),l=t(256),m=t.n(l),o=t(254),c=t(257),i=t(275),s=t(138),u=t.n(s),E=["January","February","March","April","May","June","July","August","September","October","November","December"];a.a=function(e){var a,t,r,l,s,g=e.children,v=e.frontMatter,_=e.metadata,d=e.truncated,f=e.isBlogPostPage,h=void 0!==f&&f,N=_.date,p=_.permalink,b=_.tags,k=v.author,y=v.title,w=v.author_url||v.authorURL,M=v.author_title||v.authorTitle,O=v.author_image_url||v.authorImageURL;return n.a.createElement("article",{className:h?void 0:"margin-bottom--xl"},(a=h?"h1":"h2",t=N.substring(0,10).split("-"),r=t[0],l=E[parseInt(t[1],10)-1],s=parseInt(t[2],10),n.a.createElement("header",null,n.a.createElement(a,{className:m()("margin-bottom--sm",u.a.blogPostTitle)},h?y:n.a.createElement(c.a,{to:p},y)),n.a.createElement("div",{className:"margin-bottom--sm"},n.a.createElement("time",{dateTime:N,className:u.a.blogPostDate},l," ",s,", ",r)),n.a.createElement("div",{className:"avatar margin-bottom--md"},O&&n.a.createElement("a",{className:"avatar__photo-link",href:w,target:"_blank",rel:"noreferrer noopener"},n.a.createElement("img",{className:"avatar__photo",src:O,alt:k})),n.a.createElement("div",{className:"avatar__intro"},k&&n.a.createElement(n.a.Fragment,null,n.a.createElement("h4",{className:"avatar__name"},n.a.createElement("a",{href:w,target:"_blank",rel:"noreferrer noopener"},k)),n.a.createElement("small",{className:"avatar__subtitle"},M)))))),n.a.createElement("section",{className:"markdown"},n.a.createElement(o.a,{components:i.a},g)),(b.length>0||d)&&n.a.createElement("footer",{className:"row margin-vert--lg"},b.length>0&&n.a.createElement("div",{className:"col"},n.a.createElement("strong",null,"Tags:"),b.map((function(e){var a=e.label,t=e.permalink;return n.a.createElement(c.a,{key:t,className:"margin-horiz--sm",to:t},a)}))),d&&n.a.createElement("div",{className:"col text--right"},n.a.createElement(c.a,{to:_.permalink,"aria-label":"Read more about "+y},n.a.createElement("strong",null,"Read More")))))}}}]);