import instance from "@/lib/services/axios-config";
import { Inventory } from "../models/inventory";

const getInventoryOutOfStock = async (): Promise<{
    code: number;
    data: Inventory[];
}> => {
    try {
        const getProductsUrl = `inventory/out-of-stock`;
        const response = await instance.get(getProductsUrl);
        return {
            code: 1,
            data:  response.data.data ?? []
        };
    } catch {
        return {
            code: -1,
            data: [],
        };
    }
}

const getInventoryLowStock = async (threshold:number): Promise<{
    code: number;
    data: Inventory[];
}> => {
    try {
        const getProductsUrl = `inventory/low-stock/${threshold}`;
        const response = await instance.get(getProductsUrl);
        return {
            code: 1,
            data:  response.data.data ?? []
        };
    } catch {
        return {
            code: -1,
            data: [],
        };
    }
}

const getInventoryUpdateStock = async (data:{ productId: string, newAvailability: number }): Promise<{
    code: number;
    data: Inventory |null;
}> => {
    try {
        const getProductsUrl = `inventory/updateStock`;
        const response = await instance.post(getProductsUrl,data);
        return {
            code: 1,
            data:  response.data.data ?? null
        };
    } catch {
        return {
            code: -1,
            data: null,
        };
    }
}



export {
    getInventoryOutOfStock,getInventoryLowStock,getInventoryUpdateStock
};
