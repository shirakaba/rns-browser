/// <reference path="../../node_modules/tns-platform-declarations/ios.d.ts" />
// import * as console from "react-nativescript/dist/shared/Logger";
import * as React from "react";
import { WebViewProps, PropsWithoutForwardedRef, NarrowedEventData } from "react-nativescript/dist/shared/NativeScriptComponentTypings";
import { WebView as NativeScriptWebView, LoadEventData } from "tns-core-modules/ui/web-view/web-view";
import { ViewComponentProps, RCTView } from "react-nativescript/dist/components/View";
import { updateListener } from "react-nativescript/dist/client/EventHandling";
import { EventData } from "tns-core-modules/data/observable/observable";
import { register } from "react-nativescript/dist/client/ElementRegistry";
import { WebView } from "../NativeScriptCoreUIForks/WebView";
import { isIOS, isAndroid } from "tns-core-modules/ui/page/page";

/**
 * I can't sign the CLA to contribute to NativeScript Core, so I'll have to just maintain a fork of it within this project.
 * We're sure to have special features that we want to maintain, anyway.
 */
register("betterWebView", () => new WebView());

type NativeScriptUIElement = NativeScriptWebView;

interface NarrowedLoadEventData extends LoadEventData {
    object: NativeScriptWebView;
}

interface Props {
    onUrlChange?: (args: NarrowedEventData<NativeScriptUIElement>) => void;
    onLoadFinished?: (args: NarrowedLoadEventData) => void;
    onLoadStarted?: (args: NarrowedLoadEventData) => void;
    /**
     * Added to BetterWebView.
     * @available ios
     */
    onLoadCommitted?: (args: NarrowedLoadEventData) => void;
}

// const MyEstimatedProgressHandlerImpl = (NSObject as any).extend(
//     {
//         get wv(): WKWebView|null { return this._wv; },
//         set wv(x) { this._wv = x; },
//         // override func observeValue(forKeyPath keyPath: String?, of object: Any?, change: [NSKeyValueChangeKey : Any]?, context: UnsafeMutableRawPointer?) {
//         // observeValueForKeyPathOfObjectChangeContext(keyPath: string, object: any, change: NSDictionary<string, any>, context: interop.Pointer | interop.Reference<any>): void;
//         observeValueForKeyPathOfObjectChangeContext: function(keyPath: string, object: any, change: NSDictionary<string, any>, context: interop.Pointer | interop.Reference<any>){
//             if(!this.wv){
//                 console.log(`[MyEstimatedProgressHandlerImpl] WebView wasn't registered.`);
//                 return;
//             }
//             if(keyPath !== "estimatedProgress"){
//                 console.log(`[MyEstimatedProgressHandlerImpl] ignoring keyPath: ${keyPath}`);
//                 return;
//             }
//             console.log(`[MyEstimatedProgressHandlerImpl] got keyPath: ${keyPath} and estimatedProgress: ${this.wv ? this.wv.estimatedProgress : null}`);
//         }
//     },
//     {
//         name: "MyEstimatedProgressHandlerImpl",
//         protocols: [],
//         exposedMethods: {
//             observeValueForKeyPathOfObjectChangeContext: {
//                 returns: interop.Pointer,
//                 params: [NSString]
//             }
//         }
//     }
// );


export type WebViewComponentProps<
    E extends NativeScriptUIElement = NativeScriptUIElement
> = Props /* & typeof _WebView.defaultProps */ & Partial<WebViewProps> & ViewComponentProps<E>;

/**
 * A React wrapper around the NativeScript WebView component.
 * See: ui/WebView/WebView
 */
class _BetterWebView<
    P extends WebViewComponentProps<E>,
    S extends {},
    E extends NativeScriptUIElement = NativeScriptUIElement
> extends RCTView<P, S, E> {
    // private progressObserver = new MyEstimatedProgressHandlerImpl();

    private readonly privateOnLoaded = () => {
        console.warn(`[BetterWebView] privateOnLoaded.`);
        if(isIOS){
            const wv = this.getCurrentRef();
            if(!wv){
                console.warn(`wv was unpopulated.`);
                return;
            }
            const nativeWv: WKWebView = wv.ios;
            if(!nativeWv){
                console.warn(`Unable to get access to nativeWv.`);
                return;
            }
            // this.progressObserver.wv = nativeWv;
            // /* webView!.addObserver(self, forKeyPath: #keyPath(WKWebView.estimatedProgress), options: .new, context: nil) */
            // nativeWv.addObserverForKeyPathOptionsContext(
            //     this.progressObserver,
            //     "estimatedProgress",
            //     NSKeyValueObservingOptions.New,
            //     null
            // );
        } else if(isAndroid){
            // TODO
        } else {
            // Unsupported platform
        }
    };

    private readonly privateOnUnloaded = () => {
        console.warn(`[BetterWebView] privateOnUnloaded.`);
        if(isIOS){
            const wv = this.myRef.current;
            if(!wv){
                console.warn(`wv was unpopulated.`);
                return;
            }
            const nativeWv: WKWebView = wv.ios;
            if(!nativeWv){
                console.warn(`Unable to get access to nativeWv.`);
                return;
            }
            // /* webView!.addObserver(self, forKeyPath: #keyPath(WKWebView.estimatedProgress), options: .new, context: nil) */
            // nativeWv.removeObserverForKeyPathContext(
            //     this.progressObserver,
            //     "estimatedProgress",
            //     null
            // );
            // this.progressObserver.wv = null;
            // this.progressObserver = null;
        } else if(isAndroid){
            // TODO
        } else {
            // Unsupported platform
        }
    };

    /**
     *
     * @param attach true: attach; false: detach; null: update
     */
    protected updateListeners(node: E, attach: boolean | null, nextProps?: P): void {
        super.updateListeners(node, attach, nextProps);

        if (attach === null) {
            updateListener(node, "urlChange", this.props.onUrlChange, nextProps.onUrlChange);
            updateListener(node, "loadFinished", this.props.onLoadFinished, nextProps.onLoadFinished);
            updateListener(node, "loadCommitted", this.props.onLoadCommitted, nextProps.onLoadCommitted);
            updateListener(node, "loadStarted", this.props.onLoadStarted, nextProps.onLoadStarted);

            updateListener(node, "loaded", this.privateOnLoaded, this.privateOnLoaded);
            updateListener(node, "unloaded", this.privateOnUnloaded, this.privateOnUnloaded);
        } else {
            const method = (attach ? node.on : node.off).bind(node);
            if (this.props.onUrlChange) method("urlChange", this.props.onUrlChange);
            if (this.props.onLoadFinished) method("loadFinished", this.props.onLoadFinished);
            if (this.props.onLoadCommitted) method("loadCommitted", this.props.onLoadCommitted);
            if (this.props.onLoadStarted) method("loadStarted", this.props.onLoadStarted);
            
            if (this.privateOnLoaded) method("loaded", this.privateOnLoaded);
            if (this.privateOnUnloaded) method("unloaded", this.privateOnUnloaded);
        }
    }

    render() {
        const {
            forwardedRef,

            onLoadStarted,
            onLoadCommitted,
            onLoadFinished,

            onLoaded,
            onUnloaded,
            onAndroidBackPressed,
            onShowingModally,
            onShownModally,

            onTap,
            onDoubleTap,
            onPinch,
            onPan,
            onSwipe,
            onRotation,
            onLongPress,
            onTouch,

            onPropertyChange,

            children,

            ...rest
        } = this.props;

        if (children) {
            console.warn("Ignoring 'children' prop on WebView; not permitted");
        }

        return React.createElement(
            "betterWebView",
            {
                ...rest,
                ref: forwardedRef || this.myRef,
            },
            null
        );
    }
}

type OwnPropsWithoutForwardedRef = PropsWithoutForwardedRef<WebViewComponentProps<NativeScriptUIElement>>;

export const BetterWebView: React.ComponentType<
    OwnPropsWithoutForwardedRef & React.ClassAttributes<NativeScriptUIElement>
> = React.forwardRef<NativeScriptUIElement, OwnPropsWithoutForwardedRef>(
    (props: React.PropsWithChildren<OwnPropsWithoutForwardedRef>, ref: React.RefObject<NativeScriptUIElement>) => {
        const { children, ...rest } = props;

        return React.createElement(
            _BetterWebView,
            {
                ...rest,
                forwardedRef: ref,
            },
            children
        );
    }
);
