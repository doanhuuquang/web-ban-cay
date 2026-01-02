"use client";

import React, { useEffect } from "react";

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
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/lib/contexts/auth-context";
import {
  addProduct,
  addProductImage,
  deleteProductById,
  getProducts,
  updateProduct,
} from "@/lib/services/product-service";
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
import { toast } from "sonner";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import { DELETE_PRODUCT_SUCCESS_MESSAGE } from "@/lib/constants/success-messages";
import Image from "next/image";

function UpdateProduct({ product }: { product: Product }) {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [open, setOpen] = React.useState(false);

  const [newImageUrl, setNewImageUrl] = React.useState<string>("");
  const [productImages, setProductImages] = React.useState<string[]>(
    product.images.map((img) => img.url)
  );

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

      const addImagesCode = await addProductImage({
        productId: product.productId,
        imageUrls: productImages,
      });

      if (code === 200 && addImagesCode === 200) {
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

  const handleRemoveImage = (index: number) => {
    const newImages = productImages.filter((_, i) => i !== index);
    setProductImages(newImages);
  };

  const handleAddImages = (imageUrl: string) => {
    setProductImages(() => [...productImages, imageUrl]);
  };

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
            {productImages.length > 0 &&
              productImages.map((image, index) => (
                <div
                  key={index}
                  onClick={() => handleRemoveImage(index)}
                  className="group relative cursor-pointer"
                >
                  <div className="w-full h-full bg-black/40 absolute flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <Trash className="text-white" />
                  </div>

                  <Image
                    src={image}
                    alt={product.productName}
                    width={50}
                    height={50}
                  />
                </div>
              ))}

            <Dialog>
              <form>
                <DialogTrigger asChild>
                  <div className="w-[50px] h-[75px] border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition">
                    <Plus />
                  </div>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Thêm ảnh sản phẩm</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4">
                    <Input
                      type="text"
                      placeholder="Nhập URL ảnh sản phẩm"
                      onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                  </div>
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Hủy</Button>
                    </DialogClose>
                    <Button
                      disabled={newImageUrl === ""}
                      onClick={() => {
                        handleAddImages(newImageUrl);
                        setNewImageUrl("");
                      }}
                    >
                      Thêm
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Dialog>
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
            onClick: () => {},
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
              <Button onClick={() => {}} size={"icon"} variant="ghost">
                <Trash
                  className="size-5 cursor-pointer hover:text-red-600 transition"
                  onClick={() => {}}
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
                        product.images.length > 0
                          ? product.images[0].url
                          : "/assets/images/products/placeholder.png"
                      }
                      alt={product.productName}
                      width={50}
                      height={50}
                    />
                  </td>
                  <td className="px-4 py-3">{product.productName}</td>
                  <td className="px-4 py-3">{product.description}</td>
                  <td className="px-4 py-3">{product.category.categoryName}</td>
                  <td className="px-4 py-3">{product.price}</td>
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
  const [productImages, setProductImages] = React.useState<string[]>([]);
  const [newImageUrl, setNewImageUrl] = React.useState<string>("");

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

      const addImagesCode = await addProductImage({
        productId: product.productId,
        imageUrls: productImages,
      });

      if (code === 201 && addImagesCode === 200) {
        toast.success("Thêm sản phẩm thành công");
        window.location.reload();
      } else {
        toast.error("Thêm sản phẩm thất bại");
      }
    } catch {
      toast.error("Lỗi khi thêm sản phẩm");
    }
  }

  const handleRemoveImage = (index: number) => {
    const newImages = productImages.filter((_, i) => i !== index);
    setProductImages(newImages);
  };

  const handleAddImages = (imageUrl: string) => {
    setProductImages(() => [...productImages, imageUrl]);
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
          {productImages.length > 0 &&
            productImages.map((image, index) => (
              <div
                key={index}
                onClick={() => handleRemoveImage(index)}
                className="group relative cursor-pointer"
              >
                <div className="w-full h-full bg-black/40 absolute flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <Trash className="text-white" />
                </div>

                <Image src={image} alt={image} width={50} height={50} />
              </div>
            ))}

          <Dialog>
            <form>
              <DialogTrigger asChild>
                <div className="w-[50px] h-[75px] border flex items-center justify-center cursor-pointer hover:bg-muted/50 transition">
                  <Plus />
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Thêm ảnh sản phẩm</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4">
                  <Input
                    type="text"
                    placeholder="Nhập URL ảnh sản phẩm"
                    onChange={(e) => setNewImageUrl(e.target.value)}
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Hủy</Button>
                  </DialogClose>
                  <Button
                    disabled={newImageUrl === ""}
                    onClick={() => {
                      handleAddImages(newImageUrl);
                      setNewImageUrl("");
                    }}
                  >
                    Thêm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog>
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
  const { user } = useAuth();
  const [products, setProducts] = React.useState<Product[]>([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  // lấy danh sách sản phẩm từ api
  React.useEffect(() => {
    if (!user) return;

    const fetchProducts = async () => {
      const response = await getProducts();

      if (response.products.length > 0) setProducts(response.products);
    };

    fetchProducts();
  }, [user]);

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
    setProducts(records);
  };

  return (
    <div className="container mx-auto px-5 pb-10 space-y-2">
      <div className="font-semibold text-3xl">Sản phẩm</div>
      {/* top table */}
      <div className="flex items-center p-3 shadow-2xs mb-2 rounded-md justify-end gap-2">
        {/* search input */}
        <Input
          placeholder="Tìm kiếm sản phẩm..."
          className="max-w-sm rounded-md p-5"
          onChange={handleChange}
        />

        {/* button add  */}
        <Button
          className="text-white px-8 py-5 rounded-md text-sm font-medium flex gap-2 bg-blue-600/90 hover:bg-blue-700"
          onClick={() => setModalOpen(true)}
        >
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

      {/* Data table */}
      <ProductTable products={products} />
    </div>
  );
}
