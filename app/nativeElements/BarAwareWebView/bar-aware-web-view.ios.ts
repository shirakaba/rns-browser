/// <reference path="../../../node_modules/tns-platform-declarations/ios.d.ts" />
import { NavigationType } from "../../NativeScriptCoreUIForks/WebView";
import { BarAwareWebViewBase, knownFolders, traceWrite, traceEnabled, traceCategories } from "./bar-aware-web-view-common";
import { profile } from "@nativescript/core/profiling";
import { RetractionState } from "./bar-aware-web-view-interfaces";
export * from "./bar-aware-web-view-common";

class BarAwareUIScrollViewDelegateImpl extends NSObject implements UIScrollViewDelegate {
    public static ObjCProtocols = [UIScrollViewDelegate];
    public static initWithOwner(owner: WeakRef<BarAwareWebView>): BarAwareUIScrollViewDelegateImpl {
        const handler = <BarAwareUIScrollViewDelegateImpl>BarAwareUIScrollViewDelegateImpl.new();
        handler._owner = owner;

        // const uiScrollView = <UIScrollView>owner.get().ios.scrollView;

        return handler;
    }
    private _owner: WeakRef<BarAwareWebView>;

    /* On first tap of status bar, we prevent scrolling to top – just retract bars. */
    public scrollViewShouldScrollToTop(scrollView: UIScrollView): boolean {
        const owner = this._owner.get();
        if (!owner || !owner.barRetractionState) return true;

        if(owner.barRetractionState === RetractionState.retracted || owner.barRetractionState === RetractionState.retracting){
            owner._onBarRetractionRecommendation(false);
            return false;
        } else {
            return true;
        }
    }

    public scrollViewWillBeginDecelerating(scrollView: UIScrollView): void {
        const owner = this._owner.get();
        if (!owner) return;

        const translation: CGPoint = scrollView.panGestureRecognizer.translationInView(scrollView);

        owner._onBarRetractionRecommendation(translation.y <= 0);
    }

    public scrollViewDidScroll(scrollView: UIScrollView): void {
        const owner = this._owner.get();
        if (!owner) return;

        const translation: CGPoint = scrollView.panGestureRecognizer.translationInView(scrollView);

        if(translation.y < 0){
            if(scrollView.dragging){
                owner._onBarRetractionRecommendation(true);
            }
        }
    }
}

class WKNavigationDelegateImpl extends NSObject
    implements WKNavigationDelegate {
    public static ObjCProtocols = [WKNavigationDelegate];
    public static initWithOwner(owner: WeakRef<BarAwareWebView>): WKNavigationDelegateImpl {
        const handler = <WKNavigationDelegateImpl>WKNavigationDelegateImpl.new();
        handler._owner = owner;

        const wkWebView = <WKWebView>owner.get().ios;
        wkWebView.addObserverForKeyPathOptionsContext(handler, "title", 0, <any>null);
        wkWebView.addObserverForKeyPathOptionsContext(handler, "URL", 0, <any>null);
        wkWebView.addObserverForKeyPathOptionsContext(handler, "estimatedProgress", 0, <any>null);

        return handler;
    }
    private _owner: WeakRef<BarAwareWebView>;

    // Reference: https://github.com/NativeScript/ios-runtime/issues/742
    public observeValueForKeyPathOfObjectChangeContext(keyPath:string, object:any, change:any, context:any) {
        const owner = this._owner.get();
        if (!owner) return;        
        
        const wkWebView = <WKWebView>owner.ios;

        switch (keyPath) {
            case "title": 
                owner.set(keyPath, wkWebView.title); 
                break;
            case "URL": 
                this.updateURL();
                break;
            case "estimatedProgress":
                owner.set('progress', wkWebView.estimatedProgress);
                owner._onProgress(wkWebView.estimatedProgress);
                break;
        }
    }

    private updateURL() {
        const owner = this._owner.get();
        if (!owner) return;     
        const wkWebView = <WKWebView>owner.ios;
        owner['_suspendLoading'] = true; 
        owner.set("url", wkWebView.URL && wkWebView.URL.absoluteString); 
        owner['_suspendLoading'] = false; 
    }

    public webViewDecidePolicyForNavigationActionDecisionHandler(webView: WKWebView, navigationAction: WKNavigationAction, decisionHandler: any): void {
        const owner = this._owner.get();
        if (owner && navigationAction.request.URL) {
            let navType: NavigationType = "other";

            switch (navigationAction.navigationType) {
                case WKNavigationType.LinkActivated:
                    navType = "linkClicked";
                    break;
                case WKNavigationType.FormSubmitted:
                    navType = "formSubmitted";
                    break;
                case WKNavigationType.BackForward:
                    navType = "backForward";
                    break;
                case WKNavigationType.Reload:
                    navType = "reload";
                    break;
                case WKNavigationType.FormResubmitted:
                    navType = "formResubmitted";
                    break;
            }
            decisionHandler(WKNavigationActionPolicy.Allow);

            if (traceEnabled()) {
                traceWrite("WKNavigationDelegateClass.webViewDecidePolicyForNavigationActionDecisionHandler(" + navigationAction.request.URL.absoluteString + ", " + navigationAction.navigationType + ")", traceCategories.Debug);
            }
            owner._onLoadStarted(navigationAction.request.URL.absoluteString, navType);
        }
    }

    public webViewDidStartProvisionalNavigation(webView: WKWebView, navigation: WKNavigation): void {
        if (traceEnabled()) {
            traceWrite("WKNavigationDelegateClass.webViewDidStartProvisionalNavigation(" + webView.URL + ")", traceCategories.Debug);
        }
    }

    public webViewDidCommitNavigation(webView: WKWebView, navigation: WKNavigation): void {
        if (traceEnabled()) {
            traceWrite("WKNavigationDelegateClass.webViewDidCommitNavigation(" + webView.URL + ")", traceCategories.Debug);
        }
        const owner = this._owner.get();
        if (owner) {
            let src = owner.src;
            if (webView.URL) {
                src = webView.URL.absoluteString;
            }
            owner._onLoadCommitted(src);
        }
    }

    public webViewDidFinishNavigation(webView: WKWebView, navigation: WKNavigation): void {
        if (traceEnabled()) {
            traceWrite("WKNavigationDelegateClass.webViewDidFinishNavigation(" + webView.URL + ")", traceCategories.Debug);
        }
        const owner = this._owner.get();
        if (owner) {
            let src = owner.src;
            if (webView.URL) {
                src = webView.URL.absoluteString;
            }
            owner._onLoadFinished(src);
        }
    }

    public webViewDidFailNavigationWithError(webView: WKWebView, navigation: WKNavigation, error: NSError): void {
        const owner = this._owner.get();
        if (owner) {
            let src = owner.src;
            if (webView.URL) {
                src = webView.URL.absoluteString;
            }
            if (traceEnabled()) {
                traceWrite("WKNavigationDelegateClass.webViewDidFailNavigationWithError(" + error.localizedDescription + ")", traceCategories.Debug);
            }
            owner._onLoadFinished(src, error.localizedDescription);
        }
    }

    public webViewDidFailProvisionalNavigationWithError(webView: WKWebView, navigation: WKNavigation, error: NSError): void {
        const owner = this._owner.get();
        if (owner) {
            let src = owner.src;
            if (webView.URL) {
                src = webView.URL.absoluteString;
            }
            if (traceEnabled()) {
                traceWrite("WKNavigationDelegateClass.webViewDidFailProvisionalNavigationWithError(" + error.localizedDescription + ")", traceCategories.Debug);
            }
            owner._onLoadFinished(src, error.localizedDescription);
        }
    }

}

/* This involves a lot of copy-pasting of web-view.ios's implementation, because
 * we can't extend both BarAwareWebViewBase and WebView (unless I'm missing something). */
export class BarAwareWebView extends BarAwareWebViewBase {
    nativeViewProtected: WKWebView;
    private _delegate: any;
    private _scrollViewDelegate: any;

    createNativeView() {
        const jScript = "var meta = document.createElement('meta'); meta.setAttribute('name', 'viewport'); meta.setAttribute('content', 'initial-scale=1.0'); document.getElementsByTagName('head')[0].appendChild(meta);";
        const wkUScript = WKUserScript.alloc().initWithSourceInjectionTimeForMainFrameOnly(jScript, WKUserScriptInjectionTime.AtDocumentEnd, true);
        const wkUController = WKUserContentController.new();
        wkUController.addUserScript(wkUScript);
        const configuration = WKWebViewConfiguration.new();
        configuration.userContentController = wkUController;
        configuration.preferences.setValueForKey(
            true,
            "allowFileAccessFromFileURLs"
        );

        return new WKWebView({
            frame: CGRectZero,
            configuration: configuration
        });
    }

    initNativeView() {
        super.initNativeView();
        this._delegate = WKNavigationDelegateImpl.initWithOwner(new WeakRef(this));
        this._scrollViewDelegate = BarAwareUIScrollViewDelegateImpl.initWithOwner(new WeakRef(this));
    }

    disposeNativeView() {
        this._delegate = null;
        this._scrollViewDelegate = null;
        super.disposeNativeView();
    }

    @profile
    public onLoaded() {
        super.onLoaded();
        this.ios.navigationDelegate = this._delegate;
        this.ios.scrollView.delegate = this._scrollViewDelegate;
    }

    public onUnloaded() {
        this.ios.navigationDelegate = null;
        this.ios.scrollView.delegate = null;
        super.onUnloaded();
    }

    get ios(): WKWebView {
        return this.nativeViewProtected;
    }

    public stopLoading() {
        this.ios.stopLoading();
    }

    public _loadUrl(src: string) {
        if (src.startsWith("file:///")) {
            const cachePath = src.substring(0, src.lastIndexOf("/"));
            this.ios.loadFileURLAllowingReadAccessToURL(NSURL.URLWithString(src), NSURL.URLWithString(cachePath));
        } else {
            this.ios.loadRequest(NSURLRequest.requestWithURL(NSURL.URLWithString(src)));
        }
    }

    public _loadData(content: string) {
        this.ios.loadHTMLStringBaseURL(content, NSURL.alloc().initWithString(`file:///${knownFolders.currentApp().path}/`));
    }

    get canGoBack(): boolean {
        return this.ios.canGoBack;
    }

    get canGoForward(): boolean {
        return this.ios.canGoForward;
    }

    public goBack() {
        this.ios.goBack();
    }

    public goForward() {
        this.ios.goForward();
    }

    public reload() {
        this.ios.reload();
    }
}
