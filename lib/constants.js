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
