"use strict";
var Constants = (function () {
    function Constants() {
        this.IsDebug = (window.location.href.match(/_infd\=on/ig) || []).length > 0;
        this.HasNativeISODate = typeof Date.prototype.toISOString !== 'undefined';
        this.IsIE = (navigator.appVersion.match(/MSIE ([\d.]+)/) || []).length > 0;
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
//# sourceMappingURL=constants.js.map