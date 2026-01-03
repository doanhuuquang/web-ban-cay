
"use client";

import * as React from "react";

import { formatMoney } from "@/lib/helpers/format-money";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {  monthlyRevenue } from "@/lib/models/revenue";
import {  getMonthlyRevenue } from "@/lib/services/revenue-service";


function OrderTable({ sort, isloading, currentPageRows }: { sort: string, isloading: boolean, currentPageRows: monthlyRevenue[] }) {

    if (isloading) return <div className="text-center">loading...</div>;

    if (!currentPageRows)
        return <div className="text-center">Không có dữ liệu</div>;

    return (
        <div className="space-y-4">
            {/* table */}
            <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm h-150">
                <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-gray-100 border-b">
                        <tr className="font-semibold text-gray-700">
                            <th className="px-4 py-3">tháng</th>
                            <th className="px-4 py-3">doanh thu</th>
                            <th className="px-4 py-3">số đơn</th>
                            <th className="px-4 py-3">số sp đã bán</th>
                            <th className="px-4 py-3">Trung bình đơn</th>
                            <th className="px-4 py-3">mức  tăng trưởng</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(sort === "ASC" ? currentPageRows : currentPageRows.slice().reverse()).map((row, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{row.month}</td>
                                    <td className="px-4 py-3">{formatMoney(row.revenue)}</td>
                                    <td className="px-4 py-3">{row.totalOrders}</td>
                                    <td className="px-4 py-3">{row.totalProductsSold}</td>
                                    <td className="px-4 py-3">{formatMoney(row.avgOrderValue)}</td>
                                    <td className="px-4 py-3">{row.growthRate}%</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

const OrderPage = () => {
    //sort
    const [selectedSort, setSelectedSort] = React.useState<string>("DESC");
    const [isLoading, setIsloading] = React.useState<boolean>(false);

    //nam
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 9 }, (_, i) => currentYear - i);
    const [yearTo, setYearTo] = React.useState<string>(currentYear.toString());

    //data
    const [dataRevenues, setDataRevenues] = React.useState<monthlyRevenue[]>([])

    React.useEffect(() => {
        const fetchData = async () => {
            setIsloading(true)
            const res = await getMonthlyRevenue(yearTo);
            if (res.code === 1 && res.data)
                setDataRevenues(res.data)

            setIsloading(false);
        }
        fetchData();
    }, [ yearTo])

    return (
        <div className="container mx-auto px-15 pb-10 space-y-6">
            <div className="font-semibold text-3xl">Doanh Thu Hàng Tháng</div>

            <div className="flex items-center justify-between w-full gap-4">
                <Select
                    value={selectedSort}
                    onValueChange={(value) => setSelectedSort(value)}
                >
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sắp xếp theo..." />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value={"DESC"}>Mới nhất</SelectItem>
                            <SelectItem value={"ASC"}>Cũ nhất</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>

                <div className="flex gap-x-2 items-baseline">
                    <h3>năm</h3>
                    <Select value={yearTo} onValueChange={setYearTo}>
                        <SelectTrigger className="w-[100px]">
                            <SelectValue placeholder="Chọn năm" />
                        </SelectTrigger>

                        <SelectContent>
                            {years.map((y) => (
                                <SelectItem key={y} value={String(y)}>
                                    {y}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

            </div>

            {/* table order */}
            <div>
                <OrderTable sort={selectedSort} isloading={isLoading} currentPageRows={dataRevenues} />
            </div>
        </div>
    );
};

export default OrderPage;


