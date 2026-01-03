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

import { quarterlyRevenue } from "@/lib/models/revenue";
import { getQuarterlyRevenue } from "@/lib/services/revenue-service";
import {
  CheckCircle,
  Package,
  TrendingUp,
  DollarSign,
  Sigma,
  CalendarRange,
} from "lucide-react";

function QuarterRevenueStatsList() {
  const data = [
    {
      title: "Tổng doanh thu",
      countStats: (36363636).toLocaleString(),
      icon: DollarSign,
    },
    {
      title: "Tổng số đơn",
      countStats: 36,
      icon: Package,
    },
    {
      title: "Tổng sản phẩm đã bán",
      countStats: 36,
      icon: CheckCircle,
    },
    {
      title: "Quý cao nhất",
      countStats: 3,
      icon: CalendarRange,
    },
    {
      title: "Bình quân (đơn hàng)",
      countStats: 36 + "%",
      icon: Sigma,
    },
    {
      title: "Tăng trưởng",
      countStats: 36 + "%",
      icon: TrendingUp,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full h-fit rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.15)] gap-1 px-2 py-4">
      {data.map((data) => {
        const Icon = data.icon;
        return (
          <div
            key={data.title}
            className="flex gap-y-3 gap-1 items-center h-full py-2 px-4 bg-white border-r-2 last:border-r-0"
          >
            <div className="rounded-md p-2 bg-gray-100">
              <Icon className="text-gray-600 w-8 h-8" />
            </div>
            <div className="flex flex-col items-start gap-2 rounded-xl p-2">
              <p className="text-sm">{data.title}</p>
              <h3 className="text-xl font-semibold break-all whitespace-normal">
                {data.countStats}
              </h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OrderTable({
  sort,
  isloading,
  currentPageRows,
}: {
  sort: string;
  isloading: boolean;
  currentPageRows: quarterlyRevenue[];
}) {
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
              <th className="px-4 py-3">quý</th>
              <th className="px-4 py-3">doanh thu</th>
              <th className="px-4 py-3">số đơn</th>
              <th className="px-4 py-3">số sp đã bán</th>
              <th className="px-4 py-3">Trung bình đơn</th>
              <th className="px-4 py-3">mức tăng trưởng</th>
            </tr>
          </thead>

          <tbody>
            {(sort === "ASC"
              ? currentPageRows
              : currentPageRows.slice().reverse()
            ).map((row, index) => {
              return (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{row.quarter}</td>
                  <td className="px-4 py-3">
                    {formatMoney(row.revenueQuarter)}
                  </td>
                  <td className="px-4 py-3">{row.totalOrders}</td>
                  <td className="px-4 py-3">{row.totalProductsSold}</td>
                  <td className="px-4 py-3">
                    {formatMoney(row.avgOrderValue)}
                  </td>
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
  const [dataRevenues, setDataRevenues] = React.useState<quarterlyRevenue[]>(
    []
  );

  React.useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const res = await getQuarterlyRevenue(yearTo);
      if (res.code === 1 && res.data) setDataRevenues(res.data);

      setIsloading(false);
    };
    fetchData();
  }, [yearTo]);

  return (
    <div className="container mx-auto px-15 pb-10 space-y-6">
      <div className="font-semibold text-3xl">Doanh Thu Hàng Quý</div>
      <QuarterRevenueStatsList />

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
        <OrderTable
          sort={selectedSort}
          isloading={isLoading}
          currentPageRows={dataRevenues}
        />
      </div>
    </div>
  );
};

export default OrderPage;
