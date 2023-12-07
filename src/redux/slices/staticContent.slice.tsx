//libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "@/hooks/useHttp";
//types
import {
  StaticContentItemType,
  UpdateStaticContentItemType,
  UpdateStaticContentResponse,
  StaticImagesItemType,
  UpdateStaticImagesItemType,
  UpdateStaticImagesResponse,
} from "../types";
//API
import { adminInstance } from "@/services/AdminAPI";
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
  updateStaticImagesStatus: "idle",
};

export const fetchStaticContent = createAsyncThunk(
  "staticContent/fetchStaticContent",
  async () => {
    const { data } = await adminInstance.get(`/languages/`);

    return data;
  }
);

export const fetchStaticImages = createAsyncThunk(
  "staticContent/fetchStaticImages",
  async () => {
    const { data } = await adminInstance.get(`/static-images/`);

    return data;
  }
);

type getPending_changes_statusPayload = {
  pending_changes: boolean;
};

export const getPending_changes_status =
  createAsyncThunk<getPending_changes_statusPayload>(
    "staticContent/getPending_changes_status",
    async () => {
      const { data } = await adminInstance.get(
        `/languages/pending_changes_status/`
      );

      return data;
    }
  );

export const setPending_changes_status = createAsyncThunk<
  getPending_changes_statusPayload,
  { pending_changes: boolean }
>("staticContent/setPending_changes_status", async (payload) => {
  const { data } = await adminInstance.patch(
    `/languages/pending_changes_status/`,
    payload,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
});

export const generateWebpageData =
  createAsyncThunk<getPending_changes_statusPayload>(
    "marketing/webPages/generateWebpageData",
    async () => {
      const response = await axios.post(
        "https://api.github.com/repos/ICAPGroupgmbh/motosport-website/actions/workflows/upload_json.yml/dispatches",
        {
          ref: "main",
        },
        {
          headers: {
            "Content-Type": "application/vnd.github+json",
            Accept: "application/vnd.github+json",
            "X-GitHub-Api-Version": "2022-11-28",
            Authorization: "Bearer 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",
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
  const { data } = await adminInstance.patch(
    `/static-images/${payload.id}/`,
    payload.formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return data;
});

export const updateStaticContent = createAsyncThunk<
  UpdateStaticContentResponse,
  UpdateStaticContentItemType
>("staticContent/updateStaticContent", async (payload) => {
  const { data } = await adminInstance.patch(
    `/languages/${payload.id}/`,
    payload.data
  );

  return data;
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
        state.staticImages = state.staticImages.map((image) =>
          image.id === payload.id ? payload : image
        );
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
      .addCase(getPending_changes_status.fulfilled, (state, { payload }) => {
        state.pending_changes = payload.pending_changes;
      })
      .addCase(setPending_changes_status.fulfilled, (state, { payload }) => {
        state.pending_changes = payload.pending_changes;
      })
      .addCase(generateWebpageData.pending, (state) => {
        state.generateWebpageDataStatus = "loading";
      })
      .addCase(generateWebpageData.fulfilled, (state) => {
        state.pending_changes = false;
        state.generateWebpageDataStatus = "idle";
      })
      .addCase(generateWebpageData.rejected, (state) => {
        state.generateWebpageDataStatus = "error";
      });
  },
});

const { reducer, actions } = marketingWebPageSlice;
export const {} = actions;
export default reducer;
