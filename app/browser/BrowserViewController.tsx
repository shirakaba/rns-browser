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
    ShowHeaderTapAreaHeight: 32,
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
            // UIVisualEffectView().contentView
            <$StackLayout {...rest}>
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
class TopTouchArea extends React.Component<ButtonComponentProps, {}> {
    constructor(props){
        super(props);
    }

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
                backgroundColor={"red"}
                className=""
                width={{ value: 100, unit: "%"}}
                height={{ value: BrowserViewControllerUX.ShowHeaderTapAreaHeight, unit: "dip" }}
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
                {/* Layer 0 (bottom-most layer) */}
                <$GridLayout
                    row={0}
                    width={{ value: 100, unit: "%"}}
                    height={{ value: 100, unit: "%"}}
                    rows={[
                        new ItemSpec(1, "auto"),
                        new ItemSpec(1, "star"),
                        new ItemSpec(1, "auto"),
                    ]}
                    columns={[new ItemSpec(1, "star")]}
                    // backgroundColor={"green"}
                >
                    {/* Intended to anchor to the left and right of self.view, so should exit the safe area width-ways. */}
                    <TopTouchArea row={0}/>
                </$GridLayout>

                {/* Layer 1 (top-most layer) */}
                <$GridLayout
                    row={0}
                    width={{ value: 100, unit: "%"}}
                    height={{ value: 100, unit: "%"}}
                    rows={[
                        new ItemSpec(1, "auto"),
                        new ItemSpec(1, "star"),
                        new ItemSpec(1, "auto"),
                    ]}
                    columns={[new ItemSpec(1, "star")]}
                    // backgroundColor={"pink"}
                >
                    <NotchAreaCover row={0}/>
                    <$GridLayout
                        row={1}
                        width={{ value: 100, unit: "%"}}
                        height={{ value: 100, unit: "%" }}
                        rows={[new ItemSpec(1, "star")]}
                        columns={[new ItemSpec(1, "star")]}
                    >
                        <WebViewContainerBackdrop row={0} col={0}/>
                        <WebViewContainer row={0} col={0}>
                            <$WebView
                                width={{ value: 100, unit: "%" }}
                                height={{ value: 100, unit: "%" }}
                                src={"https://www.birchlabs.co.uk"}
                            />
                        </WebViewContainer>
                    </$GridLayout>

                    {/* <AlertStackView/> */}

                    {/* <OverlayBackground/> */}

                    {/* Leading and trailing sides intended to anchor to those of self.view. Bottom anchors to that of self.view. */}
                    <Footer row={2} showToolbar={true} backgroundColor={"purple"}/>
                </$GridLayout>
            </$GridLayout>
        );
    }
}