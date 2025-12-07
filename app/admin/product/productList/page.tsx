"use client";

import { DataTable } from "../../_components/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/app/admin/_components/toggle-list-header";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import EditProductSheet from "@/app/admin/_components/edit-product-sheet";
import DeleteProduct from "@/app/admin/_components/delete-product";

import { productLists } from "@/app/admin/constants/products-data";
import { Button } from "@/components/ui/button";

type Product = (typeof productLists)[number];

const columns: ColumnDef<Product>[] = [
  {
    id: "select",
    size: 30,
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="border-gray-600"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="border-gray-600"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: "ID",
    meta: { label: "ID" },
    cell: ({ row }) => row.getValue("id"),
  },
  {
    accessorKey: "productName",
    meta: { label: "Tên sản phẩm" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên sản phẩm" />
    ),
  },
  {
    accessorKey: "categories",
    meta: { label: "Danh mục" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Danh mục" />
    ),
  },
  {
    accessorKey: "price",
    meta: { label: "Giá" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Giá" />
    ),
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(price);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "quantity",
    meta: { label: "Số lượng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Số lượng" />
    ),
  },
  {
    accessorKey: "status",
    meta: { label: "Trạng thái" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Trạng thái" />
    ),
    cell: ({ row }) => {
      const status = row.getValue("status") as Product["status"];
      const map: Record<Product["status"], { label: string; color: string }> = {
        "Chờ xử lý": {
          label: "Chờ xử lý",
          color:
            "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm font-medium",
        },
        "Đang xử lý": {
          label: "Đang xử lý",
          color:
            "bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md text-sm font-medium",
        },

        "Thành công": {
          label: "Thành công",
          color:
            "bg-green-100 text-green-700 px-3 py-1 rounded-md text-sm font-medium",
        },
        "Thất bại": {
          label: "Thất bại",
          color:
            "bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm font-medium",
        },
      };

      const info = map[status];

      return (
        <span
          className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium ${info.color}`}
        >
          {info.label}
        </span>
      );
    },
  },
  {
    accessorKey: "action",
    header: "Tuỳ chọn",
    meta: { label: "Tuỳ chọn" },
    cell: ({ row }) => {
      return (
        <div className="flex gap-2 w-fit">
          {/* edit */}
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="p-1 rounded-md w-fit h-fit">
                  <EditProductSheet product={row.original} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sửa sản phẩm</p>
              </TooltipContent>
            </Tooltip>
          </div>

          {/* delete */}
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="p-1 rounded-md w-fit h-fit">
                  <DeleteProduct />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Xoá sản phẩm</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      );
    },
  },
];

export default function ProductPage() {
  const data = productLists;

  return (
    <div className="container mx-auto px-15 pb-10 space-y-6">
      <div className="font-semibold text-3xl">Sản phẩm</div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
