import { hot } from 'react-hot-loader/root';
import * as React from "react";
import { $Page, $Label, $ActionBar, $GridLayout, $FormattedString, $Span, $Switch, $Frame } from "react-nativescript";
import { ItemSpec } from 'tns-core-modules/ui/layouts/grid-layout/grid-layout';
import { Frame, Page } from 'tns-core-modules/ui/frame/frame';
import { BrowserViewController } from '~/browser/BrowserViewController';
import { Application, OrientationChangedEventData } from "@nativescript/core";

interface Props {
    forwardedRef: React.RefObject<any>,
}

interface State {
    orientation: "portrait"|"landscape"|"unknown",
}

class AppContainer extends React.Component<Props, State> {
    constructor(props){
        super(props);

        this.state = {
            orientation: "unknown",
        };
    }

    private readonly onOrientationChange = (args: OrientationChangedEventData) => {
        const orientation: "portrait"|"landscape"|"unknown" = args.newValue;
        this.setState({ orientation });
    };

    componentDidMount(){
        Application.on(Application.orientationChangedEvent, this.onOrientationChange);
    }
    
    componentWillUnmount(){
        Application.off(Application.orientationChangedEvent, this.onOrientationChange);
    }

    render(){
        const { forwardedRef } = this.props;
        const { orientation } = this.state;

        return (
            <$Page ref={forwardedRef} actionBarHidden={true}>
                <BrowserViewController orientation={orientation}/>
            </$Page>
        );
    }
}

// export default AppContainer;
export default hot(AppContainer); // Replace this line with the above line if you want to remove hot loading.