import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import {
  BadgeX,
  Calendar,
  CircleUser,
  Clock,
  FileText,
  Mail,
  MapPin,
  Phone,
  Receipt,
  ReceiptText,
  ShoppingBasket,
  ShoppingCart,
  StepBack,
  Tag,
  Truck,
} from "lucide-react";
import React from "react";
import { orders, OrderItemProps } from "../../constants/order-data";
import { redirect } from "next/navigation";
import { customerList } from "../../constants/customer-data";

type OrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const data = orders.find((o) => o.id === id) ?? orders[0];
  const customer = customerList.find((c) => c.id === data.customerID);
  if (!data) return redirect("/admin/orders");

  const headerTitleTable = [
    "Mã sản phẩm",
    "Tên sản phẩm",
    "Đơn giá",
    "Số lượng",
  ];

  const fakeDataOrder = [
    {
      productCode: "SP001",
      productName: "Cây kim tiền để bàn",
      unitPrice: 180000,
      quantity: 1,
    },
    {
      productCode: "SP002",
      productName: "Bình tưới cây cầm tay 2L",
      unitPrice: 95000,
      quantity: 2,
    },
    {
      productCode: "SP003",
      productName: "Phân bón hữu cơ cho cây cảnh",
      unitPrice: 120000,
      quantity: 1,
    },
  ];
  const styleStatus: Record<OrderItemProps["status"], string> = {
    "Chờ xử lý": "bg-yellow-100 text-yellow-700 border-yellow-300",
    "Đang giao hàng": "bg-blue-100 text-blue-700 border-blue-300",
    "Chờ lấy hàng": "bg-indigo-100 text-indigo-700 border-indigo-300",
    "Thành công": "bg-green-100 text-green-700 border-green-300",
    "Thất bại": "bg-red-100 text-red-700 border-red-300",
    "Đã huỷ": "bg-gray-200 text-gray-700 border-gray-300",
  };
  return (
    <div className="box-boder w-full h-screen">
      <div className="container mx-auto px-15 pb-10 space-y-4">
        {/* header */}
        <div className="flex items-center justify-between">
          <Link
            href="/admin/orders"
            className="
            inline-flex items-center gap-2
            px-4 py-2
            bg-green-600 text-white
            rounded-lg
            text-sm font-medium
            shadow-sm
            hover:bg-green-700
            transition-colors
          "
          >
            <StepBack size={20} />
            Danh sách đơn hàng
          </Link>
          <div>
            {data.status === "Thành công" ? (
              <Button
                disabled
                className="bg-red-200 text-red-600 border-2 border-red-200 hover:bg-red-300/80 rounded-md"
              >
                <BadgeX className="w-4 h-4" />
                Huỷ đơn hàng
              </Button>
            ) : (
              <Button className="bg-red-200 text-red-600 border-2 border-red-600 hover:bg-red-300/80 rounded-md">
                <BadgeX className="w-4 h-4" />
                Huỷ đơn hàng
              </Button>
            )}
          </div>
        </div>

        {/* main */}
        <div className="flex justify-between border px-4 py-5 rounded-xl shadow-md mb-6">
          <div>
            <div className="text-2xl flex gap-3">
              <div>
                <b>Đơn hàng</b>{" "}
                <span className="text-blue-600 font-bold">#{data.id}</span>
              </div>
              <div
                className={`rounded-xl font-semibold border-2  text-sm px-3 flex justify-center items-center ${
                  styleStatus[data.status]
                }`}
              >
                {data.status}
              </div>
            </div>
            <div className="text-sm text-gray-600 flex items-center gap-5 mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  Ngày đặt: {new Date(data.date).toLocaleString("vi-VN")}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                <span>
                  Cập nhật: {new Date(data.date).toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {/* left */}
          <div className="col-span-2">
            <div className="flex flex-col">
              {/* order detail */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="flex items-center gap-2 ">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="text-lg font-semibold text-gray-800">
                      Sản phẩm đã đặt
                    </span>
                  </h2>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        {headerTitleTable.map((name) => (
                          <th
                            key={name}
                            className="px-4 py-3 font-semibold whitespace-nowrap"
                          >
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y ">
                      {fakeDataOrder.map((data) => (
                        <tr
                          key={data.productCode}
                          className="hover:bg-gray-50 transition"
                        >
                          <td className="px-4 py-3">{data.productCode}</td>
                          <td className="px-4 py-3">{data.productName}</td>
                          <td className="px-4 py-3 font-medium">
                            {data.unitPrice.toLocaleString()} đ
                          </td>
                          <td className="px-4 py-3 font-medium">
                            {data.quantity.toLocaleString()}{" "}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment */}
              <div className="w-full border mt-4 p-6 bg-white rounded-lg shadow-sm">
                <div className="w-full px-3 mx-auto">
                  <h1 className="flex items-center gap-2 font-semibold text-2xl w-full pb-5 ">
                    <Receipt className="w-6 h-6" />
                    Thanh toán
                  </h1>
                  <div className="font-semibold space-y-2">
                    <div className="flex justify-between text-base mb-5 text-gray-800 border-b pb-2">
                      <span className="flex items-center gap-2">
                        <ShoppingBasket className="w-5 h-5" /> Giỏ hàng
                      </span>
                      <span>Số tiền</span>
                    </div>

                    <div className="flex justify-between border-b py-2 mb-5 text-gray-600">
                      <span className="flex items-center gap-2">
                        <ReceiptText className="w-5 h-5" /> Tạm tính
                      </span>
                      <span>850.000đ</span>
                    </div>

                    <div className="flex justify-between border-b py-2 mb-5 text-gray-600">
                      <span className="flex items-center gap-2">
                        <Truck className="w-5 h-5" /> Phí vận chuyển
                      </span>
                      <span>+ 50.000đ </span>
                    </div>

                    <div className="flex justify-between border-b pb-2 mb-5 text-gray-600">
                      <span className="flex items-center gap-2">
                        <Tag className="w-5 h-5 text-orange-600" /> Giảm giá
                      </span>
                      <span className="text-red-600">- 50.000đ </span>
                    </div>

                    <div className="flex justify-between text-2xl pt-5">
                      <span>Tổng cộng</span>
                      <span className="text-green-700">850.000đ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* right */}
          <div className="col-span-1 space-y-6">
            {/* customer detail */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
              <h2 className="flex items-center gap-1 text-lg font-semibold text-gray-800">
                <CircleUser className="w-5 h-5" />
                Thông tin khách hàng
              </h2>

              <div className="flex items-center gap-4">
                <Avatar className="h-20 w-20 rounded-xl">
                  {/* <AvatarImage src="/assets/avatar/sisa.png" /> */}
                  <AvatarImage src={customer?.avatarUrl} />
                </Avatar>
                <div className="space-y-1">
                  <div className="font-medium text-xl text-gray-800">
                    {data.customer}
                  </div>
                  <div className="text-sm text-gray-500">
                    Mã khách hàng:{" "}
                    <span className="font-semibold text-blue-700">
                      #{data.customerID}
                    </span>
                  </div>
                </div>
              </div>

              {/* contact */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-gray-700">
                    Thông tin liên lạc
                  </h3>
                  {/* <button className="text-blue-600 text-sm font-semibold cursor-pointer py-1 px-2">
                    Thay đổi
                  </button> */}
                </div>

                <div className="text-sm text-gray-600 space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-3 bg-blue-100 rounded-md">
                      <Mail className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-500 text-[0.8rem]">Email</p>
                      <p className="font-semibold text-md">{customer?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="p-3 bg-green-100 rounded-md">
                      <Phone className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className="text-gray-500 text-[0.8rem]">
                        Số điện thoại
                      </p>
                      <p className="font-semibold text-md">
                        {customer?.phoneNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* shipping detail */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Thông tin giao hàng
                </h2>
                {/* <button className="text-blue-600 text-sm font-semibold cursor-pointer py-1 px-2">
                  Thay đổi
                </button> */}
              </div>

              <div className="bg-gray-50 border border-green-300 p-4 rounded-xl flex items-center gap-2">
                <div className="p-3 bg-green-600 rounded-md">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold ">Địa chỉ giao hàng</p>
                  <p className="font-medium text-sm">{customer?.address}</p>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-3">
                    <Truck className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Phương thức vận chuyển
                    </p>
                    <p className="text-gray-900 font-bold">Giao hàng nhanh</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-3">
                    <FileText className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Mã vận đơn</p>
                    <p className="text-gray-900 font-bold">#ababab</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
