import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gallery from "@/redux/slices/gallery.slice";
import aboutMe from "@/redux/slices/aboutMe.slice";

const rootReducer = combineReducers({
    gallery,
    aboutMe,
});

export const store = configureStore({
    reducer: rootReducer,
});
