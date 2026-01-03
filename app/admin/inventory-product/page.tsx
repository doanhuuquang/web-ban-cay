
"use client";

import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Inventory } from "@/lib/models/inventory";
import { getInventoryLowStock, getInventoryOutOfStock, getInventoryUpdateStock } from "@/lib/services/inventory-service";
import { Input } from "@/components/ui/input";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";
import { toast } from "sonner";


function OrderTable({ sort, isloading, currentPageRows }: { sort: string, isloading: boolean, currentPageRows: Inventory[] }) {

    const [inventoryCount, setInventoryCount] = React.useState<Inventory | null>(null);
    const [modalOpenUpdateInvenCou, setModalOpenUpdateInvenCou] = React.useState<boolean>(false);

    if (isloading) return <div className="text-center">loading...</div>;

    if (!currentPageRows || currentPageRows.length <= 0)
        return <div className="text-center">Không có dữ liệu</div>;

    return (
        <div className="space-y-4">
            {/* table */}
            <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm h-150">
                <table className="w-full border-collapse text-left text-sm">
                    <thead className="bg-gray-100 border-b">
                        <tr className="font-semibold text-gray-700">
                            <th className="px-4 py-3">id kho</th>
                            <th className="px-4 py-3">id sản phẩm</th>
                            <th className="px-4 py-3">có sẵn</th>
                            <th className="px-4 py-3">để dành</th>
                            <th className="px-4 py-3">tg chỉnh sửa</th>
                            <th className="px-4 py-3">cập nhật</th>
                        </tr>
                    </thead>

                    <tbody>
                        {(sort === "ASC" ? currentPageRows : currentPageRows.slice().reverse()).map((row, index) => {
                            return (
                                <tr
                                    key={index}
                                    className="border-b hover:bg-gray-50 transition"
                                >
                                    <td className="px-4 py-3">{row.inventoryId}</td>
                                    <td className="px-4 py-3">{row.productId}</td>
                                    <td className="px-4 py-3">{row.available}</td>
                                    <td className="px-4 py-3">{row.reserved}</td>
                                    <td className="px-4 py-3">{new Date(row.updatedAt).toLocaleDateString("vi-VN")}</td>
                                    <td className="px-4 py-3">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setInventoryCount(row)
                                                        setModalOpenUpdateInvenCou(true)
                                                    }}
                                                    size={"icon"}
                                                    variant="ghost"
                                                >
                                                    <SquarePen className="size-5 " />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent className="bg-black text-white p-1.5 rounded-xl">
                                                <p>cập nhật số lượng</p>
                                            </TooltipContent>
                                        </Tooltip>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
            {modalOpenUpdateInvenCou &&
                (<EditCategoryModal closeModal={() => setModalOpenUpdateInvenCou(false)} initialData={inventoryCount}>
                </EditCategoryModal>)}
        </div>
    );
}

const OrderPage = () => {
    //sort
    const [selectedSort, setSelectedSort] = React.useState<string>("DESC");

    //filter
    const [filterCount, setFilterCount] = React.useState<string>("outOfStock");
    const [quantity, setQuantity] = React.useState<number>(1000);

    //data
    const [isLoading, setIsloading] = React.useState<boolean>(false);
    const [dataInventory, setDataInventory] = React.useState<Inventory[]>([])

    React.useEffect(() => {
        const fetchData = async () => {
            setIsloading(true)
            if (filterCount === "outOfStock") {
                const res = await getInventoryOutOfStock();
                if (res.code === 1)
                    setDataInventory(res.data);
            }
            else {
                const res = await getInventoryLowStock(quantity);
                if (res.code === 1)
                    setDataInventory(res.data);
            }

            setIsloading(false);
        }
        fetchData();
    }, [filterCount, quantity])

    return (
        <div className="container mx-auto px-15 pb-10 space-y-6">
            <div className="font-semibold text-3xl">Thông tin tồn kho</div>

            <div className="flex items-center justify-between w-full gap-4">
                <div className="flex gap-x-3">
                    <Select
                        value={filterCount}
                        onValueChange={(value) => setFilterCount(value)}
                    >
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Sắp xếp theo..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={"outOfStock"}>đã hết hàng</SelectItem>
                                <SelectItem value={"lowStock"}>sắp hết hàng</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                    {filterCount === "lowStock" &&
                        (<div className="flex items-baseline gap-x-2.5">
                            <span>trừ đi</span>
                            <div><Input type="number" placeholder="nhập số lượng"
                                value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}></Input></div></div>
                        )}
                </div>


                <div className="flex gap-x-2 items-baseline">
                    <Select
                        value={selectedSort}
                        onValueChange={(value) => setSelectedSort(value)}
                    >
                        <SelectTrigger className="w-[140px]">
                            <SelectValue placeholder="Sắp xếp theo..." />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value={"DESC"}>Mới nhất</SelectItem>
                                <SelectItem value={"ASC"}>Cũ nhất</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

            </div>

            {/* table order */}
            <div>
                <OrderTable sort={selectedSort} isloading={isLoading} currentPageRows={dataInventory} />
            </div>
        </div>
    );
};

export default OrderPage;

//modal
function EditCategoryModal({ closeModal, initialData }: { closeModal: () => void, initialData: Inventory | null }) {

    const [formState, setFormState] = React.useState<{ productId: string, newAvailability: number }>({ productId: initialData?.productId ?? "", newAvailability: initialData?.available ?? 0 });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: Number(e.target.value),
        });
    };


    const handleSubmit = async () => {
        if (!formState) return;
        const res = await getInventoryUpdateStock(formState);
        if (res.code === 1) {
            toast("cập nhật thành công");
            window.location.reload();
        }
        else
            toast("cập nhật thất bại");
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
                <h2 className="text-lg font-semibold mb-4">cập nhật số lượng</h2>

                <form className="space-y-4">
                    {/* Tên danh mục */}
                    <div className="flex flex-col">
                        <label htmlFor="categoryName" className="font-medium mb-1">
                            Id sản phẩm : {initialData?.productId}
                        </label>
                    </div>

                    {/* Mô tả */}
                    <div className="flex flex-col">
                        <label htmlFor="description" className="font-medium mb-1">
                            Mô tả
                        </label>
                        <input
                            id="newAvailability"
                            name="newAvailability"
                            type="number"
                            value={formState ? formState.newAvailability : ""}
                            onChange={handleChange}
                            className="border rounded-md p-2 focus:ring focus:ring-blue-200"
                        />
                    </div>


                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
                        onClick={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        Chỉnh sửa số lượng
                    </button>
                </form>
            </div>
        </div>
    );
}


