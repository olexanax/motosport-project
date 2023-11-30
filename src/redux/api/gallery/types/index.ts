export type GalleryItemType = {
    id: number;
    order: number;
    image: string;
};
export type GetGalleryResponse = GalleryItemType[];

export interface GetGalleryQueryArgs {
    page: string;
}

export type PatchGalleryItemPayload = {
    id: number;
    formData: FormData;
};
export type DeleteGalleryItemPayload = {
    id: number;
};
export type CreateGalleryItemPayload = {
    formData: FormData;
};
