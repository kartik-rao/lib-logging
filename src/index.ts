import { Constants } from './constants'
let constants: Constants = Constants.getInstance();

export interface ILogger {
    log: (...args: any[]) => void;
    dump: () => any[];
    traceError: (err: string, tags: any) => void;
}

export class Logger implements ILogger {
    private logPrefix: string = "";
    private loghistory: any[] = [];
    private isDebug: boolean = constants.IsDebug;
    private static __instance: Logger;

    private constructor(prefixName, prefixVersion) {
        if(prefixName && prefixVersion) {
            this.logPrefix = `${prefixName} ${prefixVersion}`;
        }
    }

    public static getInstance(prefixName?:string, prefixVersion?:string) {
        if (!this.__instance) {
            this.__instance = new Logger(prefixName, prefixVersion);
        }
        return this.__instance;
    }

    private pad = (n: number) => {
        return n < 10 ? `0${n}` : `${n + ""}`
    }

    public setDebug(value: boolean) { 
        this.isDebug = value;
    }

    private getLocalTime = () => {
        var d: Date = new Date();
        d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
        var isoDate: string = null;
        if (constants.HasNativeISODate) {
            isoDate = d.toISOString().slice(11, 19);
        } else {
            isoDate = `${this.pad(d.getHours())}:${this.pad(d.getMinutes())}:${this.pad(d.getSeconds())}`
        }
        return isoDate;
    }

    private writeToConsole = function (...args: any[]) {
        arguments[0] = `${this.getLocalTime()} ${this.logPrefix} - ${arguments[0]}`;
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
    }

    public log = function (...args: any[]) {
        if (arguments.length > 0) {
            this.loghistory.push({ severity: "log", message: arguments });
            if (this.isDebug) {
                this.writeToConsole.apply(this, arguments);
            }
        }
        return;
    }

    public dump = () => {
        for (var item of this.loghistory) {
            this.writeToConsole.apply(this, item.message);
        }
        return this.loghistory;
    }

    public traceError = (err: string = 'Unknown', tags: any = {}) => {
        this.log(err, tags);
    }
}