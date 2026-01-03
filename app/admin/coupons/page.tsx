"use client";

import * as React from "react";
import {
    Unlock,
    Edit,
    Trash,
    Tag,
} from "lucide-react";

import { Input } from "@/components/ui/input";

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
import { getAllCouponsMock, getAvailableCouponsByDateEnd, getAvailableCouponsByPriceMock, getAvailableCouponsMock } from "@/mock/couponsMock";
import storeCoupon from "@/store/storeCoupons";
import CreateCouponModal from "./CreateCouponModal";
import { DeleteCouponModal } from "./deleteCouponModal";
import { Coupon } from "@/lib/models/coupon";
import UpdateCouponModal from "./updateCouponModal";

function OrderTable({ sort }: { sort: string }) {
    //data
    const isLoading = storeCoupon((s) => s.loading);
    const currentPageRows = storeCoupon((s) => s.couponsAll);

    //modal
    const [openModalDeleteCoupon, setOpenModalDeleteCoupon] = React.useState<boolean>(false);
    const [openModalUpdateCoupon, setOpenModalUpdateCoupon] = React.useState<boolean>(false);
    const [selectItemCoupon, setSelectItemCoupon] = React.useState<Coupon | null>(null);

    if (isLoading) return <div className="text-center">loading...</div>;

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
                            <th className="px-4 py-3">code</th>
                            <th className="px-4 py-3">loại</th>
                            <th className="px-4 py-3">giảm</th>
                            <th className="px-4 py-3">giảm tối đa</th>
                            <th className="px-4 py-3">đơn tối thiểu</th>
                            <th className="px-4 py-3">ngày bắt đầu</th>
                            <th className="px-4 py-3">ngày kết thúc</th>
                            <th className="px-4 py-3">kích hoạt</th>
                            <th className="px-4 py-3">cài đặt</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(sort === "ASC" ? currentPageRows : currentPageRows.slice().reverse()).map((row) => {
                            return (
                                <tr
                                    key={row.couponId}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{row.couponId}</td>
                                    <td className="px-4 py-3">{row.code ?? "VNPay"}</td>
                                    <td className="px-4 py-3">{row.discountType === "PERCENTAGE" ? "%" : "₫"}</td>
                                    <td className="px-4 py-3">{row.discountPercent ? `${row.discountPercent}%` : formatMoney(row.discountAmount)}</td>
                                    <td className="px-4 py-3">{formatMoney(row.maxDiscountAmount)}</td>
                                    <td className="px-4 py-3">{formatMoney(row.minOrderValue)}</td>
                                    <td className="px-4 py-3">{row.startDate ? new Date(row.startDate).toLocaleDateString("vi-VN") : ""}</td>
                                    <td className="px-4 py-3">{row.expiryDate ? new Date(row.expiryDate).toLocaleDateString("vi-VN") : ""}</td>
                                    <td className="px-4 py-3">
                                        {row.enabled &&
                                            (
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <Unlock className="size-5 " />
                                                    </TooltipTrigger>
                                                    <TooltipContent>
                                                        <p>đã kích hoạt</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            )}
                                    </td>

                                    <td className="px-4 py-3 flex gap-x-2">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectItemCoupon(row);
                                                    setOpenModalUpdateCoupon(true)
                                                }}>
                                                    <Edit className="size-5 " />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>chỉnh sửa</p>
                                            </TooltipContent>
                                        </Tooltip>

                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" onClick={(e) => {
                                                    e.preventDefault();
                                                    setSelectItemCoupon(row);
                                                    setOpenModalDeleteCoupon(true)
                                                }}>
                                                    <Trash className="size-5 text-red-600" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent>
                                                <p>xóa</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {openModalDeleteCoupon && <DeleteCouponModal
                initialData={selectItemCoupon}
                closeModal={() => setOpenModalDeleteCoupon(false)} />}

            {openModalUpdateCoupon && <UpdateCouponModal
                initialData={selectItemCoupon}
                onClose={() => setOpenModalUpdateCoupon(false)} />}
        </div>
    );
}

const OrderPage = () => {
    const [selectedTypeCoupons, setSelectedTypeCoupons] = React.useState<string>("available");
    const [selectedSort, setSelectedSort] = React.useState<string>("DESC");
    const [valueFindCouponsByPrice, setFindCouponsByPrice] = React.useState<number>();
    const [openModalCreateCoupon, setOpenModalCreateCoupon] = React.useState<boolean>(false);

    const [to, setTo] = React.useState("");

    const handlerResetDate = async () => {
        setTo("");
        setSelectedTypeCoupons("available");
        getAvailableCouponsMock();
    };

    const handlerSearchDate = async () => {
        if (!to) return;
        setSelectedTypeCoupons("available");
        await getAvailableCouponsByDateEnd(to);
    };

    React.useEffect(() => {

        const timeout = setTimeout(() => {
            setSelectedTypeCoupons("available");
            const fetchFindCouponsByPrice = async () => {
                if (!valueFindCouponsByPrice) await getAvailableCouponsMock();
                else await getAvailableCouponsByPriceMock(valueFindCouponsByPrice);
            };
            fetchFindCouponsByPrice();
        }, 300);

        return ()=>clearTimeout(timeout);

    }, [valueFindCouponsByPrice]);


    React.useEffect(() => {
        const feachAllAvailableCoupons = async () => {
            await getAvailableCouponsMock();
        };

        feachAllAvailableCoupons();
    }, []);


    React.useEffect(() => {
        const feachTypeCoupons = async () => {
            if (!selectedTypeCoupons) return;
            if (selectedTypeCoupons === "all") await getAllCouponsMock();
            else await getAvailableCouponsMock();
        };
        feachTypeCoupons();
    }, [selectedTypeCoupons]);

    return (
        <div className="container mx-auto px-15 pb-10 space-y-6">
            <div className="font-semibold text-3xl">Mã giảm giá</div>

            <div className="flex items-center justify-between w-full gap-4">
                <div className="flex items-center gap-4">
                    <Input
                        type="number"
                        placeholder="Mã giảm giá khả dụng"
                        className="max-w-sm rounded-md"
                        value={valueFindCouponsByPrice}
                        onChange={(e) => setFindCouponsByPrice(Number(e.target.value))}
                    />
                </div>

                <div className="flex gap-x-2">
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

                    <Select value={selectedTypeCoupons}
                        onValueChange={(value) => setSelectedTypeCoupons(value)}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="trạng thái mã giảm giá" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Trạng thái đơn hàng</SelectLabel>
                                <SelectItem value="available">còn hoạt động</SelectItem>
                                <SelectItem value="all">Tất cả</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>

            <div className="flex justify-between">
                <Button onClick={(e) => {
                    e.preventDefault()
                    setOpenModalCreateCoupon(true)
                    console.log(openModalCreateCoupon)
                }}
                    className="rounded-md"><Tag></Tag>Thêm mã giảm giá</Button>
                <div className="flex gap-4 items-baseline">
                    <label>lọc theo thời gian còn hoạt động</label>

                    <div className="flex flex-col">
                        <input
                            type="date"
                            className="border rounded px-2 py-1"
                            value={to}
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
                <OrderTable sort={selectedSort} />
            </div>
            {openModalCreateCoupon && <CreateCouponModal onClose={() => setOpenModalCreateCoupon(false)} />}
        </div>
    );
};

export default OrderPage;
