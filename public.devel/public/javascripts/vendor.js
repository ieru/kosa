(function(/*! Brunch !*/) {
  'use strict';

  var globals = typeof window !== 'undefined' ? window : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};

  var has = function(object, name) {
    return ({}).hasOwnProperty.call(object, name);
  };

  var expand = function(root, name) {
    var results = [], parts, part;
    if (/^\.\.?(\/|$)/.test(name)) {
      parts = [root, name].join('/').split('/');
    } else {
      parts = name.split('/');
    }
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function(name) {
      var dir = dirname(path);
      var absolute = expand(dir, name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var module = {id: name, exports: {}};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var require = function(name, loaderPath) {
    var path = expand(name, '.');
    if (loaderPath == null) loaderPath = '/';

    if (has(cache, path)) return cache[path].exports;
    if (has(modules, path)) return initModule(path, modules[path]);

    var dirIndex = expand(path, './index');
    if (has(cache, dirIndex)) return cache[dirIndex].exports;
    if (has(modules, dirIndex)) return initModule(dirIndex, modules[dirIndex]);

    throw new Error('Cannot find module "' + name + '" from '+ '"' + loaderPath + '"');
  };

  var define = function(bundle, fn) {
    if (typeof bundle === 'object') {
      for (var key in bundle) {
        if (has(bundle, key)) {
          modules[key] = bundle[key];
        }
      }
    } else {
      modules[bundle] = fn;
    }
  };

  var list = function() {
    var result = [];
    for (var item in modules) {
      if (has(modules, item)) {
        result.push(item);
      }
    }
    return result;
  };

  globals.require = require;
  globals.require.define = define;
  globals.require.register = define;
  globals.require.list = list;
  globals.require.brunch = true;
})();
// Make it safe to do console.log() always.
(function (con) {
  var method;
  var dummy = function() {};
  var methods = ('assert,count,debug,dir,dirxml,error,exception,group,' +
     'groupCollapsed,groupEnd,info,log,markTimeline,profile,profileEnd,' + 
     'time,timeEnd,trace,warn').split(',');
  while (method = methods.pop()) {
    con[method] = con[method] || dummy;
  }
})(window.console = window.console || {});

;/*! jQuery v1.10.2 | (c) 2005, 2013 jQuery Foundation, Inc. | jquery.org/license
//@ sourceMappingURL=jquery-1.10.2.min.map
*/
(function(e,t){var n,r,i=typeof t,o=e.location,a=e.document,s=a.documentElement,l=e.jQuery,u=e.$,c={},p=[],f="1.10.2",d=p.concat,h=p.push,g=p.slice,m=p.indexOf,y=c.toString,v=c.hasOwnProperty,b=f.trim,x=function(e,t){return new x.fn.init(e,t,r)},w=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,T=/\S+/g,C=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,N=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,k=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,E=/^[\],:{}\s]*$/,S=/(?:^|:|,)(?:\s*\[)+/g,A=/\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,j=/"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,D=/^-ms-/,L=/-([\da-z])/gi,H=function(e,t){return t.toUpperCase()},q=function(e){(a.addEventListener||"load"===e.type||"complete"===a.readyState)&&(_(),x.ready())},_=function(){a.addEventListener?(a.removeEventListener("DOMContentLoaded",q,!1),e.removeEventListener("load",q,!1)):(a.detachEvent("onreadystatechange",q),e.detachEvent("onload",q))};x.fn=x.prototype={jquery:f,constructor:x,init:function(e,n,r){var i,o;if(!e)return this;if("string"==typeof e){if(i="<"===e.charAt(0)&&">"===e.charAt(e.length-1)&&e.length>=3?[null,e,null]:N.exec(e),!i||!i[1]&&n)return!n||n.jquery?(n||r).find(e):this.constructor(n).find(e);if(i[1]){if(n=n instanceof x?n[0]:n,x.merge(this,x.parseHTML(i[1],n&&n.nodeType?n.ownerDocument||n:a,!0)),k.test(i[1])&&x.isPlainObject(n))for(i in n)x.isFunction(this[i])?this[i](n[i]):this.attr(i,n[i]);return this}if(o=a.getElementById(i[2]),o&&o.parentNode){if(o.id!==i[2])return r.find(e);this.length=1,this[0]=o}return this.context=a,this.selector=e,this}return e.nodeType?(this.context=this[0]=e,this.length=1,this):x.isFunction(e)?r.ready(e):(e.selector!==t&&(this.selector=e.selector,this.context=e.context),x.makeArray(e,this))},selector:"",length:0,toArray:function(){return g.call(this)},get:function(e){return null==e?this.toArray():0>e?this[this.length+e]:this[e]},pushStack:function(e){var t=x.merge(this.constructor(),e);return t.prevObject=this,t.context=this.context,t},each:function(e,t){return x.each(this,e,t)},ready:function(e){return x.ready.promise().done(e),this},slice:function(){return this.pushStack(g.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(e){var t=this.length,n=+e+(0>e?t:0);return this.pushStack(n>=0&&t>n?[this[n]]:[])},map:function(e){return this.pushStack(x.map(this,function(t,n){return e.call(t,n,t)}))},end:function(){return this.prevObject||this.constructor(null)},push:h,sort:[].sort,splice:[].splice},x.fn.init.prototype=x.fn,x.extend=x.fn.extend=function(){var e,n,r,i,o,a,s=arguments[0]||{},l=1,u=arguments.length,c=!1;for("boolean"==typeof s&&(c=s,s=arguments[1]||{},l=2),"object"==typeof s||x.isFunction(s)||(s={}),u===l&&(s=this,--l);u>l;l++)if(null!=(o=arguments[l]))for(i in o)e=s[i],r=o[i],s!==r&&(c&&r&&(x.isPlainObject(r)||(n=x.isArray(r)))?(n?(n=!1,a=e&&x.isArray(e)?e:[]):a=e&&x.isPlainObject(e)?e:{},s[i]=x.extend(c,a,r)):r!==t&&(s[i]=r));return s},x.extend({expando:"jQuery"+(f+Math.random()).replace(/\D/g,""),noConflict:function(t){return e.$===x&&(e.$=u),t&&e.jQuery===x&&(e.jQuery=l),x},isReady:!1,readyWait:1,holdReady:function(e){e?x.readyWait++:x.ready(!0)},ready:function(e){if(e===!0?!--x.readyWait:!x.isReady){if(!a.body)return setTimeout(x.ready);x.isReady=!0,e!==!0&&--x.readyWait>0||(n.resolveWith(a,[x]),x.fn.trigger&&x(a).trigger("ready").off("ready"))}},isFunction:function(e){return"function"===x.type(e)},isArray:Array.isArray||function(e){return"array"===x.type(e)},isWindow:function(e){return null!=e&&e==e.window},isNumeric:function(e){return!isNaN(parseFloat(e))&&isFinite(e)},type:function(e){return null==e?e+"":"object"==typeof e||"function"==typeof e?c[y.call(e)]||"object":typeof e},isPlainObject:function(e){var n;if(!e||"object"!==x.type(e)||e.nodeType||x.isWindow(e))return!1;try{if(e.constructor&&!v.call(e,"constructor")&&!v.call(e.constructor.prototype,"isPrototypeOf"))return!1}catch(r){return!1}if(x.support.ownLast)for(n in e)return v.call(e,n);for(n in e);return n===t||v.call(e,n)},isEmptyObject:function(e){var t;for(t in e)return!1;return!0},error:function(e){throw Error(e)},parseHTML:function(e,t,n){if(!e||"string"!=typeof e)return null;"boolean"==typeof t&&(n=t,t=!1),t=t||a;var r=k.exec(e),i=!n&&[];return r?[t.createElement(r[1])]:(r=x.buildFragment([e],t,i),i&&x(i).remove(),x.merge([],r.childNodes))},parseJSON:function(n){return e.JSON&&e.JSON.parse?e.JSON.parse(n):null===n?n:"string"==typeof n&&(n=x.trim(n),n&&E.test(n.replace(A,"@").replace(j,"]").replace(S,"")))?Function("return "+n)():(x.error("Invalid JSON: "+n),t)},parseXML:function(n){var r,i;if(!n||"string"!=typeof n)return null;try{e.DOMParser?(i=new DOMParser,r=i.parseFromString(n,"text/xml")):(r=new ActiveXObject("Microsoft.XMLDOM"),r.async="false",r.loadXML(n))}catch(o){r=t}return r&&r.documentElement&&!r.getElementsByTagName("parsererror").length||x.error("Invalid XML: "+n),r},noop:function(){},globalEval:function(t){t&&x.trim(t)&&(e.execScript||function(t){e.eval.call(e,t)})(t)},camelCase:function(e){return e.replace(D,"ms-").replace(L,H)},nodeName:function(e,t){return e.nodeName&&e.nodeName.toLowerCase()===t.toLowerCase()},each:function(e,t,n){var r,i=0,o=e.length,a=M(e);if(n){if(a){for(;o>i;i++)if(r=t.apply(e[i],n),r===!1)break}else for(i in e)if(r=t.apply(e[i],n),r===!1)break}else if(a){for(;o>i;i++)if(r=t.call(e[i],i,e[i]),r===!1)break}else for(i in e)if(r=t.call(e[i],i,e[i]),r===!1)break;return e},trim:b&&!b.call("\ufeff\u00a0")?function(e){return null==e?"":b.call(e)}:function(e){return null==e?"":(e+"").replace(C,"")},makeArray:function(e,t){var n=t||[];return null!=e&&(M(Object(e))?x.merge(n,"string"==typeof e?[e]:e):h.call(n,e)),n},inArray:function(e,t,n){var r;if(t){if(m)return m.call(t,e,n);for(r=t.length,n=n?0>n?Math.max(0,r+n):n:0;r>n;n++)if(n in t&&t[n]===e)return n}return-1},merge:function(e,n){var r=n.length,i=e.length,o=0;if("number"==typeof r)for(;r>o;o++)e[i++]=n[o];else while(n[o]!==t)e[i++]=n[o++];return e.length=i,e},grep:function(e,t,n){var r,i=[],o=0,a=e.length;for(n=!!n;a>o;o++)r=!!t(e[o],o),n!==r&&i.push(e[o]);return i},map:function(e,t,n){var r,i=0,o=e.length,a=M(e),s=[];if(a)for(;o>i;i++)r=t(e[i],i,n),null!=r&&(s[s.length]=r);else for(i in e)r=t(e[i],i,n),null!=r&&(s[s.length]=r);return d.apply([],s)},guid:1,proxy:function(e,n){var r,i,o;return"string"==typeof n&&(o=e[n],n=e,e=o),x.isFunction(e)?(r=g.call(arguments,2),i=function(){return e.apply(n||this,r.concat(g.call(arguments)))},i.guid=e.guid=e.guid||x.guid++,i):t},access:function(e,n,r,i,o,a,s){var l=0,u=e.length,c=null==r;if("object"===x.type(r)){o=!0;for(l in r)x.access(e,n,l,r[l],!0,a,s)}else if(i!==t&&(o=!0,x.isFunction(i)||(s=!0),c&&(s?(n.call(e,i),n=null):(c=n,n=function(e,t,n){return c.call(x(e),n)})),n))for(;u>l;l++)n(e[l],r,s?i:i.call(e[l],l,n(e[l],r)));return o?e:c?n.call(e):u?n(e[0],r):a},now:function(){return(new Date).getTime()},swap:function(e,t,n,r){var i,o,a={};for(o in t)a[o]=e.style[o],e.style[o]=t[o];i=n.apply(e,r||[]);for(o in t)e.style[o]=a[o];return i}}),x.ready.promise=function(t){if(!n)if(n=x.Deferred(),"complete"===a.readyState)setTimeout(x.ready);else if(a.addEventListener)a.addEventListener("DOMContentLoaded",q,!1),e.addEventListener("load",q,!1);else{a.attachEvent("onreadystatechange",q),e.attachEvent("onload",q);var r=!1;try{r=null==e.frameElement&&a.documentElement}catch(i){}r&&r.doScroll&&function o(){if(!x.isReady){try{r.doScroll("left")}catch(e){return setTimeout(o,50)}_(),x.ready()}}()}return n.promise(t)},x.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(e,t){c["[object "+t+"]"]=t.toLowerCase()});function M(e){var t=e.length,n=x.type(e);return x.isWindow(e)?!1:1===e.nodeType&&t?!0:"array"===n||"function"!==n&&(0===t||"number"==typeof t&&t>0&&t-1 in e)}r=x(a),function(e,t){var n,r,i,o,a,s,l,u,c,p,f,d,h,g,m,y,v,b="sizzle"+-new Date,w=e.document,T=0,C=0,N=st(),k=st(),E=st(),S=!1,A=function(e,t){return e===t?(S=!0,0):0},j=typeof t,D=1<<31,L={}.hasOwnProperty,H=[],q=H.pop,_=H.push,M=H.push,O=H.slice,F=H.indexOf||function(e){var t=0,n=this.length;for(;n>t;t++)if(this[t]===e)return t;return-1},B="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",P="[\\x20\\t\\r\\n\\f]",R="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",W=R.replace("w","w#"),$="\\["+P+"*("+R+")"+P+"*(?:([*^$|!~]?=)"+P+"*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|("+W+")|)|)"+P+"*\\]",I=":("+R+")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|"+$.replace(3,8)+")*)|.*)\\)|)",z=RegExp("^"+P+"+|((?:^|[^\\\\])(?:\\\\.)*)"+P+"+$","g"),X=RegExp("^"+P+"*,"+P+"*"),U=RegExp("^"+P+"*([>+~]|"+P+")"+P+"*"),V=RegExp(P+"*[+~]"),Y=RegExp("="+P+"*([^\\]'\"]*)"+P+"*\\]","g"),J=RegExp(I),G=RegExp("^"+W+"$"),Q={ID:RegExp("^#("+R+")"),CLASS:RegExp("^\\.("+R+")"),TAG:RegExp("^("+R.replace("w","w*")+")"),ATTR:RegExp("^"+$),PSEUDO:RegExp("^"+I),CHILD:RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+P+"*(even|odd|(([+-]|)(\\d*)n|)"+P+"*(?:([+-]|)"+P+"*(\\d+)|))"+P+"*\\)|)","i"),bool:RegExp("^(?:"+B+")$","i"),needsContext:RegExp("^"+P+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+P+"*((?:-\\d)?\\d*)"+P+"*\\)|)(?=[^-]|$)","i")},K=/^[^{]+\{\s*\[native \w/,Z=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,et=/^(?:input|select|textarea|button)$/i,tt=/^h\d$/i,nt=/'|\\/g,rt=RegExp("\\\\([\\da-f]{1,6}"+P+"?|("+P+")|.)","ig"),it=function(e,t,n){var r="0x"+t-65536;return r!==r||n?t:0>r?String.fromCharCode(r+65536):String.fromCharCode(55296|r>>10,56320|1023&r)};try{M.apply(H=O.call(w.childNodes),w.childNodes),H[w.childNodes.length].nodeType}catch(ot){M={apply:H.length?function(e,t){_.apply(e,O.call(t))}:function(e,t){var n=e.length,r=0;while(e[n++]=t[r++]);e.length=n-1}}}function at(e,t,n,i){var o,a,s,l,u,c,d,m,y,x;if((t?t.ownerDocument||t:w)!==f&&p(t),t=t||f,n=n||[],!e||"string"!=typeof e)return n;if(1!==(l=t.nodeType)&&9!==l)return[];if(h&&!i){if(o=Z.exec(e))if(s=o[1]){if(9===l){if(a=t.getElementById(s),!a||!a.parentNode)return n;if(a.id===s)return n.push(a),n}else if(t.ownerDocument&&(a=t.ownerDocument.getElementById(s))&&v(t,a)&&a.id===s)return n.push(a),n}else{if(o[2])return M.apply(n,t.getElementsByTagName(e)),n;if((s=o[3])&&r.getElementsByClassName&&t.getElementsByClassName)return M.apply(n,t.getElementsByClassName(s)),n}if(r.qsa&&(!g||!g.test(e))){if(m=d=b,y=t,x=9===l&&e,1===l&&"object"!==t.nodeName.toLowerCase()){c=mt(e),(d=t.getAttribute("id"))?m=d.replace(nt,"\\$&"):t.setAttribute("id",m),m="[id='"+m+"'] ",u=c.length;while(u--)c[u]=m+yt(c[u]);y=V.test(e)&&t.parentNode||t,x=c.join(",")}if(x)try{return M.apply(n,y.querySelectorAll(x)),n}catch(T){}finally{d||t.removeAttribute("id")}}}return kt(e.replace(z,"$1"),t,n,i)}function st(){var e=[];function t(n,r){return e.push(n+=" ")>o.cacheLength&&delete t[e.shift()],t[n]=r}return t}function lt(e){return e[b]=!0,e}function ut(e){var t=f.createElement("div");try{return!!e(t)}catch(n){return!1}finally{t.parentNode&&t.parentNode.removeChild(t),t=null}}function ct(e,t){var n=e.split("|"),r=e.length;while(r--)o.attrHandle[n[r]]=t}function pt(e,t){var n=t&&e,r=n&&1===e.nodeType&&1===t.nodeType&&(~t.sourceIndex||D)-(~e.sourceIndex||D);if(r)return r;if(n)while(n=n.nextSibling)if(n===t)return-1;return e?1:-1}function ft(e){return function(t){var n=t.nodeName.toLowerCase();return"input"===n&&t.type===e}}function dt(e){return function(t){var n=t.nodeName.toLowerCase();return("input"===n||"button"===n)&&t.type===e}}function ht(e){return lt(function(t){return t=+t,lt(function(n,r){var i,o=e([],n.length,t),a=o.length;while(a--)n[i=o[a]]&&(n[i]=!(r[i]=n[i]))})})}s=at.isXML=function(e){var t=e&&(e.ownerDocument||e).documentElement;return t?"HTML"!==t.nodeName:!1},r=at.support={},p=at.setDocument=function(e){var n=e?e.ownerDocument||e:w,i=n.defaultView;return n!==f&&9===n.nodeType&&n.documentElement?(f=n,d=n.documentElement,h=!s(n),i&&i.attachEvent&&i!==i.top&&i.attachEvent("onbeforeunload",function(){p()}),r.attributes=ut(function(e){return e.className="i",!e.getAttribute("className")}),r.getElementsByTagName=ut(function(e){return e.appendChild(n.createComment("")),!e.getElementsByTagName("*").length}),r.getElementsByClassName=ut(function(e){return e.innerHTML="<div class='a'></div><div class='a i'></div>",e.firstChild.className="i",2===e.getElementsByClassName("i").length}),r.getById=ut(function(e){return d.appendChild(e).id=b,!n.getElementsByName||!n.getElementsByName(b).length}),r.getById?(o.find.ID=function(e,t){if(typeof t.getElementById!==j&&h){var n=t.getElementById(e);return n&&n.parentNode?[n]:[]}},o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){return e.getAttribute("id")===t}}):(delete o.find.ID,o.filter.ID=function(e){var t=e.replace(rt,it);return function(e){var n=typeof e.getAttributeNode!==j&&e.getAttributeNode("id");return n&&n.value===t}}),o.find.TAG=r.getElementsByTagName?function(e,n){return typeof n.getElementsByTagName!==j?n.getElementsByTagName(e):t}:function(e,t){var n,r=[],i=0,o=t.getElementsByTagName(e);if("*"===e){while(n=o[i++])1===n.nodeType&&r.push(n);return r}return o},o.find.CLASS=r.getElementsByClassName&&function(e,n){return typeof n.getElementsByClassName!==j&&h?n.getElementsByClassName(e):t},m=[],g=[],(r.qsa=K.test(n.querySelectorAll))&&(ut(function(e){e.innerHTML="<select><option selected=''></option></select>",e.querySelectorAll("[selected]").length||g.push("\\["+P+"*(?:value|"+B+")"),e.querySelectorAll(":checked").length||g.push(":checked")}),ut(function(e){var t=n.createElement("input");t.setAttribute("type","hidden"),e.appendChild(t).setAttribute("t",""),e.querySelectorAll("[t^='']").length&&g.push("[*^$]="+P+"*(?:''|\"\")"),e.querySelectorAll(":enabled").length||g.push(":enabled",":disabled"),e.querySelectorAll("*,:x"),g.push(",.*:")})),(r.matchesSelector=K.test(y=d.webkitMatchesSelector||d.mozMatchesSelector||d.oMatchesSelector||d.msMatchesSelector))&&ut(function(e){r.disconnectedMatch=y.call(e,"div"),y.call(e,"[s!='']:x"),m.push("!=",I)}),g=g.length&&RegExp(g.join("|")),m=m.length&&RegExp(m.join("|")),v=K.test(d.contains)||d.compareDocumentPosition?function(e,t){var n=9===e.nodeType?e.documentElement:e,r=t&&t.parentNode;return e===r||!(!r||1!==r.nodeType||!(n.contains?n.contains(r):e.compareDocumentPosition&&16&e.compareDocumentPosition(r)))}:function(e,t){if(t)while(t=t.parentNode)if(t===e)return!0;return!1},A=d.compareDocumentPosition?function(e,t){if(e===t)return S=!0,0;var i=t.compareDocumentPosition&&e.compareDocumentPosition&&e.compareDocumentPosition(t);return i?1&i||!r.sortDetached&&t.compareDocumentPosition(e)===i?e===n||v(w,e)?-1:t===n||v(w,t)?1:c?F.call(c,e)-F.call(c,t):0:4&i?-1:1:e.compareDocumentPosition?-1:1}:function(e,t){var r,i=0,o=e.parentNode,a=t.parentNode,s=[e],l=[t];if(e===t)return S=!0,0;if(!o||!a)return e===n?-1:t===n?1:o?-1:a?1:c?F.call(c,e)-F.call(c,t):0;if(o===a)return pt(e,t);r=e;while(r=r.parentNode)s.unshift(r);r=t;while(r=r.parentNode)l.unshift(r);while(s[i]===l[i])i++;return i?pt(s[i],l[i]):s[i]===w?-1:l[i]===w?1:0},n):f},at.matches=function(e,t){return at(e,null,null,t)},at.matchesSelector=function(e,t){if((e.ownerDocument||e)!==f&&p(e),t=t.replace(Y,"='$1']"),!(!r.matchesSelector||!h||m&&m.test(t)||g&&g.test(t)))try{var n=y.call(e,t);if(n||r.disconnectedMatch||e.document&&11!==e.document.nodeType)return n}catch(i){}return at(t,f,null,[e]).length>0},at.contains=function(e,t){return(e.ownerDocument||e)!==f&&p(e),v(e,t)},at.attr=function(e,n){(e.ownerDocument||e)!==f&&p(e);var i=o.attrHandle[n.toLowerCase()],a=i&&L.call(o.attrHandle,n.toLowerCase())?i(e,n,!h):t;return a===t?r.attributes||!h?e.getAttribute(n):(a=e.getAttributeNode(n))&&a.specified?a.value:null:a},at.error=function(e){throw Error("Syntax error, unrecognized expression: "+e)},at.uniqueSort=function(e){var t,n=[],i=0,o=0;if(S=!r.detectDuplicates,c=!r.sortStable&&e.slice(0),e.sort(A),S){while(t=e[o++])t===e[o]&&(i=n.push(o));while(i--)e.splice(n[i],1)}return e},a=at.getText=function(e){var t,n="",r=0,i=e.nodeType;if(i){if(1===i||9===i||11===i){if("string"==typeof e.textContent)return e.textContent;for(e=e.firstChild;e;e=e.nextSibling)n+=a(e)}else if(3===i||4===i)return e.nodeValue}else for(;t=e[r];r++)n+=a(t);return n},o=at.selectors={cacheLength:50,createPseudo:lt,match:Q,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(e){return e[1]=e[1].replace(rt,it),e[3]=(e[4]||e[5]||"").replace(rt,it),"~="===e[2]&&(e[3]=" "+e[3]+" "),e.slice(0,4)},CHILD:function(e){return e[1]=e[1].toLowerCase(),"nth"===e[1].slice(0,3)?(e[3]||at.error(e[0]),e[4]=+(e[4]?e[5]+(e[6]||1):2*("even"===e[3]||"odd"===e[3])),e[5]=+(e[7]+e[8]||"odd"===e[3])):e[3]&&at.error(e[0]),e},PSEUDO:function(e){var n,r=!e[5]&&e[2];return Q.CHILD.test(e[0])?null:(e[3]&&e[4]!==t?e[2]=e[4]:r&&J.test(r)&&(n=mt(r,!0))&&(n=r.indexOf(")",r.length-n)-r.length)&&(e[0]=e[0].slice(0,n),e[2]=r.slice(0,n)),e.slice(0,3))}},filter:{TAG:function(e){var t=e.replace(rt,it).toLowerCase();return"*"===e?function(){return!0}:function(e){return e.nodeName&&e.nodeName.toLowerCase()===t}},CLASS:function(e){var t=N[e+" "];return t||(t=RegExp("(^|"+P+")"+e+"("+P+"|$)"))&&N(e,function(e){return t.test("string"==typeof e.className&&e.className||typeof e.getAttribute!==j&&e.getAttribute("class")||"")})},ATTR:function(e,t,n){return function(r){var i=at.attr(r,e);return null==i?"!="===t:t?(i+="","="===t?i===n:"!="===t?i!==n:"^="===t?n&&0===i.indexOf(n):"*="===t?n&&i.indexOf(n)>-1:"$="===t?n&&i.slice(-n.length)===n:"~="===t?(" "+i+" ").indexOf(n)>-1:"|="===t?i===n||i.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(e,t,n,r,i){var o="nth"!==e.slice(0,3),a="last"!==e.slice(-4),s="of-type"===t;return 1===r&&0===i?function(e){return!!e.parentNode}:function(t,n,l){var u,c,p,f,d,h,g=o!==a?"nextSibling":"previousSibling",m=t.parentNode,y=s&&t.nodeName.toLowerCase(),v=!l&&!s;if(m){if(o){while(g){p=t;while(p=p[g])if(s?p.nodeName.toLowerCase()===y:1===p.nodeType)return!1;h=g="only"===e&&!h&&"nextSibling"}return!0}if(h=[a?m.firstChild:m.lastChild],a&&v){c=m[b]||(m[b]={}),u=c[e]||[],d=u[0]===T&&u[1],f=u[0]===T&&u[2],p=d&&m.childNodes[d];while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if(1===p.nodeType&&++f&&p===t){c[e]=[T,d,f];break}}else if(v&&(u=(t[b]||(t[b]={}))[e])&&u[0]===T)f=u[1];else while(p=++d&&p&&p[g]||(f=d=0)||h.pop())if((s?p.nodeName.toLowerCase()===y:1===p.nodeType)&&++f&&(v&&((p[b]||(p[b]={}))[e]=[T,f]),p===t))break;return f-=i,f===r||0===f%r&&f/r>=0}}},PSEUDO:function(e,t){var n,r=o.pseudos[e]||o.setFilters[e.toLowerCase()]||at.error("unsupported pseudo: "+e);return r[b]?r(t):r.length>1?(n=[e,e,"",t],o.setFilters.hasOwnProperty(e.toLowerCase())?lt(function(e,n){var i,o=r(e,t),a=o.length;while(a--)i=F.call(e,o[a]),e[i]=!(n[i]=o[a])}):function(e){return r(e,0,n)}):r}},pseudos:{not:lt(function(e){var t=[],n=[],r=l(e.replace(z,"$1"));return r[b]?lt(function(e,t,n,i){var o,a=r(e,null,i,[]),s=e.length;while(s--)(o=a[s])&&(e[s]=!(t[s]=o))}):function(e,i,o){return t[0]=e,r(t,null,o,n),!n.pop()}}),has:lt(function(e){return function(t){return at(e,t).length>0}}),contains:lt(function(e){return function(t){return(t.textContent||t.innerText||a(t)).indexOf(e)>-1}}),lang:lt(function(e){return G.test(e||"")||at.error("unsupported lang: "+e),e=e.replace(rt,it).toLowerCase(),function(t){var n;do if(n=h?t.lang:t.getAttribute("xml:lang")||t.getAttribute("lang"))return n=n.toLowerCase(),n===e||0===n.indexOf(e+"-");while((t=t.parentNode)&&1===t.nodeType);return!1}}),target:function(t){var n=e.location&&e.location.hash;return n&&n.slice(1)===t.id},root:function(e){return e===d},focus:function(e){return e===f.activeElement&&(!f.hasFocus||f.hasFocus())&&!!(e.type||e.href||~e.tabIndex)},enabled:function(e){return e.disabled===!1},disabled:function(e){return e.disabled===!0},checked:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&!!e.checked||"option"===t&&!!e.selected},selected:function(e){return e.parentNode&&e.parentNode.selectedIndex,e.selected===!0},empty:function(e){for(e=e.firstChild;e;e=e.nextSibling)if(e.nodeName>"@"||3===e.nodeType||4===e.nodeType)return!1;return!0},parent:function(e){return!o.pseudos.empty(e)},header:function(e){return tt.test(e.nodeName)},input:function(e){return et.test(e.nodeName)},button:function(e){var t=e.nodeName.toLowerCase();return"input"===t&&"button"===e.type||"button"===t},text:function(e){var t;return"input"===e.nodeName.toLowerCase()&&"text"===e.type&&(null==(t=e.getAttribute("type"))||t.toLowerCase()===e.type)},first:ht(function(){return[0]}),last:ht(function(e,t){return[t-1]}),eq:ht(function(e,t,n){return[0>n?n+t:n]}),even:ht(function(e,t){var n=0;for(;t>n;n+=2)e.push(n);return e}),odd:ht(function(e,t){var n=1;for(;t>n;n+=2)e.push(n);return e}),lt:ht(function(e,t,n){var r=0>n?n+t:n;for(;--r>=0;)e.push(r);return e}),gt:ht(function(e,t,n){var r=0>n?n+t:n;for(;t>++r;)e.push(r);return e})}},o.pseudos.nth=o.pseudos.eq;for(n in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})o.pseudos[n]=ft(n);for(n in{submit:!0,reset:!0})o.pseudos[n]=dt(n);function gt(){}gt.prototype=o.filters=o.pseudos,o.setFilters=new gt;function mt(e,t){var n,r,i,a,s,l,u,c=k[e+" "];if(c)return t?0:c.slice(0);s=e,l=[],u=o.preFilter;while(s){(!n||(r=X.exec(s)))&&(r&&(s=s.slice(r[0].length)||s),l.push(i=[])),n=!1,(r=U.exec(s))&&(n=r.shift(),i.push({value:n,type:r[0].replace(z," ")}),s=s.slice(n.length));for(a in o.filter)!(r=Q[a].exec(s))||u[a]&&!(r=u[a](r))||(n=r.shift(),i.push({value:n,type:a,matches:r}),s=s.slice(n.length));if(!n)break}return t?s.length:s?at.error(e):k(e,l).slice(0)}function yt(e){var t=0,n=e.length,r="";for(;n>t;t++)r+=e[t].value;return r}function vt(e,t,n){var r=t.dir,o=n&&"parentNode"===r,a=C++;return t.first?function(t,n,i){while(t=t[r])if(1===t.nodeType||o)return e(t,n,i)}:function(t,n,s){var l,u,c,p=T+" "+a;if(s){while(t=t[r])if((1===t.nodeType||o)&&e(t,n,s))return!0}else while(t=t[r])if(1===t.nodeType||o)if(c=t[b]||(t[b]={}),(u=c[r])&&u[0]===p){if((l=u[1])===!0||l===i)return l===!0}else if(u=c[r]=[p],u[1]=e(t,n,s)||i,u[1]===!0)return!0}}function bt(e){return e.length>1?function(t,n,r){var i=e.length;while(i--)if(!e[i](t,n,r))return!1;return!0}:e[0]}function xt(e,t,n,r,i){var o,a=[],s=0,l=e.length,u=null!=t;for(;l>s;s++)(o=e[s])&&(!n||n(o,r,i))&&(a.push(o),u&&t.push(s));return a}function wt(e,t,n,r,i,o){return r&&!r[b]&&(r=wt(r)),i&&!i[b]&&(i=wt(i,o)),lt(function(o,a,s,l){var u,c,p,f=[],d=[],h=a.length,g=o||Nt(t||"*",s.nodeType?[s]:s,[]),m=!e||!o&&t?g:xt(g,f,e,s,l),y=n?i||(o?e:h||r)?[]:a:m;if(n&&n(m,y,s,l),r){u=xt(y,d),r(u,[],s,l),c=u.length;while(c--)(p=u[c])&&(y[d[c]]=!(m[d[c]]=p))}if(o){if(i||e){if(i){u=[],c=y.length;while(c--)(p=y[c])&&u.push(m[c]=p);i(null,y=[],u,l)}c=y.length;while(c--)(p=y[c])&&(u=i?F.call(o,p):f[c])>-1&&(o[u]=!(a[u]=p))}}else y=xt(y===a?y.splice(h,y.length):y),i?i(null,a,y,l):M.apply(a,y)})}function Tt(e){var t,n,r,i=e.length,a=o.relative[e[0].type],s=a||o.relative[" "],l=a?1:0,c=vt(function(e){return e===t},s,!0),p=vt(function(e){return F.call(t,e)>-1},s,!0),f=[function(e,n,r){return!a&&(r||n!==u)||((t=n).nodeType?c(e,n,r):p(e,n,r))}];for(;i>l;l++)if(n=o.relative[e[l].type])f=[vt(bt(f),n)];else{if(n=o.filter[e[l].type].apply(null,e[l].matches),n[b]){for(r=++l;i>r;r++)if(o.relative[e[r].type])break;return wt(l>1&&bt(f),l>1&&yt(e.slice(0,l-1).concat({value:" "===e[l-2].type?"*":""})).replace(z,"$1"),n,r>l&&Tt(e.slice(l,r)),i>r&&Tt(e=e.slice(r)),i>r&&yt(e))}f.push(n)}return bt(f)}function Ct(e,t){var n=0,r=t.length>0,a=e.length>0,s=function(s,l,c,p,d){var h,g,m,y=[],v=0,b="0",x=s&&[],w=null!=d,C=u,N=s||a&&o.find.TAG("*",d&&l.parentNode||l),k=T+=null==C?1:Math.random()||.1;for(w&&(u=l!==f&&l,i=n);null!=(h=N[b]);b++){if(a&&h){g=0;while(m=e[g++])if(m(h,l,c)){p.push(h);break}w&&(T=k,i=++n)}r&&((h=!m&&h)&&v--,s&&x.push(h))}if(v+=b,r&&b!==v){g=0;while(m=t[g++])m(x,y,l,c);if(s){if(v>0)while(b--)x[b]||y[b]||(y[b]=q.call(p));y=xt(y)}M.apply(p,y),w&&!s&&y.length>0&&v+t.length>1&&at.uniqueSort(p)}return w&&(T=k,u=C),x};return r?lt(s):s}l=at.compile=function(e,t){var n,r=[],i=[],o=E[e+" "];if(!o){t||(t=mt(e)),n=t.length;while(n--)o=Tt(t[n]),o[b]?r.push(o):i.push(o);o=E(e,Ct(i,r))}return o};function Nt(e,t,n){var r=0,i=t.length;for(;i>r;r++)at(e,t[r],n);return n}function kt(e,t,n,i){var a,s,u,c,p,f=mt(e);if(!i&&1===f.length){if(s=f[0]=f[0].slice(0),s.length>2&&"ID"===(u=s[0]).type&&r.getById&&9===t.nodeType&&h&&o.relative[s[1].type]){if(t=(o.find.ID(u.matches[0].replace(rt,it),t)||[])[0],!t)return n;e=e.slice(s.shift().value.length)}a=Q.needsContext.test(e)?0:s.length;while(a--){if(u=s[a],o.relative[c=u.type])break;if((p=o.find[c])&&(i=p(u.matches[0].replace(rt,it),V.test(s[0].type)&&t.parentNode||t))){if(s.splice(a,1),e=i.length&&yt(s),!e)return M.apply(n,i),n;break}}}return l(e,f)(i,t,!h,n,V.test(e)),n}r.sortStable=b.split("").sort(A).join("")===b,r.detectDuplicates=S,p(),r.sortDetached=ut(function(e){return 1&e.compareDocumentPosition(f.createElement("div"))}),ut(function(e){return e.innerHTML="<a href='#'></a>","#"===e.firstChild.getAttribute("href")})||ct("type|href|height|width",function(e,n,r){return r?t:e.getAttribute(n,"type"===n.toLowerCase()?1:2)}),r.attributes&&ut(function(e){return e.innerHTML="<input/>",e.firstChild.setAttribute("value",""),""===e.firstChild.getAttribute("value")})||ct("value",function(e,n,r){return r||"input"!==e.nodeName.toLowerCase()?t:e.defaultValue}),ut(function(e){return null==e.getAttribute("disabled")})||ct(B,function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&i.specified?i.value:e[n]===!0?n.toLowerCase():null}),x.find=at,x.expr=at.selectors,x.expr[":"]=x.expr.pseudos,x.unique=at.uniqueSort,x.text=at.getText,x.isXMLDoc=at.isXML,x.contains=at.contains}(e);var O={};function F(e){var t=O[e]={};return x.each(e.match(T)||[],function(e,n){t[n]=!0}),t}x.Callbacks=function(e){e="string"==typeof e?O[e]||F(e):x.extend({},e);var n,r,i,o,a,s,l=[],u=!e.once&&[],c=function(t){for(r=e.memory&&t,i=!0,a=s||0,s=0,o=l.length,n=!0;l&&o>a;a++)if(l[a].apply(t[0],t[1])===!1&&e.stopOnFalse){r=!1;break}n=!1,l&&(u?u.length&&c(u.shift()):r?l=[]:p.disable())},p={add:function(){if(l){var t=l.length;(function i(t){x.each(t,function(t,n){var r=x.type(n);"function"===r?e.unique&&p.has(n)||l.push(n):n&&n.length&&"string"!==r&&i(n)})})(arguments),n?o=l.length:r&&(s=t,c(r))}return this},remove:function(){return l&&x.each(arguments,function(e,t){var r;while((r=x.inArray(t,l,r))>-1)l.splice(r,1),n&&(o>=r&&o--,a>=r&&a--)}),this},has:function(e){return e?x.inArray(e,l)>-1:!(!l||!l.length)},empty:function(){return l=[],o=0,this},disable:function(){return l=u=r=t,this},disabled:function(){return!l},lock:function(){return u=t,r||p.disable(),this},locked:function(){return!u},fireWith:function(e,t){return!l||i&&!u||(t=t||[],t=[e,t.slice?t.slice():t],n?u.push(t):c(t)),this},fire:function(){return p.fireWith(this,arguments),this},fired:function(){return!!i}};return p},x.extend({Deferred:function(e){var t=[["resolve","done",x.Callbacks("once memory"),"resolved"],["reject","fail",x.Callbacks("once memory"),"rejected"],["notify","progress",x.Callbacks("memory")]],n="pending",r={state:function(){return n},always:function(){return i.done(arguments).fail(arguments),this},then:function(){var e=arguments;return x.Deferred(function(n){x.each(t,function(t,o){var a=o[0],s=x.isFunction(e[t])&&e[t];i[o[1]](function(){var e=s&&s.apply(this,arguments);e&&x.isFunction(e.promise)?e.promise().done(n.resolve).fail(n.reject).progress(n.notify):n[a+"With"](this===r?n.promise():this,s?[e]:arguments)})}),e=null}).promise()},promise:function(e){return null!=e?x.extend(e,r):r}},i={};return r.pipe=r.then,x.each(t,function(e,o){var a=o[2],s=o[3];r[o[1]]=a.add,s&&a.add(function(){n=s},t[1^e][2].disable,t[2][2].lock),i[o[0]]=function(){return i[o[0]+"With"](this===i?r:this,arguments),this},i[o[0]+"With"]=a.fireWith}),r.promise(i),e&&e.call(i,i),i},when:function(e){var t=0,n=g.call(arguments),r=n.length,i=1!==r||e&&x.isFunction(e.promise)?r:0,o=1===i?e:x.Deferred(),a=function(e,t,n){return function(r){t[e]=this,n[e]=arguments.length>1?g.call(arguments):r,n===s?o.notifyWith(t,n):--i||o.resolveWith(t,n)}},s,l,u;if(r>1)for(s=Array(r),l=Array(r),u=Array(r);r>t;t++)n[t]&&x.isFunction(n[t].promise)?n[t].promise().done(a(t,u,n)).fail(o.reject).progress(a(t,l,s)):--i;return i||o.resolveWith(u,n),o.promise()}}),x.support=function(t){var n,r,o,s,l,u,c,p,f,d=a.createElement("div");if(d.setAttribute("className","t"),d.innerHTML="  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",n=d.getElementsByTagName("*")||[],r=d.getElementsByTagName("a")[0],!r||!r.style||!n.length)return t;s=a.createElement("select"),u=s.appendChild(a.createElement("option")),o=d.getElementsByTagName("input")[0],r.style.cssText="top:1px;float:left;opacity:.5",t.getSetAttribute="t"!==d.className,t.leadingWhitespace=3===d.firstChild.nodeType,t.tbody=!d.getElementsByTagName("tbody").length,t.htmlSerialize=!!d.getElementsByTagName("link").length,t.style=/top/.test(r.getAttribute("style")),t.hrefNormalized="/a"===r.getAttribute("href"),t.opacity=/^0.5/.test(r.style.opacity),t.cssFloat=!!r.style.cssFloat,t.checkOn=!!o.value,t.optSelected=u.selected,t.enctype=!!a.createElement("form").enctype,t.html5Clone="<:nav></:nav>"!==a.createElement("nav").cloneNode(!0).outerHTML,t.inlineBlockNeedsLayout=!1,t.shrinkWrapBlocks=!1,t.pixelPosition=!1,t.deleteExpando=!0,t.noCloneEvent=!0,t.reliableMarginRight=!0,t.boxSizingReliable=!0,o.checked=!0,t.noCloneChecked=o.cloneNode(!0).checked,s.disabled=!0,t.optDisabled=!u.disabled;try{delete d.test}catch(h){t.deleteExpando=!1}o=a.createElement("input"),o.setAttribute("value",""),t.input=""===o.getAttribute("value"),o.value="t",o.setAttribute("type","radio"),t.radioValue="t"===o.value,o.setAttribute("checked","t"),o.setAttribute("name","t"),l=a.createDocumentFragment(),l.appendChild(o),t.appendChecked=o.checked,t.checkClone=l.cloneNode(!0).cloneNode(!0).lastChild.checked,d.attachEvent&&(d.attachEvent("onclick",function(){t.noCloneEvent=!1}),d.cloneNode(!0).click());for(f in{submit:!0,change:!0,focusin:!0})d.setAttribute(c="on"+f,"t"),t[f+"Bubbles"]=c in e||d.attributes[c].expando===!1;d.style.backgroundClip="content-box",d.cloneNode(!0).style.backgroundClip="",t.clearCloneStyle="content-box"===d.style.backgroundClip;for(f in x(t))break;return t.ownLast="0"!==f,x(function(){var n,r,o,s="padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",l=a.getElementsByTagName("body")[0];l&&(n=a.createElement("div"),n.style.cssText="border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px",l.appendChild(n).appendChild(d),d.innerHTML="<table><tr><td></td><td>t</td></tr></table>",o=d.getElementsByTagName("td"),o[0].style.cssText="padding:0;margin:0;border:0;display:none",p=0===o[0].offsetHeight,o[0].style.display="",o[1].style.display="none",t.reliableHiddenOffsets=p&&0===o[0].offsetHeight,d.innerHTML="",d.style.cssText="box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;",x.swap(l,null!=l.style.zoom?{zoom:1}:{},function(){t.boxSizing=4===d.offsetWidth}),e.getComputedStyle&&(t.pixelPosition="1%"!==(e.getComputedStyle(d,null)||{}).top,t.boxSizingReliable="4px"===(e.getComputedStyle(d,null)||{width:"4px"}).width,r=d.appendChild(a.createElement("div")),r.style.cssText=d.style.cssText=s,r.style.marginRight=r.style.width="0",d.style.width="1px",t.reliableMarginRight=!parseFloat((e.getComputedStyle(r,null)||{}).marginRight)),typeof d.style.zoom!==i&&(d.innerHTML="",d.style.cssText=s+"width:1px;padding:1px;display:inline;zoom:1",t.inlineBlockNeedsLayout=3===d.offsetWidth,d.style.display="block",d.innerHTML="<div></div>",d.firstChild.style.width="5px",t.shrinkWrapBlocks=3!==d.offsetWidth,t.inlineBlockNeedsLayout&&(l.style.zoom=1)),l.removeChild(n),n=d=o=r=null)}),n=s=l=u=r=o=null,t
}({});var B=/(?:\{[\s\S]*\}|\[[\s\S]*\])$/,P=/([A-Z])/g;function R(e,n,r,i){if(x.acceptData(e)){var o,a,s=x.expando,l=e.nodeType,u=l?x.cache:e,c=l?e[s]:e[s]&&s;if(c&&u[c]&&(i||u[c].data)||r!==t||"string"!=typeof n)return c||(c=l?e[s]=p.pop()||x.guid++:s),u[c]||(u[c]=l?{}:{toJSON:x.noop}),("object"==typeof n||"function"==typeof n)&&(i?u[c]=x.extend(u[c],n):u[c].data=x.extend(u[c].data,n)),a=u[c],i||(a.data||(a.data={}),a=a.data),r!==t&&(a[x.camelCase(n)]=r),"string"==typeof n?(o=a[n],null==o&&(o=a[x.camelCase(n)])):o=a,o}}function W(e,t,n){if(x.acceptData(e)){var r,i,o=e.nodeType,a=o?x.cache:e,s=o?e[x.expando]:x.expando;if(a[s]){if(t&&(r=n?a[s]:a[s].data)){x.isArray(t)?t=t.concat(x.map(t,x.camelCase)):t in r?t=[t]:(t=x.camelCase(t),t=t in r?[t]:t.split(" ")),i=t.length;while(i--)delete r[t[i]];if(n?!I(r):!x.isEmptyObject(r))return}(n||(delete a[s].data,I(a[s])))&&(o?x.cleanData([e],!0):x.support.deleteExpando||a!=a.window?delete a[s]:a[s]=null)}}}x.extend({cache:{},noData:{applet:!0,embed:!0,object:"clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"},hasData:function(e){return e=e.nodeType?x.cache[e[x.expando]]:e[x.expando],!!e&&!I(e)},data:function(e,t,n){return R(e,t,n)},removeData:function(e,t){return W(e,t)},_data:function(e,t,n){return R(e,t,n,!0)},_removeData:function(e,t){return W(e,t,!0)},acceptData:function(e){if(e.nodeType&&1!==e.nodeType&&9!==e.nodeType)return!1;var t=e.nodeName&&x.noData[e.nodeName.toLowerCase()];return!t||t!==!0&&e.getAttribute("classid")===t}}),x.fn.extend({data:function(e,n){var r,i,o=null,a=0,s=this[0];if(e===t){if(this.length&&(o=x.data(s),1===s.nodeType&&!x._data(s,"parsedAttrs"))){for(r=s.attributes;r.length>a;a++)i=r[a].name,0===i.indexOf("data-")&&(i=x.camelCase(i.slice(5)),$(s,i,o[i]));x._data(s,"parsedAttrs",!0)}return o}return"object"==typeof e?this.each(function(){x.data(this,e)}):arguments.length>1?this.each(function(){x.data(this,e,n)}):s?$(s,e,x.data(s,e)):null},removeData:function(e){return this.each(function(){x.removeData(this,e)})}});function $(e,n,r){if(r===t&&1===e.nodeType){var i="data-"+n.replace(P,"-$1").toLowerCase();if(r=e.getAttribute(i),"string"==typeof r){try{r="true"===r?!0:"false"===r?!1:"null"===r?null:+r+""===r?+r:B.test(r)?x.parseJSON(r):r}catch(o){}x.data(e,n,r)}else r=t}return r}function I(e){var t;for(t in e)if(("data"!==t||!x.isEmptyObject(e[t]))&&"toJSON"!==t)return!1;return!0}x.extend({queue:function(e,n,r){var i;return e?(n=(n||"fx")+"queue",i=x._data(e,n),r&&(!i||x.isArray(r)?i=x._data(e,n,x.makeArray(r)):i.push(r)),i||[]):t},dequeue:function(e,t){t=t||"fx";var n=x.queue(e,t),r=n.length,i=n.shift(),o=x._queueHooks(e,t),a=function(){x.dequeue(e,t)};"inprogress"===i&&(i=n.shift(),r--),i&&("fx"===t&&n.unshift("inprogress"),delete o.stop,i.call(e,a,o)),!r&&o&&o.empty.fire()},_queueHooks:function(e,t){var n=t+"queueHooks";return x._data(e,n)||x._data(e,n,{empty:x.Callbacks("once memory").add(function(){x._removeData(e,t+"queue"),x._removeData(e,n)})})}}),x.fn.extend({queue:function(e,n){var r=2;return"string"!=typeof e&&(n=e,e="fx",r--),r>arguments.length?x.queue(this[0],e):n===t?this:this.each(function(){var t=x.queue(this,e,n);x._queueHooks(this,e),"fx"===e&&"inprogress"!==t[0]&&x.dequeue(this,e)})},dequeue:function(e){return this.each(function(){x.dequeue(this,e)})},delay:function(e,t){return e=x.fx?x.fx.speeds[e]||e:e,t=t||"fx",this.queue(t,function(t,n){var r=setTimeout(t,e);n.stop=function(){clearTimeout(r)}})},clearQueue:function(e){return this.queue(e||"fx",[])},promise:function(e,n){var r,i=1,o=x.Deferred(),a=this,s=this.length,l=function(){--i||o.resolveWith(a,[a])};"string"!=typeof e&&(n=e,e=t),e=e||"fx";while(s--)r=x._data(a[s],e+"queueHooks"),r&&r.empty&&(i++,r.empty.add(l));return l(),o.promise(n)}});var z,X,U=/[\t\r\n\f]/g,V=/\r/g,Y=/^(?:input|select|textarea|button|object)$/i,J=/^(?:a|area)$/i,G=/^(?:checked|selected)$/i,Q=x.support.getSetAttribute,K=x.support.input;x.fn.extend({attr:function(e,t){return x.access(this,x.attr,e,t,arguments.length>1)},removeAttr:function(e){return this.each(function(){x.removeAttr(this,e)})},prop:function(e,t){return x.access(this,x.prop,e,t,arguments.length>1)},removeProp:function(e){return e=x.propFix[e]||e,this.each(function(){try{this[e]=t,delete this[e]}catch(n){}})},addClass:function(e){var t,n,r,i,o,a=0,s=this.length,l="string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).addClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):" ")){o=0;while(i=t[o++])0>r.indexOf(" "+i+" ")&&(r+=i+" ");n.className=x.trim(r)}return this},removeClass:function(e){var t,n,r,i,o,a=0,s=this.length,l=0===arguments.length||"string"==typeof e&&e;if(x.isFunction(e))return this.each(function(t){x(this).removeClass(e.call(this,t,this.className))});if(l)for(t=(e||"").match(T)||[];s>a;a++)if(n=this[a],r=1===n.nodeType&&(n.className?(" "+n.className+" ").replace(U," "):"")){o=0;while(i=t[o++])while(r.indexOf(" "+i+" ")>=0)r=r.replace(" "+i+" "," ");n.className=e?x.trim(r):""}return this},toggleClass:function(e,t){var n=typeof e;return"boolean"==typeof t&&"string"===n?t?this.addClass(e):this.removeClass(e):x.isFunction(e)?this.each(function(n){x(this).toggleClass(e.call(this,n,this.className,t),t)}):this.each(function(){if("string"===n){var t,r=0,o=x(this),a=e.match(T)||[];while(t=a[r++])o.hasClass(t)?o.removeClass(t):o.addClass(t)}else(n===i||"boolean"===n)&&(this.className&&x._data(this,"__className__",this.className),this.className=this.className||e===!1?"":x._data(this,"__className__")||"")})},hasClass:function(e){var t=" "+e+" ",n=0,r=this.length;for(;r>n;n++)if(1===this[n].nodeType&&(" "+this[n].className+" ").replace(U," ").indexOf(t)>=0)return!0;return!1},val:function(e){var n,r,i,o=this[0];{if(arguments.length)return i=x.isFunction(e),this.each(function(n){var o;1===this.nodeType&&(o=i?e.call(this,n,x(this).val()):e,null==o?o="":"number"==typeof o?o+="":x.isArray(o)&&(o=x.map(o,function(e){return null==e?"":e+""})),r=x.valHooks[this.type]||x.valHooks[this.nodeName.toLowerCase()],r&&"set"in r&&r.set(this,o,"value")!==t||(this.value=o))});if(o)return r=x.valHooks[o.type]||x.valHooks[o.nodeName.toLowerCase()],r&&"get"in r&&(n=r.get(o,"value"))!==t?n:(n=o.value,"string"==typeof n?n.replace(V,""):null==n?"":n)}}}),x.extend({valHooks:{option:{get:function(e){var t=x.find.attr(e,"value");return null!=t?t:e.text}},select:{get:function(e){var t,n,r=e.options,i=e.selectedIndex,o="select-one"===e.type||0>i,a=o?null:[],s=o?i+1:r.length,l=0>i?s:o?i:0;for(;s>l;l++)if(n=r[l],!(!n.selected&&l!==i||(x.support.optDisabled?n.disabled:null!==n.getAttribute("disabled"))||n.parentNode.disabled&&x.nodeName(n.parentNode,"optgroup"))){if(t=x(n).val(),o)return t;a.push(t)}return a},set:function(e,t){var n,r,i=e.options,o=x.makeArray(t),a=i.length;while(a--)r=i[a],(r.selected=x.inArray(x(r).val(),o)>=0)&&(n=!0);return n||(e.selectedIndex=-1),o}}},attr:function(e,n,r){var o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return typeof e.getAttribute===i?x.prop(e,n,r):(1===s&&x.isXMLDoc(e)||(n=n.toLowerCase(),o=x.attrHooks[n]||(x.expr.match.bool.test(n)?X:z)),r===t?o&&"get"in o&&null!==(a=o.get(e,n))?a:(a=x.find.attr(e,n),null==a?t:a):null!==r?o&&"set"in o&&(a=o.set(e,r,n))!==t?a:(e.setAttribute(n,r+""),r):(x.removeAttr(e,n),t))},removeAttr:function(e,t){var n,r,i=0,o=t&&t.match(T);if(o&&1===e.nodeType)while(n=o[i++])r=x.propFix[n]||n,x.expr.match.bool.test(n)?K&&Q||!G.test(n)?e[r]=!1:e[x.camelCase("default-"+n)]=e[r]=!1:x.attr(e,n,""),e.removeAttribute(Q?n:r)},attrHooks:{type:{set:function(e,t){if(!x.support.radioValue&&"radio"===t&&x.nodeName(e,"input")){var n=e.value;return e.setAttribute("type",t),n&&(e.value=n),t}}}},propFix:{"for":"htmlFor","class":"className"},prop:function(e,n,r){var i,o,a,s=e.nodeType;if(e&&3!==s&&8!==s&&2!==s)return a=1!==s||!x.isXMLDoc(e),a&&(n=x.propFix[n]||n,o=x.propHooks[n]),r!==t?o&&"set"in o&&(i=o.set(e,r,n))!==t?i:e[n]=r:o&&"get"in o&&null!==(i=o.get(e,n))?i:e[n]},propHooks:{tabIndex:{get:function(e){var t=x.find.attr(e,"tabindex");return t?parseInt(t,10):Y.test(e.nodeName)||J.test(e.nodeName)&&e.href?0:-1}}}}),X={set:function(e,t,n){return t===!1?x.removeAttr(e,n):K&&Q||!G.test(n)?e.setAttribute(!Q&&x.propFix[n]||n,n):e[x.camelCase("default-"+n)]=e[n]=!0,n}},x.each(x.expr.match.bool.source.match(/\w+/g),function(e,n){var r=x.expr.attrHandle[n]||x.find.attr;x.expr.attrHandle[n]=K&&Q||!G.test(n)?function(e,n,i){var o=x.expr.attrHandle[n],a=i?t:(x.expr.attrHandle[n]=t)!=r(e,n,i)?n.toLowerCase():null;return x.expr.attrHandle[n]=o,a}:function(e,n,r){return r?t:e[x.camelCase("default-"+n)]?n.toLowerCase():null}}),K&&Q||(x.attrHooks.value={set:function(e,n,r){return x.nodeName(e,"input")?(e.defaultValue=n,t):z&&z.set(e,n,r)}}),Q||(z={set:function(e,n,r){var i=e.getAttributeNode(r);return i||e.setAttributeNode(i=e.ownerDocument.createAttribute(r)),i.value=n+="","value"===r||n===e.getAttribute(r)?n:t}},x.expr.attrHandle.id=x.expr.attrHandle.name=x.expr.attrHandle.coords=function(e,n,r){var i;return r?t:(i=e.getAttributeNode(n))&&""!==i.value?i.value:null},x.valHooks.button={get:function(e,n){var r=e.getAttributeNode(n);return r&&r.specified?r.value:t},set:z.set},x.attrHooks.contenteditable={set:function(e,t,n){z.set(e,""===t?!1:t,n)}},x.each(["width","height"],function(e,n){x.attrHooks[n]={set:function(e,r){return""===r?(e.setAttribute(n,"auto"),r):t}}})),x.support.hrefNormalized||x.each(["href","src"],function(e,t){x.propHooks[t]={get:function(e){return e.getAttribute(t,4)}}}),x.support.style||(x.attrHooks.style={get:function(e){return e.style.cssText||t},set:function(e,t){return e.style.cssText=t+""}}),x.support.optSelected||(x.propHooks.selected={get:function(e){var t=e.parentNode;return t&&(t.selectedIndex,t.parentNode&&t.parentNode.selectedIndex),null}}),x.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){x.propFix[this.toLowerCase()]=this}),x.support.enctype||(x.propFix.enctype="encoding"),x.each(["radio","checkbox"],function(){x.valHooks[this]={set:function(e,n){return x.isArray(n)?e.checked=x.inArray(x(e).val(),n)>=0:t}},x.support.checkOn||(x.valHooks[this].get=function(e){return null===e.getAttribute("value")?"on":e.value})});var Z=/^(?:input|select|textarea)$/i,et=/^key/,tt=/^(?:mouse|contextmenu)|click/,nt=/^(?:focusinfocus|focusoutblur)$/,rt=/^([^.]*)(?:\.(.+)|)$/;function it(){return!0}function ot(){return!1}function at(){try{return a.activeElement}catch(e){}}x.event={global:{},add:function(e,n,r,o,a){var s,l,u,c,p,f,d,h,g,m,y,v=x._data(e);if(v){r.handler&&(c=r,r=c.handler,a=c.selector),r.guid||(r.guid=x.guid++),(l=v.events)||(l=v.events={}),(f=v.handle)||(f=v.handle=function(e){return typeof x===i||e&&x.event.triggered===e.type?t:x.event.dispatch.apply(f.elem,arguments)},f.elem=e),n=(n||"").match(T)||[""],u=n.length;while(u--)s=rt.exec(n[u])||[],g=y=s[1],m=(s[2]||"").split(".").sort(),g&&(p=x.event.special[g]||{},g=(a?p.delegateType:p.bindType)||g,p=x.event.special[g]||{},d=x.extend({type:g,origType:y,data:o,handler:r,guid:r.guid,selector:a,needsContext:a&&x.expr.match.needsContext.test(a),namespace:m.join(".")},c),(h=l[g])||(h=l[g]=[],h.delegateCount=0,p.setup&&p.setup.call(e,o,m,f)!==!1||(e.addEventListener?e.addEventListener(g,f,!1):e.attachEvent&&e.attachEvent("on"+g,f))),p.add&&(p.add.call(e,d),d.handler.guid||(d.handler.guid=r.guid)),a?h.splice(h.delegateCount++,0,d):h.push(d),x.event.global[g]=!0);e=null}},remove:function(e,t,n,r,i){var o,a,s,l,u,c,p,f,d,h,g,m=x.hasData(e)&&x._data(e);if(m&&(c=m.events)){t=(t||"").match(T)||[""],u=t.length;while(u--)if(s=rt.exec(t[u])||[],d=g=s[1],h=(s[2]||"").split(".").sort(),d){p=x.event.special[d]||{},d=(r?p.delegateType:p.bindType)||d,f=c[d]||[],s=s[2]&&RegExp("(^|\\.)"+h.join("\\.(?:.*\\.|)")+"(\\.|$)"),l=o=f.length;while(o--)a=f[o],!i&&g!==a.origType||n&&n.guid!==a.guid||s&&!s.test(a.namespace)||r&&r!==a.selector&&("**"!==r||!a.selector)||(f.splice(o,1),a.selector&&f.delegateCount--,p.remove&&p.remove.call(e,a));l&&!f.length&&(p.teardown&&p.teardown.call(e,h,m.handle)!==!1||x.removeEvent(e,d,m.handle),delete c[d])}else for(d in c)x.event.remove(e,d+t[u],n,r,!0);x.isEmptyObject(c)&&(delete m.handle,x._removeData(e,"events"))}},trigger:function(n,r,i,o){var s,l,u,c,p,f,d,h=[i||a],g=v.call(n,"type")?n.type:n,m=v.call(n,"namespace")?n.namespace.split("."):[];if(u=f=i=i||a,3!==i.nodeType&&8!==i.nodeType&&!nt.test(g+x.event.triggered)&&(g.indexOf(".")>=0&&(m=g.split("."),g=m.shift(),m.sort()),l=0>g.indexOf(":")&&"on"+g,n=n[x.expando]?n:new x.Event(g,"object"==typeof n&&n),n.isTrigger=o?2:3,n.namespace=m.join("."),n.namespace_re=n.namespace?RegExp("(^|\\.)"+m.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,n.result=t,n.target||(n.target=i),r=null==r?[n]:x.makeArray(r,[n]),p=x.event.special[g]||{},o||!p.trigger||p.trigger.apply(i,r)!==!1)){if(!o&&!p.noBubble&&!x.isWindow(i)){for(c=p.delegateType||g,nt.test(c+g)||(u=u.parentNode);u;u=u.parentNode)h.push(u),f=u;f===(i.ownerDocument||a)&&h.push(f.defaultView||f.parentWindow||e)}d=0;while((u=h[d++])&&!n.isPropagationStopped())n.type=d>1?c:p.bindType||g,s=(x._data(u,"events")||{})[n.type]&&x._data(u,"handle"),s&&s.apply(u,r),s=l&&u[l],s&&x.acceptData(u)&&s.apply&&s.apply(u,r)===!1&&n.preventDefault();if(n.type=g,!o&&!n.isDefaultPrevented()&&(!p._default||p._default.apply(h.pop(),r)===!1)&&x.acceptData(i)&&l&&i[g]&&!x.isWindow(i)){f=i[l],f&&(i[l]=null),x.event.triggered=g;try{i[g]()}catch(y){}x.event.triggered=t,f&&(i[l]=f)}return n.result}},dispatch:function(e){e=x.event.fix(e);var n,r,i,o,a,s=[],l=g.call(arguments),u=(x._data(this,"events")||{})[e.type]||[],c=x.event.special[e.type]||{};if(l[0]=e,e.delegateTarget=this,!c.preDispatch||c.preDispatch.call(this,e)!==!1){s=x.event.handlers.call(this,e,u),n=0;while((o=s[n++])&&!e.isPropagationStopped()){e.currentTarget=o.elem,a=0;while((i=o.handlers[a++])&&!e.isImmediatePropagationStopped())(!e.namespace_re||e.namespace_re.test(i.namespace))&&(e.handleObj=i,e.data=i.data,r=((x.event.special[i.origType]||{}).handle||i.handler).apply(o.elem,l),r!==t&&(e.result=r)===!1&&(e.preventDefault(),e.stopPropagation()))}return c.postDispatch&&c.postDispatch.call(this,e),e.result}},handlers:function(e,n){var r,i,o,a,s=[],l=n.delegateCount,u=e.target;if(l&&u.nodeType&&(!e.button||"click"!==e.type))for(;u!=this;u=u.parentNode||this)if(1===u.nodeType&&(u.disabled!==!0||"click"!==e.type)){for(o=[],a=0;l>a;a++)i=n[a],r=i.selector+" ",o[r]===t&&(o[r]=i.needsContext?x(r,this).index(u)>=0:x.find(r,this,null,[u]).length),o[r]&&o.push(i);o.length&&s.push({elem:u,handlers:o})}return n.length>l&&s.push({elem:this,handlers:n.slice(l)}),s},fix:function(e){if(e[x.expando])return e;var t,n,r,i=e.type,o=e,s=this.fixHooks[i];s||(this.fixHooks[i]=s=tt.test(i)?this.mouseHooks:et.test(i)?this.keyHooks:{}),r=s.props?this.props.concat(s.props):this.props,e=new x.Event(o),t=r.length;while(t--)n=r[t],e[n]=o[n];return e.target||(e.target=o.srcElement||a),3===e.target.nodeType&&(e.target=e.target.parentNode),e.metaKey=!!e.metaKey,s.filter?s.filter(e,o):e},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(e,t){return null==e.which&&(e.which=null!=t.charCode?t.charCode:t.keyCode),e}},mouseHooks:{props:"button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(e,n){var r,i,o,s=n.button,l=n.fromElement;return null==e.pageX&&null!=n.clientX&&(i=e.target.ownerDocument||a,o=i.documentElement,r=i.body,e.pageX=n.clientX+(o&&o.scrollLeft||r&&r.scrollLeft||0)-(o&&o.clientLeft||r&&r.clientLeft||0),e.pageY=n.clientY+(o&&o.scrollTop||r&&r.scrollTop||0)-(o&&o.clientTop||r&&r.clientTop||0)),!e.relatedTarget&&l&&(e.relatedTarget=l===e.target?n.toElement:l),e.which||s===t||(e.which=1&s?1:2&s?3:4&s?2:0),e}},special:{load:{noBubble:!0},focus:{trigger:function(){if(this!==at()&&this.focus)try{return this.focus(),!1}catch(e){}},delegateType:"focusin"},blur:{trigger:function(){return this===at()&&this.blur?(this.blur(),!1):t},delegateType:"focusout"},click:{trigger:function(){return x.nodeName(this,"input")&&"checkbox"===this.type&&this.click?(this.click(),!1):t},_default:function(e){return x.nodeName(e.target,"a")}},beforeunload:{postDispatch:function(e){e.result!==t&&(e.originalEvent.returnValue=e.result)}}},simulate:function(e,t,n,r){var i=x.extend(new x.Event,n,{type:e,isSimulated:!0,originalEvent:{}});r?x.event.trigger(i,null,t):x.event.dispatch.call(t,i),i.isDefaultPrevented()&&n.preventDefault()}},x.removeEvent=a.removeEventListener?function(e,t,n){e.removeEventListener&&e.removeEventListener(t,n,!1)}:function(e,t,n){var r="on"+t;e.detachEvent&&(typeof e[r]===i&&(e[r]=null),e.detachEvent(r,n))},x.Event=function(e,n){return this instanceof x.Event?(e&&e.type?(this.originalEvent=e,this.type=e.type,this.isDefaultPrevented=e.defaultPrevented||e.returnValue===!1||e.getPreventDefault&&e.getPreventDefault()?it:ot):this.type=e,n&&x.extend(this,n),this.timeStamp=e&&e.timeStamp||x.now(),this[x.expando]=!0,t):new x.Event(e,n)},x.Event.prototype={isDefaultPrevented:ot,isPropagationStopped:ot,isImmediatePropagationStopped:ot,preventDefault:function(){var e=this.originalEvent;this.isDefaultPrevented=it,e&&(e.preventDefault?e.preventDefault():e.returnValue=!1)},stopPropagation:function(){var e=this.originalEvent;this.isPropagationStopped=it,e&&(e.stopPropagation&&e.stopPropagation(),e.cancelBubble=!0)},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=it,this.stopPropagation()}},x.each({mouseenter:"mouseover",mouseleave:"mouseout"},function(e,t){x.event.special[e]={delegateType:t,bindType:t,handle:function(e){var n,r=this,i=e.relatedTarget,o=e.handleObj;return(!i||i!==r&&!x.contains(r,i))&&(e.type=o.origType,n=o.handler.apply(this,arguments),e.type=t),n}}}),x.support.submitBubbles||(x.event.special.submit={setup:function(){return x.nodeName(this,"form")?!1:(x.event.add(this,"click._submit keypress._submit",function(e){var n=e.target,r=x.nodeName(n,"input")||x.nodeName(n,"button")?n.form:t;r&&!x._data(r,"submitBubbles")&&(x.event.add(r,"submit._submit",function(e){e._submit_bubble=!0}),x._data(r,"submitBubbles",!0))}),t)},postDispatch:function(e){e._submit_bubble&&(delete e._submit_bubble,this.parentNode&&!e.isTrigger&&x.event.simulate("submit",this.parentNode,e,!0))},teardown:function(){return x.nodeName(this,"form")?!1:(x.event.remove(this,"._submit"),t)}}),x.support.changeBubbles||(x.event.special.change={setup:function(){return Z.test(this.nodeName)?(("checkbox"===this.type||"radio"===this.type)&&(x.event.add(this,"propertychange._change",function(e){"checked"===e.originalEvent.propertyName&&(this._just_changed=!0)}),x.event.add(this,"click._change",function(e){this._just_changed&&!e.isTrigger&&(this._just_changed=!1),x.event.simulate("change",this,e,!0)})),!1):(x.event.add(this,"beforeactivate._change",function(e){var t=e.target;Z.test(t.nodeName)&&!x._data(t,"changeBubbles")&&(x.event.add(t,"change._change",function(e){!this.parentNode||e.isSimulated||e.isTrigger||x.event.simulate("change",this.parentNode,e,!0)}),x._data(t,"changeBubbles",!0))}),t)},handle:function(e){var n=e.target;return this!==n||e.isSimulated||e.isTrigger||"radio"!==n.type&&"checkbox"!==n.type?e.handleObj.handler.apply(this,arguments):t},teardown:function(){return x.event.remove(this,"._change"),!Z.test(this.nodeName)}}),x.support.focusinBubbles||x.each({focus:"focusin",blur:"focusout"},function(e,t){var n=0,r=function(e){x.event.simulate(t,e.target,x.event.fix(e),!0)};x.event.special[t]={setup:function(){0===n++&&a.addEventListener(e,r,!0)},teardown:function(){0===--n&&a.removeEventListener(e,r,!0)}}}),x.fn.extend({on:function(e,n,r,i,o){var a,s;if("object"==typeof e){"string"!=typeof n&&(r=r||n,n=t);for(a in e)this.on(a,n,r,e[a],o);return this}if(null==r&&null==i?(i=n,r=n=t):null==i&&("string"==typeof n?(i=r,r=t):(i=r,r=n,n=t)),i===!1)i=ot;else if(!i)return this;return 1===o&&(s=i,i=function(e){return x().off(e),s.apply(this,arguments)},i.guid=s.guid||(s.guid=x.guid++)),this.each(function(){x.event.add(this,e,i,r,n)})},one:function(e,t,n,r){return this.on(e,t,n,r,1)},off:function(e,n,r){var i,o;if(e&&e.preventDefault&&e.handleObj)return i=e.handleObj,x(e.delegateTarget).off(i.namespace?i.origType+"."+i.namespace:i.origType,i.selector,i.handler),this;if("object"==typeof e){for(o in e)this.off(o,n,e[o]);return this}return(n===!1||"function"==typeof n)&&(r=n,n=t),r===!1&&(r=ot),this.each(function(){x.event.remove(this,e,r,n)})},trigger:function(e,t){return this.each(function(){x.event.trigger(e,t,this)})},triggerHandler:function(e,n){var r=this[0];return r?x.event.trigger(e,n,r,!0):t}});var st=/^.[^:#\[\.,]*$/,lt=/^(?:parents|prev(?:Until|All))/,ut=x.expr.match.needsContext,ct={children:!0,contents:!0,next:!0,prev:!0};x.fn.extend({find:function(e){var t,n=[],r=this,i=r.length;if("string"!=typeof e)return this.pushStack(x(e).filter(function(){for(t=0;i>t;t++)if(x.contains(r[t],this))return!0}));for(t=0;i>t;t++)x.find(e,r[t],n);return n=this.pushStack(i>1?x.unique(n):n),n.selector=this.selector?this.selector+" "+e:e,n},has:function(e){var t,n=x(e,this),r=n.length;return this.filter(function(){for(t=0;r>t;t++)if(x.contains(this,n[t]))return!0})},not:function(e){return this.pushStack(ft(this,e||[],!0))},filter:function(e){return this.pushStack(ft(this,e||[],!1))},is:function(e){return!!ft(this,"string"==typeof e&&ut.test(e)?x(e):e||[],!1).length},closest:function(e,t){var n,r=0,i=this.length,o=[],a=ut.test(e)||"string"!=typeof e?x(e,t||this.context):0;for(;i>r;r++)for(n=this[r];n&&n!==t;n=n.parentNode)if(11>n.nodeType&&(a?a.index(n)>-1:1===n.nodeType&&x.find.matchesSelector(n,e))){n=o.push(n);break}return this.pushStack(o.length>1?x.unique(o):o)},index:function(e){return e?"string"==typeof e?x.inArray(this[0],x(e)):x.inArray(e.jquery?e[0]:e,this):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(e,t){var n="string"==typeof e?x(e,t):x.makeArray(e&&e.nodeType?[e]:e),r=x.merge(this.get(),n);return this.pushStack(x.unique(r))},addBack:function(e){return this.add(null==e?this.prevObject:this.prevObject.filter(e))}});function pt(e,t){do e=e[t];while(e&&1!==e.nodeType);return e}x.each({parent:function(e){var t=e.parentNode;return t&&11!==t.nodeType?t:null},parents:function(e){return x.dir(e,"parentNode")},parentsUntil:function(e,t,n){return x.dir(e,"parentNode",n)},next:function(e){return pt(e,"nextSibling")},prev:function(e){return pt(e,"previousSibling")},nextAll:function(e){return x.dir(e,"nextSibling")},prevAll:function(e){return x.dir(e,"previousSibling")},nextUntil:function(e,t,n){return x.dir(e,"nextSibling",n)},prevUntil:function(e,t,n){return x.dir(e,"previousSibling",n)},siblings:function(e){return x.sibling((e.parentNode||{}).firstChild,e)},children:function(e){return x.sibling(e.firstChild)},contents:function(e){return x.nodeName(e,"iframe")?e.contentDocument||e.contentWindow.document:x.merge([],e.childNodes)}},function(e,t){x.fn[e]=function(n,r){var i=x.map(this,t,n);return"Until"!==e.slice(-5)&&(r=n),r&&"string"==typeof r&&(i=x.filter(r,i)),this.length>1&&(ct[e]||(i=x.unique(i)),lt.test(e)&&(i=i.reverse())),this.pushStack(i)}}),x.extend({filter:function(e,t,n){var r=t[0];return n&&(e=":not("+e+")"),1===t.length&&1===r.nodeType?x.find.matchesSelector(r,e)?[r]:[]:x.find.matches(e,x.grep(t,function(e){return 1===e.nodeType}))},dir:function(e,n,r){var i=[],o=e[n];while(o&&9!==o.nodeType&&(r===t||1!==o.nodeType||!x(o).is(r)))1===o.nodeType&&i.push(o),o=o[n];return i},sibling:function(e,t){var n=[];for(;e;e=e.nextSibling)1===e.nodeType&&e!==t&&n.push(e);return n}});function ft(e,t,n){if(x.isFunction(t))return x.grep(e,function(e,r){return!!t.call(e,r,e)!==n});if(t.nodeType)return x.grep(e,function(e){return e===t!==n});if("string"==typeof t){if(st.test(t))return x.filter(t,e,n);t=x.filter(t,e)}return x.grep(e,function(e){return x.inArray(e,t)>=0!==n})}function dt(e){var t=ht.split("|"),n=e.createDocumentFragment();if(n.createElement)while(t.length)n.createElement(t.pop());return n}var ht="abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",gt=/ jQuery\d+="(?:null|\d+)"/g,mt=RegExp("<(?:"+ht+")[\\s/>]","i"),yt=/^\s+/,vt=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,bt=/<([\w:]+)/,xt=/<tbody/i,wt=/<|&#?\w+;/,Tt=/<(?:script|style|link)/i,Ct=/^(?:checkbox|radio)$/i,Nt=/checked\s*(?:[^=]|=\s*.checked.)/i,kt=/^$|\/(?:java|ecma)script/i,Et=/^true\/(.*)/,St=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,At={option:[1,"<select multiple='multiple'>","</select>"],legend:[1,"<fieldset>","</fieldset>"],area:[1,"<map>","</map>"],param:[1,"<object>","</object>"],thead:[1,"<table>","</table>"],tr:[2,"<table><tbody>","</tbody></table>"],col:[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:x.support.htmlSerialize?[0,"",""]:[1,"X<div>","</div>"]},jt=dt(a),Dt=jt.appendChild(a.createElement("div"));At.optgroup=At.option,At.tbody=At.tfoot=At.colgroup=At.caption=At.thead,At.th=At.td,x.fn.extend({text:function(e){return x.access(this,function(e){return e===t?x.text(this):this.empty().append((this[0]&&this[0].ownerDocument||a).createTextNode(e))},null,e,arguments.length)},append:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.appendChild(e)}})},prepend:function(){return this.domManip(arguments,function(e){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var t=Lt(this,e);t.insertBefore(e,t.firstChild)}})},before:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this)})},after:function(){return this.domManip(arguments,function(e){this.parentNode&&this.parentNode.insertBefore(e,this.nextSibling)})},remove:function(e,t){var n,r=e?x.filter(e,this):this,i=0;for(;null!=(n=r[i]);i++)t||1!==n.nodeType||x.cleanData(Ft(n)),n.parentNode&&(t&&x.contains(n.ownerDocument,n)&&_t(Ft(n,"script")),n.parentNode.removeChild(n));return this},empty:function(){var e,t=0;for(;null!=(e=this[t]);t++){1===e.nodeType&&x.cleanData(Ft(e,!1));while(e.firstChild)e.removeChild(e.firstChild);e.options&&x.nodeName(e,"select")&&(e.options.length=0)}return this},clone:function(e,t){return e=null==e?!1:e,t=null==t?e:t,this.map(function(){return x.clone(this,e,t)})},html:function(e){return x.access(this,function(e){var n=this[0]||{},r=0,i=this.length;if(e===t)return 1===n.nodeType?n.innerHTML.replace(gt,""):t;if(!("string"!=typeof e||Tt.test(e)||!x.support.htmlSerialize&&mt.test(e)||!x.support.leadingWhitespace&&yt.test(e)||At[(bt.exec(e)||["",""])[1].toLowerCase()])){e=e.replace(vt,"<$1></$2>");try{for(;i>r;r++)n=this[r]||{},1===n.nodeType&&(x.cleanData(Ft(n,!1)),n.innerHTML=e);n=0}catch(o){}}n&&this.empty().append(e)},null,e,arguments.length)},replaceWith:function(){var e=x.map(this,function(e){return[e.nextSibling,e.parentNode]}),t=0;return this.domManip(arguments,function(n){var r=e[t++],i=e[t++];i&&(r&&r.parentNode!==i&&(r=this.nextSibling),x(this).remove(),i.insertBefore(n,r))},!0),t?this:this.remove()},detach:function(e){return this.remove(e,!0)},domManip:function(e,t,n){e=d.apply([],e);var r,i,o,a,s,l,u=0,c=this.length,p=this,f=c-1,h=e[0],g=x.isFunction(h);if(g||!(1>=c||"string"!=typeof h||x.support.checkClone)&&Nt.test(h))return this.each(function(r){var i=p.eq(r);g&&(e[0]=h.call(this,r,i.html())),i.domManip(e,t,n)});if(c&&(l=x.buildFragment(e,this[0].ownerDocument,!1,!n&&this),r=l.firstChild,1===l.childNodes.length&&(l=r),r)){for(a=x.map(Ft(l,"script"),Ht),o=a.length;c>u;u++)i=l,u!==f&&(i=x.clone(i,!0,!0),o&&x.merge(a,Ft(i,"script"))),t.call(this[u],i,u);if(o)for(s=a[a.length-1].ownerDocument,x.map(a,qt),u=0;o>u;u++)i=a[u],kt.test(i.type||"")&&!x._data(i,"globalEval")&&x.contains(s,i)&&(i.src?x._evalUrl(i.src):x.globalEval((i.text||i.textContent||i.innerHTML||"").replace(St,"")));l=r=null}return this}});function Lt(e,t){return x.nodeName(e,"table")&&x.nodeName(1===t.nodeType?t:t.firstChild,"tr")?e.getElementsByTagName("tbody")[0]||e.appendChild(e.ownerDocument.createElement("tbody")):e}function Ht(e){return e.type=(null!==x.find.attr(e,"type"))+"/"+e.type,e}function qt(e){var t=Et.exec(e.type);return t?e.type=t[1]:e.removeAttribute("type"),e}function _t(e,t){var n,r=0;for(;null!=(n=e[r]);r++)x._data(n,"globalEval",!t||x._data(t[r],"globalEval"))}function Mt(e,t){if(1===t.nodeType&&x.hasData(e)){var n,r,i,o=x._data(e),a=x._data(t,o),s=o.events;if(s){delete a.handle,a.events={};for(n in s)for(r=0,i=s[n].length;i>r;r++)x.event.add(t,n,s[n][r])}a.data&&(a.data=x.extend({},a.data))}}function Ot(e,t){var n,r,i;if(1===t.nodeType){if(n=t.nodeName.toLowerCase(),!x.support.noCloneEvent&&t[x.expando]){i=x._data(t);for(r in i.events)x.removeEvent(t,r,i.handle);t.removeAttribute(x.expando)}"script"===n&&t.text!==e.text?(Ht(t).text=e.text,qt(t)):"object"===n?(t.parentNode&&(t.outerHTML=e.outerHTML),x.support.html5Clone&&e.innerHTML&&!x.trim(t.innerHTML)&&(t.innerHTML=e.innerHTML)):"input"===n&&Ct.test(e.type)?(t.defaultChecked=t.checked=e.checked,t.value!==e.value&&(t.value=e.value)):"option"===n?t.defaultSelected=t.selected=e.defaultSelected:("input"===n||"textarea"===n)&&(t.defaultValue=e.defaultValue)}}x.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(e,t){x.fn[e]=function(e){var n,r=0,i=[],o=x(e),a=o.length-1;for(;a>=r;r++)n=r===a?this:this.clone(!0),x(o[r])[t](n),h.apply(i,n.get());return this.pushStack(i)}});function Ft(e,n){var r,o,a=0,s=typeof e.getElementsByTagName!==i?e.getElementsByTagName(n||"*"):typeof e.querySelectorAll!==i?e.querySelectorAll(n||"*"):t;if(!s)for(s=[],r=e.childNodes||e;null!=(o=r[a]);a++)!n||x.nodeName(o,n)?s.push(o):x.merge(s,Ft(o,n));return n===t||n&&x.nodeName(e,n)?x.merge([e],s):s}function Bt(e){Ct.test(e.type)&&(e.defaultChecked=e.checked)}x.extend({clone:function(e,t,n){var r,i,o,a,s,l=x.contains(e.ownerDocument,e);if(x.support.html5Clone||x.isXMLDoc(e)||!mt.test("<"+e.nodeName+">")?o=e.cloneNode(!0):(Dt.innerHTML=e.outerHTML,Dt.removeChild(o=Dt.firstChild)),!(x.support.noCloneEvent&&x.support.noCloneChecked||1!==e.nodeType&&11!==e.nodeType||x.isXMLDoc(e)))for(r=Ft(o),s=Ft(e),a=0;null!=(i=s[a]);++a)r[a]&&Ot(i,r[a]);if(t)if(n)for(s=s||Ft(e),r=r||Ft(o),a=0;null!=(i=s[a]);a++)Mt(i,r[a]);else Mt(e,o);return r=Ft(o,"script"),r.length>0&&_t(r,!l&&Ft(e,"script")),r=s=i=null,o},buildFragment:function(e,t,n,r){var i,o,a,s,l,u,c,p=e.length,f=dt(t),d=[],h=0;for(;p>h;h++)if(o=e[h],o||0===o)if("object"===x.type(o))x.merge(d,o.nodeType?[o]:o);else if(wt.test(o)){s=s||f.appendChild(t.createElement("div")),l=(bt.exec(o)||["",""])[1].toLowerCase(),c=At[l]||At._default,s.innerHTML=c[1]+o.replace(vt,"<$1></$2>")+c[2],i=c[0];while(i--)s=s.lastChild;if(!x.support.leadingWhitespace&&yt.test(o)&&d.push(t.createTextNode(yt.exec(o)[0])),!x.support.tbody){o="table"!==l||xt.test(o)?"<table>"!==c[1]||xt.test(o)?0:s:s.firstChild,i=o&&o.childNodes.length;while(i--)x.nodeName(u=o.childNodes[i],"tbody")&&!u.childNodes.length&&o.removeChild(u)}x.merge(d,s.childNodes),s.textContent="";while(s.firstChild)s.removeChild(s.firstChild);s=f.lastChild}else d.push(t.createTextNode(o));s&&f.removeChild(s),x.support.appendChecked||x.grep(Ft(d,"input"),Bt),h=0;while(o=d[h++])if((!r||-1===x.inArray(o,r))&&(a=x.contains(o.ownerDocument,o),s=Ft(f.appendChild(o),"script"),a&&_t(s),n)){i=0;while(o=s[i++])kt.test(o.type||"")&&n.push(o)}return s=null,f},cleanData:function(e,t){var n,r,o,a,s=0,l=x.expando,u=x.cache,c=x.support.deleteExpando,f=x.event.special;for(;null!=(n=e[s]);s++)if((t||x.acceptData(n))&&(o=n[l],a=o&&u[o])){if(a.events)for(r in a.events)f[r]?x.event.remove(n,r):x.removeEvent(n,r,a.handle);
u[o]&&(delete u[o],c?delete n[l]:typeof n.removeAttribute!==i?n.removeAttribute(l):n[l]=null,p.push(o))}},_evalUrl:function(e){return x.ajax({url:e,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})}}),x.fn.extend({wrapAll:function(e){if(x.isFunction(e))return this.each(function(t){x(this).wrapAll(e.call(this,t))});if(this[0]){var t=x(e,this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode&&t.insertBefore(this[0]),t.map(function(){var e=this;while(e.firstChild&&1===e.firstChild.nodeType)e=e.firstChild;return e}).append(this)}return this},wrapInner:function(e){return x.isFunction(e)?this.each(function(t){x(this).wrapInner(e.call(this,t))}):this.each(function(){var t=x(this),n=t.contents();n.length?n.wrapAll(e):t.append(e)})},wrap:function(e){var t=x.isFunction(e);return this.each(function(n){x(this).wrapAll(t?e.call(this,n):e)})},unwrap:function(){return this.parent().each(function(){x.nodeName(this,"body")||x(this).replaceWith(this.childNodes)}).end()}});var Pt,Rt,Wt,$t=/alpha\([^)]*\)/i,It=/opacity\s*=\s*([^)]*)/,zt=/^(top|right|bottom|left)$/,Xt=/^(none|table(?!-c[ea]).+)/,Ut=/^margin/,Vt=RegExp("^("+w+")(.*)$","i"),Yt=RegExp("^("+w+")(?!px)[a-z%]+$","i"),Jt=RegExp("^([+-])=("+w+")","i"),Gt={BODY:"block"},Qt={position:"absolute",visibility:"hidden",display:"block"},Kt={letterSpacing:0,fontWeight:400},Zt=["Top","Right","Bottom","Left"],en=["Webkit","O","Moz","ms"];function tn(e,t){if(t in e)return t;var n=t.charAt(0).toUpperCase()+t.slice(1),r=t,i=en.length;while(i--)if(t=en[i]+n,t in e)return t;return r}function nn(e,t){return e=t||e,"none"===x.css(e,"display")||!x.contains(e.ownerDocument,e)}function rn(e,t){var n,r,i,o=[],a=0,s=e.length;for(;s>a;a++)r=e[a],r.style&&(o[a]=x._data(r,"olddisplay"),n=r.style.display,t?(o[a]||"none"!==n||(r.style.display=""),""===r.style.display&&nn(r)&&(o[a]=x._data(r,"olddisplay",ln(r.nodeName)))):o[a]||(i=nn(r),(n&&"none"!==n||!i)&&x._data(r,"olddisplay",i?n:x.css(r,"display"))));for(a=0;s>a;a++)r=e[a],r.style&&(t&&"none"!==r.style.display&&""!==r.style.display||(r.style.display=t?o[a]||"":"none"));return e}x.fn.extend({css:function(e,n){return x.access(this,function(e,n,r){var i,o,a={},s=0;if(x.isArray(n)){for(o=Rt(e),i=n.length;i>s;s++)a[n[s]]=x.css(e,n[s],!1,o);return a}return r!==t?x.style(e,n,r):x.css(e,n)},e,n,arguments.length>1)},show:function(){return rn(this,!0)},hide:function(){return rn(this)},toggle:function(e){return"boolean"==typeof e?e?this.show():this.hide():this.each(function(){nn(this)?x(this).show():x(this).hide()})}}),x.extend({cssHooks:{opacity:{get:function(e,t){if(t){var n=Wt(e,"opacity");return""===n?"1":n}}}},cssNumber:{columnCount:!0,fillOpacity:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":x.support.cssFloat?"cssFloat":"styleFloat"},style:function(e,n,r,i){if(e&&3!==e.nodeType&&8!==e.nodeType&&e.style){var o,a,s,l=x.camelCase(n),u=e.style;if(n=x.cssProps[l]||(x.cssProps[l]=tn(u,l)),s=x.cssHooks[n]||x.cssHooks[l],r===t)return s&&"get"in s&&(o=s.get(e,!1,i))!==t?o:u[n];if(a=typeof r,"string"===a&&(o=Jt.exec(r))&&(r=(o[1]+1)*o[2]+parseFloat(x.css(e,n)),a="number"),!(null==r||"number"===a&&isNaN(r)||("number"!==a||x.cssNumber[l]||(r+="px"),x.support.clearCloneStyle||""!==r||0!==n.indexOf("background")||(u[n]="inherit"),s&&"set"in s&&(r=s.set(e,r,i))===t)))try{u[n]=r}catch(c){}}},css:function(e,n,r,i){var o,a,s,l=x.camelCase(n);return n=x.cssProps[l]||(x.cssProps[l]=tn(e.style,l)),s=x.cssHooks[n]||x.cssHooks[l],s&&"get"in s&&(a=s.get(e,!0,r)),a===t&&(a=Wt(e,n,i)),"normal"===a&&n in Kt&&(a=Kt[n]),""===r||r?(o=parseFloat(a),r===!0||x.isNumeric(o)?o||0:a):a}}),e.getComputedStyle?(Rt=function(t){return e.getComputedStyle(t,null)},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s.getPropertyValue(n)||s[n]:t,u=e.style;return s&&(""!==l||x.contains(e.ownerDocument,e)||(l=x.style(e,n)),Yt.test(l)&&Ut.test(n)&&(i=u.width,o=u.minWidth,a=u.maxWidth,u.minWidth=u.maxWidth=u.width=l,l=s.width,u.width=i,u.minWidth=o,u.maxWidth=a)),l}):a.documentElement.currentStyle&&(Rt=function(e){return e.currentStyle},Wt=function(e,n,r){var i,o,a,s=r||Rt(e),l=s?s[n]:t,u=e.style;return null==l&&u&&u[n]&&(l=u[n]),Yt.test(l)&&!zt.test(n)&&(i=u.left,o=e.runtimeStyle,a=o&&o.left,a&&(o.left=e.currentStyle.left),u.left="fontSize"===n?"1em":l,l=u.pixelLeft+"px",u.left=i,a&&(o.left=a)),""===l?"auto":l});function on(e,t,n){var r=Vt.exec(t);return r?Math.max(0,r[1]-(n||0))+(r[2]||"px"):t}function an(e,t,n,r,i){var o=n===(r?"border":"content")?4:"width"===t?1:0,a=0;for(;4>o;o+=2)"margin"===n&&(a+=x.css(e,n+Zt[o],!0,i)),r?("content"===n&&(a-=x.css(e,"padding"+Zt[o],!0,i)),"margin"!==n&&(a-=x.css(e,"border"+Zt[o]+"Width",!0,i))):(a+=x.css(e,"padding"+Zt[o],!0,i),"padding"!==n&&(a+=x.css(e,"border"+Zt[o]+"Width",!0,i)));return a}function sn(e,t,n){var r=!0,i="width"===t?e.offsetWidth:e.offsetHeight,o=Rt(e),a=x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,o);if(0>=i||null==i){if(i=Wt(e,t,o),(0>i||null==i)&&(i=e.style[t]),Yt.test(i))return i;r=a&&(x.support.boxSizingReliable||i===e.style[t]),i=parseFloat(i)||0}return i+an(e,t,n||(a?"border":"content"),r,o)+"px"}function ln(e){var t=a,n=Gt[e];return n||(n=un(e,t),"none"!==n&&n||(Pt=(Pt||x("<iframe frameborder='0' width='0' height='0'/>").css("cssText","display:block !important")).appendTo(t.documentElement),t=(Pt[0].contentWindow||Pt[0].contentDocument).document,t.write("<!doctype html><html><body>"),t.close(),n=un(e,t),Pt.detach()),Gt[e]=n),n}function un(e,t){var n=x(t.createElement(e)).appendTo(t.body),r=x.css(n[0],"display");return n.remove(),r}x.each(["height","width"],function(e,n){x.cssHooks[n]={get:function(e,r,i){return r?0===e.offsetWidth&&Xt.test(x.css(e,"display"))?x.swap(e,Qt,function(){return sn(e,n,i)}):sn(e,n,i):t},set:function(e,t,r){var i=r&&Rt(e);return on(e,t,r?an(e,n,r,x.support.boxSizing&&"border-box"===x.css(e,"boxSizing",!1,i),i):0)}}}),x.support.opacity||(x.cssHooks.opacity={get:function(e,t){return It.test((t&&e.currentStyle?e.currentStyle.filter:e.style.filter)||"")?.01*parseFloat(RegExp.$1)+"":t?"1":""},set:function(e,t){var n=e.style,r=e.currentStyle,i=x.isNumeric(t)?"alpha(opacity="+100*t+")":"",o=r&&r.filter||n.filter||"";n.zoom=1,(t>=1||""===t)&&""===x.trim(o.replace($t,""))&&n.removeAttribute&&(n.removeAttribute("filter"),""===t||r&&!r.filter)||(n.filter=$t.test(o)?o.replace($t,i):o+" "+i)}}),x(function(){x.support.reliableMarginRight||(x.cssHooks.marginRight={get:function(e,n){return n?x.swap(e,{display:"inline-block"},Wt,[e,"marginRight"]):t}}),!x.support.pixelPosition&&x.fn.position&&x.each(["top","left"],function(e,n){x.cssHooks[n]={get:function(e,r){return r?(r=Wt(e,n),Yt.test(r)?x(e).position()[n]+"px":r):t}}})}),x.expr&&x.expr.filters&&(x.expr.filters.hidden=function(e){return 0>=e.offsetWidth&&0>=e.offsetHeight||!x.support.reliableHiddenOffsets&&"none"===(e.style&&e.style.display||x.css(e,"display"))},x.expr.filters.visible=function(e){return!x.expr.filters.hidden(e)}),x.each({margin:"",padding:"",border:"Width"},function(e,t){x.cssHooks[e+t]={expand:function(n){var r=0,i={},o="string"==typeof n?n.split(" "):[n];for(;4>r;r++)i[e+Zt[r]+t]=o[r]||o[r-2]||o[0];return i}},Ut.test(e)||(x.cssHooks[e+t].set=on)});var cn=/%20/g,pn=/\[\]$/,fn=/\r?\n/g,dn=/^(?:submit|button|image|reset|file)$/i,hn=/^(?:input|select|textarea|keygen)/i;x.fn.extend({serialize:function(){return x.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var e=x.prop(this,"elements");return e?x.makeArray(e):this}).filter(function(){var e=this.type;return this.name&&!x(this).is(":disabled")&&hn.test(this.nodeName)&&!dn.test(e)&&(this.checked||!Ct.test(e))}).map(function(e,t){var n=x(this).val();return null==n?null:x.isArray(n)?x.map(n,function(e){return{name:t.name,value:e.replace(fn,"\r\n")}}):{name:t.name,value:n.replace(fn,"\r\n")}}).get()}}),x.param=function(e,n){var r,i=[],o=function(e,t){t=x.isFunction(t)?t():null==t?"":t,i[i.length]=encodeURIComponent(e)+"="+encodeURIComponent(t)};if(n===t&&(n=x.ajaxSettings&&x.ajaxSettings.traditional),x.isArray(e)||e.jquery&&!x.isPlainObject(e))x.each(e,function(){o(this.name,this.value)});else for(r in e)gn(r,e[r],n,o);return i.join("&").replace(cn,"+")};function gn(e,t,n,r){var i;if(x.isArray(t))x.each(t,function(t,i){n||pn.test(e)?r(e,i):gn(e+"["+("object"==typeof i?t:"")+"]",i,n,r)});else if(n||"object"!==x.type(t))r(e,t);else for(i in t)gn(e+"["+i+"]",t[i],n,r)}x.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(e,t){x.fn[t]=function(e,n){return arguments.length>0?this.on(t,null,e,n):this.trigger(t)}}),x.fn.extend({hover:function(e,t){return this.mouseenter(e).mouseleave(t||e)},bind:function(e,t,n){return this.on(e,null,t,n)},unbind:function(e,t){return this.off(e,null,t)},delegate:function(e,t,n,r){return this.on(t,e,n,r)},undelegate:function(e,t,n){return 1===arguments.length?this.off(e,"**"):this.off(t,e||"**",n)}});var mn,yn,vn=x.now(),bn=/\?/,xn=/#.*$/,wn=/([?&])_=[^&]*/,Tn=/^(.*?):[ \t]*([^\r\n]*)\r?$/gm,Cn=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,Nn=/^(?:GET|HEAD)$/,kn=/^\/\//,En=/^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,Sn=x.fn.load,An={},jn={},Dn="*/".concat("*");try{yn=o.href}catch(Ln){yn=a.createElement("a"),yn.href="",yn=yn.href}mn=En.exec(yn.toLowerCase())||[];function Hn(e){return function(t,n){"string"!=typeof t&&(n=t,t="*");var r,i=0,o=t.toLowerCase().match(T)||[];if(x.isFunction(n))while(r=o[i++])"+"===r[0]?(r=r.slice(1)||"*",(e[r]=e[r]||[]).unshift(n)):(e[r]=e[r]||[]).push(n)}}function qn(e,n,r,i){var o={},a=e===jn;function s(l){var u;return o[l]=!0,x.each(e[l]||[],function(e,l){var c=l(n,r,i);return"string"!=typeof c||a||o[c]?a?!(u=c):t:(n.dataTypes.unshift(c),s(c),!1)}),u}return s(n.dataTypes[0])||!o["*"]&&s("*")}function _n(e,n){var r,i,o=x.ajaxSettings.flatOptions||{};for(i in n)n[i]!==t&&((o[i]?e:r||(r={}))[i]=n[i]);return r&&x.extend(!0,e,r),e}x.fn.load=function(e,n,r){if("string"!=typeof e&&Sn)return Sn.apply(this,arguments);var i,o,a,s=this,l=e.indexOf(" ");return l>=0&&(i=e.slice(l,e.length),e=e.slice(0,l)),x.isFunction(n)?(r=n,n=t):n&&"object"==typeof n&&(a="POST"),s.length>0&&x.ajax({url:e,type:a,dataType:"html",data:n}).done(function(e){o=arguments,s.html(i?x("<div>").append(x.parseHTML(e)).find(i):e)}).complete(r&&function(e,t){s.each(r,o||[e.responseText,t,e])}),this},x.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(e,t){x.fn[t]=function(e){return this.on(t,e)}}),x.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:yn,type:"GET",isLocal:Cn.test(mn[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":Dn,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":x.parseJSON,"text xml":x.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(e,t){return t?_n(_n(e,x.ajaxSettings),t):_n(x.ajaxSettings,e)},ajaxPrefilter:Hn(An),ajaxTransport:Hn(jn),ajax:function(e,n){"object"==typeof e&&(n=e,e=t),n=n||{};var r,i,o,a,s,l,u,c,p=x.ajaxSetup({},n),f=p.context||p,d=p.context&&(f.nodeType||f.jquery)?x(f):x.event,h=x.Deferred(),g=x.Callbacks("once memory"),m=p.statusCode||{},y={},v={},b=0,w="canceled",C={readyState:0,getResponseHeader:function(e){var t;if(2===b){if(!c){c={};while(t=Tn.exec(a))c[t[1].toLowerCase()]=t[2]}t=c[e.toLowerCase()]}return null==t?null:t},getAllResponseHeaders:function(){return 2===b?a:null},setRequestHeader:function(e,t){var n=e.toLowerCase();return b||(e=v[n]=v[n]||e,y[e]=t),this},overrideMimeType:function(e){return b||(p.mimeType=e),this},statusCode:function(e){var t;if(e)if(2>b)for(t in e)m[t]=[m[t],e[t]];else C.always(e[C.status]);return this},abort:function(e){var t=e||w;return u&&u.abort(t),k(0,t),this}};if(h.promise(C).complete=g.add,C.success=C.done,C.error=C.fail,p.url=((e||p.url||yn)+"").replace(xn,"").replace(kn,mn[1]+"//"),p.type=n.method||n.type||p.method||p.type,p.dataTypes=x.trim(p.dataType||"*").toLowerCase().match(T)||[""],null==p.crossDomain&&(r=En.exec(p.url.toLowerCase()),p.crossDomain=!(!r||r[1]===mn[1]&&r[2]===mn[2]&&(r[3]||("http:"===r[1]?"80":"443"))===(mn[3]||("http:"===mn[1]?"80":"443")))),p.data&&p.processData&&"string"!=typeof p.data&&(p.data=x.param(p.data,p.traditional)),qn(An,p,n,C),2===b)return C;l=p.global,l&&0===x.active++&&x.event.trigger("ajaxStart"),p.type=p.type.toUpperCase(),p.hasContent=!Nn.test(p.type),o=p.url,p.hasContent||(p.data&&(o=p.url+=(bn.test(o)?"&":"?")+p.data,delete p.data),p.cache===!1&&(p.url=wn.test(o)?o.replace(wn,"$1_="+vn++):o+(bn.test(o)?"&":"?")+"_="+vn++)),p.ifModified&&(x.lastModified[o]&&C.setRequestHeader("If-Modified-Since",x.lastModified[o]),x.etag[o]&&C.setRequestHeader("If-None-Match",x.etag[o])),(p.data&&p.hasContent&&p.contentType!==!1||n.contentType)&&C.setRequestHeader("Content-Type",p.contentType),C.setRequestHeader("Accept",p.dataTypes[0]&&p.accepts[p.dataTypes[0]]?p.accepts[p.dataTypes[0]]+("*"!==p.dataTypes[0]?", "+Dn+"; q=0.01":""):p.accepts["*"]);for(i in p.headers)C.setRequestHeader(i,p.headers[i]);if(p.beforeSend&&(p.beforeSend.call(f,C,p)===!1||2===b))return C.abort();w="abort";for(i in{success:1,error:1,complete:1})C[i](p[i]);if(u=qn(jn,p,n,C)){C.readyState=1,l&&d.trigger("ajaxSend",[C,p]),p.async&&p.timeout>0&&(s=setTimeout(function(){C.abort("timeout")},p.timeout));try{b=1,u.send(y,k)}catch(N){if(!(2>b))throw N;k(-1,N)}}else k(-1,"No Transport");function k(e,n,r,i){var c,y,v,w,T,N=n;2!==b&&(b=2,s&&clearTimeout(s),u=t,a=i||"",C.readyState=e>0?4:0,c=e>=200&&300>e||304===e,r&&(w=Mn(p,C,r)),w=On(p,w,C,c),c?(p.ifModified&&(T=C.getResponseHeader("Last-Modified"),T&&(x.lastModified[o]=T),T=C.getResponseHeader("etag"),T&&(x.etag[o]=T)),204===e||"HEAD"===p.type?N="nocontent":304===e?N="notmodified":(N=w.state,y=w.data,v=w.error,c=!v)):(v=N,(e||!N)&&(N="error",0>e&&(e=0))),C.status=e,C.statusText=(n||N)+"",c?h.resolveWith(f,[y,N,C]):h.rejectWith(f,[C,N,v]),C.statusCode(m),m=t,l&&d.trigger(c?"ajaxSuccess":"ajaxError",[C,p,c?y:v]),g.fireWith(f,[C,N]),l&&(d.trigger("ajaxComplete",[C,p]),--x.active||x.event.trigger("ajaxStop")))}return C},getJSON:function(e,t,n){return x.get(e,t,n,"json")},getScript:function(e,n){return x.get(e,t,n,"script")}}),x.each(["get","post"],function(e,n){x[n]=function(e,r,i,o){return x.isFunction(r)&&(o=o||i,i=r,r=t),x.ajax({url:e,type:n,dataType:o,data:r,success:i})}});function Mn(e,n,r){var i,o,a,s,l=e.contents,u=e.dataTypes;while("*"===u[0])u.shift(),o===t&&(o=e.mimeType||n.getResponseHeader("Content-Type"));if(o)for(s in l)if(l[s]&&l[s].test(o)){u.unshift(s);break}if(u[0]in r)a=u[0];else{for(s in r){if(!u[0]||e.converters[s+" "+u[0]]){a=s;break}i||(i=s)}a=a||i}return a?(a!==u[0]&&u.unshift(a),r[a]):t}function On(e,t,n,r){var i,o,a,s,l,u={},c=e.dataTypes.slice();if(c[1])for(a in e.converters)u[a.toLowerCase()]=e.converters[a];o=c.shift();while(o)if(e.responseFields[o]&&(n[e.responseFields[o]]=t),!l&&r&&e.dataFilter&&(t=e.dataFilter(t,e.dataType)),l=o,o=c.shift())if("*"===o)o=l;else if("*"!==l&&l!==o){if(a=u[l+" "+o]||u["* "+o],!a)for(i in u)if(s=i.split(" "),s[1]===o&&(a=u[l+" "+s[0]]||u["* "+s[0]])){a===!0?a=u[i]:u[i]!==!0&&(o=s[0],c.unshift(s[1]));break}if(a!==!0)if(a&&e["throws"])t=a(t);else try{t=a(t)}catch(p){return{state:"parsererror",error:a?p:"No conversion from "+l+" to "+o}}}return{state:"success",data:t}}x.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(e){return x.globalEval(e),e}}}),x.ajaxPrefilter("script",function(e){e.cache===t&&(e.cache=!1),e.crossDomain&&(e.type="GET",e.global=!1)}),x.ajaxTransport("script",function(e){if(e.crossDomain){var n,r=a.head||x("head")[0]||a.documentElement;return{send:function(t,i){n=a.createElement("script"),n.async=!0,e.scriptCharset&&(n.charset=e.scriptCharset),n.src=e.url,n.onload=n.onreadystatechange=function(e,t){(t||!n.readyState||/loaded|complete/.test(n.readyState))&&(n.onload=n.onreadystatechange=null,n.parentNode&&n.parentNode.removeChild(n),n=null,t||i(200,"success"))},r.insertBefore(n,r.firstChild)},abort:function(){n&&n.onload(t,!0)}}}});var Fn=[],Bn=/(=)\?(?=&|$)|\?\?/;x.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var e=Fn.pop()||x.expando+"_"+vn++;return this[e]=!0,e}}),x.ajaxPrefilter("json jsonp",function(n,r,i){var o,a,s,l=n.jsonp!==!1&&(Bn.test(n.url)?"url":"string"==typeof n.data&&!(n.contentType||"").indexOf("application/x-www-form-urlencoded")&&Bn.test(n.data)&&"data");return l||"jsonp"===n.dataTypes[0]?(o=n.jsonpCallback=x.isFunction(n.jsonpCallback)?n.jsonpCallback():n.jsonpCallback,l?n[l]=n[l].replace(Bn,"$1"+o):n.jsonp!==!1&&(n.url+=(bn.test(n.url)?"&":"?")+n.jsonp+"="+o),n.converters["script json"]=function(){return s||x.error(o+" was not called"),s[0]},n.dataTypes[0]="json",a=e[o],e[o]=function(){s=arguments},i.always(function(){e[o]=a,n[o]&&(n.jsonpCallback=r.jsonpCallback,Fn.push(o)),s&&x.isFunction(a)&&a(s[0]),s=a=t}),"script"):t});var Pn,Rn,Wn=0,$n=e.ActiveXObject&&function(){var e;for(e in Pn)Pn[e](t,!0)};function In(){try{return new e.XMLHttpRequest}catch(t){}}function zn(){try{return new e.ActiveXObject("Microsoft.XMLHTTP")}catch(t){}}x.ajaxSettings.xhr=e.ActiveXObject?function(){return!this.isLocal&&In()||zn()}:In,Rn=x.ajaxSettings.xhr(),x.support.cors=!!Rn&&"withCredentials"in Rn,Rn=x.support.ajax=!!Rn,Rn&&x.ajaxTransport(function(n){if(!n.crossDomain||x.support.cors){var r;return{send:function(i,o){var a,s,l=n.xhr();if(n.username?l.open(n.type,n.url,n.async,n.username,n.password):l.open(n.type,n.url,n.async),n.xhrFields)for(s in n.xhrFields)l[s]=n.xhrFields[s];n.mimeType&&l.overrideMimeType&&l.overrideMimeType(n.mimeType),n.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");try{for(s in i)l.setRequestHeader(s,i[s])}catch(u){}l.send(n.hasContent&&n.data||null),r=function(e,i){var s,u,c,p;try{if(r&&(i||4===l.readyState))if(r=t,a&&(l.onreadystatechange=x.noop,$n&&delete Pn[a]),i)4!==l.readyState&&l.abort();else{p={},s=l.status,u=l.getAllResponseHeaders(),"string"==typeof l.responseText&&(p.text=l.responseText);try{c=l.statusText}catch(f){c=""}s||!n.isLocal||n.crossDomain?1223===s&&(s=204):s=p.text?200:404}}catch(d){i||o(-1,d)}p&&o(s,c,p,u)},n.async?4===l.readyState?setTimeout(r):(a=++Wn,$n&&(Pn||(Pn={},x(e).unload($n)),Pn[a]=r),l.onreadystatechange=r):r()},abort:function(){r&&r(t,!0)}}}});var Xn,Un,Vn=/^(?:toggle|show|hide)$/,Yn=RegExp("^(?:([+-])=|)("+w+")([a-z%]*)$","i"),Jn=/queueHooks$/,Gn=[nr],Qn={"*":[function(e,t){var n=this.createTween(e,t),r=n.cur(),i=Yn.exec(t),o=i&&i[3]||(x.cssNumber[e]?"":"px"),a=(x.cssNumber[e]||"px"!==o&&+r)&&Yn.exec(x.css(n.elem,e)),s=1,l=20;if(a&&a[3]!==o){o=o||a[3],i=i||[],a=+r||1;do s=s||".5",a/=s,x.style(n.elem,e,a+o);while(s!==(s=n.cur()/r)&&1!==s&&--l)}return i&&(a=n.start=+a||+r||0,n.unit=o,n.end=i[1]?a+(i[1]+1)*i[2]:+i[2]),n}]};function Kn(){return setTimeout(function(){Xn=t}),Xn=x.now()}function Zn(e,t,n){var r,i=(Qn[t]||[]).concat(Qn["*"]),o=0,a=i.length;for(;a>o;o++)if(r=i[o].call(n,t,e))return r}function er(e,t,n){var r,i,o=0,a=Gn.length,s=x.Deferred().always(function(){delete l.elem}),l=function(){if(i)return!1;var t=Xn||Kn(),n=Math.max(0,u.startTime+u.duration-t),r=n/u.duration||0,o=1-r,a=0,l=u.tweens.length;for(;l>a;a++)u.tweens[a].run(o);return s.notifyWith(e,[u,o,n]),1>o&&l?n:(s.resolveWith(e,[u]),!1)},u=s.promise({elem:e,props:x.extend({},t),opts:x.extend(!0,{specialEasing:{}},n),originalProperties:t,originalOptions:n,startTime:Xn||Kn(),duration:n.duration,tweens:[],createTween:function(t,n){var r=x.Tween(e,u.opts,t,n,u.opts.specialEasing[t]||u.opts.easing);return u.tweens.push(r),r},stop:function(t){var n=0,r=t?u.tweens.length:0;if(i)return this;for(i=!0;r>n;n++)u.tweens[n].run(1);return t?s.resolveWith(e,[u,t]):s.rejectWith(e,[u,t]),this}}),c=u.props;for(tr(c,u.opts.specialEasing);a>o;o++)if(r=Gn[o].call(u,e,c,u.opts))return r;return x.map(c,Zn,u),x.isFunction(u.opts.start)&&u.opts.start.call(e,u),x.fx.timer(x.extend(l,{elem:e,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function tr(e,t){var n,r,i,o,a;for(n in e)if(r=x.camelCase(n),i=t[r],o=e[n],x.isArray(o)&&(i=o[1],o=e[n]=o[0]),n!==r&&(e[r]=o,delete e[n]),a=x.cssHooks[r],a&&"expand"in a){o=a.expand(o),delete e[r];for(n in o)n in e||(e[n]=o[n],t[n]=i)}else t[r]=i}x.Animation=x.extend(er,{tweener:function(e,t){x.isFunction(e)?(t=e,e=["*"]):e=e.split(" ");var n,r=0,i=e.length;for(;i>r;r++)n=e[r],Qn[n]=Qn[n]||[],Qn[n].unshift(t)},prefilter:function(e,t){t?Gn.unshift(e):Gn.push(e)}});function nr(e,t,n){var r,i,o,a,s,l,u=this,c={},p=e.style,f=e.nodeType&&nn(e),d=x._data(e,"fxshow");n.queue||(s=x._queueHooks(e,"fx"),null==s.unqueued&&(s.unqueued=0,l=s.empty.fire,s.empty.fire=function(){s.unqueued||l()}),s.unqueued++,u.always(function(){u.always(function(){s.unqueued--,x.queue(e,"fx").length||s.empty.fire()})})),1===e.nodeType&&("height"in t||"width"in t)&&(n.overflow=[p.overflow,p.overflowX,p.overflowY],"inline"===x.css(e,"display")&&"none"===x.css(e,"float")&&(x.support.inlineBlockNeedsLayout&&"inline"!==ln(e.nodeName)?p.zoom=1:p.display="inline-block")),n.overflow&&(p.overflow="hidden",x.support.shrinkWrapBlocks||u.always(function(){p.overflow=n.overflow[0],p.overflowX=n.overflow[1],p.overflowY=n.overflow[2]}));for(r in t)if(i=t[r],Vn.exec(i)){if(delete t[r],o=o||"toggle"===i,i===(f?"hide":"show"))continue;c[r]=d&&d[r]||x.style(e,r)}if(!x.isEmptyObject(c)){d?"hidden"in d&&(f=d.hidden):d=x._data(e,"fxshow",{}),o&&(d.hidden=!f),f?x(e).show():u.done(function(){x(e).hide()}),u.done(function(){var t;x._removeData(e,"fxshow");for(t in c)x.style(e,t,c[t])});for(r in c)a=Zn(f?d[r]:0,r,u),r in d||(d[r]=a.start,f&&(a.end=a.start,a.start="width"===r||"height"===r?1:0))}}function rr(e,t,n,r,i){return new rr.prototype.init(e,t,n,r,i)}x.Tween=rr,rr.prototype={constructor:rr,init:function(e,t,n,r,i,o){this.elem=e,this.prop=n,this.easing=i||"swing",this.options=t,this.start=this.now=this.cur(),this.end=r,this.unit=o||(x.cssNumber[n]?"":"px")},cur:function(){var e=rr.propHooks[this.prop];return e&&e.get?e.get(this):rr.propHooks._default.get(this)},run:function(e){var t,n=rr.propHooks[this.prop];return this.pos=t=this.options.duration?x.easing[this.easing](e,this.options.duration*e,0,1,this.options.duration):e,this.now=(this.end-this.start)*t+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),n&&n.set?n.set(this):rr.propHooks._default.set(this),this}},rr.prototype.init.prototype=rr.prototype,rr.propHooks={_default:{get:function(e){var t;return null==e.elem[e.prop]||e.elem.style&&null!=e.elem.style[e.prop]?(t=x.css(e.elem,e.prop,""),t&&"auto"!==t?t:0):e.elem[e.prop]},set:function(e){x.fx.step[e.prop]?x.fx.step[e.prop](e):e.elem.style&&(null!=e.elem.style[x.cssProps[e.prop]]||x.cssHooks[e.prop])?x.style(e.elem,e.prop,e.now+e.unit):e.elem[e.prop]=e.now}}},rr.propHooks.scrollTop=rr.propHooks.scrollLeft={set:function(e){e.elem.nodeType&&e.elem.parentNode&&(e.elem[e.prop]=e.now)}},x.each(["toggle","show","hide"],function(e,t){var n=x.fn[t];x.fn[t]=function(e,r,i){return null==e||"boolean"==typeof e?n.apply(this,arguments):this.animate(ir(t,!0),e,r,i)}}),x.fn.extend({fadeTo:function(e,t,n,r){return this.filter(nn).css("opacity",0).show().end().animate({opacity:t},e,n,r)},animate:function(e,t,n,r){var i=x.isEmptyObject(e),o=x.speed(t,n,r),a=function(){var t=er(this,x.extend({},e),o);(i||x._data(this,"finish"))&&t.stop(!0)};return a.finish=a,i||o.queue===!1?this.each(a):this.queue(o.queue,a)},stop:function(e,n,r){var i=function(e){var t=e.stop;delete e.stop,t(r)};return"string"!=typeof e&&(r=n,n=e,e=t),n&&e!==!1&&this.queue(e||"fx",[]),this.each(function(){var t=!0,n=null!=e&&e+"queueHooks",o=x.timers,a=x._data(this);if(n)a[n]&&a[n].stop&&i(a[n]);else for(n in a)a[n]&&a[n].stop&&Jn.test(n)&&i(a[n]);for(n=o.length;n--;)o[n].elem!==this||null!=e&&o[n].queue!==e||(o[n].anim.stop(r),t=!1,o.splice(n,1));(t||!r)&&x.dequeue(this,e)})},finish:function(e){return e!==!1&&(e=e||"fx"),this.each(function(){var t,n=x._data(this),r=n[e+"queue"],i=n[e+"queueHooks"],o=x.timers,a=r?r.length:0;for(n.finish=!0,x.queue(this,e,[]),i&&i.stop&&i.stop.call(this,!0),t=o.length;t--;)o[t].elem===this&&o[t].queue===e&&(o[t].anim.stop(!0),o.splice(t,1));for(t=0;a>t;t++)r[t]&&r[t].finish&&r[t].finish.call(this);delete n.finish})}});function ir(e,t){var n,r={height:e},i=0;for(t=t?1:0;4>i;i+=2-t)n=Zt[i],r["margin"+n]=r["padding"+n]=e;return t&&(r.opacity=r.width=e),r}x.each({slideDown:ir("show"),slideUp:ir("hide"),slideToggle:ir("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(e,t){x.fn[e]=function(e,n,r){return this.animate(t,e,n,r)}}),x.speed=function(e,t,n){var r=e&&"object"==typeof e?x.extend({},e):{complete:n||!n&&t||x.isFunction(e)&&e,duration:e,easing:n&&t||t&&!x.isFunction(t)&&t};return r.duration=x.fx.off?0:"number"==typeof r.duration?r.duration:r.duration in x.fx.speeds?x.fx.speeds[r.duration]:x.fx.speeds._default,(null==r.queue||r.queue===!0)&&(r.queue="fx"),r.old=r.complete,r.complete=function(){x.isFunction(r.old)&&r.old.call(this),r.queue&&x.dequeue(this,r.queue)},r},x.easing={linear:function(e){return e},swing:function(e){return.5-Math.cos(e*Math.PI)/2}},x.timers=[],x.fx=rr.prototype.init,x.fx.tick=function(){var e,n=x.timers,r=0;for(Xn=x.now();n.length>r;r++)e=n[r],e()||n[r]!==e||n.splice(r--,1);n.length||x.fx.stop(),Xn=t},x.fx.timer=function(e){e()&&x.timers.push(e)&&x.fx.start()},x.fx.interval=13,x.fx.start=function(){Un||(Un=setInterval(x.fx.tick,x.fx.interval))},x.fx.stop=function(){clearInterval(Un),Un=null},x.fx.speeds={slow:600,fast:200,_default:400},x.fx.step={},x.expr&&x.expr.filters&&(x.expr.filters.animated=function(e){return x.grep(x.timers,function(t){return e===t.elem}).length}),x.fn.offset=function(e){if(arguments.length)return e===t?this:this.each(function(t){x.offset.setOffset(this,e,t)});var n,r,o={top:0,left:0},a=this[0],s=a&&a.ownerDocument;if(s)return n=s.documentElement,x.contains(n,a)?(typeof a.getBoundingClientRect!==i&&(o=a.getBoundingClientRect()),r=or(s),{top:o.top+(r.pageYOffset||n.scrollTop)-(n.clientTop||0),left:o.left+(r.pageXOffset||n.scrollLeft)-(n.clientLeft||0)}):o},x.offset={setOffset:function(e,t,n){var r=x.css(e,"position");"static"===r&&(e.style.position="relative");var i=x(e),o=i.offset(),a=x.css(e,"top"),s=x.css(e,"left"),l=("absolute"===r||"fixed"===r)&&x.inArray("auto",[a,s])>-1,u={},c={},p,f;l?(c=i.position(),p=c.top,f=c.left):(p=parseFloat(a)||0,f=parseFloat(s)||0),x.isFunction(t)&&(t=t.call(e,n,o)),null!=t.top&&(u.top=t.top-o.top+p),null!=t.left&&(u.left=t.left-o.left+f),"using"in t?t.using.call(e,u):i.css(u)}},x.fn.extend({position:function(){if(this[0]){var e,t,n={top:0,left:0},r=this[0];return"fixed"===x.css(r,"position")?t=r.getBoundingClientRect():(e=this.offsetParent(),t=this.offset(),x.nodeName(e[0],"html")||(n=e.offset()),n.top+=x.css(e[0],"borderTopWidth",!0),n.left+=x.css(e[0],"borderLeftWidth",!0)),{top:t.top-n.top-x.css(r,"marginTop",!0),left:t.left-n.left-x.css(r,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){var e=this.offsetParent||s;while(e&&!x.nodeName(e,"html")&&"static"===x.css(e,"position"))e=e.offsetParent;return e||s})}}),x.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(e,n){var r=/Y/.test(n);x.fn[e]=function(i){return x.access(this,function(e,i,o){var a=or(e);return o===t?a?n in a?a[n]:a.document.documentElement[i]:e[i]:(a?a.scrollTo(r?x(a).scrollLeft():o,r?o:x(a).scrollTop()):e[i]=o,t)},e,i,arguments.length,null)}});function or(e){return x.isWindow(e)?e:9===e.nodeType?e.defaultView||e.parentWindow:!1}x.each({Height:"height",Width:"width"},function(e,n){x.each({padding:"inner"+e,content:n,"":"outer"+e},function(r,i){x.fn[i]=function(i,o){var a=arguments.length&&(r||"boolean"!=typeof i),s=r||(i===!0||o===!0?"margin":"border");return x.access(this,function(n,r,i){var o;return x.isWindow(n)?n.document.documentElement["client"+e]:9===n.nodeType?(o=n.documentElement,Math.max(n.body["scroll"+e],o["scroll"+e],n.body["offset"+e],o["offset"+e],o["client"+e])):i===t?x.css(n,r,s):x.style(n,r,i,s)},n,a?i:t,a,null)}})}),x.fn.size=function(){return this.length},x.fn.andSelf=x.fn.addBack,"object"==typeof module&&module&&"object"==typeof module.exports?module.exports=x:(e.jQuery=e.$=x,"function"==typeof define&&define.amd&&define("jquery",[],function(){return x}))})(window);

;//     Underscore.js 1.3.3
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.3';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      rand = Math.floor(Math.random() * (index + 1));
      shuffled[index] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, val, context) {
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      if (a === void 0) return 1;
      if (b === void 0) return -1;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(obj) {
    if (!obj)                                     return [];
    if (_.isArray(obj))                           return slice.call(obj);
    if (_.isArguments(obj))                       return slice.call(obj);
    if (obj.toArray && _.isFunction(obj.toArray)) return obj.toArray();
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.isArray(obj) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var results = [];
    // The `isSorted` flag is irrelevant if the array only contains two elements.
    if (array.length < 3) isSorted = true;
    _.reduce(initial, function (memo, value, index) {
      if (isSorted ? _.last(memo) !== value || !memo.length : !_.include(memo, value)) {
        memo.push(value);
        results.push(array[index]);
      }
      return memo;
    }, []);
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1), true);
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more, result;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        result = func.apply(context, args);
      }
      whenDone();
      throttling = true;
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      if (immediate && !timeout) func.apply(context, args);
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var result = {};
    each(_.flatten(slice.call(arguments, 1)), function(key) {
      if (key in obj) result[key] = obj[key];
    });
    return result;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return _.isNumber(obj) && isFinite(obj);
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    '\\': '\\',
    "'": "'",
    'r': '\r',
    'n': '\n',
    't': '\t',
    'u2028': '\u2028',
    'u2029': '\u2029'
  };

  for (var p in escapes) escapes[escapes[p]] = p;
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(unescaper, function(match, escape) {
      return escapes[escape];
    });
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    settings = _.defaults(settings || {}, _.templateSettings);

    // Compile the template source, taking care to escape characters that
    // cannot be included in a string literal and then unescape them in code
    // blocks.
    var source = "__p+='" + text
      .replace(escaper, function(match) {
        return '\\' + escapes[match];
      })
      .replace(settings.escape || noMatch, function(match, code) {
        return "'+\n_.escape(" + unescape(code) + ")+\n'";
      })
      .replace(settings.interpolate || noMatch, function(match, code) {
        return "'+\n(" + unescape(code) + ")+\n'";
      })
      .replace(settings.evaluate || noMatch, function(match, code) {
        return "';\n" + unescape(code) + "\n;__p+='";
      }) + "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __p='';" +
      "var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" +
      source + "return __p;\n";

    var render = new Function(settings.variable || 'obj', '_', source);
    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for build time
    // precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' +
      source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);

;//     Backbone.js 0.9.9

//     (c) 2010-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(){

  // Initial Setup
  // -------------

  // Save a reference to the global object (`window` in the browser, `exports`
  // on the server).
  var root = this;

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create a local reference to array methods.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // The top-level namespace. All public Backbone classes and modules will
  // be attached to this. Exported for both CommonJS and the browser.
  var Backbone;
  if (typeof exports !== 'undefined') {
    Backbone = exports;
  } else {
    Backbone = root.Backbone = {};
  }

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '0.9.9';

  // Require Underscore, if we're on the server, and it's not already present.
  var _ = root._;
  if (!_ && (typeof require !== 'undefined')) _ = require('underscore');

  // For Backbone's purposes, jQuery, Zepto, or Ender owns the `$` variable.
  Backbone.$ = root.jQuery || root.Zepto || root.ender;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
    } else if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
    } else {
      return true;
    }
  };

  // Optimized internal dispatch function for triggering events. Tries to
  // keep the usual cases speedy (most Backbone events have 3 arguments).
  var triggerEvents = function(obj, events, args) {
    var ev, i = -1, l = events.length;
    switch (args.length) {
    case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx);
    return;
    case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0]);
    return;
    case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1]);
    return;
    case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, args[0], args[1], args[2]);
    return;
    default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind one or more space separated events, or an events map,
    // to a `callback` function. Passing `"all"` will bind the callback to
    // all events fired.
    on: function(name, callback, context) {
      if (!(eventsApi(this, 'on', name, [callback, context]) && callback)) return this;
      this._events || (this._events = {});
      var list = this._events[name] || (this._events[name] = []);
      list.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind events to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!(eventsApi(this, 'once', name, [callback, context]) && callback)) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      this.on(name, once, context);
      return this;
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `events` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var list, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = {};
        return this;
      }

      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (list = this._events[name]) {
          events = [];
          if (callback || context) {
            for (j = 0, k = list.length; j < k; j++) {
              ev = list[j];
              if ((callback && callback !== (ev.callback._callback || ev.callback)) ||
                  (context && context !== ev.context)) {
                events.push(ev);
              }
            }
          }
          this._events[name] = events;
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(this, events, args);
      if (allEvents) triggerEvents(this, allEvents, arguments);
      return this;
    },

    // An inversion-of-control version of `on`. Tell *this* object to listen to
    // an event in another object ... keeping track of what it's listening to.
    listenTo: function(object, events, callback) {
      var listeners = this._listeners || (this._listeners = {});
      var id = object._listenerId || (object._listenerId = _.uniqueId('l'));
      listeners[id] = object;
      object.on(events, callback || this, this);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(object, events, callback) {
      var listeners = this._listeners;
      if (!listeners) return;
      if (object) {
        object.off(events, callback, this);
        if (!events && !callback) delete listeners[object._listenerId];
      } else {
        for (var id in listeners) {
          listeners[id].off(null, null, this);
        }
        this._listeners = {};
      }
      return this;
    }
  };

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Create a new model, with defined attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var defaults;
    var attrs = attributes || {};
    this.cid = _.uniqueId('c');
    this.changed = {};
    this.attributes = {};
    this._changes = [];
    if (options && options.collection) this.collection = options.collection;
    if (options && options.parse) attrs = this.parse(attrs);
    if (defaults = _.result(this, 'defaults')) _.defaults(attrs, defaults);
    this.set(attrs, {silent: true});
    this._currentAttributes = _.clone(this.attributes);
    this._previousAttributes = _.clone(this.attributes);
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"` unless
    // you choose to silence it.
    set: function(key, val, options) {
      var attr, attrs;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (_.isObject(key)) {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      // Extract attributes and options.
      var silent = options && options.silent;
      var unset = options && options.unset;

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      var now = this.attributes;

      // For each `set` attribute...
      for (attr in attrs) {
        val = attrs[attr];

        // Update or delete the current value, and track the change.
        unset ? delete now[attr] : now[attr] = val;
        this._changes.push(attr, val);
      }

      // Signal that the model's state has potentially changed, and we need
      // to recompute the actual changes.
      this._hasComputed = false;

      // Fire the `"change"` events.
      if (!silent) this.change(options);
      return this;
    },

    // Remove an attribute from the model, firing `"change"` unless you choose
    // to silence it. `unset` is a noop if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"` unless you choose
    // to silence it.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overriden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        if (!model.set(model.parse(resp), options)) return false;
        if (success) success(model, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, current, done;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || _.isObject(key)) {
        attrs = key;
        options = val;
      } else if (key != null) {
        (attrs = {})[key] = val;
      }
      options = options ? _.clone(options) : {};

      // If we're "wait"-ing to set changed attributes, validate early.
      if (options.wait) {
        if (attrs && !this._validate(attrs, options)) return false;
        current = _.clone(this.attributes);
      }

      // Regular saves `set` attributes before persisting to the server.
      var silentOptions = _.extend({}, options, {silent: true});
      if (attrs && !this.set(attrs, options.wait ? silentOptions : options)) {
        return false;
      }

      // Do not persist invalid models.
      if (!attrs && !this._validate(null, options)) return false;

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      var model = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        done = true;
        var serverAttrs = model.parse(resp);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (!model.set(serverAttrs, options)) return false;
        if (success) success(model, resp, options);
      };

      // Finish configuring and sending the Ajax request.
      var method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method == 'patch') options.attrs = attrs;
      var xhr = this.sync(method, this, options);

      // When using `wait`, reset attributes to original values unless
      // `success` has been called already.
      if (!done && options.wait) {
        this.clear(silentOptions);
        this.set(current, silentOptions);
      }

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return this.id == null;
    },

    // Call this method to manually fire a `"change"` event for this model and
    // a `"change:attribute"` event for each changed attribute.
    // Calling this will cause all objects observing the model to update.
    change: function(options) {
      var changing = this._changing;
      this._changing = true;

      // Generate the changes to be triggered on the model.
      var triggers = this._computeChanges(true);

      this._pending = !!triggers.length;

      for (var i = triggers.length - 2; i >= 0; i -= 2) {
        this.trigger('change:' + triggers[i], this, triggers[i + 1], options);
      }

      if (changing) return this;

      // Trigger a `change` while there have been changes.
      while (this._pending) {
        this._pending = false;
        this.trigger('change', this, options);
        this._previousAttributes = _.clone(this.attributes);
      }

      this._changing = false;
      return this;
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (!this._hasComputed) this._computeChanges();
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false, old = this._previousAttributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Looking at the built up list of `set` attribute changes, compute how
    // many of the attributes have actually changed. If `loud`, return a
    // boiled-down list of only the real changes.
    _computeChanges: function(loud) {
      this.changed = {};
      var already = {};
      var triggers = [];
      var current = this._currentAttributes;
      var changes = this._changes;

      // Loop through the current queue of potential model changes.
      for (var i = changes.length - 2; i >= 0; i -= 2) {
        var key = changes[i], val = changes[i + 1];
        if (already[key]) continue;
        already[key] = true;

        // Check if the attribute has been modified since the last change,
        // and update `this.changed` accordingly. If we're inside of a `change`
        // call, also add a trigger to the list.
        if (current[key] !== val) {
          this.changed[key] = val;
          if (!loud) continue;
          triggers.push(key, val);
          current[key] = val;
        }
      }
      if (loud) this._changes = [];

      // Signals `this.changed` is current to prevent duplicate calls from `this.hasChanged`.
      this._hasComputed = true;
      return triggers;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. If a specific `error` callback has
    // been passed, call that instead of firing the general `"error"` event.
    _validate: function(attrs, options) {
      if (!this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validate(attrs, options);
      if (!error) return true;
      if (options && options.error) options.error(this, error, options);
      this.trigger('error', this, error, options);
      return false;
    }

  });

  // Backbone.Collection
  // -------------------

  // Provides a standard collection class for our sets of models, ordered
  // or unordered. If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set. Pass **silent** to avoid
    // firing the `add` event for every new model.
    add: function(models, options) {
      var i, args, length, model, existing, needsSort;
      var at = options && options.at;
      var sort = ((options && options.sort) == null ? true : options.sort);
      models = _.isArray(models) ? models.slice() : [models];

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = models.length - 1; i >= 0; i--) {
        if(!(model = this._prepareModel(models[i], options))) {
          this.trigger("error", this, models[i], options);
          models.splice(i, 1);
          continue;
        }
        models[i] = model;

        existing = model.id != null && this._byId[model.id];
        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing || this._byCid[model.cid]) {
          if (options && options.merge && existing) {
            existing.set(model.attributes, options);
            needsSort = sort;
          }
          models.splice(i, 1);
          continue;
        }

        // Listen to added models' events, and index models for lookup by
        // `id` and by `cid`.
        model.on('all', this._onModelEvent, this);
        this._byCid[model.cid] = model;
        if (model.id != null) this._byId[model.id] = model;
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (models.length) needsSort = sort;
      this.length += models.length;
      args = [at != null ? at : this.models.length, 0];
      push.apply(args, models);
      splice.apply(this.models, args);

      // Sort the collection if appropriate.
      if (needsSort && this.comparator && at == null) this.sort({silent: true});

      if (options && options.silent) return this;

      // Trigger `add` events.
      while (model = models.shift()) {
        model.trigger('add', model, this, options);
      }

      return this;
    },

    // Remove a model, or a list of models from the set. Pass silent to avoid
    // firing the `remove` event for every model removed.
    remove: function(models, options) {
      var i, l, index, model;
      options || (options = {});
      models = _.isArray(models) ? models.slice() : [models];
      for (i = 0, l = models.length; i < l; i++) {
        model = this.get(models[i]);
        if (!model) continue;
        delete this._byId[model.id];
        delete this._byCid[model.cid];
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model);
      }
      return this;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: this.length}, options));
      return model;
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      model = this._prepareModel(model, options);
      this.add(model, _.extend({at: 0}, options));
      return model;
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function(begin, end) {
      return this.models.slice(begin, end);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj.id != null ? obj.id : obj] || this._byCid[obj.cid || obj];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of `filter`.
    where: function(attrs) {
      if (_.isEmpty(attrs)) return [];
      return this.filter(function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) {
        throw new Error('Cannot sort a set without a comparator');
      }

      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options || !options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Smartly update a collection with a change set of models, adding,
    // removing, and merging as necessary.
    update: function(models, options) {
      var model, i, l, existing;
      var add = [], remove = [], modelMap = {};
      var idAttr = this.model.prototype.idAttribute;
      options = _.extend({add: true, merge: true, remove: true}, options);
      if (options.parse) models = this.parse(models);

      // Allow a single model (or no argument) to be passed.
      if (!_.isArray(models)) models = models ? [models] : [];

      // Proxy to `add` for this case, no need to iterate...
      if (options.add && !options.remove) return this.add(models, options);

      // Determine which models to add and merge, and which to remove.
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i];
        existing = this.get(model.id || model.cid || model[idAttr]);
        if (options.remove && existing) modelMap[existing.cid] = true;
        if ((options.add && !existing) || (options.merge && existing)) {
          add.push(model);
        }
      }
      if (options.remove) {
        for (i = 0, l = this.models.length; i < l; i++) {
          model = this.models[i];
          if (!modelMap[model.cid]) remove.push(model);
        }
      }

      // Remove models (if applicable) before we add and merge the rest.
      if (remove.length) this.remove(remove, options);
      if (add.length) this.add(add, options);
      return this;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any `add` or `remove` events. Fires `reset` when finished.
    reset: function(models, options) {
      options || (options = {});
      if (options.parse) models = this.parse(models);
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i]);
      }
      options.previousModels = this.models;
      this._reset();
      if (models) this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return this;
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `add: true` is passed, appends the
    // models to the collection instead of resetting.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var collection = this;
      var success = options.success;
      options.success = function(resp, status, xhr) {
        var method = options.update ? 'update' : 'reset';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
      };
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      var collection = this;
      options = options ? _.clone(options) : {};
      model = this._prepareModel(model, options);
      if (!model) return false;
      if (!options.wait) collection.add(model, options);
      var success = options.success;
      options.success = function(model, resp, options) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Proxy to _'s chain. Can't be proxied the same way the rest of the
    // underscore methods are proxied because it relies on the underscore
    // constructor.
    chain: function() {
      return _(this.models).chain();
    },

    // Reset all internal state. Called when the collection is reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
      this._byCid = {};
    },

    // Prepare a model or hash of attributes to be added to this collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) {
        if (!attrs.collection) attrs.collection = this;
        return attrs;
      }
      options || (options = {});
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model._validate(attrs, options)) return false;
      return model;
    },

    // Internal method to remove a model's ties to a collection.
    _removeReference: function(model) {
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'sortedIndex', 'toArray', 'size', 'first', 'head', 'take',
    'initial', 'rest', 'tail', 'last', 'without', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (!callback) callback = this[name];
      Backbone.history.route(route, _.bind(function(fragment) {
        var args = this._extractParameters(route, fragment);
        callback && callback.apply(this, args);
        this.trigger.apply(this, ['route:' + name].concat(args));
        Backbone.history.trigger('route', this, name, args);
      }, this));
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, '([^\/]+)')
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted parameters.
    _extractParameters: function(route, fragment) {
      return route.exec(fragment).slice(1);
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on URL fragments. If the
  // browser does not support `onhashchange`, falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.substr(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({}, {root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        this.iframe = Backbone.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).bind('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).bind('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // If we've started off with a route from a `pushState`-enabled browser,
      // but we're currently in a browser that doesn't support it...
      if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !atRoot) {
        this.fragment = this.getFragment(null, true);
        this.location.replace(this.root + this.location.search + '#' + this.fragment);
        // Return immediately as browser will do redirect to new url
        return true;

      // Or if we've started out with a hash-based route, but we're currently
      // in a browser where it could be `pushState`-based instead...
      } else if (this._wantsPushState && this._hasPushState && atRoot && loc.hash) {
        this.fragment = this.getHash().replace(routeStripper, '');
        this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).unbind('popstate', this.checkUrl).unbind('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl() || this.loadUrl(this.getHash());
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragmentOverride) {
      var fragment = this.fragment = this.getFragment(fragmentOverride);
      var matched = _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
      return matched;
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: options};
      fragment = this.getFragment(fragment || '');
      if (this.fragment === fragment) return;
      this.fragment = fragment;
      var url = this.root + fragment;

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Backbone.View
  // -------------

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    this._configure(options || {});
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be prefered to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // For small amounts of DOM Elements, where a full-blown template isn't
    // needed, use **make** to manufacture elements, one at a time.
    //
    //     var el = this.make('li', {'class': 'row'}, this.model.escape('title'));
    //
    make: function(tagName, attributes, content) {
      var el = document.createElement(tagName);
      if (attributes) Backbone.$(el).attr(attributes);
      if (content != null) Backbone.$(el).html(content);
      return el;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save'
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) throw new Error('Method "' + events[key] + '" does not exist');
        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.bind(eventName, method);
        } else {
          this.$el.delegate(selector, eventName, method);
        }
      }
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.unbind('.delegateEvents' + this.cid);
    },

    // Performs the initial configuration of a View with a set of options.
    // Keys with special meaning *(model, collection, id, className)*, are
    // attached directly to the view.
    _configure: function(options) {
      if (this.options) options = _.extend({}, _.result(this, 'options'), options);
      _.extend(this, _.pick(options, viewOptions));
      this.options = options;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        this.setElement(this.make(_.result(this, 'tagName'), attrs), false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    var success = options.success;
    options.success = function(resp, status, xhr) {
      if (success) success(resp, status, xhr);
      model.trigger('sync', model, resp, options);
    };

    var error = options.error;
    options.error = function(xhr, status, thrown) {
      if (error) error(model, xhr, options);
      model.trigger('error', model, xhr, options);
    };

    // Make the request, allowing the user to override any Ajax options.
    var xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

}).call(this);

;/**
 * |-------------------|
 * | Backbone-Mediator |
 * |-------------------|
 *  Backbone-Mediator is freely distributable under the MIT license.
 *
 *  <a href="https://github.com/chalbert/Backbone-Mediator">More details & documentation</a>
 *
 * @author Nicolas Gilbert
 *
 * @requires _
 * @requires Backbone
 */
(function(factory){
  'use strict';

  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'backbone'], factory);
  } else {
    factory(_, Backbone);
  }

})(function (_, Backbone){
  'use strict';

  /**
   * @static
   */
  var channels = {},
      Subscriber,
      /** @borrows Backbone.View#delegateEvents */
      delegateEvents = Backbone.View.prototype.delegateEvents,
      /** @borrows Backbone.View#delegateEvents */
      undelegateEvents = Backbone.View.prototype.undelegateEvents;

  /**
   * @class
   */
  Backbone.Mediator = {

    /**
     * Subscribe to a channel
     *
     * @param channel
     */
    subscribe: function(channel, subscription, context, once) {
      if (!channels[channel]) channels[channel] = [];
      channels[channel].push({fn: subscription, context: context || this, once: once});
    },

    /**
     * Trigger all callbacks for a channel
     *
     * @param channel
     * @params N Extra parametter to pass to handler
     */
    publish: function(channel) {
      if (!channels[channel]) return;

      var args = [].slice.call(arguments, 1),
          subscription;

      for (var i = 0; i < channels[channel].length; i++) {
        subscription = channels[channel][i];
        subscription.fn.apply(subscription.context, args);
        if (subscription.once) {
          Backbone.Mediator.unsubscribe(channel, subscription.fn, subscription.context);
          i--;
        }
      }
    },

    /**
     * Cancel subscription
     *
     * @param channel
     * @param fn
     * @param context
     */

    unsubscribe: function(channel, fn, context){
      if (!channels[channel]) return;

      var subscription;
      for (var i = 0; i < channels[channel].length; i++) {
        subscription = channels[channel][i];
        if (subscription.fn === fn && subscription.context === context) {
          channels[channel].splice(i, 1);
          i--;
        }
      }
    },

    /**
     * Subscribing to one event only
     *
     * @param channel
     * @param subscription
     * @param context
     */
    subscribeOnce: function (channel, subscription, context) {
      Backbone.Mediator.subscribe(channel, subscription, context, true);
    }

  };

  /**
   * Allow to define convention-based subscriptions
   * as an 'subscriptions' hash on a view. Subscriptions
   * can then be easily setup and cleaned.
   *
   * @class
   */


  Subscriber = {

    /**
     * Extend delegateEvents() to set subscriptions
     */
    delegateEvents: function(){
      delegateEvents.apply(this, arguments);
      this.setSubscriptions();
    },

    /**
     * Extend undelegateEvents() to unset subscriptions
     */
    undelegateEvents: function(){
      undelegateEvents.apply(this, arguments);
      this.unsetSubscriptions();
    },

    /** @property {Object} List of subscriptions, to be defined */
    subscriptions: {},

    /**
     * Subscribe to each subscription
     * @param {Object} [subscriptions] An optional hash of subscription to add
     */

    setSubscriptions: function(subscriptions){
      if (subscriptions) _.extend(this.subscriptions || {}, subscriptions);
      subscriptions = subscriptions || this.subscriptions;
      if (!subscriptions || _.isEmpty(subscriptions)) return;
      // Just to be sure we don't set duplicate
      this.unsetSubscriptions(subscriptions);

      _.each(subscriptions, function(subscription, channel){
        var once;
        if (subscription.$once) {
          subscription = subscription.$once;
          once = true;
        }
        if (_.isString(subscription)) {
          subscription = this[subscription];
        }
        Backbone.Mediator.subscribe(channel, subscription, this, once);
      }, this);
    },

    /**
     * Unsubscribe to each subscription
     * @param {Object} [subscriptions] An optional hash of subscription to remove
     */
    unsetSubscriptions: function(subscriptions){
      subscriptions = subscriptions || this.subscriptions;
      if (!subscriptions || _.isEmpty(subscriptions)) return;
      _.each(subscriptions, function(subscription, channel){
        if (_.isString(subscription)) {
          subscription = this[subscription];
        }
        Backbone.Mediator.unsubscribe(channel, subscription.$once || subscription, this);
      }, this);
    }
  };

  /**
   * @lends Backbone.View.prototype
   */
  _.extend(Backbone.View.prototype, Subscriber);

  /**
   * @lends Backbone.Mediator
   */
  _.extend(Backbone.Mediator, {
    /**
     * Shortcut for publish
     * @function
     */
    pub: Backbone.Mediator.publish,
    /**
     * Shortcut for subscribe
     * @function
     */
    sub: Backbone.Mediator.subscribe
  });

  return Backbone;

});
;/*
Copyright (c) 2011 Sencha Inc. - Author: Nicolas Garcia Belmonte (http://philogb.github.com/)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

 */
(function() {
    window.$jit = function(x) {
        x = x || window;
        for (var y in $jit) {
            if ($jit[y].$extend) {
                x[y] = $jit[y]
            }
        }
    };
    $jit.version = "2.0.1";
    var c = function(w) {
        return document.getElementById(w)
    };
    c.empty = function() {};
    c.extend = function(y, w) {
        for (var x in (w || {})) {
            y[x] = w[x]
        }
        return y
    };
    c.lambda = function(w) {
        return (typeof w == "function") ? w : function() {
            return w
        }
    };
    c.time = Date.now || function() {
        return + new Date
    };
    c.splat = function(x) {
        var w = c.type(x);
        return w ? ((w != "array") ? [x] : x) : []
    };
    c.type = function(x) {
        var w = c.type.s.call(x).match(/^\[object\s(.*)\]$/)[1].toLowerCase();
        if (w != "object") {
            return w
        }
        if (x && x.$$family) {
            return x.$$family
        }
        return (x && x.nodeName && x.nodeType == 1) ? "element" : w
    };
    c.type.s = Object.prototype.toString;
    c.each = function(B, A) {
        var z = c.type(B);
        if (z == "object") {
            for (var y in B) {
                A(B[y], y)
            }
        } else {
            for (var x = 0, w = B.length; x < w; x++) {
                A(B[x], x)
            }
        }
    };
    c.indexOf = function(z, y) {
        if (Array.indexOf) {
            return z.indexOf(y)
        }
        for (var x = 0, w = z.length; x < w; x++) {
            if (z[x] === y) {
                return x
            }
        }
        return -1
    };
    c.map = function(y, x) {
        var w = [];
        c.each(y, function(A, z) {
            w.push(x(A, z))
        });
        return w
    };
    c.reduce = function(A, y, x) {
        var w = A.length;
        if (w == 0) {
            return x
        }
        var z = arguments.length == 3 ? x: A[--w];
        while (w--) {
            z = y(z, A[w])
        }
        return z
    };
    c.merge = function() {
        var A = {};
        for (var z = 0, w = arguments.length; z < w; z++) {
            var x = arguments[z];
            if (c.type(x) != "object") {
                continue
            }
            for (var y in x) {
                var C = x[y], B = A[y];
                A[y] = (B && c.type(C) == "object" && c.type(B) == "object") ? c.merge(B, C) : c.unlink(C)
            }
        }
        return A
    };
    c.unlink = function(y) {
        var x;
        switch (c.type(y)) {
        case"object":
            x = {};
            for (var A in y) {
                x[A] = c.unlink(y[A])
            }
            break;
        case"array":
            x = [];
            for (var z = 0, w = y.length; z < w; z++) {
                x[z] = c.unlink(y[z])
            }
            break;
        default:
            return y
        }
        return x
    };
    c.zip = function() {
        if (arguments.length === 0) {
            return []
        }
        for (var y = 0, x = [], w = arguments.length, B = arguments[0].length; y < B; y++) {
            for (var z = 0, A = []; z < w; z++) {
                A.push(arguments[z][y])
            }
            x.push(A)
        }
        return x
    };
    c.rgbToHex = function(A, z) {
        if (A.length < 3) {
            return null
        }
        if (A.length == 4 && A[3] == 0&&!z) {
            return "transparent"
        }
        var x = [];
        for (var w = 0; w < 3; w++) {
            var y = (A[w]-0).toString(16);
            x.push(y.length == 1 ? "0" + y : y)
        }
        return z ? x : "#" + x.join("")
    };
    c.hexToRgb = function(y) {
        if (y.length != 7) {
            y = y.match(/^#?(\w{1,2})(\w{1,2})(\w{1,2})$/);
            y.shift();
            if (y.length != 3) {
                return null
            }
            var w = [];
            for (var x = 0; x < 3; x++) {
                var z = y[x];
                if (z.length == 1) {
                    z += z
                }
                w.push(parseInt(z, 16))
            }
            return w
        } else {
            y = parseInt(y.slice(1), 16);
            return [y>>16, y>>8 & 255, y & 255]
        }
    };
    c.destroy = function(w) {
        c.clean(w);
        if (w.parentNode) {
            w.parentNode.removeChild(w)
        }
        if (w.clearAttributes) {
            w.clearAttributes()
        }
    };
    c.clean = function(z) {
        for (var y = z.childNodes, x = 0, w = y.length; x < w; x++) {
            c.destroy(y[x])
        }
    };
    c.addEvent = function(y, x, w) {
        if (y.addEventListener) {
            y.addEventListener(x, w, false)
        } else {
            y.attachEvent("on" + x, w)
        }
    };
    c.addEvents = function(x, y) {
        for (var w in y) {
            c.addEvent(x, w, y[w])
        }
    };
    c.hasClass = function(x, w) {
        return (" " + x.className + " ").indexOf(" " + w + " ")>-1
    };
    c.addClass = function(x, w) {
        if (!c.hasClass(x, w)) {
            x.className = (x.className + " " + w)
        }
    };
    c.removeClass = function(x, w) {
        x.className = x.className.replace(new RegExp("(^|\\s)" + w + "(?:\\s|$)"), "$1")
    };
    c.getPos = function(y) {
        var B = A(y);
        var w = z(y);
        return {
            x: B.x - w.x,
            y: B.y - w.y
        };
        function A(D) {
            var C = {
                x: 0,
                y: 0
            };
            while (D&&!x(D)) {
                C.x += D.offsetLeft;
                C.y += D.offsetTop;
                D = D.offsetParent
            }
            return C
        }
        function z(D) {
            var C = {
                x: 0,
                y: 0
            };
            while (D&&!x(D)) {
                C.x += D.scrollLeft;
                C.y += D.scrollTop;
                D = D.parentNode
            }
            return C
        }
        function x(C) {
            return (/^(?:body|html)$/i).test(C.tagName)
        }
    };
    c.event = {
        get: function(x, w) {
            w = w || window;
            return x || w.event
        },
        getWheel: function(w) {
            return w.wheelDelta ? w.wheelDelta / 120 : - (w.detail || 0) / 3
        },
        isRightClick: function(w) {
            return (w.which == 3 || w.button == 2)
        },
        getPos: function(z, y) {
            y = y || window;
            z = z || y.event;
            var x = y.document;
            x = x.documentElement || x.body;
            if (z.touches && z.touches.length) {
                z = z.touches[0]
            }
            var w = {
                x: z.pageX || (z.clientX + x.scrollLeft),
                y: z.pageY || (z.clientY + x.scrollTop)
            };
            return w
        },
        stop: function(w) {
            if (w.stopPropagation) {
                w.stopPropagation()
            }
            w.cancelBubble = true;
            if (w.preventDefault) {
                w.preventDefault()
            } else {
                w.returnValue = false
            }
        }
    };
    $jit.util = $jit.id = c;
    var q = function(x) {
        x = x || {};
        var w = function() {
            for (var A in this) {
                if (typeof this[A] != "function") {
                    this[A] = c.unlink(this[A])
                }
            }
            this.constructor = w;
            if (q.prototyping) {
                return this
            }
            var z = this.initialize ? this.initialize.apply(this, arguments): this;
            this.$$family = "class";
            return z
        };
        for (var y in q.Mutators) {
            if (!x[y]) {
                continue
            }
            x = q.Mutators[y](x, x[y]);
            delete x[y]
        }
        c.extend(w, this);
        w.constructor = q;
        w.prototype = x;
        return w
    };
    q.Mutators = {
        Implements: function(w, x) {
            c.each(c.splat(x), function(z) {
                q.prototyping = z;
                var y = (typeof z == "function") ? new z: z;
                for (var A in y) {
                    if (!(A in w)) {
                        w[A] = y[A]
                    }
                }
                delete q.prototyping
            });
            return w
        }
    };
    c.extend(q, {
        inherit: function(w, z) {
            for (var y in z) {
                var x = z[y];
                var B = w[y];
                var A = c.type(x);
                if (B && A == "function") {
                    if (x != B) {
                        q.override(w, y, x)
                    }
                } else {
                    if (A == "object") {
                        w[y] = c.merge(B, x)
                    } else {
                        w[y] = x
                    }
                }
            }
            return w
        },
        override: function(x, w, A) {
            var z = q.prototyping;
            if (z && x[w] != z[w]) {
                z = null
            }
            var y = function() {
                var B = this.parent;
                this.parent = z ? z[w] : x[w];
                var C = A.apply(this, arguments);
                this.parent = B;
                return C
            };
            x[w] = y
        }
    });
    q.prototype.implement = function() {
        var w = this.prototype;
        c.each(Array.prototype.slice.call(arguments || []), function(x) {
            q.inherit(w, x)
        });
        return this
    };
    $jit.Class = q;
    $jit.json = {
        prune: function(x, w) {
            this.each(x, function(z, y) {
                if (y == w && z.children) {
                    delete z.children;
                    z.children = []
                }
            })
        },
        getParent: function(w, A) {
            if (w.id == A) {
                return false
            }
            var z = w.children;
            if (z && z.length > 0) {
                for (var y = 0; y < z.length; y++) {
                    if (z[y].id == A) {
                        return w
                    } else {
                        var x = this.getParent(z[y], A);
                        if (x) {
                            return x
                        }
                    }
                }
            }
            return false
        },
        getSubtree: function(w, A) {
            if (w.id == A) {
                return w
            }
            for (var y = 0, z = w.children; z && y < z.length; y++) {
                var x = this.getSubtree(z[y], A);
                if (x != null) {
                    return x
                }
            }
            return null
        },
        eachLevel: function(w, B, y, A) {
            if (B <= y) {
                A(w, B);
                if (!w.children) {
                    return 
                }
                for (var x = 0, z = w.children; x < z.length; x++) {
                    this.eachLevel(z[x], B + 1, y, A)
                }
            }
        },
        each: function(w, x) {
            this.eachLevel(w, 0, Number.MAX_VALUE, x)
        }
    };
    $jit.Trans = {
        $extend: true,
        linear: function(w) {
            return w
        }
    };
    var i = $jit.Trans;
    (function() {
        var w = function(z, y) {
            y = c.splat(y);
            return c.extend(z, {
                easeIn: function(A) {
                    return z(A, y)
                },
                easeOut: function(A) {
                    return 1 - z(1 - A, y)
                },
                easeInOut: function(A) {
                    return (A <= 0.5) ? z(2 * A, y) / 2 : (2 - z(2 * (1 - A), y)) / 2
                }
            })
        };
        var x = {
            Pow: function(z, y) {
                return Math.pow(z, y[0] || 6)
            },
            Expo: function(y) {
                return Math.pow(2, 8 * (y-1))
            },
            Circ: function(y) {
                return 1 - Math.sin(Math.acos(y))
            },
            Sine: function(y) {
                return 1 - Math.sin((1 - y) * Math.PI / 2)
            },
            Back: function(z, y) {
                y = y[0] || 1.618;
                return Math.pow(z, 2) * ((y + 1) * z - y)
            },
            Bounce: function(B) {
                var A;
                for (var z = 0, y = 1; 1; z += y, y/=2) {
                    if (B >= (7-4 * z) / 11) {
                        A = y * y - Math.pow((11-6 * z-11 * B) / 4, 2);
                        break
                    }
                }
                return A
            },
            Elastic: function(z, y) {
                return Math.pow(2, 10*--z) * Math.cos(20 * z * Math.PI * (y[0] || 1) / 3)
            }
        };
        c.each(x, function(z, y) {
            i[y] = w(z)
        });
        c.each(["Quad", "Cubic", "Quart", "Quint"], function(z, y) {
            i[z] = w(function(A) {
                return Math.pow(A, [y + 2])
            })
        })
    })();
    var u = new q({
        initialize: function(w) {
            this.setOptions(w)
        },
        setOptions: function(w) {
            var x = {
                duration: 2500,
                fps: 40,
                transition: i.Quart.easeInOut,
                compute: c.empty,
                complete: c.empty,
                link: "ignore"
            };
            this.opt = c.merge(x, w || {});
            return this
        },
        step: function() {
            var x = c.time(), w = this.opt;
            if (x < this.time + w.duration) {
                var y = w.transition((x - this.time) / w.duration);
                w.compute(y)
            } else {
                this.timer = clearInterval(this.timer);
                w.compute(1);
                w.complete()
            }
        },
        start: function() {
            if (!this.check()) {
                return this
            }
            this.time = 0;
            this.startTimer();
            return this
        },
        startTimer: function() {
            var w = this, x = this.opt.fps;
            if (this.timer) {
                return false
            }
            this.time = c.time() - this.time;
            this.timer = setInterval((function() {
                w.step()
            }), Math.round(1000 / x));
            return true
        },
        pause: function() {
            this.stopTimer();
            return this
        },
        resume: function() {
            this.startTimer();
            return this
        },
        stopTimer: function() {
            if (!this.timer) {
                return false
            }
            this.time = c.time() - this.time;
            this.timer = clearInterval(this.timer);
            return true
        },
        check: function() {
            if (!this.timer) {
                return true
            }
            if (this.opt.link == "cancel") {
                this.stopTimer();
                return true
            }
            return false
        }
    });
    var n = function() {
        var y = arguments;
        for (var A = 0, w = y.length, x = {}; A < w; A++) {
            var z = n[y[A]];
            if (z.$extend) {
                c.extend(x, z)
            } else {
                x[y[A]] = z
            }
        }
        return x
    };
    n.AreaChart = {
        $extend: true,
        animate: true,
        labelOffset: 3,
        type: "stacked",
        Tips: {
            enable: false,
            onShow: c.empty,
            onHide: c.empty
        },
        Events: {
            enable: false,
            onClick: c.empty
        },
        selectOnHover: true,
        showAggregates: true,
        showLabels: true,
        filterOnClick: false,
        restoreOnRightClick: false
    };
    n.Margin = {
        $extend: false,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };
    n.Canvas = {
        $extend: true,
        injectInto: "id",
        type: "2D",
        width: false,
        height: false,
        useCanvas: false,
        withLabels: true,
        background: false,
        Scene: {
            Lighting: {
                enable: false,
                ambient: [1, 1, 1],
                directional: {
                    direction: {
                        x: -100,
                        y: -100,
                        z: -100
                    },
                    color: [0.5, 0.3, 0.1]
                }
            }
        }
    };
    n.Tree = {
        $extend: true,
        orientation: "left",
        subtreeOffset: 8,
        siblingOffset: 5,
        indent: 10,
        multitree: false,
        align: "center"
    };
    n.Node = {
        $extend: false,
        overridable: false,
        type: "circle",
        color: "#ccb",
        alpha: 1,
        dim: 3,
        height: 20,
        width: 90,
        autoHeight: false,
        autoWidth: false,
        lineWidth: 1,
        transform: true,
        align: "center",
        angularWidth: 1,
        span: 1,
        CanvasStyles: {}
    };
    n.Edge = {
        $extend: false,
        overridable: false,
        type: "line",
        color: "#ccb",
        lineWidth: 1,
        dim: 15,
        alpha: 1,
        epsilon: 7,
        CanvasStyles: {}
    };
    n.Fx = {
        $extend: true,
        fps: 40,
        duration: 2500,
        transition: $jit.Trans.Quart.easeInOut,
        clearCanvas: true
    };
    n.Label = {
        $extend: false,
        overridable: false,
        type: "HTML",
        style: " ",
        size: 10,
        family: "sans-serif",
        textAlign: "center",
        textBaseline: "alphabetic",
        color: "#fff"
    };
    n.Tips = {
        $extend: false,
        enable: false,
        type: "auto",
        offsetX: 20,
        offsetY: 20,
        force: false,
        onShow: c.empty,
        onHide: c.empty
    };
    n.NodeStyles = {
        $extend: false,
        enable: false,
        type: "auto",
        stylesHover: false,
        stylesClick: false
    };
    n.Events = {
        $extend: false,
        enable: false,
        enableForEdges: false,
        type: "auto",
        onClick: c.empty,
        onRightClick: c.empty,
        onMouseMove: c.empty,
        onMouseEnter: c.empty,
        onMouseLeave: c.empty,
        onDragStart: c.empty,
        onDragMove: c.empty,
        onDragCancel: c.empty,
        onDragEnd: c.empty,
        onTouchStart: c.empty,
        onTouchMove: c.empty,
        onTouchEnd: c.empty,
        onMouseWheel: c.empty
    };
    n.Navigation = {
        $extend: false,
        enable: false,
        type: "auto",
        panning: false,
        zooming: false
    };
    n.Controller = {
        $extend: true,
        onBeforeCompute: c.empty,
        onAfterCompute: c.empty,
        onCreateLabel: c.empty,
        onPlaceLabel: c.empty,
        onComplete: c.empty,
        onBeforePlotLine: c.empty,
        onAfterPlotLine: c.empty,
        onBeforePlotNode: c.empty,
        onAfterPlotNode: c.empty,
        request: false
    };
    var t = {
        initialize: function(y, w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.config = w.config[y];
            this.nodeTypes = w.fx.nodeTypes;
            var x = this.config.type;
            this.dom = x == "auto" ? (w.config.Label.type != "Native") : (x != "Native");
            this.labelContainer = this.dom && w.labels.getLabelContainer();
            this.isEnabled() && this.initializePost()
        },
        initializePost: c.empty,
        setAsProperty: c.lambda(false),
        isEnabled: function() {
            return this.config.enable
        },
        isLabel: function(B, A, z) {
            B = c.event.get(B, A);
            var w = this.labelContainer, y = B.target || B.srcElement, x = B.relatedTarget;
            if (z) {
                return x && x == this.viz.canvas.getCtx().canvas&&!!y && this.isDescendantOf(y, w)
            } else {
                return this.isDescendantOf(y, w)
            }
        },
        isDescendantOf: function(x, w) {
            while (x && x.parentNode) {
                if (x.parentNode == w) {
                    return x
                }
                x = x.parentNode
            }
            return false
        }
    };
    var h = {
        onMouseUp: c.empty,
        onMouseDown: c.empty,
        onMouseMove: c.empty,
        onMouseOver: c.empty,
        onMouseOut: c.empty,
        onMouseWheel: c.empty,
        onTouchStart: c.empty,
        onTouchMove: c.empty,
        onTouchEnd: c.empty,
        onTouchCancel: c.empty
    };
    var s = new q({
        initialize: function(w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.node = false;
            this.edge = false;
            this.registeredObjects = [];
            this.attachEvents()
        },
        attachEvents: function() {
            var y = this.canvas.getElement(), x = this;
            y.oncontextmenu = c.lambda(false);
            c.addEvents(y, {
                mouseup: function(B, A) {
                    var z = c.event.get(B, A);
                    x.handleEvent("MouseUp", B, A, x.makeEventObject(B, A), c.event.isRightClick(z))
                },
                mousedown: function(B, A) {
                    var z = c.event.get(B, A);
                    x.handleEvent("MouseDown", B, A, x.makeEventObject(B, A), c.event.isRightClick(z))
                },
                mousemove: function(A, z) {
                    x.handleEvent("MouseMove", A, z, x.makeEventObject(A, z))
                },
                mouseover: function(A, z) {
                    x.handleEvent("MouseOver", A, z, x.makeEventObject(A, z))
                },
                mouseout: function(A, z) {
                    x.handleEvent("MouseOut", A, z, x.makeEventObject(A, z))
                },
                touchstart: function(A, z) {
                    x.handleEvent("TouchStart", A, z, x.makeEventObject(A, z))
                },
                touchmove: function(A, z) {
                    x.handleEvent("TouchMove", A, z, x.makeEventObject(A, z))
                },
                touchend: function(A, z) {
                    x.handleEvent("TouchEnd", A, z, x.makeEventObject(A, z))
                }
            });
            var w = function(C, B) {
                var A = c.event.get(C, B);
                var z = c.event.getWheel(A);
                x.handleEvent("MouseWheel", C, B, z)
            };
            if (!document.getBoxObjectFor && window.mozInnerScreenX == null) {
                c.addEvent(y, "mousewheel", w)
            } else {
                y.addEventListener("DOMMouseScroll", w, false)
            }
        },
        register: function(w) {
            this.registeredObjects.push(w)
        },
        handleEvent: function() {
            var x = Array.prototype.slice.call(arguments), A = x.shift();
            for (var z = 0, y = this.registeredObjects, w = y.length; z < w; z++) {
                y[z]["on" + A].apply(y[z], x)
            }
        },
        makeEventObject: function(C, B) {
            var z = this, A = this.viz.graph, y = this.viz.fx, x = y.nodeTypes, w = y.edgeTypes;
            return {
                pos: false,
                node: false,
                edge: false,
                contains: false,
                getNodeCalled: false,
                getEdgeCalled: false,
                getPos: function() {
                    var F = z.viz.canvas, G = F.getSize(), H = F.getPos(), E = F.translateOffsetX, D = F.translateOffsetY, K = F.scaleOffsetX, I = F.scaleOffsetY, J = c.event.getPos(C, B);
                    this.pos = {
                        x: (J.x - H.x - G.width / 2 - E) * 1 / K,
                        y: (J.y - H.y - G.height / 2 - D) * 1 / I
                    };
                    return this.pos
                },
                getNode: function() {
                    if (this.getNodeCalled) {
                        return this.node
                    }
                    this.getNodeCalled = true;
                    for (var G in A.nodes) {
                        var F = A.nodes[G], E = F && x[F.getData("type")], D = E && E.contains && E.contains.call(y, F, this.getPos());
                        if (D) {
                            this.contains = D;
                            return z.node = this.node = F
                        }
                    }
                    return z.node = this.node = false
                },
                getEdge: function() {
                    if (this.getEdgeCalled) {
                        return this.edge
                    }
                    this.getEdgeCalled = true;
                    var F = {};
                    for (var J in A.edges) {
                        var H = A.edges[J];
                        F[J] = true;
                        for (var I in H) {
                            if (I in F) {
                                continue
                            }
                            var G = H[I], E = G && w[G.getData("type")], D = E && E.contains && E.contains.call(y, G, this.getPos());
                            if (D) {
                                this.contains = D;
                                return z.edge = this.edge = G
                            }
                        }
                    }
                    return z.edge = this.edge = false
                },
                getContains: function() {
                    if (this.getNodeCalled) {
                        return this.contains
                    }
                    this.getNode();
                    return this.contains
                }
            }
        }
    });
    var o = {
        initializeExtras: function() {
            var x = new s(this), w = this;
            c.each(["NodeStyles", "Tips", "Navigation", "Events"], function(y) {
                var z = new o.Classes[y](y, w);
                if (z.isEnabled()) {
                    x.register(z)
                }
                if (z.setAsProperty()) {
                    w[y.toLowerCase()] = z
                }
            })
        }
    };
    o.Classes = {};
    o.Classes.Events = new q({
        Implements: [t, h],
        initializePost: function() {
            this.fx = this.viz.fx;
            this.ntypes = this.viz.fx.nodeTypes;
            this.etypes = this.viz.fx.edgeTypes;
            this.hovered = false;
            this.pressed = false;
            this.touched = false;
            this.touchMoved = false;
            this.moved = false
        },
        setAsProperty: c.lambda(true),
        onMouseUp: function(A, z, x, y) {
            var w = c.event.get(A, z);
            if (!this.moved) {
                if (y) {
                    this.config.onRightClick(this.hovered, x, w)
                } else {
                    this.config.onClick(this.pressed, x, w)
                }
            }
            if (this.pressed) {
                if (this.moved) {
                    this.config.onDragEnd(this.pressed, x, w)
                } else {
                    this.config.onDragCancel(this.pressed, x, w)
                }
                this.pressed = this.moved = false
            }
        },
        onMouseOut: function(B, A, z) {
            var x = c.event.get(B, A), y;
            if (this.dom && (y = this.isLabel(B, A, true))) {
                this.config.onMouseLeave(this.viz.graph.getNode(y.id), z, x);
                this.hovered = false;
                return 
            }
            var w = x.relatedTarget, C = this.canvas.getElement();
            while (w && w.parentNode) {
                if (C == w.parentNode) {
                    return 
                }
                w = w.parentNode
            }
            if (this.hovered) {
                this.config.onMouseLeave(this.hovered, z, x);
                this.hovered = false
            }
        },
        onMouseOver: function(A, z, y) {
            var w = c.event.get(A, z), x;
            if (this.dom && (x = this.isLabel(A, z, true))) {
                this.hovered = this.viz.graph.getNode(x.id);
                this.config.onMouseEnter(this.hovered, y, w)
            }
        },
        onMouseMove: function(C, B, A) {
            var x, w = c.event.get(C, B);
            if (this.pressed) {
                this.moved = true;
                this.config.onDragMove(this.pressed, A, w);
                return 
            }
            if (this.dom) {
                this.config.onMouseMove(this.hovered, A, w)
            } else {
                if (this.hovered) {
                    var D = this.hovered;
                    var z = D.nodeFrom ? this.etypes[D.getData("type")]: this.ntypes[D.getData("type")];
                    var y = z && z.contains && z.contains.call(this.fx, D, A.getPos());
                    if (y) {
                        this.config.onMouseMove(D, A, w);
                        return 
                    } else {
                        this.config.onMouseLeave(D, A, w);
                        this.hovered = false
                    }
                }
                if (this.hovered = (A.getNode() || (this.config.enableForEdges && A.getEdge()))) {
                    this.config.onMouseEnter(this.hovered, A, w)
                } else {
                    this.config.onMouseMove(false, A, w)
                }
            }
        },
        onMouseWheel: function(x, w, y) {
            this.config.onMouseWheel(y, c.event.get(x, w))
        },
        onMouseDown: function(A, z, y) {
            var w = c.event.get(A, z), x;
            if (this.dom) {
                if (x = this.isLabel(A, z)) {
                    this.pressed = this.viz.graph.getNode(x.id)
                }
            } else {
                this.pressed = y.getNode() || (this.config.enableForEdges && y.getEdge())
            }
            this.pressed && this.config.onDragStart(this.pressed, y, w)
        },
        onTouchStart: function(A, z, y) {
            var w = c.event.get(A, z), x;
            if (this.dom && (x = this.isLabel(A, z))) {
                this.touched = this.viz.graph.getNode(x.id)
            } else {
                this.touched = y.getNode() || (this.config.enableForEdges && y.getEdge())
            }
            this.touched && this.config.onTouchStart(this.touched, y, w)
        },
        onTouchMove: function(z, y, x) {
            var w = c.event.get(z, y);
            if (this.touched) {
                this.touchMoved = true;
                this.config.onTouchMove(this.touched, x, w)
            }
        },
        onTouchEnd: function(z, y, x) {
            var w = c.event.get(z, y);
            if (this.touched) {
                if (this.touchMoved) {
                    this.config.onTouchEnd(this.touched, x, w)
                } else {
                    this.config.onTouchCancel(this.touched, x, w)
                }
                this.touched = this.touchMoved = false
            }
        }
    });
    o.Classes.Tips = new q({
        Implements: [t, h],
        initializePost: function() {
            if (document.body) {
                var w = c("_tooltip") || document.createElement("div");
                w.id = "_tooltip";
                w.className = "tip";
                c.extend(w.style, {
                    position: "absolute",
                    display: "none",
                    zIndex: 13000
                });
                document.body.appendChild(w);
                this.tip = w;
                this.node = false
            }
        },
        setAsProperty: c.lambda(true),
        onMouseOut: function(z, y) {
            var x = c.event.get(z, y);
            if (this.dom && this.isLabel(z, y, true)) {
                this.hide(true);
                return 
            }
            var w = z.relatedTarget, A = this.canvas.getElement();
            while (w && w.parentNode) {
                if (A == w.parentNode) {
                    return 
                }
                w = w.parentNode
            }
            this.hide(false)
        },
        onMouseOver: function(y, x) {
            var w;
            if (this.dom && (w = this.isLabel(y, x, false))) {
                this.node = this.viz.graph.getNode(w.id);
                this.config.onShow(this.tip, this.node, w)
            }
        },
        onMouseMove: function(z, y, w) {
            if (this.dom && this.isLabel(z, y)) {
                this.setTooltipPosition(c.event.getPos(z, y))
            }
            if (!this.dom) {
                var x = w.getNode();
                if (!x) {
                    this.hide(true);
                    return 
                }
                if (this.config.force ||!this.node || this.node.id != x.id) {
                    this.node = x;
                    this.config.onShow(this.tip, x, w.getContains())
                }
                this.setTooltipPosition(c.event.getPos(z, y))
            }
        },
        setTooltipPosition: function(F) {
            var B = this.tip, A = B.style, z = this.config;
            A.display = "";
            var D = {
                height: document.body.clientHeight,
                width: document.body.clientWidth
            };
            var C = {
                width: B.offsetWidth,
                height: B.offsetHeight
            };
            var w = z.offsetX, E = z.offsetY;
            A.top = ((F.y + E + C.height > D.height) ? (F.y - C.height - E) : F.y + E) + "px";
            A.left = ((F.x + C.width + w > D.width) ? (F.x - C.width - w) : F.x + w) + "px"
        },
        hide: function(w) {
            this.tip.style.display = "none";
            w && this.config.onHide()
        }
    });
    o.Classes.NodeStyles = new q({
        Implements: [t, h],
        initializePost: function() {
            this.fx = this.viz.fx;
            this.types = this.viz.fx.nodeTypes;
            this.nStyles = this.config;
            this.nodeStylesOnHover = this.nStyles.stylesHover;
            this.nodeStylesOnClick = this.nStyles.stylesClick;
            this.hoveredNode = false;
            this.fx.nodeFxAnimation = new u();
            this.down = false;
            this.move = false
        },
        onMouseOut: function(y, x) {
            this.down = this.move = false;
            if (!this.hoveredNode) {
                return 
            }
            if (this.dom && this.isLabel(y, x, true)) {
                this.toggleStylesOnHover(this.hoveredNode, false)
            }
            var w = y.relatedTarget, z = this.canvas.getElement();
            while (w && w.parentNode) {
                if (z == w.parentNode) {
                    return 
                }
                w = w.parentNode
            }
            this.toggleStylesOnHover(this.hoveredNode, false);
            this.hoveredNode = false
        },
        onMouseOver: function(z, y) {
            var w;
            if (this.dom && (w = this.isLabel(z, y, true))) {
                var x = this.viz.graph.getNode(w.id);
                if (x.selected) {
                    return 
                }
                this.hoveredNode = x;
                this.toggleStylesOnHover(this.hoveredNode, true)
            }
        },
        onMouseDown: function(A, z, x, y) {
            if (y) {
                return 
            }
            var w;
            if (this.dom && (w = this.isLabel(A, z))) {
                this.down = this.viz.graph.getNode(w.id)
            } else {
                if (!this.dom) {
                    this.down = x.getNode()
                }
            }
            this.move = false
        },
        onMouseUp: function(z, y, w, x) {
            if (x) {
                return 
            }
            if (!this.move) {
                this.onClick(w.getNode())
            }
            this.down = this.move = false
        },
        getRestoredStyles: function(x, w) {
            var z = {}, y = this["nodeStylesOn" + w];
            for (var A in y) {
                z[A] = x.styles["$" + A]
            }
            return z
        },
        toggleStylesOnHover: function(w, x) {
            if (this.nodeStylesOnHover) {
                this.toggleStylesOn("Hover", w, x)
            }
        },
        toggleStylesOnClick: function(w, x) {
            if (this.nodeStylesOnClick) {
                this.toggleStylesOn("Click", w, x)
            }
        },
        toggleStylesOn: function(A, w, C) {
            var D = this.viz;
            var B = this.nStyles;
            if (C) {
                var z = this;
                if (!w.styles) {
                    w.styles = c.merge(w.data, {})
                }
                for (var E in this["nodeStylesOn" + A]) {
                    var x = "$" + E;
                    if (!(x in w.styles)) {
                        w.styles[x] = w.getData(E)
                    }
                }
                D.fx.nodeFx(c.extend({
                    elements: {
                        id: w.id,
                        properties: z["nodeStylesOn" + A]
                    },
                    transition: i.Quart.easeOut,
                    duration: 300,
                    fps: 40
                }, this.config))
            } else {
                var y = this.getRestoredStyles(w, A);
                D.fx.nodeFx(c.extend({
                    elements: {
                        id: w.id,
                        properties: y
                    },
                    transition: i.Quart.easeOut,
                    duration: 300,
                    fps: 40
                }, this.config))
            }
        },
        onClick: function(w) {
            if (!w) {
                return 
            }
            var x = this.nodeStylesOnClick;
            if (!x) {
                return 
            }
            if (w.selected) {
                this.toggleStylesOnClick(w, false);
                delete w.selected
            } else {
                this.viz.graph.eachNode(function(z) {
                    if (z.selected) {
                        for (var y in x) {
                            z.setData(y, z.styles["$" + y], "end")
                        }
                        delete z.selected
                    }
                });
                this.toggleStylesOnClick(w, true);
                w.selected = true;
                delete w.hovered;
                this.hoveredNode = false
            }
        },
        onMouseMove: function(C, B, z) {
            if (this.down) {
                this.move = true
            }
            if (this.dom && this.isLabel(C, B)) {
                return 
            }
            var A = this.nodeStylesOnHover;
            if (!A) {
                return 
            }
            if (!this.dom) {
                if (this.hoveredNode) {
                    var x = this.types[this.hoveredNode.getData("type")];
                    var w = x && x.contains && x.contains.call(this.fx, this.hoveredNode, z.getPos());
                    if (w) {
                        return 
                    }
                }
                var y = z.getNode();
                if (!this.hoveredNode&&!y) {
                    return 
                }
                if (y.hovered) {
                    return 
                }
                if (y&&!y.selected) {
                    this.fx.nodeFxAnimation.stopTimer();
                    this.viz.graph.eachNode(function(E) {
                        if (E.hovered&&!E.selected) {
                            for (var D in A) {
                                E.setData(D, E.styles["$" + D], "end")
                            }
                            delete E.hovered
                        }
                    });
                    y.hovered = true;
                    this.hoveredNode = y;
                    this.toggleStylesOnHover(y, true)
                } else {
                    if (this.hoveredNode&&!this.hoveredNode.selected) {
                        this.fx.nodeFxAnimation.stopTimer();
                        this.toggleStylesOnHover(this.hoveredNode, false);
                        delete this.hoveredNode.hovered;
                        this.hoveredNode = false
                    }
                }
            }
        }
    });
    o.Classes.Navigation = new q({
        Implements: [t, h],
        initializePost: function() {
            this.pos = false;
            this.pressed = false
        },
        onMouseWheel: function(z, y, w) {
            if (!this.config.zooming) {
                return 
            }
            c.event.stop(c.event.get(z, y));
            var A = this.config.zooming / 1000, x = 1 + w * A;
            this.canvas.scale(x, x)
        },
        onMouseDown: function(B, A, z) {
            if (!this.config.panning) {
                return 
            }
            if (this.config.panning == "avoid nodes" && (this.dom ? this.isLabel(B, A) : z.getNode())) {
                return 
            }
            this.pressed = true;
            this.pos = z.getPos();
            var y = this.canvas, x = y.translateOffsetX, w = y.translateOffsetY, D = y.scaleOffsetX, C = y.scaleOffsetY;
            this.pos.x*=D;
            this.pos.x += x;
            this.pos.y*=C;
            this.pos.y += w
        },
        onMouseMove: function(D, C, F) {
            if (!this.config.panning) {
                return 
            }
            if (!this.pressed) {
                return 
            }
            if (this.config.panning == "avoid nodes" && (this.dom ? this.isLabel(D, C) : F.getNode())) {
                return 
            }
            var B = this.pos, E = F.getPos(), z = this.canvas, A = z.translateOffsetX, w = z.translateOffsetY, J = z.scaleOffsetX, H = z.scaleOffsetY;
            E.x*=J;
            E.y*=H;
            E.x += A;
            E.y += w;
            var I = E.x - B.x, G = E.y - B.y;
            this.pos = E;
            this.canvas.translate(I * 1 / J, G * 1 / H)
        },
        onMouseUp: function(z, y, x, w) {
            if (!this.config.panning) {
                return 
            }
            this.pressed = false
        }
    });
    var l;
    (function() {
        var w = typeof HTMLCanvasElement, y = (w == "object" || w == "function");
        function x(z, A) {
            var B = document.createElement(z);
            for (var C in A) {
                if (typeof A[C] == "object") {
                    c.extend(B[C], A[C])
                } else {
                    B[C] = A[C]
                }
            }
            if (z == "canvas"&&!y && G_vmlCanvasManager) {
                B = G_vmlCanvasManager.initElement(document.body.appendChild(B))
            }
            return B
        }
        $jit.Canvas = l = new q({
            canvases: [],
            pos: false,
            element: false,
            labelContainer: false,
            translateOffsetX: 0,
            translateOffsetY: 0,
            scaleOffsetX: 1,
            scaleOffsetY: 1,
            initialize: function(L, E) {
                this.viz = L;
                this.opt = this.config = E;
                var B = c.type(E.injectInto) == "string" ? E.injectInto: E.injectInto.id, K = E.type, C = B + "-label", z = c(B), D = E.width || z.offsetWidth, M = E.height || z.offsetHeight;
                this.id = B;
                var F = {
                    injectInto: B,
                    width: D,
                    height: M
                };
                this.element = x("div", {
                    id: B + "-canvaswidget",
                    style: {
                        position: "relative",
                        width: D + "px",
                        height: M + "px"
                    }
                });
                this.labelContainer = this.createLabelContainer(E.Label.type, C, F);
                this.canvases.push(new l.Base[K]({
                    config: c.extend({
                        idSuffix: "-canvas"
                    }, F),
                    plot: function(N) {
                        L.fx.plot()
                    },
                    resize: function() {
                        L.refresh()
                    }
                }));
                var G = E.background;
                if (G) {
                    var J = new l.Background[G.type](L, c.extend(G, F));
                    this.canvases.push(new l.Base[K](J))
                }
                var I = this.canvases.length;
                while (I--) {
                    this.element.appendChild(this.canvases[I].canvas);
                    if (I > 0) {
                        this.canvases[I].plot()
                    }
                }
                this.element.appendChild(this.labelContainer);
                z.appendChild(this.element);
                var A = null, H = this;
                c.addEvent(window, "scroll", function() {
                    clearTimeout(A);
                    A = setTimeout(function() {
                        H.getPos(true)
                    }, 500)
                })
            },
            getCtx: function(z) {
                return this.canvases[z || 0].getCtx()
            },
            getConfig: function() {
                return this.opt
            },
            getElement: function() {
                return this.element
            },
            getSize: function(z) {
                return this.canvases[z || 0].getSize()
            },
            resize: function(D, z) {
                this.getPos(true);
                this.translateOffsetX = this.translateOffsetY = 0;
                this.scaleOffsetX = this.scaleOffsetY = 1;
                for (var B = 0, A = this.canvases.length; B < A; B++) {
                    this.canvases[B].resize(D, z)
                }
                var C = this.element.style;
                C.width = D + "px";
                C.height = z + "px";
                if (this.labelContainer) {
                    this.labelContainer.style.width = D + "px"
                }
            },
            translate: function(z, D, C) {
                this.translateOffsetX += z * this.scaleOffsetX;
                this.translateOffsetY += D * this.scaleOffsetY;
                for (var B = 0, A = this.canvases.length; B < A; B++) {
                    this.canvases[B].translate(z, D, C)
                }
            },
            scale: function(E, B, C) {
                var F = this.scaleOffsetX * E, D = this.scaleOffsetY * B;
                var H = this.translateOffsetX * (E-1) / F, G = this.translateOffsetY * (B-1) / D;
                this.scaleOffsetX = F;
                this.scaleOffsetY = D;
                for (var A = 0, z = this.canvases.length; A < z; A++) {
                    this.canvases[A].scale(E, B, true)
                }
                this.translate(H, G, false)
            },
            getPos: function(z) {
                if (z ||!this.pos) {
                    return this.pos = c.getPos(this.getElement())
                }
                return this.pos
            },
            clear: function(z) {
                this.canvases[z || 0].clear()
            },
            path: function(A, B) {
                var z = this.canvases[0].getCtx();
                z.beginPath();
                B(z);
                z[A]();
                z.closePath()
            },
            createLabelContainer: function(B, F, E) {
                var D = "http://www.w3.org/2000/svg";
                if (B == "HTML" || B == "Native") {
                    return x("div", {
                        id: F,
                        style: {
                            overflow: "visible",
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: E.width + "px",
                            height: 0
                        }
                    })
                } else {
                    if (B == "SVG") {
                        var C = document.createElementNS(D, "svg:svg");
                        C.setAttribute("width", E.width);
                        C.setAttribute("height", E.height);
                        var A = C.style;
                        A.position = "absolute";
                        A.left = A.top = "0px";
                        var z = document.createElementNS(D, "svg:g");
                        z.setAttribute("width", E.width);
                        z.setAttribute("height", E.height);
                        z.setAttribute("x", 0);
                        z.setAttribute("y", 0);
                        z.setAttribute("id", F);
                        C.appendChild(z);
                        return C
                    }
                }
            }
        });
        l.Base = {};
        l.Base["2D"] = new q({
            translateOffsetX: 0,
            translateOffsetY: 0,
            scaleOffsetX: 1,
            scaleOffsetY: 1,
            initialize: function(z) {
                this.viz = z;
                this.opt = z.config;
                this.size = false;
                this.createCanvas();
                this.translateToCenter()
            },
            createCanvas: function() {
                var A = this.opt, B = A.width, z = A.height;
                this.canvas = x("canvas", {
                    id: A.injectInto + A.idSuffix,
                    width: B,
                    height: z,
                    style: {
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: B + "px",
                        height: z + "px"
                    }
                })
            },
            getCtx: function() {
                if (!this.ctx) {
                    return this.ctx = this.canvas.getContext("2d")
                }
                return this.ctx
            },
            getSize: function() {
                if (this.size) {
                    return this.size
                }
                var z = this.canvas;
                return this.size = {
                    width: z.width,
                    height: z.height
                }
            },
            translateToCenter: function(C) {
                var A = this.getSize(), B = C ? (A.width - C.width - this.translateOffsetX * 2): A.width;
                height = C ? (A.height - C.height - this.translateOffsetY * 2) : A.height;
                var z = this.getCtx();
                C && z.scale(1 / this.scaleOffsetX, 1 / this.scaleOffsetY);
                z.translate(B / 2, height / 2)
            },
            resize: function(C, z) {
                var B = this.getSize(), A = this.canvas, D = A.style;
                this.size = false;
                A.width = C;
                A.height = z;
                D.width = C + "px";
                D.height = z + "px";
                if (!y) {
                    this.translateToCenter(B)
                } else {
                    this.translateToCenter()
                }
                this.translateOffsetX = this.translateOffsetY = 0;
                this.scaleOffsetX = this.scaleOffsetY = 1;
                this.clear();
                this.viz.resize(C, z, this)
            },
            translate: function(z, D, A) {
                var C = this.scaleOffsetX, B = this.scaleOffsetY;
                this.translateOffsetX += z * C;
                this.translateOffsetY += D * B;
                this.getCtx().translate(z, D);
                !A && this.plot()
            },
            scale: function(z, B, A) {
                this.scaleOffsetX*=z;
                this.scaleOffsetY*=B;
                this.getCtx().scale(z, B);
                !A && this.plot()
            },
            clear: function() {
                var B = this.getSize(), A = this.translateOffsetX, z = this.translateOffsetY, D = this.scaleOffsetX, C = this.scaleOffsetY;
                this.getCtx().clearRect(( - B.width / 2 - A) * 1 / D, ( - B.height / 2 - z) * 1 / C, B.width * 1 / D, B.height * 1 / C)
            },
            plot: function() {
                this.clear();
                this.viz.plot(this)
            }
        });
        l.Background = {};
        l.Background.Circles = new q({
            initialize: function(z, A) {
                this.viz = z;
                this.config = c.merge({
                    idSuffix: "-bkcanvas",
                    levelDistance: 100,
                    numberOfCircles: 6,
                    CanvasStyles: {},
                    offset: 0
                }, A)
            },
            resize: function(A, z, B) {
                this.plot(B)
            },
            plot: function(z) {
                var A = z.canvas, G = z.getCtx(), D = this.config, F = D.CanvasStyles;
                for (var H in F) {
                    G[H] = F[H]
                }
                var B = D.numberOfCircles, E = D.levelDistance;
                for (var C = 1; C <= B; C++) {
                    G.beginPath();
                    G.arc(0, 0, E * C, 0, 2 * Math.PI, false);
                    G.stroke();
                    G.closePath()
                }
            }
        })
    })();
    var b = function(x, w) {
        this.theta = x || 0;
        this.rho = w || 0
    };
    $jit.Polar = b;
    b.prototype = {
        getc: function(w) {
            return this.toComplex(w)
        },
        getp: function() {
            return this
        },
        set: function(w) {
            w = w.getp();
            this.theta = w.theta;
            this.rho = w.rho
        },
        setc: function(w, z) {
            this.rho = Math.sqrt(w * w + z * z);
            this.theta = Math.atan2(z, w);
            if (this.theta < 0) {
                this.theta += Math.PI * 2
            }
        },
        setp: function(x, w) {
            this.theta = x;
            this.rho = w
        },
        clone: function() {
            return new b(this.theta, this.rho)
        },
        toComplex: function(A) {
            var w = Math.cos(this.theta) * this.rho;
            var z = Math.sin(this.theta) * this.rho;
            if (A) {
                return {
                    x: w,
                    y: z
                }
            }
            return new p(w, z)
        },
        add: function(w) {
            return new b(this.theta + w.theta, this.rho + w.rho)
        },
        scale: function(w) {
            return new b(this.theta, this.rho * w)
        },
        equals: function(w) {
            return this.theta == w.theta && this.rho == w.rho
        },
        $add: function(w) {
            this.theta = this.theta + w.theta;
            this.rho += w.rho;
            return this
        },
        $madd: function(w) {
            this.theta = (this.theta + w.theta)%(Math.PI * 2);
            this.rho += w.rho;
            return this
        },
        $scale: function(w) {
            this.rho*=w;
            return this
        },
        isZero: function() {
            var x = 0.0001, w = Math.abs;
            return w(this.theta) < x && w(this.rho) < x
        },
        interpolate: function(y, F) {
            var z = Math.PI, C = z * 2;
            var x = function(H) {
                var G = (H < 0) ? (H%C) + C: H%C;
                return G
            };
            var B = this.theta, E = y.theta;
            var A, D = Math.abs(B - E);
            if (D == z) {
                if (B > E) {
                    A = x((E + ((B - C) - E) * F))
                } else {
                    A = x((E - C + (B - (E)) * F))
                }
            } else {
                if (D >= z) {
                    if (B > E) {
                        A = x((E + ((B - C) - E) * F))
                    } else {
                        A = x((E - C + (B - (E - C)) * F))
                    }
                } else {
                    A = x((E + (B - E) * F))
                }
            }
            var w = (this.rho - y.rho) * F + y.rho;
            return {
                theta: A,
                rho: w
            }
        }
    };
    var k = function(x, w) {
        return new b(x, w)
    };
    b.KER = k(0, 0);
    var p = function(w, z) {
        this.x = w || 0;
        this.y = z || 0
    };
    $jit.Complex = p;
    p.prototype = {
        getc: function() {
            return this
        },
        getp: function(w) {
            return this.toPolar(w)
        },
        set: function(w) {
            w = w.getc(true);
            this.x = w.x;
            this.y = w.y
        },
        setc: function(w, z) {
            this.x = w;
            this.y = z
        },
        setp: function(x, w) {
            this.x = Math.cos(x) * w;
            this.y = Math.sin(x) * w
        },
        clone: function() {
            return new p(this.x, this.y)
        },
        toPolar: function(y) {
            var w = this.norm();
            var x = Math.atan2(this.y, this.x);
            if (x < 0) {
                x += Math.PI * 2
            }
            if (y) {
                return {
                    theta: x,
                    rho: w
                }
            }
            return new b(x, w)
        },
        norm: function() {
            return Math.sqrt(this.squaredNorm())
        },
        squaredNorm: function() {
            return this.x * this.x + this.y * this.y
        },
        add: function(w) {
            return new p(this.x + w.x, this.y + w.y)
        },
        prod: function(w) {
            return new p(this.x * w.x - this.y * w.y, this.y * w.x + this.x * w.y)
        },
        conjugate: function() {
            return new p(this.x, - this.y)
        },
        scale: function(w) {
            return new p(this.x * w, this.y * w)
        },
        equals: function(w) {
            return this.x == w.x && this.y == w.y
        },
        $add: function(w) {
            this.x += w.x;
            this.y += w.y;
            return this
        },
        $prod: function(A) {
            var w = this.x, z = this.y;
            this.x = w * A.x - z * A.y;
            this.y = z * A.x + w * A.y;
            return this
        },
        $conjugate: function() {
            this.y =- this.y;
            return this
        },
        $scale: function(w) {
            this.x*=w;
            this.y*=w;
            return this
        },
        $div: function(B) {
            var w = this.x, A = this.y;
            var z = B.squaredNorm();
            this.x = w * B.x + A * B.y;
            this.y = A * B.x - w * B.y;
            return this.$scale(1 / z)
        },
        isZero: function() {
            var x = 0.0001, w = Math.abs;
            return w(this.x) < x && w(this.y) < x
        }
    };
    var r = function(x, w) {
        return new p(x, w)
    };
    p.KER = r(0, 0);
    $jit.Graph = new q({
        initialize: function(y, x, w, C) {
            var A = {
                klass: p,
                Node: {}
            };
            this.Node = x;
            this.Edge = w;
            this.Label = C;
            this.opt = c.merge(A, y || {});
            this.nodes = {};
            this.edges = {};
            var z = this;
            this.nodeList = {};
            for (var B in j) {
                z.nodeList[B] = (function(D) {
                    return function() {
                        var E = Array.prototype.slice.call(arguments);
                        z.eachNode(function(F) {
                            F[D].apply(F, E)
                        })
                    }
                })(B)
            }
        },
        getNode: function(w) {
            if (this.hasNode(w)) {
                return this.nodes[w]
            }
            return false
        },
        get: function(w) {
            return this.getNode(w)
        },
        getByName: function(w) {
            for (var y in this.nodes) {
                var x = this.nodes[y];
                if (x.name == w) {
                    return x
                }
            }
            return false
        },
        getAdjacence: function(x, w) {
            if (x in this.edges) {
                return this.edges[x][w]
            }
            return false
        },
        addNode: function(x) {
            if (!this.nodes[x.id]) {
                var w = this.edges[x.id] = {};
                this.nodes[x.id] = new e.Node(c.extend({
                    id: x.id,
                    name: x.name,
                    data: c.merge(x.data || {}, {}),
                    adjacencies: w
                }, this.opt.Node), this.opt.klass, this.Node, this.Edge, this.Label)
            }
            return this.nodes[x.id]
        },
        addAdjacence: function(z, y, x) {
            if (!this.hasNode(z.id)) {
                this.addNode(z)
            }
            if (!this.hasNode(y.id)) {
                this.addNode(y)
            }
            z = this.nodes[z.id];
            y = this.nodes[y.id];
            if (!z.adjacentTo(y)) {
                var A = this.edges[z.id] = this.edges[z.id] || {};
                var w = this.edges[y.id] = this.edges[y.id] || {};
                A[y.id] = w[z.id] = new e.Adjacence(z, y, x, this.Edge, this.Label);
                return A[y.id]
            }
            return this.edges[z.id][y.id]
        },
        removeNode: function(y) {
            if (this.hasNode(y)) {
                delete this.nodes[y];
                var x = this.edges[y];
                for (var w in x) {
                    delete this.edges[w][y]
                }
                delete this.edges[y]
            }
        },
        removeAdjacence: function(x, w) {
            delete this.edges[x][w];
            delete this.edges[w][x]
        },
        hasNode: function(w) {
            return w in this.nodes
        },
        empty: function() {
            this.nodes = {};
            this.edges = {}
        }
    });
    var e = $jit.Graph;
    var j;
    (function() {
        var w = function(D, F, A, C, E) {
            var B;
            A = A || "current";
            D = "$" + (D ? D + "-" : "");
            if (A == "current") {
                B = this.data
            } else {
                if (A == "start") {
                    B = this.startData
                } else {
                    if (A == "end") {
                        B = this.endData
                    }
                }
            }
            var z = D + F;
            if (C) {
                return B[z]
            }
            if (!this.Config.overridable) {
                return E[F] || 0
            }
            return (z in B) ? B[z] : ((z in this.data) ? this.data[z] : (E[F] || 0))
        };
        var y = function(C, D, B, z) {
            z = z || "current";
            C = "$" + (C ? C + "-" : "");
            var A;
            if (z == "current") {
                A = this.data
            } else {
                if (z == "start") {
                    A = this.startData
                } else {
                    if (z == "end") {
                        A = this.endData
                    }
                }
            }
            A[C + D] = B
        };
        var x = function(B, z) {
            B = "$" + (B ? B + "-" : "");
            var A = this;
            c.each(z, function(D) {
                var C = B + D;
                delete A.data[C];
                delete A.endData[C];
                delete A.startData[C]
            })
        };
        j = {
            getData: function(B, z, A) {
                return w.call(this, "", B, z, A, this.Config)
            },
            setData: function(B, A, z) {
                y.call(this, "", B, A, z)
            },
            setDataset: function(C, D) {
                C = c.splat(C);
                for (var z in D) {
                    for (var B = 0, E = c.splat(D[z]), A = C.length; B < A; B++) {
                        this.setData(z, E[B], C[B])
                    }
                }
            },
            removeData: function() {
                x.call(this, "", Array.prototype.slice.call(arguments))
            },
            getCanvasStyle: function(B, z, A) {
                return w.call(this, "canvas", B, z, A, this.Config.CanvasStyles)
            },
            setCanvasStyle: function(B, A, z) {
                y.call(this, "canvas", B, A, z)
            },
            setCanvasStyles: function(C, D) {
                C = c.splat(C);
                for (var z in D) {
                    for (var B = 0, E = c.splat(D[z]), A = C.length; B < A; B++) {
                        this.setCanvasStyle(z, E[B], C[B])
                    }
                }
            },
            removeCanvasStyle: function() {
                x.call(this, "canvas", Array.prototype.slice.call(arguments))
            },
            getLabelData: function(B, z, A) {
                return w.call(this, "label", B, z, A, this.Label)
            },
            setLabelData: function(B, A, z) {
                y.call(this, "label", B, A, z)
            },
            setLabelDataset: function(C, D) {
                C = c.splat(C);
                for (var z in D) {
                    for (var B = 0, E = c.splat(D[z]), A = C.length; B < A; B++) {
                        this.setLabelData(z, E[B], C[B])
                    }
                }
            },
            removeLabelData: function() {
                x.call(this, "label", Array.prototype.slice.call(arguments))
            }
        }
    })();
    e.Node = new q({
        initialize: function(z, w, y, x, B) {
            var A = {
                id: "",
                name: "",
                data: {},
                startData: {},
                endData: {},
                adjacencies: {},
                selected: false,
                drawn: false,
                exist: false,
                angleSpan: {
                    begin: 0,
                    end: 0
                },
                pos: new w,
                startPos: new w,
                endPos: new w
            };
            c.extend(this, c.extend(A, z));
            this.Config = this.Node = y;
            this.Edge = x;
            this.Label = B
        },
        adjacentTo: function(w) {
            return w.id in this.adjacencies
        },
        getAdjacency: function(w) {
            return this.adjacencies[w]
        },
        getPos: function(w) {
            w = w || "current";
            if (w == "current") {
                return this.pos
            } else {
                if (w == "end") {
                    return this.endPos
                } else {
                    if (w == "start") {
                        return this.startPos
                    }
                }
            }
        },
        setPos: function(x, w) {
            w = w || "current";
            var y;
            if (w == "current") {
                y = this.pos
            } else {
                if (w == "end") {
                    y = this.endPos
                } else {
                    if (w == "start") {
                        y = this.startPos
                    }
                }
            }
            y.set(x)
        }
    });
    e.Node.implement(j);
    e.Adjacence = new q({
        initialize: function(x, A, y, w, z) {
            this.nodeFrom = x;
            this.nodeTo = A;
            this.data = y || {};
            this.startData = {};
            this.endData = {};
            this.Config = this.Edge = w;
            this.Label = z
        }
    });
    e.Adjacence.implement(j);
    e.Util = {
        filter: function(x) {
            if (!x ||!(c.type(x) == "string")) {
                return function() {
                    return true
                }
            }
            var w = x.split(" ");
            return function(z) {
                for (var y = 0; y < w.length; y++) {
                    if (z[w[y]]) {
                        return false
                    }
                }
                return true
            }
        },
        getNode: function(w, x) {
            return w.nodes[x]
        },
        eachNode: function(A, z, w) {
            var y = this.filter(w);
            for (var x in A.nodes) {
                if (y(A.nodes[x])) {
                    z(A.nodes[x])
                }
            }
        },
        each: function(y, x, w) {
            this.eachNode(y, x, w)
        },
        eachAdjacency: function(B, C, x) {
            var y = B.adjacencies, A = this.filter(x);
            for (var D in y) {
                var w = y[D];
                if (A(w)) {
                    if (w.nodeFrom != B) {
                        var z = w.nodeFrom;
                        w.nodeFrom = w.nodeTo;
                        w.nodeTo = z
                    }
                    C(w, D)
                }
            }
        },
        computeLevels: function(C, D, z, y) {
            z = z || 0;
            var A = this.filter(y);
            this.eachNode(C, function(E) {
                E._flag = false;
                E._depth =- 1
            }, y);
            var x = C.getNode(D);
            x._depth = z;
            var w = [x];
            while (w.length != 0) {
                var B = w.pop();
                B._flag = true;
                this.eachAdjacency(B, function(E) {
                    var F = E.nodeTo;
                    if (F._flag == false && A(F)) {
                        if (F._depth < 0) {
                            F._depth = B._depth + 1 + z
                        }
                        w.unshift(F)
                    }
                }, y)
            }
        },
        eachBFS: function(B, C, A, x) {
            var y = this.filter(x);
            this.clean(B);
            var w = [B.getNode(C)];
            while (w.length != 0) {
                var z = w.pop();
                z._flag = true;
                A(z, z._depth);
                this.eachAdjacency(z, function(D) {
                    var E = D.nodeTo;
                    if (E._flag == false && y(E)) {
                        E._flag = true;
                        w.unshift(E)
                    }
                }, x)
            }
        },
        eachLevel: function(A, E, x, B, z) {
            var D = A._depth, w = this.filter(z), C = this;
            x = x === false ? Number.MAX_VALUE - D : x;
            (function y(H, F, G) {
                var I = H._depth;
                if (I >= F && I <= G && w(H)) {
                    B(H, I)
                }
                if (I < G) {
                    C.eachAdjacency(H, function(J) {
                        var K = J.nodeTo;
                        if (K._depth > I) {
                            y(K, F, G)
                        }
                    })
                }
            })(A, E + D, x + D)
        },
        eachSubgraph: function(x, y, w) {
            this.eachLevel(x, 0, false, y, w)
        },
        eachSubnode: function(x, y, w) {
            this.eachLevel(x, 1, 1, y, w)
        },
        anySubnode: function(z, y, x) {
            var w = false;
            y = y || c.lambda(true);
            var A = c.type(y) == "string" ? function(B) {
                return B[y]
            }
            : y;
            this.eachSubnode(z, function(B) {
                if (A(B)) {
                    w = true
                }
            }, x);
            return w
        },
        getSubnodes: function(B, C, w) {
            var y = [], A = this;
            C = C || 0;
            var z, x;
            if (c.type(C) == "array") {
                z = C[0];
                x = C[1]
            } else {
                z = C;
                x = Number.MAX_VALUE - B._depth
            }
            this.eachLevel(B, z, x, function(D) {
                y.push(D)
            }, w);
            return y
        },
        getParents: function(x) {
            var w = [];
            this.eachAdjacency(x, function(y) {
                var z = y.nodeTo;
                if (z._depth < x._depth) {
                    w.push(z)
                }
            });
            return w
        },
        isDescendantOf: function(z, A) {
            if (z.id == A) {
                return true
            }
            var y = this.getParents(z), w = false;
            for (var x = 0; !w && x < y.length; x++) {
                w = w || this.isDescendantOf(y[x], A)
            }
            return w
        },
        clean: function(w) {
            this.eachNode(w, function(x) {
                x._flag = false
            })
        },
        getClosestNodeToOrigin: function(x, y, w) {
            return this.getClosestNodeToPos(x, b.KER, y, w)
        },
        getClosestNodeToPos: function(y, B, A, w) {
            var x = null;
            A = A || "current";
            B = B && B.getc(true) || p.KER;
            var z = function(D, C) {
                var F = D.x - C.x, E = D.y - C.y;
                return F * F + E * E
            };
            this.eachNode(y, function(C) {
                x = (x == null || z(C.getPos(A).getc(true), B) < z(x.getPos(A).getc(true), B)) ? C : x
            }, w);
            return x
        }
    };
    c.each(["get", "getNode", "each", "eachNode", "computeLevels", "eachBFS", "clean", "getClosestNodeToPos", "getClosestNodeToOrigin"], function(w) {
        e.prototype[w] = function() {
            return e.Util[w].apply(e.Util, [this].concat(Array.prototype.slice.call(arguments)))
        }
    });
    c.each(["eachAdjacency", "eachLevel", "eachSubgraph", "eachSubnode", "anySubnode", "getSubnodes", "getParents", "isDescendantOf"], function(w) {
        e.Node.prototype[w] = function() {
            return e.Util[w].apply(e.Util, [this].concat(Array.prototype.slice.call(arguments)))
        }
    });
    e.Op = {
        options: {
            type: "nothing",
            duration: 2000,
            hideLabels: true,
            fps: 30
        },
        initialize: function(w) {
            this.viz = w
        },
        removeNode: function(B, z) {
            var w = this.viz;
            var x = c.merge(this.options, w.controller, z);
            var D = c.splat(B);
            var y, A, C;
            switch (x.type) {
            case"nothing":
                for (y = 0; y < D.length; y++) {
                    w.graph.removeNode(D[y])
                }
                break;
            case"replot":
                this.removeNode(D, {
                    type: "nothing"
                });
                w.labels.clearLabels();
                w.refresh(true);
                break;
            case"fade:seq":
            case"fade":
                A = this;
                for (y = 0; y < D.length; y++) {
                    C = w.graph.getNode(D[y]);
                    C.setData("alpha", 0, "end")
                }
                w.fx.animate(c.merge(x, {
                    modes: ["node-property:alpha"],
                    onComplete: function() {
                        A.removeNode(D, {
                            type: "nothing"
                        });
                        w.labels.clearLabels();
                        w.reposition();
                        w.fx.animate(c.merge(x, {
                            modes: ["linear"]
                        }))
                    }
                }));
                break;
            case"fade:con":
                A = this;
                for (y = 0; y < D.length; y++) {
                    C = w.graph.getNode(D[y]);
                    C.setData("alpha", 0, "end");
                    C.ignore = true
                }
                w.reposition();
                w.fx.animate(c.merge(x, {
                    modes: ["node-property:alpha", "linear"],
                    onComplete: function() {
                        A.removeNode(D, {
                            type: "nothing"
                        });
                        x.onComplete && x.onComplete()
                    }
                }));
                break;
            case"iter":
                A = this;
                w.fx.sequence({
                    condition: function() {
                        return D.length != 0
                    },
                    step: function() {
                        A.removeNode(D.shift(), {
                            type: "nothing"
                        });
                        w.labels.clearLabels()
                    },
                    onComplete: function() {
                        x.onComplete && x.onComplete()
                    },
                    duration: Math.ceil(x.duration / D.length)
                });
                break;
            default:
                this.doError()
            }
        },
        removeEdge: function(D, B) {
            var w = this.viz;
            var z = c.merge(this.options, w.controller, B);
            var y = (c.type(D[0]) == "string") ? [D]: D;
            var A, C, x;
            switch (z.type) {
            case"nothing":
                for (A = 0; A < y.length; A++) {
                    w.graph.removeAdjacence(y[A][0], y[A][1])
                }
                break;
            case"replot":
                this.removeEdge(y, {
                    type: "nothing"
                });
                w.refresh(true);
                break;
            case"fade:seq":
            case"fade":
                C = this;
                for (A = 0; A < y.length; A++) {
                    x = w.graph.getAdjacence(y[A][0], y[A][1]);
                    if (x) {
                        x.setData("alpha", 0, "end")
                    }
                }
                w.fx.animate(c.merge(z, {
                    modes: ["edge-property:alpha"],
                    onComplete: function() {
                        C.removeEdge(y, {
                            type: "nothing"
                        });
                        w.reposition();
                        w.fx.animate(c.merge(z, {
                            modes: ["linear"]
                        }))
                    }
                }));
                break;
            case"fade:con":
                C = this;
                for (A = 0; A < y.length; A++) {
                    x = w.graph.getAdjacence(y[A][0], y[A][1]);
                    if (x) {
                        x.setData("alpha", 0, "end");
                        x.ignore = true
                    }
                }
                w.reposition();
                w.fx.animate(c.merge(z, {
                    modes: ["edge-property:alpha", "linear"],
                    onComplete: function() {
                        C.removeEdge(y, {
                            type: "nothing"
                        });
                        z.onComplete && z.onComplete()
                    }
                }));
                break;
            case"iter":
                C = this;
                w.fx.sequence({
                    condition: function() {
                        return y.length != 0
                    },
                    step: function() {
                        C.removeEdge(y.shift(), {
                            type: "nothing"
                        });
                        w.labels.clearLabels()
                    },
                    onComplete: function() {
                        z.onComplete()
                    },
                    duration: Math.ceil(z.duration / y.length)
                });
                break;
            default:
                this.doError()
            }
        },
        sum: function(A, z) {
            var w = this.viz;
            var y = c.merge(this.options, w.controller, z), x = w.root;
            var C;
            w.root = z.id || w.root;
            switch (y.type) {
            case"nothing":
                C = w.construct(A);
                C.eachNode(function(E) {
                    E.eachAdjacency(function(F) {
                        w.graph.addAdjacence(F.nodeFrom, F.nodeTo, F.data)
                    })
                });
                break;
            case"replot":
                w.refresh(true);
                this.sum(A, {
                    type: "nothing"
                });
                w.refresh(true);
                break;
            case"fade:seq":
            case"fade":
            case"fade:con":
                that = this;
                C = w.construct(A);
                var D = this.preprocessSum(C);
                var B=!D ? ["node-property:alpha"] : ["node-property:alpha", "edge-property:alpha"];
                w.reposition();
                if (y.type != "fade:con") {
                    w.fx.animate(c.merge(y, {
                        modes: ["linear"],
                        onComplete: function() {
                            w.fx.animate(c.merge(y, {
                                modes: B,
                                onComplete: function() {
                                    y.onComplete()
                                }
                            }))
                        }
                    }))
                } else {
                    w.graph.eachNode(function(E) {
                        if (E.id != x && E.pos.isZero()) {
                            E.pos.set(E.endPos);
                            E.startPos.set(E.endPos)
                        }
                    });
                    w.fx.animate(c.merge(y, {
                        modes: ["linear"].concat(B)
                    }))
                }
                break;
            default:
                this.doError()
            }
        },
        morph: function(E, x, z) {
            z = z || {};
            var B = this.viz;
            var F = c.merge(this.options, B.controller, x), A = B.root;
            var C;
            B.root = x.id || B.root;
            switch (F.type) {
            case"nothing":
                C = B.construct(E);
                C.eachNode(function(I) {
                    var H = B.graph.hasNode(I.id);
                    I.eachAdjacency(function(M) {
                        var L=!!B.graph.getAdjacence(M.nodeFrom.id, M.nodeTo.id);
                        B.graph.addAdjacence(M.nodeFrom, M.nodeTo, M.data);
                        if (L) {
                            var K = B.graph.getAdjacence(M.nodeFrom.id, M.nodeTo.id);
                            for (var N in (M.data || {})) {
                                K.data[N] = M.data[N]
                            }
                        }
                    });
                    if (H) {
                        var G = B.graph.getNode(I.id);
                        for (var J in (I.data || {})) {
                            G.data[J] = I.data[J]
                        }
                    }
                });
                B.graph.eachNode(function(G) {
                    G.eachAdjacency(function(H) {
                        if (!C.getAdjacence(H.nodeFrom.id, H.nodeTo.id)) {
                            B.graph.removeAdjacence(H.nodeFrom.id, H.nodeTo.id)
                        }
                    });
                    if (!C.hasNode(G.id)) {
                        B.graph.removeNode(G.id)
                    }
                });
                break;
            case"replot":
                B.labels.clearLabels(true);
                this.morph(E, {
                    type: "nothing"
                });
                B.refresh(true);
                B.refresh(true);
                break;
            case"fade:seq":
            case"fade":
            case"fade:con":
                that = this;
                C = B.construct(E);
                var D = ("node-property" in z) && c.map(c.splat(z["node-property"]), function(G) {
                    return "$" + G
                });
                B.graph.eachNode(function(H) {
                    var I = C.getNode(H.id);
                    if (!I) {
                        H.setData("alpha", 1);
                        H.setData("alpha", 1, "start");
                        H.setData("alpha", 0, "end");
                        H.ignore = true
                    } else {
                        var G = I.data;
                        for (var J in G) {
                            if (D && (c.indexOf(D, J)>-1)) {
                                H.endData[J] = G[J]
                            } else {
                                H.data[J] = G[J]
                            }
                        }
                    }
                });
                B.graph.eachNode(function(G) {
                    if (G.ignore) {
                        return 
                    }
                    G.eachAdjacency(function(H) {
                        if (H.nodeFrom.ignore || H.nodeTo.ignore) {
                            return 
                        }
                        var I = C.getNode(H.nodeFrom.id);
                        var J = C.getNode(H.nodeTo.id);
                        if (!I.adjacentTo(J)) {
                            var H = B.graph.getAdjacence(I.id, J.id);
                            w = true;
                            H.setData("alpha", 1);
                            H.setData("alpha", 1, "start");
                            H.setData("alpha", 0, "end")
                        }
                    })
                });
                var w = this.preprocessSum(C);
                var y=!w ? ["node-property:alpha"] : ["node-property:alpha", "edge-property:alpha"];
                y[0] = y[0] + (("node-property" in z) ? (":" + c.splat(z["node-property"]).join(":")) : "");
                y[1] = (y[1] || "edge-property:alpha") + (("edge-property" in z) ? (":" + c.splat(z["edge-property"]).join(":")) : "");
                if ("label-property" in z) {
                    y.push("label-property:" + c.splat(z["label-property"]).join(":"))
                }
                if (B.reposition) {
                    B.reposition()
                } else {
                    B.compute("end")
                }
                B.graph.eachNode(function(G) {
                    if (G.id != A && G.pos.getp().equals(b.KER)) {
                        G.pos.set(G.endPos);
                        G.startPos.set(G.endPos)
                    }
                });
                B.fx.animate(c.merge(F, {
                    modes: [z.position || "polar"].concat(y),
                    onComplete: function() {
                        B.graph.eachNode(function(G) {
                            if (G.ignore) {
                                B.graph.removeNode(G.id)
                            }
                        });
                        B.graph.eachNode(function(G) {
                            G.eachAdjacency(function(H) {
                                if (H.ignore) {
                                    B.graph.removeAdjacence(H.nodeFrom.id, H.nodeTo.id)
                                }
                            })
                        });
                        F.onComplete()
                    }
                }));
                break;
            default:
            }
        },
        contract: function(y, x) {
            var w = this.viz;
            if (y.collapsed ||!y.anySubnode(c.lambda(true))) {
                return 
            }
            x = c.merge(this.options, w.config, x || {}, {
                modes: ["node-property:alpha:span", "linear"]
            });
            y.collapsed = true;
            (function z(A) {
                A.eachSubnode(function(B) {
                    B.ignore = true;
                    B.setData("alpha", 0, x.type == "animate" ? "end" : "current");
                    z(B)
                })
            })(y);
            if (x.type == "animate") {
                w.compute("end");
                if (w.rotated) {
                    w.rotate(w.rotated, "none", {
                        property: "end"
                    })
                }(function z(A) {
                    A.eachSubnode(function(B) {
                        B.setPos(y.getPos("end"), "end");
                        z(B)
                    })
                })(y);
                w.fx.animate(x)
            } else {
                if (x.type == "replot") {
                    w.refresh()
                }
            }
        },
        expand: function(y, x) {
            if (!("collapsed" in y)) {
                return 
            }
            var w = this.viz;
            x = c.merge(this.options, w.config, x || {}, {
                modes: ["node-property:alpha:span", "linear"]
            });
            delete y.collapsed;
            (function z(A) {
                A.eachSubnode(function(B) {
                    delete B.ignore;
                    B.setData("alpha", 1, x.type == "animate" ? "end" : "current");
                    z(B)
                })
            })(y);
            if (x.type == "animate") {
                w.compute("end");
                if (w.rotated) {
                    w.rotate(w.rotated, "none", {
                        property: "end"
                    })
                }
                w.fx.animate(x)
            } else {
                if (x.type == "replot") {
                    w.refresh()
                }
            }
        },
        preprocessSum: function(x) {
            var w = this.viz;
            x.eachNode(function(z) {
                if (!w.graph.hasNode(z.id)) {
                    w.graph.addNode(z);
                    var A = w.graph.getNode(z.id);
                    A.setData("alpha", 0);
                    A.setData("alpha", 0, "start");
                    A.setData("alpha", 1, "end")
                }
            });
            var y = false;
            x.eachNode(function(z) {
                z.eachAdjacency(function(A) {
                    var B = w.graph.getNode(A.nodeFrom.id);
                    var C = w.graph.getNode(A.nodeTo.id);
                    if (!B.adjacentTo(C)) {
                        var A = w.graph.addAdjacence(B, C, A.data);
                        if (B.startAlpha == B.endAlpha && C.startAlpha == C.endAlpha) {
                            y = true;
                            A.setData("alpha", 0);
                            A.setData("alpha", 0, "start");
                            A.setData("alpha", 1, "end")
                        }
                    }
                })
            });
            return y
        }
    };
    var a = {
        none: {
            render: c.empty,
            contains: c.lambda(false)
        },
        circle: {
            render: function(z, A, w, y) {
                var x = y.getCtx();
                x.beginPath();
                x.arc(A.x, A.y, w, 0, Math.PI * 2, true);
                x.closePath();
                x[z]()
            },
            contains: function(B, A, w) {
                var y = B.x - A.x, x = B.y - A.y, z = y * y + x * x;
                return z <= w * w
            }
        },
        ellipse: {
            render: function(C, E, w, F, x) {
                var G = x.getCtx(), z = 1, y = 1, D = 1, B = 1, A = 0;
                if (w > F) {
                    A = w / 2;
                    y = F / w;
                    B = w / F
                } else {
                    A = F / 2;
                    z = w / F;
                    D = F / w
                }
                G.save();
                G.scale(z, y);
                G.beginPath();
                G.arc(E.x * D, E.y * B, A, 0, Math.PI * 2, true);
                G.closePath();
                G[C]();
                G.restore()
            },
            contains: function(w, D, x, F) {
                var C = 0, B = 1, A = 1, z = 0, y = 0, E = 0;
                if (x > F) {
                    C = x / 2;
                    A = F / x
                } else {
                    C = F / 2;
                    B = x / F
                }
                z = (w.x - D.x) * (1 / B);
                y = (w.y - D.y) * (1 / A);
                E = z * z + y * y;
                return E <= C * C
            }
        },
        square: {
            render: function(x, z, y, w) {
                w.getCtx()[x + "Rect"](z.x - y, z.y - y, 2 * y, 2 * y)
            },
            contains: function(y, x, w) {
                return Math.abs(x.x - y.x) <= w && Math.abs(x.y - y.y) <= w
            }
        },
        rectangle: {
            render: function(z, A, y, w, x) {
                x.getCtx()[z + "Rect"](A.x - y / 2, A.y - w / 2, y, w)
            },
            contains: function(z, y, x, w) {
                return Math.abs(y.x - z.x) <= x / 2 && Math.abs(y.y - z.y) <= w / 2
            }
        },
        triangle: {
            render: function(C, D, z, w) {
                var G = w.getCtx(), y = D.x, x = D.y - z, F = y - z, E = D.y + z, B = y + z, A = E;
                G.beginPath();
                G.moveTo(y, x);
                G.lineTo(F, E);
                G.lineTo(B, A);
                G.closePath();
                G[C]()
            },
            contains: function(y, x, w) {
                return a.circle.contains(y, x, w)
            }
        },
        star: {
            render: function(A, C, B, x) {
                var w = x.getCtx(), z = Math.PI / 5;
                w.save();
                w.translate(C.x, C.y);
                w.beginPath();
                w.moveTo(B, 0);
                for (var y = 0; y < 9; y++) {
                    w.rotate(z);
                    if (y%2 == 0) {
                        w.lineTo((B / 0.525731) * 0.200811, 0)
                    } else {
                        w.lineTo(B, 0)
                    }
                }
                w.closePath();
                w[A]();
                w.restore()
            },
            contains: function(y, x, w) {
                return a.circle.contains(y, x, w)
            }
        }
    };
    var m = {
        line: {
            render: function(z, y, x) {
                var w = x.getCtx();
                w.beginPath();
                w.moveTo(z.x, z.y);
                w.lineTo(y.x, y.y);
                w.stroke()
            },
            contains: function(G, y, B, E) {
                var z = Math.min, C = Math.max, x = z(G.x, y.x), F = C(G.x, y.x), w = z(G.y, y.y), D = C(G.y, y.y);
                if (B.x >= x && B.x <= F && B.y >= w && B.y <= D) {
                    if (Math.abs(y.x - G.x) <= E) {
                        return true
                    }
                    var A = (y.y - G.y) / (y.x - G.x) * (B.x - G.x) + G.y;
                    return Math.abs(A - B.y) <= E
                }
                return false
            }
        },
        arrow: {
            render: function(F, G, z, x, w) {
                var H = w.getCtx();
                if (x) {
                    var y = F;
                    F = G;
                    G = y
                }
                var C = new p(G.x - F.x, G.y - F.y);
                C.$scale(z / C.norm());
                var A = new p(G.x - C.x, G.y - C.y), B = new p( - C.y / 2, C.x / 2), E = A.add(B), D = A.$add(B.$scale(-1));
                H.beginPath();
                H.moveTo(F.x, F.y);
                H.lineTo(G.x, G.y);
                H.stroke();
                H.beginPath();
                H.moveTo(E.x, E.y);
                H.lineTo(D.x, D.y);
                H.lineTo(G.x, G.y);
                H.closePath();
                H.fill()
            },
            contains: function(x, w, z, y) {
                return m.line.contains(x, w, z, y)
            }
        },
        hyperline: {
            render: function(D, E, w, y) {
                var F = y.getCtx();
                var z = A(D, E);
                if (z.a > 1000 || z.b > 1000 || z.ratio < 0) {
                    F.beginPath();
                    F.moveTo(D.x * w, D.y * w);
                    F.lineTo(E.x * w, E.y * w);
                    F.stroke()
                } else {
                    var C = Math.atan2(E.y - z.y, E.x - z.x);
                    var B = Math.atan2(D.y - z.y, D.x - z.x);
                    var x = x(C, B);
                    F.beginPath();
                    F.arc(z.x * w, z.y * w, z.ratio * w, C, B, x);
                    F.stroke()
                }
                function A(S, R) {
                    var K = (S.x * R.y - S.y * R.x), G = K;
                    var J = S.squaredNorm(), I = R.squaredNorm();
                    if (K == 0) {
                        return {
                            x: 0,
                            y: 0,
                            ratio: -1
                        }
                    }
                    var Q = (S.y * I - R.y * J + S.y - R.y) / K;
                    var O = (R.x * J - S.x * I + R.x - S.x) / G;
                    var P =- Q / 2;
                    var N =- O / 2;
                    var M = (Q * Q + O * O) / 4-1;
                    if (M < 0) {
                        return {
                            x: 0,
                            y: 0,
                            ratio: -1
                        }
                    }
                    var L = Math.sqrt(M);
                    var H = {
                        x: P,
                        y: N,
                        ratio: L > 1000?-1: L,
                        a: Q,
                        b: O
                    };
                    return H
                }
                function x(G, H) {
                    return (G < H) ? ((G + Math.PI > H) ? false : true) : ((H + Math.PI > G) ? true : false)
                }
            },
            contains: c.lambda(false)
        }
    };
    e.Plot = {
        initialize: function(x, w) {
            this.viz = x;
            this.config = x.config;
            this.node = x.config.Node;
            this.edge = x.config.Edge;
            this.animation = new u;
            this.nodeTypes = new w.Plot.NodeTypes;
            this.edgeTypes = new w.Plot.EdgeTypes;
            this.labels = x.labels
        },
        nodeHelper: a,
        edgeHelper: m,
        Interpolator: {
            map: {
                border: "color",
                color: "color",
                width: "number",
                height: "number",
                dim: "number",
                alpha: "number",
                lineWidth: "number",
                angularWidth: "number",
                span: "number",
                valueArray: "array-number",
                dimArray: "array-number"
            },
            canvas: {
                globalAlpha: "number",
                fillStyle: "color",
                strokeStyle: "color",
                lineWidth: "number",
                shadowBlur: "number",
                shadowColor: "color",
                shadowOffsetX: "number",
                shadowOffsetY: "number",
                miterLimit: "number"
            },
            label: {
                size: "number",
                color: "color"
            },
            compute: function(y, x, w) {
                return y + (x - y) * w
            },
            moebius: function(D, C, F, z) {
                var B = z.scale( - F);
                if (B.norm() < 1) {
                    var w = B.x, E = B.y;
                    var A = D.startPos.getc().moebiusTransformation(B);
                    D.pos.setc(A.x, A.y);
                    B.x = w;
                    B.y = E
                }
            },
            linear: function(x, w, A) {
                var z = x.startPos.getc(true);
                var y = x.endPos.getc(true);
                x.pos.setc(this.compute(z.x, y.x, A), this.compute(z.y, y.y, A))
            },
            polar: function(y, x, B) {
                var A = y.startPos.getp(true);
                var z = y.endPos.getp();
                var w = z.interpolate(A, B);
                y.pos.setp(w.theta, w.rho)
            },
            number: function(x, C, B, w, A) {
                var z = x[w](C, "start");
                var y = x[w](C, "end");
                x[A](C, this.compute(z, y, B))
            },
            color: function(y, w, E, B, z) {
                var C = c.hexToRgb(y[B](w, "start"));
                var D = c.hexToRgb(y[B](w, "end"));
                var A = this.compute;
                var x = c.rgbToHex([parseInt(A(C[0], D[0], E)), parseInt(A(C[1], D[1], E)), parseInt(A(C[2], D[2], E))]);
                y[z](w, x)
            },
            "array-number": function(z, y, J, G, B) {
                var H = z[G](y, "start"), I = z[G](y, "end"), K = [];
                for (var E = 0, A = H.length; E < A; E++) {
                    var x = H[E], w = I[E];
                    if (x.length) {
                        for (var D = 0, F = x.length, C = []; D < F; D++) {
                            C.push(this.compute(x[D], w[D], J))
                        }
                        K.push(C)
                    } else {
                        K.push(this.compute(x, w, J))
                    }
                }
                z[B](y, K)
            },
            node: function(x, C, E, w, D, y) {
                w = this[w];
                if (C) {
                    var B = C.length;
                    for (var z = 0; z < B; z++) {
                        var A = C[z];
                        this[w[A]](x, A, E, D, y)
                    }
                } else {
                    for (var A in w) {
                        this[w[A]](x, A, E, D, y)
                    }
                }
            },
            edge: function(y, x, D, z, w, C) {
                var B = y.adjacencies;
                for (var A in B) {
                    this["node"](B[A], x, D, z, w, C)
                }
            },
            "node-property": function(x, w, y) {
                this["node"](x, w, y, "map", "getData", "setData")
            },
            "edge-property": function(x, w, y) {
                this["edge"](x, w, y, "map", "getData", "setData")
            },
            "label-property": function(x, w, y) {
                this["node"](x, w, y, "label", "getLabelData", "setLabelData")
            },
            "node-style": function(x, w, y) {
                this["node"](x, w, y, "canvas", "getCanvasStyle", "setCanvasStyle")
            },
            "edge-style": function(x, w, y) {
                this["edge"](x, w, y, "canvas", "getCanvasStyle", "setCanvasStyle")
            }
        },
        sequence: function(x) {
            var y = this;
            x = c.merge({
                condition: c.lambda(false),
                step: c.empty,
                onComplete: c.empty,
                duration: 200
            }, x || {});
            var w = setInterval(function() {
                if (x.condition()) {
                    x.step()
                } else {
                    clearInterval(w);
                    x.onComplete()
                }
                y.viz.refresh(true)
            }, x.duration)
        },
        prepare: function(C) {
            var B = this.viz.graph, z = {
                "node-property": {
                    getter: "getData",
                    setter: "setData"
                },
                "edge-property": {
                    getter: "getData",
                    setter: "setData"
                },
                "node-style": {
                    getter: "getCanvasStyle",
                    setter: "setCanvasStyle"
                },
                "edge-style": {
                    getter: "getCanvasStyle",
                    setter: "setCanvasStyle"
                }
            };
            var x = {};
            if (c.type(C) == "array") {
                for (var A = 0, w = C.length; A < w; A++) {
                    var y = C[A].split(":");
                    x[y.shift()] = y
                }
            } else {
                for (var D in C) {
                    if (D == "position") {
                        x[C.position] = []
                    } else {
                        x[D] = c.splat(C[D])
                    }
                }
            }
            B.eachNode(function(E) {
                E.startPos.set(E.pos);
                c.each(["node-property", "node-style"], function(H) {
                    if (H in x) {
                        var I = x[H];
                        for (var G = 0, F = I.length; G < F; G++) {
                            E[z[H].setter](I[G], E[z[H].getter](I[G]), "start")
                        }
                    }
                });
                c.each(["edge-property", "edge-style"], function(F) {
                    if (F in x) {
                        var G = x[F];
                        E.eachAdjacency(function(I) {
                            for (var J = 0, H = G.length; J < H; J++) {
                                I[z[F].setter](G[J], I[z[F].getter](G[J]), "start")
                            }
                        })
                    }
                })
            });
            return x
        },
        animate: function(z, y) {
            z = c.merge(this.viz.config, z || {});
            var A = this, x = this.viz, C = x.graph, D = this.Interpolator, B = z.type === "nodefx" ? this.nodeFxAnimation: this.animation;
            var w = this.prepare(z.modes);
            if (z.hideLabels) {
                this.labels.hideLabels(true)
            }
            B.setOptions(c.extend(z, {
                $animating: false,
                compute: function(E) {
                    C.eachNode(function(F) {
                        for (var G in w) {
                            D[G](F, w[G], E, y)
                        }
                    });
                    A.plot(z, this.$animating, E);
                    this.$animating = true
                },
                complete: function() {
                    if (z.hideLabels) {
                        A.labels.hideLabels(false)
                    }
                    A.plot(z);
                    z.onComplete()
                }
            })).start()
        },
        nodeFx: function(y) {
            var D = this.viz, E = D.graph, B = this.nodeFxAnimation, F = c.merge(this.viz.config, {
                elements: {
                    id: false,
                    properties: {}
                },
                reposition: false
            });
            y = c.merge(F, y || {}, {
                onBeforeCompute: c.empty,
                onAfterCompute: c.empty
            });
            B.stopTimer();
            var C = y.elements.properties;
            if (!y.elements.id) {
                E.eachNode(function(H) {
                    for (var G in C) {
                        H.setData(G, C[G], "end")
                    }
                })
            } else {
                var w = c.splat(y.elements.id);
                c.each(w, function(I) {
                    var H = E.getNode(I);
                    if (H) {
                        for (var G in C) {
                            H.setData(G, C[G], "end")
                        }
                    }
                })
            }
            var A = [];
            for (var x in C) {
                A.push(x)
            }
            var z = ["node-property:" + A.join(":")];
            if (y.reposition) {
                z.push("linear");
                D.compute("end")
            }
            this.animate(c.merge(y, {
                modes: z,
                type: "nodefx"
            }))
        },
        plot: function(x, G) {
            var E = this.viz, B = E.graph, y = E.canvas, w = E.root, C = this, F = y.getCtx(), A = Math.min, x = x || this.viz.controller;
            x.clearCanvas && y.clear();
            var D = B.getNode(w);
            if (!D) {
                return 
            }
            var z=!!D.visited;
            B.eachNode(function(I) {
                var H = I.getData("alpha");
                I.eachAdjacency(function(J) {
                    var K = J.nodeTo;
                    if (!!K.visited === z && I.drawn && K.drawn) {
                        !G && x.onBeforePlotLine(J);
                        C.plotLine(J, y, G);
                        !G && x.onAfterPlotLine(J)
                    }
                });
                if (I.drawn) {
                    !G && x.onBeforePlotNode(I);
                    C.plotNode(I, y, G);
                    !G && x.onAfterPlotNode(I)
                }
                if (!C.labelsHidden && x.withLabels) {
                    if (I.drawn && H >= 0.95) {
                        C.labels.plotLabel(y, I, x)
                    } else {
                        C.labels.hideLabel(I, false)
                    }
                }
                I.visited=!z
            })
        },
        plotTree: function(A, x, E) {
            var B = this, C = this.viz, y = C.canvas, z = this.config, D = y.getCtx();
            var w = A.getData("alpha");
            A.eachSubnode(function(G) {
                if (x.plotSubtree(A, G) && G.exist && G.drawn) {
                    var F = A.getAdjacency(G.id);
                    !E && x.onBeforePlotLine(F);
                    B.plotLine(F, y, E);
                    !E && x.onAfterPlotLine(F);
                    B.plotTree(G, x, E)
                }
            });
            if (A.drawn) {
                !E && x.onBeforePlotNode(A);
                this.plotNode(A, y, E);
                !E && x.onAfterPlotNode(A);
                if (!x.hideLabels && x.withLabels && w >= 0.95) {
                    this.labels.plotLabel(y, A, x)
                } else {
                    this.labels.hideLabel(A, false)
                }
            } else {
                this.labels.hideLabel(A, true)
            }
        },
        plotNode: function(y, x, F) {
            var C = y.getData("type"), B = this.node.CanvasStyles;
            if (C != "none") {
                var w = y.getData("lineWidth"), A = y.getData("color"), z = y.getData("alpha"), D = x.getCtx();
                D.save();
                D.lineWidth = w;
                D.fillStyle = D.strokeStyle = A;
                D.globalAlpha = z;
                for (var E in B) {
                    D[E] = y.getCanvasStyle(E)
                }
                this.nodeTypes[C].render.call(this, y, x, F);
                D.restore()
            }
        },
        plotLine: function(C, x, G) {
            var B = C.getData("type"), z = this.edge.CanvasStyles;
            if (B != "none") {
                var w = C.getData("lineWidth"), y = C.getData("color"), E = x.getCtx(), A = C.nodeFrom, D = C.nodeTo;
                E.save();
                E.lineWidth = w;
                E.fillStyle = E.strokeStyle = y;
                E.globalAlpha = Math.min(A.getData("alpha"), D.getData("alpha"), C.getData("alpha"));
                for (var F in z) {
                    E[F] = C.getCanvasStyle(F)
                }
                this.edgeTypes[B].render.call(this, C, x, G);
                E.restore()
            }
        }
    };
    e.Plot3D = c.merge(e.Plot, {
        Interpolator: {
            linear: function(x, w, A) {
                var z = x.startPos.getc(true);
                var y = x.endPos.getc(true);
                x.pos.setc(this.compute(z.x, y.x, A), this.compute(z.y, y.y, A), this.compute(z.z, y.z, A))
            }
        },
        plotNode: function(x, w) {
            if (x.getData("type") == "none") {
                return 
            }
            this.plotElement(x, w, {
                getAlpha: function() {
                    return x.getData("alpha")
                }
            })
        },
        plotLine: function(w, x) {
            if (w.getData("type") == "none") {
                return 
            }
            this.plotElement(w, x, {
                getAlpha: function() {
                    return Math.min(w.nodeFrom.getData("alpha"), w.nodeTo.getData("alpha"), w.getData("alpha"))
                }
            })
        },
        plotElement: function(Y, E, z) {
            var V = E.getCtx(), F = new Matrix4, x = E.config.Scene.Lighting, Z = E.canvases[0], K = Z.program, X = Z.camera;
            if (!Y.geometry) {
                Y.geometry = new O3D[Y.getData("type")]
            }
            Y.geometry.update(Y);
            if (!Y.webGLVertexBuffer) {
                var J = [], B = [], P = [], N = 0, S = Y.geometry;
                for (var W = 0, U = S.vertices, H = S.faces, G = H.length; W < G; W++) {
                    var M = H[W], D = U[M.a], C = U[M.b], A = U[M.c], y = M.d ? U[M.d]: false, R = M.normal;
                    J.push(D.x, D.y, D.z);
                    J.push(C.x, C.y, C.z);
                    J.push(A.x, A.y, A.z);
                    if (y) {
                        J.push(y.x, y.y, y.z)
                    }
                    P.push(R.x, R.y, R.z);
                    P.push(R.x, R.y, R.z);
                    P.push(R.x, R.y, R.z);
                    if (y) {
                        P.push(R.x, R.y, R.z)
                    }
                    B.push(N, N + 1, N + 2);
                    if (y) {
                        B.push(N, N + 2, N + 3);
                        N += 4
                    } else {
                        N += 3
                    }
                }
                Y.webGLVertexBuffer = V.createBuffer();
                V.bindBuffer(V.ARRAY_BUFFER, Y.webGLVertexBuffer);
                V.bufferData(V.ARRAY_BUFFER, new Float32Array(J), V.STATIC_DRAW);
                Y.webGLFaceBuffer = V.createBuffer();
                V.bindBuffer(V.ELEMENT_ARRAY_BUFFER, Y.webGLFaceBuffer);
                V.bufferData(V.ELEMENT_ARRAY_BUFFER, new Uint16Array(B), V.STATIC_DRAW);
                Y.webGLFaceCount = B.length;
                Y.webGLNormalBuffer = V.createBuffer();
                V.bindBuffer(V.ARRAY_BUFFER, Y.webGLNormalBuffer);
                V.bufferData(V.ARRAY_BUFFER, new Float32Array(P), V.STATIC_DRAW)
            }
            F.multiply(X.matrix, Y.geometry.matrix);
            V.uniformMatrix4fv(K.viewMatrix, false, F.flatten());
            V.uniformMatrix4fv(K.projectionMatrix, false, X.projectionMatrix.flatten());
            var L = Matrix4.makeInvert(F);
            L.$transpose();
            V.uniformMatrix4fv(K.normalMatrix, false, L.flatten());
            var T = c.hexToRgb(Y.getData("color"));
            T.push(z.getAlpha());
            V.uniform4f(K.color, T[0] / 255, T[1] / 255, T[2] / 255, T[3]);
            V.uniform1i(K.enableLighting, x.enable);
            if (x.enable) {
                if (x.ambient) {
                    var O = x.ambient;
                    V.uniform3f(K.ambientColor, O[0], O[1], O[2])
                }
                if (x.directional) {
                    var Q = x.directional, T = Q.color, I = Q.direction, w = new Vector3(I.x, I.y, I.z).normalize().$scale(-1);
                    V.uniform3f(K.lightingDirection, w.x, w.y, w.z);
                    V.uniform3f(K.directionalColor, T[0], T[1], T[2])
                }
            }
            V.bindBuffer(V.ARRAY_BUFFER, Y.webGLVertexBuffer);
            V.vertexAttribPointer(K.position, 3, V.FLOAT, false, 0, 0);
            V.bindBuffer(V.ARRAY_BUFFER, Y.webGLNormalBuffer);
            V.vertexAttribPointer(K.normal, 3, V.FLOAT, false, 0, 0);
            V.bindBuffer(V.ELEMENT_ARRAY_BUFFER, Y.webGLFaceBuffer);
            V.drawElements(V.TRIANGLES, Y.webGLFaceCount, V.UNSIGNED_SHORT, 0)
        }
    });
    e.Label = {};
    e.Label.Native = new q({
        initialize: function(w) {
            this.viz = w
        },
        plotLabel: function(y, z, x) {
            var w = y.getCtx();
            var A = z.pos.getc(true);
            w.font = z.getLabelData("style") + " " + z.getLabelData("size") + "px " + z.getLabelData("family");
            w.textAlign = z.getLabelData("textAlign");
            w.fillStyle = w.strokeStyle = z.getLabelData("color");
            w.textBaseline = z.getLabelData("textBaseline");
            this.renderLabel(y, z, x)
        },
        renderLabel: function(y, z, x) {
            var w = y.getCtx();
            var A = z.pos.getc(true);
            w.fillText(z.name, A.x, A.y + z.getData("height") / 2)
        },
        hideLabel: c.empty,
        hideLabels: c.empty
    });
    e.Label.DOM = new q({
        labelsHidden: false,
        labelContainer: false,
        labels: {},
        getLabelContainer: function() {
            return this.labelContainer ? this.labelContainer : this.labelContainer = document.getElementById(this.viz.config.labelContainer)
        },
        getLabel: function(w) {
            return (w in this.labels && this.labels[w] != null) ? this.labels[w] : this.labels[w] = document.getElementById(w)
        },
        hideLabels: function(x) {
            var w = this.getLabelContainer();
            if (x) {
                w.style.display = "none"
            } else {
                w.style.display = ""
            }
            this.labelsHidden = x
        },
        clearLabels: function(w) {
            for (var x in this.labels) {
                if (w ||!this.viz.graph.hasNode(x)) {
                    this.disposeLabel(x);
                    delete this.labels[x]
                }
            }
        },
        disposeLabel: function(x) {
            var w = this.getLabel(x);
            if (w && w.parentNode) {
                w.parentNode.removeChild(w)
            }
        },
        hideLabel: function(A, w) {
            A = c.splat(A);
            var x = w ? "": "none", y, z = this;
            c.each(A, function(C) {
                var B = z.getLabel(C.id);
                if (B) {
                    B.style.display = x
                }
            })
        },
        fitsInCanvas: function(y, w) {
            var x = w.getSize();
            if (y.x >= x.width || y.x < 0 || y.y >= x.height || y.y < 0) {
                return false
            }
            return true
        }
    });
    e.Label.HTML = new q({
        Implements: e.Label.DOM,
        plotLabel: function(z, A, y) {
            var B = A.id, w = this.getLabel(B);
            if (!w&&!(w = document.getElementById(B))) {
                w = document.createElement("div");
                var x = this.getLabelContainer();
                w.id = B;
                w.className = "node";
                w.style.position = "absolute";
                y.onCreateLabel(w, A);
                x.appendChild(w);
                this.labels[A.id] = w
            }
            this.placeLabel(w, A, y)
        }
    });
    e.Label.SVG = new q({
        Implements: e.Label.DOM,
        plotLabel: function(z, B, y) {
            var D = B.id, w = this.getLabel(D);
            if (!w&&!(w = document.getElementById(D))) {
                var A = "http://www.w3.org/2000/svg";
                w = document.createElementNS(A, "svg:text");
                var C = document.createElementNS(A, "svg:tspan");
                w.appendChild(C);
                var x = this.getLabelContainer();
                w.setAttribute("id", D);
                w.setAttribute("class", "node");
                x.appendChild(w);
                y.onCreateLabel(w, B);
                this.labels[B.id] = w
            }
            this.placeLabel(w, B, y)
        }
    });
    e.Geom = new q({
        initialize: function(w) {
            this.viz = w;
            this.config = w.config;
            this.node = w.config.Node;
            this.edge = w.config.Edge
        },
        translate: function(x, w) {
            w = c.splat(w);
            this.viz.graph.eachNode(function(y) {
                c.each(w, function(z) {
                    y.getPos(z).$add(x)
                })
            })
        },
        setRightLevelToShow: function(z, w, B) {
            var A = this.getRightLevelToShow(z, w), y = this.viz.labels, x = c.merge({
                execShow: true,
                execHide: true,
                onHide: c.empty,
                onShow: c.empty
            }, B || {});
            z.eachLevel(0, this.config.levelsToShow, function(D) {
                var C = D._depth - z._depth;
                if (C > A) {
                    x.onHide(D);
                    if (x.execHide) {
                        D.drawn = false;
                        D.exist = false;
                        y.hideLabel(D, false)
                    }
                } else {
                    x.onShow(D);
                    if (x.execShow) {
                        D.exist = true
                    }
                }
            });
            z.drawn = true
        },
        getRightLevelToShow: function(z, x) {
            var w = this.config;
            var A = w.levelsToShow;
            var y = w.constrained;
            if (!y) {
                return A
            }
            while (!this.treeFitsInCanvas(z, x, A) && A > 1) {
                A--
            }
            return A
        }
    });
    var d = {
        construct: function(x) {
            var y = (c.type(x) == "array");
            var w = new e(this.graphOptions, this.config.Node, this.config.Edge, this.config.Label);
            if (!y) {
                (function(z, B) {
                    z.addNode(B);
                    if (B.children) {
                        for (var A = 0, C = B.children; A < C.length; A++) {
                            z.addAdjacence(B, C[A]);
                            arguments.callee(z, C[A])
                        }
                    }
                })(w, x)
            } else {
                (function(H, I) {
                    var A = function(M) {
                        for (var L = 0, J = I.length; L < J; L++) {
                            if (I[L].id == M) {
                                return I[L]
                            }
                        }
                        var K = {
                            id: M,
                            name: M
                        };
                        return H.addNode(K)
                    };
                    for (var E = 0, B = I.length; E < B; E++) {
                        H.addNode(I[E]);
                        var F = I[E].adjacencies;
                        if (F) {
                            for (var C = 0, G = F.length; C < G; C++) {
                                var z = F[C], D = {};
                                if (typeof F[C] != "string") {
                                    D = c.merge(z.data, {});
                                    z = z.nodeTo
                                }
                                H.addAdjacence(I[E], A(z), D)
                            }
                        }
                    }
                })(w, x)
            }
            return w
        },
        loadJSON: function(x, w) {
            this.json = x;
            if (this.labels && this.labels.clearLabels) {
                this.labels.clearLabels(true)
            }
            this.graph = this.construct(x);
            if (c.type(x) != "array") {
                this.root = x.id
            } else {
                this.root = x[w ? w: 0].id
            }
        },
        toJSON: function(A) {
            A = A || "tree";
            if (A == "tree") {
                var y = {};
                var x = this.graph.getNode(this.root);
                var y = (function w(D) {
                    var B = {};
                    B.id = D.id;
                    B.name = D.name;
                    B.data = D.data;
                    var C = [];
                    D.eachSubnode(function(E) {
                        C.push(w(E))
                    });
                    B.children = C;
                    return B
                })(x);
                return y
            } else {
                var y = [];
                var z=!!this.graph.getNode(this.root).visited;
                this.graph.eachNode(function(C) {
                    var B = {};
                    B.id = C.id;
                    B.name = C.name;
                    B.data = C.data;
                    var D = [];
                    C.eachAdjacency(function(E) {
                        var G = E.nodeTo;
                        if (!!G.visited === z) {
                            var F = {};
                            F.nodeTo = G.id;
                            F.data = E.data;
                            D.push(F)
                        }
                    });
                    B.adjacencies = D;
                    y.push(B);
                    C.visited=!z
                });
                return y
            }
        }
    };
    var g = $jit.Layouts = {};
    var f = {
        label: null,
        compute: function(z, A, x) {
            this.initializeLabel(x);
            var w = this.label, y = w.style;
            z.eachNode(function(D) {
                var H = D.getData("autoWidth"), I = D.getData("autoHeight");
                if (H || I) {
                    delete D.data.$width;
                    delete D.data.$height;
                    delete D.data.$dim;
                    var B = D.getData("width"), J = D.getData("height");
                    y.width = H ? "auto" : B + "px";
                    y.height = I ? "auto" : J + "px";
                    w.innerHTML = D.name;
                    var F = w.offsetWidth, C = w.offsetHeight;
                    var G = D.getData("type");
                    if (c.indexOf(["circle", "square", "triangle", "star"], G)===-1) {
                        D.setData("width", F);
                        D.setData("height", C)
                    } else {
                        var E = F > C ? F: C;
                        D.setData("width", E);
                        D.setData("height", E);
                        D.setData("dim", E)
                    }
                }
            })
        },
        initializeLabel: function(w) {
            if (!this.label) {
                this.label = document.createElement("div");
                document.body.appendChild(this.label)
            }
            this.setLabelStyles(w)
        },
        setLabelStyles: function(w) {
            c.extend(this.label.style, {
                visibility: "hidden",
                position: "absolute",
                width: "auto",
                height: "auto"
            });
            this.label.className = "jit-autoadjust-label"
        }
    };
    g.Tree = (function() {
        var F = Array.prototype.slice;
        function D(P, K, H, N, I) {
            var M = K.Node;
            var J = K.multitree;
            if (M.overridable) {
                var O =- 1, L =- 1;
                P.eachNode(function(S) {
                    if (S._depth == H && (!J || ("$orn" in S.data) && S.data.$orn == N)) {
                        var Q = S.getData("width", I);
                        var R = S.getData("height", I);
                        O = (O < Q) ? Q : O;
                        L = (L < R) ? R : L
                    }
                });
                return {
                    width: O < 0 ? M.width: O,
                    height: L < 0 ? M.height: L
                }
            } else {
                return M
            }
        }
        function G(I, L, K, H) {
            var J = (H == "left" || H == "right") ? "y": "x";
            I.getPos(L)[J] += K
        }
        function B(I, J) {
            var H = [];
            c.each(I, function(K) {
                K = F.call(K);
                K[0] += J;
                K[1] += J;
                H.push(K)
            });
            return H
        }
        function E(K, H) {
            if (K.length == 0) {
                return H
            }
            if (H.length == 0) {
                return K
            }
            var J = K.shift(), I = H.shift();
            return [[J[0], I[1]]].concat(E(K, H))
        }
        function z(H, I) {
            I = I || [];
            if (H.length == 0) {
                return I
            }
            var J = H.pop();
            return z(H, E(J, I))
        }
        function C(K, I, L, H, J) {
            if (K.length <= J || I.length <= J) {
                return 0
            }
            var N = K[J][1], M = I[J][0];
            return Math.max(C(K, I, L, H, ++J) + L, N - M + H)
        }
        function A(K, I, H) {
            function J(N, P, M) {
                if (P.length <= M) {
                    return []
                }
                var O = P[M], L = C(N, O, I, H, 0);
                return [L].concat(J(E(N, B(O, L)), P, ++M))
            }
            return J([], K, 0)
        }
        function x(L, K, J) {
            function H(O, Q, N) {
                if (Q.length <= N) {
                    return []
                }
                var P = Q[N], M =- C(P, O, K, J, 0);
                return [M].concat(H(E(B(P, M), O), Q, ++N))
            }
            L = F.call(L);
            var I = H([], L.reverse(), 0);
            return I.reverse()
        }
        function w(N, L, I, O) {
            var J = A(N, L, I), M = x(N, L, I);
            if (O == "left") {
                M = J
            } else {
                if (O == "right") {
                    J = M
                }
            }
            for (var K = 0, H = []; K < J.length; K++) {
                H[K] = (J[K] + M[K]) / 2
            }
            return H
        }
        function y(H, R, I, Y, W) {
            var K = Y.multitree;
            var Q = ["x", "y"], N = ["width", "height"];
            var J =+ (W == "left" || W == "right");
            var O = Q[J], X = Q[1 - J];
            var T = Y.Node;
            var M = N[J], V = N[1 - J];
            var L = Y.siblingOffset;
            var U = Y.subtreeOffset;
            var S = Y.align;
            function P(ab, af, aj) {
                var aa = ab.getData(M, I);
                var ai = af || (ab.getData(V, I));
                var am = [], ak = [], ag = false;
                var Z = ai + Y.levelDistance;
                ab.eachSubnode(function(ao) {
                    if (ao.exist && (!K || ("$orn" in ao.data) && ao.data.$orn == W)) {
                        if (!ag) {
                            ag = D(H, Y, ao._depth, W, I)
                        }
                        var an = P(ao, ag[V], aj + Z);
                        am.push(an.tree);
                        ak.push(an.extent)
                    }
                });
                var ae = w(ak, U, L, S);
                for (var ad = 0, ac = [], ah = []; ad < am.length; ad++) {
                    G(am[ad], I, ae[ad], W);
                    ah.push(B(ak[ad], ae[ad]))
                }
                var al = [[ - aa / 2, aa / 2]].concat(z(ah));
                ab.getPos(I)[O] = 0;
                if (W == "top" || W == "left") {
                    ab.getPos(I)[X] = aj
                } else {
                    ab.getPos(I)[X] =- aj
                }
                return {
                    tree: ab,
                    extent: al
                }
            }
            P(R, false, 0)
        }
        return new q({
            compute: function(J, I) {
                var K = J || "start";
                var H = this.graph.getNode(this.root);
                c.extend(H, {
                    drawn: true,
                    exist: true,
                    selected: true
                });
                f.compute(this.graph, K, this.config);
                if (!!I ||!("_depth" in H)) {
                    this.graph.computeLevels(this.root, 0, "ignore")
                }
                this.computePositions(H, K)
            },
            computePositions: function(L, H) {
                var J = this.config;
                var I = J.multitree;
                var O = J.align;
                var K = O !== "center" && J.indent;
                var P = J.orientation;
                var N = I ? ["top", "right", "bottom", "left"]: [P];
                var M = this;
                c.each(N, function(Q) {
                    y(M.graph, L, H, M.config, Q, H);
                    var R = ["x", "y"][ + (Q == "left" || Q == "right")];
                    (function S(T) {
                        T.eachSubnode(function(U) {
                            if (U.exist && (!I || ("$orn" in U.data) && U.data.$orn == Q)) {
                                U.getPos(H)[R] += T.getPos(H)[R];
                                if (K) {
                                    U.getPos(H)[R] += O == "left" ? K : - K
                                }
                                S(U)
                            }
                        })
                    })(L)
                })
            }
        })
    })();
    $jit.ST = (function() {
        var x = [];
        function y(D) {
            D = D || this.clickedNode;
            if (!this.config.constrained) {
                return []
            }
            var A = this.geom;
            var H = this.graph;
            var B = this.canvas;
            var z = D._depth, E = [];
            H.eachNode(function(I) {
                if (I.exist&&!I.selected) {
                    if (I.isDescendantOf(D.id)) {
                        if (I._depth <= z) {
                            E.push(I)
                        }
                    } else {
                        E.push(I)
                    }
                }
            });
            var F = A.getRightLevelToShow(D, B);
            D.eachLevel(F, F, function(I) {
                if (I.exist&&!I.selected) {
                    E.push(I)
                }
            });
            for (var G = 0; G < x.length; G++) {
                var C = this.graph.getNode(x[G]);
                if (!C.isDescendantOf(D.id)) {
                    E.push(C)
                }
            }
            return E
        }
        function w(B) {
            var A = [], z = this.config;
            B = B || this.clickedNode;
            this.clickedNode.eachLevel(0, z.levelsToShow, function(C) {
                if (z.multitree&&!("$orn" in C.data) && C.anySubnode(function(D) {
                    return D.exist&&!D.drawn
                })) {
                    A.push(C)
                } else {
                    if (C.drawn&&!C.anySubnode("drawn")) {
                        A.push(C)
                    }
                }
            });
            return A
        }
        return new q({
            Implements: [d, o, g.Tree],
            initialize: function(z) {
                var B = $jit.ST;
                var A = {
                    levelsToShow: 2,
                    levelDistance: 30,
                    constrained: true,
                    Node: {
                        type: "rectangle"
                    },
                    duration: 700,
                    offsetX: 0,
                    offsetY: 0
                };
                this.controller = this.config = c.merge(n("Canvas", "Fx", "Tree", "Node", "Edge", "Controller", "Tips", "NodeStyles", "Events", "Navigation", "Label"), A, z);
                var C = this.config;
                if (C.useCanvas) {
                    this.canvas = C.useCanvas;
                    this.config.labelContainer = this.canvas.id + "-label"
                } else {
                    if (C.background) {
                        C.background = c.merge({
                            type: "Circles"
                        }, C.background)
                    }
                    this.canvas = new l(this, C);
                    this.config.labelContainer = (typeof C.injectInto == "string" ? C.injectInto : C.injectInto.id) + "-label"
                }
                this.graphOptions = {
                    klass: p
                };
                this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
                this.labels = new B.Label[C.Label.type](this);
                this.fx = new B.Plot(this, B);
                this.op = new B.Op(this);
                this.group = new B.Group(this);
                this.geom = new B.Geom(this);
                this.clickedNode = null;
                this.initializeExtras()
            },
            plot: function() {
                this.fx.plot(this.controller)
            },
            switchPosition: function(E, D, C) {
                var z = this.geom, A = this.fx, B = this;
                if (!A.busy) {
                    A.busy = true;
                    this.contract({
                        onComplete: function() {
                            z.switchOrientation(E);
                            B.compute("end", false);
                            A.busy = false;
                            if (D == "animate") {
                                B.onClick(B.clickedNode.id, C)
                            } else {
                                if (D == "replot") {
                                    B.select(B.clickedNode.id, C)
                                }
                            }
                        }
                    }, E)
                }
            },
            switchAlignment: function(B, A, z) {
                this.config.align = B;
                if (A == "animate") {
                    this.select(this.clickedNode.id, z)
                } else {
                    if (A == "replot") {
                        this.onClick(this.clickedNode.id, z)
                    }
                }
            },
            addNodeInPath: function(z) {
                x.push(z);
                this.select((this.clickedNode && this.clickedNode.id) || this.root)
            },
            clearNodesInPath: function(z) {
                x.length = 0;
                this.select((this.clickedNode && this.clickedNode.id) || this.root)
            },
            refresh: function() {
                this.reposition();
                this.select((this.clickedNode && this.clickedNode.id) || this.root)
            },
            reposition: function() {
                this.graph.computeLevels(this.root, 0, "ignore");
                this.geom.setRightLevelToShow(this.clickedNode, this.canvas);
                this.graph.eachNode(function(z) {
                    if (z.exist) {
                        z.drawn = true
                    }
                });
                this.compute("end")
            },
            requestNodes: function(B, C) {
                var A = c.merge(this.controller, C), z = this.config.levelsToShow;
                if (A.request) {
                    var E = [], D = B._depth;
                    B.eachLevel(0, z, function(F) {
                        if (F.drawn&&!F.anySubnode()) {
                            E.push(F);
                            F._level = z - (F._depth - D)
                        }
                    });
                    this.group.requestNodes(E, A)
                } else {
                    A.onComplete()
                }
            },
            contract: function(D, E) {
                var C = this.config.orientation;
                var z = this.geom, B = this.group;
                if (E) {
                    z.switchOrientation(E)
                }
                var A = y.call(this);
                if (E) {
                    z.switchOrientation(C)
                }
                B.contract(A, c.merge(this.controller, D))
            },
            move: function(A, B) {
                this.compute("end", false);
                var z = B.Move, C = {
                    x: z.offsetX,
                    y: z.offsetY
                };
                if (z.enable) {
                    this.geom.translate(A.endPos.add(C).$scale(-1), "end")
                }
                this.fx.animate(c.merge(this.controller, {
                    modes: ["linear"]
                }, B))
            },
            expand: function(A, B) {
                var z = w.call(this, A);
                this.group.expand(z, c.merge(this.controller, B))
            },
            selectPath: function(C) {
                var B = this;
                this.graph.eachNode(function(E) {
                    E.selected = false
                });
                function D(F) {
                    if (F == null || F.selected) {
                        return 
                    }
                    F.selected = true;
                    c.each(B.group.getSiblings([F])[F.id], function(G) {
                        G.exist = true;
                        G.drawn = true
                    });
                    var E = F.getParents();
                    E = (E.length > 0) ? E[0] : null;
                    D(E)
                }
                for (var z = 0, A = [C.id].concat(x); z < A.length; z++) {
                    D(this.graph.getNode(A[z]))
                }
            },
            setRoot: function(G, F, E) {
                if (this.busy) {
                    return 
                }
                this.busy = true;
                var D = this, B = this.canvas;
                var z = this.graph.getNode(this.root);
                var A = this.graph.getNode(G);
                function C() {
                    if (this.config.multitree && A.data.$orn) {
                        var I = A.data.$orn;
                        var J = {
                            left: "right",
                            right: "left",
                            top: "bottom",
                            bottom: "top"
                        }
                        [I];
                        z.data.$orn = J;
                        (function H(K) {
                            K.eachSubnode(function(L) {
                                if (L.id != G) {
                                    L.data.$orn = J;
                                    H(L)
                                }
                            })
                        })(z);
                        delete A.data.$orn
                    }
                    this.root = G;
                    this.clickedNode = A;
                    this.graph.computeLevels(this.root, 0, "ignore");
                    this.geom.setRightLevelToShow(A, B, {
                        execHide: false,
                        onShow: function(K) {
                            if (!K.drawn) {
                                K.drawn = true;
                                K.setData("alpha", 1, "end");
                                K.setData("alpha", 0);
                                K.pos.setc(A.pos.x, A.pos.y)
                            }
                        }
                    });
                    this.compute("end");
                    this.busy = true;
                    this.fx.animate({
                        modes: ["linear", "node-property:alpha"],
                        onComplete: function() {
                            D.busy = false;
                            D.onClick(G, {
                                onComplete: function() {
                                    E && E.onComplete()
                                }
                            })
                        }
                    })
                }
                delete z.data.$orns;
                if (F == "animate") {
                    C.call(this);
                    D.selectPath(A)
                } else {
                    if (F == "replot") {
                        C.call(this);
                        this.select(this.root)
                    }
                }
            },
            addSubtree: function(z, B, A) {
                if (B == "replot") {
                    this.op.sum(z, c.extend({
                        type: "replot"
                    }, A || {}))
                } else {
                    if (B == "animate") {
                        this.op.sum(z, c.extend({
                            type: "fade:seq"
                        }, A || {}))
                    }
                }
            },
            removeSubtree: function(E, A, D, C) {
                var B = this.graph.getNode(E), z = [];
                B.eachLevel(+!A, false, function(F) {
                    z.push(F.id)
                });
                if (D == "replot") {
                    this.op.removeNode(z, c.extend({
                        type: "replot"
                    }, C || {}))
                } else {
                    if (D == "animate") {
                        this.op.removeNode(z, c.extend({
                            type: "fade:seq"
                        }, C || {}))
                    }
                }
            },
            select: function(z, C) {
                var H = this.group, F = this.geom;
                var D = this.graph.getNode(z), B = this.canvas;
                var G = this.graph.getNode(this.root);
                var A = c.merge(this.controller, C);
                var E = this;
                A.onBeforeCompute(D);
                this.selectPath(D);
                this.clickedNode = D;
                this.requestNodes(D, {
                    onComplete: function() {
                        H.hide(H.prepare(y.call(E)), A);
                        F.setRightLevelToShow(D, B);
                        E.compute("current");
                        E.graph.eachNode(function(K) {
                            var J = K.pos.getc(true);
                            K.startPos.setc(J.x, J.y);
                            K.endPos.setc(J.x, J.y);
                            K.visited = false
                        });
                        var I = {
                            x: A.offsetX,
                            y: A.offsetY
                        };
                        E.geom.translate(D.endPos.add(I).$scale(-1), ["start", "current", "end"]);
                        H.show(w.call(E));
                        E.plot();
                        A.onAfterCompute(E.clickedNode);
                        A.onComplete()
                    }
                })
            },
            onClick: function(A, H) {
                var C = this.canvas, G = this, z = this.geom, D = this.config;
                var F = {
                    Move: {
                        enable: true,
                        offsetX: D.offsetX || 0,
                        offsetY: D.offsetY || 0
                    },
                    setRightLevelToShowConfig: false,
                    onBeforeRequest: c.empty,
                    onBeforeContract: c.empty,
                    onBeforeMove: c.empty,
                    onBeforeExpand: c.empty
                };
                var B = c.merge(this.controller, F, H);
                if (!this.busy) {
                    this.busy = true;
                    var E = this.graph.getNode(A);
                    this.selectPath(E, this.clickedNode);
                    this.clickedNode = E;
                    B.onBeforeCompute(E);
                    B.onBeforeRequest(E);
                    this.requestNodes(E, {
                        onComplete: function() {
                            B.onBeforeContract(E);
                            G.contract({
                                onComplete: function() {
                                    z.setRightLevelToShow(E, C, B.setRightLevelToShowConfig);
                                    B.onBeforeMove(E);
                                    G.move(E, {
                                        Move: B.Move,
                                        onComplete: function() {
                                            B.onBeforeExpand(E);
                                            G.expand(E, {
                                                onComplete: function() {
                                                    G.busy = false;
                                                    B.onAfterCompute(A);
                                                    B.onComplete()
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            }
        })
    })();
    $jit.ST.$extend = true;
    $jit.ST.Op = new q({
        Implements: e.Op
    });
    $jit.ST.Group = new q({
        initialize: function(w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.config = w.config;
            this.animation = new u;
            this.nodes = null
        },
        requestNodes: function(B, A) {
            var z = 0, x = B.length, D = {};
            var y = function() {
                A.onComplete()
            };
            var w = this.viz;
            if (x == 0) {
                y()
            }
            for (var C = 0; C < x; C++) {
                D[B[C].id] = B[C];
                A.request(B[C].id, B[C]._level, {
                    onComplete: function(F, E) {
                        if (E && E.children) {
                            E.id = F;
                            w.op.sum(E, {
                                type: "nothing"
                            })
                        }
                        if (++z == x) {
                            w.graph.computeLevels(w.root, 0);
                            y()
                        }
                    }
                })
            }
        },
        contract: function(y, x) {
            var w = this.viz;
            var z = this;
            y = this.prepare(y);
            this.animation.setOptions(c.merge(x, {
                $animating: false,
                compute: function(A) {
                    if (A == 1) {
                        A = 0.99
                    }
                    z.plotStep(1 - A, x, this.$animating);
                    this.$animating = "contract"
                },
                complete: function() {
                    z.hide(y, x)
                }
            })).start()
        },
        hide: function(y, x) {
            var w = this.viz;
            for (var z = 0; z < y.length; z++) {
                if (true ||!x ||!x.request) {
                    y[z].eachLevel(1, false, function(B) {
                        if (B.exist) {
                            c.extend(B, {
                                drawn: false,
                                exist: false
                            })
                        }
                    })
                } else {
                    var A = [];
                    y[z].eachLevel(1, false, function(B) {
                        A.push(B.id)
                    });
                    w.op.removeNode(A, {
                        type: "nothing"
                    });
                    w.labels.clearLabels()
                }
            }
            x.onComplete()
        },
        expand: function(x, w) {
            var y = this;
            this.show(x);
            this.animation.setOptions(c.merge(w, {
                $animating: false,
                compute: function(z) {
                    y.plotStep(z, w, this.$animating);
                    this.$animating = "expand"
                },
                complete: function() {
                    y.plotStep(undefined, w, false);
                    w.onComplete()
                }
            })).start()
        },
        show: function(w) {
            var x = this.config;
            this.prepare(w);
            c.each(w, function(z) {
                if (x.multitree&&!("$orn" in z.data)) {
                    delete z.data.$orns;
                    var y = " ";
                    z.eachSubnode(function(A) {
                        if (("$orn" in A.data) && y.indexOf(A.data.$orn) < 0 && A.exist&&!A.drawn) {
                            y += A.data.$orn + " "
                        }
                    });
                    z.data.$orns = y
                }
                z.eachLevel(0, x.levelsToShow, function(A) {
                    if (A.exist) {
                        A.drawn = true
                    }
                })
            })
        },
        prepare: function(w) {
            this.nodes = this.getNodesWithChildren(w);
            return this.nodes
        },
        getNodesWithChildren: function(y) {
            var x = [], A = this.config, w = this.viz.root;
            y.sort(function(E, D) {
                return (E._depth <= D._depth) - (E._depth >= D._depth)
            });
            for (var B = 0; B < y.length; B++) {
                if (y[B].anySubnode("exist")) {
                    for (var z = B + 1, C = false; !C && z < y.length; z++) {
                        if (!A.multitree || "$orn" in y[z].data) {
                            C = C || y[B].isDescendantOf(y[z].id)
                        }
                    }
                    if (!C) {
                        x.push(y[B])
                    }
                }
            }
            return x
        },
        plotStep: function(G, C, I) {
            var F = this.viz, z = this.config, y = F.canvas, H = y.getCtx(), w = this.nodes;
            var B, A;
            var x = {};
            for (B = 0; B < w.length; B++) {
                A = w[B];
                x[A.id] = [];
                var E = z.multitree&&!("$orn" in A.data);
                var D = E && A.data.$orns;
                A.eachSubgraph(function(J) {
                    if (E && D && D.indexOf(J.data.$orn) > 0 && J.drawn) {
                        J.drawn = false;
                        x[A.id].push(J)
                    } else {
                        if ((!E ||!D) && J.drawn) {
                            J.drawn = false;
                            x[A.id].push(J)
                        }
                    }
                });
                A.drawn = true
            }
            if (w.length > 0) {
                F.fx.plot()
            }
            for (B in x) {
                c.each(x[B], function(J) {
                    J.drawn = true
                })
            }
            for (B = 0; B < w.length; B++) {
                A = w[B];
                H.save();
                F.fx.plotSubtree(A, C, G, I);
                H.restore()
            }
        },
        getSiblings: function(w) {
            var x = {};
            c.each(w, function(A) {
                var z = A.getParents();
                if (z.length == 0) {
                    x[A.id] = [A]
                } else {
                    var y = [];
                    z[0].eachSubnode(function(B) {
                        y.push(B)
                    });
                    x[A.id] = y
                }
            });
            return x
        }
    });
    $jit.ST.Geom = new q({
        Implements: e.Geom,
        switchOrientation: function(w) {
            this.config.orientation = w
        },
        dispatch: function() {
            var x = Array.prototype.slice.call(arguments);
            var y = x.shift(), w = x.length;
            var z = function(A) {
                return typeof A == "function" ? A() : A
            };
            if (w == 2) {
                return (y == "top" || y == "bottom") ? z(x[0]) : z(x[1])
            } else {
                if (w == 4) {
                    switch (y) {
                    case"top":
                        return z(x[0]);
                    case"right":
                        return z(x[1]);
                    case"bottom":
                        return z(x[2]);
                    case"left":
                        return z(x[3])
                    }
                }
            }
            return undefined
        },
        getSize: function(E, D) {
            var C = E.data, z = this.config;
            var y = z.siblingOffset;
            var B = (z.multitree && ("$orn" in C) && C.$orn) || z.orientation;
            var x = E.getData("width") + y;
            var A = E.getData("height") + y;
            if (!D) {
                return this.dispatch(B, A, x)
            } else {
                return this.dispatch(B, x, A)
            }
        },
        getTreeBaseSize: function(A, B, x) {
            var y = this.getSize(A, true), w = 0, z = this;
            if (x(B, A)) {
                return y
            }
            if (B === 0) {
                return 0
            }
            A.eachSubnode(function(C) {
                w += z.getTreeBaseSize(C, B-1, x)
            });
            return (y > w ? y : w) + this.config.subtreeOffset
        },
        getEdge: function(C, B, A) {
            var y = function(E, w) {
                return function() {
                    return C.pos.add(new p(E, w))
                }
            };
            var D = this.node;
            var x = C.getData("width");
            var z = C.getData("height");
            if (B == "begin") {
                if (D.align == "center") {
                    return this.dispatch(A, y(0, z / 2), y( - x / 2, 0), y(0, - z / 2), y(x / 2, 0))
                } else {
                    if (D.align == "left") {
                        return this.dispatch(A, y(0, z), y(0, 0), y(0, 0), y(x, 0))
                    } else {
                        if (D.align == "right") {
                            return this.dispatch(A, y(0, 0), y( - x, 0), y(0, - z), y(0, 0))
                        } else {
                            throw "align: not implemented"
                        }
                    }
                }
            } else {
                if (B == "end") {
                    if (D.align == "center") {
                        return this.dispatch(A, y(0, - z / 2), y(x / 2, 0), y(0, z / 2), y( - x / 2, 0))
                    } else {
                        if (D.align == "left") {
                            return this.dispatch(A, y(0, 0), y(x, 0), y(0, z), y(0, 0))
                        } else {
                            if (D.align == "right") {
                                return this.dispatch(A, y(0, - z), y(0, 0), y(0, 0), y( - x, 0))
                            } else {
                                throw "align: not implemented"
                            }
                        }
                    }
                }
            }
        },
        getScaledTreePosition: function(B, D) {
            var C = this.node;
            var x = B.getData("width");
            var A = B.getData("height");
            var z = (this.config.multitree && ("$orn" in B.data) && B.data.$orn) || this.config.orientation;
            var y = function(E, w) {
                return function() {
                    return B.pos.add(new p(E, w)).$scale(1 - D)
                }
            };
            if (C.align == "left") {
                return this.dispatch(z, y(0, A), y(0, 0), y(0, 0), y(x, 0))
            } else {
                if (C.align == "center") {
                    return this.dispatch(z, y(0, A / 2), y( - x / 2, 0), y(0, - A / 2), y(x / 2, 0))
                } else {
                    if (C.align == "right") {
                        return this.dispatch(z, y(0, 0), y( - x, 0), y(0, - A), y(0, 0))
                    } else {
                        throw "align: not implemented"
                    }
                }
            }
        },
        treeFitsInCanvas: function(B, w, C) {
            var y = w.getSize();
            var z = (this.config.multitree && ("$orn" in B.data) && B.data.$orn) || this.config.orientation;
            var x = this.dispatch(z, y.width, y.height);
            var A = this.getTreeBaseSize(B, C, function(E, D) {
                return E === 0 ||!D.anySubnode()
            });
            return (A < x)
        }
    });
    $jit.ST.Plot = new q({
        Implements: e.Plot,
        plotSubtree: function(z, w, A, E) {
            var C = this.viz, x = C.canvas, y = C.config;
            A = Math.min(Math.max(0.001, A), 1);
            if (A >= 0) {
                z.drawn = false;
                var D = x.getCtx();
                var B = C.geom.getScaledTreePosition(z, A);
                D.translate(B.x, B.y);
                D.scale(A, A)
            }
            this.plotTree(z, c.merge(w, {
                withLabels: true,
                hideLabels: !!A,
                plotSubtree: function(I, G) {
                    var F = y.multitree&&!("$orn" in z.data);
                    var H = F && z.getData("orns");
                    return !F || H.indexOf(z.getData("orn"))>-1
                }
            }), E);
            if (A >= 0) {
                z.drawn = true
            }
        },
        getAlignedPos: function(B, z, w) {
            var y = this.node;
            var A, x;
            if (y.align == "center") {
                A = {
                    x: B.x - z / 2,
                    y: B.y - w / 2
                }
            } else {
                if (y.align == "left") {
                    x = this.config.orientation;
                    if (x == "bottom" || x == "top") {
                        A = {
                            x: B.x - z / 2,
                            y: B.y
                        }
                    } else {
                        A = {
                            x: B.x,
                            y: B.y - w / 2
                        }
                    }
                } else {
                    if (y.align == "right") {
                        x = this.config.orientation;
                        if (x == "bottom" || x == "top") {
                            A = {
                                x: B.x - z / 2,
                                y: B.y - w
                            }
                        } else {
                            A = {
                                x: B.x - z,
                                y: B.y - w / 2
                            }
                        }
                    } else {
                        throw "align: not implemented"
                    }
                }
            }
            return A
        },
        getOrientation: function(w) {
            var y = this.config;
            var x = y.orientation;
            if (y.multitree) {
                var z = w.nodeFrom;
                var A = w.nodeTo;
                x = (("$orn" in z.data) && z.data.$orn) || (("$orn" in A.data) && A.data.$orn)
            }
            return x
        }
    });
    $jit.ST.Label = {};
    $jit.ST.Label.Native = new q({
        Implements: e.Label.Native,
        renderLabel: function(z, B, y) {
            var x = z.getCtx(), D = B.pos.getc(true), A = B.getData("width"), w = B.getData("height"), C = this.viz.fx.getAlignedPos(D, A, w);
            x.fillText(B.name, C.x + A / 2, C.y + w / 2)
        }
    });
    $jit.ST.Label.DOM = new q({
        Implements: e.Label.DOM,
        placeLabel: function(P, J, F) {
            var B = J.pos.getc(true), O = this.viz.config, K = O.Node, x = this.viz.canvas, C = J.getData("width"), M = J.getData("height"), y = x.getSize(), G, N;
            var A = x.translateOffsetX, z = x.translateOffsetY, E = x.scaleOffsetX, D = x.scaleOffsetY, I = B.x * E + A, H = B.y * D + z;
            if (K.align == "center") {
                G = {
                    x: Math.round(I - C / 2 + y.width / 2),
                    y: Math.round(H - M / 2 + y.height / 2)
                }
            } else {
                if (K.align == "left") {
                    N = O.orientation;
                    if (N == "bottom" || N == "top") {
                        G = {
                            x: Math.round(I - C / 2 + y.width / 2),
                            y: Math.round(H + y.height / 2)
                        }
                    } else {
                        G = {
                            x: Math.round(I + y.width / 2),
                            y: Math.round(H - M / 2 + y.height / 2)
                        }
                    }
                } else {
                    if (K.align == "right") {
                        N = O.orientation;
                        if (N == "bottom" || N == "top") {
                            G = {
                                x: Math.round(I - C / 2 + y.width / 2),
                                y: Math.round(H - M + y.height / 2)
                            }
                        } else {
                            G = {
                                x: Math.round(I - C + y.width / 2),
                                y: Math.round(H - M / 2 + y.height / 2)
                            }
                        }
                    } else {
                        throw "align: not implemented"
                    }
                }
            }
            var L = P.style;
            L.left = G.x + "px";
            L.top = G.y + "px";
            L.display = this.fitsInCanvas(G, x) ? "" : "none";
            F.onPlaceLabel(P, J)
        }
    });
    $jit.ST.Label.SVG = new q({
        Implements: [$jit.ST.Label.DOM, e.Label.SVG],
        initialize: function(w) {
            this.viz = w
        }
    });
    $jit.ST.Label.HTML = new q({
        Implements: [$jit.ST.Label.DOM, e.Label.HTML],
        initialize: function(w) {
            this.viz = w
        }
    });
    $jit.ST.Plot.NodeTypes = new q({
        none: {
            render: c.empty,
            contains: c.lambda(false)
        },
        circle: {
            render: function(x, w) {
                var z = x.getData("dim"), A = this.getAlignedPos(x.pos.getc(true), z, z), y = z / 2;
                this.nodeHelper.circle.render("fill", {
                    x: A.x + y,
                    y: A.y + y
                }, y, w)
            },
            contains: function(w, A) {
                var y = w.getData("dim"), z = this.getAlignedPos(w.pos.getc(true), y, y), x = y / 2;
                this.nodeHelper.circle.contains({
                    x: z.x + x,
                    y: z.y + x
                }, A, x)
            }
        },
        square: {
            render: function(x, w) {
                var z = x.getData("dim"), y = z / 2, A = this.getAlignedPos(x.pos.getc(true), z, z);
                this.nodeHelper.square.render("fill", {
                    x: A.x + y,
                    y: A.y + y
                }, y, w)
            },
            contains: function(w, A) {
                var y = w.getData("dim"), z = this.getAlignedPos(w.pos.getc(true), y, y), x = y / 2;
                this.nodeHelper.square.contains({
                    x: z.x + x,
                    y: z.y + x
                }, A, x)
            }
        },
        ellipse: {
            render: function(z, x) {
                var y = z.getData("width"), w = z.getData("height"), A = this.getAlignedPos(z.pos.getc(true), y, w);
                this.nodeHelper.ellipse.render("fill", {
                    x: A.x + y / 2,
                    y: A.y + w / 2
                }, y, w, x)
            },
            contains: function(y, A) {
                var x = y.getData("width"), w = y.getData("height"), z = this.getAlignedPos(y.pos.getc(true), x, w);
                this.nodeHelper.ellipse.contains({
                    x: z.x + x / 2,
                    y: z.y + w / 2
                }, A, x, w)
            }
        },
        rectangle: {
            render: function(z, x) {
                var y = z.getData("width"), w = z.getData("height"), A = this.getAlignedPos(z.pos.getc(true), y, w);
                this.nodeHelper.rectangle.render("fill", {
                    x: A.x + y / 2,
                    y: A.y + w / 2
                }, y, w, x)
            },
            contains: function(y, A) {
                var x = y.getData("width"), w = y.getData("height"), z = this.getAlignedPos(y.pos.getc(true), x, w);
                this.nodeHelper.rectangle.contains({
                    x: z.x + x / 2,
                    y: z.y + w / 2
                }, A, x, w)
            }
        }
    });
    $jit.ST.Plot.EdgeTypes = new q({
        none: c.empty,
        line: {
            render: function(x, z) {
                var y = this.getOrientation(x), A = x.nodeFrom, B = x.nodeTo, w = A._depth < B._depth, D = this.viz.geom.getEdge(w ? A : B, "begin", y), C = this.viz.geom.getEdge(w ? B : A, "end", y);
                this.edgeHelper.line.render(D, C, z)
            },
            contains: function(x, D) {
                var y = this.getOrientation(x), z = x.nodeFrom, A = x.nodeTo, w = z._depth < A._depth, C = this.viz.geom.getEdge(w ? z : A, "begin", y), B = this.viz.geom.getEdge(w ? A : z, "end", y);
                return this.edgeHelper.line.contains(C, B, D, this.edge.epsilon)
            }
        },
        arrow: {
            render: function(C, x) {
                var B = this.getOrientation(C), y = C.nodeFrom, w = C.nodeTo, A = C.getData("dim"), E = this.viz.geom.getEdge(y, "begin", B), F = this.viz.geom.getEdge(w, "end", B), D = C.data.$direction, z = (D && D.length > 1 && D[0] != y.id);
                this.edgeHelper.arrow.render(E, F, A, z, x)
            },
            contains: function(x, D) {
                var y = this.getOrientation(x), z = x.nodeFrom, A = x.nodeTo, w = z._depth < A._depth, C = this.viz.geom.getEdge(w ? z : A, "begin", y), B = this.viz.geom.getEdge(w ? A : z, "end", y);
                return this.edgeHelper.arrow.contains(C, B, D, this.edge.epsilon)
            }
        },
        "quadratic:begin": {
            render: function(C, w) {
                var B = this.getOrientation(C);
                var A = C.nodeFrom, D = C.nodeTo, F = A._depth < D._depth, x = this.viz.geom.getEdge(F ? A : D, "begin", B), y = this.viz.geom.getEdge(F ? D : A, "end", B), z = C.getData("dim"), E = w.getCtx();
                E.beginPath();
                E.moveTo(x.x, x.y);
                switch (B) {
                case"left":
                    E.quadraticCurveTo(x.x + z, x.y, y.x, y.y);
                    break;
                case"right":
                    E.quadraticCurveTo(x.x - z, x.y, y.x, y.y);
                    break;
                case"top":
                    E.quadraticCurveTo(x.x, x.y + z, y.x, y.y);
                    break;
                case"bottom":
                    E.quadraticCurveTo(x.x, x.y - z, y.x, y.y);
                    break
                }
                E.stroke()
            }
        },
        "quadratic:end": {
            render: function(C, w) {
                var B = this.getOrientation(C);
                var A = C.nodeFrom, D = C.nodeTo, F = A._depth < D._depth, x = this.viz.geom.getEdge(F ? A : D, "begin", B), y = this.viz.geom.getEdge(F ? D : A, "end", B), z = C.getData("dim"), E = w.getCtx();
                E.beginPath();
                E.moveTo(x.x, x.y);
                switch (B) {
                case"left":
                    E.quadraticCurveTo(y.x - z, y.y, y.x, y.y);
                    break;
                case"right":
                    E.quadraticCurveTo(y.x + z, y.y, y.x, y.y);
                    break;
                case"top":
                    E.quadraticCurveTo(y.x, y.y - z, y.x, y.y);
                    break;
                case"bottom":
                    E.quadraticCurveTo(y.x, y.y + z, y.x, y.y);
                    break
                }
                E.stroke()
            }
        },
        bezier: {
            render: function(C, w) {
                var B = this.getOrientation(C), A = C.nodeFrom, D = C.nodeTo, F = A._depth < D._depth, x = this.viz.geom.getEdge(F ? A : D, "begin", B), y = this.viz.geom.getEdge(F ? D : A, "end", B), z = C.getData("dim"), E = w.getCtx();
                E.beginPath();
                E.moveTo(x.x, x.y);
                switch (B) {
                case"left":
                    E.bezierCurveTo(x.x + z, x.y, y.x - z, y.y, y.x, y.y);
                    break;
                case"right":
                    E.bezierCurveTo(x.x - z, x.y, y.x + z, y.y, y.x, y.y);
                    break;
                case"top":
                    E.bezierCurveTo(x.x, x.y + z, y.x, y.y - z, y.x, y.y);
                    break;
                case"bottom":
                    E.bezierCurveTo(x.x, x.y - z, y.x, y.y + z, y.x, y.y);
                    break
                }
                E.stroke()
            }
        }
    });
    $jit.ST.Plot.NodeTypes.implement({
        "areachart-stacked": {
            render: function(W, D) {
                var U = W.pos.getc(true), w = W.getData("width"), A = W.getData("height"), G = this.getAlignedPos(U, w, A), ab = G.x, aa = G.y, L = W.getData("stringArray"), F = W.getData("dimArray"), B = W.getData("valueArray"), ad = c.reduce(B, function(aj, ak) {
                    return aj + ak[0]
                }, 0), ac = c.reduce(B, function(aj, ak) {
                    return aj + ak[1]
                }, 0), I = W.getData("colorArray"), C = I.length, Y = W.getData("config"), J = W.getData("gradient"), ai = Y.showLabels, N = Y.showAggregates, ae = Y.Label, T = W.getData("prev");
                var M = D.getCtx(), H = W.getData("border");
                if (I && F && L) {
                    for (var ah = 0, af = F.length, K = 0, E = 0, X = 0; ah < af; ah++) {
                        M.fillStyle = M.strokeStyle = I[ah%C];
                        M.save();
                        if (J && (F[ah][0] > 0 || F[ah][1] > 0)) {
                            var R = K + F[ah][0], P = E + F[ah][1], ag = Math.atan((P - R) / w), Z = 55;
                            var V = M.createLinearGradient(ab + w / 2, aa - (R + P) / 2, ab + w / 2 + Z * Math.sin(ag), aa - (R + P) / 2 + Z * Math.cos(ag));
                            var Q = c.rgbToHex(c.map(c.hexToRgb(I[ah%C].slice(1)), function(x) {
                                return (x * 0.85)>>0
                            }));
                            V.addColorStop(0, I[ah%C]);
                            V.addColorStop(1, Q);
                            M.fillStyle = V
                        }
                        M.beginPath();
                        M.moveTo(ab, aa - K);
                        M.lineTo(ab + w, aa - E);
                        M.lineTo(ab + w, aa - E - F[ah][1]);
                        M.lineTo(ab, aa - K - F[ah][0]);
                        M.lineTo(ab, aa - K);
                        M.fill();
                        M.restore();
                        if (H) {
                            var S = H.name == L[ah];
                            var z = S ? 0.7: 0.8;
                            var Q = c.rgbToHex(c.map(c.hexToRgb(I[ah%C].slice(1)), function(x) {
                                return (x * z)>>0
                            }));
                            M.strokeStyle = Q;
                            M.lineWidth = S ? 4 : 1;
                            M.save();
                            M.beginPath();
                            if (H.index === 0) {
                                M.moveTo(ab, aa - K);
                                M.lineTo(ab, aa - K - F[ah][0])
                            } else {
                                M.moveTo(ab + w, aa - E);
                                M.lineTo(ab + w, aa - E - F[ah][1])
                            }
                            M.stroke();
                            M.restore()
                        }
                        K += (F[ah][0] || 0);
                        E += (F[ah][1] || 0);
                        if (F[ah][0] > 0) {
                            X += (B[ah][0] || 0)
                        }
                    }
                    if (T && ae.type == "Native") {
                        M.save();
                        M.beginPath();
                        M.fillStyle = M.strokeStyle = ae.color;
                        M.font = ae.style + " " + ae.size + "px " + ae.family;
                        M.textAlign = "center";
                        M.textBaseline = "middle";
                        var O = N(W.name, ad, ac, W, X);
                        if (O !== false) {
                            M.fillText(O !== true ? O : X, ab, aa - K - Y.labelOffset - ae.size / 2, w)
                        }
                        if (ai(W.name, ad, ac, W)) {
                            M.fillText(W.name, ab, aa + ae.size / 2 + Y.labelOffset)
                        }
                        M.restore()
                    }
                }
            },
            contains: function(C, E) {
                var J = C.pos.getc(true), z = C.getData("width"), N = C.getData("height"), M = this.getAlignedPos(J, z, N), L = M.x, K = M.y, O = C.getData("dimArray"), w = E.x - L;
                if (E.x < L || E.x > L + z || E.y > K || E.y < K - N) {
                    return false
                }
                for (var F = 0, D = O.length, I = K, A = K; F < D; F++) {
                    var B = O[F];
                    I -= B[0];
                    A -= B[1];
                    var G = I + (A - I) * w / z;
                    if (E.y >= G) {
                        var H =+ (w > z / 2);
                        return {
                            name: C.getData("stringArray")[F],
                            color: C.getData("colorArray")[F],
                            value: C.getData("valueArray")[F][H],
                            index: H
                        }
                    }
                }
                return false
            }
        }
    });
    $jit.AreaChart = new q({
        st: null,
        colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
        selected: {},
        busy: false,
        initialize: function(y) {
            this.controller = this.config = c.merge(n("Canvas", "Margin", "Label", "AreaChart"), {
                Label: {
                    type: "Native"
                }
            }, y);
            var z = this.config.showLabels, x = c.type(z), A = this.config.showAggregates, w = c.type(A);
            this.config.showLabels = x == "function" ? z : c.lambda(z);
            this.config.showAggregates = w == "function" ? A : c.lambda(A);
            this.initializeViz()
        },
        initializeViz: function() {
            var x = this.config, B = this, w = x.type.split(":")[0], A = {};
            var z = new $jit.ST({
                injectInto: x.injectInto,
                width: x.width,
                height: x.height,
                orientation: "bottom",
                levelDistance: 0,
                siblingOffset: 0,
                subtreeOffset: 0,
                withLabels: x.Label.type != "Native",
                useCanvas: x.useCanvas,
                Label: {
                    type: x.Label.type
                },
                Node: {
                    overridable: true,
                    type: "areachart-" + w,
                    align: "left",
                    width: 1,
                    height: 1
                },
                Edge: {
                    type: "none"
                },
                Tips: {
                    enable: x.Tips.enable,
                    type: "Native",
                    force: true,
                    onShow: function(G, F, D) {
                        var E = D;
                        x.Tips.onShow(G, E, F)
                    }
                },
                Events: {
                    enable: true,
                    type: "Native",
                    onClick: function(F, G, D) {
                        if (!x.filterOnClick&&!x.Events.enable) {
                            return 
                        }
                        var E = G.getContains();
                        if (E) {
                            x.filterOnClick && B.filter(E.name)
                        }
                        x.Events.enable && x.Events.onClick(E, G, D)
                    },
                    onRightClick: function(E, F, D) {
                        if (!x.restoreOnRightClick) {
                            return 
                        }
                        B.restore()
                    },
                    onMouseMove: function(F, G, D) {
                        if (!x.selectOnHover) {
                            return 
                        }
                        if (F) {
                            var E = G.getContains();
                            B.select(F.id, E.name, E.index)
                        } else {
                            B.select(false, false, false)
                        }
                    }
                },
                onCreateLabel: function(J, G) {
                    var P = x.Label, O = G.getData("valueArray"), H = c.reduce(O, function(Q, R) {
                        return Q + R[0]
                    }, 0), M = c.reduce(O, function(Q, R) {
                        return Q + R[1]
                    }, 0);
                    if (G.getData("prev")) {
                        var L = {
                            wrapper: document.createElement("div"),
                            aggregate: document.createElement("div"),
                            label: document.createElement("div")
                        };
                        var D = L.wrapper, N = L.label, E = L.aggregate, F = D.style, K = N.style, I = E.style;
                        A[G.id] = L;
                        D.appendChild(N);
                        D.appendChild(E);
                        if (!x.showLabels(G.name, H, M, G)) {
                            N.style.display = "none"
                        }
                        if (!x.showAggregates(G.name, H, M, G)) {
                            E.style.display = "none"
                        }
                        F.position = "relative";
                        F.overflow = "visible";
                        F.fontSize = P.size + "px";
                        F.fontFamily = P.family;
                        F.color = P.color;
                        F.textAlign = "center";
                        I.position = K.position = "absolute";
                        J.style.width = G.getData("width") + "px";
                        J.style.height = G.getData("height") + "px";
                        N.innerHTML = G.name;
                        J.appendChild(D)
                    }
                },
                onPlaceLabel: function(V, P) {
                    if (!P.getData("prev")) {
                        return 
                    }
                    var T = A[P.id], E = T.wrapper.style, D = T.label.style, O = T.aggregate.style, M = P.getData("width"), K = P.getData("height"), J = P.getData("dimArray"), G = P.getData("valueArray"), L = c.reduce(G, function(W, X) {
                        return W + X[0]
                    }, 0), H = c.reduce(G, function(W, X) {
                        return W + X[1]
                    }, 0), I = parseInt(E.fontSize, 10), N = V.style;
                    if (J && G) {
                        if (x.showLabels(P.name, L, H, P)) {
                            D.display = ""
                        } else {
                            D.display = "none"
                        }
                        var F = x.showAggregates(P.name, L, H, P);
                        if (F !== false) {
                            O.display = ""
                        } else {
                            O.display = "none"
                        }
                        E.width = O.width = D.width = V.style.width = M + "px";
                        O.left = D.left =- M / 2 + "px";
                        for (var S = 0, Q = G.length, R = 0, U = 0; S < Q; S++) {
                            if (J[S][0] > 0) {
                                R += G[S][0];
                                U += J[S][0]
                            }
                        }
                        O.top = ( - I - x.labelOffset) + "px";
                        D.top = (x.labelOffset + U) + "px";
                        V.style.top = parseInt(V.style.top, 10) - U + "px";
                        V.style.height = E.height = U + "px";
                        T.aggregate.innerHTML = F !== true ? F : R
                    }
                }
            });
            var y = z.canvas.getSize(), C = x.Margin;
            z.config.offsetY =- y.height / 2 + C.bottom + (x.showLabels && (x.labelOffset + x.Label.size));
            z.config.offsetX = (C.right - C.left) / 2;
            this.delegate = z;
            this.canvas = this.delegate.canvas
        },
        loadJSON: function(N) {
            var J = c.time(), B = [], M = this.delegate, Q = c.splat(N.label), I = c.splat(N.color || this.colors), O = this.config, x=!!O.type.split(":")[1], z = O.animate;
            for (var K = 0, y = N.values, H = y.length; K < H-1; K++) {
                var P = y[K], E = y[K-1], F = y[K + 1];
                var L = c.splat(y[K].values), w = c.splat(y[K + 1].values);
                var A = c.zip(L, w);
                var D = 0, C = 0;
                B.push({
                    id: J + P.label,
                    name: P.label,
                    data: {
                        value: A,
                        "$valueArray": A,
                        "$colorArray": I,
                        "$stringArray": Q,
                        "$next": F.label,
                        "$prev": E ? E.label: false,
                        "$config": O,
                        "$gradient": x
                    },
                    children: []
                })
            }
            var G = {
                id: J + "$root",
                name: "",
                data: {
                    "$type": "none",
                    "$width": 1,
                    "$height": 1
                },
                children: B
            };
            M.loadJSON(G);
            this.normalizeDims();
            M.compute();
            M.select(M.root);
            if (z) {
                M.fx.animate({
                    modes: ["node-property:height:dimArray"],
                    duration: 1500
                })
            }
        },
        updateJSON: function(G, x) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            var D = this.delegate, F = D.graph, A = G.label && c.splat(G.label), E = G.values, w = this.config.animate, C = this, B = {};
            for (var z = 0, y = E.length; z < y; z++) {
                B[E[z].label] = E[z]
            }
            F.eachNode(function(L) {
                var H = B[L.name], I = L.getData("stringArray"), K = L.getData("valueArray"), J = L.getData("next");
                if (H) {
                    H.values = c.splat(H.values);
                    c.each(K, function(M, N) {
                        M[0] = H.values[N];
                        if (A) {
                            I[N] = A[N]
                        }
                    });
                    L.setData("valueArray", K)
                }
                if (J) {
                    H = B[J];
                    if (H) {
                        c.each(K, function(M, N) {
                            M[1] = H.values[N]
                        })
                    }
                }
            });
            this.normalizeDims();
            D.compute();
            D.select(D.root);
            if (w) {
                D.fx.animate({
                    modes: ["node-property:height:dimArray"],
                    duration: 1500,
                    onComplete: function() {
                        C.busy = false;
                        x && x.onComplete()
                    }
                })
            }
        },
        filter: function(z, A) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            if (this.config.Tips.enable) {
                this.delegate.tips.hide()
            }
            this.select(false, false, false);
            var x = c.splat(z);
            var w = this.delegate.graph.getNode(this.delegate.root);
            var y = this;
            this.normalizeDims();
            w.eachAdjacency(function(B) {
                var E = B.nodeTo, D = E.getData("dimArray", "end"), C = E.getData("stringArray");
                E.setData("dimArray", c.map(D, function(G, F) {
                    return (c.indexOf(x, C[F])>-1) ? G : [0, 0]
                }), "end")
            });
            this.delegate.fx.animate({
                modes: ["node-property:dimArray"],
                duration: 1500,
                onComplete: function() {
                    y.busy = false;
                    A && A.onComplete()
                }
            })
        },
        restore: function(x) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            if (this.config.Tips.enable) {
                this.delegate.tips.hide()
            }
            this.select(false, false, false);
            this.normalizeDims();
            var w = this;
            this.delegate.fx.animate({
                modes: ["node-property:height:dimArray"],
                duration: 1500,
                onComplete: function() {
                    w.busy = false;
                    x && x.onComplete()
                }
            })
        },
        select: function(B, x, w) {
            if (!this.config.selectOnHover) {
                return 
            }
            var y = this.selected;
            if (y.id != B || y.name != x || y.index != w) {
                y.id = B;
                y.name = x;
                y.index = w;
                this.delegate.graph.eachNode(function(C) {
                    C.setData("border", false)
                });
                if (B) {
                    var A = this.delegate.graph.getNode(B);
                    A.setData("border", y);
                    var z = w === 0 ? "prev": "next";
                    z = A.getData(z);
                    if (z) {
                        A = this.delegate.graph.getByName(z);
                        if (A) {
                            A.setData("border", {
                                name: x,
                                index: 1 - w
                            })
                        }
                    }
                }
                this.delegate.plot()
            }
        },
        getLegend: function() {
            var y = {};
            var z;
            this.delegate.graph.getNode(this.delegate.root).eachAdjacency(function(A) {
                z = A.nodeTo
            });
            var x = z.getData("colorArray"), w = x.length;
            c.each(z.getData("stringArray"), function(B, A) {
                y[B] = x[A%w]
            });
            return y
        },
        getMaxValue: function() {
            var w = 0;
            this.delegate.graph.eachNode(function(B) {
                var y = B.getData("valueArray"), x = 0, A = 0;
                c.each(y, function(C) {
                    x+=+C[0];
                    A+=+C[1]
                });
                var z = A > x ? A: x;
                w = w > z ? w : z
            });
            return w
        },
        normalizeDims: function() {
            var C = this.delegate.graph.getNode(this.delegate.root), z = 0;
            C.eachAdjacency(function() {
                z++
            });
            var B = this.getMaxValue() || 1, F = this.delegate.canvas.getSize(), y = this.config, A = y.Margin, D = y.labelOffset + y.Label.size, w = (F.width - (A.left + A.right)) / z, x = y.animate, E = F.height - (A.top + A.bottom) - (y.showAggregates && D) - (y.showLabels && D);
            this.delegate.graph.eachNode(function(L) {
                var I = 0, K = 0, G = [];
                c.each(L.getData("valueArray"), function(M) {
                    I+=+M[0];
                    K+=+M[1];
                    G.push([0, 0])
                });
                var J = K > I ? K: I;
                L.setData("width", w);
                if (x) {
                    L.setData("height", J * E / B, "end");
                    L.setData("dimArray", c.map(L.getData("valueArray"), function(M) {
                        return [M[0] * E / B, M[1] * E / B]
                    }), "end");
                    var H = L.getData("dimArray");
                    if (!H) {
                        L.setData("dimArray", G)
                    }
                } else {
                    L.setData("height", J * E / B);
                    L.setData("dimArray", c.map(L.getData("valueArray"), function(M) {
                        return [M[0] * E / B, M[1] * E / B]
                    }))
                }
            })
        }
    });
    n.BarChart = {
        $extend: true,
        animate: true,
        type: "stacked",
        labelOffset: 3,
        barsOffset: 0,
        hoveredColor: "#9fd4ff",
        orientation: "horizontal",
        showAggregates: true,
        showLabels: true,
        Tips: {
            enable: false,
            onShow: c.empty,
            onHide: c.empty
        },
        Events: {
            enable: false,
            onClick: c.empty
        }
    };
    $jit.ST.Plot.NodeTypes.implement({
        "barchart-stacked": {
            render: function(R, C) {
                var H = R.pos.getc(true), Q = R.getData("width"), O = R.getData("height"), M = this.getAlignedPos(H, Q, O), L = M.x, K = M.y, N = R.getData("dimArray"), F = R.getData("valueArray"), E = R.getData("colorArray"), B = E.length, Y = R.getData("stringArray");
                var T = C.getCtx(), w = {}, U = R.getData("border"), z = R.getData("gradient"), aa = R.getData("config"), A = aa.orientation == "horizontal", D = aa.showAggregates, P = aa.showLabels, J = aa.Label;
                if (E && N && Y) {
                    for (var X = 0, S = N.length, W = 0, G = 0; X < S; X++) {
                        T.fillStyle = T.strokeStyle = E[X%B];
                        if (z) {
                            var Z;
                            if (A) {
                                Z = T.createLinearGradient(L + W + N[X] / 2, K, L + W + N[X] / 2, K + O)
                            } else {
                                Z = T.createLinearGradient(L, K - W - N[X] / 2, L + Q, K - W - N[X] / 2)
                            }
                            var V = c.rgbToHex(c.map(c.hexToRgb(E[X%B].slice(1)), function(x) {
                                return (x * 0.5)>>0
                            }));
                            Z.addColorStop(0, V);
                            Z.addColorStop(0.5, E[X%B]);
                            Z.addColorStop(1, V);
                            T.fillStyle = Z
                        }
                        if (A) {
                            T.fillRect(L + W, K, N[X], O)
                        } else {
                            T.fillRect(L, K - W - N[X], Q, N[X])
                        }
                        if (U && U.name == Y[X]) {
                            w.acum = W;
                            w.dimValue = N[X]
                        }
                        W += (N[X] || 0);
                        G += (F[X] || 0)
                    }
                    if (U) {
                        T.save();
                        T.lineWidth = 2;
                        T.strokeStyle = U.color;
                        if (A) {
                            T.strokeRect(L + w.acum + 1, K + 1, w.dimValue-2, O-2)
                        } else {
                            T.strokeRect(L + 1, K - w.acum - w.dimValue + 1, Q-2, w.dimValue-2)
                        }
                        T.restore()
                    }
                    if (J.type == "Native") {
                        T.save();
                        T.fillStyle = T.strokeStyle = J.color;
                        T.font = J.style + " " + J.size + "px " + J.family;
                        T.textBaseline = "middle";
                        var I = D(R.name, G, R);
                        if (I !== false) {
                            I = I !== true ? I : G;
                            if (A) {
                                T.textAlign = "right";
                                T.fillText(I, L + W - aa.labelOffset, K + O / 2)
                            } else {
                                T.textAlign = "center";
                                T.fillText(I, L + Q / 2, K - O - J.size / 2 - aa.labelOffset)
                            }
                        }
                        if (P(R.name, G, R)) {
                            if (A) {
                                T.textAlign = "center";
                                T.translate(L - aa.labelOffset - J.size / 2, K + O / 2);
                                T.rotate(Math.PI / 2);
                                T.fillText(R.name, 0, 0)
                            } else {
                                T.textAlign = "center";
                                T.fillText(R.name, L + Q / 2, K + J.size / 2 + aa.labelOffset)
                            }
                        }
                        T.restore()
                    }
                }
            },
            contains: function(D, F) {
                var I = D.pos.getc(true), A = D.getData("width"), N = D.getData("height"), M = this.getAlignedPos(I, A, N), L = M.x, J = M.y, O = D.getData("dimArray"), B = D.getData("config"), z = F.x - L, w = B.orientation == "horizontal";
                if (w) {
                    if (F.x < L || F.x > L + A || F.y > J + N || F.y < J) {
                        return false
                    }
                } else {
                    if (F.x < L || F.x > L + A || F.y > J || F.y < J - N) {
                        return false
                    }
                }
                for (var G = 0, E = O.length, K = (w ? L : J); G < E; G++) {
                    var C = O[G];
                    if (w) {
                        K += C;
                        var H = K;
                        if (F.x <= H) {
                            return {
                                name: D.getData("stringArray")[G],
                                color: D.getData("colorArray")[G],
                                value: D.getData("valueArray")[G],
                                label: D.name
                            }
                        }
                    } else {
                        K -= C;
                        var H = K;
                        if (F.y >= H) {
                            return {
                                name: D.getData("stringArray")[G],
                                color: D.getData("colorArray")[G],
                                value: D.getData("valueArray")[G],
                                label: D.name
                            }
                        }
                    }
                }
                return false
            }
        },
        "barchart-grouped": {
            render: function(S, C) {
                var I = S.pos.getc(true), R = S.getData("width"), P = S.getData("height"), N = this.getAlignedPos(I, R, P), M = N.x, L = N.y, O = S.getData("dimArray"), G = S.getData("valueArray"), Y = G.length, F = S.getData("colorArray"), B = F.length, aa = S.getData("stringArray");
                var U = C.getCtx(), w = {}, V = S.getData("border"), z = S.getData("gradient"), ac = S.getData("config"), A = ac.orientation == "horizontal", E = ac.showAggregates, Q = ac.showLabels, K = ac.Label, D = (A ? P : R) / Y;
                if (F && O && aa) {
                    for (var Z = 0, T = Y, X = 0, H = 0; Z < T; Z++) {
                        U.fillStyle = U.strokeStyle = F[Z%B];
                        if (z) {
                            var ab;
                            if (A) {
                                ab = U.createLinearGradient(M + O[Z] / 2, L + D * Z, M + O[Z] / 2, L + D * (Z + 1))
                            } else {
                                ab = U.createLinearGradient(M + D * Z, L - O[Z] / 2, M + D * (Z + 1), L - O[Z] / 2)
                            }
                            var W = c.rgbToHex(c.map(c.hexToRgb(F[Z%B].slice(1)), function(x) {
                                return (x * 0.5)>>0
                            }));
                            ab.addColorStop(0, W);
                            ab.addColorStop(0.5, F[Z%B]);
                            ab.addColorStop(1, W);
                            U.fillStyle = ab
                        }
                        if (A) {
                            U.fillRect(M, L + D * Z, O[Z], D)
                        } else {
                            U.fillRect(M + D * Z, L - O[Z], D, O[Z])
                        }
                        if (V && V.name == aa[Z]) {
                            w.acum = D * Z;
                            w.dimValue = O[Z]
                        }
                        X += (O[Z] || 0);
                        H += (G[Z] || 0)
                    }
                    if (V) {
                        U.save();
                        U.lineWidth = 2;
                        U.strokeStyle = V.color;
                        if (A) {
                            U.strokeRect(M + 1, L + w.acum + 1, w.dimValue-2, D-2)
                        } else {
                            U.strokeRect(M + w.acum + 1, L - w.dimValue + 1, D-2, w.dimValue-2)
                        }
                        U.restore()
                    }
                    if (K.type == "Native") {
                        U.save();
                        U.fillStyle = U.strokeStyle = K.color;
                        U.font = K.style + " " + K.size + "px " + K.family;
                        U.textBaseline = "middle";
                        var J = E(S.name, H, S);
                        if (J !== false) {
                            J = J !== true ? J : H;
                            if (A) {
                                U.textAlign = "right";
                                U.fillText(J, M + Math.max.apply(null, O) - ac.labelOffset, L + P / 2)
                            } else {
                                U.textAlign = "center";
                                U.fillText(J, M + R / 2, L - Math.max.apply(null, O) - K.size / 2 - ac.labelOffset)
                            }
                        }
                        if (Q(S.name, H, S)) {
                            if (A) {
                                U.textAlign = "center";
                                U.translate(M - ac.labelOffset - K.size / 2, L + P / 2);
                                U.rotate(Math.PI / 2);
                                U.fillText(S.name, 0, 0)
                            } else {
                                U.textAlign = "center";
                                U.fillText(S.name, M + R / 2, L + K.size / 2 + ac.labelOffset)
                            }
                        }
                        U.restore()
                    }
                }
            },
            contains: function(J, F) {
                var B = J.pos.getc(true), I = J.getData("width"), H = J.getData("height"), E = this.getAlignedPos(B, I, H), D = E.x, C = E.y, G = J.getData("dimArray"), M = G.length, P = J.getData("config"), A = F.x - D, w = P.orientation == "horizontal", z = (w ? H : I) / M;
                if (w) {
                    if (F.x < D || F.x > D + I || F.y > C + H || F.y < C) {
                        return false
                    }
                } else {
                    if (F.x < D || F.x > D + I || F.y > C || F.y < C - H) {
                        return false
                    }
                }
                for (var L = 0, K = G.length; L < K; L++) {
                    var O = G[L];
                    if (w) {
                        var N = C + z * L;
                        if (F.x <= D + O && F.y >= N && F.y <= N + z) {
                            return {
                                name: J.getData("stringArray")[L],
                                color: J.getData("colorArray")[L],
                                value: J.getData("valueArray")[L],
                                label: J.name
                            }
                        }
                    } else {
                        var N = D + z * L;
                        if (F.x >= N && F.x <= N + z && F.y >= C - O) {
                            return {
                                name: J.getData("stringArray")[L],
                                color: J.getData("colorArray")[L],
                                value: J.getData("valueArray")[L],
                                label: J.name
                            }
                        }
                    }
                }
                return false
            }
        }
    });
    $jit.BarChart = new q({
        st: null,
        colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
        selected: {},
        busy: false,
        initialize: function(y) {
            this.controller = this.config = c.merge(n("Canvas", "Margin", "Label", "BarChart"), {
                Label: {
                    type: "Native"
                }
            }, y);
            var z = this.config.showLabels, x = c.type(z), A = this.config.showAggregates, w = c.type(A);
            this.config.showLabels = x == "function" ? z : c.lambda(z);
            this.config.showAggregates = w == "function" ? A : c.lambda(A);
            this.initializeViz()
        },
        initializeViz: function() {
            var x = this.config, B = this;
            var w = x.type.split(":")[0], D = x.orientation == "horizontal", A = {};
            var z = new $jit.ST({
                injectInto: x.injectInto,
                width: x.width,
                height: x.height,
                orientation: D ? "left": "bottom",
                levelDistance: 0,
                siblingOffset: x.barsOffset,
                subtreeOffset: 0,
                withLabels: x.Label.type != "Native",
                useCanvas: x.useCanvas,
                Label: {
                    type: x.Label.type
                },
                Node: {
                    overridable: true,
                    type: "barchart-" + w,
                    align: "left",
                    width: 1,
                    height: 1
                },
                Edge: {
                    type: "none"
                },
                Tips: {
                    enable: x.Tips.enable,
                    type: "Native",
                    force: true,
                    onShow: function(H, G, E) {
                        var F = E;
                        x.Tips.onShow(H, F, G)
                    }
                },
                Events: {
                    enable: true,
                    type: "Native",
                    onClick: function(G, H, E) {
                        if (!x.Events.enable) {
                            return 
                        }
                        var F = H.getContains();
                        x.Events.onClick(F, H, E)
                    },
                    onMouseMove: function(G, H, E) {
                        if (!x.hoveredColor) {
                            return 
                        }
                        if (G) {
                            var F = H.getContains();
                            B.select(G.id, F.name, F.index)
                        } else {
                            B.select(false, false, false)
                        }
                    }
                },
                onCreateLabel: function(J, H) {
                    var P = x.Label, N = H.getData("valueArray"), M = c.reduce(N, function(Q, R) {
                        return Q + R
                    }, 0);
                    var L = {
                        wrapper: document.createElement("div"),
                        aggregate: document.createElement("div"),
                        label: document.createElement("div")
                    };
                    var E = L.wrapper, O = L.label, F = L.aggregate, G = E.style, K = O.style, I = F.style;
                    A[H.id] = L;
                    E.appendChild(O);
                    E.appendChild(F);
                    if (!x.showLabels(H.name, M, H)) {
                        K.display = "none"
                    }
                    if (!x.showAggregates(H.name, M, H)) {
                        I.display = "none"
                    }
                    G.position = "relative";
                    G.overflow = "visible";
                    G.fontSize = P.size + "px";
                    G.fontFamily = P.family;
                    G.color = P.color;
                    G.textAlign = "center";
                    I.position = K.position = "absolute";
                    J.style.width = H.getData("width") + "px";
                    J.style.height = H.getData("height") + "px";
                    I.left = K.left = "0px";
                    O.innerHTML = H.name;
                    J.appendChild(E)
                },
                onPlaceLabel: function(U, P) {
                    if (!A[P.id]) {
                        return 
                    }
                    var T = A[P.id], G = T.wrapper.style, E = T.label.style, O = T.aggregate.style, V = x.type.split(":")[0] == "grouped", F = x.orientation == "horizontal", K = P.getData("dimArray"), I = P.getData("valueArray"), M = (V && F) ? Math.max.apply(null, K): P.getData("width"), L = (V&&!F) ? Math.max.apply(null, K): P.getData("height"), J = parseInt(G.fontSize, 10), N = U.style;
                    if (K && I) {
                        G.width = O.width = E.width = U.style.width = M + "px";
                        for (var S = 0, Q = I.length, R = 0; S < Q; S++) {
                            if (K[S] > 0) {
                                R += I[S]
                            }
                        }
                        if (x.showLabels(P.name, R, P)) {
                            E.display = ""
                        } else {
                            E.display = "none"
                        }
                        var H = x.showAggregates(P.name, R, P);
                        if (H !== false) {
                            O.display = ""
                        } else {
                            O.display = "none"
                        }
                        if (x.orientation == "horizontal") {
                            O.textAlign = "right";
                            E.textAlign = "left";
                            E.textIndex = O.textIndent = x.labelOffset + "px";
                            O.top = E.top = (L - J) / 2 + "px";
                            U.style.height = G.height = L + "px"
                        } else {
                            O.top = ( - J - x.labelOffset) + "px";
                            E.top = (x.labelOffset + L) + "px";
                            U.style.top = parseInt(U.style.top, 10) - L + "px";
                            U.style.height = G.height = L + "px"
                        }
                        T.aggregate.innerHTML = H !== true ? H : R
                    }
                }
            });
            var y = z.canvas.getSize(), C = x.Margin;
            if (D) {
                z.config.offsetX = y.width / 2 - C.left - (x.showLabels && (x.labelOffset + x.Label.size));
                z.config.offsetY = (C.bottom - C.top) / 2
            } else {
                z.config.offsetY =- y.height / 2 + C.bottom + (x.showLabels && (x.labelOffset + x.Label.size));
                z.config.offsetX = (C.right - C.left) / 2
            }
            this.delegate = z;
            this.canvas = this.delegate.canvas
        },
        loadJSON: function(K) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            var H = c.time(), C = [], J = this.delegate, N = c.splat(K.label), G = c.splat(K.color || this.colors), L = this.config, w=!!L.type.split(":")[1], z = L.animate, y = L.orientation == "horizontal", A = this;
            for (var I = 0, x = K.values, E = x.length; I < E; I++) {
                var M = x[I];
                var B = c.splat(x[I].values);
                var F = 0;
                C.push({
                    id: H + M.label,
                    name: M.label,
                    data: {
                        value: B,
                        "$valueArray": B,
                        "$colorArray": G,
                        "$stringArray": N,
                        "$gradient": w,
                        "$config": L
                    },
                    children: []
                })
            }
            var D = {
                id: H + "$root",
                name: "",
                data: {
                    "$type": "none",
                    "$width": 1,
                    "$height": 1
                },
                children: C
            };
            J.loadJSON(D);
            this.normalizeDims();
            J.compute();
            J.select(J.root);
            if (z) {
                if (y) {
                    J.fx.animate({
                        modes: ["node-property:width:dimArray"],
                        duration: 1500,
                        onComplete: function() {
                            A.busy = false
                        }
                    })
                } else {
                    J.fx.animate({
                        modes: ["node-property:height:dimArray"],
                        duration: 1500,
                        onComplete: function() {
                            A.busy = false
                        }
                    })
                }
            } else {
                this.busy = false
            }
        },
        updateJSON: function(y, C) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            this.select(false, false, false);
            var z = this.delegate;
            var B = z.graph;
            var x = y.values;
            var w = this.config.animate;
            var A = this;
            var D = this.config.orientation == "horizontal";
            c.each(x, function(E) {
                var F = B.getByName(E.label);
                if (F) {
                    F.setData("valueArray", c.splat(E.values));
                    if (y.label) {
                        F.setData("stringArray", c.splat(y.label))
                    }
                }
            });
            this.normalizeDims();
            z.compute();
            z.select(z.root);
            if (w) {
                if (D) {
                    z.fx.animate({
                        modes: ["node-property:width:dimArray"],
                        duration: 1500,
                        onComplete: function() {
                            A.busy = false;
                            C && C.onComplete()
                        }
                    })
                } else {
                    z.fx.animate({
                        modes: ["node-property:height:dimArray"],
                        duration: 1500,
                        onComplete: function() {
                            A.busy = false;
                            C && C.onComplete()
                        }
                    })
                }
            }
        },
        select: function(y, w) {
            if (!this.config.hoveredColor) {
                return 
            }
            var x = this.selected;
            if (x.id != y || x.name != w) {
                x.id = y;
                x.name = w;
                x.color = this.config.hoveredColor;
                this.delegate.graph.eachNode(function(z) {
                    if (y == z.id) {
                        z.setData("border", x)
                    } else {
                        z.setData("border", false)
                    }
                });
                this.delegate.plot()
            }
        },
        getLegend: function() {
            var y = {};
            var z;
            this.delegate.graph.getNode(this.delegate.root).eachAdjacency(function(A) {
                z = A.nodeTo
            });
            var x = z.getData("colorArray"), w = x.length;
            c.each(z.getData("stringArray"), function(B, A) {
                y[B] = x[A%w]
            });
            return y
        },
        getMaxValue: function() {
            var x = 0, w = this.config.type.split(":")[0] == "stacked";
            this.delegate.graph.eachNode(function(A) {
                var y = A.getData("valueArray"), z = 0;
                if (!y) {
                    return 
                }
                if (w) {
                    c.each(y, function(B) {
                        z+=+B
                    })
                } else {
                    z = Math.max.apply(null, y)
                }
                x = x > z ? x : z
            });
            return x
        },
        setBarType: function(w) {
            this.config.type = w;
            this.delegate.config.Node.type = "barchart-" + w.split(":")[0]
        },
        normalizeDims: function() {
            var G = this.delegate.graph.getNode(this.delegate.root), B = 0;
            G.eachAdjacency(function() {
                B++
            });
            var D = this.getMaxValue() || 1, J = this.delegate.canvas.getSize(), z = this.config, C = z.Margin, H = C.left + C.right, A = C.top + C.bottom, x = z.orientation == "horizontal", w = (J[x ? "height": "width"] - (x ? A : H) - (B-1) * z.barsOffset) / B, y = z.animate, I = J[x ? "width": "height"] - (x ? H : A) - (!x && z.showAggregates && (z.Label.size + z.labelOffset)) - (z.showLabels && (z.Label.size + z.labelOffset)), F = x ? "height": "width", E = x ? "width": "height";
            this.delegate.graph.eachNode(function(N) {
                var M = 0, K = [];
                c.each(N.getData("valueArray"), function(O) {
                    M+=+O;
                    K.push(0)
                });
                N.setData(F, w);
                if (y) {
                    N.setData(E, M * I / D, "end");
                    N.setData("dimArray", c.map(N.getData("valueArray"), function(O) {
                        return O * I / D
                    }), "end");
                    var L = N.getData("dimArray");
                    if (!L) {
                        N.setData("dimArray", K)
                    }
                } else {
                    N.setData(E, M * I / D);
                    N.setData("dimArray", c.map(N.getData("valueArray"), function(O) {
                        return O * I / D
                    }))
                }
            })
        }
    });
    n.PieChart = {
        $extend: true,
        animate: true,
        offset: 25,
        sliceOffset: 0,
        labelOffset: 3,
        type: "stacked",
        hoveredColor: "#9fd4ff",
        Events: {
            enable: false,
            onClick: c.empty
        },
        Tips: {
            enable: false,
            onShow: c.empty,
            onHide: c.empty
        },
        showLabels: true,
        resizeLabels: false,
        updateHeights: false
    };
    g.Radial = new q({
        compute: function(x) {
            var y = c.splat(x || ["current", "start", "end"]);
            f.compute(this.graph, y, this.config);
            this.graph.computeLevels(this.root, 0, "ignore");
            var w = this.createLevelDistanceFunc();
            this.computeAngularWidths(y);
            this.computePositions(y, w)
        },
        computePositions: function(D, A) {
            var F = D;
            var E = this.graph;
            var B = E.getNode(this.root);
            var C = this.parent;
            var w = this.config;
            for (var y = 0, x = F.length; y < x; y++) {
                var z = F[y];
                B.setPos(k(0, 0), z);
                B.setData("span", Math.PI * 2, z)
            }
            B.angleSpan = {
                begin: 0,
                end: 2 * Math.PI
            };
            E.eachBFS(this.root, function(K) {
                var Q = K.angleSpan.end - K.angleSpan.begin;
                var S = K.angleSpan.begin;
                var R = A(K);
                var T = 0, G = [], J = {};
                K.eachSubnode(function(W) {
                    T += W._treeAngularWidth;
                    for (var X = 0, V = F.length; X < V; X++) {
                        var Z = F[X], Y = W.getData("dim", Z);
                        J[Z] = (Z in J) ? (Y > J[Z] ? Y : J[Z]) : Y
                    }
                    G.push(W)
                }, "ignore");
                if (C && C.id == K.id && G.length > 0 && G[0].dist) {
                    G.sort(function(W, V) {
                        return (W.dist >= V.dist) - (W.dist <= V.dist)
                    })
                }
                for (var M = 0, O = G.length; M < O; M++) {
                    var I = G[M];
                    if (!I._flag) {
                        var U = I._treeAngularWidth / T * Q;
                        var H = S + U / 2;
                        for (var N = 0, L = F.length; N < L; N++) {
                            var P = F[N];
                            I.setPos(k(H, R), P);
                            I.setData("span", U, P);
                            I.setData("dim-quotient", I.getData("dim", P) / J[P], P)
                        }
                        I.angleSpan = {
                            begin: S,
                            end: S + U
                        };
                        S += U
                    }
                }
            }, "ignore")
        },
        setAngularWidthForNodes: function(w) {
            this.graph.eachBFS(this.root, function(z, x) {
                var y = z.getData("angularWidth", w[0]) || 5;
                z._angularWidth = y / x
            }, "ignore")
        },
        setSubtreesAngularWidth: function() {
            var w = this;
            this.graph.eachNode(function(x) {
                w.setSubtreeAngularWidth(x)
            }, "ignore")
        },
        setSubtreeAngularWidth: function(z) {
            var y = this, x = z._angularWidth, w = 0;
            z.eachSubnode(function(A) {
                y.setSubtreeAngularWidth(A);
                w += A._treeAngularWidth
            }, "ignore");
            z._treeAngularWidth = Math.max(x, w)
        },
        computeAngularWidths: function(w) {
            this.setAngularWidthForNodes(w);
            this.setSubtreesAngularWidth()
        }
    });
    $jit.Sunburst = new q({
        Implements: [d, o, g.Radial],
        initialize: function(w) {
            var y = $jit.Sunburst;
            var x = {
                interpolation: "linear",
                levelDistance: 100,
                Node: {
                    type: "multipie",
                    height: 0
                },
                Edge: {
                    type: "none"
                },
                Label: {
                    textAlign: "start",
                    textBaseline: "middle"
                }
            };
            this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label"), x, w);
            var z = this.config;
            if (z.useCanvas) {
                this.canvas = z.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                if (z.background) {
                    z.background = c.merge({
                        type: "Circles"
                    }, z.background)
                }
                this.canvas = new l(this, z);
                this.config.labelContainer = (typeof z.injectInto == "string" ? z.injectInto : z.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: b,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
            this.labels = new y.Label[z.Label.type](this);
            this.fx = new y.Plot(this, y);
            this.op = new y.Op(this);
            this.json = null;
            this.root = null;
            this.rotated = null;
            this.busy = false;
            this.initializeExtras()
        },
        createLevelDistanceFunc: function() {
            var w = this.config.levelDistance;
            return function(x) {
                return (x._depth + 1) * w
            }
        },
        refresh: function() {
            this.compute();
            this.plot()
        },
        reposition: function() {
            this.compute("end")
        },
        rotate: function(y, z, x) {
            var w = y.getPos(x.property || "current").getp(true).theta;
            this.rotated = y;
            this.rotateAngle( - w, z, x)
        },
        rotateAngle: function(y, B, x) {
            var z = this;
            var w = c.merge(this.config, x || {}, {
                modes: ["polar"]
            });
            var A = x.property || (B === "animate" ? "end" : "current");
            if (B === "animate") {
                this.fx.animation.pause()
            }
            this.graph.eachNode(function(D) {
                var C = D.getPos(A);
                C.theta += y;
                if (C.theta < 0) {
                    C.theta += Math.PI * 2
                }
            });
            if (B == "animate") {
                this.fx.animate(w)
            } else {
                if (B == "replot") {
                    this.fx.plot();
                    this.busy = false
                }
            }
        },
        plot: function() {
            this.fx.plot()
        }
    });
    $jit.Sunburst.$extend = true;
    (function(w) {
        w.Op = new q({
            Implements: e.Op
        });
        w.Plot = new q({
            Implements: e.Plot
        });
        w.Label = {};
        w.Label.Native = new q({
            Implements: e.Label.Native,
            initialize: function(x) {
                this.viz = x;
                this.label = x.config.Label;
                this.config = x.config
            },
            renderLabel: function(C, E, G) {
                var N = E.getData("span");
                if (N < Math.PI / 2 && Math.tan(N) * this.config.levelDistance * E._depth < 10) {
                    return 
                }
                var O = C.getCtx();
                var A = O.measureText(E.name);
                if (E.id == this.viz.root) {
                    var M =- A.width / 2, K = 0, L = 0;
                    var z = 0
                } else {
                    var D = 5;
                    var z = G.levelDistance - D;
                    var J = E.pos.clone();
                    J.rho += D;
                    var B = J.getp(true);
                    var H = J.getc(true);
                    var M = H.x, K = H.y;
                    var F = Math.PI;
                    var I = (B.theta > F / 2 && B.theta < 3 * F / 2);
                    var L = I ? B.theta + F: B.theta;
                    if (I) {
                        M -= Math.abs(Math.cos(B.theta) * A.width);
                        K += Math.sin(B.theta) * A.width
                    } else {
                        if (E.id == this.viz.root) {
                            M -= A.width / 2
                        }
                    }
                }
                O.save();
                O.translate(M, K);
                O.rotate(L);
                O.fillText(E.name, 0, 0);
                O.restore()
            }
        });
        w.Label.SVG = new q({
            Implements: e.Label.SVG,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(N, C, E) {
                var J = C.pos.getc(true), M = this.viz, A = this.viz.canvas;
                var F = A.getSize();
                var B = {
                    x: Math.round(J.x + F.width / 2),
                    y: Math.round(J.y + F.height / 2)
                };
                N.setAttribute("x", B.x);
                N.setAttribute("y", B.y);
                var G = N.getBBox();
                if (G) {
                    var L = N.getAttribute("x");
                    var I = N.getAttribute("y");
                    var z = C.pos.getp(true);
                    var D = Math.PI;
                    var H = (z.theta > D / 2 && z.theta < 3 * D / 2);
                    if (H) {
                        N.setAttribute("x", L - G.width);
                        N.setAttribute("y", I - G.height)
                    } else {
                        if (C.id == M.root) {
                            N.setAttribute("x", L - G.width / 2)
                        }
                    }
                    var K = H ? z.theta + D: z.theta;
                    if (C._depth) {
                        N.setAttribute("transform", "rotate(" + K * 360 / (2 * D) + " " + L + " " + I + ")")
                    }
                }
                E.onPlaceLabel(N, C)
            }
        });
        w.Label.HTML = new q({
            Implements: e.Label.HTML,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(G, A, C) {
                var E = A.pos.clone(), y = this.viz.canvas, F = A.getData("height"), B = ((F || A._depth == 0) ? F : this.viz.config.levelDistance) / 2, D = y.getSize();
                E.rho += B;
                E = E.getc(true);
                var z = {
                    x: Math.round(E.x + D.width / 2),
                    y: Math.round(E.y + D.height / 2)
                };
                var x = G.style;
                x.left = z.x + "px";
                x.top = z.y + "px";
                x.display = this.fitsInCanvas(z, y) ? "" : "none";
                C.onPlaceLabel(G, A)
            }
        });
        w.Plot.NodeTypes = new q({
            none: {
                render: c.empty,
                contains: c.lambda(false),
                anglecontains: function(B, D) {
                    var A = B.getData("span") / 2, y = B.pos.theta;
                    var z = y - A, x = y + A;
                    if (z < 0) {
                        z += Math.PI * 2
                    }
                    var C = Math.atan2(D.y, D.x);
                    if (C < 0) {
                        C += Math.PI * 2
                    }
                    if (z > x) {
                        return (C > z && C <= Math.PI * 2) || C < x
                    } else {
                        return C > z && C < x
                    }
                }
            },
            pie: {
                render: function(C, A) {
                    var G = C.getData("span") / 2, z = C.pos.theta;
                    var B = z - G, D = z + G;
                    var F = C.pos.getp(true);
                    var x = new b(F.rho, B);
                    var y = x.getc(true);
                    x.theta = D;
                    var E = x.getc(true);
                    var H = A.getCtx();
                    H.beginPath();
                    H.moveTo(0, 0);
                    H.lineTo(y.x, y.y);
                    H.moveTo(0, 0);
                    H.lineTo(E.x, E.y);
                    H.moveTo(0, 0);
                    H.arc(0, 0, F.rho * C.getData("dim-quotient"), B, D, false);
                    H.fill()
                },
                contains: function(z, B) {
                    if (this.nodeTypes.none.anglecontains.call(this, z, B)) {
                        var x = Math.sqrt(B.x * B.x + B.y * B.y);
                        var y = this.config.levelDistance, A = z._depth;
                        return (x <= y * A)
                    }
                    return false
                }
            },
            multipie: {
                render: function(D, B) {
                    var K = D.getData("height");
                    var E = K ? K: this.config.levelDistance;
                    var J = D.getData("span") / 2, A = D.pos.theta;
                    var C = A - J, G = A + J;
                    var I = D.pos.getp(true);
                    var y = new b(I.rho, C);
                    var z = y.getc(true);
                    y.theta = G;
                    var H = y.getc(true);
                    y.rho += E;
                    var x = y.getc(true);
                    y.theta = C;
                    var F = y.getc(true);
                    var L = B.getCtx();
                    L.moveTo(0, 0);
                    L.beginPath();
                    L.arc(0, 0, I.rho, C, G, false);
                    L.arc(0, 0, I.rho + E, G, C, true);
                    L.moveTo(z.x, z.y);
                    L.lineTo(F.x, F.y);
                    L.moveTo(H.x, H.y);
                    L.lineTo(x.x, x.y);
                    L.fill();
                    if (D.collapsed) {
                        L.save();
                        L.lineWidth = 2;
                        L.moveTo(0, 0);
                        L.beginPath();
                        L.arc(0, 0, I.rho + E + 5, G-0.01, C + 0.01, true);
                        L.stroke();
                        L.restore()
                    }
                },
                contains: function(A, D) {
                    if (this.nodeTypes.none.anglecontains.call(this, A, D)) {
                        var y = Math.sqrt(D.x * D.x + D.y * D.y);
                        var x = A.getData("height");
                        var B = x ? x: this.config.levelDistance;
                        var z = this.config.levelDistance, C = A._depth;
                        return (y >= z * C) && (y <= (z * C + B))
                    }
                    return false
                }
            },
            "gradient-multipie": {
                render: function(A, x) {
                    var F = x.getCtx();
                    var E = A.getData("height");
                    var B = E ? E: this.config.levelDistance;
                    var y = F.createRadialGradient(0, 0, A.getPos().rho, 0, 0, A.getPos().rho + B);
                    var D = c.hexToRgb(A.getData("color")), C = [];
                    c.each(D, function(G) {
                        C.push(parseInt(G * 0.5, 10))
                    });
                    var z = c.rgbToHex(C);
                    y.addColorStop(0, z);
                    y.addColorStop(1, A.getData("color"));
                    F.fillStyle = y;
                    this.nodeTypes.multipie.render.call(this, A, x)
                },
                contains: function(x, y) {
                    return this.nodeTypes.multipie.contains.call(this, x, y)
                }
            },
            "gradient-pie": {
                render: function(C, z) {
                    var x = z.getCtx();
                    var D = x.createRadialGradient(0, 0, 0, 0, 0, C.getPos().rho);
                    var B = c.hexToRgb(C.getData("color")), y = [];
                    c.each(B, function(E) {
                        y.push(parseInt(E * 0.5, 10))
                    });
                    var A = c.rgbToHex(y);
                    D.addColorStop(1, A);
                    D.addColorStop(0, C.getData("color"));
                    x.fillStyle = D;
                    this.nodeTypes.pie.render.call(this, C, z)
                },
                contains: function(x, y) {
                    return this.nodeTypes.pie.contains.call(this, x, y)
                }
            }
        });
        w.Plot.EdgeTypes = new q({
            none: c.empty,
            line: {
                render: function(x, y) {
                    var A = x.nodeFrom.pos.getc(true), z = x.nodeTo.pos.getc(true);
                    this.edgeHelper.line.render(A, z, y)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true), y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.line.contains(z, y, A, this.edge.epsilon)
                }
            },
            arrow: {
                render: function(y, z) {
                    var D = y.nodeFrom.pos.getc(true), C = y.nodeTo.pos.getc(true), B = y.getData("dim"), A = y.data.$direction, x = (A && A.length > 1 && A[0] != y.nodeFrom.id);
                    this.edgeHelper.arrow.render(D, C, B, x, z)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true), y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.arrow.contains(z, y, A, this.edge.epsilon)
                }
            },
            hyperline: {
                render: function(x, y) {
                    var B = x.nodeFrom.pos.getc(), A = x.nodeTo.pos.getc(), z = Math.max(B.norm(), A.norm());
                    this.edgeHelper.hyperline.render(B.$scale(1 / z), A.$scale(1 / z), z, y)
                },
                contains: c.lambda(false)
            }
        })
    })($jit.Sunburst);
    $jit.Sunburst.Plot.NodeTypes.implement({
        "piechart-stacked": {
            render: function(U, A) {
                var T = U.pos.getp(true), C = U.getData("dimArray"), S = U.getData("valueArray"), G = U.getData("colorArray"), z = G.length, M = U.getData("stringArray"), P = U.getData("span") / 2, K = U.pos.theta, F = K - P, J = K + P, R = new b;
                var N = A.getCtx(), L = {}, I = U.getData("gradient"), D = U.getData("border"), Z = U.getData("config"), ai = Z.showLabels, Y = Z.resizeLabels, ab = Z.Label;
                var ae = Z.sliceOffset * Math.cos((F + J) / 2);
                var E = Z.sliceOffset * Math.sin((F + J) / 2);
                if (G && C && M) {
                    for (var af = 0, ac = C.length, w = 0, X = 0; af < ac; af++) {
                        var B = C[af], ag = G[af%z];
                        if (B <= 0) {
                            continue
                        }
                        N.fillStyle = N.strokeStyle = ag;
                        if (I && B) {
                            var ad = N.createRadialGradient(ae, E, w + Z.sliceOffset, ae, E, w + B + Z.sliceOffset);
                            var x = c.hexToRgb(ag), W = c.map(x, function(al) {
                                return (al * 0.8)>>0
                            }), y = c.rgbToHex(W);
                            ad.addColorStop(0, ag);
                            ad.addColorStop(0.5, ag);
                            ad.addColorStop(1, y);
                            N.fillStyle = ad
                        }
                        R.rho = w + Z.sliceOffset;
                        R.theta = F;
                        var ah = R.getc(true);
                        R.theta = J;
                        var O = R.getc(true);
                        R.rho += B;
                        var aj = R.getc(true);
                        R.theta = F;
                        var Q = R.getc(true);
                        N.beginPath();
                        N.arc(ae, E, w + 0.01, F, J, false);
                        N.arc(ae, E, w + B + 0.01, J, F, true);
                        N.fill();
                        if (D && D.name == M[af]) {
                            L.acum = w;
                            L.dimValue = C[af];
                            L.begin = F;
                            L.end = J
                        }
                        w += (B || 0);
                        X += (S[af] || 0)
                    }
                    if (D) {
                        N.save();
                        N.globalCompositeOperation = "source-over";
                        N.lineWidth = 2;
                        N.strokeStyle = D.color;
                        var aa = F < J ? 1: -1;
                        N.beginPath();
                        N.arc(ae, E, L.acum + 0.01 + 1, L.begin, L.end, false);
                        N.arc(ae, E, L.acum + L.dimValue + 0.01-1, L.end, L.begin, true);
                        N.closePath();
                        N.stroke();
                        N.restore()
                    }
                    if (ai && ab.type == "Native") {
                        N.save();
                        N.fillStyle = N.strokeStyle = ab.color;
                        var V = Y ? U.getData("normalizedDim"): 1, H = (ab.size * V)>>0;
                        H = H<+Y?+Y : H;
                        N.font = ab.style + " " + H + "px " + ab.family;
                        N.textBaseline = "middle";
                        N.textAlign = "center";
                        R.rho = w + Z.labelOffset + Z.sliceOffset;
                        R.theta = U.pos.theta;
                        var ak = R.getc(true);
                        N.fillText(U.name, ak.x, ak.y);
                        N.restore()
                    }
                }
            },
            contains: function(z, D) {
                if (this.nodeTypes.none.anglecontains.call(this, z, D)) {
                    var F = Math.sqrt(D.x * D.x + D.y * D.y);
                    var w = this.config.levelDistance, C = z._depth;
                    var x = z.getData("config");
                    if (F <= w * C + x.sliceOffset) {
                        var G = z.getData("dimArray");
                        for (var B = 0, A = G.length, E = x.sliceOffset; B < A; B++) {
                            var y = G[B];
                            if (F >= E && F <= E + y) {
                                return {
                                    name: z.getData("stringArray")[B],
                                    color: z.getData("colorArray")[B],
                                    value: z.getData("valueArray")[B],
                                    label: z.name
                                }
                            }
                            E += y
                        }
                    }
                    return false
                }
                return false
            }
        }
    });
    $jit.PieChart = new q({
        sb: null,
        colors: ["#416D9C", "#70A35E", "#EBB056", "#C74243", "#83548B", "#909291", "#557EAA"],
        selected: {},
        busy: false,
        initialize: function(w) {
            this.controller = this.config = c.merge(n("Canvas", "PieChart", "Label"), {
                Label: {
                    type: "Native"
                }
            }, w);
            this.initializeViz()
        },
        initializeViz: function() {
            var x = this.config, B = this;
            var w = x.type.split(":")[0];
            var A = new $jit.Sunburst({
                injectInto: x.injectInto,
                width: x.width,
                height: x.height,
                useCanvas: x.useCanvas,
                withLabels: x.Label.type != "Native",
                Label: {
                    type: x.Label.type
                },
                Node: {
                    overridable: true,
                    type: "piechart-" + w,
                    width: 1,
                    height: 1
                },
                Edge: {
                    type: "none"
                },
                Tips: {
                    enable: x.Tips.enable,
                    type: "Native",
                    force: true,
                    onShow: function(F, E, C) {
                        var D = C;
                        x.Tips.onShow(F, D, E)
                    }
                },
                Events: {
                    enable: true,
                    type: "Native",
                    onClick: function(E, F, C) {
                        if (!x.Events.enable) {
                            return 
                        }
                        var D = F.getContains();
                        x.Events.onClick(D, F, C)
                    },
                    onMouseMove: function(E, F, C) {
                        if (!x.hoveredColor) {
                            return 
                        }
                        if (E) {
                            var D = F.getContains();
                            B.select(E.id, D.name, D.index)
                        } else {
                            B.select(false, false, false)
                        }
                    }
                },
                onCreateLabel: function(F, E) {
                    var C = x.Label;
                    if (x.showLabels) {
                        var D = F.style;
                        D.fontSize = C.size + "px";
                        D.fontFamily = C.family;
                        D.color = C.color;
                        D.textAlign = "center";
                        F.innerHTML = E.name
                    }
                },
                onPlaceLabel: function(S, M) {
                    if (!x.showLabels) {
                        return 
                    }
                    var G = M.pos.getp(true), J = M.getData("dimArray"), P = M.getData("span") / 2, H = M.pos.theta, R = H - P, D = H + P, U = new b;
                    var L = x.showLabels, F = x.resizeLabels, I = x.Label;
                    if (J) {
                        for (var Q = 0, N = J.length, O = 0; Q < N; Q++) {
                            O += J[Q]
                        }
                        var T = F ? M.getData("normalizedDim"): 1, C = (I.size * T)>>0;
                        C = C<+F?+F : C;
                        S.style.fontSize = C + "px";
                        U.rho = O + x.labelOffset + x.sliceOffset;
                        U.theta = (R + D) / 2;
                        var G = U.getc(true);
                        var E = B.canvas.getSize();
                        var K = {
                            x: Math.round(G.x + E.width / 2),
                            y: Math.round(G.y + E.height / 2)
                        };
                        S.style.left = K.x + "px";
                        S.style.top = K.y + "px"
                    }
                }
            });
            var z = A.canvas.getSize(), y = Math.min;
            A.config.levelDistance = y(z.width, z.height) / 2 - x.offset - x.sliceOffset;
            this.delegate = A;
            this.canvas = this.delegate.canvas;
            this.canvas.getCtx().globalCompositeOperation = "lighter"
        },
        loadJSON: function(K) {
            var H = c.time(), B = [], J = this.delegate, N = c.splat(K.label), D = N.length, G = c.splat(K.color || this.colors), y = G.length, L = this.config, w=!!L.type.split(":")[1], z = L.animate, F = D == 1;
            for (var I = 0, x = K.values, E = x.length; I < E; I++) {
                var M = x[I];
                var A = c.splat(M.values);
                B.push({
                    id: H + M.label,
                    name: M.label,
                    data: {
                        value: A,
                        "$valueArray": A,
                        "$colorArray": F ? c.splat(G[I%y]): G,
                        "$stringArray": N,
                        "$gradient": w,
                        "$config": L,
                        "$angularWidth": c.reduce(A, function(O, P) {
                            return O + P
                        })
                    },
                    children: []
                })
            }
            var C = {
                id: H + "$root",
                name: "",
                data: {
                    "$type": "none",
                    "$width": 1,
                    "$height": 1
                },
                children: B
            };
            J.loadJSON(C);
            this.normalizeDims();
            J.refresh();
            if (z) {
                J.fx.animate({
                    modes: ["node-property:dimArray"],
                    duration: 1500
                })
            }
        },
        updateJSON: function(y, C) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            var z = this.delegate;
            var B = z.graph;
            var x = y.values;
            var w = this.config.animate;
            var A = this;
            c.each(x, function(D) {
                var F = B.getByName(D.label), E = c.splat(D.values);
                if (F) {
                    F.setData("valueArray", E);
                    F.setData("angularWidth", c.reduce(E, function(G, H) {
                        return G + H
                    }));
                    if (y.label) {
                        F.setData("stringArray", c.splat(y.label))
                    }
                }
            });
            this.normalizeDims();
            if (w) {
                z.compute("end");
                z.fx.animate({
                    modes: ["node-property:dimArray:span", "linear"],
                    duration: 1500,
                    onComplete: function() {
                        A.busy = false;
                        C && C.onComplete()
                    }
                })
            } else {
                z.refresh()
            }
        },
        select: function(y, w) {
            if (!this.config.hoveredColor) {
                return 
            }
            var x = this.selected;
            if (x.id != y || x.name != w) {
                x.id = y;
                x.name = w;
                x.color = this.config.hoveredColor;
                this.delegate.graph.eachNode(function(z) {
                    if (y == z.id) {
                        z.setData("border", x)
                    } else {
                        z.setData("border", false)
                    }
                });
                this.delegate.plot()
            }
        },
        getLegend: function() {
            var y = {};
            var z;
            this.delegate.graph.getNode(this.delegate.root).eachAdjacency(function(A) {
                z = A.nodeTo
            });
            var x = z.getData("colorArray"), w = x.length;
            c.each(z.getData("stringArray"), function(B, A) {
                y[B] = x[A%w]
            });
            return y
        },
        getMaxValue: function() {
            var w = 0;
            this.delegate.graph.eachNode(function(z) {
                var x = z.getData("valueArray"), y = 0;
                c.each(x, function(A) {
                    y+=+A
                });
                w = w > y ? w : y
            });
            return w
        },
        normalizeDims: function() {
            var x = this.delegate.graph.getNode(this.delegate.root), w = 0;
            x.eachAdjacency(function() {
                w++
            });
            var B = this.getMaxValue() || 1, A = this.config, y = A.animate, z = this.delegate.config.levelDistance;
            this.delegate.graph.eachNode(function(G) {
                var F = 0, C = [];
                c.each(G.getData("valueArray"), function(H) {
                    F+=+H;
                    C.push(1)
                });
                var E = (C.length == 1)&&!A.updateHeights;
                if (y) {
                    G.setData("dimArray", c.map(G.getData("valueArray"), function(H) {
                        return E ? z : (H * z / B)
                    }), "end");
                    var D = G.getData("dimArray");
                    if (!D) {
                        G.setData("dimArray", C)
                    }
                } else {
                    G.setData("dimArray", c.map(G.getData("valueArray"), function(H) {
                        return E ? z : (H * z / B)
                    }))
                }
                G.setData("normalizedDim", F / B)
            })
        }
    });
    g.TM = {};
    g.TM.SliceAndDice = new q({
        compute: function(B) {
            var x = this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root);
            this.controller.onBeforeCompute(x);
            var z = this.canvas.getSize(), y = this.config, A = z.width, w = z.height;
            this.graph.computeLevels(this.root, 0, "ignore");
            x.getPos(B).setc( - A / 2, - w / 2);
            x.setData("width", A, B);
            x.setData("height", w + y.titleHeight, B);
            this.computePositions(x, x, this.layout.orientation, B);
            this.controller.onAfterCompute(x)
        },
        computePositions: function(F, D, P, y) {
            var M = 0;
            F.eachSubnode(function(R) {
                M += R.getData("area", y)
            });
            var Q = this.config, N = Q.offset, J = F.getData("width", y), H = Math.max(F.getData("height", y) - Q.titleHeight, 0), x = F == D ? 1: (D.getData("area", y) / M);
            var I, G, L, B, A, E, C;
            var O = (P == "h");
            if (O) {
                P = "v";
                I = H;
                G = J * x;
                L = "height";
                B = "y";
                A = "x";
                E = Q.titleHeight;
                C = 0
            } else {
                P = "h";
                I = H * x;
                G = J;
                L = "width";
                B = "x";
                A = "y";
                E = 0;
                C = Q.titleHeight
            }
            var w = D.getPos(y);
            D.setData("width", G, y);
            D.setData("height", I, y);
            var K = 0, z = this;
            D.eachSubnode(function(S) {
                var R = S.getPos(y);
                R[B] = K + w[B] + E;
                R[A] = w[A] + C;
                z.computePositions(D, S, P, y);
                K += S.getData(L, y)
            })
        }
    });
    g.TM.Area = {
        compute: function(w) {
            w = w || "current";
            var C = this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root);
            this.controller.onBeforeCompute(C);
            var y = this.config, F = this.canvas.getSize(), x = F.width, E = F.height, D = y.offset, z = x - D, B = E - D;
            this.graph.computeLevels(this.root, 0, "ignore");
            C.getPos(w).setc( - x / 2, - E / 2);
            C.setData("width", x, w);
            C.setData("height", E, w);
            var A = {
                top: - E / 2 + y.titleHeight,
                left: - x / 2,
                width: z,
                height: B - y.titleHeight
            };
            this.computePositions(C, A, w);
            this.controller.onAfterCompute(C)
        },
        computeDim: function(B, C, E, A, z, x) {
            if (B.length + C.length == 1) {
                var y = (B.length == 1) ? B: C;
                this.layoutLast(y, E, A, x);
                return 
            }
            if (B.length >= 2 && C.length == 0) {
                C = [B.shift()]
            }
            if (B.length == 0) {
                if (C.length > 0) {
                    this.layoutRow(C, E, A, x)
                }
                return 
            }
            var D = B[0];
            if (z(C, E) >= z([D].concat(C), E)) {
                this.computeDim(B.slice(1), C.concat([D]), E, A, z, x)
            } else {
                var F = this.layoutRow(C, E, A, x);
                this.computeDim(B, [], F.dim, F, z, x)
            }
        },
        worstAspectRatio: function(x, F) {
            if (!x || x.length == 0) {
                return Number.MAX_VALUE
            }
            var y = 0, G = 0, B = Number.MAX_VALUE;
            for (var D = 0, C = x.length; D < C; D++) {
                var z = x[D]._area;
                y += z;
                B = B < z ? B : z;
                G = G > z ? G : z
            }
            var E = F * F, A = y * y;
            return Math.max(E * G / A, A / (E * B))
        },
        avgAspectRatio: function(B, y) {
            if (!B || B.length == 0) {
                return Number.MAX_VALUE
            }
            var D = 0;
            for (var z = 0, x = B.length; z < x; z++) {
                var C = B[z]._area;
                var A = C / y;
                D += y > A ? y / A : A / y
            }
            return D / x
        },
        layoutLast: function(y, x, B, A) {
            var z = y[0];
            z.getPos(A).setc(B.left, B.top);
            z.setData("width", B.width, A);
            z.setData("height", B.height, A)
        }
    };
    g.TM.Squarified = new q({
        Implements: g.TM.Area,
        computePositions: function(A, D, x) {
            var z = this.config, F = Math.max;
            if (D.width >= D.height) {
                this.layout.orientation = "h"
            } else {
                this.layout.orientation = "v"
            }
            var w = A.getSubnodes([1, 1], "ignore");
            if (w.length > 0) {
                this.processChildrenLayout(A, w, D, x);
                for (var C = 0, B = w.length; C < B; C++) {
                    var G = w[C], H = z.offset, I = F(G.getData("height", x) - H - z.titleHeight, 0), y = F(G.getData("width", x) - H, 0), E = G.getPos(x);
                    D = {
                        width: y,
                        height: I,
                        top: E.y + z.titleHeight,
                        left: E.x
                    };
                    this.computePositions(G, D, x)
                }
            }
        },
        processChildrenLayout: function(G, w, C, x) {
            var A = C.width * C.height;
            var B, y = w.length, D = 0, H = [];
            for (B = 0; B < y; B++) {
                H[B] = parseFloat(w[B].getData("area", x));
                D += H[B]
            }
            for (B = 0; B < y; B++) {
                w[B]._area = A * H[B] / D
            }
            var z = this.layout.horizontal() ? C.height: C.width;
            w.sort(function(J, I) {
                var K = I._area - J._area;
                return K ? K : (I.id == J.id ? 0 : (I.id < J.id ? 1 : -1))
            });
            var F = [w[0]];
            var E = w.slice(1);
            this.squarify(E, F, z, C, x)
        },
        squarify: function(y, B, x, A, z) {
            this.computeDim(y, B, x, A, this.worstAspectRatio, z)
        },
        layoutRow: function(y, x, A, z) {
            if (this.layout.horizontal()) {
                return this.layoutV(y, x, A, z)
            } else {
                return this.layoutH(y, x, A, z)
            }
        },
        layoutV: function(x, I, E, y) {
            var J = 0, A = function(w) {
                return w
            };
            c.each(x, function(w) {
                J += w._area
            });
            var z = A(J / I), F = 0;
            for (var C = 0, B = x.length; C < B; C++) {
                var D = A(x[C]._area / z);
                var G = x[C];
                G.getPos(y).setc(E.left, E.top + F);
                G.setData("width", z, y);
                G.setData("height", D, y);
                F += D
            }
            var H = {
                height: E.height,
                width: E.width - z,
                top: E.top,
                left: E.left + z
            };
            H.dim = Math.min(H.width, H.height);
            if (H.dim != H.height) {
                this.layout.change()
            }
            return H
        },
        layoutH: function(x, G, C, y) {
            var I = 0;
            c.each(x, function(w) {
                I += w._area
            });
            var H = I / G, D = C.top, z = 0;
            for (var B = 0, A = x.length; B < A; B++) {
                var E = x[B];
                var G = E._area / H;
                E.getPos(y).setc(C.left + z, D);
                E.setData("width", G, y);
                E.setData("height", H, y);
                z += G
            }
            var F = {
                height: C.height - H,
                width: C.width,
                top: C.top + H,
                left: C.left
            };
            F.dim = Math.min(F.width, F.height);
            if (F.dim != F.width) {
                this.layout.change()
            }
            return F
        }
    });
    g.TM.Strip = new q({
        Implements: g.TM.Area,
        computePositions: function(A, D, x) {
            var w = A.getSubnodes([1, 1], "ignore"), z = this.config, F = Math.max;
            if (w.length > 0) {
                this.processChildrenLayout(A, w, D, x);
                for (var C = 0, B = w.length; C < B; C++) {
                    var G = w[C];
                    var H = z.offset, I = F(G.getData("height", x) - H - z.titleHeight, 0), y = F(G.getData("width", x) - H, 0);
                    var E = G.getPos(x);
                    D = {
                        width: y,
                        height: I,
                        top: E.y + z.titleHeight,
                        left: E.x
                    };
                    this.computePositions(G, D, x)
                }
            }
        },
        processChildrenLayout: function(G, w, B, x) {
            var z = B.width * B.height;
            var A, y = w.length, C = 0, H = [];
            for (A = 0; A < y; A++) {
                H[A] =+ w[A].getData("area", x);
                C += H[A]
            }
            for (A = 0; A < y; A++) {
                w[A]._area = z * H[A] / C
            }
            var F = this.layout.horizontal() ? B.width: B.height;
            var E = [w[0]];
            var D = w.slice(1);
            this.stripify(D, E, F, B, x)
        },
        stripify: function(y, B, x, A, z) {
            this.computeDim(y, B, x, A, this.avgAspectRatio, z)
        },
        layoutRow: function(y, x, A, z) {
            if (this.layout.horizontal()) {
                return this.layoutH(y, x, A, z)
            } else {
                return this.layoutV(y, x, A, z)
            }
        },
        layoutV: function(x, G, D, y) {
            var H = 0;
            c.each(x, function(w) {
                H += w._area
            });
            var z = H / G, E = 0;
            for (var B = 0, A = x.length; B < A; B++) {
                var F = x[B];
                var C = F._area / z;
                F.getPos(y).setc(D.left, D.top + (G - C - E));
                F.setData("width", z, y);
                F.setData("height", C, y);
                E += C
            }
            return {
                height: D.height,
                width: D.width - z,
                top: D.top,
                left: D.left + z,
                dim: G
            }
        },
        layoutH: function(x, F, C, y) {
            var H = 0;
            c.each(x, function(w) {
                H += w._area
            });
            var G = H / F, D = C.height - G, z = 0;
            for (var B = 0, A = x.length; B < A; B++) {
                var E = x[B];
                var I = E._area / G;
                E.getPos(y).setc(C.left + z, C.top + D);
                E.setData("width", I, y);
                E.setData("height", G, y);
                z += I
            }
            return {
                height: C.height - G,
                width: C.width,
                top: C.top,
                left: C.left,
                dim: F
            }
        }
    });
    g.Icicle = new q({
        compute: function(E) {
            E = E || "current";
            var D = this.graph.getNode(this.root), z = this.config, H = this.canvas.getSize(), w = H.width, G = H.height, A = z.offset, C = z.constrained ? z.levelsToShow: Number.MAX_VALUE;
            this.controller.onBeforeCompute(D);
            e.Util.computeLevels(this.graph, D.id, 0, "ignore");
            var F = 0;
            e.Util.eachLevel(D, 0, false, function(J, I) {
                if (I > F) {
                    F = I
                }
            });
            var y = this.graph.getNode(this.clickedNode && this.clickedNode.id || D.id);
            var x = Math.min(F, C-1);
            var B = y._depth;
            if (this.layout.horizontal()) {
                this.computeSubtree(y, - w / 2, - G / 2, w / (x + 1), G, B, x, E)
            } else {
                this.computeSubtree(y, - w / 2, - G / 2, w, G / (x + 1), B, x, E)
            }
        },
        computeSubtree: function(G, I, F, w, L, E, A, H) {
            G.getPos(H).setc(I, F);
            G.setData("width", w, H);
            G.setData("height", L, H);
            var C, K = 0, J = 0;
            var z = e.Util.getSubnodes(G, [1, 1], "ignore");
            if (!z.length) {
                return 
            }
            c.each(z, function(x) {
                J += x.getData("dim")
            });
            for (var D = 0, B = z.length; D < B; D++) {
                if (this.layout.horizontal()) {
                    C = L * z[D].getData("dim") / J;
                    this.computeSubtree(z[D], I + w, F, w, C, E, A, H);
                    F += C
                } else {
                    C = w * z[D].getData("dim") / J;
                    this.computeSubtree(z[D], I, F + L, C, L, E, A, H);
                    I += C
                }
            }
        }
    });
    $jit.Icicle = new q({
        Implements: [d, o, g.Icicle],
        layout: {
            orientation: "h",
            vertical: function() {
                return this.orientation == "v"
            },
            horizontal: function() {
                return this.orientation == "h"
            },
            change: function() {
                this.orientation = this.vertical() ? "h" : "v"
            }
        },
        initialize: function(w) {
            var x = {
                animate: false,
                orientation: "h",
                offset: 2,
                levelsToShow: Number.MAX_VALUE,
                constrained: false,
                Node: {
                    type: "rectangle",
                    overridable: true
                },
                Edge: {
                    type: "none"
                },
                Label: {
                    type: "Native"
                },
                duration: 700,
                fps: 45
            };
            var z = n("Canvas", "Node", "Edge", "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label");
            this.controller = this.config = c.merge(z, x, w);
            this.layout.orientation = this.config.orientation;
            var y = this.config;
            if (y.useCanvas) {
                this.canvas = y.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                this.canvas = new l(this, y);
                this.config.labelContainer = (typeof y.injectInto == "string" ? y.injectInto : y.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: p,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge, this.config.Label);
            this.labels = new $jit.Icicle.Label[this.config.Label.type](this);
            this.fx = new $jit.Icicle.Plot(this, $jit.Icicle);
            this.op = new $jit.Icicle.Op(this);
            this.group = new $jit.Icicle.Group(this);
            this.clickedNode = null;
            this.initializeExtras()
        },
        refresh: function() {
            var w = this.config.Label.type;
            if (w != "Native") {
                var x = this;
                this.graph.eachNode(function(y) {
                    x.labels.hideLabel(y, false)
                })
            }
            this.compute();
            this.plot()
        },
        plot: function() {
            this.fx.plot(this.config)
        },
        enter: function(y) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            var x = this, w = this.config;
            var z = {
                onComplete: function() {
                    if (w.request) {
                        x.compute()
                    }
                    if (w.animate) {
                        x.graph.nodeList.setDataset(["current", "end"], {
                            alpha: [1, 0]
                        });
                        e.Util.eachSubgraph(y, function(A) {
                            A.setData("alpha", 1, "end")
                        }, "ignore");
                        x.fx.animate({
                            duration: 500,
                            modes: ["node-property:alpha"],
                            onComplete: function() {
                                x.clickedNode = y;
                                x.compute("end");
                                x.fx.animate({
                                    modes: ["linear", "node-property:width:height"],
                                    duration: 1000,
                                    onComplete: function() {
                                        x.busy = false;
                                        x.clickedNode = y
                                    }
                                })
                            }
                        })
                    } else {
                        x.clickedNode = y;
                        x.busy = false;
                        x.refresh()
                    }
                }
            };
            if (w.request) {
                this.requestNodes(clickedNode, z)
            } else {
                z.onComplete()
            }
        },
        out: function() {
            if (this.busy) {
                return 
            }
            var B = this, A = e.Util, y = this.config, D = this.graph, x = A.getParents(D.getNode(this.clickedNode && this.clickedNode.id || this.root)), z = x[0], w = z, C = this.clickedNode;
            this.busy = true;
            this.events.hoveredNode = false;
            if (!z) {
                this.busy = false;
                return 
            }
            callback = {
                onComplete: function() {
                    B.clickedNode = z;
                    if (y.request) {
                        B.requestNodes(z, {
                            onComplete: function() {
                                B.compute();
                                B.plot();
                                B.busy = false
                            }
                        })
                    } else {
                        B.compute();
                        B.plot();
                        B.busy = false
                    }
                }
            };
            if (y.animate) {
                this.clickedNode = w;
                this.compute("end");
                this.clickedNode = C;
                this.fx.animate({
                    modes: ["linear", "node-property:width:height"],
                    duration: 1000,
                    onComplete: function() {
                        B.clickedNode = w;
                        D.nodeList.setDataset(["current", "end"], {
                            alpha: [0, 1]
                        });
                        A.eachSubgraph(C, function(E) {
                            E.setData("alpha", 1)
                        }, "ignore");
                        B.fx.animate({
                            duration: 500,
                            modes: ["node-property:alpha"],
                            onComplete: function() {
                                callback.onComplete()
                            }
                        })
                    }
                })
            } else {
                callback.onComplete()
            }
        },
        requestNodes: function(y, z) {
            var x = c.merge(this.controller, z), w = this.config.constrained ? this.config.levelsToShow: Number.MAX_VALUE;
            if (x.request) {
                var B = [], A = y._depth;
                e.Util.eachLevel(y, 0, w, function(C) {
                    if (C.drawn&&!e.Util.anySubnode(C)) {
                        B.push(C);
                        C._level = C._depth - A;
                        if (this.config.constrained) {
                            C._level = w - C._level
                        }
                    }
                });
                this.group.requestNodes(B, x)
            } else {
                x.onComplete()
            }
        }
    });
    $jit.Icicle.Op = new q({
        Implements: e.Op
    });
    $jit.Icicle.Group = new q({
        initialize: function(w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.config = w.config
        },
        requestNodes: function(B, A) {
            var z = 0, x = B.length, D = {};
            var y = function() {
                A.onComplete()
            };
            var w = this.viz;
            if (x == 0) {
                y()
            }
            for (var C = 0; C < x; C++) {
                D[B[C].id] = B[C];
                A.request(B[C].id, B[C]._level, {
                    onComplete: function(F, E) {
                        if (E && E.children) {
                            E.id = F;
                            w.op.sum(E, {
                                type: "nothing"
                            })
                        }
                        if (++z == x) {
                            e.Util.computeLevels(w.graph, w.root, 0);
                            y()
                        }
                    }
                })
            }
        }
    });
    $jit.Icicle.Plot = new q({
        Implements: e.Plot,
        plot: function(A, y) {
            A = A || this.viz.controller;
            var w = this.viz, B = w.graph, x = B.getNode(w.clickedNode && w.clickedNode.id || w.root), z = x._depth;
            w.canvas.clear();
            this.plotTree(x, c.merge(A, {
                withLabels: true,
                hideLabels: false,
                plotSubtree: function(C, D) {
                    return !w.config.constrained || (D._depth - z < w.config.levelsToShow)
                }
            }), y)
        }
    });
    $jit.Icicle.Label = {};
    $jit.Icicle.Label.Native = new q({
        Implements: e.Label.Native,
        renderLabel: function(x, y, A) {
            var D = x.getCtx(), w = y.getData("width"), C = y.getData("height"), E = y.getLabelData("size"), z = D.measureText(y.name);
            if (C < (E * 1.5) || w < z.width) {
                return 
            }
            var B = y.pos.getc(true);
            D.fillText(y.name, B.x + w / 2, B.y + C / 2)
        }
    });
    $jit.Icicle.Label.SVG = new q({
        Implements: e.Label.SVG,
        initialize: function(w) {
            this.viz = w
        },
        placeLabel: function(x, A, y) {
            var C = A.pos.getc(true), z = this.viz.canvas;
            var w = z.getSize();
            var B = {
                x: Math.round(C.x + w.width / 2),
                y: Math.round(C.y + w.height / 2)
            };
            x.setAttribute("x", B.x);
            x.setAttribute("y", B.y);
            y.onPlaceLabel(x, A)
        }
    });
    $jit.Icicle.Label.HTML = new q({
        Implements: e.Label.HTML,
        initialize: function(w) {
            this.viz = w
        },
        placeLabel: function(x, B, y) {
            var D = B.pos.getc(true), z = this.viz.canvas;
            var w = z.getSize();
            var C = {
                x: Math.round(D.x + w.width / 2),
                y: Math.round(D.y + w.height / 2)
            };
            var A = x.style;
            A.left = C.x + "px";
            A.top = C.y + "px";
            A.display = "";
            y.onPlaceLabel(x, B)
        }
    });
    $jit.Icicle.Plot.NodeTypes = new q({
        none: {
            render: c.empty
        },
        rectangle: {
            render: function(z, x, K) {
                var y = this.viz.config;
                var C = y.offset;
                var w = z.getData("width");
                var H = z.getData("height");
                var B = z.getData("border");
                var G = z.pos.getc(true);
                var F = G.x + C / 2, D = G.y + C / 2;
                var J = x.getCtx();
                if (w - C < 2 || H - C < 2) {
                    return 
                }
                if (y.cushion) {
                    var A = z.getData("color");
                    var I = J.createRadialGradient(F + (w - C) / 2, D + (H - C) / 2, 1, F + (w - C) / 2, D + (H - C) / 2, w < H ? H : w);
                    var E = c.rgbToHex(c.map(c.hexToRgb(A), function(L) {
                        return L * 0.3>>0
                    }));
                    I.addColorStop(0, A);
                    I.addColorStop(1, E);
                    J.fillStyle = I
                }
                if (B) {
                    J.strokeStyle = B;
                    J.lineWidth = 3
                }
                J.fillRect(F, D, Math.max(0, w - C), Math.max(0, H - C));
                B && J.strokeRect(G.x, G.y, w, H)
            },
            contains: function(y, A) {
                if (this.viz.clickedNode&&!$jit.Graph.Util.isDescendantOf(y, this.viz.clickedNode.id)) {
                    return false
                }
                var z = y.pos.getc(true), x = y.getData("width"), w = y.getData("height");
                return this.nodeHelper.rectangle.contains({
                    x: z.x + x / 2,
                    y: z.y + w / 2
                }, A, x, w)
            }
        }
    });
    $jit.Icicle.Plot.EdgeTypes = new q({
        none: c.empty
    });
    g.ForceDirected = new q({
        getOptions: function(D) {
            var B = this.canvas.getSize();
            var y = B.width, A = B.height;
            var C = 0;
            this.graph.eachNode(function(w) {
                C++
            });
            var E = y * A / C, z = Math.sqrt(E);
            var x = this.config.levelDistance;
            return {
                width: y,
                height: A,
                tstart: y * 0.1,
                nodef: function(w) {
                    return E / (w || 1)
                },
                edgef: function(w) {
                    return z * (w - x)
                }
            }
        },
        compute: function(x, y) {
            var z = c.splat(x || ["current", "start", "end"]);
            var w = this.getOptions();
            f.compute(this.graph, z, this.config);
            this.graph.computeLevels(this.root, 0, "ignore");
            this.graph.eachNode(function(A) {
                c.each(z, function(B) {
                    var C = A.getPos(B);
                    if (C.equals(p.KER)) {
                        C.x = w.width / 5 * (Math.random()-0.5);
                        C.y = w.height / 5 * (Math.random()-0.5)
                    }
                    A.disp = {};
                    c.each(z, function(D) {
                        A.disp[D] = r(0, 0)
                    })
                })
            });
            this.computePositions(z, w, y)
        },
        computePositions: function(A, y, B) {
            var C = this.config.iterations, x = 0, z = this;
            if (B) {
                (function w() {
                    for (var E = B.iter, D = 0; D < E; D++) {
                        y.t = y.tstart;
                        if (C) {
                            y.t*=(1 - x++ / (C-1))
                        }
                        z.computePositionStep(A, y);
                        if (C && x >= C) {
                            B.onComplete();
                            return 
                        }
                    }
                    B.onStep(Math.round(x / (C-1) * 100));
                    setTimeout(w, 1)
                })()
            } else {
                for (; x < C; x++) {
                    y.t = y.tstart * (1 - x / (C-1));
                    this.computePositionStep(A, y)
                }
            }
        },
        computePositionStep: function(D, w) {
            var E = this.graph;
            var y = Math.min, C = Math.max;
            var B = r(0, 0);
            E.eachNode(function(G) {
                c.each(D, function(H) {
                    G.disp[H].x = 0;
                    G.disp[H].y = 0
                });
                E.eachNode(function(H) {
                    if (H.id != G.id) {
                        c.each(D, function(L) {
                            var J = G.getPos(L), I = H.getPos(L);
                            B.x = J.x - I.x;
                            B.y = J.y - I.y;
                            var K = B.norm() || 1;
                            G.disp[L].$add(B.$scale(w.nodef(K) / K))
                        })
                    }
                })
            });
            var x=!!E.getNode(this.root).visited;
            E.eachNode(function(G) {
                G.eachAdjacency(function(H) {
                    var I = H.nodeTo;
                    if (!!I.visited === x) {
                        c.each(D, function(M) {
                            var K = G.getPos(M), J = I.getPos(M);
                            B.x = K.x - J.x;
                            B.y = K.y - J.y;
                            var L = B.norm() || 1;
                            G.disp[M].$add(B.$scale( - w.edgef(L) / L));
                            I.disp[M].$add(B.$scale(-1))
                        })
                    }
                });
                G.visited=!x
            });
            var F = w.t, z = w.width / 2, A = w.height / 2;
            E.eachNode(function(G) {
                c.each(D, function(J) {
                    var H = G.disp[J];
                    var I = H.norm() || 1;
                    var J = G.getPos(J);
                    J.$add(r(H.x * y(Math.abs(H.x), F) / I, H.y * y(Math.abs(H.y), F) / I));
                    J.x = y(z, C( - z, J.x));
                    J.y = y(A, C( - A, J.y))
                })
            })
        }
    });
    $jit.ForceDirected = new q({
        Implements: [d, o, g.ForceDirected],
        initialize: function(x) {
            var w = $jit.ForceDirected;
            var y = {
                iterations: 50,
                levelDistance: 50
            };
            this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label"), y, x);
            var z = this.config;
            if (z.useCanvas) {
                this.canvas = z.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                if (z.background) {
                    z.background = c.merge({
                        type: "Circles"
                    }, z.background)
                }
                this.canvas = new l(this, z);
                this.config.labelContainer = (typeof z.injectInto == "string" ? z.injectInto : z.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: p,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
            this.labels = new w.Label[z.Label.type](this);
            this.fx = new w.Plot(this, w);
            this.op = new w.Op(this);
            this.json = null;
            this.busy = false;
            this.initializeExtras()
        },
        refresh: function() {
            this.compute();
            this.plot()
        },
        reposition: function() {
            this.compute("end")
        },
        computeIncremental: function(w) {
            w = c.merge({
                iter: 20,
                property: "end",
                onStep: c.empty,
                onComplete: c.empty
            }, w || {});
            this.config.onBeforeCompute(this.graph.getNode(this.root));
            this.compute(w.property, w)
        },
        plot: function() {
            this.fx.plot()
        },
        animate: function(w) {
            this.fx.animate(c.merge({
                modes: ["linear"]
            }, w || {}))
        }
    });
    $jit.ForceDirected.$extend = true;
    (function(w) {
        w.Op = new q({
            Implements: e.Op
        });
        w.Plot = new q({
            Implements: e.Plot
        });
        w.Label = {};
        w.Label.Native = new q({
            Implements: e.Label.Native
        });
        w.Label.SVG = new q({
            Implements: e.Label.SVG,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(H, B, C) {
                var F = B.pos.getc(true), y = this.viz.canvas, z = y.translateOffsetX, x = y.translateOffsetY, G = y.scaleOffsetX, E = y.scaleOffsetY, D = y.getSize();
                var A = {
                    x: Math.round(F.x * G + z + D.width / 2),
                    y: Math.round(F.y * E + x + D.height / 2)
                };
                H.setAttribute("x", A.x);
                H.setAttribute("y", A.y);
                C.onPlaceLabel(H, B)
            }
        });
        w.Label.HTML = new q({
            Implements: e.Label.HTML,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(I, C, D) {
                var G = C.pos.getc(true), z = this.viz.canvas, A = z.translateOffsetX, y = z.translateOffsetY, H = z.scaleOffsetX, F = z.scaleOffsetY, E = z.getSize();
                var B = {
                    x: Math.round(G.x * H + A + E.width / 2),
                    y: Math.round(G.y * F + y + E.height / 2)
                };
                var x = I.style;
                x.left = B.x + "px";
                x.top = B.y + "px";
                x.display = this.fitsInCanvas(B, z) ? "" : "none";
                D.onPlaceLabel(I, C)
            }
        });
        w.Plot.NodeTypes = new q({
            none: {
                render: c.empty,
                contains: c.lambda(false)
            },
            circle: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.circle.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.circle.contains(z, A, y)
                }
            },
            ellipse: {
                render: function(A, y) {
                    var B = A.pos.getc(true), z = A.getData("width"), x = A.getData("height");
                    this.nodeHelper.ellipse.render("fill", B, z, x, y)
                },
                contains: function(z, B) {
                    var A = z.pos.getc(true), y = z.getData("width"), x = z.getData("height");
                    return this.nodeHelper.ellipse.contains(A, B, y, x)
                }
            },
            square: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.square.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.square.contains(z, A, y)
                }
            },
            rectangle: {
                render: function(A, y) {
                    var B = A.pos.getc(true), z = A.getData("width"), x = A.getData("height");
                    this.nodeHelper.rectangle.render("fill", B, z, x, y)
                },
                contains: function(z, B) {
                    var A = z.pos.getc(true), y = z.getData("width"), x = z.getData("height");
                    return this.nodeHelper.rectangle.contains(A, B, y, x)
                }
            },
            triangle: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.triangle.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.triangle.contains(z, A, y)
                }
            },
            star: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.star.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.star.contains(z, A, y)
                }
            }
        });
        w.Plot.EdgeTypes = new q({
            none: c.empty,
            line: {
                render: function(x, y) {
                    var A = x.nodeFrom.pos.getc(true), z = x.nodeTo.pos.getc(true);
                    this.edgeHelper.line.render(A, z, y)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true), y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.line.contains(z, y, A, this.edge.epsilon)
                }
            },
            arrow: {
                render: function(y, z) {
                    var D = y.nodeFrom.pos.getc(true), C = y.nodeTo.pos.getc(true), B = y.getData("dim"), A = y.data.$direction, x = (A && A.length > 1 && A[0] != y.nodeFrom.id);
                    this.edgeHelper.arrow.render(D, C, B, x, z)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true), y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.arrow.contains(z, y, A, this.edge.epsilon)
                }
            }
        })
    })($jit.ForceDirected);
    $jit.TM = {};
    var v = $jit.TM;
    $jit.TM.$extend = true;
    v.Base = {
        layout: {
            orientation: "h",
            vertical: function() {
                return this.orientation == "v"
            },
            horizontal: function() {
                return this.orientation == "h"
            },
            change: function() {
                this.orientation = this.vertical() ? "h" : "v"
            }
        },
        initialize: function(w) {
            var x = {
                orientation: "h",
                titleHeight: 13,
                offset: 2,
                levelsToShow: 0,
                constrained: false,
                animate: false,
                Node: {
                    type: "rectangle",
                    overridable: true,
                    width: 3,
                    height: 3,
                    color: "#444"
                },
                Label: {
                    textAlign: "center",
                    textBaseline: "top"
                },
                Edge: {
                    type: "none"
                },
                duration: 700,
                fps: 45
            };
            this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Controller", "Tips", "NodeStyles", "Events", "Navigation", "Label"), x, w);
            this.layout.orientation = this.config.orientation;
            var y = this.config;
            if (y.useCanvas) {
                this.canvas = y.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                if (y.background) {
                    y.background = c.merge({
                        type: "Circles"
                    }, y.background)
                }
                this.canvas = new l(this, y);
                this.config.labelContainer = (typeof y.injectInto == "string" ? y.injectInto : y.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: p,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
            this.labels = new v.Label[y.Label.type](this);
            this.fx = new v.Plot(this);
            this.op = new v.Op(this);
            this.group = new v.Group(this);
            this.geom = new v.Geom(this);
            this.clickedNode = null;
            this.busy = false;
            this.initializeExtras()
        },
        refresh: function() {
            if (this.busy) {
                return 
            }
            this.busy = true;
            var x = this;
            if (this.config.animate) {
                this.compute("end");
                this.config.levelsToShow > 0 && this.geom.setRightLevelToShow(this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root));
                this.fx.animate(c.merge(this.config, {
                    modes: ["linear", "node-property:width:height"],
                    onComplete: function() {
                        x.busy = false
                    }
                }))
            } else {
                var w = this.config.Label.type;
                if (w != "Native") {
                    var x = this;
                    this.graph.eachNode(function(y) {
                        x.labels.hideLabel(y, false)
                    })
                }
                this.busy = false;
                this.compute();
                this.config.levelsToShow > 0 && this.geom.setRightLevelToShow(this.graph.getNode(this.clickedNode && this.clickedNode.id || this.root));
                this.plot()
            }
        },
        plot: function() {
            this.fx.plot()
        },
        leaf: function(w) {
            return w.getSubnodes([1, 1], "ignore").length == 0
        },
        enter: function(C) {
            if (this.busy) {
                return 
            }
            this.busy = true;
            var y = this, x = this.config, A = this.graph, w = C, z = this.clickedNode;
            var B = {
                onComplete: function() {
                    if (x.levelsToShow > 0) {
                        y.geom.setRightLevelToShow(C)
                    }
                    if (x.levelsToShow > 0 || x.request) {
                        y.compute()
                    }
                    if (x.animate) {
                        A.nodeList.setData("alpha", 0, "end");
                        C.eachSubgraph(function(D) {
                            D.setData("alpha", 1, "end")
                        }, "ignore");
                        y.fx.animate({
                            duration: 500,
                            modes: ["node-property:alpha"],
                            onComplete: function() {
                                y.clickedNode = w;
                                y.compute("end");
                                y.clickedNode = z;
                                y.fx.animate({
                                    modes: ["linear", "node-property:width:height"],
                                    duration: 1000,
                                    onComplete: function() {
                                        y.busy = false;
                                        y.clickedNode = w
                                    }
                                })
                            }
                        })
                    } else {
                        y.busy = false;
                        y.clickedNode = C;
                        y.refresh()
                    }
                }
            };
            if (x.request) {
                this.requestNodes(w, B)
            } else {
                B.onComplete()
            }
        },
        out: function() {
            if (this.busy) {
                return 
            }
            this.busy = true;
            this.events.hoveredNode = false;
            var A = this, y = this.config, C = this.graph, x = C.getNode(this.clickedNode && this.clickedNode.id || this.root).getParents(), z = x[0], w = z, B = this.clickedNode;
            if (!z) {
                this.busy = false;
                return 
            }
            callback = {
                onComplete: function() {
                    A.clickedNode = z;
                    if (y.request) {
                        A.requestNodes(z, {
                            onComplete: function() {
                                A.compute();
                                A.plot();
                                A.busy = false
                            }
                        })
                    } else {
                        A.compute();
                        A.plot();
                        A.busy = false
                    }
                }
            };
            if (y.levelsToShow > 0) {
                this.geom.setRightLevelToShow(z)
            }
            if (y.animate) {
                this.clickedNode = w;
                this.compute("end");
                this.clickedNode = B;
                this.fx.animate({
                    modes: ["linear", "node-property:width:height"],
                    duration: 1000,
                    onComplete: function() {
                        A.clickedNode = w;
                        C.eachNode(function(D) {
                            D.setDataset(["current", "end"], {
                                alpha: [0, 1]
                            })
                        }, "ignore");
                        B.eachSubgraph(function(D) {
                            D.setData("alpha", 1)
                        }, "ignore");
                        A.fx.animate({
                            duration: 500,
                            modes: ["node-property:alpha"],
                            onComplete: function() {
                                callback.onComplete()
                            }
                        })
                    }
                })
            } else {
                callback.onComplete()
            }
        },
        requestNodes: function(y, z) {
            var x = c.merge(this.controller, z), w = this.config.levelsToShow;
            if (x.request) {
                var B = [], A = y._depth;
                y.eachLevel(0, w, function(D) {
                    var C = w - (D._depth - A);
                    if (D.drawn&&!D.anySubnode() && C > 0) {
                        B.push(D);
                        D._level = C
                    }
                });
                this.group.requestNodes(B, x)
            } else {
                x.onComplete()
            }
        },
        reposition: function() {
            this.compute("end")
        }
    };
    v.Op = new q({
        Implements: e.Op,
        initialize: function(w) {
            this.viz = w
        }
    });
    v.Geom = new q({
        Implements: e.Geom,
        getRightLevelToShow: function() {
            return this.viz.config.levelsToShow
        },
        setRightLevelToShow: function(x) {
            var y = this.getRightLevelToShow(), w = this.viz.labels;
            x.eachLevel(0, y + 1, function(A) {
                var z = A._depth - x._depth;
                if (z > y) {
                    A.drawn = false;
                    A.exist = false;
                    A.ignore = true;
                    w.hideLabel(A, false)
                } else {
                    A.drawn = true;
                    A.exist = true;
                    delete A.ignore
                }
            });
            x.drawn = true;
            delete x.ignore
        }
    });
    v.Group = new q({
        initialize: function(w) {
            this.viz = w;
            this.canvas = w.canvas;
            this.config = w.config
        },
        requestNodes: function(B, A) {
            var z = 0, x = B.length, D = {};
            var y = function() {
                A.onComplete()
            };
            var w = this.viz;
            if (x == 0) {
                y()
            }
            for (var C = 0; C < x; C++) {
                D[B[C].id] = B[C];
                A.request(B[C].id, B[C]._level, {
                    onComplete: function(F, E) {
                        if (E && E.children) {
                            E.id = F;
                            w.op.sum(E, {
                                type: "nothing"
                            })
                        }
                        if (++z == x) {
                            w.graph.computeLevels(w.root, 0);
                            y()
                        }
                    }
                })
            }
        }
    });
    v.Plot = new q({
        Implements: e.Plot,
        initialize: function(w) {
            this.viz = w;
            this.config = w.config;
            this.node = this.config.Node;
            this.edge = this.config.Edge;
            this.animation = new u;
            this.nodeTypes = new v.Plot.NodeTypes;
            this.edgeTypes = new v.Plot.EdgeTypes;
            this.labels = w.labels
        },
        plot: function(y, x) {
            var w = this.viz, z = w.graph;
            w.canvas.clear();
            this.plotTree(z.getNode(w.clickedNode && w.clickedNode.id || w.root), c.merge(w.config, y || {}, {
                withLabels: true,
                hideLabels: false,
                plotSubtree: function(B, A) {
                    return B.anySubnode("exist")
                }
            }), x)
        }
    });
    v.Label = {};
    v.Label.Native = new q({
        Implements: e.Label.Native,
        initialize: function(w) {
            this.config = w.config;
            this.leaf = w.leaf
        },
        renderLabel: function(z, A, B) {
            if (!this.leaf(A)&&!this.config.titleHeight) {
                return 
            }
            var D = A.pos.getc(true), G = z.getCtx(), w = A.getData("width"), F = A.getData("height"), E = D.x + w / 2, C = D.y;
            G.fillText(A.name, E, C, w)
        }
    });
    v.Label.SVG = new q({
        Implements: e.Label.SVG,
        initialize: function(w) {
            this.viz = w;
            this.leaf = w.leaf;
            this.config = w.config
        },
        placeLabel: function(G, A, B) {
            var E = A.pos.getc(true), x = this.viz.canvas, y = x.translateOffsetX, w = x.translateOffsetY, F = x.scaleOffsetX, D = x.scaleOffsetY, C = x.getSize();
            var z = {
                x: Math.round(E.x * F + y + C.width / 2),
                y: Math.round(E.y * D + w + C.height / 2)
            };
            G.setAttribute("x", z.x);
            G.setAttribute("y", z.y);
            if (!this.leaf(A)&&!this.config.titleHeight) {
                G.style.display = "none"
            }
            B.onPlaceLabel(G, A)
        }
    });
    v.Label.HTML = new q({
        Implements: e.Label.HTML,
        initialize: function(w) {
            this.viz = w;
            this.leaf = w.leaf;
            this.config = w.config
        },
        placeLabel: function(H, B, C) {
            var F = B.pos.getc(true), y = this.viz.canvas, z = y.translateOffsetX, x = y.translateOffsetY, G = y.scaleOffsetX, E = y.scaleOffsetY, D = y.getSize();
            var A = {
                x: Math.round(F.x * G + z + D.width / 2),
                y: Math.round(F.y * E + x + D.height / 2)
            };
            var w = H.style;
            w.left = A.x + "px";
            w.top = A.y + "px";
            w.width = B.getData("width") * G + "px";
            w.height = B.getData("height") * E + "px";
            w.zIndex = B._depth * 100;
            w.display = "";
            if (!this.leaf(B)&&!this.config.titleHeight) {
                H.style.display = "none"
            }
            C.onPlaceLabel(H, B)
        }
    });
    v.Plot.NodeTypes = new q({
        none: {
            render: c.empty
        },
        rectangle: {
            render: function(z, x, M) {
                var D = this.viz.leaf(z), y = this.config, I = y.offset, C = y.titleHeight, H = z.pos.getc(true), w = z.getData("width"), J = z.getData("height"), B = z.getData("border"), L = x.getCtx(), G = H.x + I / 2, E = H.y + I / 2;
                if (w <= I || J <= I) {
                    return 
                }
                if (D) {
                    if (y.cushion) {
                        var K = L.createRadialGradient(G + (w - I) / 2, E + (J - I) / 2, 1, G + (w - I) / 2, E + (J - I) / 2, w < J ? J : w);
                        var A = z.getData("color");
                        var F = c.rgbToHex(c.map(c.hexToRgb(A), function(N) {
                            return N * 0.2>>0
                        }));
                        K.addColorStop(0, A);
                        K.addColorStop(1, F);
                        L.fillStyle = K
                    }
                    L.fillRect(G, E, w - I, J - I);
                    if (B) {
                        L.save();
                        L.strokeStyle = B;
                        L.strokeRect(G, E, w - I, J - I);
                        L.restore()
                    }
                } else {
                    if (C > 0) {
                        L.fillRect(H.x + I / 2, H.y + I / 2, w - I, C - I);
                        if (B) {
                            L.save();
                            L.strokeStyle = B;
                            L.strokeRect(H.x + I / 2, H.y + I / 2, w - I, J - I);
                            L.restore()
                        }
                    }
                }
            },
            contains: function(z, B) {
                if (this.viz.clickedNode&&!z.isDescendantOf(this.viz.clickedNode.id) || z.ignore) {
                    return false
                }
                var A = z.pos.getc(true), y = z.getData("width"), x = this.viz.leaf(z), w = x ? z.getData("height"): this.config.titleHeight;
                return this.nodeHelper.rectangle.contains({
                    x: A.x + y / 2,
                    y: A.y + w / 2
                }, B, y, w)
            }
        }
    });
    v.Plot.EdgeTypes = new q({
        none: c.empty
    });
    v.SliceAndDice = new q({
        Implements: [d, o, v.Base, g.TM.SliceAndDice]
    });
    v.Squarified = new q({
        Implements: [d, o, v.Base, g.TM.Squarified]
    });
    v.Strip = new q({
        Implements: [d, o, v.Base, g.TM.Strip]
    });
    $jit.RGraph = new q({
        Implements: [d, o, g.Radial],
        initialize: function(w) {
            var x = $jit.RGraph;
            var y = {
                interpolation: "linear",
                levelDistance: 100
            };
            this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Controller", "Tips", "NodeStyles", "Events", "Navigation", "Label"), y, w);
            var z = this.config;
            if (z.useCanvas) {
                this.canvas = z.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                if (z.background) {
                    z.background = c.merge({
                        type: "Circles"
                    }, z.background)
                }
                this.canvas = new l(this, z);
                this.config.labelContainer = (typeof z.injectInto == "string" ? z.injectInto : z.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: b,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
            this.labels = new x.Label[z.Label.type](this);
            this.fx = new x.Plot(this, x);
            this.op = new x.Op(this);
            this.json = null;
            this.root = null;
            this.busy = false;
            this.parent = false;
            this.initializeExtras()
        },
        createLevelDistanceFunc: function() {
            var w = this.config.levelDistance;
            return function(x) {
                return (x._depth + 1) * w
            }
        },
        refresh: function() {
            this.compute();
            this.plot()
        },
        reposition: function() {
            this.compute("end")
        },
        plot: function() {
            this.fx.plot()
        },
        getNodeAndParentAngle: function(D) {
            var y = false;
            var C = this.graph.getNode(D);
            var A = C.getParents();
            var z = (A.length > 0) ? A[0]: false;
            if (z) {
                var w = z.pos.getc(), B = C.pos.getc();
                var x = w.add(B.scale(-1));
                y = Math.atan2(x.y, x.x);
                if (y < 0) {
                    y += 2 * Math.PI
                }
            }
            return {
                parent: z,
                theta: y
            }
        },
        tagChildren: function(A, C) {
            if (A.angleSpan) {
                var B = [];
                A.eachAdjacency(function(D) {
                    B.push(D.nodeTo)
                }, "ignore");
                var w = B.length;
                for (var z = 0; z < w && C != B[z].id; z++) {}
                for (var y = (z + 1)%w, x = 0; C != B[y].id; y = (y + 1)%w) {
                    B[y].dist = x++
                }
            }
        },
        onClick: function(B, x) {
            if (this.root != B&&!this.busy) {
                this.busy = true;
                this.root = B;
                var y = this;
                this.controller.onBeforeCompute(this.graph.getNode(B));
                var z = this.getNodeAndParentAngle(B);
                this.tagChildren(z.parent, B);
                this.parent = z.parent;
                this.compute("end");
                var w = z.theta - z.parent.endPos.theta;
                this.graph.eachNode(function(C) {
                    C.endPos.set(C.endPos.getp().add(k(w, 0)))
                });
                var A = this.config.interpolation;
                x = c.merge({
                    onComplete: c.empty
                }, x || {});
                this.fx.animate(c.merge({
                    hideLabels: true,
                    modes: [A]
                }, x, {
                    onComplete: function() {
                        y.busy = false;
                        x.onComplete()
                    }
                }))
            }
        }
    });
    $jit.RGraph.$extend = true;
    (function(w) {
        w.Op = new q({
            Implements: e.Op
        });
        w.Plot = new q({
            Implements: e.Plot
        });
        w.Label = {};
        w.Label.Native = new q({
            Implements: e.Label.Native
        });
        w.Label.SVG = new q({
            Implements: e.Label.SVG,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(H, B, C) {
                var F = B.pos.getc(true), y = this.viz.canvas, z = y.translateOffsetX, x = y.translateOffsetY, G = y.scaleOffsetX, E = y.scaleOffsetY, D = y.getSize();
                var A = {
                    x: Math.round(F.x * G + z + D.width / 2),
                    y: Math.round(F.y * E + x + D.height / 2)
                };
                H.setAttribute("x", A.x);
                H.setAttribute("y", A.y);
                C.onPlaceLabel(H, B)
            }
        });
        w.Label.HTML = new q({
            Implements: e.Label.HTML,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(I, C, D) {
                var G = C.pos.getc(true), z = this.viz.canvas, A = z.translateOffsetX, y = z.translateOffsetY, H = z.scaleOffsetX, F = z.scaleOffsetY, E = z.getSize();
                var B = {
                    x: Math.round(G.x * H + A + E.width / 2),
                    y: Math.round(G.y * F + y + E.height / 2)
                };
                var x = I.style;
                x.left = B.x + "px";
                x.top = B.y + "px";
                x.display = this.fitsInCanvas(B, z) ? "" : "none";
                D.onPlaceLabel(I, C)
            }
        });
        w.Plot.NodeTypes = new q({
            none: {
                render: c.empty,
                contains: c.lambda(false)
            },
            circle: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.circle.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.circle.contains(z, A, y)
                }
            },
            ellipse: {
                render: function(A, y) {
                    var B = A.pos.getc(true), z = A.getData("width"), x = A.getData("height");
                    this.nodeHelper.ellipse.render("fill", B, z, x, y)
                },
                contains: function(z, B) {
                    var A = z.pos.getc(true), y = z.getData("width"), x = z.getData("height");
                    return this.nodeHelper.ellipse.contains(A, B, y, x)
                }
            },
            square: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.square.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.square.contains(z, A, y)
                }
            },
            rectangle: {
                render: function(A, y) {
                    var B = A.pos.getc(true), z = A.getData("width"), x = A.getData("height");
                    this.nodeHelper.rectangle.render("fill", B, z, x, y)
                },
                contains: function(z, B) {
                    var A = z.pos.getc(true), y = z.getData("width"), x = z.getData("height");
                    return this.nodeHelper.rectangle.contains(A, B, y, x)
                }
            },
            triangle: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.triangle.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.triangle.contains(z, A, y)
                }
            },
            star: {
                render: function(y, x) {
                    var A = y.pos.getc(true), z = y.getData("dim");
                    this.nodeHelper.star.render("fill", A, z, x)
                },
                contains: function(x, A) {
                    var z = x.pos.getc(true), y = x.getData("dim");
                    return this.nodeHelper.star.contains(z, A, y)
                }
            }
        });
        w.Plot.EdgeTypes = new q({
            none: c.empty,
            line: {
                render: function(x, y) {
                    var A = x.nodeFrom.pos.getc(true), z = x.nodeTo.pos.getc(true);
                    this.edgeHelper.line.render(A, z, y)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true), y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.line.contains(z, y, A, this.edge.epsilon)
                }
            },
            arrow: {
                render: function(y, z) {
                    var D = y.nodeFrom.pos.getc(true), C = y.nodeTo.pos.getc(true), B = y.getData("dim"), A = y.data.$direction, x = (A && A.length > 1 && A[0] != y.nodeFrom.id);
                    this.edgeHelper.arrow.render(D, C, B, x, z)
                },
                contains: function(x, A) {
                    var z = x.nodeFrom.pos.getc(true), y = x.nodeTo.pos.getc(true);
                    return this.edgeHelper.arrow.contains(z, y, A, this.edge.epsilon)
                }
            }
        })
    })($jit.RGraph);
    p.prototype.moebiusTransformation = function(y) {
        var w = this.add(y);
        var x = y.$conjugate().$prod(this);
        x.x++;
        return w.$div(x)
    };
    e.Util.moebiusTransformation = function(y, A, z, x, w) {
        this.eachNode(y, function(C) {
            for (var B = 0; B < z.length; B++) {
                var E = A[B].scale(-1), D = x ? x: z[B];
                C.getPos(z[B]).set(C.getPos(D).getc().moebiusTransformation(E))
            }
        }, w)
    };
    $jit.Hypertree = new q({
        Implements: [d, o, g.Radial],
        initialize: function(w) {
            var z = $jit.Hypertree;
            var x = {
                radius: "auto",
                offset: 0,
                Edge: {
                    type: "hyperline"
                },
                duration: 1500,
                fps: 35
            };
            this.controller = this.config = c.merge(n("Canvas", "Node", "Edge", "Fx", "Tips", "NodeStyles", "Events", "Navigation", "Controller", "Label"), x, w);
            var y = this.config;
            if (y.useCanvas) {
                this.canvas = y.useCanvas;
                this.config.labelContainer = this.canvas.id + "-label"
            } else {
                if (y.background) {
                    y.background = c.merge({
                        type: "Circles"
                    }, y.background)
                }
                this.canvas = new l(this, y);
                this.config.labelContainer = (typeof y.injectInto == "string" ? y.injectInto : y.injectInto.id) + "-label"
            }
            this.graphOptions = {
                klass: b,
                Node: {
                    selected: false,
                    exist: true,
                    drawn: true
                }
            };
            this.graph = new e(this.graphOptions, this.config.Node, this.config.Edge);
            this.labels = new z.Label[y.Label.type](this);
            this.fx = new z.Plot(this, z);
            this.op = new z.Op(this);
            this.json = null;
            this.root = null;
            this.busy = false;
            this.initializeExtras()
        },
        createLevelDistanceFunc: function() {
            var A = this.getRadius();
            var C = 0, w = Math.max, x = this.config;
            this.graph.eachNode(function(D) {
                C = w(D._depth, C)
            }, "ignore");
            C++;
            var B = function(D) {
                return function(F) {
                    F.scale = A;
                    var H = F._depth + 1;
                    var G = 0, E = Math.pow;
                    while (H) {
                        G += E(D, H--)
                    }
                    return G - x.offset
                }
            };
            for (var z = 0.51; z <= 1; z += 0.01) {
                var y = (1 - Math.pow(z, C)) / (1 - z);
                if (y >= 2) {
                    return B(z-0.01)
                }
            }
            return B(0.75)
        },
        getRadius: function() {
            var w = this.config.radius;
            if (w !== "auto") {
                return w
            }
            var x = this.canvas.getSize();
            return Math.min(x.width, x.height) / 2
        },
        refresh: function(w) {
            if (w) {
                this.reposition();
                this.graph.eachNode(function(x) {
                    x.startPos.rho = x.pos.rho = x.endPos.rho;
                    x.startPos.theta = x.pos.theta = x.endPos.theta
                })
            } else {
                this.compute()
            }
            this.plot()
        },
        reposition: function() {
            this.compute("end");
            var w = this.graph.getNode(this.root).pos.getc().scale(-1);
            e.Util.moebiusTransformation(this.graph, [w], ["end"], "end", "ignore");
            this.graph.eachNode(function(x) {
                if (x.ignore) {
                    x.endPos.rho = x.pos.rho;
                    x.endPos.theta = x.pos.theta
                }
            })
        },
        plot: function() {
            this.fx.plot()
        },
        onClick: function(y, w) {
            var x = this.graph.getNode(y).pos.getc(true);
            this.move(x, w)
        },
        move: function(A, y) {
            var x = r(A.x, A.y);
            if (this.busy === false && x.norm() < 1) {
                this.busy = true;
                var w = this.graph.getClosestNodeToPos(x), z = this;
                this.graph.computeLevels(w.id, 0);
                this.controller.onBeforeCompute(w);
                y = c.merge({
                    onComplete: c.empty
                }, y || {});
                this.fx.animate(c.merge({
                    modes: ["moebius"],
                    hideLabels: true
                }, y, {
                    onComplete: function() {
                        z.busy = false;
                        y.onComplete()
                    }
                }), x)
            }
        }
    });
    $jit.Hypertree.$extend = true;
    (function(w) {
        w.Op = new q({
            Implements: e.Op
        });
        w.Plot = new q({
            Implements: e.Plot
        });
        w.Label = {};
        w.Label.Native = new q({
            Implements: e.Label.Native,
            initialize: function(x) {
                this.viz = x
            },
            renderLabel: function(z, B, y) {
                var x = z.getCtx();
                var C = B.pos.getc(true);
                var A = this.viz.getRadius();
                x.fillText(B.name, C.x * A, C.y * A)
            }
        });
        w.Label.SVG = new q({
            Implements: e.Label.SVG,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(I, C, D) {
                var G = C.pos.getc(true), z = this.viz.canvas, A = z.translateOffsetX, y = z.translateOffsetY, H = z.scaleOffsetX, F = z.scaleOffsetY, E = z.getSize(), x = this.viz.getRadius();
                var B = {
                    x: Math.round((G.x * H) * x + A + E.width / 2),
                    y: Math.round((G.y * F) * x + y + E.height / 2)
                };
                I.setAttribute("x", B.x);
                I.setAttribute("y", B.y);
                D.onPlaceLabel(I, C)
            }
        });
        w.Label.HTML = new q({
            Implements: e.Label.HTML,
            initialize: function(x) {
                this.viz = x
            },
            placeLabel: function(J, D, E) {
                var H = D.pos.getc(true), A = this.viz.canvas, B = A.translateOffsetX, z = A.translateOffsetY, I = A.scaleOffsetX, G = A.scaleOffsetY, F = A.getSize(), x = this.viz.getRadius();
                var C = {
                    x: Math.round((H.x * I) * x + B + F.width / 2),
                    y: Math.round((H.y * G) * x + z + F.height / 2)
                };
                var y = J.style;
                y.left = C.x + "px";
                y.top = C.y + "px";
                y.display = this.fitsInCanvas(C, A) ? "" : "none";
                E.onPlaceLabel(J, D)
            }
        });
        w.Plot.NodeTypes = new q({
            none: {
                render: c.empty,
                contains: c.lambda(false)
            },
            circle: {
                render: function(z, x) {
                    var y = this.node, B = z.getData("dim"), A = z.pos.getc();
                    B = y.transform ? B * (1 - A.squaredNorm()) : B;
                    A.$scale(z.scale);
                    if (B > 0.2) {
                        this.nodeHelper.circle.render("fill", A, B, x)
                    }
                },
                contains: function(x, A) {
                    var y = x.getData("dim"), z = x.pos.getc().$scale(x.scale);
                    return this.nodeHelper.circle.contains(z, A, y)
                }
            },
            ellipse: {
                render: function(A, y) {
                    var B = A.pos.getc().$scale(A.scale), z = A.getData("width"), x = A.getData("height");
                    this.nodeHelper.ellipse.render("fill", B, z, x, y)
                },
                contains: function(z, B) {
                    var y = z.getData("width"), x = z.getData("height"), A = z.pos.getc().$scale(z.scale);
                    return this.nodeHelper.circle.contains(A, B, y, x)
                }
            },
            square: {
                render: function(z, x) {
                    var y = this.node, B = z.getData("dim"), A = z.pos.getc();
                    B = y.transform ? B * (1 - A.squaredNorm()) : B;
                    A.$scale(z.scale);
                    if (B > 0.2) {
                        this.nodeHelper.square.render("fill", A, B, x)
                    }
                },
                contains: function(x, A) {
                    var y = x.getData("dim"), z = x.pos.getc().$scale(x.scale);
                    return this.nodeHelper.square.contains(z, A, y)
                }
            },
            rectangle: {
                render: function(B, y) {
                    var A = this.node, z = B.getData("width"), x = B.getData("height"), C = B.pos.getc();
                    z = A.transform ? z * (1 - C.squaredNorm()) : z;
                    x = A.transform ? x * (1 - C.squaredNorm()) : x;
                    C.$scale(B.scale);
                    if (z > 0.2 && x > 0.2) {
                        this.nodeHelper.rectangle.render("fill", C, z, x, y)
                    }
                },
                contains: function(z, B) {
                    var y = z.getData("width"), x = z.getData("height"), A = z.pos.getc().$scale(z.scale);
                    return this.nodeHelper.rectangle.contains(A, B, y, x)
                }
            },
            triangle: {
                render: function(z, x) {
                    var y = this.node, B = z.getData("dim"), A = z.pos.getc();
                    B = y.transform ? B * (1 - A.squaredNorm()) : B;
                    A.$scale(z.scale);
                    if (B > 0.2) {
                        this.nodeHelper.triangle.render("fill", A, B, x)
                    }
                },
                contains: function(x, A) {
                    var y = x.getData("dim"), z = x.pos.getc().$scale(x.scale);
                    return this.nodeHelper.triangle.contains(z, A, y)
                }
            },
            star: {
                render: function(z, x) {
                    var y = this.node, B = z.getData("dim"), A = z.pos.getc();
                    B = y.transform ? B * (1 - A.squaredNorm()) : B;
                    A.$scale(z.scale);
                    if (B > 0.2) {
                        this.nodeHelper.star.render("fill", A, B, x)
                    }
                },
                contains: function(x, A) {
                    var y = x.getData("dim"), z = x.pos.getc().$scale(x.scale);
                    return this.nodeHelper.star.contains(z, A, y)
                }
            }
        });
        w.Plot.EdgeTypes = new q({
            none: c.empty,
            line: {
                render: function(x, y) {
                    var B = x.nodeFrom.pos.getc(true), A = x.nodeTo.pos.getc(true), z = x.nodeFrom.scale;
                    this.edgeHelper.line.render({
                        x: B.x * z,
                        y: B.y * z
                    }, {
                        x: A.x * z,
                        y: A.y * z
                    }, y)
                },
                contains: function(x, B) {
                    var A = x.nodeFrom.pos.getc(true), z = x.nodeTo.pos.getc(true), y = x.nodeFrom.scale;
                    this.edgeHelper.line.contains({
                        x: A.x * y,
                        y: A.y * y
                    }, {
                        x: z.x * y,
                        y: z.y * y
                    }, B, this.edge.epsilon)
                }
            },
            arrow: {
                render: function(y, z) {
                    var E = y.nodeFrom.pos.getc(true), D = y.nodeTo.pos.getc(true), A = y.nodeFrom.scale, C = y.getData("dim"), B = y.data.$direction, x = (B && B.length > 1 && B[0] != y.nodeFrom.id);
                    this.edgeHelper.arrow.render({
                        x: E.x * A,
                        y: E.y * A
                    }, {
                        x: D.x * A,
                        y: D.y * A
                    }, C, x, z)
                },
                contains: function(x, B) {
                    var A = x.nodeFrom.pos.getc(true), z = x.nodeTo.pos.getc(true), y = x.nodeFrom.scale;
                    this.edgeHelper.arrow.contains({
                        x: A.x * y,
                        y: A.y * y
                    }, {
                        x: z.x * y,
                        y: z.y * y
                    }, B, this.edge.epsilon)
                }
            },
            hyperline: {
                render: function(x, y) {
                    var B = x.nodeFrom.pos.getc(), A = x.nodeTo.pos.getc(), z = this.viz.getRadius();
                    this.edgeHelper.hyperline.render(B, A, z, y)
                },
                contains: c.lambda(false)
            }
        })
    })($jit.Hypertree)
})();

;/*
Copyright 2012 Igor Vaynberg

Version: 3.4.5 Timestamp: Mon Nov  4 08:22:42 PST 2013

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
General Public License version 2 (the "GPL License"). You may choose either license to govern your
use of this software only upon the condition that you accept all of the terms of either the Apache
License or the GPL License.

You may obtain a copy of the Apache License and the GPL License at:

http://www.apache.org/licenses/LICENSE-2.0
http://www.gnu.org/licenses/gpl-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the Apache License
or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
either express or implied. See the Apache License and the GPL License for the specific language governing
permissions and limitations under the Apache License and the GPL License.
*/
!function(a){"undefined"==typeof a.fn.each2&&a.extend(a.fn,{each2:function(b){for(var c=a([0]),d=-1,e=this.length;++d<e&&(c.context=c[0]=this[d])&&b.call(c[0],d,c)!==!1;);return this}})}(jQuery),function(a,b){"use strict";function n(a){var b,c,d,e;if(!a||a.length<1)return a;for(b="",c=0,d=a.length;d>c;c++)e=a.charAt(c),b+=m[e]||e;return b}function o(a,b){for(var c=0,d=b.length;d>c;c+=1)if(q(a,b[c]))return c;return-1}function p(){var b=a(l);b.appendTo("body");var c={width:b.width()-b[0].clientWidth,height:b.height()-b[0].clientHeight};return b.remove(),c}function q(a,c){return a===c?!0:a===b||c===b?!1:null===a||null===c?!1:a.constructor===String?a+""==c+"":c.constructor===String?c+""==a+"":!1}function r(b,c){var d,e,f;if(null===b||b.length<1)return[];for(d=b.split(c),e=0,f=d.length;f>e;e+=1)d[e]=a.trim(d[e]);return d}function s(a){return a.outerWidth(!1)-a.width()}function t(c){var d="keyup-change-value";c.on("keydown",function(){a.data(c,d)===b&&a.data(c,d,c.val())}),c.on("keyup",function(){var e=a.data(c,d);e!==b&&c.val()!==e&&(a.removeData(c,d),c.trigger("keyup-change"))})}function u(c){c.on("mousemove",function(c){var d=i;(d===b||d.x!==c.pageX||d.y!==c.pageY)&&a(c.target).trigger("mousemove-filtered",c)})}function v(a,c,d){d=d||b;var e;return function(){var b=arguments;window.clearTimeout(e),e=window.setTimeout(function(){c.apply(d,b)},a)}}function w(a){var c,b=!1;return function(){return b===!1&&(c=a(),b=!0),c}}function x(a,b){var c=v(a,function(a){b.trigger("scroll-debounced",a)});b.on("scroll",function(a){o(a.target,b.get())>=0&&c(a)})}function y(a){a[0]!==document.activeElement&&window.setTimeout(function(){var d,b=a[0],c=a.val().length;a.focus(),a.is(":visible")&&b===document.activeElement&&(b.setSelectionRange?b.setSelectionRange(c,c):b.createTextRange&&(d=b.createTextRange(),d.collapse(!1),d.select()))},0)}function z(b){b=a(b)[0];var c=0,d=0;if("selectionStart"in b)c=b.selectionStart,d=b.selectionEnd-c;else if("selection"in document){b.focus();var e=document.selection.createRange();d=document.selection.createRange().text.length,e.moveStart("character",-b.value.length),c=e.text.length-d}return{offset:c,length:d}}function A(a){a.preventDefault(),a.stopPropagation()}function B(a){a.preventDefault(),a.stopImmediatePropagation()}function C(b){if(!h){var c=b[0].currentStyle||window.getComputedStyle(b[0],null);h=a(document.createElement("div")).css({position:"absolute",left:"-10000px",top:"-10000px",display:"none",fontSize:c.fontSize,fontFamily:c.fontFamily,fontStyle:c.fontStyle,fontWeight:c.fontWeight,letterSpacing:c.letterSpacing,textTransform:c.textTransform,whiteSpace:"nowrap"}),h.attr("class","select2-sizer"),a("body").append(h)}return h.text(b.val()),h.width()}function D(b,c,d){var e,g,f=[];e=b.attr("class"),e&&(e=""+e,a(e.split(" ")).each2(function(){0===this.indexOf("select2-")&&f.push(this)})),e=c.attr("class"),e&&(e=""+e,a(e.split(" ")).each2(function(){0!==this.indexOf("select2-")&&(g=d(this),g&&f.push(g))})),b.attr("class",f.join(" "))}function E(a,b,c,d){var e=n(a.toUpperCase()).indexOf(n(b.toUpperCase())),f=b.length;return 0>e?(c.push(d(a)),void 0):(c.push(d(a.substring(0,e))),c.push("<span class='select2-match'>"),c.push(d(a.substring(e,e+f))),c.push("</span>"),c.push(d(a.substring(e+f,a.length))),void 0)}function F(a){var b={"\\":"&#92;","&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;","/":"&#47;"};return String(a).replace(/[&<>"'\/\\]/g,function(a){return b[a]})}function G(c){var d,e=null,f=c.quietMillis||100,g=c.url,h=this;return function(i){window.clearTimeout(d),d=window.setTimeout(function(){var d=c.data,f=g,j=c.transport||a.fn.select2.ajaxDefaults.transport,k={type:c.type||"GET",cache:c.cache||!1,jsonpCallback:c.jsonpCallback||b,dataType:c.dataType||"json"},l=a.extend({},a.fn.select2.ajaxDefaults.params,k);d=d?d.call(h,i.term,i.page,i.context):null,f="function"==typeof f?f.call(h,i.term,i.page,i.context):f,e&&e.abort(),c.params&&(a.isFunction(c.params)?a.extend(l,c.params.call(h)):a.extend(l,c.params)),a.extend(l,{url:f,dataType:c.dataType,data:d,success:function(a){var b=c.results(a,i.page);i.callback(b)}}),e=j.call(h,l)},f)}}function H(b){var d,e,c=b,f=function(a){return""+a.text};a.isArray(c)&&(e=c,c={results:e}),a.isFunction(c)===!1&&(e=c,c=function(){return e});var g=c();return g.text&&(f=g.text,a.isFunction(f)||(d=g.text,f=function(a){return a[d]})),function(b){var g,d=b.term,e={results:[]};return""===d?(b.callback(c()),void 0):(g=function(c,e){var h,i;if(c=c[0],c.children){h={};for(i in c)c.hasOwnProperty(i)&&(h[i]=c[i]);h.children=[],a(c.children).each2(function(a,b){g(b,h.children)}),(h.children.length||b.matcher(d,f(h),c))&&e.push(h)}else b.matcher(d,f(c),c)&&e.push(c)},a(c().results).each2(function(a,b){g(b,e.results)}),b.callback(e),void 0)}}function I(c){var d=a.isFunction(c);return function(e){var f=e.term,g={results:[]};a(d?c():c).each(function(){var a=this.text!==b,c=a?this.text:this;(""===f||e.matcher(f,c))&&g.results.push(a?this:{id:this,text:this})}),e.callback(g)}}function J(b,c){if(a.isFunction(b))return!0;if(!b)return!1;throw new Error(c+" must be a function or a falsy value")}function K(b){return a.isFunction(b)?b():b}function L(b){var c=0;return a.each(b,function(a,b){b.children?c+=L(b.children):c++}),c}function M(a,c,d,e){var h,i,j,k,l,f=a,g=!1;if(!e.createSearchChoice||!e.tokenSeparators||e.tokenSeparators.length<1)return b;for(;;){for(i=-1,j=0,k=e.tokenSeparators.length;k>j&&(l=e.tokenSeparators[j],i=a.indexOf(l),!(i>=0));j++);if(0>i)break;if(h=a.substring(0,i),a=a.substring(i+l.length),h.length>0&&(h=e.createSearchChoice.call(this,h,c),h!==b&&null!==h&&e.id(h)!==b&&null!==e.id(h))){for(g=!1,j=0,k=c.length;k>j;j++)if(q(e.id(h),e.id(c[j]))){g=!0;break}g||d(h)}}return f!==a?a:void 0}function N(b,c){var d=function(){};return d.prototype=new b,d.prototype.constructor=d,d.prototype.parent=b.prototype,d.prototype=a.extend(d.prototype,c),d}if(window.Select2===b){var c,d,e,f,g,h,j,k,i={x:0,y:0},c={TAB:9,ENTER:13,ESC:27,SPACE:32,LEFT:37,UP:38,RIGHT:39,DOWN:40,SHIFT:16,CTRL:17,ALT:18,PAGE_UP:33,PAGE_DOWN:34,HOME:36,END:35,BACKSPACE:8,DELETE:46,isArrow:function(a){switch(a=a.which?a.which:a){case c.LEFT:case c.RIGHT:case c.UP:case c.DOWN:return!0}return!1},isControl:function(a){var b=a.which;switch(b){case c.SHIFT:case c.CTRL:case c.ALT:return!0}return a.metaKey?!0:!1},isFunctionKey:function(a){return a=a.which?a.which:a,a>=112&&123>=a}},l="<div class='select2-measure-scrollbar'></div>",m={"\u24b6":"A","\uff21":"A","\xc0":"A","\xc1":"A","\xc2":"A","\u1ea6":"A","\u1ea4":"A","\u1eaa":"A","\u1ea8":"A","\xc3":"A","\u0100":"A","\u0102":"A","\u1eb0":"A","\u1eae":"A","\u1eb4":"A","\u1eb2":"A","\u0226":"A","\u01e0":"A","\xc4":"A","\u01de":"A","\u1ea2":"A","\xc5":"A","\u01fa":"A","\u01cd":"A","\u0200":"A","\u0202":"A","\u1ea0":"A","\u1eac":"A","\u1eb6":"A","\u1e00":"A","\u0104":"A","\u023a":"A","\u2c6f":"A","\ua732":"AA","\xc6":"AE","\u01fc":"AE","\u01e2":"AE","\ua734":"AO","\ua736":"AU","\ua738":"AV","\ua73a":"AV","\ua73c":"AY","\u24b7":"B","\uff22":"B","\u1e02":"B","\u1e04":"B","\u1e06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24b8":"C","\uff23":"C","\u0106":"C","\u0108":"C","\u010a":"C","\u010c":"C","\xc7":"C","\u1e08":"C","\u0187":"C","\u023b":"C","\ua73e":"C","\u24b9":"D","\uff24":"D","\u1e0a":"D","\u010e":"D","\u1e0c":"D","\u1e10":"D","\u1e12":"D","\u1e0e":"D","\u0110":"D","\u018b":"D","\u018a":"D","\u0189":"D","\ua779":"D","\u01f1":"DZ","\u01c4":"DZ","\u01f2":"Dz","\u01c5":"Dz","\u24ba":"E","\uff25":"E","\xc8":"E","\xc9":"E","\xca":"E","\u1ec0":"E","\u1ebe":"E","\u1ec4":"E","\u1ec2":"E","\u1ebc":"E","\u0112":"E","\u1e14":"E","\u1e16":"E","\u0114":"E","\u0116":"E","\xcb":"E","\u1eba":"E","\u011a":"E","\u0204":"E","\u0206":"E","\u1eb8":"E","\u1ec6":"E","\u0228":"E","\u1e1c":"E","\u0118":"E","\u1e18":"E","\u1e1a":"E","\u0190":"E","\u018e":"E","\u24bb":"F","\uff26":"F","\u1e1e":"F","\u0191":"F","\ua77b":"F","\u24bc":"G","\uff27":"G","\u01f4":"G","\u011c":"G","\u1e20":"G","\u011e":"G","\u0120":"G","\u01e6":"G","\u0122":"G","\u01e4":"G","\u0193":"G","\ua7a0":"G","\ua77d":"G","\ua77e":"G","\u24bd":"H","\uff28":"H","\u0124":"H","\u1e22":"H","\u1e26":"H","\u021e":"H","\u1e24":"H","\u1e28":"H","\u1e2a":"H","\u0126":"H","\u2c67":"H","\u2c75":"H","\ua78d":"H","\u24be":"I","\uff29":"I","\xcc":"I","\xcd":"I","\xce":"I","\u0128":"I","\u012a":"I","\u012c":"I","\u0130":"I","\xcf":"I","\u1e2e":"I","\u1ec8":"I","\u01cf":"I","\u0208":"I","\u020a":"I","\u1eca":"I","\u012e":"I","\u1e2c":"I","\u0197":"I","\u24bf":"J","\uff2a":"J","\u0134":"J","\u0248":"J","\u24c0":"K","\uff2b":"K","\u1e30":"K","\u01e8":"K","\u1e32":"K","\u0136":"K","\u1e34":"K","\u0198":"K","\u2c69":"K","\ua740":"K","\ua742":"K","\ua744":"K","\ua7a2":"K","\u24c1":"L","\uff2c":"L","\u013f":"L","\u0139":"L","\u013d":"L","\u1e36":"L","\u1e38":"L","\u013b":"L","\u1e3c":"L","\u1e3a":"L","\u0141":"L","\u023d":"L","\u2c62":"L","\u2c60":"L","\ua748":"L","\ua746":"L","\ua780":"L","\u01c7":"LJ","\u01c8":"Lj","\u24c2":"M","\uff2d":"M","\u1e3e":"M","\u1e40":"M","\u1e42":"M","\u2c6e":"M","\u019c":"M","\u24c3":"N","\uff2e":"N","\u01f8":"N","\u0143":"N","\xd1":"N","\u1e44":"N","\u0147":"N","\u1e46":"N","\u0145":"N","\u1e4a":"N","\u1e48":"N","\u0220":"N","\u019d":"N","\ua790":"N","\ua7a4":"N","\u01ca":"NJ","\u01cb":"Nj","\u24c4":"O","\uff2f":"O","\xd2":"O","\xd3":"O","\xd4":"O","\u1ed2":"O","\u1ed0":"O","\u1ed6":"O","\u1ed4":"O","\xd5":"O","\u1e4c":"O","\u022c":"O","\u1e4e":"O","\u014c":"O","\u1e50":"O","\u1e52":"O","\u014e":"O","\u022e":"O","\u0230":"O","\xd6":"O","\u022a":"O","\u1ece":"O","\u0150":"O","\u01d1":"O","\u020c":"O","\u020e":"O","\u01a0":"O","\u1edc":"O","\u1eda":"O","\u1ee0":"O","\u1ede":"O","\u1ee2":"O","\u1ecc":"O","\u1ed8":"O","\u01ea":"O","\u01ec":"O","\xd8":"O","\u01fe":"O","\u0186":"O","\u019f":"O","\ua74a":"O","\ua74c":"O","\u01a2":"OI","\ua74e":"OO","\u0222":"OU","\u24c5":"P","\uff30":"P","\u1e54":"P","\u1e56":"P","\u01a4":"P","\u2c63":"P","\ua750":"P","\ua752":"P","\ua754":"P","\u24c6":"Q","\uff31":"Q","\ua756":"Q","\ua758":"Q","\u024a":"Q","\u24c7":"R","\uff32":"R","\u0154":"R","\u1e58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1e5a":"R","\u1e5c":"R","\u0156":"R","\u1e5e":"R","\u024c":"R","\u2c64":"R","\ua75a":"R","\ua7a6":"R","\ua782":"R","\u24c8":"S","\uff33":"S","\u1e9e":"S","\u015a":"S","\u1e64":"S","\u015c":"S","\u1e60":"S","\u0160":"S","\u1e66":"S","\u1e62":"S","\u1e68":"S","\u0218":"S","\u015e":"S","\u2c7e":"S","\ua7a8":"S","\ua784":"S","\u24c9":"T","\uff34":"T","\u1e6a":"T","\u0164":"T","\u1e6c":"T","\u021a":"T","\u0162":"T","\u1e70":"T","\u1e6e":"T","\u0166":"T","\u01ac":"T","\u01ae":"T","\u023e":"T","\ua786":"T","\ua728":"TZ","\u24ca":"U","\uff35":"U","\xd9":"U","\xda":"U","\xdb":"U","\u0168":"U","\u1e78":"U","\u016a":"U","\u1e7a":"U","\u016c":"U","\xdc":"U","\u01db":"U","\u01d7":"U","\u01d5":"U","\u01d9":"U","\u1ee6":"U","\u016e":"U","\u0170":"U","\u01d3":"U","\u0214":"U","\u0216":"U","\u01af":"U","\u1eea":"U","\u1ee8":"U","\u1eee":"U","\u1eec":"U","\u1ef0":"U","\u1ee4":"U","\u1e72":"U","\u0172":"U","\u1e76":"U","\u1e74":"U","\u0244":"U","\u24cb":"V","\uff36":"V","\u1e7c":"V","\u1e7e":"V","\u01b2":"V","\ua75e":"V","\u0245":"V","\ua760":"VY","\u24cc":"W","\uff37":"W","\u1e80":"W","\u1e82":"W","\u0174":"W","\u1e86":"W","\u1e84":"W","\u1e88":"W","\u2c72":"W","\u24cd":"X","\uff38":"X","\u1e8a":"X","\u1e8c":"X","\u24ce":"Y","\uff39":"Y","\u1ef2":"Y","\xdd":"Y","\u0176":"Y","\u1ef8":"Y","\u0232":"Y","\u1e8e":"Y","\u0178":"Y","\u1ef6":"Y","\u1ef4":"Y","\u01b3":"Y","\u024e":"Y","\u1efe":"Y","\u24cf":"Z","\uff3a":"Z","\u0179":"Z","\u1e90":"Z","\u017b":"Z","\u017d":"Z","\u1e92":"Z","\u1e94":"Z","\u01b5":"Z","\u0224":"Z","\u2c7f":"Z","\u2c6b":"Z","\ua762":"Z","\u24d0":"a","\uff41":"a","\u1e9a":"a","\xe0":"a","\xe1":"a","\xe2":"a","\u1ea7":"a","\u1ea5":"a","\u1eab":"a","\u1ea9":"a","\xe3":"a","\u0101":"a","\u0103":"a","\u1eb1":"a","\u1eaf":"a","\u1eb5":"a","\u1eb3":"a","\u0227":"a","\u01e1":"a","\xe4":"a","\u01df":"a","\u1ea3":"a","\xe5":"a","\u01fb":"a","\u01ce":"a","\u0201":"a","\u0203":"a","\u1ea1":"a","\u1ead":"a","\u1eb7":"a","\u1e01":"a","\u0105":"a","\u2c65":"a","\u0250":"a","\ua733":"aa","\xe6":"ae","\u01fd":"ae","\u01e3":"ae","\ua735":"ao","\ua737":"au","\ua739":"av","\ua73b":"av","\ua73d":"ay","\u24d1":"b","\uff42":"b","\u1e03":"b","\u1e05":"b","\u1e07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24d2":"c","\uff43":"c","\u0107":"c","\u0109":"c","\u010b":"c","\u010d":"c","\xe7":"c","\u1e09":"c","\u0188":"c","\u023c":"c","\ua73f":"c","\u2184":"c","\u24d3":"d","\uff44":"d","\u1e0b":"d","\u010f":"d","\u1e0d":"d","\u1e11":"d","\u1e13":"d","\u1e0f":"d","\u0111":"d","\u018c":"d","\u0256":"d","\u0257":"d","\ua77a":"d","\u01f3":"dz","\u01c6":"dz","\u24d4":"e","\uff45":"e","\xe8":"e","\xe9":"e","\xea":"e","\u1ec1":"e","\u1ebf":"e","\u1ec5":"e","\u1ec3":"e","\u1ebd":"e","\u0113":"e","\u1e15":"e","\u1e17":"e","\u0115":"e","\u0117":"e","\xeb":"e","\u1ebb":"e","\u011b":"e","\u0205":"e","\u0207":"e","\u1eb9":"e","\u1ec7":"e","\u0229":"e","\u1e1d":"e","\u0119":"e","\u1e19":"e","\u1e1b":"e","\u0247":"e","\u025b":"e","\u01dd":"e","\u24d5":"f","\uff46":"f","\u1e1f":"f","\u0192":"f","\ua77c":"f","\u24d6":"g","\uff47":"g","\u01f5":"g","\u011d":"g","\u1e21":"g","\u011f":"g","\u0121":"g","\u01e7":"g","\u0123":"g","\u01e5":"g","\u0260":"g","\ua7a1":"g","\u1d79":"g","\ua77f":"g","\u24d7":"h","\uff48":"h","\u0125":"h","\u1e23":"h","\u1e27":"h","\u021f":"h","\u1e25":"h","\u1e29":"h","\u1e2b":"h","\u1e96":"h","\u0127":"h","\u2c68":"h","\u2c76":"h","\u0265":"h","\u0195":"hv","\u24d8":"i","\uff49":"i","\xec":"i","\xed":"i","\xee":"i","\u0129":"i","\u012b":"i","\u012d":"i","\xef":"i","\u1e2f":"i","\u1ec9":"i","\u01d0":"i","\u0209":"i","\u020b":"i","\u1ecb":"i","\u012f":"i","\u1e2d":"i","\u0268":"i","\u0131":"i","\u24d9":"j","\uff4a":"j","\u0135":"j","\u01f0":"j","\u0249":"j","\u24da":"k","\uff4b":"k","\u1e31":"k","\u01e9":"k","\u1e33":"k","\u0137":"k","\u1e35":"k","\u0199":"k","\u2c6a":"k","\ua741":"k","\ua743":"k","\ua745":"k","\ua7a3":"k","\u24db":"l","\uff4c":"l","\u0140":"l","\u013a":"l","\u013e":"l","\u1e37":"l","\u1e39":"l","\u013c":"l","\u1e3d":"l","\u1e3b":"l","\u017f":"l","\u0142":"l","\u019a":"l","\u026b":"l","\u2c61":"l","\ua749":"l","\ua781":"l","\ua747":"l","\u01c9":"lj","\u24dc":"m","\uff4d":"m","\u1e3f":"m","\u1e41":"m","\u1e43":"m","\u0271":"m","\u026f":"m","\u24dd":"n","\uff4e":"n","\u01f9":"n","\u0144":"n","\xf1":"n","\u1e45":"n","\u0148":"n","\u1e47":"n","\u0146":"n","\u1e4b":"n","\u1e49":"n","\u019e":"n","\u0272":"n","\u0149":"n","\ua791":"n","\ua7a5":"n","\u01cc":"nj","\u24de":"o","\uff4f":"o","\xf2":"o","\xf3":"o","\xf4":"o","\u1ed3":"o","\u1ed1":"o","\u1ed7":"o","\u1ed5":"o","\xf5":"o","\u1e4d":"o","\u022d":"o","\u1e4f":"o","\u014d":"o","\u1e51":"o","\u1e53":"o","\u014f":"o","\u022f":"o","\u0231":"o","\xf6":"o","\u022b":"o","\u1ecf":"o","\u0151":"o","\u01d2":"o","\u020d":"o","\u020f":"o","\u01a1":"o","\u1edd":"o","\u1edb":"o","\u1ee1":"o","\u1edf":"o","\u1ee3":"o","\u1ecd":"o","\u1ed9":"o","\u01eb":"o","\u01ed":"o","\xf8":"o","\u01ff":"o","\u0254":"o","\ua74b":"o","\ua74d":"o","\u0275":"o","\u01a3":"oi","\u0223":"ou","\ua74f":"oo","\u24df":"p","\uff50":"p","\u1e55":"p","\u1e57":"p","\u01a5":"p","\u1d7d":"p","\ua751":"p","\ua753":"p","\ua755":"p","\u24e0":"q","\uff51":"q","\u024b":"q","\ua757":"q","\ua759":"q","\u24e1":"r","\uff52":"r","\u0155":"r","\u1e59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1e5b":"r","\u1e5d":"r","\u0157":"r","\u1e5f":"r","\u024d":"r","\u027d":"r","\ua75b":"r","\ua7a7":"r","\ua783":"r","\u24e2":"s","\uff53":"s","\xdf":"s","\u015b":"s","\u1e65":"s","\u015d":"s","\u1e61":"s","\u0161":"s","\u1e67":"s","\u1e63":"s","\u1e69":"s","\u0219":"s","\u015f":"s","\u023f":"s","\ua7a9":"s","\ua785":"s","\u1e9b":"s","\u24e3":"t","\uff54":"t","\u1e6b":"t","\u1e97":"t","\u0165":"t","\u1e6d":"t","\u021b":"t","\u0163":"t","\u1e71":"t","\u1e6f":"t","\u0167":"t","\u01ad":"t","\u0288":"t","\u2c66":"t","\ua787":"t","\ua729":"tz","\u24e4":"u","\uff55":"u","\xf9":"u","\xfa":"u","\xfb":"u","\u0169":"u","\u1e79":"u","\u016b":"u","\u1e7b":"u","\u016d":"u","\xfc":"u","\u01dc":"u","\u01d8":"u","\u01d6":"u","\u01da":"u","\u1ee7":"u","\u016f":"u","\u0171":"u","\u01d4":"u","\u0215":"u","\u0217":"u","\u01b0":"u","\u1eeb":"u","\u1ee9":"u","\u1eef":"u","\u1eed":"u","\u1ef1":"u","\u1ee5":"u","\u1e73":"u","\u0173":"u","\u1e77":"u","\u1e75":"u","\u0289":"u","\u24e5":"v","\uff56":"v","\u1e7d":"v","\u1e7f":"v","\u028b":"v","\ua75f":"v","\u028c":"v","\ua761":"vy","\u24e6":"w","\uff57":"w","\u1e81":"w","\u1e83":"w","\u0175":"w","\u1e87":"w","\u1e85":"w","\u1e98":"w","\u1e89":"w","\u2c73":"w","\u24e7":"x","\uff58":"x","\u1e8b":"x","\u1e8d":"x","\u24e8":"y","\uff59":"y","\u1ef3":"y","\xfd":"y","\u0177":"y","\u1ef9":"y","\u0233":"y","\u1e8f":"y","\xff":"y","\u1ef7":"y","\u1e99":"y","\u1ef5":"y","\u01b4":"y","\u024f":"y","\u1eff":"y","\u24e9":"z","\uff5a":"z","\u017a":"z","\u1e91":"z","\u017c":"z","\u017e":"z","\u1e93":"z","\u1e95":"z","\u01b6":"z","\u0225":"z","\u0240":"z","\u2c6c":"z","\ua763":"z"};j=a(document),g=function(){var a=1;return function(){return a++}}(),j.on("mousemove",function(a){i.x=a.pageX,i.y=a.pageY}),d=N(Object,{bind:function(a){var b=this;return function(){a.apply(b,arguments)}},init:function(c){var d,e,f=".select2-results";this.opts=c=this.prepareOpts(c),this.id=c.id,c.element.data("select2")!==b&&null!==c.element.data("select2")&&c.element.data("select2").destroy(),this.container=this.createContainer(),this.containerId="s2id_"+(c.element.attr("id")||"autogen"+g()),this.containerSelector="#"+this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g,"\\$1"),this.container.attr("id",this.containerId),this.body=w(function(){return c.element.closest("body")}),D(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.attr("style",c.element.attr("style")),this.container.css(K(c.containerCss)),this.container.addClass(K(c.containerCssClass)),this.elementTabIndex=this.opts.element.attr("tabindex"),this.opts.element.data("select2",this).attr("tabindex","-1").before(this.container).on("click.select2",A),this.container.data("select2",this),this.dropdown=this.container.find(".select2-drop"),D(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(K(c.dropdownCssClass)),this.dropdown.data("select2",this),this.dropdown.on("click",A),this.results=d=this.container.find(f),this.search=e=this.container.find("input.select2-input"),this.queryCount=0,this.resultsPage=0,this.context=null,this.initContainer(),this.container.on("click",A),u(this.results),this.dropdown.on("mousemove-filtered touchstart touchmove touchend",f,this.bind(this.highlightUnderEvent)),x(80,this.results),this.dropdown.on("scroll-debounced",f,this.bind(this.loadMoreIfNeeded)),a(this.container).on("change",".select2-input",function(a){a.stopPropagation()}),a(this.dropdown).on("change",".select2-input",function(a){a.stopPropagation()}),a.fn.mousewheel&&d.mousewheel(function(a,b,c,e){var f=d.scrollTop();e>0&&0>=f-e?(d.scrollTop(0),A(a)):0>e&&d.get(0).scrollHeight-d.scrollTop()+e<=d.height()&&(d.scrollTop(d.get(0).scrollHeight-d.height()),A(a))}),t(e),e.on("keyup-change input paste",this.bind(this.updateResults)),e.on("focus",function(){e.addClass("select2-focused")}),e.on("blur",function(){e.removeClass("select2-focused")}),this.dropdown.on("mouseup",f,this.bind(function(b){a(b.target).closest(".select2-result-selectable").length>0&&(this.highlightUnderEvent(b),this.selectHighlighted(b))})),this.dropdown.on("click mouseup mousedown",function(a){a.stopPropagation()}),a.isFunction(this.opts.initSelection)&&(this.initSelection(),this.monitorSource()),null!==c.maximumInputLength&&this.search.attr("maxlength",c.maximumInputLength);var h=c.element.prop("disabled");h===b&&(h=!1),this.enable(!h);var i=c.element.prop("readonly");i===b&&(i=!1),this.readonly(i),k=k||p(),this.autofocus=c.element.prop("autofocus"),c.element.prop("autofocus",!1),this.autofocus&&this.focus(),this.nextSearchTerm=b},destroy:function(){var a=this.opts.element,c=a.data("select2");this.close(),this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),c!==b&&(c.container.remove(),c.dropdown.remove(),a.removeClass("select2-offscreen").removeData("select2").off(".select2").prop("autofocus",this.autofocus||!1),this.elementTabIndex?a.attr({tabindex:this.elementTabIndex}):a.removeAttr("tabindex"),a.show())},optionToData:function(a){return a.is("option")?{id:a.prop("value"),text:a.text(),element:a.get(),css:a.attr("class"),disabled:a.prop("disabled"),locked:q(a.attr("locked"),"locked")||q(a.data("locked"),!0)}:a.is("optgroup")?{text:a.attr("label"),children:[],element:a.get(),css:a.attr("class")}:void 0},prepareOpts:function(c){var d,e,f,g,h=this;if(d=c.element,"select"===d.get(0).tagName.toLowerCase()&&(this.select=e=c.element),e&&a.each(["id","multiple","ajax","query","createSearchChoice","initSelection","data","tags"],function(){if(this in c)throw new Error("Option '"+this+"' is not allowed for Select2 when attached to a <select> element.")}),c=a.extend({},{populateResults:function(d,e,f){var g,i=this.opts.id;g=function(d,e,j){var k,l,m,n,o,p,q,r,s,t;for(d=c.sortResults(d,e,f),k=0,l=d.length;l>k;k+=1)m=d[k],o=m.disabled===!0,n=!o&&i(m)!==b,p=m.children&&m.children.length>0,q=a("<li></li>"),q.addClass("select2-results-dept-"+j),q.addClass("select2-result"),q.addClass(n?"select2-result-selectable":"select2-result-unselectable"),o&&q.addClass("select2-disabled"),p&&q.addClass("select2-result-with-children"),q.addClass(h.opts.formatResultCssClass(m)),r=a(document.createElement("div")),r.addClass("select2-result-label"),t=c.formatResult(m,r,f,h.opts.escapeMarkup),t!==b&&r.html(t),q.append(r),p&&(s=a("<ul></ul>"),s.addClass("select2-result-sub"),g(m.children,s,j+1),q.append(s)),q.data("select2-data",m),e.append(q)},g(e,d,0)}},a.fn.select2.defaults,c),"function"!=typeof c.id&&(f=c.id,c.id=function(a){return a[f]}),a.isArray(c.element.data("select2Tags"))){if("tags"in c)throw"tags specified as both an attribute 'data-select2-tags' and in options of Select2 "+c.element.attr("id");c.tags=c.element.data("select2Tags")}if(e?(c.query=this.bind(function(a){var f,g,i,c={results:[],more:!1},e=a.term;i=function(b,c){var d;b.is("option")?a.matcher(e,b.text(),b)&&c.push(h.optionToData(b)):b.is("optgroup")&&(d=h.optionToData(b),b.children().each2(function(a,b){i(b,d.children)}),d.children.length>0&&c.push(d))},f=d.children(),this.getPlaceholder()!==b&&f.length>0&&(g=this.getPlaceholderOption(),g&&(f=f.not(g))),f.each2(function(a,b){i(b,c.results)}),a.callback(c)}),c.id=function(a){return a.id},c.formatResultCssClass=function(a){return a.css}):"query"in c||("ajax"in c?(g=c.element.data("ajax-url"),g&&g.length>0&&(c.ajax.url=g),c.query=G.call(c.element,c.ajax)):"data"in c?c.query=H(c.data):"tags"in c&&(c.query=I(c.tags),c.createSearchChoice===b&&(c.createSearchChoice=function(b){return{id:a.trim(b),text:a.trim(b)}}),c.initSelection===b&&(c.initSelection=function(b,d){var e=[];a(r(b.val(),c.separator)).each(function(){var b={id:this,text:this},d=c.tags;a.isFunction(d)&&(d=d()),a(d).each(function(){return q(this.id,b.id)?(b=this,!1):void 0}),e.push(b)}),d(e)}))),"function"!=typeof c.query)throw"query function not defined for Select2 "+c.element.attr("id");return c},monitorSource:function(){var c,d,a=this.opts.element;a.on("change.select2",this.bind(function(){this.opts.element.data("select2-change-triggered")!==!0&&this.initSelection()})),c=this.bind(function(){var c=a.prop("disabled");c===b&&(c=!1),this.enable(!c);var d=a.prop("readonly");d===b&&(d=!1),this.readonly(d),D(this.container,this.opts.element,this.opts.adaptContainerCssClass),this.container.addClass(K(this.opts.containerCssClass)),D(this.dropdown,this.opts.element,this.opts.adaptDropdownCssClass),this.dropdown.addClass(K(this.opts.dropdownCssClass))}),a.on("propertychange.select2",c),this.mutationCallback===b&&(this.mutationCallback=function(a){a.forEach(c)}),d=window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,d!==b&&(this.propertyObserver&&(delete this.propertyObserver,this.propertyObserver=null),this.propertyObserver=new d(this.mutationCallback),this.propertyObserver.observe(a.get(0),{attributes:!0,subtree:!1}))},triggerSelect:function(b){var c=a.Event("select2-selecting",{val:this.id(b),object:b});return this.opts.element.trigger(c),!c.isDefaultPrevented()},triggerChange:function(b){b=b||{},b=a.extend({},b,{type:"change",val:this.val()}),this.opts.element.data("select2-change-triggered",!0),this.opts.element.trigger(b),this.opts.element.data("select2-change-triggered",!1),this.opts.element.click(),this.opts.blurOnChange&&this.opts.element.blur()},isInterfaceEnabled:function(){return this.enabledInterface===!0},enableInterface:function(){var a=this._enabled&&!this._readonly,b=!a;return a===this.enabledInterface?!1:(this.container.toggleClass("select2-container-disabled",b),this.close(),this.enabledInterface=a,!0)},enable:function(a){a===b&&(a=!0),this._enabled!==a&&(this._enabled=a,this.opts.element.prop("disabled",!a),this.enableInterface())},disable:function(){this.enable(!1)},readonly:function(a){return a===b&&(a=!1),this._readonly===a?!1:(this._readonly=a,this.opts.element.prop("readonly",a),this.enableInterface(),!0)},opened:function(){return this.container.hasClass("select2-dropdown-open")},positionDropdown:function(){var t,u,v,w,x,b=this.dropdown,c=this.container.offset(),d=this.container.outerHeight(!1),e=this.container.outerWidth(!1),f=b.outerHeight(!1),g=a(window),h=g.width(),i=g.height(),j=g.scrollLeft()+h,l=g.scrollTop()+i,m=c.top+d,n=c.left,o=l>=m+f,p=c.top-f>=this.body().scrollTop(),q=b.outerWidth(!1),r=j>=n+q,s=b.hasClass("select2-drop-above");s?(u=!0,!p&&o&&(v=!0,u=!1)):(u=!1,!o&&p&&(v=!0,u=!0)),v&&(b.hide(),c=this.container.offset(),d=this.container.outerHeight(!1),e=this.container.outerWidth(!1),f=b.outerHeight(!1),j=g.scrollLeft()+h,l=g.scrollTop()+i,m=c.top+d,n=c.left,q=b.outerWidth(!1),r=j>=n+q,b.show()),this.opts.dropdownAutoWidth?(x=a(".select2-results",b)[0],b.addClass("select2-drop-auto-width"),b.css("width",""),q=b.outerWidth(!1)+(x.scrollHeight===x.clientHeight?0:k.width),q>e?e=q:q=e,r=j>=n+q):this.container.removeClass("select2-drop-auto-width"),"static"!==this.body().css("position")&&(t=this.body().offset(),m-=t.top,n-=t.left),r||(n=c.left+e-q),w={left:n,width:e},u?(w.bottom=i-c.top,w.top="auto",this.container.addClass("select2-drop-above"),b.addClass("select2-drop-above")):(w.top=m,w.bottom="auto",this.container.removeClass("select2-drop-above"),b.removeClass("select2-drop-above")),w=a.extend(w,K(this.opts.dropdownCss)),b.css(w)},shouldOpen:function(){var b;return this.opened()?!1:this._enabled===!1||this._readonly===!0?!1:(b=a.Event("select2-opening"),this.opts.element.trigger(b),!b.isDefaultPrevented())},clearDropdownAlignmentPreference:function(){this.container.removeClass("select2-drop-above"),this.dropdown.removeClass("select2-drop-above")},open:function(){return this.shouldOpen()?(this.opening(),!0):!1},opening:function(){var f,b=this.containerId,c="scroll."+b,d="resize."+b,e="orientationchange."+b;this.container.addClass("select2-dropdown-open").addClass("select2-container-active"),this.clearDropdownAlignmentPreference(),this.dropdown[0]!==this.body().children().last()[0]&&this.dropdown.detach().appendTo(this.body()),f=a("#select2-drop-mask"),0==f.length&&(f=a(document.createElement("div")),f.attr("id","select2-drop-mask").attr("class","select2-drop-mask"),f.hide(),f.appendTo(this.body()),f.on("mousedown touchstart click",function(b){var d,c=a("#select2-drop");c.length>0&&(d=c.data("select2"),d.opts.selectOnBlur&&d.selectHighlighted({noFocus:!0}),d.close({focus:!0}),b.preventDefault(),b.stopPropagation())})),this.dropdown.prev()[0]!==f[0]&&this.dropdown.before(f),a("#select2-drop").removeAttr("id"),this.dropdown.attr("id","select2-drop"),f.show(),this.positionDropdown(),this.dropdown.show(),this.positionDropdown(),this.dropdown.addClass("select2-drop-active");var g=this;this.container.parents().add(window).each(function(){a(this).on(d+" "+c+" "+e,function(){g.positionDropdown()})})},close:function(){if(this.opened()){var b=this.containerId,c="scroll."+b,d="resize."+b,e="orientationchange."+b;this.container.parents().add(window).each(function(){a(this).off(c).off(d).off(e)}),this.clearDropdownAlignmentPreference(),a("#select2-drop-mask").hide(),this.dropdown.removeAttr("id"),this.dropdown.hide(),this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active"),this.results.empty(),this.clearSearch(),this.search.removeClass("select2-active"),this.opts.element.trigger(a.Event("select2-close"))}},externalSearch:function(a){this.open(),this.search.val(a),this.updateResults(!1)},clearSearch:function(){},getMaximumSelectionSize:function(){return K(this.opts.maximumSelectionSize)},ensureHighlightVisible:function(){var c,d,e,f,g,h,i,b=this.results;if(d=this.highlight(),!(0>d)){if(0==d)return b.scrollTop(0),void 0;c=this.findHighlightableChoices().find(".select2-result-label"),e=a(c[d]),f=e.offset().top+e.outerHeight(!0),d===c.length-1&&(i=b.find("li.select2-more-results"),i.length>0&&(f=i.offset().top+i.outerHeight(!0))),g=b.offset().top+b.outerHeight(!0),f>g&&b.scrollTop(b.scrollTop()+(f-g)),h=e.offset().top-b.offset().top,0>h&&"none"!=e.css("display")&&b.scrollTop(b.scrollTop()+h)}},findHighlightableChoices:function(){return this.results.find(".select2-result-selectable:not(.select2-disabled, .select2-selected)")},moveHighlight:function(b){for(var c=this.findHighlightableChoices(),d=this.highlight();d>-1&&d<c.length;){d+=b;var e=a(c[d]);if(e.hasClass("select2-result-selectable")&&!e.hasClass("select2-disabled")&&!e.hasClass("select2-selected")){this.highlight(d);break}}},highlight:function(b){var d,e,c=this.findHighlightableChoices();return 0===arguments.length?o(c.filter(".select2-highlighted")[0],c.get()):(b>=c.length&&(b=c.length-1),0>b&&(b=0),this.removeHighlight(),d=a(c[b]),d.addClass("select2-highlighted"),this.ensureHighlightVisible(),e=d.data("select2-data"),e&&this.opts.element.trigger({type:"select2-highlight",val:this.id(e),choice:e}),void 0)},removeHighlight:function(){this.results.find(".select2-highlighted").removeClass("select2-highlighted")},countSelectableResults:function(){return this.findHighlightableChoices().length},highlightUnderEvent:function(b){var c=a(b.target).closest(".select2-result-selectable");if(c.length>0&&!c.is(".select2-highlighted")){var d=this.findHighlightableChoices();this.highlight(d.index(c))}else 0==c.length&&this.removeHighlight()},loadMoreIfNeeded:function(){var c,a=this.results,b=a.find("li.select2-more-results"),d=this.resultsPage+1,e=this,f=this.search.val(),g=this.context;0!==b.length&&(c=b.offset().top-a.offset().top-a.height(),c<=this.opts.loadMorePadding&&(b.addClass("select2-active"),this.opts.query({element:this.opts.element,term:f,page:d,context:g,matcher:this.opts.matcher,callback:this.bind(function(c){e.opened()&&(e.opts.populateResults.call(this,a,c.results,{term:f,page:d,context:g}),e.postprocessResults(c,!1,!1),c.more===!0?(b.detach().appendTo(a).text(e.opts.formatLoadMore(d+1)),window.setTimeout(function(){e.loadMoreIfNeeded()},10)):b.remove(),e.positionDropdown(),e.resultsPage=d,e.context=c.context,this.opts.element.trigger({type:"select2-loaded",items:c}))})})))},tokenize:function(){},updateResults:function(c){function m(){d.removeClass("select2-active"),h.positionDropdown()}function n(a){e.html(a),m()}var g,i,l,d=this.search,e=this.results,f=this.opts,h=this,j=d.val(),k=a.data(this.container,"select2-last-term");if((c===!0||!k||!q(j,k))&&(a.data(this.container,"select2-last-term",j),c===!0||this.showSearchInput!==!1&&this.opened())){l=++this.queryCount;var o=this.getMaximumSelectionSize();if(o>=1&&(g=this.data(),a.isArray(g)&&g.length>=o&&J(f.formatSelectionTooBig,"formatSelectionTooBig")))return n("<li class='select2-selection-limit'>"+f.formatSelectionTooBig(o)+"</li>"),void 0;if(d.val().length<f.minimumInputLength)return J(f.formatInputTooShort,"formatInputTooShort")?n("<li class='select2-no-results'>"+f.formatInputTooShort(d.val(),f.minimumInputLength)+"</li>"):n(""),c&&this.showSearch&&this.showSearch(!0),void 0;
if(f.maximumInputLength&&d.val().length>f.maximumInputLength)return J(f.formatInputTooLong,"formatInputTooLong")?n("<li class='select2-no-results'>"+f.formatInputTooLong(d.val(),f.maximumInputLength)+"</li>"):n(""),void 0;f.formatSearching&&0===this.findHighlightableChoices().length&&n("<li class='select2-searching'>"+f.formatSearching()+"</li>"),d.addClass("select2-active"),this.removeHighlight(),i=this.tokenize(),i!=b&&null!=i&&d.val(i),this.resultsPage=1,f.query({element:f.element,term:d.val(),page:this.resultsPage,context:null,matcher:f.matcher,callback:this.bind(function(g){var i;if(l==this.queryCount){if(!this.opened())return this.search.removeClass("select2-active"),void 0;if(this.context=g.context===b?null:g.context,this.opts.createSearchChoice&&""!==d.val()&&(i=this.opts.createSearchChoice.call(h,d.val(),g.results),i!==b&&null!==i&&h.id(i)!==b&&null!==h.id(i)&&0===a(g.results).filter(function(){return q(h.id(this),h.id(i))}).length&&g.results.unshift(i)),0===g.results.length&&J(f.formatNoMatches,"formatNoMatches"))return n("<li class='select2-no-results'>"+f.formatNoMatches(d.val())+"</li>"),void 0;e.empty(),h.opts.populateResults.call(this,e,g.results,{term:d.val(),page:this.resultsPage,context:null}),g.more===!0&&J(f.formatLoadMore,"formatLoadMore")&&(e.append("<li class='select2-more-results'>"+h.opts.escapeMarkup(f.formatLoadMore(this.resultsPage))+"</li>"),window.setTimeout(function(){h.loadMoreIfNeeded()},10)),this.postprocessResults(g,c),m(),this.opts.element.trigger({type:"select2-loaded",items:g})}})})}},cancel:function(){this.close()},blur:function(){this.opts.selectOnBlur&&this.selectHighlighted({noFocus:!0}),this.close(),this.container.removeClass("select2-container-active"),this.search[0]===document.activeElement&&this.search.blur(),this.clearSearch(),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus")},focusSearch:function(){y(this.search)},selectHighlighted:function(a){var b=this.highlight(),c=this.results.find(".select2-highlighted"),d=c.closest(".select2-result").data("select2-data");d?(this.highlight(b),this.onSelect(d,a)):a&&a.noFocus&&this.close()},getPlaceholder:function(){var a;return this.opts.element.attr("placeholder")||this.opts.element.attr("data-placeholder")||this.opts.element.data("placeholder")||this.opts.placeholder||((a=this.getPlaceholderOption())!==b?a.text():b)},getPlaceholderOption:function(){if(this.select){var a=this.select.children("option").first();if(this.opts.placeholderOption!==b)return"first"===this.opts.placeholderOption&&a||"function"==typeof this.opts.placeholderOption&&this.opts.placeholderOption(this.select);if(""===a.text()&&""===a.val())return a}},initContainerWidth:function(){function c(){var c,d,e,f,g,h;if("off"===this.opts.width)return null;if("element"===this.opts.width)return 0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px";if("copy"===this.opts.width||"resolve"===this.opts.width){if(c=this.opts.element.attr("style"),c!==b)for(d=c.split(";"),f=0,g=d.length;g>f;f+=1)if(h=d[f].replace(/\s/g,""),e=h.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i),null!==e&&e.length>=1)return e[1];return"resolve"===this.opts.width?(c=this.opts.element.css("width"),c.indexOf("%")>0?c:0===this.opts.element.outerWidth(!1)?"auto":this.opts.element.outerWidth(!1)+"px"):null}return a.isFunction(this.opts.width)?this.opts.width():this.opts.width}var d=c.call(this);null!==d&&this.container.css("width",d)}}),e=N(d,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container"}).html(["<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>","   <span class='select2-chosen'>&nbsp;</span><abbr class='select2-search-choice-close'></abbr>","   <span class='select2-arrow'><b></b></span>","</a>","<input class='select2-focusser select2-offscreen' type='text'/>","<div class='select2-drop select2-display-none'>","   <div class='select2-search'>","       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'/>","   </div>","   <ul class='select2-results'>","   </ul>","</div>"].join(""));return b},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.focusser.prop("disabled",!this.isInterfaceEnabled())},opening:function(){var c,d,e;this.opts.minimumResultsForSearch>=0&&this.showSearch(!0),this.parent.opening.apply(this,arguments),this.showSearchInput!==!1&&this.search.val(this.focusser.val()),this.search.focus(),c=this.search.get(0),c.createTextRange?(d=c.createTextRange(),d.collapse(!1),d.select()):c.setSelectionRange&&(e=this.search.val().length,c.setSelectionRange(e,e)),""===this.search.val()&&this.nextSearchTerm!=b&&(this.search.val(this.nextSearchTerm),this.search.select()),this.focusser.prop("disabled",!0).val(""),this.updateResults(!0),this.opts.element.trigger(a.Event("select2-open"))},close:function(a){this.opened()&&(this.parent.close.apply(this,arguments),a=a||{focus:!0},this.focusser.removeAttr("disabled"),a.focus&&this.focusser.focus())},focus:function(){this.opened()?this.close():(this.focusser.removeAttr("disabled"),this.focusser.focus())},isFocused:function(){return this.container.hasClass("select2-container-active")},cancel:function(){this.parent.cancel.apply(this,arguments),this.focusser.removeAttr("disabled"),this.focusser.focus()},destroy:function(){a("label[for='"+this.focusser.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments)},initContainer:function(){var b,d=this.container,e=this.dropdown;this.opts.minimumResultsForSearch<0?this.showSearch(!1):this.showSearch(!0),this.selection=b=d.find(".select2-choice"),this.focusser=d.find(".select2-focusser"),this.focusser.attr("id","s2id_autogen"+g()),a("label[for='"+this.opts.element.attr("id")+"']").attr("for",this.focusser.attr("id")),this.focusser.attr("tabindex",this.elementTabIndex),this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()){if(a.which===c.PAGE_UP||a.which===c.PAGE_DOWN)return A(a),void 0;switch(a.which){case c.UP:case c.DOWN:return this.moveHighlight(a.which===c.UP?-1:1),A(a),void 0;case c.ENTER:return this.selectHighlighted(),A(a),void 0;case c.TAB:return this.selectHighlighted({noFocus:!0}),void 0;case c.ESC:return this.cancel(a),A(a),void 0}}})),this.search.on("blur",this.bind(function(){document.activeElement===this.body().get(0)&&window.setTimeout(this.bind(function(){this.search.focus()}),0)})),this.focusser.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()&&a.which!==c.TAB&&!c.isControl(a)&&!c.isFunctionKey(a)&&a.which!==c.ESC){if(this.opts.openOnEnter===!1&&a.which===c.ENTER)return A(a),void 0;if(a.which==c.DOWN||a.which==c.UP||a.which==c.ENTER&&this.opts.openOnEnter){if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return;return this.open(),A(a),void 0}return a.which==c.DELETE||a.which==c.BACKSPACE?(this.opts.allowClear&&this.clear(),A(a),void 0):void 0}})),t(this.focusser),this.focusser.on("keyup-change input",this.bind(function(a){if(this.opts.minimumResultsForSearch>=0){if(a.stopPropagation(),this.opened())return;this.open()}})),b.on("mousedown","abbr",this.bind(function(a){this.isInterfaceEnabled()&&(this.clear(),B(a),this.close(),this.selection.focus())})),b.on("mousedown",this.bind(function(b){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.opened()?this.close():this.isInterfaceEnabled()&&this.open(),A(b)})),e.on("mousedown",this.bind(function(){this.search.focus()})),b.on("focus",this.bind(function(a){A(a)})),this.focusser.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})).on("blur",this.bind(function(){this.opened()||(this.container.removeClass("select2-container-active"),this.opts.element.trigger(a.Event("select2-blur")))})),this.search.on("focus",this.bind(function(){this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active")})),this.initContainerWidth(),this.opts.element.addClass("select2-offscreen"),this.setPlaceholder()},clear:function(b){var c=this.selection.data("select2-data");if(c){var d=a.Event("select2-clearing");if(this.opts.element.trigger(d),d.isDefaultPrevented())return;var e=this.getPlaceholderOption();this.opts.element.val(e?e.val():""),this.selection.find(".select2-chosen").empty(),this.selection.removeData("select2-data"),this.setPlaceholder(),b!==!1&&(this.opts.element.trigger({type:"select2-removed",val:this.id(c),choice:c}),this.triggerChange({removed:c}))}},initSelection:function(){if(this.isPlaceholderOptionSelected())this.updateSelection(null),this.close(),this.setPlaceholder();else{var c=this;this.opts.initSelection.call(null,this.opts.element,function(a){a!==b&&null!==a&&(c.updateSelection(a),c.close(),c.setPlaceholder())})}},isPlaceholderOptionSelected:function(){var a;return this.getPlaceholder()?(a=this.getPlaceholderOption())!==b&&a.prop("selected")||""===this.opts.element.val()||this.opts.element.val()===b||null===this.opts.element.val():!1},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=a.find("option").filter(function(){return this.selected});b(c.optionToData(d))}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=c.val(),f=null;b.query({matcher:function(a,c,d){var g=q(e,b.id(d));return g&&(f=d),g},callback:a.isFunction(d)?function(){d(f)}:a.noop})}),b},getPlaceholder:function(){return this.select&&this.getPlaceholderOption()===b?b:this.parent.getPlaceholder.apply(this,arguments)},setPlaceholder:function(){var a=this.getPlaceholder();if(this.isPlaceholderOptionSelected()&&a!==b){if(this.select&&this.getPlaceholderOption()===b)return;this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(a)),this.selection.addClass("select2-default"),this.container.removeClass("select2-allowclear")}},postprocessResults:function(a,b,c){var d=0,e=this;if(this.findHighlightableChoices().each2(function(a,b){return q(e.id(b.data("select2-data")),e.opts.element.val())?(d=a,!1):void 0}),c!==!1&&(b===!0&&d>=0?this.highlight(d):this.highlight(0)),b===!0){var g=this.opts.minimumResultsForSearch;g>=0&&this.showSearch(L(a.results)>=g)}},showSearch:function(b){this.showSearchInput!==b&&(this.showSearchInput=b,this.dropdown.find(".select2-search").toggleClass("select2-search-hidden",!b),this.dropdown.find(".select2-search").toggleClass("select2-offscreen",!b),a(this.dropdown,this.container).toggleClass("select2-with-searchbox",b))},onSelect:function(a,b){if(this.triggerSelect(a)){var c=this.opts.element.val(),d=this.data();this.opts.element.val(this.id(a)),this.updateSelection(a),this.opts.element.trigger({type:"select2-selected",val:this.id(a),choice:a}),this.nextSearchTerm=this.opts.nextSearchTerm(a,this.search.val()),this.close(),b&&b.noFocus||this.focusser.focus(),q(c,this.id(a))||this.triggerChange({added:a,removed:d})}},updateSelection:function(a){var d,e,c=this.selection.find(".select2-chosen");this.selection.data("select2-data",a),c.empty(),null!==a&&(d=this.opts.formatSelection(a,c,this.opts.escapeMarkup)),d!==b&&c.append(d),e=this.opts.formatSelectionCssClass(a,c),e!==b&&c.addClass(e),this.selection.removeClass("select2-default"),this.opts.allowClear&&this.getPlaceholder()!==b&&this.container.addClass("select2-allowclear")},val:function(){var a,c=!1,d=null,e=this,f=this.data();if(0===arguments.length)return this.opts.element.val();if(a=arguments[0],arguments.length>1&&(c=arguments[1]),this.select)this.select.val(a).find("option").filter(function(){return this.selected}).each2(function(a,b){return d=e.optionToData(b),!1}),this.updateSelection(d),this.setPlaceholder(),c&&this.triggerChange({added:d,removed:f});else{if(!a&&0!==a)return this.clear(c),void 0;if(this.opts.initSelection===b)throw new Error("cannot call val() if initSelection() is not defined");this.opts.element.val(a),this.opts.initSelection(this.opts.element,function(a){e.opts.element.val(a?e.id(a):""),e.updateSelection(a),e.setPlaceholder(),c&&e.triggerChange({added:a,removed:f})})}},clearSearch:function(){this.search.val(""),this.focusser.val("")},data:function(a){var c,d=!1;return 0===arguments.length?(c=this.selection.data("select2-data"),c==b&&(c=null),c):(arguments.length>1&&(d=arguments[1]),a?(c=this.data(),this.opts.element.val(a?this.id(a):""),this.updateSelection(a),d&&this.triggerChange({added:a,removed:c})):this.clear(d),void 0)}}),f=N(d,{createContainer:function(){var b=a(document.createElement("div")).attr({"class":"select2-container select2-container-multi"}).html(["<ul class='select2-choices'>","  <li class='select2-search-field'>","    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>","  </li>","</ul>","<div class='select2-drop select2-drop-multi select2-display-none'>","   <ul class='select2-results'>","   </ul>","</div>"].join(""));return b},prepareOpts:function(){var b=this.parent.prepareOpts.apply(this,arguments),c=this;return"select"===b.element.get(0).tagName.toLowerCase()?b.initSelection=function(a,b){var d=[];a.find("option").filter(function(){return this.selected}).each2(function(a,b){d.push(c.optionToData(b))}),b(d)}:"data"in b&&(b.initSelection=b.initSelection||function(c,d){var e=r(c.val(),b.separator),f=[];b.query({matcher:function(c,d,g){var h=a.grep(e,function(a){return q(a,b.id(g))}).length;return h&&f.push(g),h},callback:a.isFunction(d)?function(){for(var a=[],c=0;c<e.length;c++)for(var g=e[c],h=0;h<f.length;h++){var i=f[h];if(q(g,b.id(i))){a.push(i),f.splice(h,1);break}}d(a)}:a.noop})}),b},selectChoice:function(a){var b=this.container.find(".select2-search-choice-focus");b.length&&a&&a[0]==b[0]||(b.length&&this.opts.element.trigger("choice-deselected",b),b.removeClass("select2-search-choice-focus"),a&&a.length&&(this.close(),a.addClass("select2-search-choice-focus"),this.opts.element.trigger("choice-selected",a)))},destroy:function(){a("label[for='"+this.search.attr("id")+"']").attr("for",this.opts.element.attr("id")),this.parent.destroy.apply(this,arguments)},initContainer:function(){var d,b=".select2-choices";this.searchContainer=this.container.find(".select2-search-field"),this.selection=d=this.container.find(b);var e=this;this.selection.on("click",".select2-search-choice:not(.select2-locked)",function(){e.search[0].focus(),e.selectChoice(a(this))}),this.search.attr("id","s2id_autogen"+g()),a("label[for='"+this.opts.element.attr("id")+"']").attr("for",this.search.attr("id")),this.search.on("input paste",this.bind(function(){this.isInterfaceEnabled()&&(this.opened()||this.open())})),this.search.attr("tabindex",this.elementTabIndex),this.keydowns=0,this.search.on("keydown",this.bind(function(a){if(this.isInterfaceEnabled()){++this.keydowns;var b=d.find(".select2-search-choice-focus"),e=b.prev(".select2-search-choice:not(.select2-locked)"),f=b.next(".select2-search-choice:not(.select2-locked)"),g=z(this.search);if(b.length&&(a.which==c.LEFT||a.which==c.RIGHT||a.which==c.BACKSPACE||a.which==c.DELETE||a.which==c.ENTER)){var h=b;return a.which==c.LEFT&&e.length?h=e:a.which==c.RIGHT?h=f.length?f:null:a.which===c.BACKSPACE?(this.unselect(b.first()),this.search.width(10),h=e.length?e:f):a.which==c.DELETE?(this.unselect(b.first()),this.search.width(10),h=f.length?f:null):a.which==c.ENTER&&(h=null),this.selectChoice(h),A(a),h&&h.length||this.open(),void 0}if((a.which===c.BACKSPACE&&1==this.keydowns||a.which==c.LEFT)&&0==g.offset&&!g.length)return this.selectChoice(d.find(".select2-search-choice:not(.select2-locked)").last()),A(a),void 0;if(this.selectChoice(null),this.opened())switch(a.which){case c.UP:case c.DOWN:return this.moveHighlight(a.which===c.UP?-1:1),A(a),void 0;case c.ENTER:return this.selectHighlighted(),A(a),void 0;case c.TAB:return this.selectHighlighted({noFocus:!0}),this.close(),void 0;case c.ESC:return this.cancel(a),A(a),void 0}if(a.which!==c.TAB&&!c.isControl(a)&&!c.isFunctionKey(a)&&a.which!==c.BACKSPACE&&a.which!==c.ESC){if(a.which===c.ENTER){if(this.opts.openOnEnter===!1)return;if(a.altKey||a.ctrlKey||a.shiftKey||a.metaKey)return}this.open(),(a.which===c.PAGE_UP||a.which===c.PAGE_DOWN)&&A(a),a.which===c.ENTER&&A(a)}}})),this.search.on("keyup",this.bind(function(){this.keydowns=0,this.resizeSearch()})),this.search.on("blur",this.bind(function(b){this.container.removeClass("select2-container-active"),this.search.removeClass("select2-focused"),this.selectChoice(null),this.opened()||this.clearSearch(),b.stopImmediatePropagation(),this.opts.element.trigger(a.Event("select2-blur"))})),this.container.on("click",b,this.bind(function(b){this.isInterfaceEnabled()&&(a(b.target).closest(".select2-search-choice").length>0||(this.selectChoice(null),this.clearPlaceholder(),this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.open(),this.focusSearch(),b.preventDefault()))})),this.container.on("focus",b,this.bind(function(){this.isInterfaceEnabled()&&(this.container.hasClass("select2-container-active")||this.opts.element.trigger(a.Event("select2-focus")),this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"),this.clearPlaceholder())})),this.initContainerWidth(),this.opts.element.addClass("select2-offscreen"),this.clearSearch()},enableInterface:function(){this.parent.enableInterface.apply(this,arguments)&&this.search.prop("disabled",!this.isInterfaceEnabled())},initSelection:function(){if(""===this.opts.element.val()&&""===this.opts.element.text()&&(this.updateSelection([]),this.close(),this.clearSearch()),this.select||""!==this.opts.element.val()){var c=this;this.opts.initSelection.call(null,this.opts.element,function(a){a!==b&&null!==a&&(c.updateSelection(a),c.close(),c.clearSearch())})}},clearSearch:function(){var a=this.getPlaceholder(),c=this.getMaxSearchWidth();a!==b&&0===this.getVal().length&&this.search.hasClass("select2-focused")===!1?(this.search.val(a).addClass("select2-default"),this.search.width(c>0?c:this.container.css("width"))):this.search.val("").width(10)},clearPlaceholder:function(){this.search.hasClass("select2-default")&&this.search.val("").removeClass("select2-default")},opening:function(){this.clearPlaceholder(),this.resizeSearch(),this.parent.opening.apply(this,arguments),this.focusSearch(),this.updateResults(!0),this.search.focus(),this.opts.element.trigger(a.Event("select2-open"))},close:function(){this.opened()&&this.parent.close.apply(this,arguments)},focus:function(){this.close(),this.search.focus()},isFocused:function(){return this.search.hasClass("select2-focused")},updateSelection:function(b){var c=[],d=[],e=this;a(b).each(function(){o(e.id(this),c)<0&&(c.push(e.id(this)),d.push(this))}),b=d,this.selection.find(".select2-search-choice").remove(),a(b).each(function(){e.addSelectedChoice(this)}),e.postprocessResults()},tokenize:function(){var a=this.search.val();a=this.opts.tokenizer.call(this,a,this.data(),this.bind(this.onSelect),this.opts),null!=a&&a!=b&&(this.search.val(a),a.length>0&&this.open())},onSelect:function(a,b){this.triggerSelect(a)&&(this.addSelectedChoice(a),this.opts.element.trigger({type:"selected",val:this.id(a),choice:a}),(this.select||!this.opts.closeOnSelect)&&this.postprocessResults(a,!1,this.opts.closeOnSelect===!0),this.opts.closeOnSelect?(this.close(),this.search.width(10)):this.countSelectableResults()>0?(this.search.width(10),this.resizeSearch(),this.getMaximumSelectionSize()>0&&this.val().length>=this.getMaximumSelectionSize()&&this.updateResults(!0),this.positionDropdown()):(this.close(),this.search.width(10)),this.triggerChange({added:a}),b&&b.noFocus||this.focusSearch())},cancel:function(){this.close(),this.focusSearch()},addSelectedChoice:function(c){var j,k,d=!c.locked,e=a("<li class='select2-search-choice'>    <div></div>    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a></li>"),f=a("<li class='select2-search-choice select2-locked'><div></div></li>"),g=d?e:f,h=this.id(c),i=this.getVal();j=this.opts.formatSelection(c,g.find("div"),this.opts.escapeMarkup),j!=b&&g.find("div").replaceWith("<div>"+j+"</div>"),k=this.opts.formatSelectionCssClass(c,g.find("div")),k!=b&&g.addClass(k),d&&g.find(".select2-search-choice-close").on("mousedown",A).on("click dblclick",this.bind(function(b){this.isInterfaceEnabled()&&(a(b.target).closest(".select2-search-choice").fadeOut("fast",this.bind(function(){this.unselect(a(b.target)),this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus"),this.close(),this.focusSearch()})).dequeue(),A(b))})).on("focus",this.bind(function(){this.isInterfaceEnabled()&&(this.container.addClass("select2-container-active"),this.dropdown.addClass("select2-drop-active"))})),g.data("select2-data",c),g.insertBefore(this.searchContainer),i.push(h),this.setVal(i)},unselect:function(b){var d,e,c=this.getVal();if(b=b.closest(".select2-search-choice"),0===b.length)throw"Invalid argument: "+b+". Must be .select2-search-choice";if(d=b.data("select2-data")){for(;(e=o(this.id(d),c))>=0;)c.splice(e,1),this.setVal(c),this.select&&this.postprocessResults();var f=a.Event("select2-removing");f.val=this.id(d),f.choice=d,this.opts.element.trigger(f),f.isDefaultPrevented()||(b.remove(),this.opts.element.trigger({type:"select2-removed",val:this.id(d),choice:d}),this.triggerChange({removed:d}))}},postprocessResults:function(a,b,c){var d=this.getVal(),e=this.results.find(".select2-result"),f=this.results.find(".select2-result-with-children"),g=this;e.each2(function(a,b){var c=g.id(b.data("select2-data"));o(c,d)>=0&&(b.addClass("select2-selected"),b.find(".select2-result-selectable").addClass("select2-selected"))}),f.each2(function(a,b){b.is(".select2-result-selectable")||0!==b.find(".select2-result-selectable:not(.select2-selected)").length||b.addClass("select2-selected")}),-1==this.highlight()&&c!==!1&&g.highlight(0),!this.opts.createSearchChoice&&!e.filter(".select2-result:not(.select2-selected)").length>0&&(!a||a&&!a.more&&0===this.results.find(".select2-no-results").length)&&J(g.opts.formatNoMatches,"formatNoMatches")&&this.results.append("<li class='select2-no-results'>"+g.opts.formatNoMatches(g.search.val())+"</li>")},getMaxSearchWidth:function(){return this.selection.width()-s(this.search)},resizeSearch:function(){var a,b,c,d,e,f=s(this.search);a=C(this.search)+10,b=this.search.offset().left,c=this.selection.width(),d=this.selection.offset().left,e=c-(b-d)-f,a>e&&(e=c-f),40>e&&(e=c-f),0>=e&&(e=a),this.search.width(Math.floor(e))},getVal:function(){var a;return this.select?(a=this.select.val(),null===a?[]:a):(a=this.opts.element.val(),r(a,this.opts.separator))},setVal:function(b){var c;this.select?this.select.val(b):(c=[],a(b).each(function(){o(this,c)<0&&c.push(this)}),this.opts.element.val(0===c.length?"":c.join(this.opts.separator)))},buildChangeDetails:function(a,b){for(var b=b.slice(0),a=a.slice(0),c=0;c<b.length;c++)for(var d=0;d<a.length;d++)q(this.opts.id(b[c]),this.opts.id(a[d]))&&(b.splice(c,1),c>0&&c--,a.splice(d,1),d--);return{added:b,removed:a}},val:function(c,d){var e,f=this;if(0===arguments.length)return this.getVal();if(e=this.data(),e.length||(e=[]),!c&&0!==c)return this.opts.element.val(""),this.updateSelection([]),this.clearSearch(),d&&this.triggerChange({added:this.data(),removed:e}),void 0;if(this.setVal(c),this.select)this.opts.initSelection(this.select,this.bind(this.updateSelection)),d&&this.triggerChange(this.buildChangeDetails(e,this.data()));else{if(this.opts.initSelection===b)throw new Error("val() cannot be called if initSelection() is not defined");this.opts.initSelection(this.opts.element,function(b){var c=a.map(b,f.id);f.setVal(c),f.updateSelection(b),f.clearSearch(),d&&f.triggerChange(f.buildChangeDetails(e,f.data()))})}this.clearSearch()},onSortStart:function(){if(this.select)throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");this.search.width(0),this.searchContainer.hide()},onSortEnd:function(){var b=[],c=this;this.searchContainer.show(),this.searchContainer.appendTo(this.searchContainer.parent()),this.resizeSearch(),this.selection.find(".select2-search-choice").each(function(){b.push(c.opts.id(a(this).data("select2-data")))}),this.setVal(b),this.triggerChange()},data:function(b,c){var e,f,d=this;return 0===arguments.length?this.selection.find(".select2-search-choice").map(function(){return a(this).data("select2-data")}).get():(f=this.data(),b||(b=[]),e=a.map(b,function(a){return d.opts.id(a)}),this.setVal(e),this.updateSelection(b),this.clearSearch(),c&&this.triggerChange(this.buildChangeDetails(f,this.data())),void 0)}}),a.fn.select2=function(){var d,g,h,i,j,c=Array.prototype.slice.call(arguments,0),k=["val","destroy","opened","open","close","focus","isFocused","container","dropdown","onSortStart","onSortEnd","enable","disable","readonly","positionDropdown","data","search"],l=["opened","isFocused","container","dropdown"],m=["val","data"],n={search:"externalSearch"};return this.each(function(){if(0===c.length||"object"==typeof c[0])d=0===c.length?{}:a.extend({},c[0]),d.element=a(this),"select"===d.element.get(0).tagName.toLowerCase()?j=d.element.prop("multiple"):(j=d.multiple||!1,"tags"in d&&(d.multiple=j=!0)),g=j?new f:new e,g.init(d);else{if("string"!=typeof c[0])throw"Invalid arguments to select2 plugin: "+c;if(o(c[0],k)<0)throw"Unknown method: "+c[0];if(i=b,g=a(this).data("select2"),g===b)return;if(h=c[0],"container"===h?i=g.container:"dropdown"===h?i=g.dropdown:(n[h]&&(h=n[h]),i=g[h].apply(g,c.slice(1))),o(c[0],l)>=0||o(c[0],m)&&1==c.length)return!1}}),i===b?this:i},a.fn.select2.defaults={width:"copy",loadMorePadding:0,closeOnSelect:!0,openOnEnter:!0,containerCss:{},dropdownCss:{},containerCssClass:"",dropdownCssClass:"",formatResult:function(a,b,c,d){var e=[];return E(a.text,c.term,e,d),e.join("")},formatSelection:function(a,c,d){return a?d(a.text):b},sortResults:function(a){return a},formatResultCssClass:function(){return b},formatSelectionCssClass:function(){return b},formatNoMatches:function(){return"No matches found"},formatInputTooShort:function(a,b){var c=b-a.length;return"Please enter "+c+" more character"+(1==c?"":"s")},formatInputTooLong:function(a,b){var c=a.length-b;return"Please delete "+c+" character"+(1==c?"":"s")},formatSelectionTooBig:function(a){return"You can only select "+a+" item"+(1==a?"":"s")},formatLoadMore:function(){return"Loading more results..."},formatSearching:function(){return"Searching..."},minimumResultsForSearch:0,minimumInputLength:0,maximumInputLength:null,maximumSelectionSize:0,id:function(a){return a.id},matcher:function(a,b){return n(""+b).toUpperCase().indexOf(n(""+a).toUpperCase())>=0},separator:",",tokenSeparators:[],tokenizer:M,escapeMarkup:F,blurOnChange:!1,selectOnBlur:!1,adaptContainerCssClass:function(a){return a},adaptDropdownCssClass:function(){return null},nextSearchTerm:function(){return b}},a.fn.select2.ajaxDefaults={transport:a.ajax,params:{type:"GET",cache:!1,dataType:"json"}},window.Select2={query:{ajax:G,local:H,tags:I},util:{debounce:v,markMatch:E,escapeMarkup:F,stripDiacritics:n},"class":{"abstract":d,single:e,multi:f}}}}(jQuery);
;var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
  iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
  typeOfCanvas = typeof HTMLCanvasElement,
  nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
  textSupport = nativeCanvasSupport 
  && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

/**
 * Log object
 */ 
var Log = {
  elem: false,
  write: function(txt){
    if (!this.elem) {
      this.elem = $('#log');
    }      
    // this.elem.attr("style", "opacity:1;");
    this.elem.text(txt);
    // this.elem.attr("style", "opacity:0;")
  },
  loading: function(txt){
    if (!this.elem) {
      this.elem = $('#log');
    }      
    this.elem.attr("style", "opacity:1;")    
    this.elem.text('loading...');
  },
  done: function(txt){
    if (!this.elem) {
      this.elem = $('#log');
    }      
    this.elem.attr("style", "opacity:0;")    
    // this.elem.text('done');
  }
};

/**
 *  Spinner object
 */

var Spinner = {
   elem: false,
   show: function () {
     if (!this.elem) {
       this.elem = $("#spinner");
     }
     this.elem.attr("style", "display:block;");
     
   },
   hide: function () {
     if (!this.elem) {
       this.elem = $("#spinner");
     }
     this.elem.attr("style", "display:none;");
   } 
};
/*
function showSpinner () {
 $("#spinner").
   attr("style", "display:block;");
}
*/

// (jul: new init function. new test data)


function init(){
    //init data
    var json = "{id:\"node02\", name:\"lorem ipsum dolor sit amet lorem ipsum dolor sit amet\", data:{}, children:[{id:\"node13\", name:\"lorem ipsum dolor sit amet\", data:{}, children:[{id:\"node24\", name:\"lorem ipsum dolor sit amet\", data:{}, children:[{id:\"node35\", name:\"3.5\", data:{}, children:[{id:\"node46\", name:\"4.6\", data:{}, children:[]}]}, {id:\"node37\", name:\"3.7\", data:{}, children:[{id:\"node48\", name:\"4.8\", data:{}, children:[]}, {id:\"node49\", name:\"4.9\", data:{}, children:[]}, {id:\"node410\", name:\"4.10\", data:{}, children:[]}, {id:\"node411\", name:\"4.11\", data:{}, children:[]}]}, {id:\"node312\", name:\"3.12\", data:{}, children:[{id:\"node413\", name:\"4.13\", data:{}, children:[]}]}, {id:\"node314\", name:\"3.14\", data:{}, children:[{id:\"node415\", name:\"4.15\", data:{}, children:[]}, {id:\"node416\", name:\"4.16\", data:{}, children:[]}, {id:\"node417\", name:\"4.17\", data:{}, children:[]}, {id:\"node418\", name:\"4.18\", data:{}, children:[]}]}, {id:\"node319\", name:\"3.19\", data:{}, children:[{id:\"node420\", name:\"4.20\", data:{}, children:[]}, {id:\"node421\", name:\"4.21\", data:{}, children:[]}]}]}, {id:\"node222\", name:\"2.22\", data:{}, children:[{id:\"node323\", name:\"3.23\", data:{}, children:[{id:\"node424\", name:\"4.24\", data:{}, children:[]}]}]}]}, {id:\"node125\", name:\"1.25\", data:{}, children:[{id:\"node226\", name:\"2.26\", data:{}, children:[{id:\"node327\", name:\"3.27\", data:{}, children:[{id:\"node428\", name:\"4.28\", data:{}, children:[]}, {id:\"node429\", name:\"4.29\", data:{}, children:[]}]}, {id:\"node330\", name:\"3.30\", data:{}, children:[{id:\"node431\", name:\"4.31\", data:{}, children:[]}]}, {id:\"node332\", name:\"3.32\", data:{}, children:[{id:\"node433\", name:\"4.33\", data:{}, children:[]}, {id:\"node434\", name:\"4.34\", data:{}, children:[]}, {id:\"node435\", name:\"4.35\", data:{}, children:[]}, {id:\"node436\", name:\"4.36\", data:{}, children:[]}]}]}, {id:\"node237\", name:\"2.37\", data:{}, children:[{id:\"node338\", name:\"3.38\", data:{}, children:[{id:\"node439\", name:\"4.39\", data:{}, children:[]}, {id:\"node440\", name:\"4.40\", data:{}, children:[]}, {id:\"node441\", name:\"4.41\", data:{}, children:[]}]}, {id:\"node342\", name:\"3.42\", data:{}, children:[{id:\"node443\", name:\"4.43\", data:{}, children:[]}]}, {id:\"node344\", name:\"3.44\", data:{}, children:[{id:\"node445\", name:\"4.45\", data:{}, children:[]}, {id:\"node446\", name:\"4.46\", data:{}, children:[]}, {id:\"node447\", name:\"4.47\", data:{}, children:[]}]}, {id:\"node348\", name:\"3.48\", data:{}, children:[{id:\"node449\", name:\"4.49\", data:{}, children:[]}, {id:\"node450\", name:\"4.50\", data:{}, children:[]}, {id:\"node451\", name:\"4.51\", data:{}, children:[]}, {id:\"node452\", name:\"4.52\", data:{}, children:[]}, {id:\"node453\", name:\"4.53\", data:{}, children:[]}]}, {id:\"node354\", name:\"3.54\", data:{}, children:[{id:\"node455\", name:\"4.55\", data:{}, children:[]}, {id:\"node456\", name:\"4.56\", data:{}, children:[]}, {id:\"node457\", name:\"4.57\", data:{}, children:[]}]}]}, {id:\"node258\", name:\"2.58\", data:{}, children:[{id:\"node359\", name:\"3.59\", data:{}, children:[{id:\"node460\", name:\"4.60\", data:{}, children:[]}, {id:\"node461\", name:\"4.61\", data:{}, children:[]}, {id:\"node462\", name:\"4.62\", data:{}, children:[]}, {id:\"node463\", name:\"4.63\", data:{}, children:[]}, {id:\"node464\", name:\"4.64\", data:{}, children:[]}]}]}]}, {id:\"node165\", name:\"1.65\", data:{}, children:[{id:\"node266\", name:\"2.66\", data:{}, children:[{id:\"node367\", name:\"3.67\", data:{}, children:[{id:\"node468\", name:\"4.68\", data:{}, children:[]}, {id:\"node469\", name:\"4.69\", data:{}, children:[]}, {id:\"node470\", name:\"4.70\", data:{}, children:[]}, {id:\"node471\", name:\"4.71\", data:{}, children:[]}]}, {id:\"node372\", name:\"3.72\", data:{}, children:[{id:\"node473\", name:\"4.73\", data:{}, children:[]}, {id:\"node474\", name:\"4.74\", data:{}, children:[]}, {id:\"node475\", name:\"4.75\", data:{}, children:[]}, {id:\"node476\", name:\"4.76\", data:{}, children:[]}]}, {id:\"node377\", name:\"3.77\", data:{}, children:[{id:\"node478\", name:\"4.78\", data:{}, children:[]}, {id:\"node479\", name:\"4.79\", data:{}, children:[]}]}, {id:\"node380\", name:\"3.80\", data:{}, children:[{id:\"node481\", name:\"4.81\", data:{}, children:[]}, {id:\"node482\", name:\"4.82\", data:{}, children:[]}]}]}, {id:\"node283\", name:\"2.83\", data:{}, children:[{id:\"node384\", name:\"3.84\", data:{}, children:[{id:\"node485\", name:\"4.85\", data:{}, children:[]}]}, {id:\"node386\", name:\"3.86\", data:{}, children:[{id:\"node487\", name:\"4.87\", data:{}, children:[]}, {id:\"node488\", name:\"4.88\", data:{}, children:[]}, {id:\"node489\", name:\"4.89\", data:{}, children:[]}, {id:\"node490\", name:\"4.90\", data:{}, children:[]}, {id:\"node491\", name:\"4.91\", data:{}, children:[]}]}, {id:\"node392\", name:\"3.92\", data:{}, children:[{id:\"node493\", name:\"4.93\", data:{}, children:[]}, {id:\"node494\", name:\"4.94\", data:{}, children:[]}, {id:\"node495\", name:\"4.95\", data:{}, children:[]}, {id:\"node496\", name:\"4.96\", data:{}, children:[]}]}, {id:\"node397\", name:\"3.97\", data:{}, children:[{id:\"node498\", name:\"4.98\", data:{}, children:[]}]}, {id:\"node399\", name:\"3.99\", data:{}, children:[{id:\"node4100\", name:\"4.100\", data:{}, children:[]}, {id:\"node4101\", name:\"4.101\", data:{}, children:[]}, {id:\"node4102\", name:\"4.102\", data:{}, children:[]}, {id:\"node4103\", name:\"4.103\", data:{}, children:[]}]}]}, {id:\"node2104\", name:\"2.104\", data:{}, children:[{id:\"node3105\", name:\"3.105\", data:{}, children:[{id:\"node4106\", name:\"4.106\", data:{}, children:[]}, {id:\"node4107\", name:\"4.107\", data:{}, children:[]}, {id:\"node4108\", name:\"4.108\", data:{}, children:[]}]}]}, {id:\"node2109\", name:\"2.109\", data:{}, children:[{id:\"node3110\", name:\"3.110\", data:{}, children:[{id:\"node4111\", name:\"4.111\", data:{}, children:[]}, {id:\"node4112\", name:\"4.112\", data:{}, children:[]}]}, {id:\"node3113\", name:\"3.113\", data:{}, children:[{id:\"node4114\", name:\"4.114\", data:{}, children:[]}, {id:\"node4115\", name:\"4.115\", data:{}, children:[]}, {id:\"node4116\", name:\"4.116\", data:{}, children:[]}]}, {id:\"node3117\", name:\"3.117\", data:{}, children:[{id:\"node4118\", name:\"4.118\", data:{}, children:[]}, {id:\"node4119\", name:\"4.119\", data:{}, children:[]}, {id:\"node4120\", name:\"4.120\", data:{}, children:[]}, {id:\"node4121\", name:\"4.121\", data:{}, children:[]}]}, {id:\"node3122\", name:\"3.122\", data:{}, children:[{id:\"node4123\", name:\"4.123\", data:{}, children:[]}, {id:\"node4124\", name:\"4.124\", data:{}, children:[]}]}]}, {id:\"node2125\", name:\"2.125\", data:{}, children:[{id:\"node3126\", name:\"3.126\", data:{}, children:[{id:\"node4127\", name:\"4.127\", data:{}, children:[]}, {id:\"node4128\", name:\"4.128\", data:{}, children:[]}, {id:\"node4129\", name:\"4.129\", data:{}, children:[]}]}]}]}, {id:\"node1130\", name:\"1.130\", data:{}, children:[{id:\"node2131\", name:\"2.131\", data:{}, children:[{id:\"node3132\", name:\"3.132\", data:{}, children:[{id:\"node4133\", name:\"4.133\", data:{}, children:[]}, {id:\"node4134\", name:\"4.134\", data:{}, children:[]}, {id:\"node4135\", name:\"4.135\", data:{}, children:[]}, {id:\"node4136\", name:\"4.136\", data:{}, children:[]}, {id:\"node4137\", name:\"4.137\", data:{}, children:[]}]}]}, {id:\"node2138\", name:\"2.138\", data:{}, children:[{id:\"node3139\", name:\"3.139\", data:{}, children:[{id:\"node4140\", name:\"4.140\", data:{}, children:[]}, {id:\"node4141\", name:\"4.141\", data:{}, children:[]}]}, {id:\"node3142\", name:\"3.142\", data:{}, children:[{id:\"node4143\", name:\"4.143\", data:{}, children:[]}, {id:\"node4144\", name:\"4.144\", data:{}, children:[]}, {id:\"node4145\", name:\"4.145\", data:{}, children:[]}, {id:\"node4146\", name:\"4.146\", data:{}, children:[]}, {id:\"node4147\", name:\"4.147\", data:{}, children:[]}]}]}]}]}";
    //end
    
    //A client-side tree generator
    var getTree = (function() {
        var i = 0;
        return function(nodeId, level) {
          var subtree = eval('(' + json.replace(/id:\"([a-zA-Z0-9]+)\"/g, 
          function(all, match) {
            return "id:\"" + match + "_" + i + "\""  
          }) + ')');
          $jit.json.prune(subtree, level); i++;
          return {
              'id': nodeId,
              'children': subtree.children
          };
        };
    })();
    
    //Implement a node rendering function called 'nodeline' that plots a straight line
    //when contracting or expanding a subtree.
    $jit.ST.Plot.NodeTypes.implement({
        'nodeline': {
          'render': function(node, canvas, animating) {
                if(animating === 'expand' || animating === 'contract') {
                  var pos = node.pos.getc(true), nconfig = this.node, data = node.data;
                  var width  = nconfig.width, height = nconfig.height;
                  var algnPos = this.getAlignedPos(pos, width, height);
                  var ctx = canvas.getCtx(), ort = this.config.orientation;
                  ctx.beginPath();
                  if(ort == 'left' || ort == 'right') {
                      ctx.moveTo(algnPos.x, algnPos.y + height / 2);
                      ctx.lineTo(algnPos.x + width, algnPos.y + height / 2);
                  } else {
                      ctx.moveTo(algnPos.x + width / 2, algnPos.y);
                      ctx.lineTo(algnPos.x + width / 2, algnPos.y + height);
                  }
                  ctx.stroke();
              } 
          }
        }
          
    });

    //Create a new ST instance
    var st = new $jit.ST({
        injectInto: 'infovis',
        orientation: 'bottom',
        //set duration for the animation
        duration: 800,
        //set animation transition type
        transition: $jit.Trans.Quart.easeInOut,
        //set distance between node and its children
        levelDistance: 80,
        //set max levels to show. Useful when used with
        //the request method for requesting trees of specific depth
        levelsToShow: 1,
        //set node and edge styles
        //set overridable=true for styling individual
        //nodes or edges
        Navigation: {
          enable:true,
          panning:true,
          zppming:10
	},
        Node: {
            height: 20,
            width: 80,
            //use a custom
            //node rendering function
            type: 'nodeline',
            color:'#23A4FF',
            lineWidth: 2,
            align:"center",
            overridable: true
        },
        
        Edge: {
            type: 'bezier',
            lineWidth: 2,
            color: '#000000',
            // color:'#23A4FF',
            overridable: true
        },
        
        //Add a request method for requesting on-demand json trees. 
        //This method gets called when a node
        //is clicked and its subtree has a smaller depth
        //than the one specified by the levelsToShow parameter.
        //In that case a subtree is requested and is added to the dataset.
        //This method is asynchronous, so you can make an Ajax request for that
        //subtree and then handle it to the onComplete callback.
        //Here we just use a client-side tree generator (the getTree function).
        request: function(nodeId, level, onComplete) {
          var ans = getTree(nodeId, level);
          onComplete.onComplete(nodeId, ans);  
        },
        
        onBeforeCompute: function(node){
            // Log.write("loading " + node.name);
            Log.loading();
            // showSpinner();
        },
        
        onAfterCompute: function(){
            // Log.write("done");
            Log.done();
            Spinner.hide();
        },
        
        //This method is called on DOM label creation.
        //Use this method to add event handlers and styles to
        //your node.
        onCreateLabel: function(label, node){
            label.id = node.id;            
            label.innerHTML = node.name;
            label.onclick = function(){
                st.onClick(node.id);
            };
            //set label styles
            var style = label.style;
            style.width = 80 + 'px';
            style.height = 'auto';            
            style.cursor = 'pointer';
            // style.color = 'black';
    	    // style.backgroundColor = '#1a1a1a';
            style.fontSize = '12px';
            style.textAlign= 'center';
            style.textDecoration = 'none';
            style.paddingTop = '0';
        },
        
        //This method is called right before plotting
        //a node. It's useful for changing an individual node
        //style properties before plotting it.
        //The data properties prefixed with a dollar
        //sign will override the global node style properties.
        onBeforePlotNode: function(node){
            //add some color to the nodes in the path between the
            //root node and the selected node.
            if (node.selected) {
                node.data.$color = "#ff7";

                // (jul) focus
                // node.data.$color = "#23A4FF";
                
            }
            else {
                delete node.data.$color;
            }
        },
        //This method is called right before plotting
        //an edge. It's useful for changing an individual edge
        //style properties before plotting it.
        //Edge data proprties prefixed with a dollar sign will
        //override the Edge global style properties.
        onBeforePlotLine: function(adj){
            if (adj.nodeFrom.selected && adj.nodeTo.selected) {
                // adj.data.$color = "#eed";
		// jul: selected path line color 
		adj.data.$color = "#23A4FF";
                adj.data.$lineWidth = 3;
            }
            else {
                delete adj.data.$color;
                delete adj.data.$lineWidth;
            }
        },
        onPlaceLabel: function(label, node, controllers){          
            //override label styles
            var style = label.style;  
            if (node.selected) {    
              style.color = '#23A4FF';
              style.fontSize = '16px';
              style.fontWeight = 'bold';
            }
            else {
              style.color = '#000000';
              style.fontSize = '14px';
              style.fontWeight = 'normal';
            }
            // show the label and let the canvas clip it
            style.display = ''; 
        }

    });
    //load json data
    st.loadJSON(eval( '(' + json + ')' ));
    //compute node positions and layout
    st.compute();
    //emulate a click on the root node.
    st.onClick(st.root);
   


}


;(function() {
  var WebSocket = window.WebSocket || window.MozWebSocket;
  var br = window.brunch || {};
  var ar = br['auto-reload'] || {};
  if (!WebSocket || !ar.enabled) return;

  var cacheBuster = function(url){
    var date = Math.round(Date.now() / 1000).toString();
    url = url.replace(/(\&|\\?)cacheBuster=\d*/, '');
    return url + (url.indexOf('?') >= 0 ? '&' : '?') +'cacheBuster=' + date;
  };

  var reloaders = {
    page: function(){
      window.location.reload(true);
    },

    stylesheet: function(){
      [].slice
        .call(document.querySelectorAll('link[rel="stylesheet"]'))
        .filter(function(link){
          return (link != null && link.href != null);
        })
        .forEach(function(link) {
          link.href = cacheBuster(link.href);
        });
    }
  };
  var port = ar.port || 9485;
  var host = (!br['server']) ? window.location.hostname : br['server'];
  var connection = new WebSocket('ws://' + host + ':' + port);
  connection.onmessage = function(event) {
    var message = event.data;
    var b = window.brunch;
    if (!b || !b['auto-reload'] || !b['auto-reload'].enabled) return;
    if (reloaders[message] != null) {
      reloaders[message]();
    } else {
      reloaders.page();
    }
  };
})();

;// lib/handlebars/base.js

/*jshint eqnull:true*/
this.Handlebars = {};

(function(Handlebars) {

Handlebars.VERSION = "1.0.rc.1";

Handlebars.helpers  = {};
Handlebars.partials = {};

Handlebars.registerHelper = function(name, fn, inverse) {
  if(inverse) { fn.not = inverse; }
  this.helpers[name] = fn;
};

Handlebars.registerPartial = function(name, str) {
  this.partials[name] = str;
};

Handlebars.registerHelper('helperMissing', function(arg) {
  if(arguments.length === 2) {
    return undefined;
  } else {
    throw new Error("Could not find property '" + arg + "'");
  }
});

var toString = Object.prototype.toString, functionType = "[object Function]";

Handlebars.registerHelper('blockHelperMissing', function(context, options) {
  var inverse = options.inverse || function() {}, fn = options.fn;


  var ret = "";
  var type = toString.call(context);

  if(type === functionType) { context = context.call(this); }

  if(context === true) {
    return fn(this);
  } else if(context === false || context == null) {
    return inverse(this);
  } else if(type === "[object Array]") {
    if(context.length > 0) {
      return Handlebars.helpers.each(context, options);
    } else {
      return inverse(this);
    }
  } else {
    return fn(context);
  }
});

Handlebars.K = function() {};

Handlebars.createFrame = Object.create || function(object) {
  Handlebars.K.prototype = object;
  var obj = new Handlebars.K();
  Handlebars.K.prototype = null;
  return obj;
};

Handlebars.registerHelper('each', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  var ret = "", data;

  if (options.data) {
    data = Handlebars.createFrame(options.data);
  }

  if(context && context.length > 0) {
    for(var i=0, j=context.length; i<j; i++) {
      if (data) { data.index = i; }
      ret = ret + fn(context[i], { data: data });
    }
  } else {
    ret = inverse(this);
  }
  return ret;
});

Handlebars.registerHelper('if', function(context, options) {
  var type = toString.call(context);
  if(type === functionType) { context = context.call(this); }

  if(!context || Handlebars.Utils.isEmpty(context)) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

Handlebars.registerHelper('unless', function(context, options) {
  var fn = options.fn, inverse = options.inverse;
  options.fn = inverse;
  options.inverse = fn;

  return Handlebars.helpers['if'].call(this, context, options);
});

Handlebars.registerHelper('with', function(context, options) {
  return options.fn(context);
});

Handlebars.registerHelper('log', function(context) {
  Handlebars.log(context);
});

}(this.Handlebars));
;
// lib/handlebars/utils.js
Handlebars.Exception = function(message) {
  var tmp = Error.prototype.constructor.apply(this, arguments);

  for (var p in tmp) {
    if (tmp.hasOwnProperty(p)) { this[p] = tmp[p]; }
  }

  this.message = tmp.message;
};
Handlebars.Exception.prototype = new Error();

// Build out our basic SafeString type
Handlebars.SafeString = function(string) {
  this.string = string;
};
Handlebars.SafeString.prototype.toString = function() {
  return this.string.toString();
};

(function() {
  var escape = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "`": "&#x60;"
  };

  var badChars = /[&<>"'`]/g;
  var possible = /[&<>"'`]/;

  var escapeChar = function(chr) {
    return escape[chr] || "&amp;";
  };

  Handlebars.Utils = {
    escapeExpression: function(string) {
      // don't escape SafeStrings, since they're already safe
      if (string instanceof Handlebars.SafeString) {
        return string.toString();
      } else if (string == null || string === false) {
        return "";
      }

      if(!possible.test(string)) { return string; }
      return string.replace(badChars, escapeChar);
    },

    isEmpty: function(value) {
      if (typeof value === "undefined") {
        return true;
      } else if (value === null) {
        return true;
      } else if (value === false) {
        return true;
      } else if(Object.prototype.toString.call(value) === "[object Array]" && value.length === 0) {
        return true;
      } else {
        return false;
      }
    }
  };
})();;
// lib/handlebars/runtime.js
Handlebars.VM = {
  template: function(templateSpec) {
    // Just add water
    var container = {
      escapeExpression: Handlebars.Utils.escapeExpression,
      invokePartial: Handlebars.VM.invokePartial,
      programs: [],
      program: function(i, fn, data) {
        var programWrapper = this.programs[i];
        if(data) {
          return Handlebars.VM.program(fn, data);
        } else if(programWrapper) {
          return programWrapper;
        } else {
          programWrapper = this.programs[i] = Handlebars.VM.program(fn);
          return programWrapper;
        }
      },
      programWithDepth: Handlebars.VM.programWithDepth,
      noop: Handlebars.VM.noop
    };

    return function(context, options) {
      options = options || {};
      return templateSpec.call(container, Handlebars, context, options.helpers, options.partials, options.data);
    };
  },

  programWithDepth: function(fn, data, $depth) {
    var args = Array.prototype.slice.call(arguments, 2);

    return function(context, options) {
      options = options || {};

      return fn.apply(this, [context, options.data || data].concat(args));
    };
  },
  program: function(fn, data) {
    return function(context, options) {
      options = options || {};

      return fn(context, options.data || data);
    };
  },
  noop: function() { return ""; },
  invokePartial: function(partial, name, context, helpers, partials, data) {
    var options = { helpers: helpers, partials: partials, data: data };

    if(partial === undefined) {
      throw new Handlebars.Exception("The partial " + name + " could not be found");
    } else if(partial instanceof Function) {
      return partial(context, options);
    } else if (!Handlebars.compile) {
      throw new Handlebars.Exception("The partial " + name + " could not be compiled when running in runtime-only mode");
    } else {
      partials[name] = Handlebars.compile(partial, {data: data !== undefined});
      return partials[name](context, options);
    }
  }
};

Handlebars.template = Handlebars.VM.template;
;

;
//# sourceMappingURL=vendor.js.map