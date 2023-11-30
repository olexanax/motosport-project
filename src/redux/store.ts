import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gallery from "@/redux/slices/gallery.slice";
import aboutMe from "@/redux/slices/aboutMe.slice";
import partners from "@/redux/slices/partners.slice";
import victories from "@/redux/slices/victories.slice";

const rootReducer = combineReducers({
    gallery,
    aboutMe,
    partners,
    victories,
});

export const store = configureStore({
    reducer: rootReducer,
});
