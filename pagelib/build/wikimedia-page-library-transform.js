!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.pcs=t():e.pcs=t()}(this,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=41)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r="undefined"!=typeof window&&window.CustomEvent||function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{bubbles:!1,cancelable:!1,detail:void 0},n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n};t.default={matchesSelector:function(e,t){return e.matches?e.matches(t):e.matchesSelector?e.matchesSelector(t):!!e.webkitMatchesSelector&&e.webkitMatchesSelector(t)},querySelectorAll:function(e,t){return Array.prototype.slice.call(e.querySelectorAll(t))},CustomEvent:r}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,i=n(0),a=(r=i)&&r.__esModule?r:{default:r};var o=function(e,t){var n=void 0;for(n=e.parentElement;n&&!a.default.matchesSelector(n,t);n=n.parentElement);return n};t.default={findClosestAncestor:o,isNestedInTable:function(e){return Boolean(o(e,"table"))},closestInlineStyle:function(e,t,n){for(var r=e;r;r=r.parentElement){var i=void 0;try{i=r.style[t]}catch(e){continue}if(i){if(void 0===n)return r;if(n===i)return r}}},isVisible:function(e){return Boolean(e.offsetWidth||e.offsetHeight||e.getClientRects().length)},copyAttributesToDataAttributes:function(e,t,n){n.filter((function(t){return e.hasAttribute(t)})).forEach((function(n){return t.setAttribute("data-"+n,e.getAttribute(n))}))},copyDataAttributesToAttributes:function(e,t,n){n.filter((function(t){return e.hasAttribute("data-"+t)})).forEach((function(n){return t.setAttribute(n,e.getAttribute("data-"+n))}))}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(20);var r=l(n(1)),i=l(n(4)),a=l(n(0)),o=l(n(3));function l(e){return e&&e.__esModule?e:{default:e}}var c=i.default.NODE_TYPE,s={ICON:"pcs-collapse-table-icon",CONTAINER:"pcs-collapse-table-container",COLLAPSED_CONTAINER:"pcs-collapse-table-collapsed-container",COLLAPSED:"pcs-collapse-table-collapsed",COLLAPSED_BOTTOM:"pcs-collapse-table-collapsed-bottom",COLLAPSE_TEXT:"pcs-collapse-table-collapse-text",EXPANDED:"pcs-collapse-table-expanded",TABLE_INFOBOX:"pcs-table-infobox",TABLE_OTHER:"pcs-table-other",TABLE:"pcs-collapse-table"},u=function(e){return a.default.querySelectorAll(e,"a").length<3},d=function(e){return e&&e.replace(/[\s0-9]/g,"").length>0},f=function(e){var t=e.match(/\w+/);if(t)return t[0]},p=function(e,t){var n=f(t),r=f(e.textContent);return!(!n||!r)&&n.toLowerCase()===r.toLowerCase()},h=function(e){return e.trim().replace(/\s/g," ")},m=function(e,t){t.parentNode.replaceChild(e.createTextNode(" "),t)},v=function(e,t,n){if(!u(t))return null;var r=e.createDocumentFragment();r.appendChild(t.cloneNode(!0));var o=r.querySelector("th");a.default.querySelectorAll(o,".geo, .coordinates, sup.mw-ref, ol, ul, style, script").forEach((function(e){return e.remove()}));for(var l,s=o.lastChild;s;)n&&i.default.isNodeTypeElementOrText(s)&&p(s,n)?s.previousSibling?(s=s.previousSibling).nextSibling.remove():(s.remove(),s=void 0):(l=s).nodeType===c.ELEMENT_NODE&&"BR"===l.tagName?(m(e,s),s=s.previousSibling):s=s.previousSibling;var f=o.textContent;return d(f)?h(f):null},E=function(e,t,n){for(var r=[],i=e.createTreeWalker(t),a=i.nextNode();a;)if("TH"===a.tagName){var o=v(e,a,n);if(o&&-1===r.indexOf(o)&&(r.push(o),2===r.length))break;a=i.nextNode()}else a=i.nextNode();return r},g=function(e,t,n){var r=e.children[0],i=e.children[1],a=e.children[2],o=r.querySelector(".app-table-collapsed-caption"),l="none"!==i.style.display;return l?(i.style.display="none",r.classList.remove(s.COLLAPSED),r.classList.remove(s.ICON),r.classList.add(s.EXPANDED),o&&(o.style.visibility="visible"),a.style.display="none",t===a&&n&&n(e)):(i.style.display="block",r.classList.remove(s.EXPANDED),r.classList.add(s.COLLAPSED),r.classList.add(s.ICON),o&&(o.style.visibility="hidden"),a.style.display="block"),l},y=function(e){var t=this.parentNode;return g(t,this,e)},b=function(e){var t=["navbox","vertical-navbox","navbox-inner","metadata","mbox-small"].some((function(t){return e.classList.contains(t)})),n=void 0;try{n="none"===e.style.display}catch(e){n=!0}return!n&&!t},_=function(e){return e.classList.contains("infobox")||e.classList.contains("infobox_v3")},T=function(e,t){var n=e.createElement("div");return n.classList.add(s.COLLAPSED_CONTAINER),n.classList.add(s.EXPANDED),n.appendChild(t),n},L=function(e,t){var n=e.createElement("div");return n.classList.add(s.COLLAPSED_BOTTOM),n.classList.add(s.ICON),n.innerHTML=t||"",n},C=function(e,t,n,r){var i=e.createDocumentFragment(),a=e.createElement("strong");a.innerHTML=t,a.classList.add(n),i.appendChild(a);var o=e.createElement("span");return o.classList.add(s.COLLAPSE_TEXT),r.length>0&&o.appendChild(e.createTextNode(": "+r[0])),r.length>1&&o.appendChild(e.createTextNode(", "+r[1])),r.length>0&&o.appendChild(e.createTextNode(" …")),i.appendChild(o),i},N=function(e,t,n,r,i,a,l){var c=C(t,r,i,a),u=t.createElement("div");u.className=s.CONTAINER,function(e,t){if(e&&t){var n=e,r=e.parentNode;if(r){for(var i=!1;r;){if(o.default.isMediaWikiSectionElement(r)){i=!0;break}n=r,r=r.parentNode}i||(n=e,r=e.parentNode),r.insertBefore(t,n),r.removeChild(n)}}}(e,u),e.classList.add(s.TABLE);var d=T(t,c);d.style.display="block";var f=L(t,l);f.style.display="none",u.appendChild(d);var p=t.createElement("div");p.appendChild(e),u.appendChild(p),u.appendChild(f),p.style.display="none"},O=function(e,t,n,i,a){for(var o=e.querySelectorAll("table, .infobox_v3"),l=0;l<o.length;++l){var c=o[l];if(!r.default.findClosestAncestor(c,"."+s.CONTAINER)&&b(c)){var u=_(c),d=E(e,c,t);if(d.length||u)N(c,e,0,u?n:i,u?s.TABLE_INFOBOX:s.TABLE_OTHER,d,a)}}},A=function(e){a.default.querySelectorAll(e,"."+s.CONTAINER).forEach((function(e){g(e)}))},I=function(e,t,n,r){var i=function(t){return e.dispatchEvent(new a.default.CustomEvent("section-toggled",{collapsed:t}))};a.default.querySelectorAll(t,"."+s.COLLAPSED_CONTAINER).forEach((function(e){e.onclick=function(){var t=y.bind(e)();i(t)}})),a.default.querySelectorAll(t,"."+s.COLLAPSED_BOTTOM).forEach((function(e){e.onclick=function(){var t=y.bind(e,r)();i(t)}})),n||A(t)},S=function(e,t,n,r,i,a,o,l,c){r||(O(t,n,a,o,l),I(e,t,i,c))};t.default={CLASS:s,SECTION_TOGGLED_EVENT_TYPE:"section-toggled",toggleCollapsedForAll:A,toggleCollapseClickCallback:y,collapseTables:function(e,t,n,r,i,a,o,l){S(e,t,n,r,!0,i,a,o,l)},getTableHeaderTextArray:E,adjustTables:S,prepareTables:O,prepareTable:N,setupEventHandling:I,expandCollapsedTableIfItContainsElement:function(e){if(e){var t='[class*="'+s.CONTAINER+'"]',n=r.default.findClosestAncestor(e,t);if(n){var i=n.firstElementChild;i&&i.classList.contains(s.EXPANDED)&&i.click()}}},test:{extractEligibleHeaderText:v,firstWordFromString:f,shouldTableBeCollapsed:b,isHeaderEligible:u,isHeaderTextEligible:d,isInfobox:_,newCollapsedHeaderDiv:T,newCollapsedFooterDiv:L,newCaptionFragment:C,isNodeTextContentSimilarToPageTitle:p,stringWithNormalizedWhitespace:h,replaceNodeWithBreakingSpaceTextNode:m,getTableHeaderTextArray:E}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(0).default,i=function(e){return!!e&&!("SECTION"!==e.tagName||!e.getAttribute("data-mw-section-id"))},a={BASE:"pcs-section-control",SHOW:"pcs-section-control-show",HIDE:"pcs-section-control-hide"},o={HIDE:"pcs-section-hidden"},l={HIDEABLE:"pcs-section-hideable-header"},c={CONTENT:"pcs-section-content-",CONTROL:"pcs-section-control-"},s=function(e){return c.CONTROL+e},u=function(e){return c.CONTENT+e},d=function(e,t,n){void 0===n&&(n=!0);var r=s(t),i=u(t),l=e.getElementById(r),c=e.getElementById(i);if(l&&c){n?(l.classList.remove(a.HIDE),l.classList.add(a.SHOW),c.classList.add(o.HIDE)):(l.classList.remove(a.SHOW),l.classList.add(a.HIDE),c.classList.remove(o.HIDE));var d=l.parentElement;d&&d.setAttribute("onclick","pcs.c1.Sections.setHidden('"+t+"', "+!n+");")}};t.default={createFoldHR:function(e,t){if(t.parentElement){var n=e.createElement("hr");n.classList.add("pcs-fold-hr"),t.parentElement.insertBefore(n,t)}},expandCollapsedSectionIfItContainsElement:function(e,t){var n=function(e){for(var t=e;t=t.parentElement;)if("SECTION"===t.tagName&&t.parentElement&&"pcs"===t.parentElement.id){var n=t.getAttribute("data-mw-section-id");if(n)return n}}(t);n&&d(e,n,!1)},getSectionIDOfElement:function(e){var t=function(e){for(var t=e;t;){if(i(t))return t;t=t.parentElement}return null}(e);return t&&t.getAttribute("data-mw-section-id")},getLeadParagraphText:function(e){var t=e.querySelector("#content-block-0>p");return t&&t.innerText||""},getSectionOffsets:function(e){return{sections:r.querySelectorAll(e,"section").reduce((function(e,t){var n=t.getAttribute("data-mw-section-id"),r=t&&t.firstElementChild&&t.firstElementChild.querySelector(".pcs-edit-section-title");return n&&parseInt(n)>=1&&e.push({heading:r&&r.innerHTML,id:parseInt(n),yOffset:t.offsetTop}),e}),[])}},prepareForHiding:function(e,t,n,r){var i=function(e,t){var n=e.createElement("span");return n.id=s(t),n.classList.add(a.BASE),n.classList.add(a.SHOW),n}(e,t);r&&i&&(r.appendChild(i),r.classList.add(l.HIDEABLE),r.setAttribute("onclick","pcs.c1.Sections.setHidden('"+t+"', false);"));for(var c=n.firstElementChild,d=e.createElement("div");c;){var f=c;c=c.nextElementSibling,f!==r&&(n.removeChild(f),d.appendChild(f))}d.id=u(t),d.classList.add(o.HIDE),n.appendChild(d)},setHidden:d,getControlIdForSectionId:s,isMediaWikiSectionElement:i}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={ELEMENT_NODE:1,TEXT_NODE:3};t.default={isNodeTypeElementOrText:function(e){return e.nodeType===r.ELEMENT_NODE||e.nodeType===r.TEXT_NODE},getBoundingClientRectAsPlainObject:function(e){var t=e.getBoundingClientRect();return{top:t.top,right:t.right,bottom:t.bottom,left:t.left,width:t.width,height:t.height,x:t.x,y:t.y}},NODE_TYPE:r}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(21);var r={SECTION_HEADER:"pcs-edit-section-header",TITLE:"pcs-edit-section-title",LINK_CONTAINER:"pcs-edit-section-link-container",LINK:"pcs-edit-section-link",PROTECTION:{UNPROTECTED:"",PROTECTED:"page-protected",FORBIDDEN:"no-editing"}},i={TITLE_DESCRIPTION:"pcs-edit-section-title-description",ADD_TITLE_DESCRIPTION:"pcs-edit-section-add-title-description",DIVIDER:"pcs-edit-section-divider",PRONUNCIATION:"pcs-edit-section-title-pronunciation"},a={SECTION_INDEX:"data-id",ACTION:"data-action",PRONUNCIATION_URL:"data-pronunciation-url",DESCRIPTION_SOURCE:"data-description-source"},o=function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=e.createElement("a");return i.href=n,i.setAttribute(a.SECTION_INDEX,t),i.setAttribute(a.ACTION,"edit_section"),i.classList.add(r.LINK),i},l=function(e,t,n){var i=e.createElement("span");i.classList.add(r.LINK_CONTAINER);var a=n;return a||(a=o(e,t)),i.appendChild(a),i},c=function(e,t){var n=e.createElement("div");return n.className=r.SECTION_HEADER,n},s=function(e,t){t.classList.add(r.TITLE),e.appendChild(t)},u=function(e,t,n,r){var i=!(arguments.length>4&&void 0!==arguments[4])||arguments[4],o=c(e),u=e.createElement("h"+n);if(u.innerHTML=r||"",u.setAttribute(a.SECTION_INDEX,t),s(o,u),i){var d=l(e,t);o.appendChild(d)}return o},d=function(e,t,n,r,o){if(void 0!==t&&t.length>0){var l=e.createElement("p");return l.setAttribute(a.DESCRIPTION_SOURCE,n),l.id=i.TITLE_DESCRIPTION,l.innerHTML=t,l}if(o){var c=e.createElement("a");c.href="#",c.setAttribute(a.ACTION,"add_title_description");var s=e.createElement("p");return s.id=i.ADD_TITLE_DESCRIPTION,s.innerHTML=r,c.appendChild(s),c}return null};t.default={appendEditSectionHeader:s,CLASS:r,IDS:i,DATA_ATTRIBUTE:a,setEditButtons:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1],n=arguments.length>2&&void 0!==arguments[2]&&arguments[2],i=e.documentElement.classList;t?i.remove(r.PROTECTION.FORBIDDEN):i.add(r.PROTECTION.FORBIDDEN),n?i.add(r.PROTECTION.PROTECTED):i.remove(r.PROTECTION.PROTECTED)},newEditSectionButton:l,newEditSectionHeader:u,newEditSectionWrapper:c,newEditLeadSectionHeader:function(e,t,n,r,o,l){var c=!(arguments.length>6&&void 0!==arguments[6])||arguments[6],s=arguments[7],f=e.createDocumentFragment(),p=u(e,0,1,t,c);if(s){var h=e.createElement("a");h.setAttribute(a.ACTION,"title_pronunciation"),h.setAttribute(a.PRONUNCIATION_URL,s),h.id=i.PRONUNCIATION,p.querySelector("h1").appendChild(h)}f.appendChild(p);var m=d(e,n,r,o,l);m&&f.appendChild(m);var v=e.createElement("hr");return v.id=i.DIVIDER,f.appendChild(v),f},newEditSectionLink:o}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(22);var r=n(8).default,i=n(1).default,a=n(0).default,o={PLACEHOLDER_CLASS:"pcs-lazy-load-placeholder",PLACEHOLDER_PENDING_CLASS:"pcs-lazy-load-placeholder-pending",PLACEHOLDER_LOADING_CLASS:"pcs-lazy-load-placeholder-loading",PLACEHOLDER_ERROR_CLASS:"pcs-lazy-load-placeholder-error",IMAGE_LOADING_CLASS:"pcs-lazy-load-image-loading",IMAGE_LOADED_CLASS:"pcs-lazy-load-image-loaded"},l=["class","style","src","srcset","width","height","alt","usemap","data-file-width","data-file-height","data-image-gallery"],c={px:50,ex:10,em:5},s=function(e,t){var n=e.createElement("span");t.hasAttribute("class")&&n.setAttribute("class",t.getAttribute("class")||""),n.classList.add("pcs-lazy-load-placeholder"),n.classList.add("pcs-lazy-load-placeholder-pending");var a=r.from(t);a.width&&n.style.setProperty("width",""+a.width),i.copyAttributesToDataAttributes(t,n,l);var o=e.createElement("span");if(a.width&&a.height){var c=a.heightValue/a.widthValue;o.style.setProperty("padding-top",100*c+"%")}return n.appendChild(o),t.parentNode&&t.parentNode.replaceChild(n,t),n},u=function(e){var t=r.from(e);if(!t.width||!t.height)return!0;var n=c[t.widthUnit]||1/0,i=c[t.heightUnit]||1/0;return t.widthValue>=n&&t.heightValue>=i};t.default={CLASSES:o,PLACEHOLDER_CLASS:"pcs-lazy-load-placeholder",isLazyLoadable:u,queryLazyLoadableImages:function(e){return a.querySelectorAll(e,"img").filter((function(e){return u(e)}))},convertImagesToPlaceholders:function(e,t){return t.map((function(t){return s(e,t)}))},convertImageToPlaceholder:s,loadPlaceholder:function(e,t){t.classList.add("pcs-lazy-load-placeholder-loading"),t.classList.remove("pcs-lazy-load-placeholder-pending");var n=e.createElement("img"),r=function(e){n.setAttribute("src",n.getAttribute("src")||""),e.stopPropagation(),e.preventDefault()};return n.addEventListener("load",(function(){t.removeEventListener("click",r),t.parentNode&&t.parentNode.replaceChild(n,t),n.classList.add("pcs-lazy-load-image-loaded"),n.classList.remove("pcs-lazy-load-image-loading")}),{once:!0}),n.addEventListener("error",(function(){t.classList.add("pcs-lazy-load-placeholder-error"),t.classList.remove("pcs-lazy-load-placeholder-loading"),t.addEventListener("click",r)}),{once:!0}),i.copyDataAttributesToAttributes(t,n,l),n.classList.add("pcs-lazy-load-image-loading"),n}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,i=n(0),a=(r=i)&&r.__esModule?r:{default:r};var o=function(e){return e?a.default.querySelectorAll(e,".mbox-text-span").map((function(e){return a.default.querySelectorAll(e,".hide-when-compact, .collapsed").forEach((function(e){return e.remove()})),e})):[]},l=function(e){var t=e.closest("section[data-mw-section-id]"),n=t&&t.querySelector("h1,h2,h3,h4,h5,h6");return{id:t&&parseInt(t.getAttribute("data-mw-section-id"),10),title:n&&n.innerHTML.trim(),anchor:n&&n.getAttribute("id")}};t.default={collectHatnotes:function(e){return e?a.default.querySelectorAll(e,"div.hatnote").map((function(e){var t=a.default.querySelectorAll(e,'div.hatnote a[href]:not([href=""]):not([redlink="1"])').map((function(e){return e.href}));return{html:e.innerHTML.trim(),links:t,section:l(e)}})):[]},collectPageIssues:function(e){return o(e).map((function(e){return{html:e.innerHTML.trim(),section:l(e)}}))},test:{collectPageIssueElements:o}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();function i(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var a=/(-?\d*\.?\d*)(\D+)?/,o=function(){function e(t,n){i(this,e),this._value=Number(t),this._unit=n||"px"}return r(e,null,[{key:"fromElement",value:function(t,n){return t.style.getPropertyValue(n)&&e.fromStyle(t.style.getPropertyValue(n))||t.hasAttribute(n)&&new e(t.getAttribute(n))||void 0}},{key:"fromStyle",value:function(t){var n=t.match(a)||[];return new e(n[1],n[2])}}]),r(e,[{key:"toString",value:function(){return isNaN(this.value)?"":""+this.value+this.unit}},{key:"value",get:function(){return this._value}},{key:"unit",get:function(){return this._unit}}]),e}(),l=function(){function e(t,n){i(this,e),this._width=t,this._height=n}return r(e,null,[{key:"from",value:function(t){return new e(o.fromElement(t,"width"),o.fromElement(t,"height"))}}]),r(e,[{key:"width",get:function(){return this._width}},{key:"widthValue",get:function(){return this._width&&!isNaN(this._width.value)?this._width.value:NaN}},{key:"widthUnit",get:function(){return this._width&&this._width.unit||"px"}},{key:"height",get:function(){return this._height}},{key:"heightValue",get:function(){return this._height&&!isNaN(this._height.value)?this._height.value:NaN}},{key:"heightUnit",get:function(){return this._height&&this._height.unit||"px"}}]),e}();t.default=l},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();var i=function(){function e(t,n,r){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._window=t,this._period=n,this._function=r,this._context=void 0,this._arguments=void 0,this._result=void 0,this._timeout=0,this._timestamp=0}return r(e,null,[{key:"wrap",value:function(t,n,r){var i=new e(t,n,r),a=function(){return i.queue(this,arguments)};return a.result=function(){return i.result},a.pending=function(){return i.pending()},a.delay=function(){return i.delay()},a.cancel=function(){return i.cancel()},a.reset=function(){return i.reset()},a}}]),r(e,[{key:"queue",value:function(e,t){var n=this;return this._context=e,this._arguments=t,this.pending()||(this._timeout=this._window.setTimeout((function(){n._timeout=0,n._timestamp=Date.now(),n._result=n._function.apply(n._context,n._arguments)}),this.delay())),this.result}},{key:"pending",value:function(){return Boolean(this._timeout)}},{key:"delay",value:function(){return this._timestamp?Math.max(0,this._period-(Date.now()-this._timestamp)):0}},{key:"cancel",value:function(){this._timeout&&this._window.clearTimeout(this._timeout),this._timeout=0}},{key:"reset",value:function(){this.cancel(),this._result=void 0,this._timestamp=0}},{key:"result",get:function(){return this._result}}]),e}();t.default=i},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={ANDROID:"pcs-platform-android",IOS:"pcs-platform-ios"};t.default={CLASS:r,CLASS_PREFIX:"pcs-platform-",classify:function(e){var t=e.document.documentElement;(function(e){return/android/i.test(e.navigator.userAgent)})(e)&&t.classList.add(r.ANDROID),function(e){return/ipad|iphone|ipod/i.test(e.navigator.userAgent)}(e)&&t.classList.add(r.IOS)},setPlatform:function(e,t){e.documentElement.classList.add(t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(29);var r={DEFAULT:"pcs-theme-default",DARK:"pcs-theme-dark",SEPIA:"pcs-theme-sepia",BLACK:"pcs-theme-black"},i=function(e,t){if(e)for(var n in e.classList.add(t),r)Object.prototype.hasOwnProperty.call(r,n)&&r[n]!==t&&e.classList.remove(r[n])};t.default={THEME:r,CLASS_PREFIX:"pcs-theme-",setTheme:function(e,t){var n=e.body;i(n,t);var r=e.getElementById("pcs");i(r,t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(13);t.default={containerFragment:function(e){var t=e.createDocumentFragment(),n=e.createElement("section");n.id="pcs-footer-container-menu",n.className="pcs-footer-section",n.innerHTML="<h2 id='pcs-footer-container-menu-heading'></h2>\n   <div id='pcs-footer-container-menu-items'></div>",t.appendChild(n);var r=e.createElement("section");r.id="pcs-footer-container-readmore",r.className="pcs-footer-section",r.style.display="none",r.innerHTML="<h2 id='pcs-footer-container-readmore-heading'></h2>\n   <div id='pcs-footer-container-readmore-pages'></div>",t.appendChild(r);var i=e.createElement("section");return i.id="pcs-footer-container-legal",t.appendChild(i),t},isContainerAttached:function(e){return Boolean(e.querySelector("#pcs-footer-container"))}}},function(e,t,n){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(15);t.default={add:function(e,t,n,r,i,a,o){var l=e.querySelector("#"+r);l.innerHTML="<div class='pcs-footer-legal-contents'>\n    <hr class='pcs-footer-legal-divider'>\n    <span class='pcs-footer-legal-license'>\n    "+function(e,t){var n=e.split("$1");return n[0]+"<a class='pcs-footer-legal-license-link'>"+t+"</a>"+n[1]}(t,n)+"\n    <br>\n      <div class=\"pcs-footer-browser\">\n        <a class='pcs-footer-browser-link'>\n          "+a+"\n        </a>\n      </div>\n    </span>\n  </div>",l.querySelector(".pcs-footer-legal-license-link").addEventListener("click",(function(){i()})),l.querySelector(".pcs-footer-browser-link").addEventListener("click",(function(){o()}))}}},function(e,t,n){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(17);var i,a=n(7),o=(i=a)&&i.__esModule?i:{default:i};var l={languages:"languages",lastEdited:"lastEdited",pageIssues:"pageIssues",disambiguation:"disambiguation",coordinate:"coordinate",talkPage:"talkPage"},c=function(){function e(t,n,r,i){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.title=t,this.subtitle=n,this.itemType=r,this.clickHandler=i,this.payload=[]}return r(e,[{key:"iconClass",value:function(){switch(this.itemType){case l.languages:return"pcs-footer-menu-icon-languages";case l.lastEdited:return"pcs-footer-menu-icon-last-edited";case l.talkPage:return"pcs-footer-menu-icon-talk-page";case l.pageIssues:return"pcs-footer-menu-icon-page-issues";case l.disambiguation:return"pcs-footer-menu-icon-disambiguation";case l.coordinate:return"pcs-footer-menu-icon-coordinate";default:return""}}},{key:"payloadExtractor",value:function(){switch(this.itemType){case l.pageIssues:return o.default.collectPageIssues;case l.disambiguation:return o.default.collectHatnotes;default:return}}}]),e}();t.default={MenuItemType:l,setHeading:function(e,t,n){var r=n.getElementById(t);r.innerText=e,r.title=e},maybeAddItem:function(e,t,n,r,i,a){if(""!==e){var o=new c(e,t,n,i),l=o.payloadExtractor();l&&(o.payload=l(a),0===o.payload.length)||function(e,t,n){n.getElementById(t).appendChild(function(e,t){var n=t.createElement("div");n.className="pcs-footer-menu-item",n.role="menuitem";var r=t.createElement("a");if(r.addEventListener("click",(function(){e.clickHandler(e.payload)})),n.appendChild(r),e.title){var i=t.createElement("div");i.className="pcs-footer-menu-item-title",i.innerText=e.title,r.title=e.title,r.appendChild(i)}if(e.subtitle){var a=t.createElement("div");a.className="pcs-footer-menu-item-subtitle",a.innerText=e.subtitle,r.appendChild(a)}var o=e.iconClass();return o&&n.classList.add(o),t.createDocumentFragment().appendChild(n)}(e,n))}(o,r,a)}}}},function(e,t,n){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(19);var r=function(e,t,n){var r=new RegExp("\\s?["+t+"][^"+t+n+"]+["+n+"]","g"),i=0,a=e,o="";do{o=a,a=a.replace(r,""),i++}while(o!==a&&i<30);return a},i=function(e){var t=e;return t=r(t,"(",")"),t=r(t,"/","/")},a=function e(t,n,r,i,a){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.title=t,this.displayTitle=n,this.thumbnail=r,this.description=i,this.extract=a},o=function(e,t,n,r,o,c){var s=[],u=c.getElementById(n),d=c.getElementById(r);l(t,"pcs-footer-container-readmore-heading",c),e.forEach((function(e,t){var n=e.titles.normalized;s.push(n);var r=function(e,t,n){var r=n.createElement("a");if(r.id=t,r.className="pcs-footer-readmore-page",e.thumbnail&&e.thumbnail.source){var a=n.createElement("div");a.style.backgroundImage="url("+e.thumbnail.source+")",a.classList.add("pcs-footer-readmore-page-image"),r.appendChild(a)}var o=n.createElement("div");o.classList.add("pcs-footer-readmore-page-container"),r.appendChild(o),r.setAttribute("title",e.title),r.setAttribute("data-pcs-source","read-more"),r.href="./"+encodeURI(e.title);var l=void 0;if(e.displayTitle?l=e.displayTitle:e.title&&(l=e.title),l){var c=n.createElement("div");c.id=t,c.className="pcs-footer-readmore-page-title",c.innerHTML=l.replace(/_/g," "),r.title=e.title.replace(/_/g," "),o.appendChild(c)}var s=void 0;if(e.description&&(s=e.description),(!s||s.length<10)&&e.extract&&(s=i(e.extract)),s){var u=n.createElement("div");u.id=t,u.className="pcs-footer-readmore-page-description",u.innerHTML=s,o.appendChild(u)}return n.createDocumentFragment().appendChild(r)}(new a(n,e.titles.display,e.thumbnail,e.description,e.extract),t,c);d.appendChild(r)})),o(s),u.style.display="block"},l=function(e,t,n){var r=n.getElementById(t);r.innerText=e,r.title=e};t.default={fetchAndAdd:function(e,t,n,r,i,a,l,c){var s=new XMLHttpRequest;s.open("GET",function(e,t,n){return(n||"")+"/page/related/"+e}(e,0,a),!0),s.onload=function(){var e=void 0;try{e=JSON.parse(s.responseText).pages}catch(e){}if(e&&e.length){var a=void 0;if(e.length>n){var u=Math.floor(Math.random()*Math.floor(e.length-n));a=e.slice(u,u+n)}else a=e;o(a,t,r,i,l,c)}},s.send()},setHeading:l,test:{cleanExtract:i,safelyRemoveEnclosures:r}}},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=o(n(1)),i=o(n(4)),a=o(n(0));function o(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var c=function(e,t,n){var r=decodeURIComponent(e),i=decodeURIComponent(t);if(void 0!==n){var a="./"+decodeURIComponent(n);return 0===r.indexOf(a)&&e.indexOf(i)===a.length}return r.indexOf(i)>-1},s=function(e,t){return c(e,"#cite_note-",t)},u=function(e){return Boolean(e)&&e.nodeType===Node.TEXT_NODE&&Boolean(e.textContent.match(/^\s+$/))},d=function(e){var t=e.querySelector("a");return t&&s(t.hash)},f=function(e,t){var n=t.querySelector("A").getAttribute("href").split("#")[1];return e.getElementById(n)||e.getElementById(decodeURIComponent(n))},p=function(e,t){var n=f(e,t);if(!n)return"";var r=n.querySelector("span.mw-reference-text");return r?r.innerHTML.trim():""},h=function(e){return a.default.matchesSelector(e,".reference, .mw-ref")?e:r.default.findClosestAncestor(e,".reference, .mw-ref")},m=function e(t,n,r,i,a){l(this,e),this.id=t,this.rect=n,this.text=r,this.html=i,this.href=a},v=function e(t,n){l(this,e),this.href=t,this.text=n},E=function e(t,n){l(this,e),this.selectedIndex=t,this.referencesGroup=n},g=function(e,t){var n=e;do{n=t(n)}while(u(n));return n},y=function(e,t,n){for(var r=e;(r=g(r,t))&&r.nodeType===Node.ELEMENT_NODE&&d(r);)n(r)},b=function(e){return e.previousSibling},_=function(e){return e.nextSibling},T=function(e){var t=[e];return y(e,b,(function(e){return t.unshift(e)})),y(e,_,(function(e){return t.push(e)})),t},L=function(e,t){var n=T(t),r=n.indexOf(t),a=n.map((function(t){return function(e,t){return new m(h(t).id,i.default.getBoundingClientRectAsPlainObject(t),t.textContent,p(e,t),t.querySelector("A").getAttribute("href"))}(e,t)}));return new E(r,a)};t.default={collectNearbyReferences:function(e,t){var n=t.parentElement;return L(e,n)},collectNearbyReferencesAsText:function(e,t){var n=t.parentElement,r=T(n),i=r.indexOf(n),a=r.map((function(e){return function(e,t){return new v(t.querySelector("A").getAttribute("href"),t.textContent)}(0,e)}));return new E(i,a)},collectReferencesForBackLink:function(e,t,n){var r=function(e){var t=e.getAttribute("pcs-back-links");return t?JSON.parse(t):[]}(t);if(!r||0===r.length)return{};for(var i=n.split("#pcs-ref-back-link-")[1],a=void 0,o=[],l=r[0],c=0;c<r.length;c++){var s=r[c].split("#")[1],u=e.getElementById(s);u&&(a||(a=u.textContent.trim()),o.push({id:s}))}return{referenceId:i,referenceText:a,backLinks:o,href:l}},isBackLink:function(e,t){return c(e,"#pcs-ref-back-link-",t)},isCitation:s,CLASS:{BACK_LINK_ANCHOR:"pcs-ref-back-link",BACK_LINK_CONTAINER:"pcs-ref-backlink-container",BODY:"pcs-ref-body",BODY_HEADER:"pcs-ref-body-header",BODY_CONTENT:"pcs-ref-body-content",REF:"pcs-ref"},BACK_LINK_FRAGMENT_PREFIX:"#pcs-ref-back-link-",BACK_LINK_ATTRIBUTE:"pcs-back-links",test:{adjacentNonWhitespaceNode:g,closestReferenceClassElement:h,collectAdjacentReferenceNodes:y,collectNearbyReferenceNodes:T,collectRefText:p,getRefTextContainer:f,hasCitationLink:d,isWhitespaceTextNode:u,nextSiblingGetter:_,prevSiblingGetter:b}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={setPercentage:function(e,t){t&&(e.style["-webkit-text-size-adjust"]=t,e.style["text-size-adjust"]=t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.default={setMargins:function(e,t){void 0!==t.top&&(e.style.marginTop=t.top),void 0!==t.right&&(e.style.marginRight=t.right),void 0!==t.bottom&&(e.style.marginBottom=t.bottom),void 0!==t.left&&(e.style.marginLeft=t.left)},setPadding:function(e,t){void 0!==t.top&&(e.style.paddingTop=t.top),void 0!==t.right&&(e.style.paddingRight=t.right),void 0!==t.bottom&&(e.style.paddingBottom=t.bottom),void 0!==t.left&&(e.style.paddingLeft=t.left)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(27);var r="pcs-dim-images",i=function(e,t){e.body.classList[t?"add":"remove"](r)},a=function(e){return e.body.classList.contains(r)};t.default={CLASS:r,dim:function(e,t){return i(e.document,t)},isDim:function(e){return a(e.document)},dimImages:i,areImagesDimmed:a}},function(e,t,n){},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=s(n(2)),a=s(n(1)),o=s(n(6)),l=s(n(0)),c=s(n(9));function s(e){return e&&e.__esModule?e:{default:e}}var u=["scroll","resize",i.default.SECTION_TOGGLED_EVENT_TYPE],d=function(){function e(t,n){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this._window=t,this._loadDistanceMultiplier=n,this._placeholders=[],this._registered=!1,this._throttledLoadPlaceholders=c.default.wrap(t,100,(function(){return r._loadPlaceholders()}))}return r(e,[{key:"convertImagesToPlaceholders",value:function(e){var t=o.default.queryLazyLoadableImages(e),n=o.default.convertImagesToPlaceholders(this._window.document,t);this._placeholders=this._placeholders.concat(n),this._register()}},{key:"collectExistingPlaceholders",value:function(e){var t=l.default.querySelectorAll(e,"."+o.default.PLACEHOLDER_CLASS);this._placeholders=this._placeholders.concat(t),this._register()}},{key:"loadPlaceholders",value:function(){this._throttledLoadPlaceholders()}},{key:"deregister",value:function(){var e=this;this._registered&&(u.forEach((function(t){return e._window.removeEventListener(t,e._throttledLoadPlaceholders)})),this._throttledLoadPlaceholders.reset(),this._placeholders=[],this._registered=!1)}},{key:"_register",value:function(){var e=this;!this._registered&&this._placeholders.length&&(this._registered=!0,u.forEach((function(t){return e._window.addEventListener(t,e._throttledLoadPlaceholders)})))}},{key:"_loadPlaceholders",value:function(){var e=this;this._placeholders=this._placeholders.filter((function(t){var n=!0;return e._isPlaceholderEligibleToLoad(t)&&(o.default.loadPlaceholder(e._window.document,t),n=!1),n})),0===this._placeholders.length&&this.deregister()}},{key:"_isPlaceholderEligibleToLoad",value:function(e){return a.default.isVisible(e)&&this._isPlaceholderWithinLoadDistance(e)}},{key:"_isPlaceholderWithinLoadDistance",value:function(e){var t=e.getBoundingClientRect(),n=this._window.innerHeight*this._loadDistanceMultiplier;return!(t.top>n||t.bottom<-n)}}]),e}();t.default=d},function(e,t,n){},,,,,,,,,,,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=I(n(11)),i=I(n(24)),a=I(n(25)),o=I(n(2)),l=I(n(7)),c=I(n(42)),s=I(n(26)),u=I(n(5)),d=I(n(8)),f=I(n(1)),p=I(n(43)),h=I(n(12)),m=I(n(14)),v=I(n(16)),E=I(n(18)),g=I(n(6)),y=I(n(28)),b=I(n(10)),_=I(n(0)),T=I(n(44)),L=I(n(23)),C=I(n(9)),N=I(n(3)),O=I(n(52)),A=I(n(45));function I(e){return e&&e.__esModule?e:{default:e}}n(47),n(48),n(49),t.default={AdjustTextSize:i.default,BodySpacingTransform:a.default,CollapseTable:o.default,CollectionUtilities:l.default,CompatibilityTransform:c.default,DimImagesTransform:s.default,EditTransform:u.default,HTMLUtilities:O.default,LeadIntroductionTransform:p.default,FooterContainer:h.default,FooterLegal:m.default,FooterMenu:v.default,FooterReadMore:E.default,LazyLoadTransform:g.default,LazyLoadTransformer:y.default,PlatformTransform:b.default,RedLinks:T.default,ReferenceCollection:L.default,SectionUtilities:N.default,ThemeTransform:r.default,WidenImage:A.default,test:{ElementGeometry:d.default,ElementUtilities:f.default,Polyfill:_.default,Throttle:C.default}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={FILTER:"pcs-compatibility-filter"};t.default={COMPATIBILITY:r,enableSupport:function(e){var t=e.documentElement;(function(e){return function(e,t,n){var r=e.createElement("span");return t.some((function(e){return r.style[e]=n,r.style.cssText}))}(e,["webkitFilter","filter"],"blur(0)")})(e)||t.classList.add(r.FILTER)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){var t=e.querySelector('[id="coordinates"]'),n=t?t.textContent.length:0;return e.textContent.length-n>=50},i=function(e){var t=[],n=e;do{t.push(n),n=n.nextSibling}while(n&&(1!==n.nodeType||"P"!==n.tagName));return t},a=function(e,t){if(t)for(var n=t.firstElementChild;n;){if("P"===n.tagName&&r(n))return n;n=n.nextElementSibling}};t.default={moveLeadIntroductionUp:function(e,t,n){var r=a(0,t);if(r){var o=e.createDocumentFragment();i(r).forEach((function(e){return o.appendChild(e)}));var l=n?n.nextSibling:t.firstChild;t.insertBefore(o,l)}},test:{isParagraphEligible:r,extractLeadIntroductionNodes:i,getEligibleParagraph:a}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r,i=n(0),a=(r=i)&&r.__esModule?r:{default:r};var o=function(e,t){e.innerHTML=t.innerHTML,e.setAttribute("class",t.getAttribute("class"))},l=function(e){return a.default.querySelectorAll(e,"a.new")},c=function(e){return e.createElement("span")},s=function(e,t){return e.parentNode.replaceChild(t,e)};t.default={hideRedLinks:function(e){var t=c(e);l(e).forEach((function(e){var n=t.cloneNode(!1);o(n,e),s(e,n)}))},test:{configureRedLinkTemplate:o,redLinkAnchorsInDocument:l,newRedLinkTemplate:c,replaceAnchorWithSpan:s}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n(46);var r=function(e){for(var t=[],n=e;n.parentElement&&"SECTION"!==(n=n.parentElement).tagName;)t.push(n);return t},i=function(e,t,n){e[t]=n},a=function(e,t,n){Boolean(e[t])&&i(e,t,n)},o={width:"100%",height:"auto",maxWidth:"100%",float:"none"},l=function(e){Object.keys(o).forEach((function(t){return a(e.style,t,o[t])}))},c=function(e){r(e).forEach(l)};t.default={widenImage:function(e){c(e),e.classList.add("pcs-widen-image-override")},test:{ancestorsToWiden:r,updateExistingStyleValue:a,widenAncestors:c,widenElementByUpdatingExistingStyles:l,widenElementByUpdatingStyles:function(e){Object.keys(o).forEach((function(t){return i(e.style,t,o[t])}))}}}},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},,,function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(e){switch(e){case"'":return"&#039;";case'"':return"&quot;";case"<":return"&lt;";case">":return"&gt;";case"&":return"&amp;";default:return""}};t.default={escape:function(e){return e.replace(/['"<>&]/g,r)}}}]).default}));