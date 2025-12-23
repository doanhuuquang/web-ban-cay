"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Product } from "@/lib/models/product";
import { getProductBySlug } from "@/lib/services/product-service";
import { ArrowBigLeft, Pencil } from "lucide-react";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

function ProductDetail({ slug }: { slug: string }) {
  const [products, setProducts] = React.useState<Product | null>(null);
  const [btnEdit, setBtnEdit] = React.useState<boolean>(true);
  const [categories, setCategories] = React.useState<Product[]>([]);

  const handleEditClick = () => {
    return btnEdit ? setBtnEdit(false) : setBtnEdit(true);
  };
  React.useEffect(() => {
    const fetchProductBySlug = async () => {
      const response = await getProductBySlug({ slug: slug });
      if (response.product) setProducts(response.product);
    };
    fetchProductBySlug();
  }, [slug]);

  if (!products) return null;

  return (
    <div className="mx-15 py-6">
      <Link
        href="/admin/product"
        className="flex w-fit gap-2 text-accent py-2 px-3 bg-blue-500 rounded-xl"
      >
        <ArrowBigLeft />
        Quay lại
      </Link>

      <div className="bg-white rounded-xl border p-6 mt-7">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold">Thông tin sản phẩm</h2>

          <button
            onClick={() => handleEditClick()}
            className="h-9 w-9 rounded-full border flex items-center justify-center hover:bg-gray-100 transition"
          >
            <Pencil className="h-4 w-4" />
          </button>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-y-6 gap-x-10 text-sm">
          {/* Mã sản phẩm */}
          <div className="text-gray-500">Mã sản phẩm</div>
          <Input
            disabled={btnEdit}
            defaultValue={products.productId}
            className="font-medium text-gray-900"
          />

          {/* Tên sản phẩm */}
          <div className="text-gray-500">Tên sản phẩm</div>
          <Input
            disabled={btnEdit}
            defaultValue={products.productName}
            className="font-medium text-gray-900"
          />

          {/* Mô tả */}
          <div className="text-gray-500">Mô tả</div>
          <Input
            disabled={btnEdit}
            defaultValue={products.description}
            className="font-medium text-gray-900"
          />

          {/* Thông tin thêm sản phẩm */}
          <div className="text-gray-500">Thông tin thêm sản phẩm</div>
          <Input
            disabled={btnEdit}
            defaultValue={products.bio}
            className="font-medium text-gray-900"
          />

          {/* Giá */}
          <div className="text-gray-500">Giá</div>
          <Input
            disabled={btnEdit}
            defaultValue={products.price}
            className="font-medium text-gray-900"
          />

          {/* Giảm giá */}
          <div className="text-gray-500">Giảm giá</div>
          <Input
            disabled={btnEdit}
            defaultValue={products.discount}
            className="font-medium text-gray-900"
          />

          {/* Giá đặc biệt */}
          <div className="text-gray-500">Giá đặc biệt</div>
          <Input
            disabled={btnEdit}
            defaultValue={products.specialPrice}
            className="font-medium text-gray-900"
          />

          {/* Xuất xứ */}
          <div className="text-gray-500">Xuất xứ</div>
          <Input
            disabled={btnEdit}
            defaultValue={products.origin}
            className="font-medium text-gray-900"
          />

          {/* Danh mục sản phẩm */}
          <div className="text-gray-500">Danh mục sản phẩm</div>
          <Select disabled={btnEdit}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Danh mục" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Danh mục sản phẩm</SelectLabel>
                {categories.map((cate) => (
                  <SelectItem
                    key={cate.category.categoryId}
                    value={cate.category.categoryId}
                  >
                    {cate.category.categoryId}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Chiều cao */}
          <div className="text-gray-500">Chiều cao</div>
          <Input
            disabled={btnEdit}
            defaultValue={products.height}
            className="font-medium text-gray-900"
          />

          {/* Chiều dài */}
          <div className="text-gray-500">Giá</div>
          <Input
            disabled={btnEdit}
            defaultValue={products.length}
            className="font-medium text-gray-900"
          />

          {/* Chiều rộng */}
          <div className="text-gray-500">Chiều rộng</div>
          <Input
            disabled={btnEdit}
            defaultValue={products.width}
            className="font-medium text-gray-900"
          />

          {/* Cân nặng */}
          <div className="text-gray-500">Cân nặng</div>
          <Input
            disabled={btnEdit}
            defaultValue={products.weight}
            className="font-medium text-gray-900"
          />
        </div>
        <div className="flex justify-end mt-5 w-full">
          <Button
            disabled={btnEdit}
            variant="default"
            className="p-6 rounded-xl"
          >
            {" "}
            Sửa
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
