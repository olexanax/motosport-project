//libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "@/hooks/useHttp";
//types
//API
import { serverDomain } from "@/services/API";
import axios from "axios";
import { adminInstance } from "@/services/AdminAPI";

interface BecomePartnerInitialState {
  file: {
    id: number;
    pdf: string;
    language: "EN" | "UA";
  } | null;
  fetchBecomePartnerStatus: "idle" | "loading" | "error";
}

const initialState: BecomePartnerInitialState = {
  file: null,
  fetchBecomePartnerStatus: "loading",
};

export const fetchBecomePartner = createAsyncThunk(
  "becomePartner/fetchAboutMe",
  (id: number) => {
    const { request } = useHttp();
    return request(`${serverDomain}/become-partner-pdf/${id}`, "GET", null, {
      "Content-Type": "application/json",
    });
  }
);

export const createBecomePartner = createAsyncThunk<
  {
    id: number;
    pdf: string;
    language: "EN" | "UA";
  },
  FormData
>("becomePartner/createBecomePartner", async (payload) => {
  const { data } = await adminInstance.post("/become-partner-pdf/", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return data;
});

export const updateBecomePartner = createAsyncThunk<
  {
    id: number;
    pdf: string;
    language: "EN" | "UA";
  },
  {
    id: number;
    formData: FormData;
  }
>("becomePartner/updateBecomePartner", async (payload) => {
  const { data } = await adminInstance.patch(
    `/become-partner-pdf/${payload.id}/`,
    payload.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
});

const becomePartnerSlice = createSlice({
  name: "becomePartner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBecomePartner.pending, (state) => {
        state.fetchBecomePartnerStatus = "loading";
      })
      .addCase(fetchBecomePartner.fulfilled, (state, { payload }) => {
        payload as {
          id: number;
          pdf: FormData;
          language: "EN" | "UA";
        };
        state.file = payload;
        state.fetchBecomePartnerStatus = "idle";
      })
      .addCase(fetchBecomePartner.rejected, (state) => {
        state.fetchBecomePartnerStatus = "error";
      })
      .addCase(createBecomePartner.fulfilled, (state, { payload }) => {
        state.file = payload;
      })
      .addCase(updateBecomePartner.fulfilled, (state, { payload }) => {
        state.file = payload;
      });
  },
});

const { reducer } = becomePartnerSlice;
export default reducer;
