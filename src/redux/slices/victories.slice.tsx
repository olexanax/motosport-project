//libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "@/hooks/useHttp";
//types
import {
  VictoriesItemType,
  VictoriesResponse,
  UpdateVictoriesItemType,
  CreateVictoriesItemType,
} from "../types";
//API
import { serverDomain } from "@/services/API";
import axios from "axios";
import { adminInstance } from "@/services/AdminAPI";

interface VictoriesInitialState {
  victories: VictoriesItemType[];
  fetchVictoriesStatus: "idle" | "loading" | "error";
}

const initialState: VictoriesInitialState = {
  victories: [],
  fetchVictoriesStatus: "loading",
};

export const fetchVictories = createAsyncThunk(
  "victories/fetchVictories",
  (next: string | undefined) => {
    const { request } = useHttp();
    return request(`${serverDomain}/victories/`, "GET", null, {
      "Content-Type": "application/json",
    });
  }
);

export const deleteVictories = createAsyncThunk(
  "victories/deleteVictories",
  async (id: number) => {
    await adminInstance.delete(`${serverDomain}/victories/${id}`, {
      headers: {},
    });
    return id;
  }
);

export const createVictories = createAsyncThunk<
  VictoriesItemType,
  CreateVictoriesItemType
>("victories/createVictories", async (payload) => {
  const { data } = await adminInstance.post(
    `${serverDomain}/victories/`,
    payload.formData
  );

  return data;
});

export const updateVictories = createAsyncThunk<
  VictoriesItemType,
  UpdateVictoriesItemType
>("victories/updateVictories", async (payload) => {
  const { data } = await adminInstance.patch(
    `${serverDomain}/victories/${payload.id}/`,

    payload.formData
  );

  return data;
});

export const updateVictoriesOrder = createAsyncThunk(
  "victories/updateVictoriesOrder",
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
      `${serverDomain}/victories/${dragItem.id}/`,
      hoveredFormData
    );

    const hoveredItemResponse = await adminInstance.patch(
      `${serverDomain}/victories/${hoverItem.id}/`,
      draggedFormData
    );

    const { request } = useHttp();

    return await request(`${serverDomain}/victories/`, "GET", null, {
      "Content-Type": "application/json",
    });
  }
);

const victoriesSlice = createSlice({
  name: "marketingPartners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVictories.pending, (state) => {
        state.fetchVictoriesStatus = "loading";
      })
      .addCase(fetchVictories.fulfilled, (state, { payload }) => {
        payload as VictoriesResponse;
        state.victories = payload;
        state.fetchVictoriesStatus = "idle";
      })
      .addCase(fetchVictories.rejected, (state) => {
        state.fetchVictoriesStatus = "error";
      })
      .addCase(deleteVictories.fulfilled, (state, { payload }) => {
        state.victories = state.victories.filter((item) => item.id !== payload);
      })
      .addCase(createVictories.fulfilled, (state, { payload }) => {
        state.victories.push(payload);
      })
      .addCase(updateVictories.fulfilled, (state, { payload }) => {
        state.victories = state.victories.map((item) =>
          item.id === payload.id ? payload : item
        );
      })
      //Edit order
      .addCase(updateVictoriesOrder.pending, (state, { payload }) => {
        state.fetchVictoriesStatus = "loading";
      })
      .addCase(updateVictoriesOrder.fulfilled, (state, { payload }) => {
        state.fetchVictoriesStatus = "idle";
        state.victories = [...payload];
      })
      .addCase(updateVictoriesOrder.rejected, (state, { payload }) => {
        state.fetchVictoriesStatus = "error";
      });
  },
});

const { reducer } = victoriesSlice;
export default reducer;
