import { WebView as WebViewDefinition } from ".";
import { LoadEventData, NavigationType, ProgressEventData } from "./web-view-interfaces";
import { ContainerView, Property, EventData, CSSType } from "@nativescript/core/ui/core/view";
import { File, knownFolders, path } from "@nativescript/core/ui/web-view/../../file-system";

export { File, knownFolders, path };
export * from "./web-view-interfaces";
export * from "@nativescript/core/ui/core/view";

export const srcProperty = new Property<WebViewBase, string>({ name: "src" });

@CSSType("WebView")
export abstract class WebViewBase extends ContainerView implements WebViewDefinition {
    public static progressEvent = "progress";
    public static loadStartedEvent = "loadStarted";
    public static loadFinishedEvent = "loadFinished";
    public static commitFinishedEvent = "commitFinished";

    public src: string;
    public progress: number = 0;

    public _onLoadFinished(url: string, error?: string) {
        let args = <LoadEventData>{
            eventName: WebViewBase.loadFinishedEvent,
            object: this,
            url: url,
            navigationType: undefined,
            error: error
        };

        this.notify(args);
    }

    public _onCommitFinished(url: string, error?: string) {
        let args = <LoadEventData>{
            eventName: WebViewBase.commitFinishedEvent,
            object: this,
            url: url,
            navigationType: undefined,
            error: error
        };

        this.notify(args);
    }

    public _onLoadStarted(url: string, navigationType: NavigationType) {
        let args = <LoadEventData>{
            eventName: WebViewBase.loadStartedEvent,
            object: this,
            url: url,
            navigationType: navigationType,
            error: undefined
        };

        this.notify(args);
    }

    public _onProgress(progress: number) {
        let args = <ProgressEventData>{
            eventName: WebViewBase.progressEvent,
            object: this,
            progress,
            error: undefined
        };

        this.notify(args);
    }

    abstract _loadUrl(src: string): void;

    abstract _loadData(src: string): void;

    abstract stopLoading(): void;

    get canGoBack(): boolean {
        throw new Error("This member is abstract.");
    }

    get canGoForward(): boolean {
        throw new Error("This member is abstract.");
    }

    abstract goBack(): void;

    abstract goForward(): void;

    abstract reload(): void;

    [srcProperty.getDefault](): string {
        return "";
    }
    [srcProperty.setNative](src: string) {
        this.stopLoading();

        // Add file:/// prefix for local files.
        // They should be loaded with _loadUrl() method as it handles query params.
        if (src.indexOf("~/") === 0) {
            src = `file:///${knownFolders.currentApp().path}/` + src.substr(2);
        } else if (src.indexOf("/") === 0) {
            src = "file://" + src;
        }

        // loading local files from paths with spaces may fail
        if (src.toLowerCase().indexOf("file:///") === 0) {
            src = encodeURI(src);
        }

        if (src.toLowerCase().indexOf("http://") === 0 ||
            src.toLowerCase().indexOf("https://") === 0 ||
            src.toLowerCase().indexOf("file:///") === 0) {
            this._loadUrl(src);
        } else {
            this._loadData(src);
        }
    }
}

// HACK: Use an interface with the same name, so that the class above fulfills the 'implements' requirement
// HACK: We use the 'implements' to verify the class above is the same as the one declared in the d.ts
// HACK: We declare all these 'on' statements, so that they can appear in the API reference
// HACK: Do we need this? Is it useful? There are static fields to the WebViewBase class for the event names.
export interface WebViewBase {
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    on(event: "progress", callback: (args: ProgressEventData) => void, thisArg?: any);
    on(event: "loadFinished", callback: (args: LoadEventData) => void, thisArg?: any);
    on(event: "loadCommitted", callback: (args: LoadEventData) => void, thisArg?: any);
    on(event: "loadStarted", callback: (args: LoadEventData) => void, thisArg?: any);
}

srcProperty.register(WebViewBase);