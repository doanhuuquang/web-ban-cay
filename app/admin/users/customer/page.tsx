"use client";

import React, { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

import {
  Plus,
  Eye,
  EyeOff,
  Lock,
  Unlock,
} from "lucide-react";

import { addAccountMock, getAllAccountMock, getUserByIdAccountMock, updateStatusLockAccountMock } from "@/mock/accountMock";
import storeAccount from "@/store/storeAccount";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/models/user";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

function CustomerTable({ sort }: { sort: string }) {

  const currentPageRows = storeAccount((s) => s.AccountAll)
  const [statusLock, setStatusLock] = useState<User | null>(null);
  const [selectModalOpenUpdateStatusLock, setSelectModalOpenUpdateStatusLock] = useState<boolean>(false);

  const handleUpdateStateLock = (status: User) => {
    setSelectModalOpenUpdateStatusLock(true);
    setStatusLock(status)
  }

  if (!currentPageRows) return <></>

  return (
    <div className="space-y-4">
      {/* TABLE */}
      <div className="w-full overflow-x-auto rounded-xl border border-gray-200 shadow-sm h-150">
        <table className="w-full border-collapse text-left text-sm">
          <thead className="bg-gray-100 border-b">
            <tr className="font-semibold text-gray-700">
              <th className="px-4 py-3 ">Id</th>
              <th className="px-4 py-3 ">Email</th>
              <th className="px-4 py-3 ">Role</th>
              <th className="px-4 py-3 ">profile</th>
              <th className="px-4 py-3 ">lock</th>
              <th className="px-4 py-3 ">Time lock</th>
            </tr>
          </thead>

          <tbody>
            {(sort === "DESC" ? currentPageRows.slice().reverse() : currentPageRows).map((row) => {
              return (
                <tr
                  key={row.id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-4 py-3">{row.id}</td>
                  <td className="px-4 py-3">{row.email}</td>
                  <td className="px-4 py-3">{row.roles.map((role, index) => <p key={index}>{role.roleName}</p>)}</td>
                  <td className="px-4 py-3">{row.roles.some(r => r.roleName !== "ADMIN") ? (
                    <Link href={`/admin/users/customer/${row.id}`}><Eye className="w-5 h-5 text-gray-400" /></Link>
                  ) : (
                    <EyeOff className="w-5 h-5 text-gray-400" />
                  )}</td>
                  <td>
                    <Button variant="ghost" size="icon-lg"
                      onClick={(e) => {
                        e.preventDefault();
                        handleUpdateStateLock(row);
                      }}>
                      {row.enabled ?
                        (<Lock className="w-5 h-5 text-gray-400" />)
                        : <Unlock className="w-5 h-5 text-gray-400" />}
                    </Button>
                  </td>

                  {
                    !row.enabled && (<td className="px-4 py-3">{row.lockedAt ? new Date(row.lockedAt).toLocaleDateString("vi-VN") : new Date().toLocaleDateString("vi-VN")}</td>)
                  }

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectModalOpenUpdateStatusLock &&
        <EditCategoryModal closeModal={() => setSelectModalOpenUpdateStatusLock(false)}
          initialData={statusLock} />}
    </div>
  );
}

export default function CustomerPage() {

  const [modalOpenAddAccount, setModalOpenAddAccount] = useState<boolean>(false);
  const [stringById, setStringById] = useState<string>("");
  const [selectedSort, setSelectedSort] = useState<string>("DESC");

  useEffect(() => {
    const fetchAll = async () => {
      await getAllAccountMock();
    }

    fetchAll();
  }, [])

  useEffect(() => {
    const fetchById = async () => {
      if (!stringById)
        await getAllAccountMock();
      else
        await getUserByIdAccountMock(stringById)
    }

    fetchById();
  }, [stringById])


  return (
    <div className="container mx-auto px-15 pb-10 space-y-6">
      <div className="font-semibold text-3xl">Khách hàng</div>
      {/* top table */}

      <div className="flex justify-between items-center">
        <Select
          value={selectedSort}
          onValueChange={(value) => setSelectedSort(value)}
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="Sắp xếp theo..." />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={"DESC"}>Mới nhất</SelectItem>
              <SelectItem value={"ASC"}>Cũ nhất</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <div className="flex items-center py-4 justify-end gap-2">
          {/* search input */}
          <Input
            placeholder="Tìm kiếm theo Id"
            className="max-w-sm rounded-md"
            value={stringById}
            onChange={(e) => setStringById(e.target.value)}
          />

          <button
            onClick={() => setModalOpenAddAccount(true)}
            className="px-4 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-sm 
             hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 
             flex items-center gap-2 cursor-pointer"
          >
            <Plus size={18} />
            Thêm
          </button>
        </div>
      </div>

      <CustomerTable sort={selectedSort} />
      {/* Data table */}
      {modalOpenAddAccount && (
        <ModalCustomer
          closeModal={() => {
            setModalOpenAddAccount(false);
          }}
        />
      )}
    </div>
  );
}

//Modal
function EditCategoryModal({
  closeModal,
  initialData
}: {
  closeModal: () => void;
  initialData: User | null;
}) {

  const [lockedReason, setLockedReason] = useState<string>("");

  const handleSubmit = async () => {
    if (!initialData) return;
    await updateStatusLockAccountMock(initialData.id, initialData.enabled, lockedReason)
    closeModal();
  };

  if (!initialData) return <></>

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl p-6 animate-in fade-in zoom-in-95 duration-200">
        <h2 className="text-xl font-semibold mb-4">
          {initialData.enabled ? "Bạn có muốn khóa tài khoản này" : "Bạn có muốn mở khóa tài khoản này"}
        </h2>

        <div className="space-y-2 mb-4 text-sm">
          <div>
            <strong>ID:</strong>{initialData.id}
          </div>
          <div>
            <strong>Email</strong> {initialData.email}
          </div>
          <div>
            {initialData.roles && (<strong>Role : {initialData.roles.map((role, index) => <span key={index}>{role.roleName}</span>)}</strong>)}
          </div>
          {initialData.enabled &&
            (<div className="flex flex-col gap-2">
              <span>Lý do khóa tài khoản :</span>
              <Textarea
                value={lockedReason}
                onChange={(e) => setLockedReason(e.target.value)}
              />
            </div>)}

          {
            !initialData.enabled &&
            (<>
              <div>
                <strong>Ngày khóa:</strong>{new Date(initialData.lockedAt).toLocaleDateString("Vi-VN")}
              </div>
              <div>
                <strong>Lý do</strong> {initialData.lockedReason}
              </div>
            </>)
          }
        </div>

        {/* Footer buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            type="button"
            onClick={closeModal}
            className="px-4 py-2 rounded-md border hover:bg-gray-50"
          >
            Hủy
          </button>

          <button
            type="button"
            onClick={handleSubmit}
            className="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-60"
          >Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

//
function ModalCustomer({ closeModal }: { closeModal: () => void }) {
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    await addAccountMock(formState);
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
        <h2 className="text-lg font-semibold mb-4">Thêm tài khoản</h2>

        <form className="space-y-4">
          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="font-medium mb-1">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
              placeholder="Nhập email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="font-medium mb-1">
              Mật khẩu
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formState.password}
              onChange={handleChange}
              required
              className="border rounded-md p-2 focus:ring focus:ring-blue-200"
              placeholder="Nhập mật khẩu"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            Tạo tài khoản
          </button>
        </form>
      </div>
    </div>
  );
}

