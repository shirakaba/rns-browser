// import { WebView as WebViewDefinition } from ".";
// import { LoadEventData, NavigationType, ProgressEventData } from "./bar-aware-web-view-interfaces";
import { WebViewBase } from "../../NativeScriptCoreUIForks/WebView/web-view-common";
import { ContainerView, Property, EventData, CSSType } from "@nativescript/core/ui/core/view";
import { File, knownFolders, path } from "../../NativeScriptCoreUIForks/WebView/web-view-common";
import { BarRetractionRecommendationEventData, ProgressEventData, LoadEventData } from "./bar-aware-web-view-interfaces";

export { File, knownFolders, path };
export * from "./bar-aware-web-view-interfaces";
export * from "@nativescript/core/ui/core/view";

@CSSType("BarAwareWebView")
export abstract class BarAwareWebViewBase extends WebViewBase {
    public static barRetractionRecommendationEvent = "barRetractionRecommendation";

    public _onBarRetractionRecommendation(barsShouldRetract: boolean) {
        let args = <BarRetractionRecommendationEventData>{
            eventName: WebViewBase.loadFinishedEvent,
            object: this,
            barsShouldRetract,
        };

        this.notify(args);
    }
}

// HACK: Use an interface with the same name, so that the class above fulfills the 'implements' requirement
// HACK: We use the 'implements' to verify the class above is the same as the one declared in the d.ts
// HACK: We declare all these 'on' statements, so that they can appear in the API reference
// HACK: Do we need this? Is it useful? There are static fields to the WebViewBase class for the event names.
export interface BarAwareWebViewBase {
    on(eventNames: string, callback: (data: EventData) => void, thisArg?: any);
    on(event: "barRetractionRecommendation", callback: (args: BarRetractionRecommendationEventData) => void, thisArg?: any);
    on(event: "progress", callback: (args: ProgressEventData) => void, thisArg?: any);
    on(event: "loadFinished", callback: (args: LoadEventData) => void, thisArg?: any);
    on(event: "loadCommitted", callback: (args: LoadEventData) => void, thisArg?: any);
    on(event: "loadStarted", callback: (args: LoadEventData) => void, thisArg?: any);
}