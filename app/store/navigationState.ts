import * as React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { WebView } from "tns-core-modules/ui/web-view/web-view";

type WebViewId = string;
export const webViews = new Map<WebViewId, React.RefObject<WebView>>([
    ["tab0", React.createRef<WebView>()]
]);
export type TabStateRecord = Record<string, { url: string, loadProgress: number }>;

const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        activeTab: "tab0",
        tabStateRecord: {
            tab0: {
                url: "https://www.birchlabs.co.uk",
                loadProgress: 0,
            }
        },
        urlBarText: "",
        urlBarLoadProgress: 0,
    },
    reducers: {
        updateUrlBarText(state, action) {
            // console.log(`[navigationState.ts] updateUrlBarText action ${JSON.stringify(action)} and state`, state);
            const text = action.payload;
            state.urlBarText = text;
            state.tabStateRecord[state.activeTab].url = text;
        },
        setUrlOnActiveWebView(state, action) {
            // Trigger side-effects, like searching query or visiting site?
            console.log(`[setUrlOnWebView] setting url for activeTab "${state.activeTab}" as: "${action.payload.text}"`);
            state.tabStateRecord[state.activeTab] = {
                url: action.payload.text,
                loadProgress: 0,
            };
        },
        setProgressOnActiveWebView(state, action) {
            // Trigger side-effects, like searching query or visiting site?
            console.log(`[setUrlOnWebView] setting url for activeTab "${state.activeTab}" as: "${action.payload.text}"`);
            const progress = action.payload;
            state.urlBarLoadProgress = progress;
            state.tabStateRecord[state.activeTab].loadProgress = progress;
        },
        goBackOnActiveWebView(state, action){

        },
        goForwardOnActiveWebView(state, action){

        },
    }
});

export const { updateUrlBarText, setProgressOnActiveWebView } = navigationSlice.actions;
export const navigationSliceReducer = navigationSlice.reducer;

function getActiveWebView(activeTab: string){
    const webViewRef = webViews.get(activeTab);
    if(!webViewRef){
        console.error(`Unable to find webViewRef for activeTab "${activeTab}".`);
        return null;
    }
    if(!webViewRef.current){
        console.error(`webViewRef for activeTab "${activeTab}" wasn't populated.`);
        return null;
    }

    return webViewRef.current!;
}

/* This is a thunk wrapping the "setUrlOnWebView" action. */
export function submitUrlBarTextToActiveWebView(url: string) {
    return function(dispatch, getState) {
        const activeTab: string = getState().navigation.activeTab;
        const webView = getActiveWebView(activeTab);
        if(!webView){
            return Promise.resolve();
        }

        console.error(`[setUrlOnWebView] Setting URL on webView for activeTab "${activeTab}" as: ${url}`);
        webView.src = url;

        console.log(`[setUrlOnWebView] Dispatching action to set url for activeTab "${activeTab}" as: "${url}"`);
        return dispatch(navigationSlice.actions.setUrlOnActiveWebView({ text: url }));
    };
}

export function goBackOnActiveWebView() {
    return function(dispatch, getState) {
        const activeTab: string = getState().navigation.activeTab;
        const webView = getActiveWebView(activeTab);
        if(!webView){
            return Promise.resolve();
        }

        console.error(`[goBackOnActiveWebView] Calling goBack() on webView for activeTab "${activeTab}" while canGoBack is: ${webView.canGoBack}`);
        webView.goBack();

        return dispatch(navigationSlice.actions.goBackOnActiveWebView());
    };
}

export function goForwardOnActiveWebView() {
    return function(dispatch, getState) {
        const activeTab: string = getState().navigation.activeTab;
        const webView = getActiveWebView(activeTab);
        if(!webView){
            return Promise.resolve();
        }

        console.error(`[goBackOnActiveWebView] Calling goForward() on webView for activeTab "${activeTab}" while canGoForward is: ${webView.canGoForward}`);
        webView.goForward();

        return dispatch(navigationSlice.actions.goForwardOnActiveWebView());
    };
}

