"use client";

import * as React from "react";
import {
  Eye,
  CheckCircle,
  Clock,
  Package,
  XCircle,
  RefreshCcw,
  DollarSign,
  SquarePen,
} from "lucide-react";

import { Input } from "@/components/ui/input";

import {
  filterOrdersByDateMock,
  getAllOrderMock,
  getOrderByIdOrProfileMock,
  getOrderByStatusMock,
  summaryOrders,
  UpdateOrderStatusMock,
} from "@/mock/orderMock";
import storeOrder from "@/store/storeOder";
import { OrderStatusTypeLabel } from "@/lib/type/order-status";
import { formatMoney } from "@/lib/helpers/format-money";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Order } from "@/lib/models/order";
import Link from "next/link";
import { handler } from "next/dist/build/templates/app-page";

function OrderStatsList() {
  const F = storeOrder((s) => s.orderAll);
  const stats = summaryOrders(F || []);

  const data = [
    {
      title: "Tổng doanh thu",
      countStats: stats?.totalIncome ?? 0,
      icon: DollarSign,
    },
    {
      title: "Đã hoàn thành",
      countStats: stats?.success ?? 0,
      icon: CheckCircle,
    },
    { title: "Chờ xử lý", countStats: stats?.pending ?? 0, icon: Clock },
    {
      title: "Đang giao hàng",
      countStats: stats?.shipping ?? 0,
      icon: Package,
    },
    { title: "Đã hủy", countStats: stats?.cancelled ?? 0, icon: XCircle },
    { title: "Hoàn trả", countStats: stats?.returned ?? 0, icon: RefreshCcw },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 w-full h-fit rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.15)] gap-1 px-2 py-4">
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
  //data
  const isloading = storeOrder((s) => s.loading);
  const currentPageRows = storeOrder((s) => s.orderAll);

  //modal
  const [modalUpdateStatus, setModalUpdateStatus] =
    React.useState<boolean>(false);
  const [valueOrderSelect, setValueOrderSelect] = React.useState<Order | null>(
    null
  );

  const handlerUpdateStatusOrder = (order: Order) => {
    setModalUpdateStatus(true);
    setValueOrderSelect(order);
  };

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
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">Mã thanh toán</th>
              <th className="px-4 py-3">Mã khách hàng</th>
              <th className="px-4 py-3">Mã địa chỉ</th>
              <th className="px-4 py-3">Phí vận chuyển</th>
              <th className="px-4 py-3">Giá tiền</th>
              <th className="px-4 py-3">ngày đặt</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Cài đặt</th>
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          onClick={(e) => {
                            e.preventDefault();
                            handlerUpdateStatusOrder(row);
                          }}
                          size={"icon"}
                          variant="ghost"
                        >
                          <SquarePen className="size-5 " />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Sửa trạng thái</p>
                      </TooltipContent>
                    </Tooltip>

                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Link href={`/admin/orders/${row.orderId}`}>
                          <Button
                            onClick={(e) => {
                              e.preventDefault();
                            }}
                            size={"icon"}
                            variant="ghost"
                          >
                            <Eye className="size-5 " />
                          </Button>
                        </Link>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Xem chi tiết</p>
                      </TooltipContent>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {modalUpdateStatus && (
        <EditCategoryModal
          closeModal={() => setModalUpdateStatus(false)}
          initialData={valueOrderSelect}
        />
      )}
    </div>
  );
}

const OrderPage = () => {
  const [selectedOrderId, setSelectedOrderId] = React.useState<string>("all");
  const [valueFindOrder, setValueFindOrder] = React.useState<string>("");

  const [from, setFrom] = React.useState("");
  const [to, setTo] = React.useState(
    () => new Date().toISOString().split("T")[0]
  );

  const handlerResetDate = async () => {
    setFrom("");
    setTo(() => new Date().toISOString().split("T")[0]);
    getAllOrderMock();
  };

  const handlerSearchDate = async () => {
    await getAllOrderMock();
    filterOrdersByDateMock(from, to);
  };

  React.useEffect(() => {
    const feachOder = async () => {
      if (!valueFindOrder) await getAllOrderMock();
      else await getOrderByIdOrProfileMock(selectedOrderId, valueFindOrder);
    };
    feachOder();
  }, [valueFindOrder, selectedOrderId]);

  React.useEffect(() => {
    const feachOder = async () => {
      await getAllOrderMock();
    };

    feachOder();
  }, []);

  const [selectedOrderStatus, setSelectedOrderStatus] =
    React.useState<string>("");

  React.useEffect(() => {
    const feachOder = async () => {
      if (!selectedOrderStatus || selectedOrderStatus === "all")
        await getAllOrderMock();
      else await getOrderByStatusMock(selectedOrderStatus);
    };
    feachOder();
  }, [selectedOrderStatus]);

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

          <Select
            value={selectedOrderId}
            onValueChange={(value) => setSelectedOrderId(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tìm kiếm theo..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
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
              {Object.entries(OrderStatusTypeLabel).map(
                ([key, label], index) => (
                  <SelectItem key={index} value={key}>
                    {label}
                  </SelectItem>
                )
              )}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end">
        <div className="flex gap-4 items-baseline">
          <label>Từ ngày</label>

          <div className="flex flex-col">
            <input
              type="date"
              className="border rounded px-2 py-1"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>

          <label>Đến ngày</label>

          <div className="flex flex-col">
            <input
              type="date"
              className="border rounded px-2 py-1"
              value={to}
              min={from} // chặn chọn ngày nhỏ hơn from
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handlerSearchDate();
            }}
            className="bg-blue-500/100 hover:bg-blue-500/90 rounded-sm"
            variant="default"
          >
            tìm kiếm
          </Button>

          <Button
            onClick={(e) => {
              e.preventDefault();
              handlerResetDate();
            }}
            className="rounded-sm"
            variant="destructive"
          >
            Xóa
          </Button>
        </div>
      </div>

      {/* table order */}
      <div>
        <OrderTable />
      </div>
    </div>
  );
};

export default OrderPage;

//modal
function EditCategoryModal({
  closeModal,
  initialData,
}: {
  closeModal: () => void;
  initialData: Order | null;
}) {
  const [selectStatus, setSelectStatus] = React.useState<string>(
    initialData ? initialData.orderStatus : ""
  );
  const [loading, setLoading] = React.useState(false);

  if (!initialData) return null;

  const handleSubmit = async () => {
    if (!initialData || !selectStatus) return;
    try {
      setLoading(true);
      await UpdateOrderStatusMock(initialData.orderId, selectStatus);
      closeModal();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in-95 duration-200">
        <h2 className="text-xl font-semibold mb-4">Sửa trạng thái đơn hàng</h2>

        <div className="space-y-2 mb-4 text-sm">
          <div>
            <strong>Mã đơn hàng:</strong> {initialData.orderId}
          </div>
          <div>
            <strong>Giá tiền:</strong> {initialData.totalAmount}
          </div>
          <div>
            <strong>Ngày đặt:</strong>{" "}
            {new Date(initialData.orderDate).toLocaleString()}
          </div>
        </div>

        <div className="space-y-4">
          <label className="block text-sm font-medium">
            Trạng thái đơn hàng
          </label>

          <Select
            value={selectStatus}
            onValueChange={(value) => setSelectStatus(value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chọn trạng thái đơn hàng" />
            </SelectTrigger>

            <SelectContent>
              <SelectGroup>
                <SelectLabel>Trạng thái</SelectLabel>
                {Object.entries(OrderStatusTypeLabel).map(
                  ([key, label], index) => (
                    <SelectItem key={index} value={key}>
                      {label}
                    </SelectItem>
                  )
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-md border hover:bg-gray-50"
            disabled={loading}
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={!selectStatus || loading}
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Đang lưu..." : "Lưu thay đổi"}
          </button>
        </div>
      </div>
    </div>
  );
}
