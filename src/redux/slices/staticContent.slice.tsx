//libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "@/hooks/useHttp";
//types
import {
  StaticContentItemType, UpdateStaticContentItemType,
  UpdateStaticContentResponse, StaticImagesItemType,
  UpdateStaticImagesItemType, UpdateStaticImagesResponse
} from "../types";
//API
import { serverDomain } from "@/services/API";
import axios from "axios";

interface StaticContentInitialState {
  staticContent: StaticContentItemType[];
  fetchStaticContentStatus: "idle" | "loading" | "error";
  updateStaticContentStatus: "idle" | "loading" | "error";
  generateWebpageDataStatus: "idle" | "loading" | "error";
  pending_changes: boolean;
  staticImages: StaticImagesItemType[];
  fetchStaticImagesStatus: "idle" | "loading" | "error";
  updateStaticImagesStatus: "idle" | "loading" | "error";
}

const initialState: StaticContentInitialState = {
  staticContent: [],
  fetchStaticContentStatus: "loading",
  updateStaticContentStatus: "idle",
  generateWebpageDataStatus: "idle",
  pending_changes: false,
  staticImages: [],
  fetchStaticImagesStatus: "loading",
  updateStaticImagesStatus: "idle"
};

export const fetchStaticContent = createAsyncThunk(
  "staticContent/fetchStaticContent",
  () => {
    const { request } = useHttp();
    return request(`${serverDomain}/languages/`,
      "GET",
      null,
      {
        "Content-Type": "application/json",
      }
    );
  }
);

export const fetchStaticImages = createAsyncThunk(
  "staticContent/fetchStaticImages",
  () => {
    const { request } = useHttp();
    return request(`${serverDomain}/static-images/`,
      "GET",
      null,
      {}
    );
  }
);

type getPending_changes_statusPayload = {
  pending_changes: boolean;
};

export const getPending_changes_status =
  createAsyncThunk<getPending_changes_statusPayload>(
    "staticContent/getPending_changes_status",
    () => {
      const { request } = useHttp();
      return request(
        `${serverDomain}/languages/pending_changes_status/`,
        "GET",
        null,
        {
          "Content-Type": "application/json",
        }
      );
    }
  );

export const setPending_changes_status = createAsyncThunk<
  getPending_changes_statusPayload,
  { pending_changes: boolean }
>("staticContent/setPending_changes_status", (payload) => {
  const { request } = useHttp();
  return request(`${serverDomain}/languages/pending_changes_status/`,
    "PATCH",
    JSON.stringify(payload),
    {
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      "Content-Type": "application/json",
    }
  );
});



export const generateWebpageData =
  createAsyncThunk<getPending_changes_statusPayload>(
    "marketing/webPages/generateWebpageData",
    async () => {
      const response = await axios.post(
        "https://faas-fra1-afec6ce7.doserverless.co/api/v1/namespaces/fn-b333d6ec-fedc-4745-bac5-6fc398835823/actions/su/json-uploader?blocking=true&result=true",
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Basic YzM0ZWYwYTUtNDE2ZS00ZWViLTlkODktMTk1Y2U1MTIyOTY4OkNTOXBVRkxLRFVBMndxcDlJQnFIcUI5WXQ0THI0d0hZd0hwN0xldEdpeWQ0WXlMNzFJREtBMXB0N0JNckZxcTY=",
          },
        }
      );
      return response.data;
    }
  );

export const updateStaticImage = createAsyncThunk<
  UpdateStaticImagesResponse,
  UpdateStaticImagesItemType
>("staticContent/updateStaticImage", async (payload) => {
  const { request } = useHttp();
  return request(
    `${serverDomain}/static-images/${payload.id}/`,
    "PATCH",
    payload.formData,
    {}
  );
});

export const updateStaticContent = createAsyncThunk<
  UpdateStaticContentResponse,
  UpdateStaticContentItemType
>("staticContent/updateStaticContent", async (payload) => {
  const { request } = useHttp();
  return request(
    `${serverDomain}/languages/${payload.id}/`,
    "PATCH",
    JSON.stringify(payload.data),
    {
      "Content-Type": "application/json",
    }
  );
});

const marketingWebPageSlice = createSlice({
  name: "marketingCities",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStaticContent.pending, (state) => {
        state.fetchStaticContentStatus = "loading";
      })
      .addCase(fetchStaticContent.fulfilled, (state, { payload }) => {
        state.fetchStaticContentStatus = "idle";
        state.staticContent = payload;
      })
      .addCase(fetchStaticContent.rejected, (state) => {
        state.fetchStaticContentStatus = "error";
      })
      .addCase(fetchStaticImages.pending, (state) => {
        state.fetchStaticImagesStatus = "loading";
      })
      .addCase(fetchStaticImages.fulfilled, (state, { payload }) => {
        state.fetchStaticImagesStatus = "idle";
        state.staticImages = payload;
      })
      .addCase(fetchStaticImages.rejected, (state) => {
        state.fetchStaticImagesStatus = "error";
      })
      .addCase(updateStaticImage.pending, (state) => {
        state.updateStaticImagesStatus = "loading";
      })
      .addCase(updateStaticImage.fulfilled, (state, { payload }) => {
        state.updateStaticImagesStatus = "idle";
        state.pending_changes = payload.pending_changes;
        state.staticImages = state.staticImages.map((image) => image.id === payload.id ? payload : image);
      })
      .addCase(updateStaticImage.rejected, (state) => {
        state.updateStaticImagesStatus = "error";
      })
      .addCase(updateStaticContent.pending, (state) => {
        state.updateStaticContentStatus = "loading";
      })
      .addCase(updateStaticContent.fulfilled, (state, { payload }) => {
        state.updateStaticContentStatus = "idle";
        state.pending_changes = payload.pending_changes;
        state.staticContent = state.staticContent.map((lng) => {
          if (lng.id === payload.id) {
            return payload;
          } else {
            return lng;
          }
        });
      })
      .addCase(updateStaticContent.rejected, (state) => {
        state.updateStaticContentStatus = "error";
      })
      .addCase(
        getPending_changes_status.fulfilled,
        (state, { payload }) => {
          state.pending_changes = payload.pending_changes;
        }
      )
      .addCase(
        setPending_changes_status.fulfilled,
        (state, { payload }) => {
          state.pending_changes = payload.pending_changes;
        }
      )
      .addCase(generateWebpageData.pending, (state) => {
        state.generateWebpageDataStatus = "loading";
      })
      .addCase(generateWebpageData.fulfilled, (state) => {
        state.pending_changes = false;
        state.generateWebpageDataStatus = "idle";
      })
      .addCase(generateWebpageData.rejected, (state) => {
        state.generateWebpageDataStatus = "error";
      })
  },
});

const { reducer, actions } = marketingWebPageSlice;
export const { } = actions;
export default reducer;