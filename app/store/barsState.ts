import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { Action } from 'redux';
import { WholeStoreState, AppThunk } from "./store";
import { RetractionState } from "~/nativeElements/BarAwareWebView/bar-aware-web-view-interfaces";

type AnimatedArg = { animated: boolean };
type SetBarRetractionArgs = { retraction: RetractionState.retracted|RetractionState.revealed };
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
            const { bars, retraction } = action.payload;
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
            const { retraction } = action.payload;

            state.header.retraction = retraction;
        },
        setFooterRetraction(
            state,
            action: PayloadAction<SetBarRetractionArgs>
        ){
            const { retraction } = action.payload;

            state.footer.retraction = retraction;
        },
    }
});

export const { } = barsSlice.actions;
export const barsSliceReducer = barsSlice.reducer;

export function setBarsRetraction(args: SetBarsRetractionArgs & AnimatedArg): AppThunk {
    return function(dispatch, getState) {
        const { bars, animated, retraction } = args;
        const dispatchArgs = { animated, retraction };

        // console.log(`[setBarsRetraction]`, payload);

        if(bars === "both"){
            return Promise.all([
                dispatch(setHeaderRetraction(dispatchArgs)),
                dispatch(setFooterRetraction(dispatchArgs)),
            ]);
        } else {
            return dispatch(
                bars === "header" ?
                    setHeaderRetraction(dispatchArgs) :
                    setFooterRetraction(dispatchArgs)
            );
        }
    };
}

export function setHeaderRetraction(args: SetBarRetractionArgs & AnimatedArg): AppThunk {
    return function(dispatch, getState) {
        const { animated, retraction } = args;

        if(getState().bars.header.retraction === retraction){
            return Promise.resolve();
        }

        return dispatch(barsSlice.actions.setHeaderRetraction({ animated, retraction }));
    };
}

export function setFooterRetraction(args: SetBarRetractionArgs & AnimatedArg): AppThunk {
    return function(dispatch, getState) {
        const { animated, retraction } = args;

        if(getState().bars.footer.retraction === retraction){
            return Promise.resolve();
        }

        return dispatch(barsSlice.actions.setFooterRetraction({ animated, retraction }));
    };
}
