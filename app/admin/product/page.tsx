"use client";

import React from "react";
import { User } from "@/lib/models/user"; // Declare User type

import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  SquarePen,
  Trash,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Eye,
  Plus,
  Filter,
  X,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  addProduct,
  addProductImage,
  deleteProductById,
  getProducts,
  updateProduct,
} from "@/lib/services/product-service";
import type { Product } from "@/lib/models/product";
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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Category } from "@/lib/models/category";
import { getCategories } from "@/lib/services/category-service";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { toast } from "sonner";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import { DELETE_PRODUCT_SUCCESS_MESSAGE } from "@/lib/constants/success-messages";
import Image from "next/image";
import { formatMoney } from "@/lib/helpers/format-money";

function UpdateProduct({ product }: { product: Product }) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [open, setOpen] = React.useState(false);

  const [existingImages, setExistingImages] = React.useState<string[]>(() =>
    (product?.images ?? [])
      .map((i) => i?.downloadUrl?.trim())
      .filter((i): i is string => Boolean(i))
      .map((i) => `http://localhost:8080${i}`)
  );

  const [newImages, setNewImages] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const formSchema = z.object({
    productName: z.string().min(7).max(200),
    description: z.string().min(2).max(100),
    bio: z.string().min(2).max(100000),
    price: z.number().min(0),
    discount: z.number().min(0).max(100),
    specialPrice: z.number().min(0),
    origin: z.string().min(2).max(100),
    quantity: z.number().min(0),
    categoryId: z.string(),
    height: z.number().min(0),
    length: z.number().min(0),
    weight: z.number().min(0),
    width: z.number().min(0),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: product.productName,
      description: product.description,
      bio: product.bio,
      price: product.price,
      discount: product.discount,
      specialPrice: product.specialPrice,
      quantity: product.inventory.available,
      origin: product.origin,
      categoryId: product.category.categoryId,
      height: product.height,
      length: product.length,
      weight: product.weight,
      width: product.width,
    },
  });

  // Khi product prop thay đổi, cập nhật form với dữ liệu mới
  React.useEffect(() => {
    form.reset({
      productName: product.productName,
      description: product.description,
      bio: product.bio,
      price: product.price,
      discount: product.discount,
      specialPrice: product.specialPrice,
      quantity: product.inventory.available,
      origin: product.origin,
      categoryId: product.category.categoryId,
      height: product.height,
      length: product.length,
      weight: product.weight,
      width: product.width,
    });
  }, [product, form]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const code = await updateProduct({
        productId: product.productId,
        data: {
          productName: values.productName,
          description: values.description,
          categoryId: values.categoryId.toString(),
          bio: values.bio,
          price: values.price,
          discount: values.discount,
          origin: values.origin,
          height: values.height,
          quantity: values.quantity,
          length: values.length,
          weight: values.weight,
          width: values.width,
          avgRating: product.avgRating,
          reviewCount: product.reviewCount,
          soldCount: product.soldCount,
          createAt: product.createAt,
        },
      });

      const formData = new FormData();

      newImages.forEach((file) => {
        formData.append("files", file);
      });

      existingImages.forEach((url) => {
        formData.append("existingImages", url);
      });

      const addImagesCode = await addProductImage(product.productId, formData);

      if (code === 200) {
        toast.success("Cập nhật thành công");
        setOpen(false);
        window.location.reload();
      } else {
        toast.error("Cập nhật thất bại");
      }
    } catch {
      toast.error("Lỗi khi cập nhật");
    }
  }

  const handleRemoveExisting = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleRemoveNew = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setNewImages((prev) => [...prev, e.target.files![0]]);
      // Reset input để có thể chọn file cùng tên lần tiếp theo
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  // Khi modal được mở/đóng, reset ảnh về trạng thái ban đầu
  React.useEffect(() => {
    if (open) {
      // Khi mở modal, tải lại ảnh cũ từ product
      setExistingImages(
        (product?.images ?? [])
          .map((i) => i?.downloadUrl?.trim())
          .filter((i): i is string => Boolean(i))
          .map((i) => `http://localhost:8080${i}`)
      );
      // Xóa ảnh mới (ảnh chưa upload)
      setNewImages([]);
    }
  }, [open, product]);

  React.useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      if (response.categories.length > 0) {
        setCategories(response.categories);
      }
    };

    fetchCategories();
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SheetTrigger asChild>
              <Button size={"icon"} variant="ghost">
                <SquarePen className="size-5 " />
              </Button>
            </SheetTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Sửa sản phẩm</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{product.productName}</SheetTitle>
          <SheetDescription>Chỉnh sửa sản phẩm</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-auto">
          <div className="flex items-center gap-4 flex-wrap">
            {/* Hiển thị ảnh cũ (từ server) */}
            {existingImages
              .filter((src) => typeof src === "string" && src.length > 0)
              .map((src, i) => (
                <div
                  key={`existing-${i}`}
                  className="group relative cursor-pointer w-[50px] h-[75px] overflow-hidden rounded border"
                >
                  <div
                    className="w-full h-full bg-black/40 absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                    onClick={() => handleRemoveExisting(i)}
                  >
                    <Trash className="text-white size-4" />
                  </div>
                  <Image
                    src={src || "/placeholder.svg"}
                    width={50}
                    height={75}
                    alt={product.productName}
                    unoptimized
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

            {/* Hiển thị ảnh mới (chưa upload) */}
            {newImages.map((file, i) => (
              <div
                key={`new-${i}`}
                className="group relative cursor-pointer w-[50px] h-[75px] overflow-hidden rounded border border-blue-500"
              >
                <div
                  className="w-full h-full bg-black/40 absolute flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
                  onClick={() => handleRemoveNew(i)}
                >
                  <Trash className="text-white size-4" />
                </div>
                <img
                  src={URL.createObjectURL(file) || "/placeholder.svg"}
                  alt={file.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-blue-500 text-white text-[8px] text-center py-0.5">
                  Mới
                </div>
              </div>
            ))}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <div
              className="w-[50px] h-[75px] border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition"
              onClick={() => fileInputRef.current?.click()}
            >
              <Plus />
            </div>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên sản phẩm</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Tên sản phẩm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mô tả sản phẩm</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Mô tả sản phẩm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thông tin thêm của sản phẩm</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Thông tin thêm của sản phẩm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giá sản phẩm</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Giá sản phẩm"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giảm giá (%)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Giảm giá"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Xuất xứ</FormLabel>
                    <FormControl>
                      <Input type="text" placeholder="Xuất xứ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Số lượng</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Số lượng"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục sản phẩm</FormLabel>

                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Chọn danh mục sản phẩm" />
                        </SelectTrigger>
                      </FormControl>

                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Danh mục sản phẩm</SelectLabel>
                          {categories.map((category) => (
                            <SelectItem
                              key={category.categoryId}
                              value={category.categoryId.toString()}
                              defaultValue={category.categoryId}
                            >
                              {category.categoryName}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel> Chiều cao</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Chiều cao"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="length"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chiều dài</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Chiều dài"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Trọng lượng</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Trọng lượng"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="width"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chiều rộng</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Chiều rộng"
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseFloat(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <Button type="submit">Lưu</Button>
                <SheetClose asChild>
                  <Button variant="outline">Close</Button>
                </SheetClose>
              </SheetFooter>
            </form>
          </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function DeleteProduct({ product }: { product: Product }) {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] =
    React.useState<boolean>(false);
  const [isDeletingProduct, setIsDeletingProduct] =
    React.useState<boolean>(false);

  const handleDeleteProduct = async () => {
    try {
      setIsDeletingProduct(true);
      const code = await deleteProductById({ productId: product.productId });

      toast(
        code !== API_SUCCESS_CODE.DELETE_PRODUCT_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.DELETE_PRODUCT_SUCCESS
              ? ERROR_MESSAGES[code]
                ? ERROR_MESSAGES[code]
                : DEFAULT_ERROR_MESSAGE
              : DELETE_PRODUCT_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => { },
          },
        }
      );

      if (code === API_SUCCESS_CODE.DELETE_PRODUCT_SUCCESS) {
        setIsOpenDeleteDialog(false);
        window.location.reload();
      }
    } finally {
      setIsDeletingProduct(false);
    }
  };
  return (
    <Dialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
      <form>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button onClick={() => { }} size={"icon"} variant="ghost">
                <Trash
                  className="size-5 cursor-pointer hover:text-red-600 transition"
                  onClick={() => { }}
                />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Xoá sản phẩm</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xoá sản phẩm</DialogTitle>
            <DialogDescription>
              Có chắc chắn muốn xoá sản phẩm <b>{product.productName}</b> không?
              <br />
              Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Huỷ</Button>
            </DialogClose>
            <Button onClick={() => handleDeleteProduct()} type="submit">
              {isDeletingProduct ? "Đang xoá..." : "Xoá"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

type SortType = "name-asc" | "name-desc" | "price-asc" | "price-desc" | "qty-asc" | "qty-desc" | "newest";
type StockFilter = "all" | "inStock" | "outOfStock";

interface FilterState {
  categoryId: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  stock: StockFilter;
  sort: SortType;
}

function FilterPanel({
  categories,
  filters,
  onFilterChange,
}: {
  categories: Category[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
}) {
  const [minPrice, setMinPrice] = React.useState<string>("");
  const [maxPrice, setMaxPrice] = React.useState<string>("");

  const handleCategoryChange = (categoryId: string) => {
    onFilterChange({
      ...filters,
      categoryId: categoryId === "all" ? null : categoryId,
    });
  };

  const handlePriceChange = () => {
    onFilterChange({
      ...filters,
      minPrice: minPrice ? parseFloat(minPrice) : null,
      maxPrice: maxPrice ? parseFloat(maxPrice) : null,
    });
  };

  const handleStockChange = (stock: StockFilter) => {
    onFilterChange({ ...filters, stock });
  };

  const handleSortChange = (sort: SortType) => {
    onFilterChange({ ...filters, sort });
  };

  const handleReset = () => {
    setMinPrice("");
    setMaxPrice("");
    onFilterChange({
      categoryId: null,
      minPrice: null,
      maxPrice: null,
      stock: "all",
      sort: "newest",
    });
  };

  const hasActiveFilters =
    filters.categoryId ||
    filters.minPrice ||
    filters.maxPrice ||
    filters.stock !== "all";

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter size={18} className="text-gray-600" />
          <span className="font-semibold text-gray-700">Lọc & Sắp xếp</span>
        </div>

        {/* Category Filter */}
        <div className="flex items-center gap-2">
          <select
            value={filters.categoryId || "all"}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px]"
          >
            <option value="all">Tất cả danh mục</option>
            {categories.map((cat) => (
              <option key={cat.categoryId} value={cat.categoryId.toString()}>
                {cat.categoryName}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Filter */}
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Giá tối thiểu"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[110px]"
          />
          <span className="text-gray-400">-</span>
          <input
            type="number"
            placeholder="Giá tối đa"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-[110px]"
          />
          <button
            onClick={handlePriceChange}
            className="bg-blue-600 text-white text-sm px-4 py-2 rounded hover:bg-blue-700 transition whitespace-nowrap"
          >
            Áp dụng
          </button>
        </div>

        {/* Stock Status Filter */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Kho:</span>
          {[
            { value: "all", label: "Tất cả" },
            { value: "inStock", label: "Còn" },
            { value: "outOfStock", label: "Hết" },
          ].map((option) => (
            <label key={option.value} className="flex items-center gap-1 cursor-pointer">
              <input
                type="radio"
                name="stock"
                value={option.value}
                checked={filters.stock === option.value}
                onChange={(e) =>
                  handleStockChange(e.target.value as StockFilter)
                }
                className="w-4 h-4"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>

        {/* Sorting */}
        <div className="flex items-center gap-2">
          <select
            value={filters.sort}
            onChange={(e) => handleSortChange(e.target.value as SortType)}
            className="border border-gray-200 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[140px]"
          >
            <option value="newest">Mới nhất</option>
            <option value="name-asc">Tên (A → Z)</option>
            <option value="name-desc">Tên (Z → A)</option>
            <option value="price-asc">Giá (Thấp → Cao)</option>
            <option value="price-desc">Giá (Cao → Thấp)</option>
            <option value="qty-asc">Số lượng (Ít → Nhiều)</option>
            <option value="qty-desc">Số lượng (Nhiều → Ít)</option>
          </select>
        </div>

        {/* Reset Button */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="text-sm text-blue-600 hover:text-blue-700 flex items-center gap-1 px-3 py-2 hover:bg-blue-50 rounded transition"
          >
            <X size={16} />
            Xóa
          </button>
        )}
      </div>
    </div>
  );
}

function ProductTable({ products }: { products: Product[] }) {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const pageCount = Math.ceil(products.length / pageSize);

  const currentProductsInPage = products.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  React.useEffect(() => {
    setPageIndex(0);
  }, [products]);
  return (
    <div className="space-y-4">
      {/* TABLE */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm h-150">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100 border-b">
            <tr className="font-semibold text-gray-700">
              <th className="px-4 py-3">Id</th>
              <th className="px-4 py-3">Ảnh</th>
              <th className="px-4 py-3">Tên sản phẩm</th>
              <th className="px-4 py-3">Mô tả sản phẩm</th>
              <th className="px-4 py-3">Danh mục</th>
              <th className="px-4 py-3">Giá tiền</th>
              <th className="px-4 py-3">Số lượng</th>
              <th className="px-4 py-3">Xuất xứ</th>
              <th className="px-4 py-3">Cao</th>
              <th className="px-4 py-3">Dài</th>
              <th className="px-4 py-3">Rộng</th>
              <th className="px-4 py-3">Trọng lượng (kg)</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Tuỳ chọn</th>
            </tr>
          </thead>

          <tbody>
            {currentProductsInPage.map((product, index) => {
              return (
                <tr
                  key={index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{product.productId}</td>
                  <td className="px-4 py-3">
                    <Image
                      src={
                        product.images && product.images.length > 0
                          ? `http://localhost:8080${product.images[product.images.length - 1].downloadUrl}`
                          : "/assets/images/products/placeholder.png"
                      }
                      alt={product.productName}
                      unoptimized
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="px-4 py-3">{product.productName}</td>
                  <td className="px-4 py-3">{product.description}</td>
                  <td className="px-4 py-3">{product.category.categoryName}</td>
                  <td className="px-4 py-3">{formatMoney(product.price)}</td>
                  <td className="px-4 py-3">{product.inventory.available}</td>
                  <td className="px-4 py-3">{product.origin}</td>
                  <td className="px-4 py-3">{product.height}</td>
                  <td className="px-4 py-3">{product.length}</td>
                  <td className="px-4 py-3">{product.width}</td>
                  <td className="px-4 py-3">{product.weight}</td>
                  <td className="px-4 py-3">
                    {product.inventory.available === 0
                      ? "Hết hàng"
                      : "Còn hàng"}
                  </td>

                  <td className="px-4 py-3">
                    <span className="flex items-center gap-3 text-gray-600">
                      {/* update */}
                      <UpdateProduct product={product} />

                      {/* delete */}
                      <DeleteProduct product={product} />

                      {/* detail */}
                      <Link href={`/admin/product/${product.slug}`}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button size={"icon"} variant="ghost">
                              <Eye className="size-5" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Chi tiết sản phẩm</p>
                          </TooltipContent>
                        </Tooltip>
                      </Link>
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex items-center justify-between px-2 mt-2">
        <div className="text-gray-600 text-sm">
          Trang {pageIndex + 1} trên {pageCount} — Tổng {products.length} hàng
        </div>

        <div className="flex items-center space-x-6">
          {/* PAGE SIZE */}
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Số hàng / trang</p>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setPageIndex(0);
              }}
              className="h-8 border rounded px-2"
            >
              {[10, 20, 30, 50].map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* PAGE CONTROLS */}
          <div className="flex items-center space-x-2">
            <button
              className="border rounded p-1 disabled:opacity-50"
              onClick={() => setPageIndex(0)}
              disabled={pageIndex === 0}
            >
              <ChevronsLeft size={18} />
            </button>

            <button
              className="border rounded p-1 disabled:opacity-50"
              onClick={() => setPageIndex((p) => p - 1)}
              disabled={pageIndex === 0}
            >
              <ChevronLeft size={18} />
            </button>

            <button
              className="border rounded p-1 disabled:opacity-50"
              onClick={() => setPageIndex((p) => p + 1)}
              disabled={pageIndex === pageCount - 1}
            >
              <ChevronRight size={18} />
            </button>

            <button
              className="border rounded p-1 disabled:opacity-50"
              onClick={() => setPageIndex(pageCount - 1)}
              disabled={pageIndex === pageCount - 1}
            >
              <ChevronsRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddProduct({ closeModal }: { closeModal: () => void }) {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const [newImages, setNewImages] = React.useState<File[]>([]);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const formSchema = z.object({
    productName: z.string().min(7).max(200),
    description: z.string().min(2).max(100),
    bio: z.string().min(2).max(100000),
    price: z.number().min(0),
    discount: z.number().min(0).max(100),
    specialPrice: z.number().min(0),
    origin: z.string().min(2).max(100),
    quantity: z.number().min(0),
    categoryId: z.string(),
    height: z.number().min(0),
    length: z.number().min(0),
    weight: z.number().min(0),
    width: z.number().min(0),
  });

  React.useEffect(() => {
    const fetchCategories = async () => {
      const res = await getCategories();
      if (res.categories.length > 0) setCategories(res.categories);
    };
    fetchCategories();
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: "",
      description: "",
      bio: "",
      price: 0,
      discount: 0,
      specialPrice: 0,
      quantity: 0,
      origin: "",
      categoryId: "",
      height: 0,
      length: 0,
      weight: 0,
      width: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const { code, product } = await addProduct({
        data: {
          productName: values.productName,
          description: values.description,
          categoryId: values.categoryId.toString(),
          bio: values.bio,
          price: values.price,
          discount: values.discount,
          origin: values.origin,
          height: values.height,
          quantity: values.quantity,
          length: values.length,
          weight: values.weight,
          width: values.width,
          avgRating: 0,
          reviewCount: 0,
          soldCount: 0,
          createAt: new Date(),
        },
      });

      if (product === null) return;

      const formData = new FormData();

      newImages.forEach((file) => {
        formData.append("files", file);
      });

      const addImagesCode = await addProductImage(product.productId, formData);

      if (code === 201) {
        toast.success("Thêm sản phẩm thành công");
        window.location.reload();
      } else {
        toast.error("Thêm sản phẩm thất bại");
      }
    } catch {
      toast.error("Lỗi khi thêm sản phẩm");
    }
  }

  const handleRemoveNew = (index: number) => {
    setNewImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setNewImages((prev) => [...prev, e.target.files![0]]);
      // Reset input để có thể chọn file cùng tên lần tiếp theo
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="grid flex-1 auto-rows-min gap-6 overflow-y-auto bg-white max-h-5/6 max-w-1/2 shadow-lg py-6 px-10 animate-in fade-in zoom-in-95 duration-200">
        <p className="font-semibold w-full text-center text-2xl">
          Thêm sản phẩm
        </p>

        <div className="flex items-center gap-4 flex-wrap">
          {newImages.map((file, index) => (
            <div key={index} onClick={() => handleRemoveNew(index)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={URL.createObjectURL(file) || "/placeholder.svg"}
                width={50}
                height={100}
                alt=""
                className="image-preview object-cover"
              />
            </div>
          ))}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
          <div
            className="w-[50px] h-[75px] border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <Plus />
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên sản phẩm</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Tên sản phẩm" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mô tả sản phẩm</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Mô tả sản phẩm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Thông tin thêm của sản phẩm</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Thông tin thêm của sản phẩm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá sản phẩm</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Giá sản phẩm"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="discount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giảm giá (%)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Giảm giá"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="origin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Xuất xứ</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Xuất xứ" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Số lượng</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Số lượng"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Danh mục sản phẩm</FormLabel>

                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Chọn danh mục sản phẩm" />
                      </SelectTrigger>
                    </FormControl>

                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Danh mục sản phẩm</SelectLabel>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.categoryId}
                            value={category.categoryId.toString()}
                          >
                            {category.categoryName}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="height"
              render={({ field }) => (
                <FormItem>
                  <FormLabel> Chiều cao</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Chiều cao"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="length"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chiều dài</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Chiều dài"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="weight"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Trọng lượng</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Trọng lượng"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="width"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chiều rộng</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Chiều rộng"
                      {...field}
                      onChange={(e) =>
                        field.onChange(Number.parseFloat(e.target.value))
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Lưu</Button>
            <Button onClick={() => closeModal()} variant="outline">
              Close
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const [allProducts, setAllProducts] = React.useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [searchQuery, setSearchQuery] = React.useState<string>("");
  const [filters, setFilters] = React.useState<FilterState>({
    categoryId: null,
    minPrice: null,
    maxPrice: null,
    stock: "all",
    sort: "newest",
  });

  function removeVNTones(str: string) {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  }

  // Fetch products and categories
  React.useEffect(() => {
    const fetchData = async () => {
      const [productsRes, categoriesRes] = await Promise.all([
        getProducts(),
        getCategories(),
      ]);

      if (productsRes.products.length > 0) {
        setAllProducts(productsRes.products);
      }
      if (categoriesRes.categories.length > 0) {
        setCategories(categoriesRes.categories);
      }
    };

    fetchData();
  }, []);

  /**
   * Hàm lọc sản phẩm theo tìm kiếm
   * - Loại bỏ dấu tiếng Việt để tìm kiếm chính xác hơn
   * - So sánh không phân biệt chữ hoa/thường
   */
  const filterBySearch = (items: Product[]): Product[] => {
    if (!searchQuery) return items;

    return items.filter((item) =>
      removeVNTones(item.productName.toLowerCase()).includes(
        removeVNTones(searchQuery.toLowerCase())
      )
    );
  };

  /**
   * Hàm lọc sản phẩm theo danh mục
   * - Nếu không chọn danh mục => trả về toàn bộ
   * - Nếu có chọn => lọc sản phẩm thuộc danh mục đó
   */
  const filterByCategory = (items: Product[]): Product[] => {
    if (!filters.categoryId) return items;

    return items.filter(
      (item) => item.category.categoryId.toString() === filters.categoryId
    );
  };

  /**
   * Hàm lọc sản phẩm theo khoảng giá
   * - Lọc theo giá tối thiểu (nếu có)
   * - Lọc theo giá tối đa (nếu có)
   */
  const filterByPrice = (items: Product[]): Product[] => {
    let result = items;

    // Lọc theo giá tối thiểu
    if (filters.minPrice !== null) {
      result = result.filter((item) => item.price >= filters.minPrice!);
    }

    // Lọc theo giá tối đa
    if (filters.maxPrice !== null) {
      result = result.filter((item) => item.price <= filters.maxPrice!);
    }

    return result;
  };

  /**
   * Hàm lọc sản phẩm theo trạng thái kho
   * - "all" => không lọc, hiện tất cả
   * - "inStock" => chỉ hiện sản phẩm còn hàng
   * - "outOfStock" => chỉ hiện sản phẩm hết hàng
   */
  const filterByStock = (items: Product[]): Product[] => {
    switch (filters.stock) {
      case "inStock":
        return items.filter((item) => item.inventory.available > 0);
      case "outOfStock":
        return items.filter((item) => item.inventory.available === 0);
      case "all":
      default:
        return items; // Không lọc, trả về toàn bộ
    }
  };

  /**
   * Hàm sắp xếp sản phẩm
   * - name-asc/desc: sắp xếp theo tên (A→Z hoặc Z→A)
   * - price-asc/desc: sắp xếp theo giá (thấp→cao hoặc cao→thấp)
   * - qty-asc/desc: sắp xếp theo số lượng (ít→nhiều hoặc nhiều→ít)
   * - newest: sắp xếp theo ngày tạo (mới nhất trước)
   */
  const sortProducts = (items: Product[]): Product[] => {
    const sorted = [...items]; // Tạo bản sao để không thay đổi mảng gốc

    switch (filters.sort) {
      // Sắp xếp tên A → Z
      case "name-asc":
        sorted.sort((a, b) =>
          removeVNTones(a.productName).localeCompare(
            removeVNTones(b.productName)
          )
        );
        break;

      // Sắp xếp tên Z → A
      case "name-desc":
        sorted.sort((a, b) =>
          removeVNTones(b.productName).localeCompare(
            removeVNTones(a.productName)
          )
        );
        break;

      // Sắp xếp giá từ thấp đến cao
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;

      // Sắp xếp giá từ cao đến thấp
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;

      // Sắp xếp số lượng từ ít đến nhiều
      case "qty-asc":
        sorted.sort((a, b) => a.inventory.available - b.inventory.available);
        break;

      // Sắp xếp số lượng từ nhiều đến ít
      case "qty-desc":
        sorted.sort((a, b) => b.inventory.available - a.inventory.available);
        break;

      // Sắp xếp theo ngày tạo (mới nhất trước)
      case "newest":
      default:
        sorted.sort(
          (a, b) =>
            new Date(b.createAt).getTime() - new Date(a.createAt).getTime()
        );
    }

    return sorted;
  };

  // Áp dụng tất cả các bộ lọc và sắp xếp
  React.useEffect(() => {
    // Bắt đầu với toàn bộ sản phẩm
    let results = [...allProducts];

    // Áp dụng các bộ lọc theo thứ tự
    results = filterBySearch(results);
    results = filterByCategory(results);
    results = filterByPrice(results);
    results = filterByStock(results);

    // Áp dụng sắp xếp cuối cùng
    results = sortProducts(results);

    // Cập nhật danh sách sản phẩm đã lọc
    setFilteredProducts(results);
  }, [allProducts, searchQuery, filters]);

  return (
    <div className="container mx-auto px-5 pb-10 space-y-4">
      <div className="font-semibold text-3xl">Sản phẩm</div>

      {/* Search and Add Button */}
      <div className="flex items-center p-3 shadow-sm mb-2 rounded-lg justify-between gap-2 bg-white">
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          className="max-w-sm rounded-md p-5"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <Button
          className="text-white px-8 py-5 rounded-md text-sm font-medium flex gap-2 bg-blue-600/90 hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
          <Plus size={18} />
          Thêm sản phẩm
        </Button>
        {modalOpen && (
          <AddProduct
            closeModal={() => {
              setModalOpen(false);
            }}
          />
        )}
      </div>

      {/* Filter Panel on Top */}
      <div className="mb-4">
        <FilterPanel
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-center justify-between mb-3 text-sm text-gray-600">
          <span>
            Hiển thị {filteredProducts.length} trên {allProducts.length} sản phẩm
          </span>
        </div>
        <ProductTable products={filteredProducts} />
      </div>
    </div>
  );
}
