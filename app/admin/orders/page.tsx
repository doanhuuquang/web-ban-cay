"use client";

import * as React from "react";
import {
  Eye,
  Trash,
  CheckCircle,
  Clock,
  Package,
  XCircle,
  RefreshCcw,
  DollarSign,
  Truck
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { getAllOrderMock, getOrderByIdOrProfileMock, getOrderByStatusMock } from "@/mock/orderMock";
import storeOrder from "@/store/storeOder";
import { OrderStatusTypeLabel } from "@/lib/type/order-status";
import { formatMoney } from "@/lib/helpers/format-money";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";


function OrderStatsList() {
  const stats = storeOrder((s) => s.orderSum)
  const data = [
    { title: "Tổng doanh thu", countStats: stats.totalIncome, icon: DollarSign },
    { title: "Đã hoàn thành", countStats: stats.success, icon: CheckCircle },
    { title: "Chờ xử lý", countStats: stats.pending, icon: Clock },
    { title: "Chờ lấy hàng", countStats: stats.delivering, icon: Truck },
    { title: "Đang giao hàng", countStats: stats.shipping, icon: Package },
    { title: "Đã hủy", countStats: stats.cancelled, icon: XCircle },
    { title: "Hoàn trả", countStats: stats.returned, icon: RefreshCcw },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 w-full h-fit rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.15)] gap-1 px-2 py-4">
      {data.map((os) => {
        const Icon = os.icon;
        return (
          <div
            key={os.title}
            className="flex items-center justify-between h-fit py-5 px-4 bg-white border-r-2 last:border-r-0"
          >
            <div>
              <h1 className="text-xl font-semibold">{os.countStats}</h1>
              <p className="text-sm text-gray-500">{os.title}</p>
            </div>

            <div className="p-3 rounded-xl bg-gray-100">
              <Icon className="text-gray-600" />
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OrderTable() {

  const isloading = storeOrder((s) => s.loading);
  const currentPageRows = storeOrder((s) => s.orderAll);

  if (isloading) return (
    <div className="text-center">loading...</div>
  )

  if (!currentPageRows) return (
    <div className="text-center">Không có dữ liệu</div>
  )

  return (
    <div className="space-y-4">
      {/* table */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm h-150">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100 border-b">
            <tr className="font-semibold text-gray-700">
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">Mã thanh toán</th>
              <th className="px-4 py-3">Mã khách hàng</th>
              <th className="px-4 py-3">Mã địa chỉ</th>
              <th className="px-4 py-3">Phí vận chuyển</th>
              <th className="px-4 py-3">Giá tiền</th>
              <th className="px-4 py-3">ngày đặt</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Ngày đặt hàng</th>
            </tr>
          </thead>

          <tbody>
            {currentPageRows.map((row) => {

              return (
                <tr
                  key={row.orderId}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{row.orderId}</td>
                  <td className="px-4 py-3">{row.paymentId}</td>
                  <td className="px-4 py-3">{row.profileId}</td>
                  <td className="px-4 py-3">{row.deliveryAddressId}</td>
                  <td className="px-4 py-3">{formatMoney(row.shippingFee)}</td>
                  <td className="px-4 py-3">{formatMoney(row.totalAmount)}</td>
                  <td className="px-4 py-3">{row.orderDate.toString()}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium "bg-gray-100 text-gray-700"
                        }`}
                    >
                      {OrderStatusTypeLabel[row.orderStatus]}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="flex items-center gap-3 text-gray-600">
                    </span>
                  </td>
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

  const [selectedOrderId, setSelectedOrderId] = React.useState<string>("all");
  const [valueFindOrder, setValueFindOrder] = React.useState<string>("");

  React.useEffect(() => {
    const feachOder = async () => {
      if (!valueFindOrder) await getAllOrderMock();
      else
        await getOrderByIdOrProfileMock(selectedOrderId, valueFindOrder);
    }
    feachOder();
  }, [valueFindOrder, selectedOrderId])

  React.useEffect(() => {
    const feachOder = async () => {
      await getAllOrderMock();
    }

    feachOder();
  }, [])

  const [selectedOrderStatus, setSelectedOrderStatus] = React.useState<string>("");


  React.useEffect(() => {
    const feachOder = async () => {
      if (!selectedOrderStatus || selectedOrderStatus === "all") await getAllOrderMock();
      else
        await getOrderByStatusMock(selectedOrderStatus);
    }
    feachOder();
  }, [selectedOrderStatus])


  return (
    <div className="container mx-auto px-15 pb-10 space-y-6">
      <div className="font-semibold text-3xl">Đơn hàng</div>
      <OrderStatsList />

      <div className="flex items-center justify-between w-full gap-4">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Tìm kiếm đơn hàng"
            className="max-w-sm rounded-md"
            value={valueFindOrder}
            onChange={(e) => setValueFindOrder(e.target.value)}
          />

          <Select value={selectedOrderId} onValueChange={(value) => setSelectedOrderId(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tìm kiếm theo..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup >
                <SelectItem value={"all"}>tất cả</SelectItem>
                <SelectItem value={"userId"}>Mã khách hàng</SelectItem>
                <SelectItem value={"paymentId"}>Mã Thanh toán</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Select onValueChange={(value) => setSelectedOrderStatus(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Chọn trạng thái đơn hàng" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Trạng thái đơn hàng</SelectLabel>
              <SelectItem value="all">Tất cả</SelectItem>
              {
                Object.entries(OrderStatusTypeLabel).map(([key, label], index) => <SelectItem key={index} value={key}>{label}</SelectItem>)
              }
            </SelectGroup>
          </SelectContent>
        </Select>

      </div>

      {/* table order */}
      <div>
        <OrderTable />
      </div>
    </div>
  );
};

export default OrderPage;
