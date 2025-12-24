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

const deleteCategoryById = async ({
  categoryId,
}: {
  categoryId: string;
}): Promise<number> => {
  try {
    const deleteUrl = `categories/category/${categoryId}/delete`;
    const response = await instance.delete(deleteUrl);

    return response.data.code;
  } catch (error) {
    console.log(error);
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return -1;
  }
};

const getCategoryName = async ({
  categoryName,
}: {
  categoryName: string;
}): Promise<number> => {
  try {
    const deleteUrl = `/categories/category/${categoryName}`;
    const response = await instance.get(deleteUrl);

    return response.data.code;
  } catch (error) {
    console.log(error);
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return -1;
  }
};

export { getCategories, deleteCategoryById, getCategoryName };
