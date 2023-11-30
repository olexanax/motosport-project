import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { baseApi } from "./api/base/slice";

const store = configureStore({
    reducer: {
        baseApi: baseApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
