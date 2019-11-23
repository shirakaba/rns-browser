import * as React from "react";
import { WebView, ActionBar, StackLayout } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $FlexboxLayout, $ContentView, $Image, $TextField, $Button } from "react-nativescript";

interface Props {

}

interface State {
}

// https://github.com/cliqz/user-agent-ios/blob/7a91b5ea3e2fbb8b95dadd4f0cfd71b334e73449/UserAgent/Views/Privacy%20Indicator/PrivacyIndicatorView.swift
export class PrivacyIndicatorView extends React.Component<{}, {}> {
    render(){
        return (
            <$StackLayout>
                {/* stub for canvasView, which is that donut graph. */}
                <$ContentView/>
                <$Button/>
            </$StackLayout>
        );
    }
}