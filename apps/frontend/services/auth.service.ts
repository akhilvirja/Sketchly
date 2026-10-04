import axiosInstance, { getToken, setToken, removeToken } from "../lib/axios";

export interface SignupPayload {
  email: string;
  password: string;
  name: string;
}

export interface SigninPayload {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  photo?: string | null;
}

export interface SignupResponse {
  success: boolean;
  message: string | Record<string, unknown>;
  data?: User;
  token?: string;
}

export interface SigninResponse {
  success: boolean;
  message: string | Record<string, unknown>;
  token: string;
}

export interface ProfileResponse {
  success: boolean;
  data: {
    id: string;
    email: string;
    name: string;
  };
}

/**
 * Service to handle user authentication: signup, signin, profile, and token management.
 */
export const authService = {
  /**
   * Register a new user. If the backend returns a token, it will be stored in localStorage.
   */
  signup: async (payload: SignupPayload): Promise<SignupResponse> => {
    const response = await axiosInstance.post<SignupResponse>("/auth/signup", payload);

    if (response.data.success) {
      if (response.data.token) {
        setToken(response.data.token);
      } else {
        // Automatically authenticate on successful signup
        try {
          const signinRes = await axiosInstance.post<SigninResponse>("/auth/signin", {
            email: payload.email,
            password: payload.password,
          });
          if (signinRes.data.token) {
            setToken(signinRes.data.token);
            response.data.token = signinRes.data.token;
          }
        } catch {
          // Fallback if auto-signin fails
        }
      }
    }

    return response.data;
  },


  /**
   * Authenticate an existing user and save the returned token into localStorage.
   */
  signin: async (payload: SigninPayload): Promise<SigninResponse> => {
    const response = await axiosInstance.post<SigninResponse>("/auth/signin", payload);

    if (response.data.token) {
      setToken(response.data.token);
    }

    return response.data;
  },

  /**
   * Fetch current authenticated user's profile using the stored Bearer token.
   */
  getProfile: async (): Promise<ProfileResponse> => {
    const response = await axiosInstance.get<ProfileResponse>("/auth/me");
    return response.data;
  },

  /**
   * Log out the current user by removing the token from localStorage.
   */
  signout: (): void => {
    removeToken();
  },

  /**
   * Retrieve current stored token.
   */
  getToken: (): string | null => {
    return getToken();
  },

  /**
   * Check if user is currently authenticated with a token.
   */
  isAuthenticated: (): boolean => {
    return Boolean(getToken());
  },
};

// Direct named exports for convenience
export const signup = authService.signup;
export const signin = authService.signin;
export const signout = authService.signout;
export const getProfile = authService.getProfile;
export const isAuthenticated = authService.isAuthenticated;

export default authService;
