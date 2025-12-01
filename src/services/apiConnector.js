import axios from "axios";


export const API_BASE_URL = "https://apirag.sahilwarkhade.com";

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// 1. Request Interceptor: Attach Access Token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const res = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = res.data;

        localStorage.setItem("accessToken", accessToken);

        // 🔥 Reconnect WS after refresh
        if (window.reconnectWS) {
          window.reconnectWS();
        }

        // Retry original request
        originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export const handleApiError = (error) => {
  console.error("API Request Failed:", error);

  if (error.response && error.response.data && error.response.data.message) {
    throw new Error(error.response.data.message);
  }

  if (error.message) {
    throw new Error(error.message);
  }

  throw new Error("An unexpected error occurred. Please try again.");
};

export const apiConnector = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data, config = {}) => axiosInstance.put(url, data, config),
  patch: (url, data, config = {}) => axiosInstance.patch(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
};

export default apiConnector;
