import * as React from "react";
import { WebView, ActionBar, StackLayout } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $Progress, $Button } from "react-nativescript";
import { ToolbarButton } from "~/browser/ToolbarButton";
import { ButtonComponentProps } from "react-nativescript/dist/components/Button";

interface Props {

}

interface State {
}

// https://github.com/cliqz/user-agent-ios/blob/7a91b5ea3e2fbb8b95dadd4f0cfd71b334e73449/Client/Frontend/Browser/TabToolbar.swift#L146
export class TabsButton extends React.Component<Props & ButtonComponentProps, State>{

    render(){
        const { ...rest } = this.props;

        return (
            <ToolbarButton {...rest} text={"\uf009"}/>
        );
    }
}