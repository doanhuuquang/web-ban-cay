import { Product } from "@/lib/models/product";
import instance from "@/lib/services/axios-config";
import axios from "axios";

const getProducts = async (): Promise<{
  code: number;
  products: Product[];
}> => {
  try {
    const getProductsUrl = `/products/all`;
    const response = await instance.get(getProductsUrl);
    const products = response.data.data.map((product: Product) =>
      Product.fromJson(product)
    );
    return {
      code: response.data.code,
      products: products,
    };
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return {
        code: error.response?.data.code,
        products: [],
      };
    }
    return { code: -1, products: [] };
  }
};

const getProductById = async ({
  productId,
}: {
  productId: string;
}): Promise<{
  code: number;
  product: Product | null;
}> => {
  try {
    const getProductByIdUrl = `products/product/${productId}`;
    const response = await instance.get(getProductByIdUrl);

    return {
      code: response.data.code,
      product: Product.fromJson(response.data.data),
    };
  } catch (error) {
    console.log(error);
    if (error instanceof axios.AxiosError) {
      return {
        code: error.response?.data.code,
        product: null,
      };
    }
    return { code: -1, product: null };
  }
};

const getProductBySlug = async ({
  slug,
}: {
  slug: string;
}): Promise<{
  code: number;
  product: Product | null;
}> => {
  try {
    const getProductBySlugUrl = `/products/product/${slug}/slug`;
    const response = await instance.get(getProductBySlugUrl);

    return {
      code: response.data.code,
      product: Product.fromJson(response.data.data),
    };
  } catch (error) {
    console.log(error);
    if (error instanceof axios.AxiosError) {
      return {
        code: error.response?.data.code,
        product: null,
      };
    }
    return { code: -1, product: null };
  }
};

const getProductsByCategoryName = async ({
  categoryName,
}: {
  categoryName: string;
}): Promise<{
  code: number;
  products: Product[];
}> => {
  try {
    const getProductsUrl = `/products/category/by-category-name`;
    const response = await instance.get(getProductsUrl, {
      params: { categoryName },
    });
    const products = response.data.data.content.map((product: Product) =>
      Product.fromJson(product)
    );
    return {
      code: response.data.code,
      products: products,
    };
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return {
        code: error.response?.data.code,
        products: [],
      };
    }
    return { code: -1, products: [] };
  }
};

const updateProduct = async ({
  productId,
  data,
}: {
  productId: string;
  data: {
    productName: string;
    description: string;
    bio: string;
    price: number;
    discount: number;
    specialPrice: number;
    origin: string;
    height: number;
    length: number;
    weight: number;
    width: number;
  };
}): Promise<number> => {
  try {
    const updateProductsUrl = `/products/product/${productId}/update`;
    const response = await instance.put(updateProductsUrl, data);

    return response.data.code;
  } catch (error) {
    if (error instanceof axios.AxiosError) {
      return error.response?.data.code;
    }
    return -1;
  }
};

export {
  getProducts,
  getProductById,
  getProductBySlug,
  getProductsByCategoryName,
  updateProduct,
};
