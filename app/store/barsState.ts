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
            retraction: RetractionState.revealed,
            percentRevealed: 100,
        },
        footer: {
            retraction: RetractionState.revealed,
            percentRevealed: 100,
        },
    },
    reducers: {
        setHeaderRetraction(
            state,
            action: PayloadAction<RetractionState>
        ){
            const retraction = action.payload;

            state.header.retraction = retraction;
            if(retraction === RetractionState.retracted || retraction === RetractionState.revealed){
                state.header.percentRevealed = retraction === RetractionState.retracted ? 0 : 100;
            }
        },
        setFooterRetraction(
            state,
            action: PayloadAction<RetractionState>
        ){
            const retraction = action.payload;

            state.footer.retraction = retraction;
            if(retraction === RetractionState.retracted || retraction === RetractionState.revealed){
                state.footer.percentRevealed = retraction === RetractionState.retracted ? 0 : 100;
            }
        },
        advanceHeaderRetraction(
            state,
            action: PayloadAction<RetractionTarget>
        ){
            const retraction = action.payload;

            if(retraction === state.header.retraction){
                // Already at retraction target
                return;
            }

            if(retraction === RetractionState.revealed){
                state.header.percentRevealed = Math.min(100, state.header.percentRevealed + 10);
            } else {
                state.header.percentRevealed = Math.max(0, state.header.percentRevealed - 10);
            }
        },
        advanceFooterRetraction(
            state,
            action: PayloadAction<RetractionTarget>
        ){
            const retraction = action.payload;

            if(retraction === state.footer.retraction){
                // Already at retraction target
                return;
            }

            if(retraction === RetractionState.revealed){
                state.footer.percentRevealed = Math.min(100, state.footer.percentRevealed + 10);
            } else {
                state.footer.percentRevealed = Math.max(0, state.footer.percentRevealed - 10);
            }
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

        // console.log(`[setBarsRetraction] with bars ${bars} and retractionTarget ${retraction}`);

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

        // console.log(`[setHeaderRetraction] with retractionTarget ${retraction} and retraction ${getState().bars.header.retraction}`);

        if(getState().bars.header.retraction === retraction){
            // console.log(`[setHeaderRetraction] bailing out, as retraction already met.`);
            return Promise.resolve();
        }

        // console.log(`[setHeaderRetraction] continuing, with animated ${true}`);

        return animated ? 
            dispatch(animateHeaderRetraction(retraction)) :
            dispatch(barsSlice.actions.setHeaderRetraction(retraction));
    };
}


export function setFooterRetraction(args: SetBarRetractionArgs & AnimatedArg): AppThunk {
    return function(dispatch, getState) {
        const { animated, retraction } = args;

        if(getState().bars.footer.retraction === retraction){
            return Promise.resolve();
        }

        return animated ? 
            dispatch(animateFooterRetraction(retraction)) :
            dispatch(barsSlice.actions.setFooterRetraction(retraction));
    };
}

export function animateBarsRetraction(args: SetBarsRetractionArgs & AnimatedArg): AppThunk {
    return function(dispatch, getState) {
        const { bars, animated, retraction } = args;
        const dispatchArgs = { animated, retraction };

        // console.log(`[animateBarsRetraction]`, payload);

        // console.log(`[animateBarsRetraction] with bars ${bars} and retractionTarget ${retraction}`);

        if(bars === "both"){
            return Promise.all([
                dispatch(animateHeaderRetraction(retraction)),
                dispatch(animateFooterRetraction(retraction)),
            ]);
        } else {
            return dispatch(
                bars === "header" ?
                    animateHeaderRetraction(retraction) :
                    animateFooterRetraction(retraction)
            );
        }
    };
}

export function animateHeaderRetraction(retractionTarget: RetractionTarget): AppThunk {
    // console.log(`[animateHeaderRetraction] got into thunk`);

    return function(dispatch, getState) {

        // console.log(`[animateHeaderRetraction] with retractionTarget ${retractionTarget} and retraction ${getState().bars.header.retraction}`);

        if(getState().bars.header.retraction === retractionTarget){
            return Promise.resolve();
        }

        // I'll write this properly once I've installed Redux Saga
        return new Promise((resolve, reject) => {
            resolve(
                dispatch(barsSlice.actions.setHeaderRetraction(
                    retractionTarget === RetractionState.revealed ? RetractionState.revealing : RetractionState.retracting
                ))
            );
        })
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceHeaderRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceHeaderRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceHeaderRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceHeaderRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceHeaderRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceHeaderRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceHeaderRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceHeaderRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceHeaderRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceHeaderRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => dispatch(barsSlice.actions.setHeaderRetraction(retractionTarget)));
    };
}

export function animateFooterRetraction(retractionTarget: RetractionTarget): AppThunk {
    return function(dispatch, getState) {

        if(getState().bars.footer.retraction === retractionTarget){
            return Promise.resolve();
        }

        // I'll write this properly once I've installed Redux Saga
        return new Promise((resolve, reject) => {
            dispatch(barsSlice.actions.setFooterRetraction(
                retractionTarget === RetractionState.revealed ? RetractionState.revealing : RetractionState.retracting
            ));
            resolve();
        })
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceFooterRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceFooterRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceFooterRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceFooterRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceFooterRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceFooterRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceFooterRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceFooterRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(dispatch(advanceFooterRetractionKeyframe(retractionTarget))), 1/60);
        }))
        .then(() => dispatch(barsSlice.actions.setFooterRetraction(retractionTarget)));
    };
}

export function advanceHeaderRetractionKeyframe(retractionTarget: RetractionTarget): AppThunk {
    return function(dispatch, getState) {
        const currentRetraction = getState().bars.header.retraction;

        if(currentRetraction === retractionTarget){
            return Promise.resolve();
        }

        return dispatch(barsSlice.actions.advanceHeaderRetraction(retractionTarget));
    };
}

export function advanceFooterRetractionKeyframe(retractionTarget: RetractionTarget): AppThunk {
    return function(dispatch, getState) {
        const currentRetraction = getState().bars.footer.retraction;

        if(currentRetraction === retractionTarget){
            return Promise.resolve();
        }

        return dispatch(barsSlice.actions.advanceFooterRetraction(retractionTarget));
    };
}
