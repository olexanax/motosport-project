//libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "@/hooks/useHttp";
//types
import {
  MyStoryItemType,
  MyStoryResponse,
  UpdateMyStoryItemType,
  CreateMyStoryItemType,
} from "../types";
//API
import { serverDomain } from "@/services/API";
import axios from "axios";
import { adminInstance } from "@/services/AdminAPI";

interface MyStoryInitialState {
  myStory: MyStoryItemType[];
  fetchMyStoryStatus: "idle" | "loading" | "error";
}

const initialState: MyStoryInitialState = {
  myStory: [],
  fetchMyStoryStatus: "loading",
};

export const fetchMyStory = createAsyncThunk(
  "myStory/fetchMyStory",
  (next: string | undefined) => {
    const { request } = useHttp();
    return request(`${serverDomain}/my-story/`, "GET", null, {
      "Content-Type": "application/json",
    });
  }
);

export const deleteMyStory = createAsyncThunk(
  "myStory/deleteMyStory",
  async (id: number) => {
    await adminInstance.delete(`/my-story/${id}`, {
      headers: {},
    });
    return id;
  }
);

export const createMyStory = createAsyncThunk<
  MyStoryItemType,
  CreateMyStoryItemType
>("myStory/createMyStory", async (payload) => {
  const { data } = await adminInstance.post(`/my-story/`, payload.formData);

  return data;
});

export const updateMyStory = createAsyncThunk<
  MyStoryItemType,
  UpdateMyStoryItemType
>("myStory/updateMyStory", async (payload) => {
  const { data } = await adminInstance.patch(
    `/my-story/${payload.id}/`,
    payload.formData
  );

  return data;
});

export const updateMyStoryOrder = createAsyncThunk(
  "myStory/updateMyStoryOrder",
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
      `${serverDomain}/my-story/${dragItem.id}/`,
      hoveredFormData
    );

    const hoveredItemResponse = await adminInstance.patch(
      `${serverDomain}/my-story/${hoverItem.id}/`,
      draggedFormData
    );

    const { request } = useHttp();

    return await request(`${serverDomain}/my-story/`, "GET", null, {
      "Content-Type": "application/json",
    });
  }
);

const myStorySlice = createSlice({
  name: "marketingPartners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyStory.pending, (state) => {
        state.fetchMyStoryStatus = "loading";
      })
      .addCase(fetchMyStory.fulfilled, (state, { payload }) => {
        payload as MyStoryResponse;
        state.myStory = payload;
        state.fetchMyStoryStatus = "idle";
      })
      .addCase(fetchMyStory.rejected, (state) => {
        state.fetchMyStoryStatus = "error";
      })
      .addCase(deleteMyStory.fulfilled, (state, { payload }) => {
        state.myStory = state.myStory.filter((item) => item.id !== payload);
      })
      .addCase(createMyStory.fulfilled, (state, { payload }) => {
        state.myStory.push(payload);
      })
      .addCase(updateMyStory.fulfilled, (state, { payload }) => {
        state.myStory = state.myStory.map((item) =>
          item.id === payload.id ? payload : item
        );
      })
      //Edit order
      .addCase(updateMyStoryOrder.pending, (state, { payload }) => {
        state.fetchMyStoryStatus = "loading";
      })
      .addCase(updateMyStoryOrder.fulfilled, (state, { payload }) => {
        state.fetchMyStoryStatus = "idle";
        state.myStory = [...payload];
      })
      .addCase(updateMyStoryOrder.rejected, (state, { payload }) => {
        state.fetchMyStoryStatus = "error";
      });
  },
});

const { reducer } = myStorySlice;
export default reducer;
