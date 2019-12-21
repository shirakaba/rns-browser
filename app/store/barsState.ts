import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThunkAction } from "redux-thunk";
import { Action } from 'redux';
import { WholeStoreState, AppThunk } from "./store";
import { RetractionState } from "~/nativeElements/BarAwareWebView/bar-aware-web-view-interfaces";

type RetractionTarget = RetractionState.retracted|RetractionState.revealed;
type AnimatedArg = { animated: boolean };
type SetBarRetractionArgs = { retraction: RetractionTarget };
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
        setHeaderRetraction(
            state,
            action: PayloadAction<RetractionTarget>
        ){
            const retraction = action.payload;

            state.header.retraction = retraction;
        },
        setFooterRetraction(
            state,
            action: PayloadAction<RetractionTarget>
        ){
            const retraction = action.payload;

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

        return dispatch(barsSlice.actions.setHeaderRetraction(retraction));
    };
}

export function setFooterRetraction(args: SetBarRetractionArgs & AnimatedArg): AppThunk {
    return function(dispatch, getState) {
        const { animated, retraction } = args;

        if(getState().bars.footer.retraction === retraction){
            return Promise.resolve();
        }

        return dispatch(barsSlice.actions.setFooterRetraction(retraction));
    };
}
