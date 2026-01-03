export type annualRevenue = {
    year: number,
    revenueYear: number,
    totalOrders: number,
    totalProductsSold: number,
    avgOrderValue: number,
    growthRate: number
}

export type categoryRevenue = {
    categoryId: number,
    categoryName: string,
    revenueCategory: number,
    totalProductsSold: number,
    totalOrders: number,
    averageOrderValue: number
}

export type monthlyRevenue = {
    month: number,
    revenue: number,
    totalOrders: number,
    totalProductsSold: number,
    avgOrderValue: number,
    growthRate: number
}

export type productRevenue = {
    productId: number,
    productName: string,
    revenueProduct: number,
    totalSold: number,
    totalOrders: number,
    averagePrice: number
}

export type quarterlyRevenue = {
    quarter: number,
    revenueQuarter: number,
    totalOrders: number,
    totalProductsSold: number,
    avgOrderValue: number,
    growthRate: number
}


