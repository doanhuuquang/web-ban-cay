"use client";
import storeProduct from "@/store/storeProduce";
import { useEffect } from "react";
import { getProductBySlugMock } from "@/mock/productMock";
import { Product } from "@/lib/models/product";
import Link from "next/link";
import {
  ArrowBigLeft,
  CalendarMinus2,
  CircleDollarSign,
  Info,
  MessageSquareText,
  Package,
  Ruler,
  Tag,
  TrendingUp,
} from "lucide-react";

export default function ProductDetails({ slug }: { slug: string }) {
  const product: Product | null = storeProduct((state) => state.productDetails);

  function getSavedPrice(price?: number, specialPrice?: number) {
    return Math.max((price ?? 0) - (specialPrice ?? 0), 0);
  }
  const savedPrice = getSavedPrice(product?.price, product?.specialPrice);

  useEffect(() => {
    const fetchProduct = async () => {
      await getProductBySlugMock(slug);
    };

    fetchProduct();
  }, [slug]);
  
  const isLoading = storeProduct((state) => state.loading);

  if (isLoading) return <div>loading...</div>;

  if (!product) return <div>đã xảy ra lỗi dữ liệu</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 bg-white shadow rounded space-y-4">
      <Link
        href="/admin/product"
        className="text-sm flex w-fit gap-1 text-accent py-2 px-3 bg-blue-500 rounded-xl"
      >
        <ArrowBigLeft size={20} />
        Quay lại
      </Link>

      {/* Tên sản phẩm */}
      <div className="w-full border border-gray-200 p-4 rounded-xl my-6">
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold">{product.productName}</h1>
          <span className="ml-3 text-sm text-gray-600">
            Mã SP:{" "}
            <span className="px-3 py-1 bg-gray-100 rounded-sm font-semibold">
              {product.productId}
            </span>
          </span>
        </div>
        <div className="w-full mt-1 flex items-center justify-start">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className="w-4 h-4 text-yellow-400 fill-current"
              viewBox="0 0 20 20"
            >
              <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
            </svg>
          ))}
          <p className="ml-1">5.0</p>
          <p
            className={`ml-5 py-1 px-3 text-sm border rounded-md text-white font-semibold ${
              product.inventory.available === 0
                ? "bg-red-400 border-red-600"
                : "bg-blue-500 border-blue-600"
            }`}
          >
            {product.inventory.available === 0 ? "Hết hàng" : "Còn hàng"}
          </p>
        </div>
        <div className="rounded-xl w-full h-fit overflow-hidden mt-4">
          <p className="">Mô tả sản phẩm:</p>
          <p className="text-gray-600 italic ">{product.description}</p>
        </div>
      </div>

      {/* <!-- Stats Cards --> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* <!-- Giá bán --> */}
        <div className="group transition-all duration-300 overflow-hidden relative hover:scale-105 cursor-pointer bg-white rounded-lg shadow-sm p-6 border-l-4 border-green-500">
          <div className="absolute top-0 right-0 w-20 h-20 bg-green-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>

          <div className="flex items-center text-green-600 mb-3">
            <CircleDollarSign className="w-5 h-5 mr-2" />
            <span className="font-medium">Giá bán</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {product.specialPrice.toLocaleString()} đ
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400 line-through">
              {product.price.toLocaleString()} đ
            </span>
            <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
              Giảm {product.discount}%
            </span>
          </div>
        </div>

        {/* <!-- Tồn kho --> */}
        <div className="group transition-all duration-300 overflow-hidden relative hover:scale-105 cursor-pointer bg-white rounded-lg shadow-sm p-6 border-l-4 border-blue-500">
          <div className="absolute top-0 right-0 w-20 h-20 bg-blue-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>

          <div className="flex items-center text-blue-600 mb-3">
            <Package className="w-5 h-5 mr-2" />
            <span className="font-medium">Tồn kho</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {product.inventory.available}
          </div>
          <div className="text-sm text-gray-500">sản phẩm còn lại</div>
        </div>

        {/* <!-- Đã bán --> */}
        <div className="group transition-all duration-300 overflow-hidden relative hover:scale-105 cursor-pointer bg-white rounded-lg shadow-sm p-6 border-l-4 border-purple-500">
          <div className="absolute top-0 right-0 w-20 h-20 bg-purple-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center text-purple-600 mb-3">
            <TrendingUp className="w-5 h-5 mr-2" />
            <span className="font-medium">Đã bán</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {product.soldCount}
          </div>
          <div className="text-sm text-gray-500">đơn hàng thành công</div>
        </div>

        {/* <!-- Đánh giá --> */}
        <div className="group transition-all duration-300 overflow-hidden relative hover:scale-105 cursor-pointer bg-white rounded-lg shadow-sm p-6 border-l-4 border-orange-500">
          <div className="absolute top-0 right-0 w-20 h-20 bg-red-50 rounded-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
          <div className="flex items-center text-orange-600 mb-3">
            <MessageSquareText className="w-5 h-5 mr-2" />
            <span className="font-medium">Đánh giá</span>
          </div>
          <div className="text-3xl font-bold text-gray-800 mb-2">
            {product.reviewCount}
          </div>
          <div className="text-sm text-gray-500">lượt đánh giá</div>
        </div>
      </div>

      {/* <!-- Product Information --> */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* <!-- Thông tin sản phẩm --> */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <Package className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Thông tin sản phẩm
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex border-b pb-4">
              <span className="text-gray-600 w-40">Tên sản phẩm:</span>
              <span className="text-gray-800 font-medium flex-1">
                {product.productName}
              </span>
            </div>

            <div className="flex border-b pb-4">
              <span className="text-gray-600 w-40">Xuất xứ:</span>
              <span className="text-gray-800 font-medium flex-1">
                {product.origin}
              </span>
            </div>

            <div className="flex border-b pb-4">
              <span className="text-gray-600 w-40">Danh mục:</span>
              <span className="text-gray-800 font-medium flex-1">
                {product.category.categoryName}
              </span>
            </div>

            <div className="flex pb-4">
              <span className="text-gray-600 w-40">Ngày tạo:</span>
              <div className="flex items-center text-gray-800 font-medium">
                <CalendarMinus2 className="w-4 h-4 mr-2 text-gray-500" />
                {product.createAt.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Kích thước & Trọng lượng --> */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <Ruler className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">
              Kích thước & Trọng lượng
            </h2>
          </div>

          <div className="space-y-4">
            <div className="flex border-b pb-4">
              <span className="text-gray-600 w-40">Chiều dài:</span>
              <span className="text-gray-800 font-medium flex-1">
                {product.length} cm
              </span>
            </div>

            <div className="flex border-b pb-4">
              <span className="text-gray-600 w-40">Chiều rộng:</span>
              <span className="text-gray-800 font-medium flex-1">
                {product.width} cm
              </span>
            </div>

            <div className="flex border-b pb-4">
              <span className="text-gray-600 w-40">Chiều cao:</span>
              <span className="text-gray-800 font-medium flex-1">
                {product.height} cm
              </span>
            </div>

            <div className="flex pb-4">
              <span className="text-gray-600 w-40">Khối lượng:</span>
              <span className="text-gray-800 font-medium flex-1">
                {product.weight} kg
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mô tả chi tiết */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center mb-4">
          <Info className="w-5 h-5 mr-2 text-blue-600" />
          <h3 className="text-base font-semibold text-gray-800">
            Thông tin thêm
          </h3>
        </div>
        <p className="text-gray-700 leading-relaxed">{product.bio}</p>
      </div>

      {/* detail price */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center mb-6 pb-4 border-b">
          <CircleDollarSign className="w-5 h-5 mr-2 text-green-600" />
          <h2 className="text-lg font-semibold text-gray-800">Chi tiết giá</h2>
        </div>

        {/* Price Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Giá gốc */}
          <div className="relative bg-gray-50 rounded-2xl p-6 border-2 border-gray-200">
            <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center">
              <Tag className="w-6 h-6 text-gray-600" />
            </div>
            <div className="text-sm text-gray-600 mb-2">Giá gốc</div>
            <div className="text-3xl font-bold text-gray-900">
              {product.price.toLocaleString()} đ
            </div>
            <div className="text-xs text-gray-500">Giá niêm yết chính thức</div>
          </div>

          {/* Giảm giá */}
          <div className="relative bg-red-50 rounded-2xl p-6 border-2 border-red-200">
            <div className="absolute top-4 right-4 w-12 h-12 bg-white rounded-full shadow-md flex items-center justify-center animate-bounce">
              <span className="text-2xl">🔥</span>
            </div>
            <div className="text-sm text-red-600 mb-2">Giảm giá</div>
            <div className="text-3xl font-bold text-red-600 mb-2">
              {product.discount}%
            </div>
            <div className="text-sm text-red-500">
              Tiết kiệm: {savedPrice.toLocaleString()} đ
            </div>
          </div>

          {/* Giá sau giảm */}
          <div className="relative bg-green-50 rounded-2xl p-6 border-2 border-green-200">
            <div className="absolute -top-3 -right-3 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              GIÁ TỐT NHẤT
            </div>
            <div className="text-sm text-green-600 mb-2">Giá sau giảm</div>
            <div className="text-3xl font-bold text-green-600">
              {product.specialPrice.toLocaleString()} đ
            </div>
            <div className="text-xs text-green-500">
              Giá cuối cùng cho khách hàng
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
