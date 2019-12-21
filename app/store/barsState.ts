import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { Action } from 'redux';
import { WholeStoreState, AppThunk } from "./store";
import { RetractionState } from "~/nativeElements/BarAwareWebView/bar-aware-web-view-interfaces";

type SetBarRetractionArgs = { animated: boolean, retraction: RetractionState.retracted|RetractionState.revealed };
type SetBarsRetractionArgs = SetBarRetractionArgs & { bars: "header"|"footer"|"both" };

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
            action: PayloadAction<SetBarsRetractionArgs>
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
            action: PayloadAction<SetBarRetractionArgs>
        ){

        },
        setFooterRetraction(
            state,
            action: PayloadAction<SetBarRetractionArgs>
        ){

        },
    }
});

export const { } = barsSlice.actions;
export const barsSliceReducer = barsSlice.reducer;

export function setBarsRetraction(payload: SetBarsRetractionArgs): AppThunk {
    return function(dispatch, getState) {
        const { bars, animated, retraction } = payload;

        // console.log(`[setBarsRetraction]`, payload);

        return dispatch(barsSlice.actions.setBarsRetraction({ bars, animated, retraction }));
    };
}

export function setHeaderRetraction(payload: SetBarRetractionArgs): AppThunk {
    return function(dispatch, getState) {
        const { animated, retraction } = payload;

        return dispatch(barsSlice.actions.setHeaderRetraction({ animated, retraction }));
    };
}

export function setFooterRetraction(payload: SetBarRetractionArgs): AppThunk {
    return function(dispatch, getState) {
        const { animated, retraction } = payload;

        return dispatch(barsSlice.actions.setFooterRetraction({ animated, retraction }));
    };
}
