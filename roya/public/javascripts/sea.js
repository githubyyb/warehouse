
!function(e,r){function t(e){return function(r){return{}.toString.call(r)=="[object "+e+"]"}}function n(){return U++}function i(e){return e.match(O)[0]}function a(e){for(e=e.replace(q,"/");e.match(C);)e=e.replace(C,"/");return e=e.replace(I,"$1/")}function s(e){var r=e.length-1,t=e.charAt(r);return"#"===t?e.substring(0,r):".js"===e.substring(r-2)||e.indexOf("?")>0||".css"===e.substring(r-3)||"/"===t?e:e+".js"}function o(e){var r=A.alias;return r&&T(r[e])?r[e]:e}function u(e){var r,t=A.paths;return t&&(r=e.match(j))&&T(t[r[1]])&&(e=t[r[1]]+r[2]),e}function c(e){var r=A.vars;return r&&e.indexOf("{")>-1&&(e=e.replace(G,function(e,t){return T(r[t])?r[t]:e})),e}function f(e){var r=A.map,t=e;if(r)for(var n=0,i=r.length;i>n;n++){var a=r[n];if(t=w(a)?a(e)||e:e.replace(a[0],a[1]),t!==e)break}return t}function l(e,r){var t,n=e.charAt(0);if(R.test(e))t=e;else if("."===n)t=a((r?i(r):A.cwd)+e);else if("/"===n){var s=A.cwd.match(L);t=s?s[0]+e.substring(1):e}else t=A.base+e;return 0===t.indexOf("//")&&(t=location.protocol+t),t}function d(e,r){if(!e)return"";e=o(e),e=u(e),e=c(e),e=s(e);var t=l(e,r);return t=f(t)}function v(e){return e.hasAttribute?e.src:e.getAttribute("src",4)}function h(e,r,t,n){var i=P.test(e),a=$.createElement(i?"link":"script");t&&(a.charset=t),S(n)||a.setAttribute("crossorigin",n),p(a,r,i,e),i?(a.rel="stylesheet",a.href=e):(a.async=!0,a.src=e),V=a,M?K.insertBefore(a,M):K.appendChild(a),V=null}function p(e,r,t,n){function i(){e.onload=e.onerror=e.onreadystatechange=null,t||A.debug||K.removeChild(e),e=null,r()}var a="onload"in e;return!t||!W&&a?void(a?(e.onload=i,e.onerror=function(){N("error",{uri:n,node:e}),i()}):e.onreadystatechange=function(){/loaded|complete/.test(e.readyState)&&i()}):void setTimeout(function(){g(e,r)},1)}function g(e,r){var t,n=e.sheet;if(W)n&&(t=!0);else if(n)try{n.cssRules&&(t=!0)}catch(i){"NS_ERROR_DOM_SECURITY_ERR"===i.name&&(t=!0)}setTimeout(function(){t?r():g(e,r)},20)}function E(){if(V)return V;if(H&&"interactive"===H.readyState)return H;for(var e=K.getElementsByTagName("script"),r=e.length-1;r>=0;r--){var t=e[r];if("interactive"===t.readyState)return H=t}}function m(e){var r=[];return e.replace(J,"").replace(z,function(e,t,n){n&&r.push(n)}),r}function y(e,r){this.uri=e,this.dependencies=r||[],this.exports=null,this.status=0,this._waitings={},this._remain=0}if(!e.seajs){var b=e.seajs={version:"2.2.3"},A=b.data={},_=t("Object"),T=t("String"),D=Array.isArray||t("Array"),w=t("Function"),S=t("Undefined"),U=0,x=A.events={};b.on=function(e,r){var t=x[e]||(x[e]=[]);return t.push(r),b},b.off=function(e,r){if(!e&&!r)return x=A.events={},b;var t=x[e];if(t)if(r)for(var n=t.length-1;n>=0;n--)t[n]===r&&t.splice(n,1);else delete x[e];return b};var N=b.emit=function(e,r){var t,n=x[e];if(n)for(n=n.slice();t=n.shift();)t(r);return b},O=/[^?#]*\//,q=/\/\.\//g,C=/\/[^/]+\/\.\.\//,I=/([^:/])\/\//g,j=/^([^/:]+)(\/.+)$/,G=/{([^{]+)}/g,R=/^\/\/.|:\//,L=/^.*?\/\/.*?\//,$=document,k=i($.URL),X=$.scripts,B=$.getElementById("seajsnode")||X[X.length-1],F=i(v(B)||k);b.resolve=d;var V,H,K=$.head||$.getElementsByTagName("head")[0]||$.documentElement,M=K.getElementsByTagName("base")[0],P=/\.css(?:\?|$)/i,W=+navigator.userAgent.replace(/.*(?:AppleWebKit|AndroidWebKit)\/(\d+).*/,"$1")<536;b.request=h;var Y,z=/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'|\/\*[\S\s]*?\*\/|\/(?:\\\/|[^\/\r\n])+\/(?=[^\/])|\/\/.*|\.\s*require|(?:^|[^$])\brequire\s*\(\s*(["'])(.+?)\1\s*\)/g,J=/\\\\/g,Q=b.cache={},Z={},ee={},re={},te=y.STATUS={FETCHING:1,SAVED:2,LOADING:3,LOADED:4,EXECUTING:5,EXECUTED:6};y.prototype.resolve=function(){for(var e=this,r=e.dependencies,t=[],n=0,i=r.length;i>n;n++)t[n]=y.resolve(r[n],e.uri);return t},y.prototype.load=function(){var e=this;if(!(e.status>=te.LOADING)){e.status=te.LOADING;var r=e.resolve();N("load",r);for(var t,n=e._remain=r.length,i=0;n>i;i++)t=y.get(r[i]),t.status<te.LOADED?t._waitings[e.uri]=(t._waitings[e.uri]||0)+1:e._remain--;if(0===e._remain)return void e.onload();var a={};for(i=0;n>i;i++)t=Q[r[i]],t.status<te.FETCHING?t.fetch(a):t.status===te.SAVED&&t.load();for(var s in a)a.hasOwnProperty(s)&&a[s]()}},y.prototype.onload=function(){var e=this;e.status=te.LOADED,e.callback&&e.callback();var r,t,n=e._waitings;for(r in n)n.hasOwnProperty(r)&&(t=Q[r],t._remain-=n[r],0===t._remain&&t.onload());delete e._waitings,delete e._remain},y.prototype.fetch=function(e){function r(){b.request(a.requestUri,a.onRequest,a.charset,a.crossorigin)}function t(){delete Z[s],ee[s]=!0,Y&&(y.save(i,Y),Y=null);var e,r=re[s];for(delete re[s];e=r.shift();)e.load()}var n=this,i=n.uri;n.status=te.FETCHING;var a={uri:i};N("fetch",a);var s=a.requestUri||i;return!s||ee[s]?void n.load():Z[s]?void re[s].push(n):(Z[s]=!0,re[s]=[n],N("request",a={uri:i,requestUri:s,onRequest:t,charset:w(A.charset)?A.charset(s):A.charset,crossorigin:w(A.crossorigin)?A.crossorigin(s):A.crossorigin}),void(a.requested||(e?e[a.requestUri]=r:r())))},y.prototype.exec=function(){function e(r){return y.get(e.resolve(r)).exec()}var t=this;if(t.status>=te.EXECUTING)return t.exports;t.status=te.EXECUTING;var i=t.uri;e.resolve=function(e){return y.resolve(e,i)},e.async=function(r,t){return y.use(r,t,i+"_async_"+n()),e};var a=t.factory,s=w(a)?a(e,t.exports={},t):a;return s===r&&(s=t.exports),delete t.factory,t.exports=s,t.status=te.EXECUTED,N("exec",t),s},y.resolve=function(e,r){var t={id:e,refUri:r};return N("resolve",t),t.uri||b.resolve(t.id,r)},y.define=function(e,t,n){var i=arguments.length;1===i?(n=e,e=r):2===i&&(n=t,D(e)?(t=e,e=r):t=r),!D(t)&&w(n)&&(t=m(n.toString()));var a={id:e,uri:y.resolve(e),deps:t,factory:n};if(!a.uri&&$.attachEvent){var s=E();s&&(a.uri=s.src)}N("define",a),a.uri?y.save(a.uri,a):Y=a},y.save=function(e,r){var t=y.get(e);t.status<te.SAVED&&(t.id=r.id||e,t.dependencies=r.deps||[],t.factory=r.factory,t.status=te.SAVED)},y.get=function(e,r){return Q[e]||(Q[e]=new y(e,r))},y.use=function(r,t,n){var i=y.get(n,D(r)?r:[r]);i.callback=function(){for(var r=[],n=i.resolve(),a=0,s=n.length;s>a;a++)r[a]=Q[n[a]].exec();t&&t.apply(e,r),delete i.callback},i.load()},y.preload=function(e){var r=A.preload,t=r.length;t?y.use(r,function(){r.splice(0,t),y.preload(e)},A.cwd+"_preload_"+n()):e()},b.use=function(e,r){return y.preload(function(){y.use(e,r,A.cwd+"_use_"+n())}),b},y.define.cmd={},e.define=y.define,b.Module=y,A.fetchedList=ee,A.cid=n,b.require=function(e){var r=y.get(y.resolve(e));return r.status<te.EXECUTING&&(r.onload(),r.exec()),r.exports};var ne=/^(.+?\/)(\?\?)?(seajs\/)+/;A.base=(F.match(ne)||["",F])[1],A.dir=F,A.cwd=k,A.charset="utf-8",A.preload=function(){var e=[],r=location.search.replace(/(seajs-\w+)(&|$)/g,"$1=1$2");return r+=" "+$.cookie,r.replace(/(seajs-\w+)=1/g,function(r,t){e.push(t)}),e}(),b.config=function(e){for(var r in e){var t=e[r],n=A[r];if(n&&_(n))for(var i in t)n[i]=t[i];else D(n)?t=n.concat(t):"base"===r&&("/"!==t.slice(-1)&&(t+="/"),t=l(t)),A[r]=t}return N("config",e),b}}}(this);

define.amd="hoperun";
seajs.config({
    alias:{
	
        'jquery':'base/jquery.js',
		'bootstrap':'bootstrap.min.js',
        'swiper':'plugin/swiper.js',
        'execute':'action/request.js',
        'handlebars':'handlebars.js',
        'jsonp':'jsonp.js',
        'dotdotdot':'dotdotdot.js',
        'publicJs':'publicJs.js',
        'swiper':'swiper.js',
        'handlbars':'handlebars.js',
        'grayscale':'grayscale.js',
		'chart':'chart.js',
        'html2canvas':'html2canvas.js'
    },
    'map': [
              [ /^(.*\.(?:css|js))(.*)$/i, '$1?version=3.7.0' ]
      ]
});