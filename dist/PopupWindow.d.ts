interface PopupWindowOptions {
    [key: string]: any;
}
declare class PopupWindow {
    id: string;
    url: string;
    options: PopupWindowOptions;
    private window?;
    private _iid?;
    private promise?;
    constructor(id: string, url: string, options?: PopupWindowOptions);
    open(): void;
    close(): void;
    poll(): Promise<Record<string, string>>;
    cancel(): void;
    then(...args: any[]): Promise<any>;
    catch(...args: any[]): Promise<any>;
    static open(...args: [string, string, PopupWindowOptions]): PopupWindow;
}
export default PopupWindow;
//# sourceMappingURL=PopupWindow.d.ts.map