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

import { DEFAULT_PRODUCT_REVENUE, getProductRevenueStats, productRevenue } from "@/lib/models/revenue";
import { getProductRevenue } from "@/lib/services/revenue-service";
import {
  CheckCircle,
  Package,
  ScanBarcode,
  TreePalm,
  TrendingUp,
} from "lucide-react";

function ProductRevenueStatsList({productStats}:{productStats:productRevenue}) {

const data = [
  {
    title: "Tổng sản phẩm đã thu",
    countStats: formatMoney(productStats.revenueProduct),
    icon: ScanBarcode,
  },
  {
    title: "Tổng số đơn",
    countStats: productStats.totalOrders,
    icon: Package,
  },
  {
    title: "Tổng sản phẩm đã bán",
    countStats: productStats.totalSold,
    icon: CheckCircle,
  },
  {
    title: "Sản phẩm nhiều nhất",
    countStats: productStats.productName || "-",
    icon: TreePalm,
  },
  {
    title: "Bình quân",
    countStats: productStats.averagePrice.toLocaleString(),
    icon: TrendingUp,
  },
];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 w-full h-fit rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.15)] gap-1 px-2 py-4">
      {data.map((data) => {
        const Icon = data.icon;
        return (
          <div
            key={data.title}
            className="flex gap-y-3 gap-4 items-center h-fit py-2 px-4 bg-white border-r-2 last:border-r-0"
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
  currentPageRows: productRevenue[];
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
              <th className="px-4 py-3">id</th>
              <th className="px-4 py-3">Tên sp</th>
              <th className="px-4 py-3">đã thu</th>
              <th className="px-4 py-3">số lượng đã bán</th>
              <th className="px-4 py-3">số đơn</th>
              <th className="px-4 py-3">Trung bình đơn</th>
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
                  <td className="px-4 py-3">{row.productId}</td>
                  <td className="px-4 py-3">{row.productName}</td>
                  <td className="px-4 py-3">
                    {formatMoney(row.revenueProduct)}
                  </td>
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
  const [dataRevenues, setDataRevenues] = React.useState<productRevenue[]>([]);
  const [dataRevenueSum, setDataRevenueSum] = React.useState<productRevenue>(DEFAULT_PRODUCT_REVENUE);

  React.useEffect(() => {
    const fetchData = async () => {
      setIsloading(true);
      const res = await getProductRevenue(month, yearTo);
      if (res.code === 1 && res.data) setDataRevenues(res.data);

      setIsloading(false);
    };
    fetchData();
  }, [month, yearTo]);


  React.useEffect(() => {
    const fetchData =  () => {
      setIsloading(true);
      const res=getProductRevenueStats(dataRevenues);
      setDataRevenueSum(res)
      setIsloading(false);
    };
    fetchData();
  }, [dataRevenues]);

  return (
    <div className="container mx-auto px-15 pb-10 space-y-6">
      <div className="font-semibold text-3xl">Doanh Thu Theo sản phẩm</div>
      <ProductRevenueStatsList productStats={dataRevenueSum}/>

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
