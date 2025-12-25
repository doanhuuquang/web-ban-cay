"use client";
import storeProduct from "@/store/storeProduce";
import { useEffect } from "react";
import { getProductBySlugMock } from "@/mock/productMock";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Award, Heart, MapPin, Package, Share2, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Product } from "@/lib/models/product";

export default function ProductDetails({ slug }: { slug: string }) {

    useEffect(() => {
        const fetchProduct = async () => {
            await getProductBySlugMock(slug);
        }

        fetchProduct();
    }, [slug])


    const isLoading = storeProduct((state) => state.loading);
    const product: Product | null = storeProduct((state) => state.productDetails);

    if (isLoading) return (
        <div>loading...</div>
    )

    if (!product) return (
        <div>đã xảy ra lỗi dữ liệu</div>
    )


    return (
        <div className="max-w-3xl mx-auto p-4 bg-white shadow rounded">
            {/* Tên sản phẩm */}
            <h1 className="text-2xl font-bold mb-2">{product.productName}</h1>
            <p className="text-gray-600 italic mb-4">{product.description}</p>

            {/* Giá và khuyến mãi */}
            <div className="flex items-center gap-4 mb-4">
                <span className="text-lg line-through text-gray-400">
                    {product.price.toLocaleString()} VND
                </span>
                <span className="text-xl font-semibold text-red-600">
                    {product.specialPrice.toLocaleString()} VND
                </span>
                <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-sm">
                    -{product.discount}%
                </span>
            </div>

            {/* Thông tin chi tiết */}
            <div className="space-y-2 mb-6">
                <p><strong>Xuất xứ:</strong> {product.origin}</p>
                <p><strong>Chiều cao:</strong> {product.height} mm</p>
                <p><strong>Kích thước:</strong> {product.length} x {product.width} mm</p>
                <p><strong>Khối lượng:</strong> {product.weight} g</p>
                <p><strong>Tồn kho:</strong> {product.inventory.available.toLocaleString()}</p>
            </div>

            {/* Mô tả chi tiết */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Giới thiệu</h2>
                <p className="text-gray-700">{product.bio}</p>
            </div>

            {/* Đánh giá */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Đánh giá</h2>
                <p>Đã bán: {product.soldCount}</p>
                <p>Số lượt review: {product.reviewCount}</p>
                <p>Điểm trung bình: {product.avgRating} ⭐</p>
            </div>

            {/* Danh mục */}
            <div className="mb-6">
                <h2 className="text-lg font-semibold mb-2">Danh mục</h2>
                <p>{product.category.categoryName}</p>
                <p className="text-gray-600">{product.category.description}</p>
            </div>
        </div>
    );


}