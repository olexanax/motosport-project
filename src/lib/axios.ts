import axios from "axios";

export const BASE_URL = "http://164.90.230.225/api/v1";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
