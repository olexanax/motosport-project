//libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "@/hooks/useHttp";
//types
import {
  PartnersItemType,
  PartnersResponse,
  UpdatePartnersItemType,
  CreatePartnersItemType,
} from "../types";
//API
import { serverDomain } from "@/services/API";
import { adminInstance } from "@/services/AdminAPI";

interface PartnersInitialState {
  partners: PartnersItemType[];
  fetchPartnersStatus: "idle" | "loading" | "error";
}

const initialState: PartnersInitialState = {
  partners: [],
  fetchPartnersStatus: "loading",
};

export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  (next: string | undefined) => {
    const { request } = useHttp();
    return request(`${serverDomain}/our-partners/`, "GET", null, {
      "Content-Type": "application/json",
    });
  }
);

export const deletePartners = createAsyncThunk(
  "partners/deletePartners",
  async (id: number) => {
    await adminInstance.delete(`${serverDomain}/our-partners/${id}`, {
      headers: {},
    });
    return id;
  }
);

export const createPartners = createAsyncThunk<
  PartnersItemType,
  CreatePartnersItemType
>("partners/createPartners", async (payload) => {
  const { data } = await adminInstance.post(
    `${serverDomain}/our-partners/`,
    payload.formData
  );

  return data;
});

export const updatePartners = createAsyncThunk<
  PartnersItemType,
  UpdatePartnersItemType
>("partners/updatePartners", async (payload) => {
  const { data } = await adminInstance.patch(
    `${serverDomain}/our-partners/${payload.id}/`,
    payload.formData
  );

  return data;
});

export const updatePartnersOrder = createAsyncThunk(
  "partners/updatePartnersOrder",
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
      `${serverDomain}/our-partners/${dragItem.id}/`,
      hoveredFormData
    );

    const hoveredItemResponse = await adminInstance.patch(
      `${serverDomain}/our-partners/${hoverItem.id}/`,
      draggedFormData
    );

    const { request } = useHttp();

    return await request(`${serverDomain}/our-partners/`, "GET", null, {
      "Content-Type": "application/json",
    });
  }
);

const partnersSlice = createSlice({
  name: "marketingPartners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPartners.pending, (state) => {
        state.fetchPartnersStatus = "loading";
      })
      .addCase(fetchPartners.fulfilled, (state, { payload }) => {
        payload as PartnersResponse;
        state.partners = payload;
        state.fetchPartnersStatus = "idle";
      })
      .addCase(fetchPartners.rejected, (state) => {
        state.fetchPartnersStatus = "error";
      })
      .addCase(deletePartners.fulfilled, (state, { payload }) => {
        state.partners = state.partners.filter((item) => item.id !== payload);
      })
      .addCase(createPartners.fulfilled, (state, { payload }) => {
        state.partners.push(payload);
      })
      .addCase(updatePartners.fulfilled, (state, { payload }) => {
        state.partners = state.partners.map((item) =>
          item.id === payload.id ? payload : item
        );
      })
      //Edit order
      .addCase(updatePartnersOrder.pending, (state, { payload }) => {
        state.fetchPartnersStatus = "loading";
      })
      .addCase(updatePartnersOrder.fulfilled, (state, { payload }) => {
        state.fetchPartnersStatus = "idle";
        state.partners = [...payload];
      })
      .addCase(updatePartnersOrder.rejected, (state, { payload }) => {
        state.fetchPartnersStatus = "error";
      });
  },
});

const { reducer } = partnersSlice;
export default reducer;
