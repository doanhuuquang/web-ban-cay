"use client";

import * as React from "react";
import {
  CalendarClock,
  CheckCheck,
  Ban,
  OctagonAlert,
  Package2,
  Truck,
  Eye,
  Trash,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Plus,
} from "lucide-react";

import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  orders as ordersData,
  OrderItemProps,
} from "@/app/admin/constants/order-data";
import { Input } from "@/components/ui/input";
import PopupDelete from "../_components/popup-delete";
import Link from "next/link";
import { Order } from "@/lib/models/order";
import { useAuth } from "@/lib/contexts/auth-context";
import { getOrders } from "@/lib/services/order-service";

type itemStatsProps = {
  title: string;
  countStats: number;
  icon: React.ElementType;
};

type OrderStatsListProps = {
  data: itemStatsProps[];
};

const orderStats: itemStatsProps[] = [
  {
    title: "Thu nhập",
    countStats: 186450000,
    icon: CheckCheck,
  },
  {
    title: "Thành công",
    countStats: 1_248,
    icon: CheckCheck,
  },
  {
    title: "Thất bại",
    countStats: 47,
    icon: OctagonAlert,
  },
  {
    title: "Chờ xử lý",
    countStats: 132,
    icon: CalendarClock,
  },
  {
    title: "Chờ lấy hàng",
    countStats: 89,
    icon: Package2,
  },
  {
    title: "Đang giao hàng",
    countStats: 276,
    icon: Truck,
  },
  {
    title: "Đã huỷ",
    countStats: 63,
    icon: Ban,
  },
];

function OrderStatsList({ data }: OrderStatsListProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 w-full h-fit rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.15)] gap-1 px-2 py-4">
        {data.map((os) => {
          const Icon = os.icon;
          return (
            <div
              key={os.title}
              className="flex items-center justify-between h-fit py-5 px-4 bg-white border-r-2 last:border-r-0"
            >
              <div className="">
                <h1 className="text-xl font-semibold">{os.countStats}</h1>
                <p className="text-sm text-gray-500">{os.title}</p>
              </div>

              <div className=" p-3 rounded-xl bg-gray-100">
                <Icon className=" text-gray-600" />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

type OrderTableProps = {
  orders: Order[];
  popup: (id: string) => void;
};

function OrderTable({ orders, popup }: OrderTableProps) {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const pageCount = Math.ceil(orders.length / pageSize);

  const currentOrderInPage = orders.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  React.useEffect(() => {
    setPageIndex(0);
  }, [orders]);

  return (
    <div className="space-y-4">
      {/* table */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm h-150">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100 border-b">
            <tr className="font-semibold text-gray-700">
              <th className="px-4 py-3">Mã đơn hàng</th>
              <th className="px-4 py-3">Mã thanh toán</th>
              <th className="px-4 py-3">Mã khách hàng</th>
              <th className="px-4 py-3">Địa chỉ giao hàng</th>
              <th className="px-4 py-3">Phí vận chuyển</th>
              <th className="px-4 py-3">Số tiền giảm giá</th>
              <th className="px-4 py-3">Tổng tiền</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Ngày đặt hàng</th>
            </tr>
          </thead>

          <tbody>
            {currentOrderInPage.map((order) => {
              const statusStyles = [
                {
                  "Chờ xử lý": "bg-yellow-100 text-yellow-700",
                  "Đang giao hàng": "bg-blue-100 text-blue-700",
                  "Chờ lấy hàng": "bg-indigo-100 text-indigo-700",
                  "Thành công": "bg-green-100 text-green-700",
                  "Thất bại": "bg-red-100 text-red-700",
                  "Đã huỷ": "bg-gray-200 text-gray-700",
                },
              ];

              return (
                <tr
                  key={order.orderId}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{order.orderId}</td>
                  <td className="px-4 py-3">{order.profileId}</td>
                  <td className="px-4 py-3">{order.paymentId}</td>
                  <td className="px-4 py-3">{order.deliveryAddressId}</td>
                  <td className="px-4 py-3">{order.shippingFee}</td>
                  <td className="px-4 py-3">{order.discountAmount}</td>
                  <td className="px-4 py-3">{order.totalAmount}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        statusStyles[order.orderStatus] ||
                        "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3">{order.orderDate}</td>

                  <td className="px-4 py-3">
                    <span className="flex items-center gap-3 text-gray-600">
                      {/* edit */}
                      <div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="p-1 rounded-md w-fit h-fit">
                              <Link href={`/admin/orders/${order.orderId}`}>
                                <Eye className="cursor-pointer hover:text-blue-600 transition" />
                              </Link>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Chi tiết đơn hàng</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>

                      {/* delete */}
                      <div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="p-1 rounded-md w-fit h-fit">
                              <Trash
                                className="cursor-pointer hover:text-red-600 transition"
                                onClick={() => popup(order.orderId)}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Xoá đơn hàng</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* pagination */}
      <div className="flex items-center justify-between px-2 mt-2">
        <div className="text-gray-600 text-sm">
          Trang {pageIndex + 1} trên {pageCount} — Tổng {orders.length} hàng
        </div>

        <div className="flex items-center space-x-6">
          {/* PAGE SIZE */}
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Số hàng / trang</p>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageIndex(0);
              }}
              className="h-8 border rounded px-2"
            >
              {[10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* page controls */}
          <div className="flex items-center space-x-2">
            <button
              className="border rounded p-1 disabled:opacity-50"
              onClick={() => setPageIndex(0)}
              disabled={pageIndex === 0}
            >
              <ChevronsLeft size={18} />
            </button>

            <button
              className="border rounded p-1 disabled:opacity-50"
              onClick={() => setPageIndex((p) => p - 1)}
              disabled={pageIndex === 0}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              className="border rounded p-1 disabled:opacity-50"
              onClick={() => setPageIndex((p) => p + 1)}
              disabled={pageIndex === pageCount - 1}
            >
              <ChevronRight size={18} />
            </button>

            <button
              className="border rounded p-1 disabled:opacity-50"
              onClick={() => setPageIndex(pageCount - 1)}
              disabled={pageIndex === pageCount - 1}
            >
              <ChevronsRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

type ModalOrderProps = {
  closeModal: () => void;
  onSubmit: (data: OrderItemProps) => void;
};

function ModalOrder({ closeModal, onSubmit }: ModalOrderProps) {
  const [formState, setFormSate] = React.useState<OrderItemProps>({
    id: crypto.getRandomValues(new Uint32Array(1))[0].toString(16).slice(0, 8),
    name: "",
    customer: "",
    customerID: "",
    date: "",
    price: "",
    quantity: "",
    status: "Chờ xử lý",
  });

  const [errors, setErrors] = React.useState("");
  type FormKeys = keyof typeof formState;
  const fieldAlias: Record<FormKeys, string> = {
    id: "ID",
    name: "Tên sản phẩm",
    customer: "Tên khách hàng",
    customerID: "Mã khách hàng",
    date: "Ngày đặt hàng",
    price: "Giá tiền",
    quantity: "Số lượng",
    status: "Trạng thái",
  };

  const validateForm = () => {
    if (
      formState.name &&
      formState.customer &&
      formState.date &&
      formState.price &&
      formState.quantity
    ) {
      setErrors("");
      return true;
    } else {
      const errorFields: string[] = [];

      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(fieldAlias[key as FormKeys]);
        }
      }

      setErrors(errorFields.join(", "));

      return false;
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormSate({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSubmit(formState);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 animate-in fade-in zoom-in-95 duration-200">
        <h2 className="text-lg font-semibold mb-4">Thêm đơn hàng</h2>

        <form className="space-y-4">
          {/* Tên đơn hàng */}
          <div className="flex flex-col">
            <label htmlFor="name" className="font-medium mb-1">
              Tên đơn hàng
            </label>
            <input
              id="name"
              name="name"
              onChange={handleChange}
              value={formState.name}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Tên khách hàng */}
          <div className="flex flex-col">
            <label htmlFor="customer" className="font-medium mb-1">
              Tên khách hàng
            </label>
            <input
              id="customer"
              name="customer"
              type="text"
              value={formState.customer}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* mã khách hàng */}
          <div className="flex flex-col">
            <label htmlFor="customerID" className="font-medium mb-1">
              Mã khách hàng
            </label>
            <input
              id="customerID"
              name="customerID"
              type="customerID"
              value={formState.customerID}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Ngày đặt hàng */}
          <div className="flex flex-col">
            <label htmlFor="date" className="font-medium mb-1">
              Ngày đặt hàng
            </label>
            <input
              id="date"
              name="date"
              type="date"
              value={formState.date}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* số lượng */}
          <div className="flex flex-col">
            <label htmlFor="quantity" className="font-medium mb-1">
              Số lượng
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              value={formState.quantity}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Giá tiền */}
          <div className="flex flex-col">
            <label htmlFor="price" className="font-medium mb-1">
              Giá tiền
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={formState.price}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Trạng thái */}
          <div className="flex flex-col">
            <label htmlFor="status" className="font-medium mb-1">
              Trạng thái
            </label>
            <select
              id="status"
              name="status"
              value={formState.status}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            >
              <option value="Thành công">Thành công</option>
              <option value="Thất bại">Thất bại</option>
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Đã huỷ">Đã huỷ</option>
              <option value="Đang giao hàng">Đang giao hàng</option>
              <option value="Chờ lấy hàng">Chờ lấy hàng</option>
            </select>
          </div>

          {errors && (
            <div className="mt-2 rounded-md bg-red-50 border border-red-300 text-red-700 px-3 py-2 text-sm">
              {`Vui lòng nhập: ${errors}`}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Thêm mới
          </button>
        </form>
      </div>
    </div>
  );
}

const OrderPage = () => {
  const [orders, setOrders] = React.useState<Order[]>([]);
  const user = useAuth();
  const [popupOpen, setPopupOpen] = React.useState<boolean>(false);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!user) return;
    const fetchOrder = async () => {
      const response = await getOrders();

      if (response.orders.length > 0) setOrders(response.orders);
    };
    fetchOrder();
  }, [user]);

  function removeVNTones(str: string) {
    return str
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // xoá dấu
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = removeVNTones(e.target.value);
    const records = orders.filter((item) =>
      removeVNTones(item.orderId.toLocaleLowerCase()).includes(
        query.toLocaleLowerCase()
      )
    );
    setOrders(records);
  };

  const openDeletePopup = (id: string) => {
    setDeleteId(id);
    setPopupOpen(true);
  };

  // const handleDeleteOrder = (currId: string) => {
  //   setOrders(orders.filter((p) => p.id !== currId));
  //   setFilteredOrders(orders.filter((p) => p.id !== currId));
  // };

  const handleSubmit = () => {};
  // const handleSubmit = (newRow: string) => {
  //   setOrders((prev) => {
  //     let updated: OrderItemProps[] = [...prev, newRow];

  //     setFilteredOrders(updated);
  //     return updated;
  //   });
  // };
  return (
    <div className="container mx-auto px-15 pb-10 space-y-6">
      <div className="font-semibold text-3xl">Đơn hàng</div>
      <OrderStatsList data={orderStats} />

      <div className="flex items-center justify-end w-full gap-4">
        <Input
          placeholder="Tìm kiếm đơn hàng..."
          className="max-w-sm rounded-md"
          onChange={handleChange}
        />

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm 
             hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 
             flex items-center gap-2 cursor-pointer"
        >
          <Plus size={18} />
          Thêm đơn hàng
        </button>
        {modalOpen && (
          <ModalOrder
            closeModal={() => {
              setModalOpen(false);
            }}
            onSubmit={handleSubmit}
          />
        )}
      </div>

      {/* table order */}
      <div>
        <OrderTable orders={orders} popup={openDeletePopup} />
        {popupOpen && deleteId && (
          <PopupDelete
            closePopupDelete={() => setPopupOpen(false)}
            deleteButton={() => {
              setPopupOpen(false);
              setDeleteId(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default OrderPage;
