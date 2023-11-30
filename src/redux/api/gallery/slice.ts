import { baseApi } from "../base/slice";
import qs from "query-string";
import type {
    GetGalleryResponse,
    GetGalleryQueryArgs,
    PatchGalleryItemPayload,
    GalleryItemType,
    DeleteGalleryItemPayload,
    CreateGalleryItemPayload,
} from "./types";

export const galleryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getGallery: builder.query<
            GetGalleryResponse,
            Partial<GetGalleryQueryArgs>
        >({
            query: ({ page = 1, ...params }) => {
                const query = qs.stringify(params);
                return `/gallery/?page=${page}&${query}`;
            },
            providesTags: ["Gallery"],
            transformResponse: (response: GetGalleryResponse) => response,
        }),
        patchGallery: builder.mutation<
            GalleryItemType,
            PatchGalleryItemPayload
        >({
            query: (payload) => ({
                url: `/gallery/${payload.id}/`,
                method: "PATCH",
                body: payload.formData,
                headers: {
                    // "Content-Type":
                    //     "multipart/form-data; boundary=<calculated when request is sent>",
                    // accept: "application/json",
                },
            }),
            invalidatesTags: ["Gallery"],
        }),
        deleteGalleryItem: builder.mutation<
            GalleryItemType,
            DeleteGalleryItemPayload
        >({
            // Запит на видалення
            query: (payload) => ({
                url: `/gallery/${payload.id}/`,
                method: "DELETE",
            }),
            invalidatesTags: ["Gallery"],
            transformResponse: (response: GalleryItemType) => response,
        }),
        createGalleryItem: builder.mutation<
            GalleryItemType,
            CreateGalleryItemPayload
        >({
            // POST-запит
            query: (payload) => ({
                url: "/gallery/",
                method: "POST",
                body: payload.formData,
                headers: {
                    "Content-Type":
                        "multipart/form-data; boundary=<calculated when request is sent>",
                    accept: "application/json",
                },
            }),
            invalidatesTags: ["Gallery"],
            transformResponse: (response: GalleryItemType) => response,
        }),
    }),
});

export const {
    useGetGalleryQuery,
    usePatchGalleryMutation,
    useDeleteGalleryItemMutation,
    useCreateGalleryItemMutation,
} = galleryApi;
