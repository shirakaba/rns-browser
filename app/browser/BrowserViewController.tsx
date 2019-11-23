import * as React from "react";
import { WebView, ActionBar } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $Button } from "react-nativescript";
import { URLBarView } from "./URLBarView";
import { TopTabsViewController } from "./TopTabsViewController";
import { Header } from "./Header";
import { TabToolbar } from "./TabToolbar";

interface Props {

}

interface State {

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
class WebViewContainerBackdrop extends React.Component<{}, {}> {
    render(){
        const {} = this.props;

        return (
            // UIView()
            <$StackLayout/>
        );
    }
}

class WebViewContainer extends React.Component<{}, {}> {
    render(){
        const { children } = this.props;

        return (
            // UIView()
            <$StackLayout width={{ value: 100, unit: "%"}} height={{ value: 100, unit: "%" }}>
                {children}
            </$StackLayout>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L104
class TopTouchArea extends React.Component<{}, {}> {
    render(){
        const {} = this.props;

        return (
            <$Button/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L70
class AlertStackView extends React.Component<{}, {}> {
    render(){
        const {} = this.props;

        return (
            <$StackLayout/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/BrowserViewController.swift#L103
class Footer extends React.Component<{ showToolbar: boolean, }, {}> {
    render(){
        const { showToolbar, children } = this.props;

        if(showToolbar){
            return (
                <$StackLayout>
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

export class BrowserViewController extends React.Component<Props, State> {

    render(){
        return (
            <$StackLayout>
                <WebViewContainerBackdrop/>

                <WebViewContainer>
                    <$WebView width={{ value: 100, unit: "%"}} height={{ value: 100, unit: "%" }}/>
                </WebViewContainer>

                <NotchAreaCover/>

                <TopTouchArea/>

                <AlertStackView/>

                <Footer showToolbar={true}/>

                <OverlayBackground/>
            </$StackLayout>
        );
    }
}