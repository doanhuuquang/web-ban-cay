import { Category } from "@/lib/models/category";
import instance from "@/lib/services/axios-config";
import axios from "axios";

const getCategories = async (): Promise<{
  categories: Category[];
  code: number;
}> => {
  try {
    const getCategories = `/categories/all`;
    const response = await instance.get(getCategories);
    return {
      categories: response.data.data,
      code: response.data.code,
    };
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return {
        code: error.response?.data.code,
        categories: [],
      };
    }
    return {
      code: -1,
      categories: [],
    };
  }
};

export { getCategories };
