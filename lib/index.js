"use strict";
var constants_1 = require('./constants');
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
            return n < 10 ? "0" + n : "" + (n + "");
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
        var _this = this;
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (constants.IsIE) {
            window.console.log.apply(window.console, arguments);
            return;
        }
        args[0] = this.getLocalTime() + " " + this.logPrefix + " " + args[0];
        var style = null;
        if (!(constants.IsSafari == true)) {
            style = this.colors[severity];
            args[0] = "%c" + args[0];
        }
        var nonString = [];
        args.forEach(function (item, i) {
            if (!(item.charCodeAt && item.substr) || !isNaN(parseFloat(item)) && isFinite(item)) {
                nonString.push(item);
                args[i] = "";
            }
        });
        var stringToLog = args.join(" ");
        window.console.log(stringToLog, style);
        nonString.forEach(function (obj) {
            _this.dir(obj);
        });
        return;
    };
    Logger.prototype.log = function (severity) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        var severityStr = this.severityMap[severity];
        if (!severityStr) {
            this.writeToConsole.apply(this, [("[ai-lib-logging] severity " + severity + " is not valid")]);
            return;
        }
        if (args.length > 0) {
            args.unshift("[" + severityStr + "]");
            this.loghistory.unshift({ severity: severityStr, message: args });
            if (severity <= this.minseverity && constants.HasConsoleLog) {
                this.writeToConsole.apply(this, [severityStr].concat(args));
            }
        }
        return;
    };
    Logger.prototype.debug = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        this.log.apply(this, [Logger.severity.debug].concat(args));
        return;
    };
    Logger.prototype.info = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        this.log.apply(this, [Logger.severity.info].concat(args));
        return;
    };
    Logger.prototype.warn = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        this.log.apply(this, [Logger.severity.warn].concat(args));
        return;
    };
    Logger.prototype.error = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
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
    Logger.prototype.dump = function (all) {
        var _this = this;
        if (all === void 0) { all = false; }
        this.loghistory.forEach(function (item) {
            if (all || Logger.severity[item.severity] <= _this.minseverity) {
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
    Logger.severity = {
        debug: 4,
        warn: 2,
        error: 1,
        info: 3
    };
    return Logger;
}());
exports.Logger = Logger;
