"use client";

import {
  Pencil,
  MoreVertical,
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";
import React from "react";

type categoriesItemProps = {
  id: string;
  name: string;
  desc: string;
  image: string;
  totalProducts?: string;
  earning?: string;
};

const categories: categoriesItemProps[] = [
  {
    id: "1",
    name: "Cây ngoài trời",
    desc: "Các loại cây cảnh trồng sân vườn, ban công, chịu nắng tốt",
    image: "🌳",
    totalProducts: "128",
    earning: "18.500.000₫",
  },
  {
    id: "2",
    name: "Cây trong nhà",
    desc: "Cây trang trí nội thất, để bàn, lọc không khí",
    image: "🪴",
    totalProducts: "96",
    earning: "22.300.000₫",
  },
  {
    id: "3",
    name: "Dụng cụ & vật tư",
    desc: "Dụng cụ làm vườn, đất trồng, phân bón, bình tưới",
    image: "🧤",
    totalProducts: "74",
    earning: "12.800.000₫",
  },
  {
    id: "4",
    name: "Hạt giống",
    desc: "Hạt giống rau, hoa, cây cảnh các loại",
    image: "🌱",
    totalProducts: "52",
    earning: "6.400.000₫",
  },
  {
    id: "5",
    name: "Chậu cây",
    desc: "Chậu trồng cây gốm, sứ, nhựa, xi măng trang trí",
    image: "🏺",
    totalProducts: "61",
    earning: "9.750.000₫",
  },
];

type CategoryTableProps = {
  rows: categoriesItemProps[];
};

function CategoryTable({ rows }: CategoryTableProps) {
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
    <div className="bg-white rounded-xl shadow-md border">
      {/* HEADER */}
      <div className="flex items-center justify-between p-4 border-b">
        <input
          placeholder="Tìm kiếm danh mục..."
          className="border rounded-md px-3 py-2 text-sm w-60 focus:outline-none focus:ring-2 focus:ring-indigo-400"
        />

        <div className="flex items-center gap-3">
          <button className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium">
            + Thêm danh mục
          </button>
        </div>
      </div>

      {/* TABLE */}
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-4 text-left">Danh mục</th>
            <th className="p-4 text-center">Tổng sản phẩm</th>
            <th className="p-4 text-center">Tổng thu nhập</th>
            <th className="p-4 text-center">Tuỳ chọn</th>
          </tr>
        </thead>

        <tbody>
          {currentPageRows.map((row) => (
            <tr key={row.id} className="border-t hover:bg-gray-50 transition">
              <td className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-gray-100 flex items-center justify-center text-lg">
                    {row.image}
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{row.name}</div>
                    <div className="text-gray-500 text-xs">{row.desc}</div>
                  </div>
                </div>
              </td>

              <td className="p-4 text-center text-gray-600">
                {row.totalProducts}
              </td>

              <td className="p-4 text-center font-medium">{row.earning}</td>

              <td className="p-4">
                <div className="flex items-center justify-center gap-3 text-gray-500">
                  <Pencil className="w-4 h-4 cursor-pointer hover:text-indigo-600" />
                  <MoreVertical className="w-4 h-4 cursor-pointer hover:text-indigo-600" />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* FOOTER / PAGINATION */}
      <div className="flex items-center justify-between px-2 my-3">
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

export default function CategoryPage() {
  return (
    <div className="container p-6 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Danh mục sản phẩm</h1>
      <CategoryTable rows={categories} />
    </div>
  );
}
