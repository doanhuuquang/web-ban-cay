"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { orders } from "@/app/admin/constants/order-data";
import { CalendarClock, CheckCheck, Wallet, OctagonAlert } from "lucide-react";
import { DataTablePagination } from "../../_components/data-table-pagination";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/app/admin/_components/toggle-list-header";
import { Tooltip } from "@radix-ui/react-tooltip";
import { TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import DeleteProduct from "@/app/admin/_components/delete-product";

type Orders = (typeof orders)[number];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

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
    title: "Đang chờ",
    countStats: 56,
    icon: CalendarClock,
  },
  {
    title: "Thành công",
    countStats: 12689,
    icon: CheckCheck,
  },
  {
    title: "Đã hoàn tiền",
    countStats: 124,
    icon: Wallet,
  },
  {
    title: "Thất bại",
    countStats: 32,
    icon: OctagonAlert,
  },
];

function OrderStatsList({ data }: OrderStatsListProps) {
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 w-full h-fit rounded-xl shadow-[0_0_12px_rgba(0,0,0,0.15)] gap-1 px-2 py-4">
        {data.map((os) => {
          const Icon = os.icon;
          return (
            <div
              key={os.title}
              className="flex items-center justify-between h-fit py-5 px-4 bg-white border-r-2 last:border-r-0        "
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

export const columns: ColumnDef<Orders>[] = [
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
    accessorKey: "name",
    meta: { label: "Tên sản phẩm" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên sản phẩm" />
    ),
  },
  {
    accessorKey: "customer",
    meta: { label: "Tên khách hàng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Tên khách hàng" />
    ),
  },
  {
    accessorKey: "date",
    meta: { label: "Ngày đặt hàng" },
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Ngày đặt hàng" />
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
      const status = row.getValue("status") as Orders["status"];
      const map: Record<Orders["status"], { label: string; color: string }> = {
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
        "Chờ xử lý": {
          label: "Chờ xử lý",
          color:
            "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-md text-sm font-medium",
        },
        "Chờ lấy hàng": {
          label: "Chờ lấy hàng",
          color:
            "bg-orange-100 text-orange-700 px-3 py-1 rounded-md text-sm font-medium",
        },
        "Đang giao hàng": {
          label: "Đang giao hàng",
          color:
            "bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-sm font-medium",
        },
        "Đã huỷ": {
          label: "Đã huỷ",
          color:
            "bg-gray-200 text-gray-600 px-3 py-1 rounded-md text-sm font-medium",
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
    id: "action",
    header: "Action",
    meta: { label: "Action" },
    cell: () => {
      return (
        <div className="flex gap-2 w-fit">
          {/* delete */}
          <div>
            <Tooltip>
              <TooltipTrigger asChild>
                <DeleteProduct />
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

function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      {/* header table */}
      <div className="grid grid-cols-2 py-4">
        {/*filter order status button*/}
        <div className="flex w-full items-center gap-1.5">
          {/* all */}
          <Button
            size="sm"
            className={`h-10 px-3 text-card-foreground bg-primary-foreground rounded-md hover:bg-gray-200/60 dark:bg-accent border ${
              table.getColumn("status")?.getFilterValue() === undefined
                ? "border-blue-700"
                : ""
            }`}
            onClick={() => table.getColumn("status")?.setFilterValue(undefined)}
            aria-pressed={
              table.getColumn("status")?.getFilterValue() === undefined
            }
          >
            Tất cả
          </Button>

          {/* status button */}
          {[
            "Thành công",
            "Thất bại",
            "Chờ xử lý",
            "Chờ lấy hàng",
            "Đang giao hàng",
            "Đã huỷ",
          ].map((s) => {
            const isActive = table.getColumn("status")?.getFilterValue() === s;
            return (
              <Button
                key={s}
                size="sm"
                className={`h-10 px-3 text-card-foreground bg-primary-foreground rounded-md border hover:bg-gray-200/60 dark:bg-accent ${
                  isActive ? "border-blue-700 " : ""
                }`}
                onClick={() => {
                  table.getColumn("status")?.setFilterValue(s);
                }}
                aria-pressed={isActive}
              >
                {s}
              </Button>
            );
          })}
        </div>

        {/* search input */}
        <div className="flex items-center justify-end">
          <Input
            placeholder="Tìm kiếm sản phẩm..."
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className="max-w-sm rounded-md h-10 py-5"
          />
        </div>
      </div>

      {/* table */}
      <div className="rounded-md border overflow-y-auto h-143">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Đơn hàng không tồn tại.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <DataTablePagination table={table} />
    </div>
  );
}

const OrderPage = () => {
  return (
    <div className="container mx-auto px-15 pb-10 space-y-6">
      <div className="font-semibold text-3xl">Đơn hàng</div>
      <OrderStatsList data={orderStats} />
      <DataTable columns={columns} data={orders} />
    </div>
  );
};

export default OrderPage;
