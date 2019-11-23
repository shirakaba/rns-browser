import { hot } from 'react-hot-loader/root';
import * as React from "react";
import { $Page, $Label, $ActionBar, $GridLayout, $FormattedString, $Span, $Switch, $Frame } from "react-nativescript";
import { ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout/grid-layout';
import { Frame, Page } from 'tns-core-modules/ui/frame/frame';

interface Props {
    forwardedRef: React.RefObject<Frame>,
}

interface State {

}

class AppContainer extends React.Component<Props, State> {
    private readonly pageRef: React.RefObject<Page> = React.createRef<Page>();

    componentDidMount(){
        const frame: Frame = this.props.forwardedRef.current!;
        frame.navigate({
            create: () => {
                const page: Page = this.pageRef.current!;
                page.addCssFile("./components/AppContainer.scss"); // Path is relative to the 'app' folder; not relative to this file!
                return page;
            }
        });
    }

    render(){
        const { forwardedRef } = this.props;

        return (
            <$Frame ref={forwardedRef}>
                <$Page ref={this.pageRef} className="page" actionBarHidden={false}>
                    <$ActionBar className="action-bar">
                        <$Label className="action-bar-title">Home</$Label>
                    </$ActionBar>
            
                    <$GridLayout rows={[new ItemSpec(1, "star")]} columns={[new ItemSpec(1, "star")]}>
                        <$Label row={0} col={0} className="info" horizontalAlignment="center" verticalAlignment="middle">
                            <$FormattedString>
                                <$Span className="fa" text="&#xf135;"/>
                                <$Span text=" MESSAGE"/>
                            </$FormattedString>
                        </$Label>
                    </$GridLayout>
                </$Page>
            </$Frame>
        );
    }
}

// export default AppContainer;
export default hot(AppContainer); // Replace this line with the above line if you want to remove hot loading.