import instance from "@/lib/services/axios-config";
import axios from "axios";
import { format } from "date-fns";

const updateUserProfileByUserId = async ({
  userId,
  data,
}: {
  userId: string;
  data: {
    username: string;
    mobileNumber: string;
    gender: boolean | null;
    birthDate: Date | null;
  };
}): Promise<number> => {
  try {
    const updateUserProfileUrl = `/profiles/user/${userId}/createOrUpdateProfile`;
    const response = await instance.post(updateUserProfileUrl, {
      username: data.username,
      mobileNumber: data.mobileNumber,
      gender: data.gender,
      birthDate: data.birthDate ? format(data.birthDate, "yyyy-MM-dd") : null,
    });
    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return -1;
  }
};

export { updateUserProfileByUserId };
