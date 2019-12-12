import * as React from "react";
import { WebView, ActionBar } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout } from "react-nativescript";
import { URLBarView } from "./URLBarView";
import { TopTabsViewController } from "./TopTabsViewController";
import { StackLayoutComponentProps } from "react-nativescript/dist/components/StackLayout";

interface Props {
    toolbarIsShowing: boolean,
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

type UrlBarTopTabsContainerProps = { inOverlayMode: boolean, toolbarIsShowing: boolean, } & StackLayoutComponentProps;

class UrlBarTopTabsContainer extends React.Component<UrlBarTopTabsContainerProps, {}>{

    render(){
        const { children, toolbarIsShowing, ...rest } = this.props;
        return (
            <$StackLayout
                width={{ value: 100, unit: "%"}} {...rest}
            >
                <URLBarView
                    inOverlayMode={false}
                    toolbarIsShowing={toolbarIsShowing}
                    slotBackgroundColor={"gray"}
                    textFieldBackgroundColor={"white"}
                    buttonBackgroundColor={"transparent"}
                />
                <TopTabsContainer/>
            </$StackLayout>
        );
    }
}

export class Header extends React.Component<Props, State>{

    render(){
        const { toolbarIsShowing } = this.props;
        return (
            <UrlBarTopTabsContainer inOverlayMode={false} toolbarIsShowing={toolbarIsShowing}/>
        );
    }
}