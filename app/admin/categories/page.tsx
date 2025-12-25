"use client";


import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {

  Plus,
  Trash,
  SquarePen,
} from "lucide-react";
import React, { useEffect } from "react";

import {
  getAllCategoryMock, addCategoryMock, updateCategoryMock,
  deleteCategoryMock,
  getCategoryByIdOrNameMock
} from "@/mock/categoryMock";
import storeCategory from "@/store/storeCategory";
import { Category } from "@/lib/models/category";
import { Button } from "@/components/ui/button";


function CategoryTable() {

  const isloading = storeCategory((s) => s.loading);
  const currentPageRows = storeCategory((s) => s.categoryAll);

  const [modalOpenUPdate, setModalOpenUpdate] = React.useState<boolean>(false);
  const [valuesUpdate, setValuesUpdate] = React.useState<Category | null>(null);

  const [modalOpenDelete, setModalOpenDelete] = React.useState<boolean>(false);

  const handlerUpdateCategory = (data: Category) => {
    setModalOpenUpdate(true);
    setValuesUpdate(data);
  }

  const handlerDeleteCategory = (data: Category) => {
    setModalOpenDelete(true);
    setValuesUpdate(data);
  }

  if (isloading) return (
    <div className="container p-6 min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Đang tải dữ liệu...</p>
      </div>
    </div>
  );

  if (!currentPageRows) return (
    <div className="text-center"> không có dữ liệu</div>
  )


  return (
    <div className="bg-white rounded-xl shadow-md border overflow-hidden">
      {/* TABLE */}
      <table className="w-full text-sm ">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-4 text-left ">Danh mục</th>
            <th className="p-4 text-center">Loại sản phẩm</th>
            <th className="p-4 text-center">Mô tả</th>
            <th className="p-4 text-center">Ngày Tạo</th>
            <th className="p-4 text-center">Ngày Update</th>
            <th className="p-4 text-center">Tuỳ chọn</th>
          </tr>
        </thead>

        <tbody>
          {currentPageRows.map((row) => (
            <tr key={row.categoryId} className="border-t hover:bg-gray-50 transition">
              <td className="p-4">
                <div className="flex items-center gap-3">

                  <div>
                    <div className="font-medium text-gray-900">{row.categoryId}</div>
                  </div>
                </div>
              </td>

              <td className="p-4 text-center text-gray-600">
                {row.categoryName}
              </td>

              <td className="p-4 text-center font-medium">{row.description}</td>
              <td className="p-4 text-center font-medium">{row.createAt.toString()}</td>
              <td className="p-4 text-center font-medium">{row.updateAt.toString()}</td>

              <td className="p-4">
                <div className="flex items-center justify-center gap-3 text-gray-500">
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={(e) => { e.preventDefault(); handlerUpdateCategory(row); }}
                          size={"icon"} variant="ghost">
                          <SquarePen className="size-5 " />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Sửa sản phẩm</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button onClick={(e) => { e.preventDefault(); handlerDeleteCategory(row); }}
                          className="bg-white hover:bg-white" size={"icon"}>
                          <Trash className="w-5 h-5 cursor-pointer text-red-600 hover:text-red-700" />
                        </Button>
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
      {modalOpenUPdate && (
        <EditCategoryModal
          closeModal={() => {
            setModalOpenUpdate(false);
          }}
          initialData={valuesUpdate}
        />
      )}

      {modalOpenDelete && (
        <DeleteCategoryModal
          closeModal={() => {
            setModalOpenDelete(false);
          }}
          initialData={valuesUpdate}
        />
      )}
    </div>
  );
}

type CategoryModalUpdate = {
  closeModal: () => void;
  initialData: Category | null;
}


function CategoryModal({ closeModal }: { closeModal: () => void }) {
  const [formState, setFormState] = React.useState({
    categoryName: "",
    description: ""
  });

  const [errors, setErrors] = React.useState("");

  const validateForm = () => {
    if (formState.categoryName && formState.description) {
      setErrors("");
      return true;
    } else {
      const errorFields: string[] = [];
      if (!formState.categoryName) errorFields.push("Tên danh mục");
      if (!formState.description) errorFields.push("Mô tả");
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    const now = new Date();

    const data = {
      categoryName: formState.categoryName,
      description: formState.description,
      createAt: now,
      updateAt: now
    };

    await addCategoryMock(data)

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
        <h2 className="text-lg font-semibold mb-4">Thêm danh mục</h2>
        <form className="space-y-4">
          {/* Tên danh mục */}
          <div className="flex flex-col">
            <label htmlFor="categoryName" className="font-medium mb-1">
              Loại sản phẩm
            </label>
            <input
              id="categoryName"
              name="categoryName"
              type="text"
              onChange={handleChange}
              value={formState.categoryName}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Mô tả */}
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium mb-1">
              Mô tả
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={formState.description}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Thêm mới
          </button>
        </form>
      </div>
    </div>
  );



}


function EditCategoryModal({ closeModal, initialData }: CategoryModalUpdate) {
  const [formState, setFormState] = React.useState(initialData);

  const [errors, setErrors] = React.useState("");

  const validateForm = () => {
    if (!formState) return;
    if (formState.categoryName && formState.description) {
      setErrors("");
      return true;
    } else {
      const errorFields: string[] = [];
      if (!formState.categoryName) errorFields.push("Tên danh mục");
      if (!formState.description) errorFields.push("Mô tả");
      setErrors(errorFields.join(", "));
      return false;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!formState) return;
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!validateForm() || !formState) return;

    const now = new Date();

    const data = {
      categoryId: formState.categoryId,
      categoryName: formState.categoryName,
      description: formState.description,
      createAt: initialData ? initialData.createAt : now,
      updateAt: now
    };

    await updateCategoryMock(data)

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
        <h2 className="text-lg font-semibold mb-4">Sửa danh mục</h2>

        <form className="space-y-4">
          {/* Tên danh mục */}
          <div className="flex flex-col">
            <label htmlFor="categoryName" className="font-medium mb-1">
              Loại sản phẩm
            </label>
            <input
              id="categoryName"
              name="categoryName"
              type="text"
              onChange={handleChange}
              value={formState ? formState.categoryName : ""}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Mô tả */}
          <div className="flex flex-col">
            <label htmlFor="description" className="font-medium mb-1">
              Mô tả
            </label>
            <input
              id="description"
              name="description"
              type="text"
              value={formState ? formState.description : ""}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
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
            Chỉnh sửa sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
}


function DeleteCategoryModal({ closeModal, initialData }: CategoryModalUpdate) {

  const handleDelete = async () => {
    if (!initialData) return closeModal();

    await deleteCategoryMock(initialData.categoryId);
    closeModal();
  };

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={closeModal}
    >
      <div
        className="bg-white w-full max-w-md rounded-xl shadow-lg p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold mb-4 text-red-600">
          Xóa danh mục
        </h2>

        <ul className="mt-2 mb-4 text-sm text-gray-700">
          <li><strong>ID:</strong> {initialData?.categoryId}</li>
          <li><strong>Tên:</strong> {initialData?.categoryName}</li>
        </ul>

        <div className="flex gap-2">
          <button
            className="flex-1 bg-gray-300 py-2 rounded-md"
            onClick={closeModal}
          >
            Huỷ
          </button>

          <button
            className="flex-1 bg-red-600 text-white py-2 rounded-md"
            onClick={handleDelete}
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
}


export default function CategoryPage() {

  const [valueSearch, setValueSearch] = React.useState<string>("");

  useEffect(() => {
    const fetchCategory = async () => {
      await getAllCategoryMock();
    }

    fetchCategory();
  }, [])

  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  useEffect(() => {
    const feactGetCategory = async (valueSearch: string) => {
      if (!valueSearch)
        await getAllCategoryMock();
      else
        await getCategoryByIdOrNameMock(valueSearch);
    }

    feactGetCategory(valueSearch);
  }, [valueSearch])

  return (
    <div className="container p-6 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Danh mục sản phẩm</h1>
      {/* HEADER */}
      <div className="flex items-center justify-between p-3 border mb-2 rounded-xl">
        <input
          placeholder="Tìm kiếm danh mục..."
          value={valueSearch}
          onChange={
            (e) => setValueSearch(e.target.value)
          }
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

          {modalOpen && (
            <CategoryModal
              closeModal={() => {
                setModalOpen(false);
              }}
            />
          )}

        </div>
      </div>
      <CategoryTable />

    </div>
  );
}
