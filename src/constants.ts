export class Constants {
    private static __instance: Constants;

    private constructor() {
    }

    public static getInstance() {
        if (!this.__instance) {
            this.__instance = new Constants();
        }
        return this.__instance;
    }

    public readonly HasConsoleLog = window.console && window.console.log
    public readonly HasConsoleDir = window.console && window.console.dir
    public readonly HasConsoleDirXml = window.console && window.console.dirxml
    public readonly HasNativeISODate: boolean = typeof Date.prototype.toISOString !== 'undefined';
    public readonly IsIE: boolean = (navigator.appVersion.match(/MSIE ([\d.]+)/) || []).length > 0;
    public readonly IsSafari: boolean = Object.prototype.toString.call(window['HTMLElement']).indexOf('Constructor') > 0 || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || window['safari'].pushNotification);
}