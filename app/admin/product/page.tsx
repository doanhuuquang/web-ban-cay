"use client";

import { productItemProps } from "@/app/admin/constants/products-data";
import React from "react";
import { Input } from "@/components/ui/input";

import {
  SquarePen,
  Plus,
  Trash,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import PopupDelete from "../_components/popup-delete";
import { useAuth } from "@/lib/contexts/auth-context";

type ProductTableProps = {
  rows: productItemProps[];
  editRow: (id: string) => void;
  popup: (id: string) => void;
};

function ProductTable({ rows, editRow, popup }: ProductTableProps) {
  const [pageIndex, setPageIndex] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(10);

  const pageCount = Math.ceil(rows.length / pageSize);

  const currentPageRows = rows.slice(
    pageIndex * pageSize,
    pageIndex * pageSize + pageSize
  );

  React.useEffect(() => {
    setPageIndex(0);
  }, [rows]);
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
            {currentPageRows.map((row) => {
              const statusStyles = {
                "Chờ xử lý": "bg-yellow-100 text-yellow-700",
                "Đang xử lý": "bg-blue-100 text-blue-700",
                "Thành công": "bg-green-100 text-green-700",
                "Thất bại": "bg-red-100 text-red-700",
              };

              return (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.productName}</td>
                  <td className="px-4 py-3">{row.categories}</td>
                  <td className="px-4 py-3">{row.price}</td>
                  <td className="px-4 py-3">{row.quantity}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-md text-xs font-medium ${
                        statusStyles[row.status] || "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <span className="flex items-center gap-3 text-gray-600">
                      {/* edit */}
                      <div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="p-1 rounded-md w-fit h-fit">
                              <SquarePen
                                className="cursor-pointer hover:text-blue-600 transition"
                                onClick={() => editRow(row.id)}
                              />
                            </div>
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
                            <div className="p-1 rounded-md w-fit h-fit">
                              <Trash
                                className="cursor-pointer hover:text-red-600 transition"
                                // onClick={() => deleteRow(row.id)}
                                onClick={() => popup(row.id)}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Xoá sản phẩm</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
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
          Trang {pageIndex + 1} trên {pageCount} — Tổng {rows.length} hàng
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

type ModalProductProps = {
  closeModal: () => void;
  onSubmit: (data: productItemProps) => void;
  defaultValue: productItemProps | null;
};

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

  const [products, setProducts] = React.useState<productItemProps[]>([]);
  const [filteredProducts, setFilteredProducts] = React.useState<
    productItemProps[]
  >([]);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [popupOpen, setPopupOpen] = React.useState<boolean>(false);
  const [rowToEdit, setRowToEdit] = React.useState<string | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  // lấy danh sách sản phẩm từ api
  React.useEffect(() => {
    if (!user) return;
  }, [user]);

  const openDeletePopup = (id: string) => {
    setDeleteId(id);
    setPopupOpen(true);
  };

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

  const handleDeleteProduct = (currId: string) => {
    setProducts(products.filter((p) => p.id !== currId));
    setFilteredProducts(products.filter((p) => p.id !== currId));
  };

  const handleEditProduct = (id: string) => {
    setRowToEdit(id);
    setModalOpen(true);
  };

  const handleSubmit = (newRow: productItemProps) => {
    setProducts((prev) => {
      let update: productItemProps[];
      if (rowToEdit === null) {
        update = [...prev, newRow];
      } else {
        update = prev.map((row) => (row.id === rowToEdit ? newRow : row));
      }

      setFilteredProducts(update);
      return update;
    });

    setRowToEdit(null);
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

        <button
          onClick={() => setModalOpen(true)}
          className="px-4 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm 
             hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 
             flex items-center gap-2 cursor-pointer"
        >
          <Plus size={18} />
          Thêm
        </button>

        {modalOpen && (
          <ModalProduct
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={
              rowToEdit !== null
                ? products.find((p) => p.id == rowToEdit) ?? null
                : null
            }
          />
        )}
      </div>

      {/* Data table */}
      <ProductTable
        rows={filteredProducts}
        editRow={handleEditProduct}
        popup={openDeletePopup}
      />

      {popupOpen && deleteId && (
        <PopupDelete
          closePopupDelete={() => setPopupOpen(false)}
          deleteButton={() => {
            handleDeleteProduct(deleteId);
            setPopupOpen(false);
            setDeleteId(null);
          }}
        />
      )}
    </div>
  );
}
