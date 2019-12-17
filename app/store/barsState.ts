import * as React from "react";
import { createSlice } from "@reduxjs/toolkit";
import { WebView } from "tns-core-modules/ui/web-view/web-view";

/* Not strictly the most correct typing for an action, but accurate enough to work with*/
type Action<P, T = { type: string }> = T & {
    payload: P;
};

export enum RetractionState {
    revealed = "revealed",
    retracting = "retracting",
    retracted = "retracted",
    revealing = "revealing",
}

const barsSlice = createSlice({
    name: 'bars',
    initialState: {
        header: {
            retraction: RetractionState.revealed
        },
        footer: {
            retraction: RetractionState.revealed
        },
    },
    reducers: {
        setBarsRetraction(
            state,
            action: Action<{ bars: "header"|"footer"|"both", animated: boolean, retraction: RetractionState.retracted|RetractionState.revealed }>
        ){
            const { bars, animated, retraction } = action.payload;
            // We'll ignore animation for now.
            switch(bars){
                case "header":
                    state.header.retraction = retraction;
                case "footer":
                    state.footer.retraction = retraction;
                case "both":
                    state.header.retraction = retraction;
                    state.footer.retraction = retraction;
            }
        },
        setHeaderRetraction(
            state,
            action: Action<{ animated: boolean, retraction: RetractionState.retracted|RetractionState.revealed }>
        ){

        },
        setFooterRetraction(
            state,
            action: Action<{ animated: boolean, retraction: RetractionState.retracted|RetractionState.revealed }>
        ){

        },
    }
});

export const { } = barsSlice.actions;
export const barsSliceReducer = barsSlice.reducer;

export function setBarsRetraction(payload: { bars: "header"|"footer"|"both", animated: boolean, retraction: RetractionState.retracted|RetractionState.revealed }) {
    return function(dispatch, getState) {
        const { bars, animated, retraction } = payload;

        console.log(`[setBarsRetraction]`, payload);

        return dispatch(barsSlice.actions.setBarsRetraction({ bars, animated, retraction }));
    };
}

export function setHeaderRetraction(payload: { animated: boolean, retraction: RetractionState.retracted|RetractionState.revealed }) {
    return function(dispatch, getState) {
        const { animated, retraction } = payload;

        return dispatch(barsSlice.actions.setHeaderRetraction({ animated, retraction }));
    };
}

export function setFooterRetraction(payload: { animated: boolean, retraction: RetractionState.retracted|RetractionState.revealed }) {
    return function(dispatch, getState) {
        const { animated, retraction } = payload;

        return dispatch(barsSlice.actions.setFooterRetraction({ animated, retraction }));
    };
}
