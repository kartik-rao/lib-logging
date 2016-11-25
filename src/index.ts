import { Constants } from './constants'
let constants: Constants = Constants.getInstance();

export interface ILogger {
    clear: () => void;
    debug: (...args: any[]) => void;
    dir: (obj: any) => void;
    dirxml: (obj: any) => void;
    dump: () => void;
    error: (...args: any[]) => void;
    info: (...args: any[]) => void;
    getLogHistory: () => any[];
    log: (sev: number, ...args: any[]) => void;
}

export class Logger implements ILogger {
    static readonly severity: any = {
        debug: <number>4,
        warn: <number>2,
        error: <number>1,
        info: <number>3
    };

    private severityMap: any = {
        1: "error",
        2: "warn",
        3: "info",
        4: "debug"
    };

    readonly colors: any = {
        "error": 'color: red',
        "warn" : 'color: darkorange',
        "info" : 'color: darkblue',
        "debug": 'color: black',
    };

    private logPrefix: string = "";
    private loghistory: any[] = [];
    private minseverity: number = Logger.severity.warn;
    private static __instance: Logger;

    private constructor(prefix, minseverity) {
        if (prefix) {
            this.logPrefix = prefix;
        }

        if (minseverity) {
            this.minseverity = minseverity;
        }
    }

    public static getInstance(prefix?: string, minseverity?: number) {
        if (!this.__instance) {
            this.__instance = new Logger(prefix, minseverity);
        }
        return this.__instance;
    }

    private pad = (n: number) => {
        return n < 10 ? `0${n}` : `${n + ""}`
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

    private writeToConsole(severity, ...args: any[]) {
        if (constants.IsIE) {
            window.console.log.apply(window.console, arguments);
            return;
        }

        args[0] = `${this.getLocalTime()} ${this.logPrefix} ${args[0]}`
        let consoleTarget = window.console[severity] || window.console["log"];

        switch(args.length) {
            case 1: {
                consoleTarget(args[0]);
                break;
            }
            case 2: {
                consoleTarget(args[0], args[1]);
                break;
            }
            case 3: {
                consoleTarget(args[0], args[1], args[2]);
                break;
            }
            case 4: {
                consoleTarget(args[0], args[1], args[2], args[3]);
                break;
            }
            case 5: {
                consoleTarget(args[0], args[1], args[2], args[3], args[4]);
                break;
            }
            default : {
                consoleTarget(args[0], args[1], args[2], args[3], args[4]);
            }
        } 
        return;
    }

    public log(severity: number, ...args: any[]) {
        let severityStr = this.severityMap[severity];
        if (!severityStr) {
            this.writeToConsole.apply(this, [`[ai-lib-logging] severity ${severity} is not valid`]);
            return;
        }
        if (args.length > 0) {
            args.unshift(`[${severityStr}]`);
            this.loghistory.push({ severity: severityStr, message: args });

            if (severity <= this.minseverity && constants.HasConsoleLog) {
                this.writeToConsole(severityStr, ...args);
            }
        }
        return;
    }

    public debug(...args: any[]) {
        this.log.apply(this, [Logger.severity.debug, ...args]);
        return;
    }

    public info(...args: any[]) {
        this.log.apply(this, [Logger.severity.info, ...args]);
        return;
    }

    public warn(...args: any[]) {
        this.log.apply(this, [Logger.severity.warn, ...args]);
        return;
    }

    public error(...args: any[]) {
        this.log.apply(this, [Logger.severity.error, ...args]);
        return;
    }

    public dir(obj: any) {
        if (constants.HasConsoleDir) {
            console.dir(obj);
        } else {
            this.log(Logger.severity.info, obj);
        }
        return;
    }

    public dirxml(obj: any) {
        if (constants.HasConsoleDirXml) {
            console.dirxml(obj);
        } else {
            this.log(Logger.severity.info, obj);
        }
        return;
    }

    public dump(loglevel: number = this.minseverity) {
        this.loghistory.forEach((item) => {
            if (Logger.severity[item.severity] <= loglevel) {
                this.writeToConsole(item.severity, ...item.message);
            }
        });
        return;
    }

    public clear () {
        this.loghistory = [];
    }

    public getLogHistory() {
        return this.loghistory;
    }

}