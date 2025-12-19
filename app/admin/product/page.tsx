"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { SquarePen, Plus, Trash, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Eye, Ellipsis } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PopupDelete from "../_components/popup-delete";
import { useAuth } from "@/lib/contexts/auth-context";
import { getProducts } from "@/lib/services/product-service";
import { Product } from "@/lib/models/product";
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
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatMoney } from "@/lib/helpers/format-money";
import { Category } from "@/lib/models/category";
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

function UpdateProduct({ product }: { product: Product }) {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const formSchema = z.object({
    productName: z.string().min(2).max(100),
    description: z.string().min(2).max(100),
    bio: z.string().min(2).max(100000),
    price: z.number().min(0),
    discount: z.number().min(0),
    specialPrice: z.number().min(0),
    origin: z.string().min(2).max(100),
    category: z.string().min(2).max(100),
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
      origin: product.origin,
      category: product.category.categoryId,
      height: product.height,
      length: product.length,
      weight: product.weight,
      width: product.width,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  React.useEffect(() => {
    if (!product) return;

    const fetchCategories = async () => {
      const response = await getCategories();

      if (response.categories.length > 0) setCategories(response.categories);
    };

    fetchCategories();
  }, [product]);

  // Chỉnh sửa sản phẩm
  const handleUpdateProduct = async () => {};

  return (
    <Sheet>
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
      <SheetContent>
        <SheetHeader>
          <SheetTitle>{product.productName}</SheetTitle>
          <SheetDescription>Chỉnh sửa sản phẩm</SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4 overflow-y-auto">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="productName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên sản phẩm</FormLabel>
                    <FormControl>
                      <Input placeholder="Tên sản phẩm" {...field} />
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
                      <Input placeholder="Mô tả sản phẩm" {...field} />
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
                      <Input placeholder="Giá sản phẩm" {...field} />
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
                    <FormLabel>Giảm giá</FormLabel>
                    <FormControl>
                      <Input placeholder="Giảm giá" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="specialPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Giảm giá đặc biệt</FormLabel>
                    <FormControl>
                      <Input placeholder="Giảm giá" {...field} />
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
                      <Input placeholder="Xuất xứ" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Danh mục sản phẩm</FormLabel>

                    <Select onValueChange={field.onChange} value={field.value}>
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
                              value={category.categoryId}
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
                      <Input placeholder="Chiều cao" {...field} />
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
                      <Input placeholder="Chiều dài" {...field} />
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
                      <Input placeholder="Trọng lượng" {...field} />
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
                      <Input placeholder="Chiều rộng" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetFooter>
                <Button type="submit">Submit</Button>
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
  const [categories, setCategories] = React.useState<Category[]>([]);

  return (
    <div>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="p-1 rounded-md w-fit h-fit">
            <Trash
              className="cursor-pointer hover:text-red-600 transition"
              onClick={() => {}}
            />
          </div>
        </TooltipTrigger>
        <TooltipContent>
          <p>Xoá sản phẩm</p>
        </TooltipContent>
      </Tooltip>
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
              <th className="px-4 py-3">Tên sản phẩm</th>
              <th className="px-4 py-3">Danh mục</th>
              <th className="px-4 py-3">Giá tiền</th>
              <th className="px-4 py-3">Số lượng</th>
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
                  <td className="px-4 py-3">{product.productName}</td>
                  <td className="px-4 py-3">{product.category.categoryName}</td>
                  <td className="px-4 py-3">{product.price}</td>
                  <td className="px-4 py-3">{product.inventory.available}</td>
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

                      <Link href={`/admin/product/${product.slug}`}>
                      <Button size={"icon"} variant={"ghost"}><Ellipsis className="size-5"/></Button></Link>
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

function ModalProduct({
  closeModal,
  onSubmit,
  defaultValue,
}: ModalProductProps) {
  const [formState, setFormSate] = React.useState<productItemProps>(
    defaultValue || {
      id: crypto
        .getRandomValues(new Uint32Array(1))[0]
        .toString(16)
        .slice(0, 8),
      productName: "",
      categories: "Trong nhà",
      price: "",
      quantity: "",
      status: "Chờ xử lý",
    }
  );

  const [errors, setErrors] = React.useState("");
  type FormKeys = keyof typeof formState;
  const fieldAlias: Record<FormKeys, string> = {
    id: "ID",
    productName: "Tên sản phẩm",
    quantity: "Số lượng",
    price: "Giá tiền",
    categories: "Danh mục",
    status: "Trạng thái",
  };

  const validateForm = () => {
    if (formState.productName && formState.price && formState.quantity) {
      setErrors("");
      return true;
    } else {
      const errorFields: string[] = [];

      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(fieldAlias[key as FormKeys]);
        }
      }

      setErrors(errorFields.join(", "));

      return false;
    }
  };

  React.useEffect(() => {
    if (defaultValue) {
      setFormSate(defaultValue);
    }
  }, [defaultValue]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormSate({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    onSubmit(formState);
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
        <h2 className="text-lg font-semibold mb-4">Thêm sản phẩm</h2>

        <form className="space-y-4">
          {/* Tên sản phẩm */}
          <div className="flex flex-col">
            <label htmlFor="productName" className="font-medium mb-1">
              Tên sản phẩm
            </label>
            <input
              id="productName"
              name="productName"
              onChange={handleChange}
              value={formState.productName}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Số lượng */}
          <div className="flex flex-col">
            <label htmlFor="quantity" className="font-medium mb-1">
              Số lượng
            </label>
            <input
              id="quantity"
              name="quantity"
              type="number"
              value={formState.quantity}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Giá */}
          <div className="flex flex-col">
            <label htmlFor="price" className="font-medium mb-1">
              Giá
            </label>
            <input
              id="price"
              name="price"
              type="number"
              value={formState.price}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Trạng thái */}
          <div className="flex flex-col">
            <label htmlFor="status" className="font-medium mb-1">
              Trạng thái
            </label>
            <select
              id="status"
              name="status"
              value={formState.status}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            >
              <option value="Chờ xử lý">Chờ xử lý</option>
              <option value="Đang xử lý">Đang xử lý</option>
              <option value="Thành công">Thành công</option>
              <option value="Thất bại">Thất bại</option>
            </select>
          </div>

          {/* Danh mục */}
          <div className="flex flex-col">
            <label htmlFor="categories" className="font-medium mb-1">
              Danh mục
            </label>
            <select
              id="categories"
              name="categories"
              value={formState.categories}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            >
              <option value="Trong nhà">Trong nhà</option>
              <option value="Ngoài trời">Ngoài trời</option>
              <option value="Hạt giống">Hạt giống</option>
              <option value="Dụng cụ">Dụng cụ làm vườn</option>
            </select>
          </div>

          {errors && (
            <div className="mt-2 rounded-md bg-red-50 border border-red-300 text-red-700 px-3 py-2 text-sm">
              {`Vui lòng nhập: ${errors}`}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            {defaultValue ? "Cập nhật" : "Thêm mới"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function ProductPage() {
  const { user } = useAuth();

  const [products, setProducts] = React.useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<Product[]>([]);
  const [popupOpen, setPopupOpen] = React.useState<boolean>(false);

  // lấy danh sách sản phẩm từ api
  React.useEffect(() => {
    if (!user) return;

    const fetchProducts = async () => {
      const response = await getProducts();

      if (response.products.length > 0) setProducts(response.products);
    };

    fetchProducts();
  }, [user]);

  // Xoá sản phẩm
  // const handleDeleteProduct = async () => {};

  // const openDeletePopup = (id: string) => {
  //   setDeleteId(id);
  //   setPopupOpen(true);
  // };

  function removeVNTones(str: string) {
    return str
      .normalize("NFD") // tách dấu
      .replace(/[\u0300-\u036f]/g, "") // xoá dấu
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D")
      .toLowerCase();
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = removeVNTones(e.target.value);
    const records = products.filter((item) =>
      removeVNTones(item.productName.toLowerCase()).includes(
        query.toLowerCase()
      )
    );
    setFilteredProducts(records);
  };

  return (
    <div className="container mx-auto px-15 pb-10 space-y-6">
      <div className="font-semibold text-3xl">Sản phẩm</div>
      {/* top table */}
      <div className="flex items-center py-4 justify-end gap-2">
        {/* search input */}
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          className="max-w-sm rounded-md"
          onChange={handleChange}
        />

        {/* view option */}
        <div></div>

        {/* filter status */}
        <div></div>
      </div>

      {/* Data table */}
      <ProductTable products={products} />

      {/* {popupOpen && deleteId && (
        <PopupDelete
          closePopupDelete={() => setPopupOpen(false)}
          deleteButton={() => {
            handleDeleteProduct(deleteId);
            setPopupOpen(false);
            setDeleteId(null);
          }}
        />
      )} */}
    </div>
  );
}
