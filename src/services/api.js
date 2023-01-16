import axios from "axios";
import config from "../config/config";

const { url, timeout } = config.api;

const api = axios.create({
  baseURL: url,
  timeout,
});


api.interceptors.request.use(
  async (config) => {
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  }
);

export default api;
