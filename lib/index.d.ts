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
export declare class Logger implements ILogger {
    static readonly severity: any;
    private severityMap;
    readonly colors: any;
    private meta;
    private loghistory;
    private minseverity;
    private prefix;
    private constructor();
    static getInstance(meta: string[], minseverity?: number): Logger;
    private pad;
    private getLocalTime;
    private writeToConsole;
    log(severity: number, ...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
    dir(obj: any): void;
    dirxml(obj: any): void;
    dump(loglevel?: number): void;
    clear(): void;
    getLogHistory(): any[];
}
