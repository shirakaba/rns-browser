import * as React from "react";
import { WebView, ActionBar, StackLayout, EventData, TextField } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $FlexboxLayout, $ContentView, $Image, $TextField, $GridLayout, $TextView } from "react-nativescript";
import { ToolbarButton } from "./ToolbarButton";
import { PrivacyIndicatorView } from "~/Views/PrivacyIndicatorView";
import { TextFieldComponentProps } from "react-nativescript/dist/components/TextField";
import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { ButtonComponentProps } from "react-nativescript/dist/components/Button";
import { FlexboxLayoutComponentProps } from "react-nativescript/dist/components/FlexboxLayout";

interface Props {
    slotBackgroundColor?: string,
    buttonBackgroundColor?: string,
    textFieldBackgroundColor?: string,
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
class DisplayTextField extends React.Component<TextFieldComponentProps, { text: string }> {
    constructor(props){
        super(props);

        this.state = {
            text: "",
        }
    }

    private readonly onTextChange = (args: EventData) => {
        const textField: TextField = args.object as TextField;
        this.setState({ text: textField.text });
    };

    private readonly onReturnPress = (args: EventData) => {
        const textField: TextField = args.object as TextField;
        // TODO: release newer RNS with support for onReturnPress!
    };

    render(){
        const { ...rest } = this.props;
        const { text } = this.state;

        return (
            <$TextField
                {...rest}
                text={text}
                onTextChange={this.onTextChange}
                // onReturnPress={this.onReturnPress}
            />
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
            <ToolbarButton {...rest} text={"\uf141"}/>
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
        const { slotBackgroundColor = "purple", buttonBackgroundColor = "transparent", textFieldBackgroundColor = "white", ...rest } = this.props;

        return (
            /* self.view */
            <$FlexboxLayout
                iosOverflowSafeArea={false}
                {...rest}
            >
                {/* self.contentView */}
                {/* https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L149 */}
                {/* https://developer.apple.com/documentation/uikit/uistackview */}
                <$FlexboxLayout
                    flexDirection={"row"}
                    // May need to change to "stretch"
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    // flexWrap={"nowrap"}
                    backgroundColor={slotBackgroundColor}
                    flexGrow={1}
                >
                    {/* frontSpaceView */}
                    <$ContentView width={{ value: TabLocationViewUX.Spacing, unit: "dip" }}/>

                    {/* privacyIndicator */}
                    <PrivacyIndicator/>
                    
                    {/* privacyIndicatorSeparator */}
                    <$ContentView width={{ value: 3, unit: "dip" }}/>
                    <LockImageView locked={true}/>
                    <UrlTextField backgroundColor={textFieldBackgroundColor} flexGrow={1}/>
                    <PageOptionsButton backgroundColor={buttonBackgroundColor}/>
                </$FlexboxLayout>
            </$FlexboxLayout>
        );
    }
}