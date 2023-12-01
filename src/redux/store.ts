import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gallery from "@/redux/slices/gallery.slice";
import aboutMe from "@/redux/slices/aboutMe.slice";
import partners from "@/redux/slices/partners.slice";
import victories from "@/redux/slices/victories.slice";
import myStory from "@/redux/slices/myStory.slice";
import news from "@/redux/slices/news.slice";
import staticContent from "@/redux/slices/staticContent.slice";
import login from "@/redux/slices/login.slice";

const rootReducer = combineReducers({
    gallery,
    aboutMe,
    partners,
    victories,
    myStory,
    news,
    staticContent,
    login,
});

export const store = configureStore({
    reducer: rootReducer,
});
