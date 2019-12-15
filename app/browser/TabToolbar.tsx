import * as React from "react";
import { WebView, ActionBar } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $FlexboxLayout } from "react-nativescript";
import { ToolbarButton } from "./ToolbarButton";
import { goBackOnActiveWebView, goForwardOnActiveWebView } from "~/store/navigationState";
import { connect } from "react-redux";
import { WholeStoreState } from "~/store/store";
import { BackButtonConnected, ForwardButtonConnected, MenuButtonConnected, SearchButtonConnected, TabsButtonConnected, } from "./BarButtons";

interface Props {

}

interface State {

}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/TabToolbar.swift#L199
export class TabToolbar extends React.Component<Props, State>{

    render(){
        return (
            <$FlexboxLayout flexDirection={"row"} justifyContent={"space-around"} alignItems={"center"} width={{ value: 100, unit: "%" }} paddingTop={16}>
                {/* actionButtons */}
                <BackButtonConnected/>
                <ForwardButtonConnected/>
                <MenuButtonConnected/>
                <SearchButtonConnected/>
                <TabsButtonConnected/>
            </$FlexboxLayout>
        );
    }
}