export interface ILogger {
    log: (...args: any[]) => void;
    dump: () => any[];
    traceError: (err: string, tags: any) => void;
}
export declare class Logger implements ILogger {
    private logPrefix;
    private loghistory;
    private isDebug;
    private static __instance;
    private constructor(prefixName, prefixVersion);
    static getInstance(prefixName?: string, prefixVersion?: string): Logger;
    private pad;
    setDebug(value: boolean): void;
    private getLocalTime;
    private writeToConsole;
    log: (...args: any[]) => void;
    dump: () => any[];
    traceError: (err?: string, tags?: any) => void;
}
