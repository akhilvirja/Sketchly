import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from "axios";

export type ApiVersion = "v1" | "v2" | string;

export const TOKEN_STORAGE_KEY = "token";

/**
 * Safely retrieve the auth token from localStorage in client-side environments.
 */
export const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }
  return null;
};

/**
 * Safely persist the auth token into localStorage in client-side environments.
 */
export const setToken = (token: string): void => {
  if (typeof window !== "undefined") {
    localStorage.setItem(TOKEN_STORAGE_KEY, token);
  }
};

/**
 * Safely remove the auth token from localStorage in client-side environments.
 */
export const removeToken = (): void => {
  if (typeof window !== "undefined") {
    localStorage.removeItem(TOKEN_STORAGE_KEY);
  }
};

/**
 * Base URL resolution with API versioning support (e.g. /api/v1, /api/v2).
 * Supports NEXT_PUBLIC_BACKEND_URL or BACKEND_URL, defaulting to localhost:3001.
 */
export const getBaseUrl = (version: ApiVersion = "v1"): string => {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL
  return `${backendUrl}/api/${version}`;
};

/**
 * Factory function to create an Axios instance for a specific API version.
 * Automatically wires up authentication header and response error interceptors.
 */
export const createApiInstance = (version: ApiVersion = "v1"): AxiosInstance => {
  const instance = axios.create({
    baseURL: getBaseUrl(version),
    timeout: 30000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // Request Interceptor: Attach JWT Bearer token if available
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  // Response Interceptor: Handle global responses and status codes
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        console.warn("Unauthorized request (401). Token may be invalid or expired.");
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// Export pre-configured versioned instances
export const apiV1 = createApiInstance("v1");
export const apiV2 = createApiInstance("v2");

// Default instance points to v1 for backwards compatibility
export const axiosInstance = apiV1;
export default axiosInstance;