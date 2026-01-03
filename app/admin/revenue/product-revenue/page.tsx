
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

import {  productRevenue } from "@/lib/models/revenue";
import {  getProductRevenue } from "@/lib/services/revenue-service";


function OrderTable({ sort, isloading, currentPageRows }: { sort: string, isloading: boolean, currentPageRows: productRevenue[] }) {

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
                            <th className="px-4 py-3">id</th>
                            <th className="px-4 py-3">Tên sp</th>
                            <th className="px-4 py-3">đã thu</th>
                            <th className="px-4 py-3">số lượng đã bán</th>
                            <th className="px-4 py-3">số đơn</th>
                            <th className="px-4 py-3">Trung bình đơn</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(sort === "ASC" ? currentPageRows : currentPageRows.slice().reverse()).map((row, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{row.productId}</td>
                                    <td className="px-4 py-3">{row.productName}</td>
                                    <td className="px-4 py-3">{formatMoney(row.revenueProduct)}</td>
                                    <td className="px-4 py-3">{row.totalSold}</td>
                                    <td className="px-4 py-3">{row.totalOrders}</td>
                                    <td className="px-4 py-3">{formatMoney(row.averagePrice)}</td>

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

    const currentMonth = new Date().getMonth() + 1;
    const months = Array.from({ length: 12 }, (_, i) => i + 1);
    const [month, setMonth] = React.useState<string>(currentMonth.toString());

    //data
    const [dataRevenues, setDataRevenues] = React.useState<productRevenue[]>([])

    React.useEffect(() => {
        const fetchData = async () => {
            setIsloading(true)
            const res = await getProductRevenue(month, yearTo);
            if (res.code === 1 && res.data)
                setDataRevenues(res.data)

            setIsloading(false);
        }
        fetchData();
    }, [month, yearTo])

    return (
        <div className="container mx-auto px-15 pb-10 space-y-6">
            <div className="font-semibold text-3xl">Doanh Thu Theo sản phẩm</div>

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
                    <h3>tháng</h3>
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="border rounded px-3 py-2"
                    >
                        <option value="">-- Chọn tháng --</option>

                        {months.map((m) => (
                            <option key={m} value={m}>
                                Tháng {m}
                            </option>
                        ))}
                    </select>

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


