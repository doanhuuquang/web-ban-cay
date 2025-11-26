import { User } from "@/lib/models/user";
import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const getCurrentUserProfileUrl = "/users/myInfo";

const instance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const getCurrentUserProfile = async (): Promise<{
  code: number;
  userProfile: User | null;
}> => {
  try {
    const response = await instance.get(getCurrentUserProfileUrl);

    return {
      code: response.data.code,
      userProfile: response.data.data as User,
    };
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return { code: -1, userProfile: null };
  }
};

export { getCurrentUserProfile };
