import instance from "@/lib/services/axios-config";
import axios from "axios";

const createAddressByProfileId = async ({
  userProfileId,
  data,
}: {
  userProfileId: string;
  data: {
    fullName: string;
    phone: string;
    street: string;
    provinceID: string;
    province: string;
    district: string;
    districtID: string;
    ward: string;
    wardCode: string;
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
    provinceID: string;
    province: string;
    district: string;
    districtID: string;
    ward: string;
    wardCode: string;
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

const updateDefaultAddressByAddressIdAndProfileId = async ({
  addressId,
  profileId,
}: {
  addressId: string;
  profileId: string;
}): Promise<number> => {
  try {
    const updateAddressUrl = `/address/update`;
    const response = await instance.put(
      updateAddressUrl,
      { isDefault: true },
      {
        params: {
          addressId,
          profileId,
        },
      }
    );
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
  updateDefaultAddressByAddressIdAndProfileId,
};
