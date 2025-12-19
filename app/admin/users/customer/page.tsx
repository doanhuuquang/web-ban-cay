"use client";

import {
  customerList,
  customerItemProp,
} from "@/app/admin/constants/customer-data";
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
import PopupDelete from "../../_components/popup-delete";

type CustomerTableProps = {
  rows: customerItemProp[];
  editRow: (id: string) => void;
  popup: (id: string) => void;
};

function CustomerTable({ rows, editRow, popup }: CustomerTableProps) {
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
              <th className="px-4 py-3 ">Id</th>
              <th className="px-4 py-3 ">Tên khách hàng</th>
              <th className="px-4 py-3 ">Số điện thoại</th>
              <th className="px-4 py-3 ">Địa chỉ</th>
              <th className="px-4 py-3 ">Email</th>
              <th className="px-4 py-3 ">Tuỳ chọn</th>
            </tr>
          </thead>

          <tbody>
            {currentPageRows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.customerName}</td>
                  <td className="px-4 py-3">{row.phoneNumber}</td>
                  <td className="px-4 py-3">{row.address}</td>
                  <td className="px-4 py-3">{row.email}</td>
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
                            <p>Sửa thông in</p>
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
                                onClick={() => popup(row.id)}
                              />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Xoá khách hàng</p>
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

type ModalCustomerProps = {
  closeModal: () => void;
  onSubmit: (data: customerItemProp) => void;
  defaultValue: customerItemProp | null;
};

function ModalCustomer({
  closeModal,
  onSubmit,
  defaultValue,
}: ModalCustomerProps) {
  const [formState, setFormSate] = React.useState<customerItemProp>(
    defaultValue || {
      id: crypto
        .getRandomValues(new Uint32Array(1))[0]
        .toString(16)
        .slice(0, 8),
      customerName: "",
      phoneNumber: "",
      address: "",
      email: "",
    }
  );

  const [errors, setErrors] = React.useState("");
  type FormKeys = keyof typeof formState;
  const fieldAlias: Record<FormKeys, string> = {
    id: "ID",
    customerName: "Tên khách hàng",
    phoneNumber: "Số điện thoại",
    address: "Địa chỉ",
    email: "Email",
    avatarUrl: "Ảnh đại diện",
  };

  const validateForm = () => {
    if (formState.customerName && formState.phoneNumber && formState.address) {
      setErrors("");
      return true;
    } else {
      const errorFields = [];

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
        <h2 className="text-lg font-semibold mb-4">Thêm khách hàng</h2>

        <form className="space-y-4">
          {/* Tên khách hàng */}
          <div className="flex flex-col">
            <label htmlFor="customerName" className="font-medium mb-1">
              Tên khách hàng
            </label>
            <input
              id="customerName"
              name="customerName"
              onChange={handleChange}
              value={formState.customerName}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Số điện thoại */}
          <div className="flex flex-col">
            <label htmlFor="phoneNumber" className="font-medium mb-1">
              Số điện thoại
            </label>
            <input
              id="phoneNumber"
              name="phoneNumber"
              type="number"
              value={formState.phoneNumber}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Địa chỉ */}
          <div className="flex flex-col">
            <label htmlFor="address" className="font-medium mb-1">
              Địa chỉ
            </label>
            <input
              id="address"
              name="address"
              type="text"
              value={formState.address}
              onChange={handleChange}
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="status" className="font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              value={formState.email}
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
            {defaultValue ? "Cập nhật" : "Thêm mới"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function CustomerPage() {
  const [customers, setCustomers] =
    React.useState<customerItemProp[]>(customerList);
  const [filteredCustomers, setFilteredCustomers] =
    React.useState<customerItemProp[]>(customerList);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [popupOpen, setPopupOpen] = React.useState<boolean>(false);
  const [rowToEdit, setRowToEdit] = React.useState<string | null>(null);
  const [deleteId, setDeleteId] = React.useState<string | null>(null);

  // lưu data ở local
  React.useEffect(() => {
    const saved = localStorage.getItem("data-customer");
    const data = saved ? JSON.parse(saved) : customerList;

    setCustomers(data);
    setFilteredCustomers(data);
  }, []);
  React.useEffect(() => {
    localStorage.setItem("data-customer", JSON.stringify(customers));
  }, [customers]);

  //
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
    const records = customers.filter((item) =>
      removeVNTones(item.customerName.toLowerCase()).includes(
        query.toLowerCase()
      )
    );
    setFilteredCustomers(records);
  };

  const handleDeleteCustomer = (currId: string) => {
    setCustomers(customers.filter((p) => p.id !== currId));
    setFilteredCustomers(customers.filter((p) => p.id !== currId));
  };

  const handleEditCustomer = (id: string) => {
    setRowToEdit(id);
    setModalOpen(true);
  };

  const handleSubmit = (newRow: customerItemProp) => {
    setCustomers((prev) => {
      let updated: customerItemProp[];
      if (rowToEdit === null) {
        updated = [...prev, newRow];
      } else {
        updated = prev.map((row) => (row.id === rowToEdit ? newRow : row));
      }

      setFilteredCustomers(updated);
      return updated;
    });

    setRowToEdit(null);
  };

  return (
    <div className="container mx-auto px-15 pb-10 space-y-6">
      <div className="font-semibold text-3xl">Khách hàng</div>
      {/* top table */}
      <div className="flex items-center py-4 justify-end gap-2">
        {/* search input */}
        <Input
          placeholder="Tìm kiếm khách hàng..."
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
          <ModalCustomer
            closeModal={() => {
              setModalOpen(false);
              setRowToEdit(null);
            }}
            onSubmit={handleSubmit}
            defaultValue={
              rowToEdit !== null
                ? customers.find((p) => p.id == rowToEdit) ?? null
                : null
            }
          />
        )}
      </div>

      {/* Data table */}
      <CustomerTable
        rows={filteredCustomers}
        editRow={handleEditCustomer}
        popup={openDeletePopup}
      />

      {popupOpen && deleteId && (
        <PopupDelete
          closePopupDelete={() => setPopupOpen(false)}
          deleteButton={() => {
            handleDeleteCustomer(deleteId);
            setPopupOpen(false);
            setDeleteId(null);
          }}
        />
      )}
    </div>
  );
}
