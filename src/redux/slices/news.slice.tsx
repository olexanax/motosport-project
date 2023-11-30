//libs
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "@/hooks/useHttp";
//types
import { NewsItemType, NewsResponse, UpdateNewsItemType, CreateNewsItemType } from "../types";
//API
import { serverDomain } from "@/services/API";
import axios from "axios";

interface NewsInitialState {
  news: NewsItemType[];
  fetchNewsStatus: "idle" | "loading" | "error";
}

const initialState: NewsInitialState = {
  news: [],
  fetchNewsStatus: "loading"
};

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  (next: string | undefined) => {
    const { request } = useHttp();
    return request(`${serverDomain}/news/`,
      "GET",
      null,
      {
        "Content-Type": "application/json",
      }
    );
  }
);

export const deleteNews = createAsyncThunk(
  "news/deleteNews",
  async (id: number) => {
    await axios.delete(`${serverDomain}/news/${id}`, {
      headers: {
      },
    });
    return id;
  }
);

export const createNews = createAsyncThunk<NewsItemType, CreateNewsItemType>(
  "news/createNews",
  async (payload) => {
    const { request } = useHttp();
    return request(`${serverDomain}/news/`, "POST", payload.formData, {
    });
  }
);

export const updateNews = createAsyncThunk<NewsItemType, UpdateNewsItemType>(
  "news/updateNews",
  async (payload) => {
    const { request } = useHttp();
    return request(`${serverDomain}/news/${payload.id}/`, "PATCH", payload.formData, {
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

const newsSlice = createSlice({
  name: "marketingPartners",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.fetchNewsStatus = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, { payload }) => {
        payload as NewsResponse;
        state.news = payload;
        state.fetchNewsStatus = "idle";
      })
      .addCase(fetchNews.rejected, (state) => {
        state.fetchNewsStatus = "error";
      })
      .addCase(deleteNews.fulfilled, (state, { payload }) => {
        state.news = state.news.filter((item) => item.id !== payload);
      })
      .addCase(createNews.fulfilled, (state, { payload }) => {
        state.news.push(payload);
      })
      .addCase(updateNews.fulfilled, (state, { payload }) => {
        state.news = state.news.map((item) => item.id === payload.id ? payload : item);
      })

  },
});

const { reducer } = newsSlice;
export default reducer;