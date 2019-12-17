import { BarAwareWebView } from ".";
import { EventData } from "@nativescript/core/ui/core/view";
export { NavigationType, LoadEventData, ProgressEventData } from "../../NativeScriptCoreUIForks/WebView";

export interface BarAwareWebViewClient {
    new(owner: BarAwareWebView): any /* android.webkit.WebViewClient */;
}

export interface BarRetractionRecommendationEventData extends EventData {
    barsShouldRetract: boolean;
}