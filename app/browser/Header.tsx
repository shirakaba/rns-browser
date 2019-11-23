import * as React from "react";
import { WebView, ActionBar } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout } from "react-nativescript";
import { URLBarView } from "./URLBarView";
import { TopTabsViewController } from "./TopTabsViewController";

interface Props {

}

interface State {

}

class TopTabsContainer extends React.Component<{}, {}>{

    render(){
        return (
            <$StackLayout>
                <TopTabsViewController/>
            </$StackLayout>
        );
    }
}


class UrlBarTopTabsContainer extends React.Component<{}, {}>{

    render(){
        return (
            <$StackLayout>
                <URLBarView/>
                <TopTabsContainer/>
            </$StackLayout>
        );
    }
}

export class Header extends React.Component<Props, State>{

    render(){
        return (
            <UrlBarTopTabsContainer/>
        );
    }
}