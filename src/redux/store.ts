import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gallery from "@/redux/slices/gallery.slice";
import aboutMe from "@/redux/slices/aboutMe.slice";
import login from "@/redux/slices/login.slice";

const rootReducer = combineReducers({
    gallery,
    aboutMe,
    login
});

export const store = configureStore({
    reducer: rootReducer,
});
