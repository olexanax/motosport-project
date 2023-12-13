//libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "@/hooks/useHttp";
//types
import {
  AboutMeItemType,
  AboutMeResponse,
  UpdateAboutMeItemType,
  CreateAboutMeItemType,
} from "../types";
//API
import { serverDomain } from "@/services/API";
import axios from "axios";
import { adminInstance } from "@/services/AdminAPI";

interface AboutMeInitialState {
  aboutMe: AboutMeItemType[];
  fetchAboutMeStatus: "idle" | "loading" | "error";
}

const initialState: AboutMeInitialState = {
  aboutMe: [],
  fetchAboutMeStatus: "loading",
};

export const fetchAboutMe = createAsyncThunk(
  "aboutMe/fetchAboutMe",
  (next: string | undefined) => {
    const { request } = useHttp();
    return request(`${serverDomain}/about-me/`, "GET", null, {
      "Content-Type": "application/json",
    });
  }
);

export const deleteAboutMe = createAsyncThunk(
  "aboutMe/deleteAboutMe",
  async (id: number) => {
    await adminInstance.delete(`/about-me/${id}`, {
      headers: {},
    });
    return id;
  }
);

export const createAboutMe = createAsyncThunk<
  AboutMeItemType,
  CreateAboutMeItemType
>("aboutMe/createAboutMe", async (payload) => {
  const { data } = await adminInstance.post("/about-me/", payload.formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
});

export const updateAboutMe = createAsyncThunk<
  AboutMeItemType,
  UpdateAboutMeItemType
>("aboutMe/updateAboutMe", async (payload) => {
  return adminInstance.patch(`/about-me/${payload.id}/`, payload.formData);
});

export const updateAboutMeOrder = createAsyncThunk(
  "aboutMe/updateAboutMeOrder",
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
      `${serverDomain}/about-me/${dragItem.id}/`,
      hoveredFormData
    );

    const hoveredItemResponse = await adminInstance.patch(
      `${serverDomain}/about-me/${hoverItem.id}/`,
      draggedFormData
    );

    const { request } = useHttp();

    return await request(`${serverDomain}/about-me/`, "GET", null, {
      "Content-Type": "application/json",
    });
  }
);

const aboutMeSlice = createSlice({
  name: "marketingPartners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutMe.pending, (state) => {
        state.fetchAboutMeStatus = "loading";
      })
      .addCase(fetchAboutMe.fulfilled, (state, { payload }) => {
        payload as AboutMeResponse;
        state.aboutMe = payload;
        state.fetchAboutMeStatus = "idle";
      })
      .addCase(fetchAboutMe.rejected, (state) => {
        state.fetchAboutMeStatus = "error";
      })
      .addCase(deleteAboutMe.fulfilled, (state, { payload }) => {
        state.aboutMe = state.aboutMe.filter((item) => item.id !== payload);
      })
      .addCase(createAboutMe.fulfilled, (state, { payload }) => {
        state.aboutMe.push(payload);
      })
      .addCase(updateAboutMe.fulfilled, (state, { payload }) => {
        state.aboutMe = state.aboutMe.map((item) =>
          item.id === payload.id ? payload : item
        );
      })
      //Edit order
      .addCase(updateAboutMeOrder.pending, (state, { payload }) => {
        state.fetchAboutMeStatus = "loading";
      })
      .addCase(updateAboutMeOrder.fulfilled, (state, { payload }) => {
        state.fetchAboutMeStatus = "idle";
        state.aboutMe = [...payload];
      })
      .addCase(updateAboutMeOrder.rejected, (state, { payload }) => {
        state.fetchAboutMeStatus = "error";
      });
  },
});

const { reducer } = aboutMeSlice;
export default reducer;
