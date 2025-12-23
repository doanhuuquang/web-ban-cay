"use client";

import { Button } from "@/components/ui/button";
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
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import {
  DELETE_CATEGORY_SUCCESS_MESSAGE,
  DELETE_PRODUCT_SUCCESS_MESSAGE,
} from "@/lib/constants/success-messages";
import { useAuth } from "@/lib/contexts/auth-context";
import { Category } from "@/lib/models/category";
import {
  deleteCategoryById,
  getCategories,
} from "@/lib/services/category-service";
import {
  Pencil,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
  Plus,
  Trash,
} from "lucide-react";
import React, { use } from "react";
import { toast } from "sonner";

// const categoriesData: categoriesItemProps[] = [
//   {
//     id: "1",
//     name: "Cây ngoài trời",
//     desc: "Các loại cây cảnh trồng sân vườn, ban công, chịu nắng tốt",
//     image: "🌳",
//     totalProducts: "128",
//     earning: "18.500.000₫",
//   },
//   {
//     id: "2",
//     name: "Cây trong nhà",
//     desc: "Cây trang trí nội thất, để bàn, lọc không khí",
//     image: "🪴",
//     totalProducts: "96",
//     earning: "22.300.000₫",
//   },
//   {
//     id: "3",
//     name: "Dụng cụ & vật tư",
//     desc: "Dụng cụ làm vườn, đất trồng, phân bón, bình tưới",
//     image: "🧤",
//     totalProducts: "74",
//     earning: "12.800.000₫",
//   },
//   {
//     id: "4",
//     name: "Hạt giống",
//     desc: "Hạt giống rau, hoa, cây cảnh các loại",
//     image: "🌱",
//     totalProducts: "52",
//     earning: "6.400.000₫",
//   },
//   {
//     id: "5",
//     name: "Chậu cây",
//     desc: "Chậu trồng cây gốm, sứ, nhựa, xi măng trang trí",
//     image: "🏺",
//     totalProducts: "61",
//     earning: "9.750.000₫",
//   },
// ];

// type CategoryTableProps = {
//   rows: categoriesItemProps[];
// };

function DeleteCategory({ category }: { category: Category }) {
  const [isOpenDeleteDialog, setIsOpenDeleteDialog] =
    React.useState<boolean>(false);
  const [isDeletingCategory, setIsDeletingCategory] =
    React.useState<boolean>(false);

  const handleDeleteCategory = async () => {
    try {
      setIsDeletingCategory(true);
      const code = await deleteCategoryById({
        categoryId: category.categoryId,
      });

      toast(
        code !== API_SUCCESS_CODE.DELETE_CATEGORY_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.DELETE_CATEGORY_SUCCESS
              ? ERROR_MESSAGES[code]
                ? ERROR_MESSAGES[code]
                : DEFAULT_ERROR_MESSAGE
              : DELETE_CATEGORY_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => {},
          },
        }
      );
      if (code === API_SUCCESS_CODE.DELETE_CATEGORY_SUCCESS) {
        setIsOpenDeleteDialog(false);
      }
    } finally {
      setIsDeletingCategory(false);
    }
  };
  return (
    <Dialog open={isOpenDeleteDialog} onOpenChange={setIsOpenDeleteDialog}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button size={"icon"} variant="ghost">
              <Trash
                className="size-5 cursor-pointer hover:text-red-600 transition"
                onClick={() => {}}
              />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>
          <p>Xoá danh mục</p>
        </TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Xoá danh mục</DialogTitle>
          <DialogDescription>
            Có chắc chắn muốn xoá danh mục <b>{category.categoryName}</b> không?
            <br />
            Hành động này không thể hoàn tác.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Huỷ</Button>
          </DialogClose>
          <Button onClick={() => handleDeleteCategory()} type="submit">
            {isDeletingCategory ? "Đang xoá..." : "Xoá"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function CategoryTable({ categories }: { categories: Category[] }) {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const pageCount = Math.ceil(categories.length / pageSize);

  const currentPageRows = categories.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  React.useEffect(() => {
    setPageIndex(0);
  }, [categories]);
  return (
    <div className="bg-white rounded-xl shadow-md border overflow-hidden">
      {/* TABLE */}
      <table className="w-full text-sm ">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-4 text-left ">Danh mục</th>
            <th className="p-4 text-center">Ngày tạo</th>
            <th className="p-4 text-center">Ngày sửa</th>
            <th className="p-4 text-center">Tuỳ chọn</th>
          </tr>
        </thead>

        <tbody>
          {currentPageRows.map((category) => (
            <tr
              key={category.categoryId}
              className="border-t hover:bg-gray-50 transition"
            >
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div>
                    <div className="font-medium text-gray-900">
                      {category.categoryName}
                    </div>
                    <div className="text-gray-500 text-xs">
                      {category.description}
                    </div>
                  </div>
                </div>
              </td>

              <td className="p-4 text-center text-gray-600">
                {category.createAt}
              </td>

              <td className="p-4 text-center font-medium">
                {category.updateAt}
              </td>

              <td className="p-4">
                <div className="flex items-center justify-center gap-3 text-gray-500">
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="p-1 rounded-md w-fit h-fit">
                          <Pencil className="w-5 h-5 cursor-pointer hover:text-indigo-600" />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Sửa danh mục</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="p-1 rounded-md w-fit h-fit">
                          <DeleteCategory category={category} />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Xoá danh mục</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FOOTER / PAGINATION */}
      <div className="flex items-center justify-between px-2 my-3">
        <div className="text-gray-600 text-sm">
          Trang {pageIndex + 1} trên {pageCount} — Tổng {categories.length} hàng
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

// function CategoryModal({ closeModal, onSubmit }: CategoryModalProps) {
//   const [formState, setFormState] = React.useState<categoriesItemProps>({
//     id: crypto.getRandomValues(new Uint32Array(1))[0].toString(16).slice(0, 8),
//     name: "",
//     desc: "",
//     image: null,
//     totalProducts: "",
//     earning: "",
//   });

//   const [errors, setErrors] = React.useState("");
//   type Formkeys = keyof typeof formState;
//   const fieldAlias: Record<Formkeys, string> = {
//     id: "ID",
//     name: "Tên danh mục",
//     desc: "Mô tả",
//     image: "Ảnh danh mục",
//     totalProducts: "Tổng sản phẩm",
//     earning: "Tổng thu nhập",
//   };

//   const validateForm = () => {
//     if (formState.name && formState.desc && formState.image) {
//       setErrors("");
//       return true;
//     } else {
//       const errorFields: string[] = [];
//       for (const [key, value] of Object.entries(formState)) {
//         if (!value) {
//           errorFields.push(fieldAlias[key as Formkeys]);
//         }
//       }
//       setErrors(errorFields.join(", "));
//       return false;
//     }
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormState({ ...formState, [e.target.name]: [e.target.value] });
//   };

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setFormState((prev) => ({ ...prev, image: file }));
//   };

//   const handleSubmit = () => {
//     if (!validateForm()) return;
//     onSubmit(formState);
//     closeModal();
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
//       onClick={(e) => {
//         if (e.target === e.currentTarget) closeModal();
//       }}
//     >
//       <div className="bg-white w-full max-w-md rounded-xl shadow-lg p-6 animate-in fade-in zoom-in-95 duration-200">
//         <h2 className="text-lg font-semibold mb-4">Thêm danh mục</h2>

//         <form className="space-y-4">
//           {/* Tên danh mục */}
//           <div className="flex flex-col">
//             <label htmlFor="name" className="font-medium mb-1">
//               Tên danh mục
//             </label>
//             <input
//               id="name"
//               name="name"
//               type="text"
//               onChange={handleChange}
//               value={formState.name}
//               className="border rounded-md p-2 focus:ring focus:ring-blue-200"
//             />
//           </div>

//           {/* Mô tả */}
//           <div className="flex flex-col">
//             <label htmlFor="desc" className="font-medium mb-1">
//               Mô tả
//             </label>
//             <input
//               id="desc"
//               name="desc"
//               type="text"
//               value={formState.desc}
//               onChange={handleChange}
//               className="border rounded-md p-2 focus:ring focus:ring-blue-200"
//             />
//           </div>

//           {/* Ảnh danh mục */}
//           <div className="flex flex-col">
//             <label htmlFor="image" className="font-medium mb-1">
//               Ảnh danh mục
//             </label>
//             <input
//               id="image"
//               name="image"
//               type="file"
//               onChange={handleImageChange}
//               className="border rounded-md p-2 focus:ring focus:ring-blue-200"
//             />
//           </div>

//           {/* Tổng sản phẩm */}
//           <div className="flex flex-col">
//             <label htmlFor="totalProducts" className="font-medium mb-1">
//               Tổng sản phẩm
//             </label>
//             <input
//               id="totalProducts"
//               name="totalProducts"
//               type="number"
//               value={formState.totalProducts}
//               onChange={handleChange}
//               className="border rounded-md p-2 focus:ring focus:ring-blue-200"
//             />
//           </div>

//           {/* Tổng thu nhập */}
//           <div className="flex flex-col">
//             <label htmlFor="earning" className="font-medium mb-1">
//               Tổng thu nhập
//             </label>
//             <input
//               id="earning"
//               name="earning"
//               type="number"
//               value={formState.earning}
//               onChange={handleChange}
//               className="border rounded-md p-2 focus:ring focus:ring-blue-200"
//             />
//           </div>

//           {errors && (
//             <div className="mt-2 rounded-md bg-red-50 border border-red-300 text-red-700 px-3 py-2 text-sm">
//               {`Vui lòng nhập: ${errors}`}
//             </div>
//           )}

//           {/* Submit */}
//           <button
//             type="submit"
//             className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
//             onClick={(e) => {
//               e.preventDefault();
//               handleSubmit();
//             }}
//           >
//             Thêm mới
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }

export default function CategoryPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);

  const { user } = useAuth();

  React.useEffect(() => {
    if (!user) return;

    const fetchCategories = async () => {
      const response = await getCategories();

      if (response.categories.length > 0) setCategories(response.categories);
    };
    fetchCategories();
  }, [user]);

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

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
    const record = categories.filter((item) =>
      removeVNTones(item.categoryName.toLowerCase()).includes(
        query.toLowerCase()
      )
    );

    setCategories(record);
  };

  const handleSubmit = () => {
    console.log("Thành công");
  };
  return (
    <div className="container p-6 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Danh mục sản phẩm</h1>
      {/* HEADER */}
      <div className="flex items-center justify-between p-3 border mb-2 rounded-xl">
        <input
          placeholder="Tìm kiếm danh mục..."
          onChange={handleChange}
          className="border rounded-md px-3 py-2 text-sm w-80 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex items-center gap-3">
          <button
            onClick={() => setModalOpen(true)}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-md text-sm font-medium flex gap-2"
          >
            <Plus size={18} />
            Thêm danh mục
          </button>

          {/* {modalOpen && (
            <CategoryModal
              closeModal={() => {
                setModalOpen(false);
              }}
              onSubmit={handleSubmit}
            />
          )} */}
        </div>
      </div>
      <CategoryTable categories={categories} />
    </div>
  );
}
