!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.pcs=t():e.pcs=t()}(this,(function(){return function(e){var t={};function n(i){if(t[i])return t[i].exports;var r=t[i]={i:i,l:!1,exports:{}};return e[i].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(n.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(i,r,function(t){return e[t]}.bind(null,r));return i},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=41)}([function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var i={LABEL:"aria-label",LABELED_BY:"aria-labelledby"},r=function(e){switch(e){case"'":return"&#039;";case'"':return"&quot;";case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}};t.b={escape:function(e){return e&&e.replace(/['"<>&]/g,r)}}},function(e,t,n){"use strict";n.r(t);var i="undefined"!=typeof window&&window.CustomEvent||function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{bubbles:!1,cancelable:!1,detail:void 0},n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n};t.default={matchesSelector:function(e,t){return e.matches?e.matches(t):e.matchesSelector?e.matchesSelector(t):!!e.webkitMatchesSelector&&e.webkitMatchesSelector(t)},querySelectorAll:function(e,t){return Array.prototype.slice.call(e.querySelectorAll(t))},CustomEvent:i}},function(e,t){e.exports=function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}},function(e,t){function n(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}e.exports=function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}},function(e,t,n){"use strict";n.r(t);var i=n(1),r=function(e,t){var n;for(n=e.parentElement;n&&!i.default.matchesSelector(n,t);n=n.parentElement);return n};t.default={findClosestAncestor:r,isNestedInTable:function(e){return Boolean(r(e,"table"))},closestInlineStyle:function(e,t,n){for(var i=e;i;i=i.parentElement){var r=void 0;try{r=i.style[t]}catch(e){continue}if(r){if(void 0===n)return i;if(n===r)return i}}},isVisible:function(e){return Boolean(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},copyAttributesToDataAttributes:function(e,t,n){n.filter((function(t){return e.hasAttribute(t)})).forEach((function(n){return t.setAttribute("data-".concat(n),e.getAttribute(n))}))},copyDataAttributesToAttributes:function(e,t,n){n.filter((function(t){return e.hasAttribute("data-".concat(t))})).forEach((function(n){return t.setAttribute(n,e.getAttribute("data-".concat(n)))}))}}},function(e,t,n){"use strict";n(30);var i=n(20).default,r=n(4).default,a=n(1).default,o={PLACEHOLDER_CLASS:"pcs-lazy-load-placeholder",PLACEHOLDER_PENDING_CLASS:"pcs-lazy-load-placeholder-pending",PLACEHOLDER_LOADING_CLASS:"pcs-lazy-load-placeholder-loading",PLACEHOLDER_ERROR_CLASS:"pcs-lazy-load-placeholder-error",IMAGE_LOADING_CLASS:"pcs-lazy-load-image-loading",IMAGE_LOADED_CLASS:"pcs-lazy-load-image-loaded"},c=["class","style","src","srcset","width","height","alt","usemap","data-file-width","data-file-height","data-image-gallery"],s={px:50,ex:10,em:5},l=function(e,t){var n=e.createElement("span");t.hasAttribute("class")&&n.setAttribute("class",t.getAttribute("class")||""),n.classList.add("pcs-lazy-load-placeholder"),n.classList.add("pcs-lazy-load-placeholder-pending");var a=i.from(t);a.width&&n.style.setProperty("width","".concat(a.width)),r.copyAttributesToDataAttributes(t,n,c);var o=e.createElement("span");if(a.width&&a.height){var s=a.heightValue/a.widthValue;o.style.setProperty("padding-top","".concat(100*s,"%"))}return n.appendChild(o),t.parentNode&&t.parentNode.replaceChild(n,t),n},u=function(e){var t=i.from(e);if(!t.width||!t.height)return!0;var n=s[t.widthUnit]||1/0,r=s[t.heightUnit]||1/0;return t.widthValue>=n&&t.heightValue>=r};t.a={CLASSES:o,PLACEHOLDER_CLASS:"pcs-lazy-load-placeholder",isLazyLoadable:u,queryLazyLoadableImages:function(e){return a.querySelectorAll(e,"img").filter((function(e){return u(e)}))},convertImagesToPlaceholders:function(e,t){return t.map((function(t){return l(e,t)}))},convertImageToPlaceholder:l,loadPlaceholder:function(e,t){t.classList.add("pcs-lazy-load-placeholder-loading"),t.classList.remove("pcs-lazy-load-placeholder-pending");var n=e.createElement("img"),i=function(e){n.setAttribute("src",n.getAttribute("src")||""),e.stopPropagation(),e.preventDefault()};return n.addEventListener("load",(function(){t.removeEventListener("click",i),t.parentNode&&t.parentNode.replaceChild(n,t),n.classList.add("pcs-lazy-load-image-loaded"),n.classList.remove("pcs-lazy-load-image-loading")}),{once:!0}),n.addEventListener("error",(function(){t.classList.add("pcs-lazy-load-placeholder-error"),t.classList.remove("pcs-lazy-load-placeholder-loading"),t.addEventListener("click",i)}),{once:!0}),r.copyDataAttributesToAttributes(t,n,c),n.classList.add("pcs-lazy-load-image-loading"),n}}},function(e,t,n){"use strict";var i=n(0),r=n(1).default,a=function(e){return!!e&&!("SECTION"!==e.tagName||!e.getAttribute("data-mw-section-id"))},o={BASE:"pcs-section-control",SHOW:"pcs-section-control-show",HIDE:"pcs-section-control-hide"},c={HIDE:"pcs-section-hidden"},s={HIDEABLE:"pcs-section-hideable-header"},l={CONTENT:"pcs-section-content-",CONTROL:"pcs-section-control-"},u="pcs-section-aria-collapse",d="pcs-section-aria-expand",f=function(e){return l.CONTROL+e},p=function(e){return l.CONTENT+e},h=function(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=f(t),a=p(t),s=e.getElementById(r),l=e.getElementById(a);if(s&&l){n?(s.classList.remove(o.HIDE),s.classList.add(o.SHOW),l.classList.add(c.HIDE),s.setAttribute(i.a.LABELED_BY,d)):(s.classList.remove(o.SHOW),s.classList.add(o.HIDE),l.classList.remove(c.HIDE),s.setAttribute(i.a.LABELED_BY,u));var h=s.parentElement;h&&h.setAttribute("onclick","pcs.c1.Sections.setHidden('".concat(t,"', ").concat(!n,");"))}};t.a={createFoldHR:function(e,t){if(t.parentElement){var n=e.createElement("hr");n.classList.add("pcs-fold-hr"),t.parentElement.insertBefore(n,t)}},expandCollapsedSectionIfItContainsElement:function(e,t){var n=function(e){for(var t=e;t=t.parentElement;)if("SECTION"===t.tagName&&t.parentElement&&"pcs"===t.parentElement.id){var n=t.getAttribute("data-mw-section-id");if(n)return n}}(t);n&&h(e,n,!1)},getSectionIDOfElement:function(e){var t=function(e){for(var t=e;t;){if(a(t))return t;t=t.parentElement}return null}(e);return t&&t.getAttribute("data-mw-section-id")},getLeadParagraphText:function(e){var t=e.querySelector("#content-block-0>p");return t&&t.innerText||""},getSectionOffsets:function(e){return{sections:r.querySelectorAll(e,"section").reduce((function(e,t){var n=t.getAttribute("data-mw-section-id"),i=t&&t.firstElementChild&&t.firstElementChild.querySelector(".pcs-edit-section-title");return n&&parseInt(n)>=1&&e.push({heading:i&&i.innerHTML,id:parseInt(n),yOffset:t.offsetTop}),e}),[])}},prepareForHiding:function(e,t,n,r,a,l){var h=function(e,t){var n=e.createElement("span");return n.id=f(t),n.classList.add(o.BASE),n.classList.add(o.SHOW),n}(e,t);if(null===e.getElementById(d)){var m=e.createElement("span");m.setAttribute("id",d),m.setAttribute(i.a.LABEL,a),h.appendChild(m)}if(null===e.getElementById(u)){var E=e.createElement("span");E.setAttribute("id",u),E.setAttribute(i.a.LABEL,l),h.appendChild(E)}h.setAttribute("role","button"),h.setAttribute(i.a.LABELED_BY,d),r&&h&&(r.appendChild(h),r.classList.add(s.HIDEABLE),r.setAttribute("onclick","pcs.c1.Sections.setHidden('".concat(t,"', false);")));for(var v=n.firstElementChild,g=e.createElement("div");v;){var T=v;v=v.nextElementSibling,T!==r&&(n.removeChild(T),g.appendChild(T))}g.id=p(t),g.classList.add(c.HIDE),n.appendChild(g)},setHidden:h,getControlIdForSectionId:f,isMediaWikiSectionElement:a}},function(e,t,n){"use strict";var i={ELEMENT_NODE:1,TEXT_NODE:3};t.a={isNodeTypeElementOrText:function(e){return e.nodeType===i.ELEMENT_NODE||e.nodeType===i.TEXT_NODE},getBoundingClientRectAsPlainObject:function(e){var t=e.getBoundingClientRect();return{top:t.top,right:t.right,bottom:t.bottom,left:t.left,width:t.width,height:t.height,x:t.x,y:t.y}},NODE_TYPE:i}},function(e,t,n){"use strict";n(28);var i=n(4),r=n(7),a=n(1),o=n(6),c=n(0),s=r.a.NODE_TYPE,l={ICON:"pcs-collapse-table-icon",CONTAINER:"pcs-collapse-table-container",CONTENT:"pcs-collapse-table-content",COLLAPSED_CONTAINER:"pcs-collapse-table-collapsed-container",COLLAPSED:"pcs-collapse-table-collapsed",COLLAPSED_BOTTOM:"pcs-collapse-table-collapsed-bottom",COLLAPSE_TEXT:"pcs-collapse-table-collapse-text",EXPANDED:"pcs-collapse-table-expanded",TABLE_INFOBOX:"pcs-table-infobox",TABLE_OTHER:"pcs-table-other",TABLE:"pcs-collapse-table"},u="pcs-collapse-table-aria-collapse",d="pcs-collapse-table-aria-expand",f=function(e){return a.default.querySelectorAll(e,"a").length<3},p=function(e){return e&&e.replace(/[\s0-9]/g,"").length>0},h=function(e){var t=e.match(/\w+/);if(t)return t[0]},m=function(e,t){var n=h(t),i=h(e.textContent);return!(!n||!i)&&n.toLowerCase()===i.toLowerCase()},E=function(e){return e.trim().replace(/\s/g," ")},v=function(e,t){t.parentNode.replaceChild(e.createTextNode(" "),t)},g=function(e,t,n){if(!f(t))return null;var i=e.createDocumentFragment();i.appendChild(t.cloneNode(!0));var o=i.querySelector("th");a.default.querySelectorAll(o,".geo, .coordinates, sup.mw-ref, ol, ul, style, script").forEach((function(e){return e.remove()}));for(var c,l=o.lastChild;l;)n&&r.a.isNodeTypeElementOrText(l)&&m(l,n)?l.previousSibling?(l=l.previousSibling).nextSibling.remove():(l.remove(),l=void 0):(c=l).nodeType===s.ELEMENT_NODE&&"BR"===c.tagName?(v(e,l),l=l.previousSibling):l=l.previousSibling;var u=o.textContent;return p(u)?E(u):null},T=function(e,t,n){for(var i=[],r=e.createTreeWalker(t),a=r.nextNode();a;)if("TH"===a.tagName){var o=g(e,a,n);if(o&&-1===i.indexOf(o)&&(i.push(o),2===i.length))break;a=r.nextNode()}else a=r.nextNode();return i},L=function(e,t,n){var i=e.children[0],r=e.children[1],a=e.children[2],o=i.querySelector(".pcs-collapse-table-aria"),s="none"!==r.style.display;return s?(r.style.display="none",i.classList.remove(l.COLLAPSED),i.classList.remove(l.ICON),i.classList.add(l.EXPANDED),o&&o.setAttribute(c.a.LABELED_BY,d),a.style.display="none",t===a&&n&&n(e)):(r.style.display="block",i.classList.remove(l.EXPANDED),i.classList.add(l.COLLAPSED),i.classList.add(l.ICON),o&&o.setAttribute(c.a.LABELED_BY,u),a.style.display="block"),s},A=function(e){var t=this.parentNode;return L(t,this,e)},b=function(e){var t,n=["navbox","vertical-navbox","navbox-inner","metadata","mbox-small"].some((function(t){return e.classList.contains(t)}));try{t="none"===e.style.display}catch(e){t=!0}return!t&&!n},y=function(e){return e.classList.contains("infobox")||e.classList.contains("infobox_v3")},C=function(e,t){var n=e.createElement("div");return n.classList.add(l.COLLAPSED_CONTAINER),n.classList.add(l.EXPANDED),n.appendChild(t),n},I=function(e,t){var n=e.createElement("div");return n.classList.add(l.COLLAPSED_BOTTOM),n.classList.add(l.ICON),n.textContent=t||"",n},N=function(e,t,n,i,r,a){var o=e.createDocumentFragment(),s=e.createElement("strong");s.textContent=t,s.classList.add(n),o.appendChild(s);var f=e.createElement("span");f.classList.add(l.COLLAPSE_TEXT),i.length>0&&f.appendChild(e.createTextNode(": ".concat(i[0]))),i.length>1&&f.appendChild(e.createTextNode(", ".concat(i[1]))),i.length>0&&f.appendChild(e.createTextNode(" ...")),o.appendChild(f);var p=e.createElement("span");if(p.classList.add("pcs-collapse-table-aria"),p.setAttribute(c.a.LABELED_BY,d),p.setAttribute("role","button"),p.setAttribute("display","none"),p.appendChild(e.createTextNode("")),null===e.getElementById(d)){var h=e.createElement("span");h.setAttribute("id",d),h.setAttribute(c.a.LABEL,a),p.appendChild(h)}if(null===e.getElementById(u)){var m=e.createElement("span");m.setAttribute("id",u),m.setAttribute(c.a.LABEL,r),p.appendChild(m)}return o.appendChild(p),o},_=function(e,t,n,i,r,a,c,s,u){var d=N(t,i,r,a,s,u),f=t.createElement("div");f.className=l.CONTAINER,function(e,t){if(e&&t){var n=e,i=e.parentNode;if(i){for(var r=!1;i;){if(o.a.isMediaWikiSectionElement(i)){r=!0;break}n=i,i=i.parentNode}r||(n=e,i=e.parentNode),i.insertBefore(t,n),i.removeChild(n)}}}(e,f),e.classList.add(l.TABLE);var p=C(t,d);p.style.display="block";var h=I(t,c);h.style.display="none",f.appendChild(p);var m=t.createElement("div");m.className=l.CONTENT,m.appendChild(e),f.appendChild(m),f.appendChild(h),m.style.display="none"},O=function(e,t,n,r,a){for(var o=e.querySelectorAll("table, .infobox_v3"),c=0;c<o.length;++c){var s=o[c];if(!i.default.findClosestAncestor(s,".".concat(l.CONTAINER))&&b(s)){var u=y(s),d=T(e,s,t);if(d.length||u)_(s,e,0,u?n:r,u?l.TABLE_INFOBOX:l.TABLE_OTHER,d,a)}}},S=function(e){a.default.querySelectorAll(e,".".concat(l.CONTAINER)).forEach((function(e){L(e)}))},D=function(e,t,n,i){var r=function(t){return e.dispatchEvent(new a.default.CustomEvent("section-toggled",{collapsed:t}))};a.default.querySelectorAll(t,".".concat(l.COLLAPSED_CONTAINER)).forEach((function(e){e.onclick=function(){var t=A.bind(e)();r(t)}})),a.default.querySelectorAll(t,".".concat(l.COLLAPSED_BOTTOM)).forEach((function(e){e.onclick=function(){var t=A.bind(e,i)();r(t)}})),n||S(t)},R=function(e,t,n,i,r,a,o,c,s){i||(O(t,n,a,o,c),D(e,t,r,s))};t.a={CLASS:l,SECTION_TOGGLED_EVENT_TYPE:"section-toggled",toggleCollapsedForAll:S,toggleCollapseClickCallback:A,collapseTables:function(e,t,n,i,r,a,o,c){R(e,t,n,i,!0,r,a,o,c)},getTableHeaderTextArray:T,adjustTables:R,prepareTables:O,prepareTable:_,setupEventHandling:D,expandCollapsedTableIfItContainsElement:function(e){if(e){var t='[class*="'.concat(l.CONTAINER,'"]'),n=i.default.findClosestAncestor(e,t);if(n){var r=n.firstElementChild;r&&r.classList.contains(l.EXPANDED)&&r.click()}}},test:{extractEligibleHeaderText:g,firstWordFromString:h,shouldTableBeCollapsed:b,isHeaderEligible:f,isHeaderTextEligible:p,isInfobox:y,newCollapsedHeaderDiv:C,newCollapsedFooterDiv:I,newCaptionFragment:N,isNodeTextContentSimilarToPageTitle:m,stringWithNormalizedWhitespace:E,replaceNodeWithBreakingSpaceTextNode:v,getTableHeaderTextArray:T}}},function(e,t,n){"use strict";var i=n(2),r=n.n(i),a=n(3),o=n.n(a),c=(n(26),n(11)),s=n(0),l={lastEdited:"lastEdited",pageIssues:"pageIssues",disambiguation:"disambiguation",coordinate:"coordinate",talkPage:"talkPage"},u=function(){function e(t,n,i,a){r()(this,e),this.title=t,this.subtitle=n,this.itemType=i,this.clickHandler=a,this.payload=[]}return o()(e,[{key:"iconClass",value:function(){switch(this.itemType){case l.lastEdited:return"pcs-footer-menu-icon-last-edited";case l.talkPage:return"pcs-footer-menu-icon-talk-page";case l.pageIssues:return"pcs-footer-menu-icon-page-issues";case l.disambiguation:return"pcs-footer-menu-icon-disambiguation";case l.coordinate:return"pcs-footer-menu-icon-coordinate";default:return""}}},{key:"payloadExtractor",value:function(){switch(this.itemType){case l.pageIssues:return c.a.collectPageIssues;case l.disambiguation:return c.a.collectHatnotes;default:return}}}]),e}();t.a={MenuItemType:l,setHeading:function(e,t,n){var i=n.getElementById(t);i.textContent=e,i.title=s.b.escape(e)},maybeAddItem:function(e,t,n,i,r,a){if(""!==e){var o=new u(e,t,n,r),c=o.payloadExtractor();c&&(o.payload=c(a),0===o.payload.length)||function(e,t,n){n.getElementById(t).appendChild(function(e,t){var n=t.createElement("div");n.className="pcs-footer-menu-item",n.role="menuitem";var i=t.createElement("a");if(i.addEventListener("click",(function(){e.clickHandler(e.payload)})),n.appendChild(i),e.title){var r=t.createElement("div");r.className="pcs-footer-menu-item-title",r.textContent=e.title,i.title=e.title,i.appendChild(r)}if(e.subtitle){var a=t.createElement("div");a.className="pcs-footer-menu-item-subtitle",a.textContent=e.subtitle,i.appendChild(a)}var o=e.iconClass();return o&&n.classList.add(o),t.createDocumentFragment().appendChild(n)}(e,n))}(o,i,a)}}}},function(e,t,n){"use strict";n(29);var i=n(0),r={SECTION_HEADER:"pcs-edit-section-header",TITLE:"pcs-edit-section-title",LINK_CONTAINER:"pcs-edit-section-link-container",LINK:"pcs-edit-section-link",PROTECTION:{UNPROTECTED:"",PROTECTED:"page-protected",FORBIDDEN:"no-editing"}},a={TITLE_DESCRIPTION:"pcs-edit-section-title-description",ADD_TITLE_DESCRIPTION:"pcs-edit-section-add-title-description",DIVIDER:"pcs-edit-section-divider",PRONUNCIATION:"pcs-edit-section-title-pronunciation",ARIA_EDIT_PROTECTED:"pcs-edit-section-aria-protected",ARIA_EDIT_NORMAL:"pcs-edit-section-aria-normal"},o={SECTION_INDEX:"data-id",ACTION:"data-action",PRONUNCIATION_URL:"data-pronunciation-url",DESCRIPTION_SOURCE:"data-description-source",WIKIDATA_ENTITY_ID:"data-wikdata-entity-id"},c=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",c=e.createElement("a");return c.href=n,c.setAttribute(o.SECTION_INDEX,t),c.setAttribute(o.ACTION,"edit_section"),c.setAttribute(i.a.LABELED_BY,a.ARIA_EDIT_NORMAL),c.classList.add(r.LINK),c},s=function(e,t){var n=e.createElement("div");return n.className=r.SECTION_HEADER,n},l=function(e,t){t.classList.add(r.TITLE),e.appendChild(t)};t.a={appendEditSectionHeader:l,CLASS:r,IDS:a,DATA_ATTRIBUTE:o,setEditButtons:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=e.documentElement.classList;t?i.remove(r.PROTECTION.FORBIDDEN):i.add(r.PROTECTION.FORBIDDEN),n?i.add(r.PROTECTION.PROTECTED):i.remove(r.PROTECTION.PROTECTED)},setARIAEditButtons:function(e){e.documentElement.classList.contains(r.PROTECTION.PROTECTED)&&Array.from(e.getElementsByClassName(r.LINK)).forEach((function(e){return e.setAttribute(i.a.LABELED_BY,a.ARIA_EDIT_PROTECTED)}))},newEditSectionButton:function(e,t,n,o,s){var l=e.createElement("span");if(l.classList.add(r.LINK_CONTAINER),null===e.getElementById(a.ARIA_EDIT_NORMAL)&&o){var u=e.createElement("span");u.setAttribute("id",a.ARIA_EDIT_NORMAL),u.setAttribute(i.a.LABEL,o),l.appendChild(u)}if(null===e.getElementById(a.ARIA_EDIT_PROTECTED)&&s){var d=e.createElement("span");d.setAttribute("id",a.ARIA_EDIT_PROTECTED),d.setAttribute(i.a.LABEL,s),l.appendChild(d)}var f=n;return f||(f=c(e,t)),l.appendChild(f),l},newEditSectionWrapper:s,newEditSectionLink:c,newPageHeader:function(e,t,n,i,r,c,u,d){var f=e.createDocumentFragment(),p=function(e,t,n,i){var r=s(e),a=e.createElement("h".concat(n));return a.innerHTML=i||"",a.setAttribute(o.SECTION_INDEX,t),l(r,a),r}(e,0,1,t);if(d){var h=e.createElement("a");h.setAttribute(o.ACTION,"title_pronunciation"),h.setAttribute(o.PRONUNCIATION_URL,d),h.id=a.PRONUNCIATION,p.querySelector("h1").appendChild(h)}f.appendChild(p);var m=function(e,t,n,i,r,c){if(void 0!==t&&t.length>0){var s=e.createElement("p");return s.setAttribute(o.DESCRIPTION_SOURCE,n),s.setAttribute(o.WIKIDATA_ENTITY_ID,i),s.id=a.TITLE_DESCRIPTION,s.innerHTML=t,s}if(c){var l=e.createElement("a");l.href="#",l.setAttribute(o.ACTION,"add_title_description");var u=e.createElement("p");return u.id=a.ADD_TITLE_DESCRIPTION,u.innerHTML=r,l.appendChild(u),l}return null}(e,n,i,r,c,u);m&&f.appendChild(m);var E=e.createElement("hr");return E.id=a.DIVIDER,f.appendChild(E),f}}},function(e,t,n){"use strict";var i=n(1),r=function(e){return e?i.default.querySelectorAll(e,".mbox-text-span").map((function(e){return i.default.querySelectorAll(e,".hide-when-compact, .collapsed").forEach((function(e){return e.remove()})),e})):[]},a=function(e){var t=e.closest("section[data-mw-section-id]"),n=t&&t.querySelector("h1,h2,h3,h4,h5,h6");return{id:t&&parseInt(t.getAttribute("data-mw-section-id"),10),title:n&&n.innerHTML.trim(),anchor:n&&n.getAttribute("id")}};t.a={collectHatnotes:function(e){return e?i.default.querySelectorAll(e,"div.hatnote").map((function(e){var t=i.default.querySelectorAll(e,'div.hatnote a[href]:not([href=""]):not([redlink="1"])').map((function(e){return e.href}));return{html:e.innerHTML.trim(),links:t,section:a(e)}})):[]},collectPageIssues:function(e){return r(e).map((function(e){return{html:e.innerHTML.trim(),section:a(e)}}))},test:{collectPageIssueElements:r}}},function(e,t,n){"use strict";var i={ANDROID:"".concat("pcs-platform-","android"),IOS:"".concat("pcs-platform-","ios")};t.a={CLASS:i,CLASS_PREFIX:"pcs-platform-",classify:function(e){var t=e.document.documentElement;(function(e){return/android/i.test(e.navigator.userAgent)})(e)&&t.classList.add(i.ANDROID),function(e){return/ipad|iphone|ipod/i.test(e.navigator.userAgent)}(e)&&t.classList.add(i.IOS)},setPlatform:function(e,t){e&&e.documentElement&&e.documentElement.classList.add(t)},setVersion:function(e,t){if(e&&e.documentElement)for(var n=t||1,i=1;i<=2&&(e.documentElement.classList.add("pcs-v"+i),i!==n);i++);}}},function(e,t,n){"use strict";n(32);var i={DEFAULT:"".concat("pcs-theme-","default"),DARK:"".concat("pcs-theme-","dark"),SEPIA:"".concat("pcs-theme-","sepia"),BLACK:"".concat("pcs-theme-","black")},r=function(e,t){if(e)for(var n in e.classList.add(t),i)Object.prototype.hasOwnProperty.call(i,n)&&i[n]!==t&&e.classList.remove(i[n])};t.a={THEME:i,CLASS_PREFIX:"pcs-theme-",setTheme:function(e,t){var n=e.body;r(n,t);var i=e.getElementById("pcs");r(i,t)}}},function(e,t,n){"use strict";var i=n(2),r=n.n(i),a=n(4),o=n(7),c=n(1),s=function(e,t,n){var i=decodeURIComponent(e),r=decodeURIComponent(t);if(void 0!==n){var a=decodeURIComponent(n),o="./".concat(a);return 0===i.indexOf(o)&&e.indexOf(r)===o.length}return i.indexOf(r)>-1},l=function(e,t){return s(e,"#cite_note-",t)},u=function(e){return Boolean(e)&&e.nodeType===Node.TEXT_NODE&&Boolean(e.textContent.match(/^\s+$/))},d=function(e){var t=e.querySelector("a");return t&&l(t.hash)},f=function(e,t){var n=t.querySelector("A").getAttribute("href").split("#")[1];return e.getElementById(n)||e.getElementById(decodeURIComponent(n))},p=function(e,t){var n=f(e,t);if(!n)return"";var i=n.querySelector("span.mw-reference-text");return i?i.innerHTML.trim():""},h=function(e){return c.default.matchesSelector(e,".reference, .mw-ref")?e:a.default.findClosestAncestor(e,".reference, .mw-ref")},m=function e(t,n,i,a,o){r()(this,e),this.id=t,this.rect=n,this.text=i,this.html=a,this.href=o},E=function e(t,n){r()(this,e),this.href=t,this.text=n},v=function e(t,n){r()(this,e),this.selectedIndex=t,this.referencesGroup=n},g=function(e,t){var n=e;do{n=t(n)}while(u(n));return n},T=function(e,t,n){for(var i=e;(i=g(i,t))&&i.nodeType===Node.ELEMENT_NODE&&d(i);)n(i)},L=function(e){return e.previousSibling},A=function(e){return e.nextSibling},b=function(e){var t=[e];return T(e,L,(function(e){return t.unshift(e)})),T(e,A,(function(e){return t.push(e)})),t},y=function(e,t){var n=b(t),i=n.indexOf(t),r=n.map((function(t){return function(e,t){return new m(h(t).id,o.a.getBoundingClientRectAsPlainObject(t),t.textContent,p(e,t),t.querySelector("A").getAttribute("href"))}(e,t)}));return new v(i,r)};t.a={collectNearbyReferences:function(e,t){var n=t.parentElement;return y(e,n)},collectNearbyReferencesAsText:function(e,t){var n=t.parentElement,i=b(n),r=i.indexOf(n),a=i.map((function(e){return function(e,t){return new E(t.querySelector("A").getAttribute("href"),t.textContent)}(0,e)}));return new v(r,a)},collectReferencesForBackLink:function(e,t,n){var i=function(e){var t=e.getAttribute("pcs-back-links");return t?JSON.parse(t):[]}(t);if(!i||0===i.length)return{};for(var r,a=n.split("#pcs-ref-back-link-")[1],o=[],c=i[0],s=0;s<i.length;s++){var l=i[s].split("#")[1],u=e.getElementById(l);u&&(r||(r=u.textContent.trim()),o.push({id:l}))}return{referenceId:a,referenceText:r,backLinks:o,href:c}},isBackLink:function(e,t){return s(e,"#pcs-ref-back-link-",t)},isCitation:l,CLASS:{BACK_LINK_ANCHOR:"pcs-ref-back-link",BACK_LINK_CONTAINER:"pcs-ref-backlink-container",BODY:"pcs-ref-body",BODY_HEADER:"pcs-ref-body-header",BODY_CONTENT:"pcs-ref-body-content",REF:"pcs-ref"},BACK_LINK_FRAGMENT_PREFIX:"#pcs-ref-back-link-",BACK_LINK_ATTRIBUTE:"pcs-back-links",test:{adjacentNonWhitespaceNode:g,closestReferenceClassElement:h,collectAdjacentReferenceNodes:T,collectNearbyReferenceNodes:b,collectRefText:p,getRefTextContainer:f,hasCitationLink:d,isWhitespaceTextNode:u,nextSiblingGetter:A,prevSiblingGetter:L}}},function(e,t,n){"use strict";n.d(t,"a",(function(){return c}));var i=n(2),r=n.n(i),a=n(3),o=n.n(a),c=function(){function e(t,n,i){r()(this,e),this._window=t,this._period=n,this._function=i,this._context=void 0,this._arguments=void 0,this._result=void 0,this._timeout=0,this._timestamp=0}return o()(e,null,[{key:"wrap",value:function(t,n,i){var r=new e(t,n,i),a=function(){return r.queue(this,arguments)};return a.result=function(){return r.result},a.pending=function(){return r.pending()},a.delay=function(){return r.delay()},a.cancel=function(){return r.cancel()},a.reset=function(){return r.reset()},a}}]),o()(e,[{key:"queue",value:function(e,t){var n=this;return this._context=e,this._arguments=t,this.pending()||(this._timeout=this._window.setTimeout((function(){n._timeout=0,n._timestamp=Date.now(),n._result=n._function.apply(n._context,n._arguments)}),this.delay())),this.result}},{key:"pending",value:function(){return Boolean(this._timeout)}},{key:"delay",value:function(){return this._timestamp?Math.max(0,this._period-(Date.now()-this._timestamp)):0}},{key:"cancel",value:function(){this._timeout&&this._window.clearTimeout(this._timeout),this._timeout=0}},{key:"reset",value:function(){this.cancel(),this._result=void 0,this._timestamp=0}},{key:"result",get:function(){return this._result}}]),e}()},function(e,t,n){"use strict";n(24);t.a={containerFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("section");n.id="pcs-footer-container-menu",n.className="pcs-footer-section",n.innerHTML="<h2 id='pcs-footer-container-menu-heading'></h2>\n   <div id='pcs-footer-container-menu-items'></div>",t.appendChild(n);var i=e.createElement("section");i.id="pcs-footer-container-readmore",i.className="pcs-footer-section",i.style.display="none",i.innerHTML="<h2 id='pcs-footer-container-readmore-heading'></h2>\n   <div id='pcs-footer-container-readmore-pages'></div>",t.appendChild(i);var r=e.createElement("section");return r.id="pcs-footer-container-legal",t.appendChild(r),t},isContainerAttached:function(e){return Boolean(e.querySelector("#pcs-footer-container"))}}},function(e,t,n){"use strict";t.a={setPercentage:function(e,t){if(t){var n=(100*(Number(t.slice(0,-1))/100*.95)).toString()+"%";e.style["font-size"]=n}}}},function(e,t,n){"use strict";t.a={setMargins:function(e,t){void 0!==t.top&&(e.style.marginTop=t.top),void 0!==t.right&&(e.style.marginRight=t.right),void 0!==t.bottom&&(e.style.marginBottom=t.bottom),void 0!==t.left&&(e.style.marginLeft=t.left)},setPadding:function(e,t){void 0!==t.top&&(e.style.paddingTop=t.top),void 0!==t.right&&(e.style.paddingRight=t.right),void 0!==t.bottom&&(e.style.paddingBottom=t.bottom),void 0!==t.left&&(e.style.paddingLeft=t.left)}}},function(e,t,n){"use strict";n(31);var i="pcs-dim-images",r=function(e,t){e.body.classList[t?"add":"remove"](i)},a=function(e){return e.body.classList.contains(i)};t.a={CLASS:i,dim:function(e,t){return r(e.document,t)},isDim:function(e){return a(e.document)},dimImages:r,areImagesDimmed:a}},function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return l}));var i=n(2),r=n.n(i),a=n(3),o=n.n(a),c=/(-?\d*\.?\d*)(\D+)?/,s=function(){function e(t,n){r()(this,e),this._value=Number(t),this._unit=n||"px"}return o()(e,null,[{key:"fromElement",value:function(t,n){return t.style.getPropertyValue(n)&&e.fromStyle(t.style.getPropertyValue(n))||t.hasAttribute(n)&&new e(t.getAttribute(n))||void 0}},{key:"fromStyle",value:function(t){var n=t.match(c)||[];return new e(n[1],n[2])}}]),o()(e,[{key:"toString",value:function(){return isNaN(this.value)?"":"".concat(this.value).concat(this.unit)}},{key:"value",get:function(){return this._value}},{key:"unit",get:function(){return this._unit}}]),e}(),l=function(){function e(t,n){r()(this,e),this._width=t,this._height=n}return o()(e,null,[{key:"from",value:function(t){return new e(s.fromElement(t,"width"),s.fromElement(t,"height"))}}]),o()(e,[{key:"width",get:function(){return this._width}},{key:"widthValue",get:function(){return this._width&&!isNaN(this._width.value)?this._width.value:NaN}},{key:"widthUnit",get:function(){return this._width&&this._width.unit||"px"}},{key:"height",get:function(){return this._height}},{key:"heightValue",get:function(){return this._height&&!isNaN(this._height.value)?this._height.value:NaN}},{key:"heightUnit",get:function(){return this._height&&this._height.unit||"px"}}]),e}()},function(e,t,n){"use strict";n(25);var i=n(0);t.a={add:function(e,t,n,r,a,o){var c=e.querySelector("#".concat(r));c.innerHTML="<div class='pcs-footer-legal-contents'>\n    <hr class='pcs-footer-legal-divider'>\n    <span class='pcs-footer-legal-license'>\n    ".concat(function(e,t){var n=e.split("$1");return"".concat(i.b.escape(n[0]),'<a class="external text" rel="mw:ExtLink" href="https://creativecommons.org/licenses/by-sa/3.0/">').concat(i.b.escape(t),"</a>").concat(i.b.escape(n[1]))}(t,n),"\n    <br>\n      <div class=\"pcs-footer-browser\">\n        <a class='pcs-footer-browser-link' href='N/A'>\n          ").concat(i.b.escape(a),"\n        </a>\n      </div>\n    </span>\n  </div>"),c.querySelector(".pcs-footer-browser-link").addEventListener("click",(function(){o()}))}}},function(e,t,n){"use strict";var i=n(2),r=n.n(i),a=(n(27),n(0)),o=function(e,t,n){var i=new RegExp("\\s?[".concat(t,"][^").concat(t).concat(n,"]+[").concat(n,"]"),"g"),r=0,a=e,o="";do{o=a,a=a.replace(i,""),r++}while(o!==a&&r<30);return a},c=function(e){var t=e;return t=o(t,"(",")"),t=o(t,"/","/")},s=function e(t,n,i,a,o){r()(this,e),this.title=t,this.displayTitle=n,this.thumbnail=i,this.description=a,this.extract=o},l=/^[a-z]+:/,u=function(e,t,n,i,r,a){var o=[],u=a.getElementById(n),f=a.getElementById(i);d(t,"pcs-footer-container-readmore-heading",a),e.forEach((function(e,t){var n=e.titles.normalized;o.push(n);var i=function(e,t,n){var i=n.createElement("a");i.id=t,i.className="pcs-footer-readmore-page";var r=!n.pcsSetupSettings||n.pcsSetupSettings.loadImages;if(e.thumbnail&&e.thumbnail.source&&r){var a=n.createElement("div");a.style.backgroundImage="url(".concat(e.thumbnail.source.replace(l,""),")"),a.classList.add("pcs-footer-readmore-page-image"),i.appendChild(a)}var o,s,u=n.createElement("div");if(u.classList.add("pcs-footer-readmore-page-container"),i.appendChild(u),i.setAttribute("title",e.title),i.setAttribute("data-pcs-source","read-more"),i.href="./".concat(encodeURI(e.title)),e.displayTitle?o=e.displayTitle:e.title&&(o=e.title),o){var d=n.createElement("div");d.id=t,d.className="pcs-footer-readmore-page-title",d.innerHTML=o.replace(/_/g," "),i.title=e.title.replace(/_/g," "),u.appendChild(d)}if(e.description&&(s=e.description),(!s||s.length<10)&&e.extract&&(s=c(e.extract)),s){var f=n.createElement("div");f.id=t,f.className="pcs-footer-readmore-page-description",f.innerHTML=s,u.appendChild(f)}return n.createDocumentFragment().appendChild(i)}(new s(n,e.titles.display,e.thumbnail,e.description,e.extract),t,a);f.appendChild(i)})),r(o),u.style.display="block"},d=function(e,t,n){var i=n.getElementById(t);i.textContent=e,i.title=a.b.escape(e)};t.a={fetchAndAdd:function(e,t,n,i,r,a,o,c){var s=new XMLHttpRequest;s.open("GET",function(e,t,n){return"".concat(n||"","/page/related/").concat(e)}(e,0,a),!0),s.onload=function(){var e;try{e=JSON.parse(s.responseText).pages}catch(e){}if(e&&e.length){var a;if(e.length>n){var l=Math.floor(Math.random()*Math.floor(e.length-n));a=e.slice(l,l+n)}else a=e;u(a,t,i,r,o,c)}},s.send()},setHeading:d,test:{cleanExtract:c,safelyRemoveEnclosures:o}}},function(e,t,n){"use strict";n.d(t,"a",(function(){return p}));var i=n(2),r=n.n(i),a=n(3),o=n.n(a),c=n(8),s=n(4),l=n(5),u=n(1),d=n(15),f=["scroll","resize",c.a.SECTION_TOGGLED_EVENT_TYPE],p=function(){function e(t,n){var i=this;r()(this,e),this._window=t,this._loadDistanceMultiplier=n,this._placeholders=[],this._registered=!1,this._throttledLoadPlaceholders=d.a.wrap(t,100,(function(){return i._loadPlaceholders()}))}return o()(e,[{key:"convertImagesToPlaceholders",value:function(e){var t=l.a.queryLazyLoadableImages(e),n=l.a.convertImagesToPlaceholders(this._window.document,t);this._placeholders=this._placeholders.concat(n),this._register()}},{key:"collectExistingPlaceholders",value:function(e){var t=u.default.querySelectorAll(e,".".concat(l.a.PLACEHOLDER_CLASS));this._placeholders=this._placeholders.concat(t),this._register()}},{key:"loadPlaceholders",value:function(){this._throttledLoadPlaceholders()}},{key:"deregister",value:function(){var e=this;this._registered&&(f.forEach((function(t){return e._window.removeEventListener(t,e._throttledLoadPlaceholders)})),this._throttledLoadPlaceholders.reset(),this._placeholders=[],this._registered=!1)}},{key:"_register",value:function(){var e=this;!this._registered&&this._placeholders.length&&(this._registered=!0,f.forEach((function(t){return e._window.addEventListener(t,e._throttledLoadPlaceholders)})))}},{key:"_loadPlaceholders",value:function(){var e=this;this._placeholders=this._placeholders.filter((function(t){var n=!0;return e._isPlaceholderEligibleToLoad(t)&&(l.a.loadPlaceholder(e._window.document,t),n=!1),n})),0===this._placeholders.length&&this.deregister()}},{key:"_isPlaceholderEligibleToLoad",value:function(e){return s.default.isVisible(e)&&this._isPlaceholderWithinLoadDistance(e)}},{key:"_isPlaceholderWithinLoadDistance",value:function(e){var t=e.getBoundingClientRect(),n=this._window.innerHeight*this._loadDistanceMultiplier;return!(t.top>n||t.bottom<-n)}}]),e}()},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,,function(e,t,n){"use strict";n.r(t);var i=n(13),r=n(17),a=n(18),o=n(8),c=n(11),s={FILTER:"pcs-compatibility-filter"},l={COMPATIBILITY:s,enableSupport:function(e){var t=e.documentElement;(function(e){return function(e,t,n){var i=e.createElement("span");return t.some((function(e){return i.style[e]=n,i.style.cssText}))}(e,["webkitFilter","filter"],"blur(0)")})(e)||t.classList.add(s.FILTER)}},u=n(19),d=n(10),f=n(20),p=n(4),h=function(e){var t=e.querySelector('[id="coordinates"]'),n=t?t.textContent.length:0;return e.textContent.length-n>=50},m=function(e){var t=[],n=e;do{t.push(n),n=n.nextSibling}while(n&&(1!==n.nodeType||"P"!==n.tagName));return t},E=function(e,t){if(t)for(var n=t.firstElementChild;n;){if("P"===n.tagName&&h(n))return n;n=n.nextElementSibling}},v={moveLeadIntroductionUp:function(e,t,n){var i=E(0,t);if(i){var r=e.createDocumentFragment();m(i).forEach((function(e){return r.appendChild(e)}));var a=n?n.nextSibling:t.firstChild;t.insertBefore(r,a)}},test:{isParagraphEligible:h,extractLeadIntroductionNodes:m,getEligibleParagraph:E}},g=n(16),T=n(21),L=n(9),A=n(22),b=n(5),y=n(23),C=n(12),I=n(1),N=function(e,t){e.innerHTML=t.innerHTML,e.setAttribute("class",t.getAttribute("class"))},_=function(e){return I.default.querySelectorAll(e,"a.new")},O=function(e){return e.createElement("span")},S=function(e,t){return e.parentNode.replaceChild(t,e)},D={hideRedLinks:function(e){var t=O(e);_(e).forEach((function(e){var n=t.cloneNode(!1);N(n,e),S(e,n)}))},test:{configureRedLinkTemplate:N,redLinkAnchorsInDocument:_,newRedLinkTemplate:O,replaceAnchorWithSpan:S}},R=n(14),x=n(15),w=n(6),P=n(0),k=(n(34),function(e){for(var t=[],n=e;n.parentElement&&"SECTION"!==(n=n.parentElement).tagName;)t.push(n);return t}),B=function(e){k(e).forEach((function(e){return e.classList.add("pcs-widen-image-ancestor")}))},H={widenImage:function(e){B(e),e.classList.add("pcs-widen-image-override")},test:{ancestorsToWiden:k,widenAncestors:B}};n(35),n(36),n(37),t.default={AdjustTextSize:r.a,BodySpacingTransform:a.a,CollapseTable:o.a,CollectionUtilities:c.a,CompatibilityTransform:l,DimImagesTransform:u.a,EditTransform:d.a,HTMLUtilities:P.b,LeadIntroductionTransform:v,FooterContainer:g.a,FooterLegal:T.a,FooterMenu:L.a,FooterReadMore:A.a,LazyLoadTransform:b.a,LazyLoadTransformer:y.a,PlatformTransform:C.a,RedLinks:D,ReferenceCollection:R.a,SectionUtilities:w.a,ThemeTransform:i.a,WidenImage:H,test:{ElementGeometry:f.default,ElementUtilities:p.default,Polyfill:I.default,Throttle:x.a}}}]).default}));