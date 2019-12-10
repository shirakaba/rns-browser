import * as React from "react";
import { WebView, ActionBar, StackLayout } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $FlexboxLayout, $ContentView, $Image, $TextField } from "react-nativescript";
import { ToolbarButton } from "./ToolbarButton";
import { PrivacyIndicatorView } from "~/Views/PrivacyIndicatorView";

interface Props {

}

interface State {
}

const TabLocationViewUX = {
    Spacing: 8,
    PlaceholderLefPadding: 12,
    StatusIconSize: 18,
    TPIconSize: 24,
    ButtonSize: 44,
    URLBarPadding: 4,
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L83
class LockImageView extends React.Component<{}, {}> {
    render(){
        return (
            <$Image/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L319
class DisplayTextField extends React.Component<{}, {}> {
    render(){
        return (
            <$TextField/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L62
class UrlTextField extends React.Component<{}, {}> {
    render(){
        return (
            <DisplayTextField/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L111
class PageOptionsButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton text={"\uf141"}/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L105
class PrivacyIndicator extends React.Component<{}, {}> {
    render(){
        return (
            <PrivacyIndicatorView/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift
export class TabLocationView extends React.Component<Props, State>{

    render(){
        return (
            // self.view
            <$StackLayout>
                {/* self.contentView */}

                {/* https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L149 */}
                {/* https://developer.apple.com/documentation/uikit/uistackview */}
                <$FlexboxLayout flexDirection={"row"} flexGrow={1} alignItems={"stretch"} justifyContent={"center"} >
                    {/* frontSpaceView */}
                    <$ContentView width={TabLocationViewUX.Spacing}/>

                    {/* privacyIndicator */}
                    <PrivacyIndicator/>
                    
                    {/* privacyIndicatorSeparator */}
                    <$ContentView width={3}/>
                    <LockImageView/>
                    <UrlTextField/>
                    <PageOptionsButton/>
                </$FlexboxLayout>
            </$StackLayout>
        );
    }
}