import { User } from "@/lib/models/user";
import instance from "@/lib/services/axios-config";
import axios from "axios";

const getCurrentUserProfile = async (): Promise<{
  code: number;
  userProfile: User | null;
}> => {
  try {
    const getCurrentUserProfileUrl = "/users/myInfo";
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

const changePassword = async ({
  userId,
  data,
}: {
  userId: string;
  data: {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
}): Promise<number> => {
  try {
    const changePasswordUrl = `users/${userId}/change-password`;
    const response = await instance.put(changePasswordUrl, data);

    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return -1;
  }
};

export { getCurrentUserProfile, changePassword };
