import * as React from "react";
import { WebView, ActionBar, StackLayout } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $Progress } from "react-nativescript";

interface Props {

}

interface State {
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabLocationView.swift
export class GradientProgressBar extends React.Component<Props, State>{

    render(){
        return (
            <$Progress/>
        );
    }
}