import { hot } from 'react-hot-loader/root';
import * as React from "react";
import { $Page, $Label, $ActionBar, $GridLayout, $FormattedString, $Span, $Switch, $Frame } from "react-nativescript";
import { ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout/grid-layout';
import { Frame, Page } from 'tns-core-modules/ui/frame/frame';
import { BrowserViewController } from '~/browser/BrowserViewController';

interface Props {
    forwardedRef: React.RefObject<any>,
}

interface State {

}

class AppContainer extends React.Component<Props, State> {
    render(){
        const { forwardedRef } = this.props;

        return (
            <$Page ref={forwardedRef} actionBarHidden={true}>
                <BrowserViewController/>
            </$Page>
        );
    }
}

// export default AppContainer;
export default hot(AppContainer); // Replace this line with the above line if you want to remove hot loading.