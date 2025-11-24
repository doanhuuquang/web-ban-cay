import { IS_LOGGED } from "@/lib/constants/local-storage-keys";
import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const introspectTokenUrl = "/auth/introspect";
const refreshTokenUrl = "/auth/refresh";
const loginUrl = "/auth/login";
const signUpUrl = "/users/registration";
const logoutUrl = "/auth/logout";
const forgetPasswordUrl = "auth/forgot-password";
const resetPasswordUrl = "auth/reset-password";

const instance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const introspectToken = async (): Promise<Date | null> => {
  try {
    const response = await instance.post(introspectTokenUrl);
    return new Date(response.data.data.exp);
  } catch {
    return null;
  }
};

const refreshToken = async (): Promise<number> => {
  try {
    const response = await instance.post(refreshTokenUrl);
    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return -1;
  }
};

const loginWithEmailAndPassword = async (data: {
  email: string;
  password: string;
}): Promise<number> => {
  try {
    const response = await instance.post(loginUrl, data);
    if (response.data.code === 200) localStorage.setItem(IS_LOGGED, "true");

    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return -1;
  }
};

const signUpWithEmailAndPassword = async (data: {
  email: string;
  password: string;
}): Promise<number> => {
  try {
    const response = await instance.post(signUpUrl, data);
    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      console.log("Error response code:", error.response?.data.code);
      return error.response?.data.code;
    }
    return -1;
  }
};

const logout = async (): Promise<number> => {
  try {
    const response = await instance.post(logoutUrl);

    if (response.data.code === 200) localStorage.removeItem(IS_LOGGED);

    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return -1;
  }
};

const getOTP = async (email: string): Promise<number> => {
  try {
    const response = await instance.post(forgetPasswordUrl, { email });
    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }

    return -1;
  }
};

const changePassword = async (data: {
  email: string;
  otp: string;
  newPassword: string;
}): Promise<number> => {
  try {
    const response = await instance.put(resetPasswordUrl, data);
    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return -1;
  }
};

export {
  introspectToken,
  refreshToken,
  loginWithEmailAndPassword,
  signUpWithEmailAndPassword,
  logout,
  getOTP,
  changePassword,
};
