import instance from "@/lib/services/axios-config";
import { annualRevenue, categoryRevenue, monthlyRevenue, productRevenue, quarterlyRevenue } from "../models/revenue";

const getAnnualRevenue = async (yearFrom: string, yearTo: string): Promise<{
    code: number;
    data: annualRevenue[] | null;
}> => {
    const min = Math.min(Number(yearFrom), Number(yearTo));
    const max = Math.max(Number(yearFrom), Number(yearTo));
    try {
        const getProductsUrl = `report/annual-revenue`;
        const response = await instance.get(getProductsUrl, {
            params: {
                fromYear: min,
                toYear: max
            }
        }
        );
        return {
            code: 1,
            data: response.data,
        };
    } catch {
        return {
            code: -1,
            data: null,
        };
    }
}

const getCategoryRevenue = async (month: string, year: string): Promise<{
    code: number;
    data: categoryRevenue[] | null;
}> => {
    try {
        const getProductsUrl = `report/category-revenue`;
        const response = await instance.get(getProductsUrl, {
            params: {
                year: year,
                month: month
            }
        }
        );
        return {
            code: 1,
            data: response.data,
        };
    } catch {
        return {
            code: -1,
            data: null,
        };
    }
}

const getProductRevenue = async (month: string, year: string): Promise<{
    code: number;
    data: productRevenue[] | null;
}> => {
    try {
        const getProductsUrl = `report/product-revenue`;
        const response = await instance.get(getProductsUrl, {
            params: {
                year: year,
                month: month
            }
        }
        );
        return {
            code: 1,
            data: response.data,
        };
    } catch {
        return {
            code: -1,
            data: null,
        };
    }
}

const getMonthlyRevenue = async ( year: string): Promise<{
    code: number;
    data: monthlyRevenue[] | null;
}> => {
    try {
        const getProductsUrl = `report/monthly-revenue`;
        const response = await instance.get(getProductsUrl, {
            params: {
                year: year,
            }
        }
        );
        return {
            code: 1,
            data: response.data,
        };
    } catch {
        return {
            code: -1,
            data: null,
        };
    }
}

const getQuarterlyRevenue = async ( year: string): Promise<{
    code: number;
    data: quarterlyRevenue[] | null;
}> => {
    try {
        const getProductsUrl = `report/quarterly-revenue`;
        const response = await instance.get(getProductsUrl, {
            params: {
                year: year,
            }
        }
        );
        return {
            code: 1,
            data: response.data,
        };
    } catch {
        return {
            code: -1,
            data: null,
        };
    }
}



export {
    getAnnualRevenue, getCategoryRevenue,getMonthlyRevenue,getProductRevenue,getQuarterlyRevenue
};
