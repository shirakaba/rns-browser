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
class NotchAreaCover extends React.Component<{}, {}> {
    render(){
        return (
            // UIVisualEffectView().contentView
            <$StackLayout>
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
    render(){
        const { children, ...rest } = this.props;

        return (
            <$Button
                backgroundColor={"red"}
                width={{ value: 100, unit: "%"}}
                height={{ value: BrowserViewControllerUX.ShowHeaderTapAreaHeight, unit: "dip" }}
                {...rest}
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
            <$StackLayout
                width={{ value: 100, unit: "%"}}
                height={{ value: 100, unit: "%" }}
            >
                <$DockLayout
                    width={{ value: 100, unit: "%"}}
                    height={{ value: 100, unit: "%" }}
                >
                    {/* Intended to anchor to the left and right of self.view, so should exit the safe area width-ways. */}
                    <TopTouchArea
                        dock={"top"}
                    />

                    {/* <NotchAreaCover/> */}


                    {/* <AlertStackView/> */}


                    {/* <OverlayBackground/> */}

                    {/* Leading and trailing sides intended to anchor to those of self.view. Bottom anchors to that of self.view. */}
                    <Footer dock={"bottom"} showToolbar={true} backgroundColor={"purple"}/>


                    <$GridLayout
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

                </$DockLayout>
            </$StackLayout>
        );
    }
}