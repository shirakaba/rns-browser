import * as React from "react";
import { WebView, ActionBar } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $FlexboxLayout } from "react-nativescript";
import { ToolbarButton } from "./ToolbarButton";

interface Props {

}

interface State {

}

// All from URLBarView

class BackButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton text={"\uf135"}/>
        );
    }
}
class ForwardButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton text={"\uf135"}/>
        );
    }
}
class MenuButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton text={"\uf135"}/>
        );
    }
}
class SearchButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton text={"\uf135"}/>
        );
    }
}
class TabsButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton text={"\uf135"}/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabToolbar.swift#L199
export class TabToolbar extends React.Component<Props, State>{

    render(){
        return (
            <$FlexboxLayout flexDirection={"row"} justifyContent={"space-around"} alignItems={"center"} width={"100%" as any} paddingTop={16}>
                {/* actionButtons */}
                <BackButton/>
                <ForwardButton/>
                <MenuButton/>
                <SearchButton/>
                <TabsButton/>
            </$FlexboxLayout>
        );
    }
}