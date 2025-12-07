"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Plus, Blend } from "lucide-react";
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
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./view-option";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { productLists } from "@/app/admin/constants/products-data";

type Product = (typeof productLists)[number];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [opent, setOpent] = React.useState(false);
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

  // Form state for adding new user
  const [newProdct, setNewProdct] = React.useState({
    productName: "",
    categories: "",
    price: "",
    quantity: "",
    status: "" as Product["status"],
  });
  return (
    <div>
      {/* top table */}
      <div className="flex items-center py-4">
        {/* search input */}
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          value={
            (table.getColumn("productName")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("productName")?.setFilterValue(event.target.value)
          }
          className="max-w-sm rounded-md"
        />

        {/* view option */}
        <DataTableViewOptions table={table} />

        {/* filter status */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="ml-2 py-5 rounded-md bg-primary-foreground border text-black hover:bg-muted dark:bg-black dark:text-white dark:border-gray-600 dark:hover:bg-muted">
              <Blend />
              Lọc trạng thái
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-2 w-full ">
                {["Chờ xử lý", "Đang xử lý", "Thành công", "Thất bại"].map(
                  (s) => {
                    const isActive =
                      table.getColumn("status")?.getFilterValue() === s;
                    return (
                      <Button
                        key={s}
                        size="sm"
                        className={`h-8 px-3 text-card-foreground bg-primary-foreground rounded-md hover:bg-gray-200/60 dark:bg-accent ${
                          isActive ? "bg-muted-foreground/20 " : "border"
                        }`}
                        onClick={() => {
                          const cur = table
                            .getColumn("status")
                            ?.getFilterValue();
                          table
                            .getColumn("status")
                            ?.setFilterValue(cur === s ? undefined : s);
                        }}
                        aria-pressed={isActive}
                      >
                        {s}
                      </Button>
                    );
                  }
                )}
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* overlay */}
        <div
          className={`fixed inset-0 bg-black/40 transition-opacity duration-300  ${
            opent
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        />

        {/* addProduct */}
        <Sheet open={opent} onOpenChange={setOpent}>
          <SheetTrigger asChild>
            <Button variant="outline" className="ml-2 py-5 rounded-md">
              <Plus size={20} />
              Thêm sản phẩm
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="px-6 py-3 mx-auto top-10 bottom-10 rounded-xl max-w-2xl"
          >
            <SheetHeader>
              <SheetTitle>Thêm sản phẩm</SheetTitle>
              <SheetDescription>
                Thêm sản phẩm mới vào bảng. Điền vào tất cả các thông tin cần
                thiết.
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4">
              <div className="grid gap-3 ">
                <Label htmlFor="product-name">Tên sản phẩm</Label>
                <Input
                  id="product-name"
                  value={newProdct.productName}
                  onChange={(e) =>
                    setNewProdct({ ...newProdct, productName: e.target.value })
                  }
                  className="rounded-md"
                  placeholder="Nhập tên sản phẩm"
                />
              </div>

              <div className="grid gap-3">
                <Label htmlFor="product-price">Giá</Label>
                <Input
                  id="product-price"
                  type="number"
                  value={newProdct.price}
                  onChange={(e) =>
                    setNewProdct({ ...newProdct, price: e.target.value })
                  }
                  className="rounded-md"
                  placeholder="Nhập giá tiền"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="product-quantity">Số lượng</Label>
                <Input
                  id="product-quantity"
                  type="number"
                  value={newProdct.quantity}
                  onChange={(e) =>
                    setNewProdct({ ...newProdct, quantity: e.target.value })
                  }
                  className="rounded-md"
                  placeholder="Nhập số lượng"
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="product-categories">Danh mục</Label>
                <Select
                  value={newProdct.categories}
                  onValueChange={(value: Product["categories"]) =>
                    setNewProdct({ ...newProdct, categories: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn danh mục sản phẩm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="a">Trong nhà</SelectItem>
                    <SelectItem value="b">Ngoài trời</SelectItem>
                    <SelectItem value="c">Vật trang trí</SelectItem>
                    <SelectItem value="d">Dụng cụ làm vườn</SelectItem>
                    <SelectItem value="e">Hạt giống</SelectItem>
                    <SelectItem value="f">Khác</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-3">
                <Label htmlFor="product-status">Trạng thái</Label>
                <Select
                  value={newProdct.status}
                  onValueChange={(value: Product["status"]) =>
                    setNewProdct({ ...newProdct, status: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn trạng thái sản phẩm" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Chờ xử lý</SelectItem>
                    <SelectItem value="processing">Đang xử lý</SelectItem>
                    <SelectItem value="success">Thành công</SelectItem>
                    <SelectItem value="failed">Thất bại</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <SheetFooter className="flex flex-row justify-end gap-3">
              <SheetClose asChild>
                <Button variant="outline" className="w-1/4 rounded-md py-5">
                  Huỷ bỏ
                </Button>
              </SheetClose>
              <Button type="button" className="w-1/4 rounded-md py-5">
                Thêm mới
              </Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
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
                  Sản phẩm không tồn tại.
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
