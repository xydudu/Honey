var PROJECT="i.hunantv",VERSION="20121017",DEV=!0,COMBO=!1,COMBOURL="http://honey.hunantv.com/combo/",ROOT="http://honey.hunantv.com/i/js",PUBROOT="http://honey.hunantv.com/src",CSS="http://honey.hunantv.com/css";(function(e,t,n){function d(e,t){if(e.state==p)return t&&t();if(e.state==h)return i.ready(e.name,t);if(e.state==c)return e.onpreload.push(function(){d(e,t)});e.state=h,b(e.src,function(){e.state=p,w(s[e.name],function(t){E(t),s[e.name]=[]}),t&&t()})}function v(e,t){var n=e.length,r=e.shift(),i=y(r);n>1?(w(e,function(e){m(y(e))}),d(i,function(){v.call(null,e,t)})):d(i,t)}function m(e){var t=e;t.state||(t.state=c,t.onpreload=[],b({src:t.src,type:"cache"},function(){g(e)}))}function g(e){e.state=l,w(e.onpreload,function(e){e.call()})}function y(e){var t=i.trim(e);if(o[t])return o[t];var n=t.indexOf(":")>0,r=n?PUBROOT:ROOT,s=n?t.split(":"):t.split("_"),u=s[0]+"/"+s[1]+(DEV?".source":"")+".js",a={name:t,src:r+"/"+u+"?v"+VERSION};return o[t]=a,a}function b(e,n){var i=t.createElement("script");i.type="text/"+(e.type||"javascript"),i.src=e.src||e,i.async=!1,i.onreadystatechange=i.onload=function(){var e=i.readyState;!n.done&&(!e||/loaded|complete/.test(e))&&(n.done=!0,n())},(t.body||r).appendChild(i)}function w(e,t){if(!e)return;typeof e=="object"&&(e=[].slice.call(e));for(var n=0,r=e.length;n<r;n++)t.call(e,e[n],n)}function E(e){if(!e||e._done)return;e(),e._done=1}function S(e){var t=e||o,n=1;for(var r in t)t[r].state!==p&&(n=0);return n}var r=t.documentElement,i=function(){this.version="3.0"},s={},o={},u={},a={},f=t.createElement("script").async===!0||"MozAppearance"in t.documentElement.style||window.opera,l=1,c=2,h=3,p=4;i.debug=function(e){var t=document.createElement("div");t.innerHTML=e,document.body.appendChild(t)},i.go=function(e,t){var n=e.split(","),r=t||null,s,o,a=u[e]||{scripts:[]};while(s=n.length){var f=y(n.shift());if(o===f.name)continue;o=f.name,a.state||a.scripts.push(f),d(f,function(){var t=u[e];t?S(t.scripts)&&E(r):E(r)}),s===1&&(o=null)}return u[e]=a,i},i.ready=function(e,t){var n=e.split(",").pop(),r=o[n];if(r&&r.state==p)return E(t),i;var u=s[n];return u?u.push(t):s[n]=[t],i},i.def=function(e,t){var n=e.split(","),r=function(){t(i)};ready=1,w(n,function(e){!o[e],o[e]&&o[e].state!==p&&(i.ready(e,r),ready=0)}),ready&&r()},i.css=function(e){var n=t.createElement("link");n.setAttribute("rel","stylesheet"),n.setAttribute("type","text/css"),n.setAttribute("href",e),(t.body||r).appendChild(n)},i.trim=function(e){return e.replace(/^\s+|\s+$/g,"")},i.ie=function(){var e,t=3,n=document.createElement("div");while(n.innerHTML="<!--[if gt IE "+ ++t+"]><i></i><![endif]-->",n.getElementsByTagName("i")[0]);return t>4?t:e}(),e.H=e.Honey=e.honey=e.HN=i})(window,document);