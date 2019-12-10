import * as React from "react";
import { WebView, ActionBar, StackLayout } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $FlexboxLayout, $ContentView, $Image, $TextField } from "react-nativescript";
import { ToolbarButton } from "./ToolbarButton";
import { PrivacyIndicatorView } from "~/Views/PrivacyIndicatorView";
import { TextFieldComponentProps } from "react-nativescript/dist/components/TextField";

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
class LockImageView extends React.Component<{ locked: boolean }, {}> {
    render(){
        const { locked } = this.props;

        return (
            // <$Image/>
            <ToolbarButton text={ locked ? "\uf023" : "\uf3c1" }/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L319
class DisplayTextField extends React.Component<TextFieldComponentProps, {}> {
    render(){
        const { ...rest } = this.props;

        return (
            <$TextField {...rest}/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L62
class UrlTextField extends React.Component<TextFieldComponentProps, {}> {
    render(){
        const { ...rest } = this.props;

        return (
            <DisplayTextField {...rest}/>
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
                <$FlexboxLayout
                    flexDirection={"row"}
                    // May need to change to "stretch"
                    alignItems={"center"}
                    justifyContent={"space-around"}
                >
                    {/* frontSpaceView */}
                    <$ContentView width={{ value: TabLocationViewUX.Spacing, unit: "dip" }}/>

                    {/* privacyIndicator */}
                    <PrivacyIndicator/>
                    
                    {/* privacyIndicatorSeparator */}
                    <$ContentView width={{ value: 3, unit: "dip" }}/>
                    <LockImageView locked={true}/>
                    {/* FIXME: width */}
                    <UrlTextField />
                    <PageOptionsButton/>
                </$FlexboxLayout>
            </$StackLayout>
        );
    }
}