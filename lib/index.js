"use strict";
var constants_1 = require('./constants');
var constants = constants_1.Constants.getInstance();
var Logger = (function () {
    function Logger(prefixName, prefixVersion) {
        var _this = this;
        this.logPrefix = "";
        this.loghistory = [];
        this.isDebug = constants.IsDebug;
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
        this.writeToConsole = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            arguments[0] = this.getLocalTime() + " " + this.logPrefix + " - " + arguments[0];
            if (constants.IsIE) {
                window.console.log.apply(window.console, arguments);
                return;
            }
            switch (arguments.length) {
                case 1: {
                    window.console.log(arguments[0]);
                    break;
                }
                case 2: {
                    window.console.log(arguments[0], arguments[1]);
                    break;
                }
                case 3: {
                    window.console.log(arguments[0], arguments[1]);
                    break;
                }
                default: {
                    window.console.log(arguments[0], arguments[1], arguments[2]);
                }
            }
            return;
        };
        this.log = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i - 0] = arguments[_i];
            }
            if (arguments.length > 0) {
                this.loghistory.push({ severity: "log", message: arguments });
                if (this.isDebug) {
                    this.writeToConsole.apply(this, arguments);
                }
            }
            return;
        };
        this.dump = function () {
            for (var _i = 0, _a = _this.loghistory; _i < _a.length; _i++) {
                var item = _a[_i];
                _this.writeToConsole.apply(_this, item.message);
            }
            return _this.loghistory;
        };
        this.traceError = function (err, tags) {
            if (err === void 0) { err = 'Unknown'; }
            if (tags === void 0) { tags = {}; }
            _this.log(err, tags);
        };
        if (prefixName && prefixVersion) {
            this.logPrefix = prefixName + " " + prefixVersion;
        }
    }
    Logger.getInstance = function (prefixName, prefixVersion) {
        if (!this.__instance) {
            this.__instance = new Logger(prefixName, prefixVersion);
        }
        return this.__instance;
    };
    Logger.prototype.setDebug = function (value) {
        this.isDebug = value;
    };
    return Logger;
}());
exports.Logger = Logger;
//# sourceMappingURL=index.js.map