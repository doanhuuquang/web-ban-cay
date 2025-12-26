"use client";
import Link from "next/link";
import {
    Calendar,
    CircleUser,
    ClipboardCheck,
    CreditCard,
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
    Wallet,
} from "lucide-react";
import { getOrderById } from "@/mock/orderMock";
import { useEffect, useState } from "react";
import storeOrder from "@/store/storeOder";
import { OrderStatusType } from "@/lib/type/order-status";
import { formatMoney } from "@/lib/helpers/format-money";
import { Address } from "@/lib/models/address";
import { Payment } from "@/lib/models/payment";
import { getAddressById } from "@/lib/services/address-service";
import { getPaymentById } from "@/lib/services/order-service";
import { getUserProfileById } from "@/lib/services/user-service";
import { User } from "@/lib/models/user";

export default function OrderDetail({ id }: { id: string }) {
    const data = storeOrder((s) => s.orderOne)
    const isLoading = storeOrder((s) => s.loading)

    const [valueAddressId, setValueAddressId] = useState<Address | null>(null)
    const [valuePaymentId, setValuePaymentId] = useState<Payment | null>(null)
    const [valueProfileId, setValueProfileId] = useState<User | null>(null)

    useEffect(() => {
        const fetchProduct = async () => {
            await getOrderById(id);
        };

        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchProduct1 = async () => {
            const res = await getAddressById({ addressId: data?.deliveryAddressId || "" })
            if (res.code !== -1)
                setValueAddressId(res.address);

            const res1 = await getPaymentById(data?.paymentId || "")
            if (res1.code === 1)
                setValuePaymentId(res1.payment);

            const res2 = await getUserProfileById(data?.profileId || "")
            if (res2.code === 1)
                setValueProfileId(res2.account);
        };

        fetchProduct1();
    }, [data]);

    if (isLoading || !valuePaymentId || !valueProfileId)
        return (<div className="text-center">loading...</div>)
    if (!data) return (<div className="text-center">không có dữ liệu</div>)

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
            transition-colors"
                    >
                        <StepBack size={20} />
                        Danh sách đơn hàng
                    </Link>
                </div>

                {/* main */}
                <div className="flex justify-between border px-4 py-5 rounded-xl shadow-md mb-6">
                    <div>
                        <div className="text-2xl flex gap-3">
                            <div>
                                <b>Đơn hàng</b>{" "}
                                <span className="text-blue-600 font-bold">#{data.orderId}</span>
                            </div>
                            <div
                                className={`rounded-xl font-semibold border-2  text-sm px-3 flex justify-center items-center ${styleStatus[data.status]
                                    }`}
                            >
                                {data.orderStatus}
                            </div>
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-5 mt-2">
                            <div className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span>
                                    Ngày đặt: {new Date(data.orderDate).toLocaleString("vi-VN")}
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
                                            {data.orderItemResponses.length > 0 && data.orderItemResponses.map((data, index) => (
                                                <tr
                                                    key={index}
                                                    className="hover:bg-gray-50 transition"
                                                >
                                                    <td className="px-4 py-3">{data.productId}</td>
                                                    <td className="px-4 py-3">{data.orderItemId}</td>
                                                    <td className="px-4 py-3 font-medium">
                                                        {data.price.toLocaleString()} đ
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
                                            <span>{formatMoney(data.totalAmount)}</span>
                                        </div>

                                        <div className="flex justify-between border-b py-2 mb-5 text-gray-600">
                                            <span className="flex items-center gap-2">
                                                <Truck className="w-5 h-5" /> Phí vận chuyển
                                            </span>
                                            <span>{formatMoney(data.shippingFee)}</span>
                                        </div>

                                        <div className="flex justify-between border-b pb-2 mb-5 text-gray-600">
                                            <span className="flex items-center gap-2">
                                                <Tag className="w-5 h-5 text-orange-600" /> Giảm giá
                                            </span>
                                            <span className="text-red-600">{formatMoney(data.discountAmount)}</span>
                                        </div>

                                        <div className="flex justify-between text-2xl pt-5">
                                            <span>Tổng cộng</span>
                                            <span className="text-green-700">{formatMoney(data.totalAmount)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>


                            {/* Payment */}
                            <div className="w-full border mt-4 p-6 bg-white rounded-lg shadow-sm">
                                <div className="w-full px-3 mx-auto">
                                    <h1 className="flex items-center gap-2 font-semibold text-2xl w-full pb-5">
                                        <Receipt className="w-6 h-6" />
                                        Tình trạng thanh toán
                                    </h1>

                                    <div className="font-semibold space-y-2 text-gray-600">

                                        <div className="flex justify-between border-b py-2 mb-2">
                                            <span className="flex items-center gap-2">
                                                <ReceiptText className="w-5 h-5" /> Phương thức thanh toán
                                            </span>
                                            <span>{valuePaymentId?.paymentMethod || "—"}</span>
                                        </div>

                                        <div className="flex justify-between border-b py-2 mb-2">
                                            <span className="flex items-center gap-2">
                                                <Truck className="w-5 h-5" /> Trạng thái thanh toán
                                            </span>
                                            <span>{valuePaymentId?.paymentStatus || "—"}</span>
                                        </div>

                                        <div className="flex justify-between border-b py-2 mb-2">
                                            <span className="flex items-center gap-2">
                                                <ClipboardCheck className="w-5 h-5" /> Trạng thái giao dịch
                                            </span>
                                            <span>{valuePaymentId?.status || "—"}</span>
                                        </div>

                                        <div className="flex justify-between border-b py-2 mb-2">
                                            <span className="flex items-center gap-2">
                                                <Wallet className="w-5 h-5" /> Số tiền
                                            </span>
                                            <span>{formatMoney(Number(valuePaymentId?.amount))}</span>
                                        </div>

                                        <div className="flex justify-between border-b py-2 mb-2">
                                            <span className="flex items-center gap-2">
                                                <Tag className="w-5 h-5" /> Mã giao dịch
                                            </span>
                                            <span>{valuePaymentId?.vnpTxnRef || "—"}</span>
                                        </div>

                                        <div className="flex justify-between border-b py-2 mb-2">
                                            <span className="flex items-center gap-2">
                                                <Calendar className="w-5 h-5" /> Ngày tạo giao dịch
                                            </span>
                                            <span>
                                                {valuePaymentId?.paymentDate
                                                    ? new Date(valuePaymentId.paymentDate).toLocaleString("vi-VN")
                                                    : "—"}
                                            </span>
                                        </div>

                                        <div className="flex justify-between border-b py-2 mb-2">
                                            <span className="flex items-center gap-2">
                                                <CreditCard className="w-5 h-5" /> Loại thẻ
                                            </span>
                                            <span>{valuePaymentId?.cardType || "—"}</span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    {/* right */}
                    <div className="col-span-1 space-y-6">
                        {/* valueProfileId detail */}
                        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
                            <h2 className="flex items-center gap-1 text-lg font-semibold text-gray-800">
                                <CircleUser className="w-5 h-5" />
                                Thông tin khách hàng
                            </h2>

                            <div className="flex items-center gap-4">
                                {/* <Avatar className="h-20 w-20 rounded-xl">
                                    <AvatarImage src={valueProfileId?.avatarUrl} />
                                </Avatar> */}
                                <div className="space-y-1">
                                    <div className="font-medium text-xl text-gray-800">
                                        <h2>{valueProfileId.userProfile?.username}</h2>
                                    </div>
                                    <div className="text-sm text-gray-500">
                                        Mã khách hàng:{" "}
                                        <span className="font-semibold text-blue-700">
                                            #{data.profileId}
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
                                </div>

                                <div className="text-sm text-gray-600 space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="p-3 bg-blue-100 rounded-md">
                                            <Mail className="w-5 h-5 text-blue-600" />
                                        </div>
                                        <div className="flex flex-col gap-1">
                                            <p className="text-gray-500 text-[0.8rem]">Email</p>
                                            <p className="font-semibold text-md">{valueProfileId?.email}</p>
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
                                                {valueProfileId.userProfile?.mobileNumber}
                                            </p>
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
                                </div>

                                <div className="bg-gray-50 border border-green-300 p-4 rounded-xl flex items-center gap-2">
                                    <div className="p-3 bg-green-600 rounded-md">
                                        <MapPin className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex flex-col gap-1">
                                        <p className="font-semibold ">Địa chỉ giao hàng</p>
                                        <p className="font-medium text-sm">{valueAddressId?.shortAddress}</p>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3">
                                            <Phone className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                số điện thoại
                                            </p>
                                            <p className="text-gray-900 font-bold">{valueAddressId?.phone}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
                                    <div className="flex items-center gap-3">
                                        <div className="p-3">
                                            <Truck className="w-6 h-6 text-blue-600" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-gray-600">
                                                Ngày đặt hàng
                                            </p>
                                            <p className="text-gray-900 font-bold">{valueAddressId?.createdAt
                                                ? new Date(valueAddressId.createdAt).toLocaleDateString("vi-VN")
                                                : ""}</p>
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
                                            <p className="text-gray-900 font-bold">#{data.deliveryAddressId}</p>
                                        </div>
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

const styleStatus: Record<OrderStatusType, string> = {
    PENDING: "bg-yellow-100 text-yellow-700 border-yellow-300",
    SHIPPED: "bg-blue-100 text-blue-700 border-blue-300",
    DELIVERED: "bg-green-100 text-green-700 border-green-300",
    RETURNED: "bg-red-100 text-red-700 border-red-300",
    CANCELLED: "bg-gray-200 text-gray-700 border-gray-300",
};

const headerTitleTable = [
    "Mã sản phẩm",
    "Tên sản phẩm",
    "Đơn giá",
    "Số lượng",
];

