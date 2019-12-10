import * as React from "react";
import { WebView, ActionBar, StackLayout } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $Progress } from "react-nativescript";
import { ProgressComponentProps } from "react-nativescript/dist/components/Progress";

interface Props {

}

type GradientProgressBarProps = Props & ProgressComponentProps;

interface State {
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift
export class GradientProgressBar extends React.Component<GradientProgressBarProps, State>{

    render(){
        const { ...rest } = this.props;
        return (
            <$Progress {...rest} />
        );
    }
}