import * as React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { BarAwareWebView } from "~/nativeElements/BarAwareWebView/bar-aware-web-view";

/* Not strictly the most correct typing for an action, but accurate enough to work with*/
type Action<P, T = { type: string }> = T & {
    payload: P;
};
type WebViewId = string;
export const webViews = new Map<WebViewId, React.RefObject<BarAwareWebView>>([
    ["tab0", React.createRef<BarAwareWebView>()]
]);
export type TabStateRecord = Record<string, { url: string, loadProgress: number }>;


const initialPage: string = "https://www.birchlabs.co.uk";

const navigationSlice = createSlice({
    name: 'navigation',
    initialState: {
        activeTab: "tab0",
        tabs: {
            tab0: {
                url: initialPage,
                loadProgress: 0,
            }
        },
        urlBarText: initialPage
    },
    reducers: {
        /**
         * Update the singleton URL bar's displayed text (does not launch a query).
         */
        updateUrlBarText(state, action: Action<string>) {
            // console.log(`[navigationState.ts] updateUrlBarText action ${JSON.stringify(action)} and state`, state);
            const text = action.payload;
            state.urlBarText = text;
        },
        setUrlOnWebView(state, action: Action<{ url: string, tab?: string }>) {
            // console.log(`[setUrlOnWebView] setting url for activeTab "${state.activeTab}" as: "${action.payload.url}"`);
            const { url, tab = state.activeTab } = action.payload;
            state.tabs[tab] = {
                url,
                loadProgress: 0,
            };
        },
        setProgressOnWebView(state, action: Action<{ progress: number, tab?: string }>) {
            // console.log(`[setUrlOnWebView] setting progress for activeTab "${state.activeTab}" as: "${action.payload.progress}"`);
            const { progress, tab = state.activeTab } = action.payload;
            state.tabs[tab].loadProgress = progress;
        },
        goBackOnWebView(state, action: Action<void>){

        },
        goForwardOnWebView(state, action: Action<void>){

        },
        reloadWebView(state, action: Action<void>){

        },
        stopWebView(state, action: Action<void>){

        },
    }
});

export const { updateUrlBarText, setProgressOnWebView } = navigationSlice.actions;
export const navigationSliceReducer = navigationSlice.reducer;

function getWebView(tab: string){
    const webViewRef = webViews.get(tab);
    if(!webViewRef){
        console.error(`Unable to find webViewRef for tab "${tab}".`);
        return null;
    }
    if(!webViewRef.current){
        console.error(`webViewRef for tab "${tab}" wasn't populated.`);
        return null;
    }

    return webViewRef.current!;
}

/* This is a thunk wrapping the "setUrlOnWebView" action. */
export function submitUrlBarTextToWebView(url: string, tab?: string) {
    return function(dispatch, getState) {
        const chosenTab: string = tab || getState().navigation.activeTab;
        const webView = getWebView(chosenTab);
        if(!webView){
            return Promise.resolve();
        }

        console.log(`[setUrlOnWebView] Setting URL on webView for chosenTab "${chosenTab}" as: ${url}`);
        webView.src = url;

        console.log(`[setUrlOnWebView] Dispatching action to set url for chosenTab "${chosenTab}" as: "${url}"`);
        return dispatch(navigationSlice.actions.setUrlOnWebView({ url, tab: chosenTab }));
    };
}

export function goBackOnWebView(tab?: string) {
    return function(dispatch, getState) {
        const chosenTab: string = tab || getState().navigation.activeTab;
        const webView = getWebView(chosenTab);
        if(!webView){
            return Promise.resolve();
        }

        console.log(`[goBackOnWebView] Calling goBack() on webView for chosenTab "${chosenTab}" while canGoBack is: ${webView.canGoBack}`);
        webView.goBack();

        return dispatch(navigationSlice.actions.goBackOnWebView());
    };
}

export function goForwardOnWebView(tab?: string) {
    return function(dispatch, getState) {
        const chosenTab: string = tab || getState().navigation.activeTab;
        const webView = getWebView(chosenTab);
        if(!webView){
            return Promise.resolve();
        }

        console.log(`[goForwardOnWebView] Calling goForward() on webView for chosenTab "${chosenTab}" while canGoForward is: ${webView.canGoForward}`);
        webView.goForward();

        return dispatch(navigationSlice.actions.goForwardOnWebView());
    };
}


export function reloadWebView(tab?: string) {
    return function(dispatch, getState) {
        const chosenTab: string = tab || getState().navigation.activeTab;
        const webView = getWebView(chosenTab);
        if(!webView){
            return Promise.resolve();
        }

        console.log(`[goBackOnWebView] Calling refresh() on webView for chosenTab "${chosenTab}".`);
        webView.reload();

        return dispatch(navigationSlice.actions.reloadWebView());
    };
}

export function stopWebView(tab?: string) {
    return function(dispatch, getState) {
        const chosenTab: string = tab || getState().navigation.activeTab;
        const webView = getWebView(chosenTab);
        if(!webView){
            return Promise.resolve();
        }

        console.log(`[stopWebView] Calling refresh() on webView for chosenTab "${chosenTab}".`);
        webView.stopLoading();

        return dispatch(navigationSlice.actions.stopWebView());
    };
}
