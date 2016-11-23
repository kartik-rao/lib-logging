export declare class Constants {
    private static __instance;
    private constructor();
    static getInstance(): Constants;
    readonly IsDebug: boolean;
    readonly HasNativeISODate: boolean;
    readonly IsIE: boolean;
}
