//libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "@/hooks/useHttp";
//types
import { GalleryItemType, GalleryResponse, UpdateGalleryItemType, CreateGalleryItemType } from "../types";
//API
import { serverDomain } from "@/services/API";
import axios from "axios";

interface GalleryInitialState {
  gallery: GalleryItemType[];
  fetchGalleryStatus: "idle" | "loading" | "error";
}

const initialState: GalleryInitialState = {
  gallery: [],
  fetchGalleryStatus: "loading"
};

export const fetchGallery = createAsyncThunk(
  "gallery/fetchGallery",
  (next: string | undefined) => {
    const { request } = useHttp();
    return request(`${serverDomain}/gallery/`,
      "GET",
      null,
      {
        "Content-Type": "application/json",
      }
    );
  }
);

export const deleteGallery = createAsyncThunk(
  "gallery/deleteGallery",
  async (id: number) => {
    await axios.delete(`${serverDomain}/gallery/${id}`, {
      headers: {
      },
    });
    return id;
  }
);

export const createGallery = createAsyncThunk<GalleryItemType, CreateGalleryItemType>(
  "gallery/createGallery",
  async (payload) => {
    const { request } = useHttp();
    return request(`${serverDomain}/gallery/`, "POST", payload.formData, {
    });
  }
);

export const updateGallery = createAsyncThunk<GalleryItemType, UpdateGalleryItemType>(
  "gallery/updateGallery",
  async (payload) => {
    const { request } = useHttp();
    return request(`${serverDomain}/gallery/${payload.id}/`, "PATCH", payload.formData, {
    })
  }
);

// export const updatePartnerOrder = createAsyncThunk(
//   "marketing/partner-clients/updatePartnerOrder",
//   async (data: {
//     dragItem: {
//       id: number;
//       order: number;
//     };
//     hoverItem: {
//       id: number;
//       order: number;
//     };
//   }) => {
//     const { dragItem, hoverItem } = data;

//     const draggedFormData = new FormData();
//     draggedFormData.append("order", dragItem.order.toString());

//     const hoveredFormData = new FormData();
//     hoveredFormData.append("order", hoverItem.order.toString());

//     const draggedItemResponse = await axios.patch(
//       `${serverDomain}api/v1/partner-clients/${dragItem.id}/`,
//       hoveredFormData
//     );

//     const hoveredItemResponse = await axios.patch(
//       `${serverDomain}api/v1/partner-clients/${hoverItem.id}/`,
//       draggedFormData
//     );

//     const { request } = useHttp();
//     const result = await request(
//       `${serverDomain}api/v1/partner-clients/`,
//       "GET",
//       null,
//       {
//         Authorization: `Bearer ${localStorage.getItem("access")}`,
//         "Content-Type": "application/json",
//       }
//     );

//     return result.results;
//   }
// );

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
        state.gallery = state.gallery.map((item) => item.id === payload.id ? payload : item);
      })

  },
});

const { reducer } = gallerySlice;
export default reducer;
