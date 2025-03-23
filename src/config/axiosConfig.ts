import axios from "axios";
import { config } from "./envConfig";
import { AxiosErrorResponse } from "../interfaces/axios.interface";

const { baseURL } = config.server;

export const authAxios = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

export const unauthAxios = axios.create({
  baseURL: baseURL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

authAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

authAxios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized! Redirecting to login...");
    }
    return Promise.reject(error);
  }
);

unauthAxios.interceptors.response.use(
  (response) => response,
  (error: AxiosErrorResponse) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);
