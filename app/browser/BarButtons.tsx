import * as React from "react";
import { WebView, ActionBar } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $FlexboxLayout, $Button } from "react-nativescript";
import { ToolbarButton } from "./ToolbarButton";
import { goBackOnActiveWebView, goForwardOnActiveWebView } from "~/store/navigationState";
import { connect } from "react-redux";
import { WholeStoreState } from "~/store/store";
import { ButtonComponentProps } from "react-nativescript/dist/components/Button";

// From URLBarView

interface BackButtonProps {
    goBackOnActiveWebView: typeof goBackOnActiveWebView,
}
class BackButton extends React.Component<BackButtonProps & ButtonComponentProps, {}> {
    private readonly onTap = () => {
        this.props.goBackOnActiveWebView();
    };

    render(){
        const { ...rest } = this.props;
        return (
            <ToolbarButton
                {...rest}
                onTap={this.onTap}
                text={"\uf053"}
            />
        );
    }
}
export const BackButtonConnected = connect(
    (wholeStoreState: WholeStoreState) => {
        // May support pop-out history in future.
        return {};
    },
    {
        goBackOnActiveWebView,
    },
)(BackButton);

interface ForwardButtonProps {
    goForwardOnActiveWebView: typeof goForwardOnActiveWebView,
}
class ForwardButton extends React.Component<ForwardButtonProps & ButtonComponentProps, {}> {
    private readonly onTap = () => {
        this.props.goForwardOnActiveWebView();
    };
    render(){
        const { ...rest } = this.props;
        return (
            <ToolbarButton
                {...rest}
                onTap={this.onTap}
                text={"\uf054"}
            />
        );
    }
}
export const ForwardButtonConnected = connect(
    (wholeStoreState: WholeStoreState) => {
        // May support pop-out history in future.
        return {};
    },
    {
        goForwardOnActiveWebView,
    },
)(ForwardButton);

class StopReloadButton extends React.Component<{ loading: boolean } & ButtonComponentProps, {}> {
    render(){
        const { loading, ...rest } = this.props;

        return (
            <ToolbarButton
                {...rest}
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
export const StopReloadButtonConnected = connect(
    (wholeStoreState: WholeStoreState) => {
        return {};
    },
    {
        // TODO
    },
)(StopReloadButton);

// From TabToolbar
/**
 * Menu refers to the app menu, not a page-specific menu.
 */
class MenuButton extends React.Component<{} & ButtonComponentProps, {}> {
    render(){
        const { ...rest } = this.props;
        return (
            <ToolbarButton {...rest} text={"\uf142"}/>
        );
    }
}
export const MenuButtonConnected = connect(
    (wholeStoreState: WholeStoreState) => {
        return {};
    },
    {
        // TODO
    },
)(MenuButton);
class SearchButton extends React.Component<{} & ButtonComponentProps, {}> {
    render(){
        const { ...rest } = this.props;
        return (
            <ToolbarButton text={"\uf002"}/>
        );
    }
}
export const SearchButtonConnected = connect(
    (wholeStoreState: WholeStoreState) => {
        return {};
    },
    {
        // TODO
    },
)(SearchButton);
// https://github.com/cliqz/user-agent-ios/blob/7a91b5ea3e2fbb8b95dadd4f0cfd71b334e73449/Client/Frontend/Browser/TabToolbar.swift#L146
class TabsButton extends React.Component<{} & ButtonComponentProps, {}>{

    render(){
        const { ...rest } = this.props;

        return (
            <ToolbarButton {...rest} text={"\uf009"}/>
        );
    }
}
export const TabsButtonConnected = connect(
    (wholeStoreState: WholeStoreState) => {
        return {};
    },
    {
        // TODO
    },
)(TabsButton);

// https://github.com/cliqz/user-agent-ios/blob/develop/Client/Frontend/Browser/URLBarView.swift#L136
class CancelButton extends React.Component<{} & ButtonComponentProps, {}>{
    render(){
        const { ...rest } = this.props;
        return (
            <$Button {...rest}/>
        );
    }
}
export const CancelButtonConnected = connect(
    (wholeStoreState: WholeStoreState) => {
        return {};
    },
    {
        // TODO
    },
)(CancelButton);