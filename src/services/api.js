import axios from "axios";
import config from "../config/config";
import { isAuthenticated } from "./auth";

const { url, timeout } = config.api;

const api = axios.create({
  baseURL: url,
  timeout,
});

api.interceptors.request.use(
  async (config) => {
    let { token } = await isAuthenticated();

    if (!token) return config;

    api.defaults.headers["Authorization"] = `Bearer ${token}`;

    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;
