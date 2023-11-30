//libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "@/hooks/useHttp";
//types
import { PartnersItemType, PartnersResponse, UpdatePartnersItemType, CreatePartnersItemType } from "../types";
//API
import { serverDomain } from "@/services/API";
import axios from "axios";

interface PartnersInitialState {
  partners: PartnersItemType[];
  fetchPartnersStatus: "idle" | "loading" | "error";
}

const initialState: PartnersInitialState = {
  partners: [],
  fetchPartnersStatus: "loading"
};

export const fetchPartners = createAsyncThunk(
  "partners/fetchPartners",
  (next: string | undefined) => {
    const { request } = useHttp();
    return request(`${serverDomain}/our-partners/`,
      "GET",
      null,
      {
        "Content-Type": "application/json",
      }
    );
  }
);

export const deletePartners = createAsyncThunk(
  "partners/deletePartners",
  async (id: number) => {
    await axios.delete(`${serverDomain}/our-partners/${id}`, {
      headers: {
      },
    });
    return id;
  }
);

export const createPartners = createAsyncThunk<PartnersItemType, CreatePartnersItemType>(
  "partners/createPartners",
  async (payload) => {
    const { request } = useHttp();
    return request(`${serverDomain}/our-partners/`, "POST", payload.formData, {
    });
  }
);

export const updatePartners = createAsyncThunk<PartnersItemType, UpdatePartnersItemType>(
  "partners/updatePartners",
  async (payload) => {
    const { request } = useHttp();
    return request(`${serverDomain}/our-partners/${payload.id}/`, "PATCH", payload.formData, {
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
        state.partners = state.partners.map((item) => item.id === payload.id ? payload : item);
      })

  },
});

const { reducer } = partnersSlice;
export default reducer;
