import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";
import Link from "next/link";
import { StepBack } from "lucide-react";
import React from "react";
import { orders, OrderItemProps } from "../../constants/order-data";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import { customerList } from "../../constants/customer-data";

type OrderDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const PopupNotFound = () => {
  return (
    <div className="w-full h-fit">
      <div className="w-full max-w-[1400px] px-4 pb-15 m-auto flex flex-col items-center">
        <div className="w-full max-w-sm relative aspect-square object-cover object-center">
          <Image
            src={"/assets/images/decorations/404.svg"}
            alt="404"
            fill
            className="absolute top-0 left-0 w-full"
          />
        </div>

        <div className="grid items-center text-center max-w-sm">
          <p className="text-sm font-bold">Có lỗi xảy ra</p>
          <p className="text-sm text-muted-foreground">
            Nội dung bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ trước đó
            rồi!
          </p>
        </div>

        <Link href={"/"} className="mt-6">
          <Button>Quay về trang chủ</Button>
        </Link>
      </div>
    </div>
  );
};

export default async function OrderDetailPage({
  params,
}: OrderDetailPageProps) {
  const { id } = await params;
  const data = orders.find((o) => o.id === id) ?? orders[0];
  const customer = customerList.find((c) => c.id === data.customerID);
  if (!data) return redirect("/admin/orders");

  const headerTable = ["Tên sản phẩm", "Giá tiền", "Số lượng", "Tổng tiền"];
  const styleStatus: Record<OrderItemProps["status"], string> = {
    "Chờ xử lý": "bg-yellow-100 text-yellow-700",
    "Đang giao hàng": "bg-blue-100 text-blue-700",
    "Chờ lấy hàng": "bg-indigo-100 text-indigo-700",
    "Thành công": "bg-green-100 text-green-700",
    "Thất bại": "bg-red-100 text-red-700",
    "Đã huỷ": "bg-gray-200 text-gray-700",
  };
  return (
    <div className="box-boder w-full h-screen">
      <div className="container mx-auto px-15 pb-10 space-y-2">
        {/* header */}
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

        <div className="flex justify-between">
          <div>
            <div className="text-2xl flex gap-3">
              <div>
                <b>Đơn hàng</b> <span>#{data.id}</span>
              </div>
              <div
                className={`rounded-md font-medium text-sm px-3 flex justify-center items-center ${
                  styleStatus[data.status]
                }`}
              >
                {data.status}
              </div>
            </div>
            <div className="text-sm text-gray-600">{data.date}</div>
          </div>
          <div>
            <Button className="bg-red-200 text-red-600 hover:bg-red-300/80 rounded-md">
              Xoá đơn hàng
            </Button>
          </div>
        </div>

        {/* main */}
        <div className="grid grid-cols-3 gap-6">
          {/* left */}
          <div className="col-span-2">
            <div className="flex flex-col">
              {/* order detail */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-800">
                    Chi tiết đơn hàng
                  </h2>

                  <Button className="bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg px-4 py-2 text-sm font-medium">
                    Chỉnh sửa
                  </Button>
                </div>

                {/* Table */}
                <div className="overflow-x-auto rounded-lg border border-gray-200">
                  <table className="w-full text-sm text-left">
                    <thead className="bg-gray-100 text-gray-700">
                      <tr>
                        {headerTable.map((name) => (
                          <th
                            key={name}
                            className="px-4 py-3 font-semibold whitespace-nowrap"
                          >
                            {name}
                          </th>
                        ))}
                      </tr>
                    </thead>

                    <tbody className="divide-y">
                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">Cây xanh</td>
                        <td className="px-4 py-3">200.000đ</td>
                        <td className="px-4 py-3">2</td>
                        <td className="px-4 py-3 font-medium">400.000đ</td>
                      </tr>

                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">Cây hoa</td>
                        <td className="px-4 py-3">150.000đ</td>
                        <td className="px-4 py-3">1</td>
                        <td className="px-4 py-3 font-medium">150.000đ</td>
                      </tr>

                      <tr className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3">Dụng cụ làm vườn</td>
                        <td className="px-4 py-3">300.000đ</td>
                        <td className="px-4 py-3">1</td>
                        <td className="px-4 py-3 font-medium">300.000đ</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Total */}
              <div className="w-full border mt-4 p-6 bg-white rounded-lg shadow-sm">
                <div className=" ">
                  <div className="w-full px-5 mx-auto space-y-2 text-sm">
                    <div className="flex justify-between text-base font-semibold text-gray-800 border-b pb-2">
                      <span>Giỏ hàng</span>
                      <span>Giá tiền</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Tạm tính</span>
                      <span>850.000đ</span>
                    </div>

                    <div className="flex justify-between text-gray-600">
                      <span>Phí vận chuyển</span>
                      <span>50.000đ</span>
                    </div>

                    <div className="flex justify-between text-base font-semibold text-gray-800 border-t pt-2">
                      <span>Tổng cộng</span>
                      <span>900.000đ</span>
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
              <h2 className="text-lg font-semibold text-gray-800">
                Thông tin khách hàng
              </h2>

              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 rounded-lg">
                  {/* <AvatarImage src="/assets/avatar/sisa.png" /> */}
                  <AvatarImage src={customer?.avatarUrl} />
                </Avatar>
                <div>
                  <div className="font-medium text-gray-800">
                    {data.customer}
                  </div>
                  <div className="text-sm text-gray-500">
                    Khách hàng: {data.customerID}
                  </div>
                </div>
              </div>

              {/* contact */}
              <div className="space-y-3 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-gray-700">
                    Thông tin liên lạc
                  </h3>
                  <button className="text-blue-600 text-sm font-semibold cursor-pointer py-1 px-2">
                    Thay đổi
                  </button>
                </div>

                <div className="text-sm text-gray-600 space-y-1">
                  <div>Email: {customer?.email}</div>
                  <div>Số điện thoại: {customer?.address}</div>
                </div>
              </div>
            </div>

            {/* shipping detail */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-3">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-800">
                  Địa chỉ giao hàng
                </h2>
                <button className="text-blue-600 text-sm font-semibold cursor-pointer py-1 px-2">
                  Thay đổi
                </button>
              </div>

              <p className="text-sm text-gray-600 leading-relaxed">
                Phường Xuân Khanh, TX. Sơn Tây, Hà Nội
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
