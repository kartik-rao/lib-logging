this.Logger=function(f){function e(d){if(g[d])return g[d].exports;var b=g[d]={i:d,l:!1,exports:{}};f[d].call(b.exports,b,b.exports,e);b.l=!0;return b.exports}var g={};e.m=f;e.c=g;e.i=function(d){return d};e.d=function(d,b,c){e.o(d,b)||Object.defineProperty(d,b,{configurable:!1,enumerable:!0,get:c})};e.n=function(d){var b=d&&d.__esModule?function(){return d["default"]}:function(){return d};e.d(b,"a",b);return b};e.o=function(d,b){return Object.prototype.hasOwnProperty.call(d,b)};e.p="/assets/";return e(e.s=
1)}([function(f,e,g){Object.defineProperty(e,"__esModule",{value:!0});f=function(){function d(){this.HasConsoleLog=(this.HasConsole=window.console)&&window.console.log;this.HasConsoleDir=this.HasConsole&&window.console.dir;this.HasConsoleDebug=this.HasConsole&&window.console.debug;this.HasConsoleDirXml=this.HasConsole&&window.console.dirxml;this.HasNativeISODate="undefined"!==typeof Date.prototype.toISOString;this.IsIE=0<(navigator.appVersion.match(/MSIE ([\d.]+)/)||[]).length;this.IsSafari=0<Object.prototype.toString.call(window.HTMLElement).indexOf("Constructor")||
"[object SafariRemoteNotification]"===(!window.safari||window.safari.pushNotification).toString()}d.getInstance=function(){this.__instance||(this.__instance=new d);return this.__instance};return d}();e.Constants=f},function(f,e,g){Object.defineProperty(e,"__esModule",{value:!0});var d=g(0).Constants.getInstance();f=function(){function b(c,a){var h=this;this.severityMap={1:"error",2:"warn",3:"info",4:"debug"};this.colors={error:"color: red",warn:"color: darkorange",info:"color: darkblue",debug:"color: black"};
this.logPrefix="";this.loghistory=[];this.minseverity=b.severity.warn;this.pad=function(a){return 10>a?"0"+a:a+""};this.getLocalTime=function(){var a=new Date;a.setMinutes(a.getMinutes()-a.getTimezoneOffset());return d.HasNativeISODate?a.toISOString().slice(11,19):h.pad(a.getHours())+":"+h.pad(a.getMinutes())+":"+h.pad(a.getSeconds())};c&&(this.logPrefix=c);a&&(this.minseverity=a)}b.getInstance=function(c,a){this.__instance||(this.__instance=new b(c,a));return this.__instance};b.prototype.writeToConsole=
function(b){for(var a=[],c=1;c<arguments.length;c++)a[c-1]=arguments[c];if(d.IsIE)window.console.log.apply(window.console,arguments);else switch(a[0]=this.getLocalTime()+" "+this.logPrefix+" "+a[0],c=window.console[b]||window.console.log,a.length){case 1:c.call(console,a[0]);break;case 2:c.call(console,a[0],a[1]);break;case 3:c.call(console,a[0],a[1],a[2]);break;case 4:c.call(console,a[0],a[1],a[2],a[3]);break;default:c.call(console,a[0],a[1],a[2],a[3],a[4])}};b.prototype.log=function(c){for(var a=
[],b=1;b<arguments.length;b++)a[b-1]=arguments[b];b=this.severityMap[c];b?0<a.length&&(a.unshift("["+b+"]"),this.loghistory.push({severity:b,message:a}),c<=this.minseverity&&d.HasConsoleLog&&this.writeToConsole.apply(this,[b].concat(a))):this.writeToConsole.apply(this,["[ai-lib-logging] severity "+c+" is not valid"])};b.prototype.debug=function(){for(var c=[],a=0;a<arguments.length;a++)c[a]=arguments[a];this.log.apply(this,[d.HasConsoleDebug?b.severity.debug:b.severity.info].concat(c))};b.prototype.info=
function(){for(var c=[],a=0;a<arguments.length;a++)c[a]=arguments[a];this.log.apply(this,[b.severity.info].concat(c))};b.prototype.warn=function(){for(var c=[],a=0;a<arguments.length;a++)c[a]=arguments[a];this.log.apply(this,[b.severity.warn].concat(c))};b.prototype.error=function(){for(var c=[],a=0;a<arguments.length;a++)c[a]=arguments[a];this.log.apply(this,[b.severity.error].concat(c))};b.prototype.dir=function(c){d.HasConsoleDir?console.dir(c):this.log(b.severity.info,c)};b.prototype.dirxml=function(c){d.HasConsoleDirXml?
console.dirxml(c):this.log(b.severity.info,c)};b.prototype.dump=function(c){var a=this;void 0===c&&(c=this.minseverity);this.loghistory.forEach(function(d){b.severity[d.severity]<=c&&a.writeToConsole.apply(a,[d.severity].concat(d.message))})};b.prototype.clear=function(){this.loghistory=[]};b.prototype.getLogHistory=function(){return this.loghistory};return b}();f.severity={debug:4,warn:2,error:1,info:3};e.Logger=f}]);

//# sourceMappingURL=logging.js.map