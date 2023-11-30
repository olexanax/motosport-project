import { store } from "@/redux/store";
export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

type languagesType = "en" | "ua";

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
