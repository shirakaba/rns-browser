import * as console from "react-nativescript/dist/shared/Logger";
import * as React from "react";
import { WebViewProps, PropsWithoutForwardedRef, NarrowedEventData } from "react-nativescript/dist/shared/NativeScriptComponentTypings";
import { WebView as NativeScriptWebView, LoadEventData } from "tns-core-modules/ui/web-view/web-view";
import { ViewComponentProps, RCTView } from "react-nativescript/dist/components/View";
import { updateListener } from "react-nativescript/dist/client/EventHandling";
import { EventData } from "tns-core-modules/data/observable/observable";
import { register } from "react-nativescript/dist/client/ElementRegistry";
import { WebView } from "../NativeScriptCoreUIForks/WebView";

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
     * @available ios
     */
    onLoadCommitted?: (args: NarrowedLoadEventData) => void;
}

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
        } else {
            const method = (attach ? node.on : node.off).bind(node);
            if (this.props.onUrlChange) method("urlChange", this.props.onUrlChange);
            if (this.props.onLoadFinished) method("loadFinished", this.props.onLoadFinished);
            if (this.props.onLoadCommitted) method("loadCommitted", this.props.onLoadCommitted);
            if (this.props.onLoadStarted) method("loadStarted", this.props.onLoadStarted);
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
