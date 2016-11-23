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

    public readonly IsDebug: boolean = (window.location.href.match(/_infd\=on/ig) || []).length > 0;
    public readonly HasNativeISODate: boolean = typeof Date.prototype.toISOString !== 'undefined';
    public readonly IsIE: boolean = (navigator.appVersion.match(/MSIE ([\d.]+)/) || []).length > 0;
}