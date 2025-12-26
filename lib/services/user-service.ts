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

const getAllUserProfile = async (): Promise<{
  code: number;
  account: User[] | null;
}> => {
  try {
    const getCurrentUserProfileUrl = "/users/all";
    const response = await instance.get(getCurrentUserProfileUrl);

    return {
      code: 1,
      account: response.data.data,
    };
  } catch {

    return { code: -1, account: null };
  }
};

const getUserProfileById = async (id: string): Promise<{
  code: number;
  account: User | null;
}> => {
  try {
    const getCurrentUserProfileUrl = `/users/${id}`;
    const response = await instance.get(getCurrentUserProfileUrl);

    return {
      code: 1,
      account: response.data.data,
    };
  } catch {

    return { code: -1, account: null };
  }
};

const updateUserStateLock = async (userId: string, lockedReason: string): Promise<{
  code: number;
}> => {
  try {
    const str = lockedReason || "tai khoan nay da bi khoa";
    const getCurrentUserProfileUrl = `/users/${userId}/lock-user`;
    await instance.put(getCurrentUserProfileUrl, null, {
      params: { lockReason: str }
    });

    return {
      code: 1,
    };
  } catch {

    return { code: -1 };
  }
};

const addAccountSer = async ({ email, password
}: {
  email: string;
  password: string;
}): Promise<{
  code: number;
  account: User | null;
}> => {
  try {
    const getCurrentUserProfileUrl = "/users/registration";
    const response = await instance.post(getCurrentUserProfileUrl, { email: email, password: password });

    return {
      code: 1,
      account: response.data.data,
    };
  } catch {

    return { code: -1, account: null };
  }
};

const updateUserStateUnlock = async (userId: string): Promise<{
  code: number;
}> => {
  try {
    const getCurrentUserProfileUrl = `/users/${userId}/unlocked-user`;
    await instance.put(getCurrentUserProfileUrl);

    return {
      code: 1,
    };
  } catch {

    return { code: -1 };
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

export {
  getCurrentUserProfile, changePassword, getAllUserProfile,
  updateUserStateLock, updateUserStateUnlock, getUserProfileById,
  addAccountSer
};
