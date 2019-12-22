import * as React from "react";
import { WebView, ActionBar, StackLayout, EventData, TextField } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $FlexboxLayout, $ContentView, $Image, $TextField, $GridLayout, $TextView } from "react-nativescript";
import { ToolbarButton } from "./ToolbarButton";
import { PrivacyIndicatorView } from "~/Views/PrivacyIndicatorView";
import { TextFieldComponentProps } from "react-nativescript/dist/components/TextField";
import { ItemSpec } from "tns-core-modules/ui/layouts/grid-layout/grid-layout";
import { ButtonComponentProps } from "react-nativescript/dist/components/Button";
import { FlexboxLayoutComponentProps } from "react-nativescript/dist/components/FlexboxLayout";
import { connect } from 'react-redux';
import { updateUrlBarText, submitUrlBarTextToWebView } from "~/store/navigationState";
import { WholeStoreState } from "~/store/store";
import { RetractionState } from "~/nativeElements/BarAwareWebView/bar-aware-web-view.ios";

interface Props {
    retraction: RetractionState,
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

interface DisplayTextFieldProps {
    activeTab: string,
    urlBarText: string,

    updateUrlBarText: typeof updateUrlBarText,
    // setUrlOnWebView: typeof setUrlOnWebView,
    submitUrlBarTextToWebView: typeof submitUrlBarTextToWebView,
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L319
class DisplayTextField extends React.Component<DisplayTextFieldProps & TextFieldComponentProps, {}> {
    private readonly onTextChange = (args: EventData) => {
        const textField: TextField = args.object as TextField;
        // console.log(`[onTextChange] ${textField.text}`);

        this.props.updateUrlBarText(textField.text);
    };

    private readonly onReturnPress = (args: EventData) => {
        const textField: TextField = args.object as TextField;
        // console.log(`[onReturnPress] ${textField.text}`);

        this.props.submitUrlBarTextToWebView(textField.text, this.props.activeTab);
    };

    render(){
        const { urlBarText, ...rest } = this.props;
        const {} = this.state;

        return (
            <$TextField
                {...rest}
                text={urlBarText}
                autocorrect={false}
                autocapitalizationType={"none"}
                keyboardType={"url"}
                returnKeyType={"go"}
                onTextChange={this.onTextChange}
                hint={"Search or enter address"}
                onReturnPress={this.onReturnPress}
            />
        );
    }
}

const DisplayTextFieldConnected = connect(
    (wholeStoreState: WholeStoreState) => {
        // console.log(`wholeStoreState`, wholeStoreState);
        const { activeTab, tabs, urlBarText } = wholeStoreState.navigation;

        return {
            activeTab,
            // urlBarText: tabs[activeTab].url,
            urlBarText,
        };
    },
    {
        updateUrlBarText,
        submitUrlBarTextToWebView,
    },
)(DisplayTextField);

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift#L62
class UrlTextField extends React.Component<TextFieldComponentProps, {}> {
    render(){
        const { ...rest } = this.props;

        return (
            <DisplayTextFieldConnected {...rest}/>
            // <DisplayTextField urlBarText={"whatever"} {...rest}/>
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
        const { slotBackgroundColor = "purple", buttonBackgroundColor = "transparent", textFieldBackgroundColor = "white", retraction, ...rest } = this.props;

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
                    alignItems={"center"}
                    justifyContent={"space-around"}
                    // TODO: animate
                    backgroundColor={retraction === RetractionState.revealed ? slotBackgroundColor : "transparent"}
                    borderRadius={30}
                    margin={8}
                    flexGrow={1}
                >
                    {/* frontSpaceView */}
                    <$ContentView width={{ value: TabLocationViewUX.Spacing, unit: "dip" }}/>

                    {/* privacyIndicator */}
                    <PrivacyIndicator
                        // TODO: animate
                        scaleX={retraction === RetractionState.revealed ? 1 : 0}
                        scaleY={retraction === RetractionState.revealed ? 1 : 0}
                    />
                    
                    {/* privacyIndicatorSeparator */}
                    <$ContentView width={{ value: 3, unit: "dip" }}/>
                    <LockImageView locked={true}/>
                    <UrlTextField backgroundColor={textFieldBackgroundColor} flexGrow={1}/>
                    <PageOptionsButton
                        backgroundColor={buttonBackgroundColor}
                        // TODO: animate
                        scaleX={retraction === RetractionState.revealed ? 1 : 0}
                        scaleY={retraction === RetractionState.revealed ? 1 : 0}
                    />
                </$FlexboxLayout>
            </$FlexboxLayout>
        );
    }
}

export const TabLocationViewConnected = connect(
    (wholeStoreState: WholeStoreState) => {
        // console.log(`wholeStoreState`, wholeStoreState);
        return {
            retraction: wholeStoreState.bars.header.retraction,
        };
    },
    {},
)(TabLocationView);