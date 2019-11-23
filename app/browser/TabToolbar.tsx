import * as React from "react";
import { WebView, ActionBar } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout } from "react-nativescript";
import { ToolbarButton } from "./ToolbarButton";

interface Props {

}

interface State {

}

// All from URLBarView

class BackButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton/>
        );
    }
}
class ForwardButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton/>
        );
    }
}
class MenuButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton/>
        );
    }
}
class SearchButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton/>
        );
    }
}
class TabsButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabToolbar.swift#L199
export class TabToolbar extends React.Component<Props, State>{

    render(){
        return (
            <$StackLayout orientation={"horizontal"}>
                {/* actionButtons */}
                <BackButton/>
                <ForwardButton/>
                <MenuButton/>
                <SearchButton/>
                <TabsButton/>
            </$StackLayout>
        );
    }
}