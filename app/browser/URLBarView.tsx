import * as React from "react";
import { WebView, ActionBar, StackLayout } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $Button, $FlexboxLayout } from "react-nativescript";
import { GradientProgressBar } from "../Widgets/GradientProgressBar";
import { ToolbarButton } from "./ToolbarButton";
import { TabsButton } from "~/Widgets/TabsButton";
import { AutocompleteTextField } from "~/Widgets/AutocompleteTextField";
import { TabLocationView } from "./TabLocationView";

/* https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/URLBarView.swift */

interface Props {

}

interface State {
    inOverlayMode: boolean;
    toolbarIsShowing: boolean;
    location: string; // locationTextField?.text
    // text: string; // locationTextField?.text
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/URLBarView.swift#L786
class ToolbarTextField extends React.Component<{}, {}>{
    // Just a themeable AutocompleteTextField
    render(){
        return (
            <AutocompleteTextField/>
        );
    }
}

// We need a subclass so we can setup the shadows correctly
// This subclass creates a strong shadow on the URLBar
class TabLocationContainerView extends React.Component<{}, {}>{
    render(){
        return (
            <$StackLayout>

            </$StackLayout>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/URLBarView.swift#L136
class CancelButton extends React.Component<{}, {}>{
    render(){
        return (
            <$Button/>
        );
    }
}

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/URLBarView.swift#L108
class LocationContainer extends React.Component<{}, {}>{
    render(){
        return (
            <TabLocationContainerView/>
        );
    }
}

class BackButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton text={"\uf053"}/>
        );
    }
}
class ForwardButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton text={"\uf054"}/>
        );
    }
}
class StopReloadButton extends React.Component<{ loading: boolean }, {}> {
    render(){
        const { loading } = this.props;

        return (
            <ToolbarButton
                text={
                    loading ?
                    // Stop (cross symbol)
                    "\uf00d" :
                    // Reload (redo symbol)
                    "\uf01e"
                }
            />
        );
    }
}
/**
 * Menu refers to the app menu, not a page-specific menu.
 */
class MenuButton extends React.Component<{}, {}> {
    render(){
        return (
            <ToolbarButton text={"\uf142"}/>
        );
    }
}

export class URLBarView extends React.Component<Props, State>{
    constructor(props: Props){
        super(props);
        
        this.state = {
            inOverlayMode: false,
            toolbarIsShowing: true,
            location: "https://www.birchlabs.co.uk",
        };
    }

    render(){
        const { } = this.props;
        const { inOverlayMode, toolbarIsShowing } = this.state;

        let stackContents: React.ReactNode;

        if(inOverlayMode){
            // i.e. URL bar's text field has been focused and the browser displays an overlay over the webpage.
            stackContents = (
                <$FlexboxLayout
                    flexDirection={"row"}
                    justifyContent={"space-around"}
                    alignItems={"center"}
                    height={"auto"}
                    width={{ value: 100, unit: "%" }}
                >
                    {/* AKA locationTextField */}
                    <ToolbarTextField/>
                    <CancelButton/>
                </$FlexboxLayout>
            );
        } else if(toolbarIsShowing){
            stackContents = (
                <$FlexboxLayout
                    flexDirection={"row"}
                    justifyContent={"space-around"}
                    alignItems={"center"}
                    height={"auto"}
                    width={{ value: 100, unit: "%" }}
                    flexWrap={"nowrap"}
                >
                    <BackButton/>
                    <ForwardButton/>
                    <StopReloadButton loading={false}/>
                    {/* AKA locationView. */}
                    <TabLocationView flexGrow={1}/>
                    <TabsButton/>
                    <MenuButton/>
                </$FlexboxLayout>
            );
        } else {
            stackContents = (
                <$FlexboxLayout
                    flexDirection={"row"}
                    justifyContent={"space-around"}
                    alignItems={"center"}
                    height={"auto"}
                    width={{ value: 100, unit: "%" }}
                >
                    {/* AKA locationView. */}
                    <TabLocationView/>
                </$FlexboxLayout>
            );
        }

        return (
            <$StackLayout orientation={"vertical"}>
                {stackContents}
                <GradientProgressBar
                    width={{ value: 100, unit: "%" }}
                />
            </$StackLayout>
        );
    }
}