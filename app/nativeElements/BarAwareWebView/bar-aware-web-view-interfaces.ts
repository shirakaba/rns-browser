import { BarAwareWebView } from ".";
export { NavigationType, LoadEventData, ProgressEventData } from "../../NativeScriptCoreUIForks/WebView";

export interface BarAwareWebViewClient {
    new(owner: BarAwareWebView): any /* android.webkit.WebViewClient */;
}