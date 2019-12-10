import * as React from "react";
import { WebView, ActionBar, StackLayout } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $FlexboxLayout, $ContentView, $Image, $TextField, $GridLayout } from "react-nativescript";
import { ToolbarButton } from "./ToolbarButton";
import { PrivacyIndicatorView } from "~/Views/PrivacyIndicatorView";
import { TextFieldComponentProps } from "react-nativescript/dist/components/TextField";
import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { ButtonComponentProps } from "react-nativescript/dist/components/Button";
import { FlexboxLayoutComponentProps } from "react-nativescript/dist/components/FlexboxLayout";

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
class LockImageView extends React.Component<{ locked: boolean } & ButtonComponentProps, {}> {
    render(){
        const { locked, ...rest } = this.props;

        return (
            // <$Image/>
            <ToolbarButton text={ locked ? "\uf023" : "\uf3c1" } {...rest}/>
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
class PageOptionsButton extends React.Component<{} & ButtonComponentProps, {}> {
    render(){
        const { ...rest } = this.props;

        return (
            <ToolbarButton text={"\uf141"} {...rest}/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L105
class PrivacyIndicator extends React.Component<{} & ButtonComponentProps, {}> {
    render(){
        const { ...rest } = this.props;

        return (
            <PrivacyIndicatorView {...rest}/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift
export class TabLocationView extends React.Component<Props & FlexboxLayoutComponentProps, State>{

    render(){
        const { ...rest } = this.props;

        return (
            /* self.contentView */
            /* https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L149 */
            /* https://developer.apple.com/documentation/uikit/uistackview */
            <$FlexboxLayout
                flexDirection={"row"}
                // May need to change to "stretch"
                alignItems={"center"}
                justifyContent={"space-around"}
                flexWrap={"nowrap"}
                {...rest}
            >
                {/* frontSpaceView */}
                <$ContentView width={{ value: TabLocationViewUX.Spacing, unit: "dip" }}/>

                {/* privacyIndicator */}
                <PrivacyIndicator/>
                
                {/* privacyIndicatorSeparator */}
                <$ContentView width={{ value: 3, unit: "dip" }}/>
                <LockImageView locked={true}/>
                {/* FIXME: width */}
                <UrlTextField flexGrow={1}/>
                <PageOptionsButton/>
            </$FlexboxLayout>
        );
    }
}