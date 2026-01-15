"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import {
    getAllCategoryMock,
    getCategoryByIdOrNameMock,
} from "@/mock/categoryMock";
import storeCategory from "@/store/storeCategory";
import { Category } from "@/lib/models/category";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface CategorySelectorProps {
    onSelectCategories: (categories: Category[]) => void;
    selectedCategoryIds?: string[];
    multiSelect?: boolean;
}

export default function CategorySelector({
    onSelectCategories,
    selectedCategoryIds = [],
    multiSelect = false,
}: CategorySelectorProps) {
    const [valueSearch, setValueSearch] = useState("");
    const [selectedSort, setSelectedSort] = useState("DESC");
    const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(selectedCategoryIds);

    const isLoading = storeCategory((s) => s.loading);
    const categories = storeCategory((s) => s.categoryAll);

    // Fetch categories on mount
    useEffect(() => {
        getAllCategoryMock();
    }, []);

    // Search với debounce
    useEffect(() => {
        const timeout = setTimeout(() => {
            if (!valueSearch) {
                getAllCategoryMock();
            } else {
                getCategoryByIdOrNameMock(valueSearch);
            }
        }, 300);

        return () => clearTimeout(timeout);
    }, [valueSearch]);

    // Sync external selectedCategoryIds với internal state
    useEffect(() => {
        setInternalSelectedIds(selectedCategoryIds);
    }, [selectedCategoryIds]);

    // Tính toán selectedCategories từ internalSelectedIds - KHÔNG dùng setState
    const selectedCategories = useMemo(() => {
        if (!categories || internalSelectedIds.length === 0) return [];
        return categories.filter((cat) =>
            internalSelectedIds.includes(cat.categoryId)
        );
    }, [categories, internalSelectedIds]);

    // Sorted categories
    const sortedCategories = useMemo(() => {
        if (!categories) return [];
        return selectedSort === "DESC" ? [...categories].reverse() : categories;
    }, [categories, selectedSort]);

    const handleSelectCategory = (category: Category) => {
        let newSelectedIds: string[];

        if (multiSelect) {
            const isAlreadySelected = internalSelectedIds.includes(category.categoryId);

            if (isAlreadySelected) {
                newSelectedIds = internalSelectedIds.filter(id => id !== category.categoryId);
            } else {
                newSelectedIds = [...internalSelectedIds, category.categoryId];
            }
        } else {
            newSelectedIds = [category.categoryId];
        }

        setInternalSelectedIds(newSelectedIds);

        // Tính toán categories từ IDs mới
        const newSelectedCategories = categories?.filter(cat =>
            newSelectedIds.includes(cat.categoryId)
        ) || [];

        onSelectCategories(newSelectedCategories);
    };

    const handleRemoveCategory = (categoryId: string) => {
        const newSelectedIds = internalSelectedIds.filter(id => id !== categoryId);
        setInternalSelectedIds(newSelectedIds);

        const newSelectedCategories = categories?.filter(cat =>
            newSelectedIds.includes(cat.categoryId)
        ) || [];

        onSelectCategories(newSelectedCategories);
    };

    const handleClearAll = () => {
        setInternalSelectedIds([]);
        onSelectCategories([]);
    };

    const isSelected = (categoryId: string) => {
        return internalSelectedIds.includes(categoryId);
    };


    return (
        <div className="w-full space-y-4">

            {isLoading && (
                <div className="w-full p-2 text-center text-gray-500 text-sm">
                    Đang tải dữ liệu...
                </div>
            )}
            {/* HEADER */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Tìm kiếm theo tên hoặc ID..."
                        value={valueSearch}
                        onChange={(e) => setValueSearch(e.target.value)}
                        className="px-4 border rounded-md pl-10 pr-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                </div>

                <Select value={selectedSort} onValueChange={setSelectedSort}>
                    <SelectTrigger className="w-40">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="DESC">Mới nhất</SelectItem>
                            <SelectItem value="ASC">Cũ nhất</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            {/* SELECTED CATEGORIES */}
            {selectedCategories.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-blue-900">
                            Đã chọn ({selectedCategories.length})
                            {multiSelect && " - Chế độ chọn nhiều"}
                        </p>
                        <button
                            onClick={handleClearAll}
                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                        >
                            Bỏ chọn tất cả
                        </button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {selectedCategories.map((category) => (
                            <div
                                key={category.categoryId}
                                className="bg-white border border-blue-300 rounded-md px-3 py-1.5 flex items-center gap-2"
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {category.categoryName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        ID: {category.categoryId}
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveCategory(category.categoryId);
                                    }}
                                    className="text-gray-400 hover:text-red-500"
                                >
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* CATEGORY LIST */}
            <div className="border rounded-lg overflow-hidden">
                {!sortedCategories || sortedCategories.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">Không có dữ liệu</div>
                ) : (
                    <div className="divide-y max-h-96 overflow-y-auto">
                        {sortedCategories.map((category) => (
                            <div
                                key={category.categoryId}
                                onClick={() => handleSelectCategory(category)}
                                className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${isSelected(category.categoryId)
                                    ? "bg-blue-50 border-l-4 border-blue-500"
                                    : ""
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-medium text-gray-900">
                                            {category.categoryName}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            ID: {category.categoryId}
                                        </p>
                                    </div>
                                    {isSelected(category.categoryId) && (
                                        <div className="h-5 w-5 rounded-full bg-blue-500 flex items-center justify-center">
                                            <svg
                                                className="h-3 w-3 text-white"
                                                fill="none"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path d="M5 13l4 4L19 7"></path>
                                            </svg>
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}