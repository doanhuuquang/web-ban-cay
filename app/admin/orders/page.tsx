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
import { confirmCashPayment, confirmVnPayPayment, vnpayConfirm } from "@/lib/services/payment-service";
import { toast } from "sonner";
import { Payment } from "@/lib/models/payment";
import { getPaymentById } from "@/lib/services/order-service";

function OrderStatsList() {
  const F = storeOrder((s) => s.orderAll);
  const stats = summaryOrders(F || []);

  const data = [
    {
      title: "Tổng doanh thu",
      countStats: formatMoney(stats?.totalIncome) ?? 0,
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
    {
      title: "Đã tạo đơn",
      countStats: stats?.created ?? 0,
      icon: Package,
    },
    { title: "Đã hủy", countStats: stats?.cancelled ?? 0, icon: XCircle },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 w-full h-fit rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.15)] gap-1 px-2 py-4">
      {data.map((os) => {
        const Icon = os.icon;
        return (
          <div
            key={os.title}
            className="flex flex-col gap-y-3 items-end justify-end h-fit py-4 px-4 bg-white border-r-2 last:border-r-0"
          >
            <div className="flex rounded-xl bg-gray-100 px-1 py-0.5">
              <Icon className="text-gray-600" />
              <p className="text-sm text-gray-500">{os.title}</p>
            </div>

            <div>
              <h3 className="text-xl font-semibold">{os.countStats}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function OrderTable({ sort }: { sort: string }) {
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
      <div className="w-full overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr className="font-semibold text-gray-700">
              <th className="px-6 py-3">Mã đơn</th>
              <th className="px-6 py-3">Mã khách</th>
              <th className="px-6 py-3">Tổng tiền</th>
              <th className="px-6 py-3">Phí vận chuyển</th>
              <th className="px-6 py-3">Ngày đặt</th>
              <th className="px-6 py-3">Trạng thái</th>
              <th className="px-6 py-3 text-center">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {(sort === "ASC" ? currentPageRows : currentPageRows.slice().reverse()).map((row) => {
              return (
                <tr
                  key={row.orderId}
                  className="border-b border-gray-100 hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-3 font-medium text-gray-900">{row.orderId}</td>
                  <td className="px-6 py-3 text-gray-600">{row.profileId}</td>
                  <td className="px-6 py-3 font-semibold text-blue-600">{formatMoney(row.totalAmount)}</td>
                  <td className="px-6 py-3 text-gray-600">{formatMoney(row.shippingFee)}</td>
                  <td className="px-6 py-3 text-gray-600">{new Date(row.orderDate).toLocaleDateString("vi-VN")}</td>
                  <td className="px-6 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${
                        row.orderStatus === "DELIVERED"
                          ? "bg-green-100 text-green-700"
                          : row.orderStatus === "CANCELLED"
                          ? "bg-red-100 text-red-700"
                          : row.orderStatus === "PENDING"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {OrderStatusTypeLabel[row.orderStatus]}
                    </span>
                  </td>

                  <td className="px-6 py-3">
                    <div className="flex items-center justify-center gap-2">
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Link href={`/admin/orders/${row.orderId}`}>
                            <Button
                              size={"icon"}
                              variant="ghost"
                              className="hover:bg-blue-50"
                            >
                              <Eye className="size-4 text-blue-600" />
                            </Button>
                          </Link>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Xem chi tiết</p>
                        </TooltipContent>
                      </Tooltip>
                      {(!["DELIVERED", "CANCELLED"].includes(row.orderStatus)) && (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={(e) => {
                                e.preventDefault();
                                handlerUpdateStatusOrder(row);
                              }}
                              size={"icon"}
                              variant="ghost"
                              className="hover:bg-orange-50"
                            >
                              <SquarePen className="size-4 text-orange-600" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Sửa trạng thái</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                    </div>
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
  const [selectedSort, setSelectedSort] = React.useState<string>("DESC");
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
    const timeout = setTimeout(() => {
      const feachOder = async () => {
        if (!valueFindOrder) await getAllOrderMock();
        else await getOrderByIdOrProfileMock(selectedOrderId, valueFindOrder);
      };
      feachOder();
    }, 300);

    return ()=>clearTimeout(timeout)
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
    <div className="container mx-auto px-5 pb-10 space-y-4">
      <div className="font-semibold text-3xl">Đơn hàng</div>
      <OrderStatsList />

      {/* Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-4 space-y-3">
        {/* Row 1: Search and Basic Filters */}
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-1 min-w-[250px]">
            <Input
              placeholder="Tìm kiếm đơn hàng..."
              className="rounded-md"
              value={valueFindOrder}
              onChange={(e) => setValueFindOrder(e.target.value)}
            />
          </div>

          <Select
            value={selectedOrderId}
            onValueChange={(value) => setSelectedOrderId(value)}
          >
            <SelectTrigger className="min-w-[140px]">
              <SelectValue placeholder="Tìm kiếm theo..." />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"all"}>Tất cả</SelectItem>
                <SelectItem value={"userId"}>Mã khách hàng</SelectItem>
                <SelectItem value={"orderId"}>Mã đơn hàng</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select
            value={selectedSort}
            onValueChange={(value) => setSelectedSort(value)}
          >
            <SelectTrigger className="min-w-[130px]">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value={"DESC"}>Mới nhất</SelectItem>
                <SelectItem value={"ASC"}>Cũ nhất</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedOrderStatus(value)}>
            <SelectTrigger className="min-w-[140px]">
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Trạng thái đơn hàng</SelectLabel>
                <SelectItem value="all">Tất cả</SelectItem>
                {Object.entries(OrderStatusTypeLabel)
                  .filter(([v]) => v !== "RETURNED")
                  .map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {/* Row 2: Date Range Filter */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="text-sm font-medium text-gray-600">Từ</span>
          <input
            type="date"
            className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
          />
          <span className="text-sm font-medium text-gray-600">Đến</span>
          <input
            type="date"
            className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={to}
            min={from}
            onChange={(e) => setTo(e.target.value)}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              handlerSearchDate();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-medium"
            variant="default"
          >
            Tìm kiếm
          </Button>
          <Button
            onClick={(e) => {
              e.preventDefault();
              handlerResetDate();
            }}
            className="px-4 py-2 rounded text-sm font-medium border border-gray-200 hover:bg-gray-50"
            variant="outline"
          >
            Xóa
          </Button>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <OrderTable sort={selectedSort} />
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
  const [valuePaymentId, setValuePaymentId] = React.useState<Payment | null>(null)

  React.useEffect(() => {
        const fetchProduct1 = async () => {
            if(!initialData?.orderStatus) return
            const res1 = await getPaymentById(initialData?.paymentId)
            if (res1.code === 1) {
              console.log(res1)
                setValuePaymentId(res1.payment);
            }}

        fetchProduct1();
    }, [initialData]);

  if (!initialData) return null;

  const handleSubmit = async () => {
    if (!initialData || !selectStatus) return;
    try {
      setLoading(true);
      if (selectStatus === "DELIVERED" && valuePaymentId?.paymentMethod==="CASH") {
        const res = await confirmCashPayment(initialData.orderId)
        if (res.code === 1) {
          toast("xác nhận thành công");
          window.location.reload()
        }
        else
          toast("xác nhận thất bại");
        close();
      }

      if (selectStatus === "DELIVERED" && valuePaymentId?.paymentMethod==="VNPAY") {
        const res = await confirmVnPayPayment(initialData.orderId)
        if (res.code === 1) {
          toast("xác nhận thành công");
          window.location.reload()
        }
        else
          toast("xác nhận thất bại");
        close();
      }

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
                { (valuePaymentId?.paymentStatus==="INIT" ? Object.entries(OrderStatusTypeLabel).filter(([e])=>(["CREATED","CANCELLED"].includes(e))) :  Object.entries(OrderStatusTypeLabel))
                  .filter(([value]) => (value !== "RETURNED"))
                  .map(
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
