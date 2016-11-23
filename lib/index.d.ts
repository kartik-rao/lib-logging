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
export declare class Logger implements ILogger {
    static readonly severity: any;
    private severityMap;
    readonly colors: any;
    private logPrefix;
    private loghistory;
    private severity;
    private static __instance;
    private constructor(prefix, severity);
    static getInstance(prefix?: string, severity?: number): Logger;
    private pad;
    private getLocalTime;
    private writeToConsole(severity, ...args);
    log(severity: number, ...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    dir(obj: any): void;
    dirxml(obj: any): void;
    dump: () => any[];
    traceError: (message?: string, tags?: any) => void;
}
