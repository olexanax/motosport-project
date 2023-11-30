import { store } from "@/redux/store";
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type languagesType = "en" | "ua";

//LOGIN
export interface LoginFormInputs {
    username: string;
    password: string;
}

//GALLERY
export interface GalleryItemType {
    id: number;
    image: string;
    order: string;
}
export interface UpdateGalleryItemType {
    id: number;
    formData: FormData;
}
export interface CreateGalleryItemType {
    formData: FormData;
}
export type GalleryResponse = GalleryItemType[];

//ABOUT ME

export interface AboutMeItemType {
    id: number;
    image: string;
    order: string;
}
export interface UpdateAboutMeItemType {
    id: number;
    formData: FormData;
}
export interface CreateAboutMeItemType {
    formData: FormData;
}
export type AboutMeResponse = AboutMeItemType[];

//PARTNERS

export interface PartnersItemType {
    id: number;
    image: string;
    order: string;
}
export interface UpdatePartnersItemType {
    id: number;
    formData: FormData;
}
export interface CreatePartnersItemType {
    formData: FormData;
}
export type PartnersResponse = PartnersItemType[];

//victories

export interface VictoriesItemType {
    id: number;
    image: string;
    order: string;
    title: string;
    description: string;
    language: languagesType;
}
export interface UpdateVictoriesItemType {
    id: number;
    formData: FormData;
}
export interface CreateVictoriesItemType {
    formData: FormData;
}
export type VictoriesResponse = VictoriesItemType[];

// my story

export interface MyStoryItemType {
    id: number;
    image: string;
    order: string;
    title: string;
    description: string;
    language: languagesType;
}
export interface UpdateMyStoryItemType {
    id: number;
    formData: FormData;
}
export interface CreateMyStoryItemType {
    formData: FormData;
}
export type MyStoryResponse = MyStoryItemType[];

//news

export interface NewsItemType {
    id: number;
    date: string;
    title: string;
    description: string;
    image: string;
    views: languagesType;
    slug: string;
    language: languagesType;
    meta_title: string;
    meta_description: string;
    short_description: string;
}
export interface UpdateNewsItemType {
    id: number;
    formData: FormData;
}
export interface CreateNewsItemType {
    formData: FormData;
}
export type NewsResponse = NewsItemType[];
