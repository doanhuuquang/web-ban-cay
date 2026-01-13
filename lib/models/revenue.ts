/* =======================
   TYPES
======================= */

export type annualRevenue = {
    year: number;
    revenueYear: number;
    totalOrders: number;
    totalProductsSold: number;
    avgOrderValue: number;
    growthRate: number;
};

export type categoryRevenue = {
    categoryId: number;
    categoryName: string;
    revenueCategory: number;
    totalProductsSold: number;
    totalOrders: number;
    averageOrderValue: number;
};

export type monthlyRevenue = {
    month: number;
    revenue: number;
    totalOrders: number;
    totalProductsSold: number;
    avgOrderValue: number;
    growthRate: number;
};

export type productRevenue = {
    productId: number;
    productName: string;
    revenueProduct: number;
    totalSold: number;
    totalOrders: number;
    averagePrice: number;
};

export type quarterlyRevenue = {
    quarter: number;
    revenueQuarter: number;
    totalOrders: number;
    totalProductsSold: number;
    avgOrderValue: number;
    growthRate: number;
};

/* =======================
   DEFAULT OBJECTS
======================= */

export const DEFAULT_ANNUAL_REVENUE: annualRevenue = {
    year: 0,
    revenueYear: 0,
    totalOrders: 0,
    totalProductsSold: 0,
    avgOrderValue: 0,
    growthRate: 0,
};

export const DEFAULT_CATEGORY_REVENUE: categoryRevenue = {
    categoryId: 0,
    categoryName: "",
    revenueCategory: 0,
    totalProductsSold: 0,
    totalOrders: 0,
    averageOrderValue: 0,
};

export const DEFAULT_MONTHLY_REVENUE: monthlyRevenue = {
    month: 0,
    revenue: 0,
    totalOrders: 0,
    totalProductsSold: 0,
    avgOrderValue: 0,
    growthRate: 0,
};

export const DEFAULT_PRODUCT_REVENUE: productRevenue = {
    productId: 0,
    productName: "",
    revenueProduct: 0,
    totalSold: 0,
    totalOrders: 0,
    averagePrice: 0,
};

export const DEFAULT_QUARTERLY_REVENUE: quarterlyRevenue = {
    quarter: 0,
    revenueQuarter: 0,
    totalOrders: 0,
    totalProductsSold: 0,
    avgOrderValue: 0,
    growthRate: 0,
};

/* =======================
   STATS FUNCTIONS
======================= */

/* ---- Annual Revenue Stats ---- */
export function getAnnualRevenueStats(data: annualRevenue[]) {
    if (!data || data.length === 0) return { ...DEFAULT_ANNUAL_REVENUE, year: 0 };

    const revenueYear = data.reduce((sum, item) => sum + item.revenueYear, 0);
    const totalOrders = data.reduce((sum, item) => sum + item.totalOrders, 0);
    const totalProductsSold = data.reduce((sum, item) => sum + item.totalProductsSold, 0);
    const avgOrderValue = totalOrders ? revenueYear / totalOrders : 0;
    const growthRate = data.reduce((sum, item) => sum + item.growthRate, 0) / data.length;
    const year = Math.max(...data.map(d => d.year));

    return {
        year,
        revenueYear,
        totalOrders,
        totalProductsSold,
        avgOrderValue,
        growthRate,
    };
}

/* ---- Category Revenue Stats ---- */
export function getCategoryRevenueStats(data: categoryRevenue[]) {
    if (!data || data.length === 0) return DEFAULT_CATEGORY_REVENUE;

    const revenueCategory = data.reduce((sum, item) => sum + item.revenueCategory, 0);
    const totalOrders = data.reduce((sum, item) => sum + item.totalOrders, 0);
    const totalProductsSold = data.reduce((sum, item) => sum + item.totalProductsSold, 0);
    const averageOrderValue = totalOrders ? revenueCategory / totalOrders : 0;

    const topCategoryItem = data.reduce((prev, curr) =>
        curr.revenueCategory > prev.revenueCategory ? curr : prev
    );

    return {
        categoryId: topCategoryItem.categoryId,
        categoryName: topCategoryItem.categoryName,
        revenueCategory,
        totalProductsSold,
        totalOrders,
        averageOrderValue,
    };
}

/* ---- Monthly Revenue Stats ---- */
export function getMonthlyRevenueStats(data: monthlyRevenue[]) {
    if (!data || data.length === 0) return DEFAULT_MONTHLY_REVENUE;

    const revenue = data.reduce((sum, item) => sum + item.revenue, 0);
    const totalOrders = data.reduce((sum, item) => sum + item.totalOrders, 0);
    const totalProductsSold = data.reduce((sum, item) => sum + item.totalProductsSold, 0);
    const avgOrderValue = totalOrders ? revenue / totalOrders : 0;
    const growthRate = data.reduce((sum, item) => sum + item.growthRate, 0) / data.length;
    const month = Math.max(...data.map(d => d.month));

    return { month, revenue, totalOrders, totalProductsSold, avgOrderValue, growthRate };
}



/* ---- Product Revenue Stats ---- */
export function getProductRevenueStats(data: productRevenue[]) {
    if (!data || data.length === 0) return DEFAULT_PRODUCT_REVENUE;

    const revenueProduct = data.reduce((sum, item) => sum + item.revenueProduct, 0);
    const totalSold = data.reduce((sum, item) => sum + item.totalSold, 0);
    const totalOrders = data.reduce((sum, item) => sum + item.totalOrders, 0);
    const averagePrice = totalSold ? revenueProduct / totalSold : 0;

    const bestProductItem = data.reduce((prev, curr) =>
        curr.revenueProduct > prev.revenueProduct ? curr : prev
    );

    return {
        productId: bestProductItem.productId,
        productName: bestProductItem.productName,
        revenueProduct,
        totalSold,
        totalOrders,
        averagePrice,
    };
}
/* ---- Quarterly Revenue Stats ---- */
export function getQuarterlyRevenueStats(data: quarterlyRevenue[]) {
    if (!data || data.length === 0) return DEFAULT_QUARTERLY_REVENUE;

    const revenueQuarter = data.reduce((sum, item) => sum + item.revenueQuarter, 0);
    const totalOrders = data.reduce((sum, item) => sum + item.totalOrders, 0);
    const totalProductsSold = data.reduce((sum, item) => sum + item.totalProductsSold, 0);
    const avgOrderValue = totalOrders ? revenueQuarter / totalOrders : 0;
    const growthRate = data.reduce((sum, item) => sum + item.growthRate, 0) / data.length;
    const quarter = Math.max(...data.map(d => d.quarter));

    return { quarter, revenueQuarter, totalOrders, totalProductsSold, avgOrderValue, growthRate };
}

