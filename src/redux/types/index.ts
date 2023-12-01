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
    order: number;
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
    order: number;
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
    order: number;
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
    order: number;
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
    order: number;
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
    order: number;
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

//staticContent

export interface StaticContentItemType {
    id: number;
    alt_tags: {
        [key: string]: string;
    };
    language: "UA" | "EN";
    content: {
        [key: string]: string;
    };
    meta_tags: {
        [key: string]: string;
    };
    heading_tags: {
        [key: string]: string;
    };
}
export interface UpdateStaticContentItemType {
    id: number;
    data: Partial<StaticContentItemType>;
}

export type StaticContentResponse = StaticContentItemType[];
export interface UpdateStaticContentResponse extends StaticContentItemType {
    pending_changes: boolean;
}

//static images
export interface StaticImagesItemType {
    id: number;
    image_name: string;
    format: string;
    weight: string;
    image: string;
    alt_text: string;
}
export interface UpdateStaticImagesItemType {
    id: number;
    formData: FormData;
}

export type StaticImagesResponse = StaticImagesItemType[];
export interface UpdateStaticImagesResponse extends StaticImagesItemType {
    pending_changes: boolean;
}
