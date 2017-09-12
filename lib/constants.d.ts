/// <reference types="node" />
export declare class Constants {
    private static __instance;
    private constructor();
    static getInstance(): Constants;
    readonly HasConsole: Console;
    readonly HasConsoleLog: {
        (message?: any, ...optionalParams: any[]): void;
        (message?: any, ...optionalParams: any[]): void;
    };
    readonly HasConsoleDir: {
        (value?: any, ...optionalParams: any[]): void;
        (obj: any, options?: NodeJS.InspectOptions): void;
    };
    readonly HasConsoleDebug: (message?: any, ...optionalParams: any[]) => void;
    readonly HasConsoleDirXml: (value: any) => void;
    readonly HasNativeISODate: boolean;
    readonly IsIE: boolean;
    readonly IsSafari: boolean;
}
