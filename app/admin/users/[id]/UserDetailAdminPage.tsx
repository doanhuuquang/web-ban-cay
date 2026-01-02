"use client";
import { User as UserX } from "@/lib/models/user";
import { getUserProfileById } from "@/lib/services/user-service";
import {
    User,
    Mail,
    Lock,
    MapPin,
    ShoppingCart,
    Package,
    Calendar,
    Phone,
    Home,
    Briefcase,
    Users,
    ShieldBan,
} from "lucide-react";
import { useEffect, useState } from "react";

const UserDetailAdminPage = ({ id }: { id: string }) => {

    const [accountData, setAccountData] = useState<UserX | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true)

            const res = await getUserProfileById(id);
            if (res.code === 1)
                setAccountData(res.account);
            setIsLoading(false)
        };

        fetchData();
    }, [id])

    if (isLoading) return (<div className="text-center">Loading...</div>)
    if (!accountData) return (<div className="text-center">Không có dữ liệu</div>)

    return (
        <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <div className="w-full bg-white shadow-lg">
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-linear-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
                                <User className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-800">
                                    Tài Khoản #{accountData.id}
                                </h1>
                                <p className="text-gray-500 text-sm mt-1">
                                    {accountData.email}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <div className="text-right mr-4">
                                <p className="text-xs text-gray-500">Vai trò</p>
                                <p className="font-semibold text-gray-700">
                                    {accountData.roles[0].roleName}
                                </p>
                            </div>
                            <span
                                className={`px-4 py-2 rounded-full text-sm font-semibold ${accountData.enabled
                                    ? "bg-green-100 text-green-700"
                                    : "bg-red-100 text-red-700"
                                    }`}
                            >
                                {accountData.enabled ? "✓ Đã Kích Hoạt" : "✗ Chưa Kích Hoạt"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex gap-6">
                    {/* Left Sidebar */}
                    <div className="w-[65%] space-y-6">
                        {/* Thông Tin Tài Khoản */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                <User className="w-6 h-6 mr-2 text-blue-600" />
                                Thông Tin Tài Khoản
                            </h2>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Email */}
                                <div className="bg-linear-to-br from-blue-50 to-blue-100 p-4 rounded-xl">
                                    <div className="flex items-center mb-2">
                                        <Mail className="w-4 h-4 text-blue-600 mr-2" />
                                        <span className="font-semibold text-gray-700 text-sm">
                                            Email
                                        </span>
                                    </div>
                                    <p className="text-gray-800">{accountData.email}</p>
                                </div>

                                {/* Status */}
                                <div className="bg-linear-to-br from-purple-50 to-purple-100 p-4 rounded-xl">
                                    <div className="flex items-center mb-2">
                                        <Lock className="w-4 h-4 text-purple-600 mr-2" />
                                        <span className="font-semibold text-gray-700 text-sm">
                                            Trạng Thái
                                        </span>
                                    </div>
                                    <p className="text-gray-800 font-medium">
                                        {accountData.enabled ? "Đang hoạt động" : "Bị khóa"}
                                    </p>
                                </div>

                                {/* Role */}
                                <div className="bg-linear-to-br from-indigo-50 to-blue-50 p-4 rounded-xl">
                                    <div className="flex items-center mb-2">
                                        <Users className="w-4 h-4 text-indigo-600 mr-2" />
                                        <span className="font-semibold text-gray-700 text-sm">
                                            Vai trò
                                        </span>
                                    </div>
                                    <p className="text-gray-700 text-sm">
                                        <span className="font-medium">
                                            {accountData.roles[0].roleName}
                                        </span>{" "}
                                        - {accountData.roles[0].description}
                                    </p>
                                </div>

                                {/* Lock at */}
                                <div className=" bg-linear-to-br from-yellow-100 to-yellow-50 p-4 rounded-xl">
                                    <div className="flex items-center mb-2">
                                        <Calendar className="w-4 h-4 text-yellow-600 mr-2" />
                                        <span className="font-semibold text-gray-700 text-sm">
                                            Thời điểm khoá tài khoản
                                        </span>
                                    </div>
                                    <p className="text-gray-800 text-xs">
                                        {accountData.lockedAt ? formatDate(accountData.lockedAt.toString()) : ""}
                                    </p>
                                </div>

                                {/* Profile */}
                                <div className="bg-linear-to-br from-green-50 to-green-100 p-4 rounded-xl">
                                    <div className="flex items-center mb-2">
                                        <User className="w-4 h-4 text-green-600 mr-2" />
                                        <span className="font-semibold text-gray-700 text-sm">
                                            Profile
                                        </span>
                                    </div>
                                    <div className="">
                                        <div className="text-gray-800 space-x-2">
                                            <span className="font-semibold">Profile ID:</span>
                                            <span className="">
                                                #{accountData.userProfile?.profileId ?? ""}
                                            </span>
                                        </div>
                                        <div className="text-gray-800 space-x-2">
                                            <span className="font-semibold">Tên người dùng:</span>
                                            <span className="">
                                                {accountData.userProfile?.username ?? ""}
                                            </span>
                                        </div>
                                        <div className="text-gray-800 space-x-2">
                                            <span className="font-semibold">Số điện thoại:</span>
                                            <span className="">
                                                {accountData.userProfile?.mobileNumber ?? ""}
                                            </span>
                                        </div>
                                        <div className="text-gray-800 space-x-2">
                                            <span className="font-semibold">Giới tính:</span>
                                            <span className="">{accountData.userProfile?.gender ?? ""}</span>
                                        </div>
                                        <div className="text-gray-800 space-x-2">
                                            <span className="font-semibold">Ngày sinh:</span>
                                            <span className="">
                                                {accountData.userProfile?.birthDate
                                                    ? new Date(accountData.userProfile.birthDate).toLocaleDateString("vi-VN")
                                                    : ""}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Lock Reason */}
                                <div className="bg-linear-to-r from-red-100 to-purple-50 p-4 rounded-xl ">
                                    <div className="flex items-center mb-2">
                                        <ShieldBan className="w-4 h-4 text-red-600 mr-2" />
                                        <span className="font-semibold text-gray-700 text-sm">
                                            Lý do khoá
                                        </span>
                                    </div>
                                    <p className="text-gray-800 text-xs break-all whitespace-normal ">
                                        {accountData.lockedReason}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Giỏ Hàng */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                    <ShoppingCart className="w-6 h-6 mr-2 text-blue-600" />
                                    Giỏ Hàng ({accountData.userProfile?.cartResponse.items.length})
                                </h2>
                                <span className="text-gray-500 text-sm">
                                    Cart ID: #{accountData.userProfile?.cartResponse.cartId}
                                </span>
                            </div>

                            <div className="space-y-3 max-h-[500px] overflow-y-auto">
                                {accountData.userProfile?.cartResponse.items.map((item) => (
                                    <div
                                        key={item.cartItemId}
                                        className="bg-linear-to-r from-white to-gray-50 rounded-xl p-4 border border-gray-200 hover:border-blue-300 transition-all"
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3 flex-1">
                                                <div className="w-12 h-12 bg-linear-to-br from-blue-400 to-indigo-500 rounded-lg flex items-center justify-center shrink-0">
                                                    <Package className="w-6 h-6 text-white" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-800">
                                                        {item.productName}
                                                    </h3>
                                                    <p className="text-gray-500 text-xs">
                                                        Product ID: #{item.productId}
                                                    </p>
                                                    <p className=" font-semibold text-sm mt-1">
                                                        Đơn giá:{" "}
                                                        <span className="text-blue-600">
                                                            {formatPrice(item.unitPrice)}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="text-right ml-4">
                                                <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold mb-1">
                                                    Số lượng: {item.quantity}
                                                </div>
                                                <p className="text-lg font-bold text-gray-800">
                                                    {formatPrice(item.totalPrice)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="w-[35%] space-y-6">
                        {/* Tổng Giỏ Hàng */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-lg font-semibold">Tổng Giỏ Hàng</h3>
                                    <ShoppingCart className="w-8 h-8 text-blue-800" />
                                </div>
                                <div className="bg-blue-100/80 backdrop-blur-sm rounded-xl p-4 mb-3">
                                    <p className=" text-sm mb-1">Tổng sản phẩm</p>
                                    <p className="text-2xl font-bold">
                                        {accountData.userProfile?.cartResponse.items.length}
                                    </p>
                                </div>
                                <div className="bg-blue-100/80 backdrop-blur-sm rounded-xl p-4">
                                    <p className=" text-sm mb-1">Tổng thanh toán</p>
                                    <p className="text-3xl font-bold">
                                        {accountData.userProfile?.cartResponse.totalPrice ? formatPrice(
                                            accountData.userProfile.cartResponse.totalPrice
                                        ) : ""}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Địa Chỉ Giao Hàng */}
                        <div className="bg-white rounded-2xl shadow-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-800 flex items-center">
                                    <MapPin className="w-6 h-6 mr-2 text-blue-600" />
                                    Địa Chỉ
                                </h2>
                                {accountData.userProfile?.addressResponse?.[0]?.isDefault && (
                                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
                                        Mặc Định
                                    </span>
                                )}
                            </div>

                            {accountData.userProfile?.addressResponse.map((address) => (
                                <div key={address.addressId} className="space-y-3">
                                    <div className="flex items-center space-x-3">
                                        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
                                            {address.type === "WORK" ? (
                                                <Briefcase className="w-5 h-5 text-white" />
                                            ) : (
                                                <Home className="w-5 h-5 text-white" />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-gray-800">
                                                {address.fullName}
                                            </h3>
                                            <span className="text-xs text-gray-500">
                                                {address.label} ({address.type})
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                                        <div className="flex items-center">
                                            <Phone className="w-3 h-3 text-gray-500 mr-2" />
                                            <span className="text-gray-700 text-sm">
                                                {address.phone}
                                            </span>
                                        </div>

                                        <div className="flex items-start">
                                            <MapPin className="w-3 h-3 text-gray-500 mr-2 mt-1" />
                                            <div>
                                                <p className="text-gray-700 font-medium text-sm">
                                                    {address.street}
                                                </p>
                                                <p className="text-gray-600 text-xs mt-1">
                                                    {address.ward}, {address.district}, {address.province}
                                                </p>
                                                <p className="text-gray-500 text-xs mt-1">
                                                    Mã: {address.postalCode}
                                                </p>
                                            </div>
                                        </div>

                                        {address.additionalInfo && (
                                            <div className="bg-blue-50 p-2 rounded-lg">
                                                <p className="text-xs text-gray-700">
                                                    <span className="font-semibold">Ghi chú:</span>{" "}
                                                    {address.additionalInfo}
                                                </p>
                                            </div>
                                        )}

                                        <div className="text-xs text-gray-500 pt-2 border-t">
                                            Tạo: {address.createdAt ? formatDate(address.createdAt) : ""}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDetailAdminPage;


const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
    }).format(price);
};

const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
};