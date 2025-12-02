import axios from "axios";
import { toast } from "react-toastify";

export const API_HOST = "apirag.sahilwarkhade.com";
export const API_BASE_URL = `https://${API_HOST}`;

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  withCredentials: true,
});

// ============ TOKEN REFRESH MANAGEMENT ============
let isRefreshing = false;
let refreshSubscribers = [];

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRrefreshed(token) {
  refreshSubscribers.forEach((cb) => cb(token));
  refreshSubscribers = [];
}

// ============ REQUEST INTERCEPTOR ============
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// ============ RESPONSE INTERCEPTOR ============
axiosInstance.interceptors.response.use(
  (response) => response.data, // normalize success
  async (error) => {
    const originalRequest = error.config;

    // No config -> cannot retry
    if (!originalRequest) return Promise.reject(error);

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      // If already refreshing, push request into queue
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            resolve(axiosInstance(originalRequest));
          });
        });
      }

      isRefreshing = true;

      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        const { accessToken } = refreshResponse.data;

        // No token returned -> logout
        if (!accessToken) {
          localStorage.removeItem("accessToken");
          return Promise.reject(error);
        }

        localStorage.setItem("accessToken", accessToken);

        // Reconnect WS if needed
        if (
          typeof window !== "undefined" &&
          typeof window.reconnectWS === "function"
        ) {
          window.reconnectWS();
        }

        // Notify queued requests
        onRrefreshed(accessToken);

        // Update header for retried request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;

        return axiosInstance(originalRequest);
      } catch (err) {
        localStorage.removeItem("accessToken");
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

// ============ GLOBAL ERROR HANDLER ============
export const handleApiError = (error) => {
  const message =
    error?.response?.data ||
    error?.response?.data?.message ||
    error?.message ||
    "An unexpected error occurred.";

  toast.error(message);
  return { success: false, message };
};

// ============ API WRAPPER ============
export const apiConnector = {
  get: (url, config) => axiosInstance.get(url, config),
  post: (url, data, config) => axiosInstance.post(url, data, config),
  put: (url, data, config) => axiosInstance.put(url, data, config),
  patch: (url, data, config) => axiosInstance.patch(url, data, config),
  delete: (url, config) => axiosInstance.delete(url, config),
};

export default apiConnector;
