import axios from "axios";
import { getToken } from "../utils/tokenStorage.js";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

let onUnauthorized = () => {};

export function registerUnauthorizedHandler(handler) {
  onUnauthorized = handler;
}

api.interceptors.request.use((config) => {
  const token = getToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const sentToken = Boolean(error.config?.headers?.Authorization);
    if (error.response?.status === 401 && sentToken) onUnauthorized();
    return Promise.reject(error);
  }
);

export default api;