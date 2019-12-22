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
            keyframes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            keyframe: 9,
        },
        footer: {
            retraction: RetractionState.revealed,
            keyframes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            keyframe: 9,
        },
    },
    reducers: {
        setHeaderRetraction(
            state,
            action: PayloadAction<RetractionTarget>
        ){
            const retraction = action.payload;

            state.header.retraction = retraction;
            if(retraction === RetractionState.retracted || retraction === RetractionState.revealed){
                state.header.keyframe = 9;
            }
        },
        setFooterRetraction(
            state,
            action: PayloadAction<RetractionTarget>
        ){
            const retraction = action.payload;

            state.footer.retraction = retraction;
            if(retraction === RetractionState.retracted || retraction === RetractionState.revealed){
                state.header.keyframe = 9;
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

            if(state.header.keyframe === state.header.keyframes[state.header.keyframes.length - 1]){
                // Already at final position
                return;
            }

            state.header.keyframe += 1;
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

            if(state.footer.keyframe === state.footer.keyframes[state.footer.keyframes.length - 1]){
                // Already at final position
                return;
            }

            state.footer.keyframe += 1;
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

        return animated ? 
            animateHeaderRetraction(retraction) :
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
            animateFooterRetraction(retraction) :
            dispatch(barsSlice.actions.setFooterRetraction(retraction));
    };
}

export function animateBarsRetraction(args: SetBarsRetractionArgs & AnimatedArg): AppThunk {
    return function(dispatch, getState) {
        const { bars, animated, retraction } = args;
        const dispatchArgs = { animated, retraction };

        // console.log(`[animateBarsRetraction]`, payload);

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
    return function(dispatch, getState) {

        if(getState().bars.header.retraction === retractionTarget){
            return Promise.resolve();
        }

        // I'll write this properly once I've installed Redux Saga
        return Promise.resolve()
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceHeaderRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceHeaderRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceHeaderRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceHeaderRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceHeaderRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceHeaderRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceHeaderRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceHeaderRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceHeaderRetractionKeyframe(retractionTarget)), 1/60);
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
        return Promise.resolve()
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceFooterRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceFooterRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceFooterRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceFooterRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceFooterRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceFooterRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceFooterRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceFooterRetractionKeyframe(retractionTarget)), 1/60);
        }))
        .then(() => new Promise((resolve, reject) => {
            setTimeout(() => resolve(advanceFooterRetractionKeyframe(retractionTarget)), 1/60);
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
