import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import { rootReducer, RootReducer } from "./rootReducer";
import thunk from 'redux-thunk';

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk],
});

export type WholeStoreState = RootReducer;