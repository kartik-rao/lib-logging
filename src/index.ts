import { Constants } from './constants'
let constants: Constants = Constants.getInstance();

export interface ILogger {
    log: (sev: number, ...args: any[]) => void;
    dump: () => any[];
    traceError: (err: string, tags: any) => void;
    info: (...args: any[]) => void;
    debug: (...args: any[]) => void;
    error: (...args: any[]) => void;
    dir: (obj: any) => void;
    dirxml: (obj: any) => void;
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
    private severity: number = Logger.severity.warn;
    private static __instance: Logger;

    private constructor(prefix, severity) {
        if (prefix) {
            this.logPrefix = prefix;
        }

        if (severity) {
            this.severity = severity;
        }
    }

    public static getInstance(prefix?: string, severity?: number) {
        if (!this.__instance) {
            this.__instance = new Logger(prefix, severity);
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
        let style = null;
        if (!(constants.IsSafari == true)) {
            style = this.colors[severity];
            args[0] = "%c" + args[0];
        }

        let nonString = [];
        args.forEach((item, i) => {
            if (!(item.charCodeAt && item.substr) || !isNaN(parseFloat(item)) && isFinite(item)) {
                nonString.push(item);
                args[i] = "";
            }
        });

        let stringToLog = args.join(" ");
        window.console.log(stringToLog, style);
        nonString.forEach((obj) => {
            this.dir(obj);
        });
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
            this.loghistory.unshift({ severity: severityStr, message: args });
            if (severity <= this.severity && constants.HasConsoleLog) {
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

    public dump = () => {
        for (var item of this.loghistory) {
            this.writeToConsole.apply(this, item.message);
        }
        return this.loghistory;
    }

    public traceError = (message: string = 'Unknown', tags: any = {}) => {
        this.log(Logger.severity.error, message, tags);
        return;
    }
}