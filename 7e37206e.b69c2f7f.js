(window.webpackJsonp=window.webpackJsonp||[]).push([[59],{203:function(e,t,a){"use strict";a.r(t);var r=a(0),l=a.n(r),n=a(260),o=a(255),c=a(258);t.default=function(){var e=Object(o.a)().siteConfig,t=void 0===e?{}:e;return l.a.createElement(n.a,{title:"Hello from "+t.title,description:"Description will go into a meta tag in <head />"},l.a.createElement("div",{className:"container"},l.a.createElement("div",{className:"row"},l.a.createElement("div",{className:"col col--6 col--offset-3 padding-vert--lg"},l.a.createElement("h1",null,"Need Help?"),l.a.createElement("p",null,"This project is maintained by a dedicated group of people."),l.a.createElement("h2",null,"Browse Docs"),l.a.createElement("p",null,"Learn more using the ",l.a.createElement("a",{href:Object(c.a)("docs/overview/intro")},"documentation on this site")," or by following the ",l.a.createElement("a",{href:Object(c.a)("docs/video-tutorials")},"tutorials"),"."),l.a.createElement("h2",null,"Join the community"),l.a.createElement("p",null,"Ask questions about the documentation and project in the ",l.a.createElement("a",{href:"https://discourse.isledocs.com"},"discussion forum"),"."),l.a.createElement("h2",null,"Stay up to date"),l.a.createElement("p",null,"Find out what's new with this project by browsing the ",l.a.createElement("a",{href:"https://github.com/isle-project/isle-editor/releases"},"releases")," of the ISLE editor")))))}},261:function(e,t,a){"use strict";var r=a(1),l=a(10),n=a(0),o=a.n(n),c=a(256),i=a.n(c),s=a(257),m=a(255),u=a(258),f=a(137),d=a.n(f);function h(e){var t=e.to,a=e.href,n=e.label,c=Object(l.a)(e,["to","href","label"]),i=Object(u.a)(t);return o.a.createElement(s.a,Object(r.a)({className:"footer__link-item"},a?{target:"_blank",rel:"noopener noreferrer",href:a}:{to:i},c),n)}var E=function(e){var t=e.url,a=e.alt;return o.a.createElement("img",{className:"footer__logo",alt:a,src:t})};t.a=function(){var e=Object(m.a)().siteConfig,t=(void 0===e?{}:e).themeConfig,a=(void 0===t?{}:t).footer,r=a||{},l=r.copyright,n=r.links,c=void 0===n?[]:n,s=r.logo,f=void 0===s?{}:s,p=Object(u.a)(f.src);return a?o.a.createElement("footer",{className:i()("footer",{"footer--dark":"dark"===a.style})},o.a.createElement("div",{className:"container"},c&&c.length>0&&o.a.createElement("div",{className:"row footer__links"},c.map((function(e,t){return o.a.createElement("div",{key:t,className:"col footer__col"},null!=e.title?o.a.createElement("h4",{className:"footer__title"},e.title):null,null!=e.items&&Array.isArray(e.items)&&e.items.length>0?o.a.createElement("ul",{className:"footer__items"},e.items.map((function(e,t){return e.html?o.a.createElement("li",{key:t,className:"footer__item",dangerouslySetInnerHTML:{__html:e.html}}):o.a.createElement("li",{key:e.href||e.to,className:"footer__item"},o.a.createElement(h,e))}))):null)}))),(f||l)&&o.a.createElement("div",{className:"text--center"},f&&f.src&&o.a.createElement("div",{className:"margin-bottom--sm"},f.href?o.a.createElement("a",{href:f.href,target:"_blank",rel:"noopener noreferrer",className:d.a.footerLogoLink},o.a.createElement(E,{alt:f.alt,url:p})):o.a.createElement(E,{alt:f.alt,url:p})),o.a.createElement("div",{dangerouslySetInnerHTML:{__html:l}})))):null}}}]);