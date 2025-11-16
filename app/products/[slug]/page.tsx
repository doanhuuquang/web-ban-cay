import {
  CarouselCustom,
  CategoryCustomItem,
} from "@/components/shared/carousel-custom";
import ProductCard from "@/components/shared/product-card";
import ProductImagesShow from "@/components/shared/product-images-show";
import { Button } from "@/components/ui/button";
import { productItemsSample } from "@/lib/constants/product-items";
import { Product } from "@/lib/models/product";
import {
  ChevronRight,
  Heart,
  House,
  Minus,
  Plus,
  ShoppingBag,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";

function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="w-full space-y-4">
      <div className="flex items-start justify-between">
        {product.discount !== null && product.discount > 0 ? (
          <div className="w-fit py-1 px-2 bg-red-700 text-xs text-red-50">
            Giảm <span className="">{product.discount}%</span>
          </div>
        ) : (
          <div></div>
        )}

        <Button variant={"ghost"} size={"icon"} className="rounded-full">
          <Heart />
        </Button>
      </div>

      <div>
        <p className="text-2xl font-bold">{product.name}</p>
        <p>{product.description}</p>
      </div>

      <div className="space-y-1">
        <p className="text-xl font-semibold">{product.getDiscountedPrice()}</p>
        {product.discount !== null && product.discount > 0 && (
          <p className="text-xs text-muted-foreground">
            Giá gốc: {product.getPrice()}
          </p>
        )}
      </div>
      <div className="flex items-center gap-3 text-sm">
        <div className="flex items-center gap-1">
          <Star size={14} className="fill-foreground" />
          <p>{product.rating}</p>
        </div>
        <p className="text-muted-foreground">({product.ratingCount})</p>
      </div>

      <p>{product.bio}</p>

      {/* Thay đổi địa chỉ giao hàng */}
      <div className="my-10 space-y-2">
        <p className="font-bold">Thông tin đặt hàng</p>

        <div className="border rounded-sm p-4 space-y-4">
          {/* Địa chỉ */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-2">
              <House size={18} />
              <div>
                <p className="font-bold">Địa chỉ giao hàng</p>
                <p className="text-xs text-muted-foreground">
                  75 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP.HCM
                </p>
              </div>
            </div>

            <ChevronRight size={20} />
          </div>

          <div className="w-full h-[0.2px] bg-muted-foreground/20"></div>

          {/* Thông tin người nhận */}
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-start gap-2">
              <User size={18} />
              <div>
                <p className="font-bold">Thông tin người nhận</p>
                <p className="text-xs text-muted-foreground">
                  75 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP.HCM
                </p>
              </div>
            </div>

            <ChevronRight size={20} />
          </div>
        </div>
      </div>

      {/* Action */}
      <div className="w-full flex items-center gap-2">
        <div className="flex items-center bg-muted rounded-full gap-2">
          <Button variant={"ghost"} size={"icon"} className="rounded-full p-6">
            <Minus />
          </Button>

          <p>4</p>

          <Button variant={"ghost"} size={"icon"} className="rounded-full p-6">
            <Plus />
          </Button>
        </div>
        <Button className="grow p-6 rounded-full bg-blue-ocean hover:bg-blue-ocean/90 text-white flex items-center justify-center gap-2">
          <ShoppingBag />
          <p>Thêm vào giỏ hàng</p>
        </Button>
      </div>
    </div>
  );
}

function PlantCare() {
  return (
    <div className="w-full h-fit p-4 border space-y-4">
      <h2 className="font-bold text-lg mb-4">Cách chăm sóc</h2>

      {/* Tưới nước */}
      <div className="space-y-1">
        <p className="font-bold text-sm">Tưới nước</p>

        <p className="text-sm text-muted-foreground">
          Tưới nước mỗi tuần một lần hoặc khi đất bắt đầu hơi khô ở phần ngọn.
          Luôn giữ cho đất hơi ẩm, nhưng không tưới quá nhiều nước vì sẽ gây ra
          các đốm nâu và rụng lá. Lá xoăn hoặc khô cho thấy cây đang khô và cần
          được tưới nước. Tưới nước vào sáng sớm hoặc chiều tối khi nhiệt độ mát
          hơn. Luôn kiểm tra đất trước khi tưới.
        </p>
      </div>

      {/* Ánh sáng */}
      <div className="space-y-1">
        <p className="font-bold text-sm">Ánh sáng</p>

        <p className="text-sm text-muted-foreground">
          Ánh sáng trong nhà hoặc ánh nắng gián tiếp. 6 giờ đến 8 giờ
        </p>
      </div>

      {/* Nhiệt độ */}
      <div className="space-y-1">
        <p className="font-bold text-sm">Nhiệt độ</p>

        <p className="text-sm text-muted-foreground">
          Duy trì nhiệt độ từ 18°C ​​đến 24°C. Tránh gió lùa vì chúng có thể gây
          ra biến động nhiệt độ không mong muốn. Cân nhắc phun sương cho cây hai
          lần mỗi tuần để duy trì độ ẩm tối ưu.
        </p>
      </div>

      {/* Dinh dưỡng */}
      <div className="space-y-1">
        <p className="font-bold text-sm">Dinh dưỡng</p>

        <p className="text-sm text-muted-foreground">
          Bón phân dạng lỏng 15 ngày một lần khi cây đang phát triển mạnh. Để có
          kết quả tốt nhất, hãy sử dụng phân bón cây trồng trong nhà Folikraft
          pha sẵn.
        </p>
      </div>
    </div>
  );
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const productSlug: string = (await params).slug;

  const product: Product = productItemsSample.find(
    (p) => p.slug === productSlug
  )!;

  return (
    <div className="w-full h-fit">
      <div className="w-full h-fit dark:bg-muted/50">
        {/* Sản phẩm hiện tại */}
        <div className="w-full max-w-[1400px] m-auto p-4 grid lg:grid-cols-3 grid-cols-none gap-10">
          {/* Ảnh sản phẩm */}
          <ProductImagesShow imageUrls={product.imageUrls} />

          {/* Thông tin */}
          <ProductInfo product={product} />

          {/* Cách chăm sóc */}
          <PlantCare />
        </div>
      </div>
      <div className="w-full max-w-[1400px] m-auto p-4 space-y-10">
        <div className="w-full h-full space-y-5">
          <div className="flex items-center justify-between">
            <h1 className="font-bold text-2xl">Sản phẩm liên quan</h1>

            <Button
              variant={"outline"}
              className="rounded-full lg:block hidden"
            >
              Xem tất cả sản phẩm liên quan
            </Button>
          </div>

          <CarouselCustom itemSize={"lg"}>
            {productItemsSample.map((product, index) => (
              <div key={index}>
                <CategoryCustomItem>
                  <ProductCard product={product} />
                </CategoryCustomItem>
              </div>
            ))}
          </CarouselCustom>

          <Link
            href={""}
            className="lg:hidden flex items-center justify-between border-b pb-4"
          >
            <p className="font-bold">Xem tất cả sản phẩm liên quan</p>
            <ChevronRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
