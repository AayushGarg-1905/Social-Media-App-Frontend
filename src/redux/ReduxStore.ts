import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthSlice";

const ReduxStore = configureStore({
    reducer:{
        auth: AuthReducer
    }
})

export type RootState = ReturnType<typeof ReduxStore.getState>
export type AppDispatch = typeof ReduxStore.dispatch

export default ReduxStore;