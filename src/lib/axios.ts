import axios from "axios";

export const BASE_URL = "https://api.ivanpeklin-racing.com/api/v1";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
