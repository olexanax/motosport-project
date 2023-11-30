//libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "@/hooks/useHttp";
//types
import { AboutMeItemType, AboutMeResponse, UpdateAboutMeItemType, CreateAboutMeItemType } from "../types";
//API
import { serverDomain } from "@/services/API";
import axios from "axios";

interface AboutMeInitialState {
  aboutMe: AboutMeItemType[];
  fetchAboutMeStatus: "idle" | "loading" | "error";
}

const initialState: AboutMeInitialState = {
  aboutMe: [],
  fetchAboutMeStatus: "loading"
};

export const fetchAboutMe = createAsyncThunk(
  "aboutMe/fetchAboutMe",
  (next: string | undefined) => {
    const { request } = useHttp();
    return request(`${serverDomain}/about-me/`,
      "GET",
      null,
      {
        "Content-Type": "application/json",
      }
    );
  }
);

export const deleteAboutMe = createAsyncThunk(
  "aboutMe/deleteAboutMe",
  async (id: number) => {
    await axios.delete(`${serverDomain}/about-me/${id}`, {
      headers: {
      },
    });
    return id;
  }
);

export const createAboutMe = createAsyncThunk<AboutMeItemType, CreateAboutMeItemType>(
  "aboutMe/createAboutMe",
  async (payload) => {
    const { request } = useHttp();
    return request(`${serverDomain}/about-me/`, "POST", payload.formData, {
    });
  }
);

export const updateAboutMe = createAsyncThunk<AboutMeItemType, UpdateAboutMeItemType>(
  "aboutMe/updateAboutMe",
  async (payload) => {
    const { request } = useHttp();
    return request(`${serverDomain}/about-me/${payload.id}/`, "PATCH", payload.formData, {
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
        state.aboutMe = state.aboutMe.map((item) => item.id === payload.id ? payload : item);
      })

  },
});

const { reducer } = aboutMeSlice;
export default reducer;
