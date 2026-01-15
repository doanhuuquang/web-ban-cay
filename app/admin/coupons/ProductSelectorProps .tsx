"use client";

import { Search } from "lucide-react";
import React, { useEffect, useState, useMemo } from "react";
import { getProducts } from "@/lib/services/product-service";
import { Product } from "@/lib/models/product";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";

interface ProductSelectorProps {
    onSelectProducts: (products: Product[]) => void;
    selectedProductIds?: string[];
    multiSelect?: boolean;
}

export default function ProductSelector({
    onSelectProducts,
    selectedProductIds = [],
    multiSelect = false,
}: ProductSelectorProps) {
    const [valueSearch, setValueSearch] = useState("");
    const [selectedSort, setSelectedSort] = useState("DESC");
    const [internalSelectedIds, setInternalSelectedIds] = useState<string[]>(selectedProductIds);
    const [isLoading, setIsLoading] = useState(false);
    const [products, setProducts] = useState<Product[]>([]);

    // Fetch products on mount
    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                const response = await getProducts();
                if (response.products.length > 0) {
                    setProducts(response.products);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Sync external selectedProductIds với internal state
    useEffect(() => {
        setInternalSelectedIds(selectedProductIds);
    }, [selectedProductIds]);

    // Tính toán selectedProducts từ internalSelectedIds
    const selectedProducts = useMemo(() => {
        if (!products || internalSelectedIds.length === 0) return [];
        return products.filter((product) =>
            internalSelectedIds.includes(product.productId)
        );
    }, [products, internalSelectedIds]);

    // Filter products theo search
    const filteredProducts = useMemo(() => {
        if (!products) return [];

        if (!valueSearch) return products;

        const searchLower = valueSearch.toLowerCase();
        return products.filter((product) =>
            product.productName.toLowerCase().includes(searchLower) ||
            product.productId.toString().toLowerCase().includes(searchLower)
        );
    }, [products, valueSearch]);

    // Sorted products
    const sortedProducts = useMemo(() => {
        if (!filteredProducts) return [];
        return selectedSort === "DESC" ? [...filteredProducts].reverse() : filteredProducts;
    }, [filteredProducts, selectedSort]);

    const handleSelectProduct = (product: Product) => {
        let newSelectedIds: string[];

        if (multiSelect) {
            const isAlreadySelected = internalSelectedIds.includes(product.productId);

            if (isAlreadySelected) {
                newSelectedIds = internalSelectedIds.filter(id => id !== product.productId);
            } else {
                newSelectedIds = [...internalSelectedIds, product.productId];
            }
        } else {
            newSelectedIds = [product.productId];
        }

        setInternalSelectedIds(newSelectedIds);

        // Tính toán products từ IDs mới
        const newSelectedProducts = products?.filter(prod =>
            newSelectedIds.includes(prod.productId)
        ) || [];

        onSelectProducts(newSelectedProducts);
    };

    const handleRemoveProduct = (productId: string) => {
        const newSelectedIds = internalSelectedIds.filter(id => id !== productId);
        setInternalSelectedIds(newSelectedIds);

        const newSelectedProducts = products?.filter(prod =>
            newSelectedIds.includes(prod.productId)
        ) || [];

        onSelectProducts(newSelectedProducts);
    };

    const handleClearAll = () => {
        setInternalSelectedIds([]);
        onSelectProducts([]);
    };

    const isSelected = (productId: string) => {
        return internalSelectedIds.includes(productId);
    };

    if (isLoading) {
        return (
            <div className="w-full p-4 text-center text-gray-500">
                Đang tải dữ liệu...
            </div>
        );
    }

    return (
        <div className="w-full space-y-4">
            {/* HEADER */}
            <div className="flex items-center gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="TK teo tên hoặc ID..."
                        value={valueSearch}
                        onChange={(e) => setValueSearch(e.target.value)}
                        className="px-3 py-2"
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

            {/* SELECTED PRODUCTS */}
            {selectedProducts.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-md p-3">
                    <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium text-blue-900">
                            Đã chọn ({selectedProducts.length})
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
                        {selectedProducts.map((product) => (
                            <div
                                key={product.productId}
                                className="bg-white border border-blue-300 rounded-md px-3 py-1.5 flex items-center gap-2"
                            >
                                {product.images && product.images.length > 0 && (
                                    <Image
                                        src={`http://localhost:8080${product.images[0].downloadUrl}`}
                                        alt={product.productName}
                                        width={30}
                                        height={30}
                                        className="rounded object-cover"
                                        unoptimized
                                    />
                                )}
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {product.productName}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        ID: {product.productId} | Giá: {product.price.toLocaleString()}đ
                                    </p>
                                </div>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleRemoveProduct(product.productId);
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

            {/* PRODUCT LIST */}
            <div className="border rounded-lg overflow-hidden">
                {!sortedProducts || sortedProducts.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                        {valueSearch ? "Không tìm thấy sản phẩm" : "Không có dữ liệu"}
                    </div>
                ) : (
                    <div className="divide-y max-h-96 overflow-y-auto">
                        {sortedProducts.map((product) => (
                            <div
                                key={product.productId}
                                onClick={() => handleSelectProduct(product)}
                                className={`p-4 cursor-pointer transition-colors hover:bg-gray-50 ${isSelected(product.productId)
                                        ? "bg-blue-50 border-l-4 border-blue-500"
                                        : ""
                                    }`}
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        {product.images && product.images.length > 0 && (
                                            <Image
                                                src={`http://localhost:8080${product.images[0].downloadUrl}`}
                                                alt={product.productName}
                                                width={50}
                                                height={50}
                                                className="rounded object-cover"
                                                unoptimized
                                            />
                                        )}
                                        <div>
                                            <p className="font-medium text-gray-900">
                                                {product.productName}
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                ID: {product.productId}
                                            </p>
                                            <p className="text-sm text-gray-600">
                                                Giá: {product.price.toLocaleString()}đ |
                                                Tồn kho: {product.inventory.available}
                                            </p>
                                        </div>
                                    </div>
                                    {isSelected(product.productId) && (
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