import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

const instance = axios.create({
  baseURL: apiBaseUrl,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

const createAddressByProfileId = async ({
  userProfileId,
  data,
}: {
  userProfileId: string;
  data: {
    fullName: string;
    phone: string;
    street: string;
    ward: string;
    district: string;
    province: string;
    postalCode: string;
    additionalInfo: string;
    isDefault: boolean;
    type: string;
    label: string;
  };
}): Promise<number> => {
  try {
    const createAddressUrl = `/address/user-profile/${userProfileId}/add`;
    const response = await instance.post(createAddressUrl, data);
    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return -1;
  }
};

const updateAddressByAddressIdAndProfileId = async ({
  addressId,
  profileId,
  data,
}: {
  addressId: string;
  profileId: string;
  data: {
    fullName: string;
    phone: string;
    street: string;
    ward: string;
    district: string;
    province: string;
    postalCode: string;
    additionalInfo: string;
    isDefault: boolean;
    type: string;
    label: string;
  };
}): Promise<number> => {
  try {
    const updateAddressUrl = `/address/update`;
    const response = await instance.put(updateAddressUrl, data, {
      params: {
        addressId,
        profileId,
      },
    });
    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return -1;
  }
};

const deleteAddressByAddressIdAndProfileId = async ({
  addressId,
  profileId,
}: {
  addressId: string;
  profileId: string;
}): Promise<number> => {
  try {
    const deleteAddressUrl = "/address/delete";
    const response = await instance.delete(deleteAddressUrl, {
      params: { addressId, profileId },
    });
    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return -1;
  }
};

export {
  createAddressByProfileId,
  updateAddressByAddressIdAndProfileId,
  deleteAddressByAddressIdAndProfileId,
};
