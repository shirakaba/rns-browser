import * as React from "react";
import { WebView, ActionBar, StackLayout } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $FlexboxLayout, $ContentView, $Image, $TextField, $Button } from "react-nativescript";

interface Props {

}

interface State {
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L105
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