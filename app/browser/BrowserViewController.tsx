import * as React from "react";
import { WebView, ActionBar } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $Button, $AbsoluteLayout, $ContentView, $GridLayout, $DockLayout, $FlexboxLayout } from "react-nativescript";
import { StackLayoutProps, ButtonProps } from "react-nativescript/dist/shared/NativeScriptComponentTypings";
import { URLBarView } from "./URLBarView";
import { TopTabsViewController } from "./TopTabsViewController";
import { Header } from "./Header";
import { TabToolbar } from "./TabToolbar";
import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { StackLayoutComponentProps } from "react-nativescript/dist/components/StackLayout";
import { ButtonComponentProps } from "react-nativescript/dist/components/Button";

const BrowserViewControllerUX = {
    ShowHeaderTapAreaHeight: 0,
    BookmarkStarAnimationDuration: 0.5,
    BookmarkStarAnimationOffset: 80,
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L128
class TopTabsContainer extends React.Component<{}, {}> {
    render(){
        return (
            // UIView()
            <$StackLayout>
                {/* topTabsViewController.view */}
                <TopTabsViewController/>
            </$StackLayout>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L105
class UrlBarTopTabsContainer extends React.Component<{}, {}> {
    render(){
        return (
            // UIView(frame: CGRect.zero)
            <$StackLayout>
                {/* urlBar */}
                <URLBarView/>
                {/* topTabsContainer */}
                <TopTabsContainer/>
            </$StackLayout>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L61
class NotchAreaCover extends React.Component<StackLayoutComponentProps, {}> {
    render(){
        const { children, ...rest } = this.props;
        return (
            <$StackLayout
                width={{ value: 100, unit: "%"}} {...rest}
            >
                <Header/>
            </$StackLayout>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L110
class WebViewContainerBackdrop extends React.Component<StackLayoutComponentProps, {}> {
    render(){
        const { children, ...rest } = this.props;

        return (
            // UIView()
            <$StackLayout
                // opacity={0.5}
                // backgroundColor={"purple"}
                width={{ value: 100, unit: "%" }}
                height={{ value: 100, unit: "%" }}
                {...rest}
            />
        );
    }
}


class WebViewContainer extends React.Component<StackLayoutComponentProps, {}> {
    render(){
        const { children, ...rest } = this.props;

        return (
            // UIView()
            <$StackLayout
                width={{ value: 100, unit: "%" }}
                height={{ value: 100, unit: "%" }}
                {...rest}
            >
                {children}
            </$StackLayout>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L104
/**
 * TopTouchArea serves as an opaque status bar that can be tapped to scroll
 * back to the top of any scrollview that is made its subordinate in some way.
 */
class TopTouchArea extends React.Component<ButtonComponentProps, {}> {
    private readonly onTap = (e) => {
        console.log(`[TopTouchArea.onTap]`);
    };
    
    render(){
        const { children, ...rest } = this.props;

        // A Button would be more semantic, but is restricted to the Safe Area.

        return (
            <$ContentView
                {...rest}
                onTap={this.onTap}
                row={0}
                // The trick here is that this background colour overflows beyond the safe area.
                backgroundColor={"red"}
                className=""
                width={{ value: 100, unit: "%"}}
                height={{ value: 0, unit: "dip" }}
            />
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L70
class AlertStackView extends React.Component<StackLayoutComponentProps, {}> {
    render(){
        const { children, ...rest } = this.props;

        return (
            <$StackLayout {...rest}/>
        );
    }
}

type FooterProps = { showToolbar: boolean, } & StackLayoutComponentProps;

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L103
class Footer extends React.Component<FooterProps, {}> {
    render(){
        const { showToolbar, children, ...rest } = this.props;

        if(showToolbar){
            return (
                <$StackLayout width={{ value: 100, unit: "%"}} {...rest}>
                    <TabToolbar/>
                </$StackLayout>
            );
        }

        // Unclear what footer should do when not showing toolbar...
        return (
            <$StackLayout>
            </$StackLayout>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L65
class OverlayBackground extends React.Component<{}, {}> {
    render(){
        const {} = this.props;

        return (
            // UIVisualEffectView()
            <$StackLayout/>
        );
    }
}

interface Props {
    orientation: "portrait"|"landscape"|"unknown",
}

interface State {

}

export class BrowserViewController extends React.Component<Props, State> {

    render(){

        // Visibility of certain components changes when switching app (if in private browsing mode)
        // https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L343

        return (
            <$GridLayout
                width={{ value: 100, unit: "%"}}
                height={{ value: 100, unit: "%"}}
                rows={[new ItemSpec(1, "star"),]}
                columns={[new ItemSpec(1, "star")]}
            >
                {/* Layer 0 (top-most layer) */}
                <$GridLayout
                    row={0}
                    width={{ value: 100, unit: "%"}}
                    height={{ value: 100, unit: "%"}}
                    rows={[
                        new ItemSpec(0, "pixel"), // Opaque, fixed-height status bar
                        new ItemSpec(1, "auto"), // Retractable nav bar
                        new ItemSpec(1, "star"), // full-height scroll view
                        new ItemSpec(1, "auto"), // Retractable tool bar
                    ]}
                    columns={[new ItemSpec(1, "star")]}
                    // backgroundColor={"pink"}
                >
                    <TopTouchArea row={0}/>
                    <NotchAreaCover row={1}/>
                    <$GridLayout
                        row={2}
                        width={{ value: 100, unit: "%"}}
                        height={{ value: 100, unit: "%" }}
                        rows={[new ItemSpec(1, "star")]}
                        columns={[new ItemSpec(1, "star")]}
                    >
                        <WebViewContainerBackdrop row={0} col={0}/>
                        <WebViewContainer row={0} col={0}>
                            <$WebView
                                // onTouch={() => {
                                //     console.log(`WebView touched`);
                                // }}
                                onPan={(e) => {
                                    console.log(`WebView panned type ${e.type} - deltaX ${e.deltaX} deltaY ${e.deltaY}`);
                                }}
                                width={{ value: 100, unit: "%" }}
                                height={{ value: 100, unit: "%" }}
                                src={"https://www.birchlabs.co.uk"}
                            />
                        </WebViewContainer>
                    </$GridLayout>

                    {/* <AlertStackView/> */}

                    {/* <OverlayBackground/> */}

                    {/* Leading and trailing sides intended to anchor to those of self.view. Bottom anchors to that of self.view. */}
                    <Footer row={3} showToolbar={true} backgroundColor={"purple"}/>
                </$GridLayout>
            </$GridLayout>
        );
    }
}