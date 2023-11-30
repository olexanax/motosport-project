import { store } from "@/redux/store";

export type RootStateType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

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
