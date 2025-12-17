import { District } from "@/lib/models/district";
import { GHNService } from "@/lib/models/ghn-service";
import { Province } from "@/lib/models/province";
import { Ward } from "@/lib/models/ward";
import axios from "axios";

const apiBaseUrl = "https://online-gateway.ghn.vn";

const instance = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Token: process.env.NEXT_PUBLIC_GHN_TOKEN,
    ShopId: process.env.NEXT_PUBLIC_GHN_SHOP_ID,
  },
});

const getProvinces = async (): Promise<{
  code: number;
  provinces: Province[];
}> => {
  try {
    const getProvinceUrl = `/shiip/public-api/master-data/province`;
    const response = await instance.get(getProvinceUrl);

    const provinces: Province[] = [];

    if (response.data.code === 200) {
      response.data.data.map(
        (province: { ProvinceID: string; ProvinceName: string }) => {
          provinces.push(
            new Province(province.ProvinceID, province.ProvinceName)
          );
        }
      );
    }

    return {
      code: response.data.code,
      provinces: provinces,
    };
  } catch {
    return {
      code: -1,
      provinces: [],
    };
  }
};

const getDistricts = async ({
  provinceId,
}: {
  provinceId: string;
}): Promise<{
  code: number;
  districts: District[];
}> => {
  try {
    const getDistrictUrl = `/shiip/public-api/master-data/district`;
    const response = await instance.get(getDistrictUrl, {
      params: {
        province_id: provinceId,
      },
    });

    const districts: District[] = [];

    if (response.data.code === 200) {
      response.data.data.map(
        (district: {
          DistrictID: string;
          ProvinceID: string;
          DistrictName: string;
        }) => {
          districts.push(
            new District(
              district.DistrictID,
              district.ProvinceID,
              district.DistrictName
            )
          );
        }
      );
    }

    return {
      code: response.data.code,
      districts: districts,
    };
  } catch {
    return {
      code: -1,
      districts: [],
    };
  }
};

const getWards = async ({
  districtId,
}: {
  districtId: string;
}): Promise<{
  code: number;
  wards: Ward[];
}> => {
  try {
    const getWardUrl = `/shiip/public-api/master-data/ward`;
    const response = await instance.get(getWardUrl, {
      params: {
        district_id: districtId,
      },
    });

    const wards: Ward[] = [];

    if (response.data.code === 200) {
      response.data.data.map(
        (ward: { WardCode: string; DistrictID: string; WardName: string }) => {
          wards.push(new Ward(ward.WardCode, ward.DistrictID, ward.WardName));
        }
      );
    }

    return {
      code: response.data.code,
      wards: wards,
    };
  } catch {
    return {
      code: -1,
      wards: [],
    };
  }
};

const getServices = async (data: {
  toDitrictId: string;
}): Promise<{
  code: number;
  services: GHNService[];
}> => {
  try {
    const getServicesUrl = `/shiip/public-api/v2/shipping-order/available-services`;
    const response = await instance.post(getServicesUrl, {
      shop_id: Number(process.env.NEXT_PUBLIC_GHN_SHOP_ID),
      from_district: 1703,
      to_district: data.toDitrictId,
    });

    const services: GHNService[] = [];

    if (response.data.code === 200) {
      response.data.data.map(
        (service: {
          service_id: string;
          short_name: string;
          service_type_id: string;
        }) => {
          services.push(
            new GHNService(
              service.service_id,
              service.short_name,
              service.service_type_id
            )
          );
        }
      );
    }

    return {
      code: response.data.code,
      services: services,
    };
  } catch {
    return {
      code: -1,
      services: [],
    };
  }
};

const calculateFee = async ({
  data,
}: {
  data: {
    toDistrictId: string;
    toWardCode: string;
    height: number;
    length: number;
    width: number;
    weight: number;
    service: GHNService;
  };
}): Promise<{
  code: number;
  total: number;
}> => {
  try {
    const getShippingFeeUrl = `/shiip/public-api/v2/shipping-order/fee`;
    const response = await instance.post(getShippingFeeUrl, {
      service_id: data.service.serviceId,
      service_type_id: data.service.serviceTypeId,
      to_district_id: data.toDistrictId,
      to_ward_code: data.toWardCode.toString(),
      height: data.height,
      length: data.length,
      weight: data.weight,
      width: data.width,
    });

    return {
      code: response.data.code,
      total: response.data.data.total,
    };
  } catch {
    return {
      code: -1,
      total: 0,
    };
  }
};

export { getProvinces, getDistricts, getWards, getServices, calculateFee };
