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


const getCategoriesById = async (categoryId: string): Promise<{
  categories: Category | null;
  code: number;
}> => {
  try {
    const getCategories = `categories/category/${categoryId}`;
    const response = await instance.get(getCategories);
    return {
      categories: response.data.data,
      code: 1,
    };
  } catch (error) {
    return {
      code: -1,
      categories: null,
    };

  }
};

const getCategoriesByName = async (categoryName: string): Promise<{
  categories: Category | null;
  code: number;
}> => {
  try {
    const getCategories = `categories/category/${categoryName}/name`;
    const response = await instance.get(getCategories);
    return {
      categories: response.data.data,
      code: 1,
    };
  } catch (error) {
    return {
      code: -1,
      categories: null,
    };

  }
};


const createCategories = async (data: {
  categoryName: string,
  description: string,
  createAt: Date,
  updateAt: Date
}): Promise<{
  categorie: Category | null;
  code: number;
}> => {
  try {
    const addCategories = `categories/category/add`;
    const response = await instance.post(addCategories, data);
    return {
      categorie: response.data.data,
      code: 1,
    };
  } catch (error) {
    return {
      code: -1,
      categorie: null,
    };
  }
};


const updateCategories = async (data: Category): Promise<{
  categorie: Category | null;
  code: number;
}> => {
  try {
    const addCategories = `categories/category/${data.categoryId}/update`;
    const response = await instance.put(addCategories, data);
    return {
      categorie: response.data.data,
      code: 1,
    };
  } catch (error) {
    return {
      code: -1,
      categorie: null,
    };
  }
};


const deleteCategories = async (categoryId: string): Promise<{
  categorie: Category | null;
  code: number;
}> => {
  try {
    const addCategories = `categories/category/${categoryId}/delete`;
    const response = await instance.delete(addCategories);
    return {
      categorie: response.data.data,
      code: 1,
    };
  } catch (error) {
    return {
      code: -1,
      categorie: null,
    };
  }
};

export { getCategories, createCategories, updateCategories, deleteCategories,getCategoriesById,getCategoriesByName };
