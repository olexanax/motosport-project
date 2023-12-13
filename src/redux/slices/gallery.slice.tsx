//libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "@/hooks/useHttp";
//types
import {
  GalleryItemType,
  GalleryResponse,
  UpdateGalleryItemType,
  CreateGalleryItemType,
} from "../types";
//API
import { serverDomain } from "@/services/API";
import axios from "axios";
import { adminInstance } from "@/services/AdminAPI";

interface GalleryInitialState {
  gallery: GalleryItemType[];
  fetchGalleryStatus: "idle" | "loading" | "error";
}

const initialState: GalleryInitialState = {
  gallery: [],
  fetchGalleryStatus: "loading",
};

export const fetchGallery = createAsyncThunk(
  "gallery/fetchGallery",
  (next: string | undefined) => {
    const { request } = useHttp();
    return request(`${serverDomain}/gallery/`, "GET", null, {
      "Content-Type": "application/json",
    });
  }
);

export const deleteGallery = createAsyncThunk(
  "gallery/deleteGallery",
  async (id: number) => {
    await adminInstance.delete(`${serverDomain}/gallery/${id}`, {
      headers: {},
    });
    return id;
  }
);

export const createGallery = createAsyncThunk<
  GalleryItemType,
  CreateGalleryItemType
>("gallery/createGallery", async (payload) => {
  const { data } = await adminInstance.post(
    `${serverDomain}/gallery/`,
    payload.formData
  );

  return data;
});

export const updateGallery = createAsyncThunk<
  GalleryItemType,
  UpdateGalleryItemType
>("gallery/updateGallery", async (payload) => {
  const { data } = await adminInstance.patch(
    `/gallery/${payload.id}/`,
    payload.formData
  );

  return data;
});

export const updateGalleryOrder = createAsyncThunk(
  "gallery/updateGalleryOrder",
  async (data: {
    dragItem: {
      id: number;
      order: number;
    };
    hoverItem: {
      id: number;
      order: number;
    };
  }) => {
    const { dragItem, hoverItem } = data;

    const draggedFormData = new FormData();
    draggedFormData.append("order", dragItem.order.toString());

    const hoveredFormData = new FormData();
    hoveredFormData.append("order", hoverItem.order.toString());

    const draggedItemResponse = await adminInstance.patch(
      `${serverDomain}/gallery/${dragItem.id}/`,
      hoveredFormData
    );

    const hoveredItemResponse = await adminInstance.patch(
      `${serverDomain}/gallery/${hoverItem.id}/`,
      draggedFormData
    );

    const { request } = useHttp();

    return await request(`${serverDomain}/gallery/`, "GET", null, {
      "Content-Type": "application/json",
    });
  }
);

const gallerySlice = createSlice({
  name: "marketingPartners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallery.pending, (state) => {
        state.fetchGalleryStatus = "loading";
      })
      .addCase(fetchGallery.fulfilled, (state, { payload }) => {
        payload as GalleryResponse;
        state.gallery = payload;
        state.fetchGalleryStatus = "idle";
      })
      .addCase(fetchGallery.rejected, (state) => {
        state.fetchGalleryStatus = "error";
      })
      .addCase(deleteGallery.fulfilled, (state, { payload }) => {
        state.gallery = state.gallery.filter((item) => item.id !== payload);
      })
      .addCase(createGallery.fulfilled, (state, { payload }) => {
        state.gallery.push(payload);
      })
      .addCase(updateGallery.fulfilled, (state, { payload }) => {
        state.gallery = state.gallery.map((item) =>
          item.id === payload.id ? payload : item
        );
      })
      //Edit order
      .addCase(updateGalleryOrder.pending, (state, { payload }) => {
        state.fetchGalleryStatus = "loading";
      })
      .addCase(updateGalleryOrder.fulfilled, (state, { payload }) => {
        state.fetchGalleryStatus = "idle";
        state.gallery = [...payload];
      })
      .addCase(updateGalleryOrder.rejected, (state, { payload }) => {
        state.fetchGalleryStatus = "error";
      });
  },
});

const { reducer } = gallerySlice;
export default reducer;
