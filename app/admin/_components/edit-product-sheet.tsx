"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { PencilLine } from "lucide-react";

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { productLists } from "@/app/admin/constants/products-data";

type Product = (typeof productLists)[number];

type FormState = {
  productName: Product["productName"];
  categories: Product["categories"];
  quantity: string;
  price: string;
  status: Product["status"];
};

const mapProductToForm = (product: Product): FormState => ({
  productName: product.productName ?? "",
  categories: product.categories ?? "",
  quantity: product.quantity ?? "",
  price: product.price?.toString() ?? "",
  status: product.status ?? "Chờ xử lý",
});

export default function EditProductSheet({ product }: { product: Product }) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = React.useState<FormState>(mapProductToForm(product));

  React.useEffect(() => {
    setForm(mapProductToForm(product));
  }, [product]);

  const onSave = () => {
    console.log("Lưu sản phẩm:", { id: product.id, ...form });
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" className="py-1 rounded-md">
          <PencilLine />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="top"
        className="px-6 py-3 mx-auto top-10 bottom-10 rounded-xl max-w-2xl"
      >
        <SheetHeader>
          <SheetTitle>Chỉnh sửa sản phẩm</SheetTitle>
          <SheetDescription>
            Chỉnh sửa thông tin sản phẩm và lưu lại.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-6 py-4">
          <div className="grid gap-2">
            <Label htmlFor="product-name">Tên sản phẩm</Label>
            <Input
              id="product-name"
              value={form.productName}
              onChange={(e) =>
                setForm({ ...form, productName: e.target.value })
              }
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-price">Giá</Label>
            <Input
              id="product-price"
              type="number"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-quantity">Số lượng</Label>
            <Input
              id="product-quantity"
              type="number"
              value={form.quantity}
              onChange={(e) => setForm({ ...form, quantity: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-categories">Danh mục</Label>
            <Input
              id="product-categories"
              value={form.categories}
              onChange={(e) => setForm({ ...form, categories: e.target.value })}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="product-status">Trạng thái</Label>
            <Select
              value={form.status}
              onValueChange={(v) =>
                setForm({ ...form, status: v as Product["status"] })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn trạng thái sản phẩm" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Chờ xử lý">Chờ xử lý</SelectItem>
                <SelectItem value="Đang xử lý">Đang xử lý</SelectItem>
                <SelectItem value="Thành công">Thành công</SelectItem>
                <SelectItem value="Thất bại">Thất bại</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <SheetFooter className="flex flex-row justify-end gap-3">
          <SheetClose asChild>
            <Button variant="outline" className="w-1/4 rounded-md py-5">
              Huỷ
            </Button>
          </SheetClose>
          <Button onClick={onSave} className="w-1/4 rounded-md py-5">
            Lưu
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
