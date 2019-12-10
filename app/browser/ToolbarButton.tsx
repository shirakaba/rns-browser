import * as React from "react";
import { WebView, ActionBar, StackLayout, Color } from "@nativescript/core";
import { $WebView, $ActionBar, $StackLayout, $Progress, $Button, $FormattedString, $Span } from "react-nativescript";
import { ButtonComponentProps } from "react-nativescript/dist/components/Button";

interface Props {

}

interface State {
}

// https://github.com/cliqz/user-agent-ios/blob/7a91b5ea3e2fbb8b95dadd4f0cfd71b334e73449/Client/Frontend/Browser/TabToolbar.swift#L146
export class ToolbarButton extends React.Component<Props & ButtonComponentProps, State>{

    render(){
        const { children, text, ...rest } = this.props;
        const bgColour: string = "gray";
        const textColour: string = "white";

        return (
            <$Button
                className=""
                width={{ value: 40, unit: "dip" }}
                height={{ value: 40, unit: "dip" }}
                backgroundColor={bgColour}
                {...rest}
            >
                <$FormattedString>
                    <$Span
                        color={new Color(textColour)}
                        backgroundColor={new Color(bgColour)}
                        fontFamily="FontAwesome"
                        text={text}
                    />
                </$FormattedString>
            </$Button>
        );
    }
}