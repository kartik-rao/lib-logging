var Logger =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var constants_1 = __webpack_require__(1);
	var constants = constants_1.Constants.getInstance();
	var Logger = (function () {
	    function Logger(prefix, minseverity) {
	        var _this = this;
	        this.severityMap = {
	            1: "error",
	            2: "warn",
	            3: "info",
	            4: "debug"
	        };
	        this.colors = {
	            "error": 'color: red',
	            "warn": 'color: darkorange',
	            "info": 'color: darkblue',
	            "debug": 'color: black',
	        };
	        this.logPrefix = "";
	        this.loghistory = [];
	        this.minseverity = Logger.severity.warn;
	        this.pad = function (n) {
	            return n < 10 ? "0" + n : n + "";
	        };
	        this.getLocalTime = function () {
	            var d = new Date();
	            d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
	            var isoDate = null;
	            if (constants.HasNativeISODate) {
	                isoDate = d.toISOString().slice(11, 19);
	            }
	            else {
	                isoDate = _this.pad(d.getHours()) + ":" + _this.pad(d.getMinutes()) + ":" + _this.pad(d.getSeconds());
	            }
	            return isoDate;
	        };
	        if (prefix) {
	            this.logPrefix = prefix;
	        }
	        if (minseverity) {
	            this.minseverity = minseverity;
	        }
	    }
	    Logger.getInstance = function (prefix, minseverity) {
	        if (!this.__instance) {
	            this.__instance = new Logger(prefix, minseverity);
	        }
	        return this.__instance;
	    };
	    Logger.prototype.writeToConsole = function (severity) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        if (constants.IsIE) {
	            window.console.log.apply(window.console, arguments);
	            return;
	        }
	        args[0] = this.getLocalTime() + " " + this.logPrefix + " " + args[0];
	        var consoleTarget = window.console[severity] || window.console["log"];
	        switch (args.length) {
	            case 1: {
	                consoleTarget.call(console, args[0]);
	                break;
	            }
	            case 2: {
	                consoleTarget.call(console, args[0], args[1]);
	                break;
	            }
	            case 3: {
	                consoleTarget.call(console, args[0], args[1], args[2]);
	                break;
	            }
	            case 4: {
	                consoleTarget.call(console, args[0], args[1], args[2], args[3]);
	                break;
	            }
	            default: {
	                consoleTarget.call(console, args[0], args[1], args[2], args[3], args[4]);
	            }
	        }
	        return;
	    };
	    Logger.prototype.log = function (severity) {
	        var args = [];
	        for (var _i = 1; _i < arguments.length; _i++) {
	            args[_i - 1] = arguments[_i];
	        }
	        var severityStr = this.severityMap[severity];
	        if (!severityStr) {
	            this.writeToConsole.apply(this, ["[ai-lib-logging] severity " + severity + " is not valid"]);
	            return;
	        }
	        if (args.length > 0) {
	            args.unshift("[" + severityStr + "]");
	            this.loghistory.push({ severity: severityStr, message: args });
	            if (severity <= this.minseverity && constants.HasConsoleLog) {
	                this.writeToConsole.apply(this, [severityStr].concat(args));
	            }
	        }
	        return;
	    };
	    Logger.prototype.debug = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        var severity = constants.HasConsoleDebug ? Logger.severity.debug : Logger.severity.info;
	        this.log.apply(this, [severity].concat(args));
	        return;
	    };
	    Logger.prototype.info = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        this.log.apply(this, [Logger.severity.info].concat(args));
	        return;
	    };
	    Logger.prototype.warn = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        this.log.apply(this, [Logger.severity.warn].concat(args));
	        return;
	    };
	    Logger.prototype.error = function () {
	        var args = [];
	        for (var _i = 0; _i < arguments.length; _i++) {
	            args[_i] = arguments[_i];
	        }
	        this.log.apply(this, [Logger.severity.error].concat(args));
	        return;
	    };
	    Logger.prototype.dir = function (obj) {
	        if (constants.HasConsoleDir) {
	            console.dir(obj);
	        }
	        else {
	            this.log(Logger.severity.info, obj);
	        }
	        return;
	    };
	    Logger.prototype.dirxml = function (obj) {
	        if (constants.HasConsoleDirXml) {
	            console.dirxml(obj);
	        }
	        else {
	            this.log(Logger.severity.info, obj);
	        }
	        return;
	    };
	    Logger.prototype.dump = function (loglevel) {
	        var _this = this;
	        if (loglevel === void 0) { loglevel = this.minseverity; }
	        this.loghistory.forEach(function (item) {
	            if (Logger.severity[item.severity] <= loglevel) {
	                _this.writeToConsole.apply(_this, [item.severity].concat(item.message));
	            }
	        });
	        return;
	    };
	    Logger.prototype.clear = function () {
	        this.loghistory = [];
	    };
	    Logger.prototype.getLogHistory = function () {
	        return this.loghistory;
	    };
	    return Logger;
	}());
	Logger.severity = {
	    debug: 4,
	    warn: 2,
	    error: 1,
	    info: 3
	};
	exports.Logger = Logger;


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	Object.defineProperty(exports, "__esModule", { value: true });
	var Constants = (function () {
	    function Constants() {
	        this.HasConsole = window.console;
	        this.HasConsoleLog = this.HasConsole && window.console.log;
	        this.HasConsoleDir = this.HasConsole && window.console.dir;
	        this.HasConsoleDebug = this.HasConsole && window.console.debug;
	        this.HasConsoleDirXml = this.HasConsole && window.console.dirxml;
	        this.HasNativeISODate = typeof Date.prototype.toISOString !== 'undefined';
	        this.IsIE = (navigator.appVersion.match(/MSIE ([\d.]+)/) || []).length > 0;
	        this.IsSafari = Object.prototype.toString.call(window['HTMLElement']).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || window['safari'].pushNotification);
	    }
	    Constants.getInstance = function () {
	        if (!this.__instance) {
	            this.__instance = new Constants();
	        }
	        return this.__instance;
	    };
	    return Constants;
	}());
	exports.Constants = Constants;


/***/ })
/******/ ]);
//# sourceMappingURL=logger.js.map