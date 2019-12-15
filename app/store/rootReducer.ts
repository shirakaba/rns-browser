import { combineReducers } from "@reduxjs/toolkit";
import { navigationSliceReducer } from "./navigationState";

export const rootReducer = combineReducers({
    navigation: navigationSliceReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;