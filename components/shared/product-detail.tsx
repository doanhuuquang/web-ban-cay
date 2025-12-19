"use client";

import {
  Heart,
  LoaderCircle,
  Minus,
  Plus,
  ShoppingBag,
  Star,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Product } from "@/lib/models/product";
import React from "react";
import { getProductBySlug } from "@/lib/services/product-service";
import ProductImagesShow from "@/components/shared/product-images-show";
import { Button } from "@/components/ui/button";
import { addItemToCart } from "@/lib/services/cart-item-service";
import { useAuth } from "@/lib/contexts/auth-context";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";
import { toast } from "sonner";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import { ADD_ITEM_TO_CART_SUCCESS_MESSAGE } from "@/lib/constants/success-messages";
import { formatMoney } from "@/lib/helpers/format-money";

function AddToCartButtons({
  product,
  className,
}: {
  product: Product;
  className?: string;
}) {
  const { user } = useAuth();
  const [quantity, setQuantity] = React.useState<number>(1);
  const [isAdding, setIsAdding] = React.useState<boolean>(false);

  const handleDecreaseQuantity = () => {
    if (quantity <= 1) return;

    setQuantity((prev) => prev - 1);
  };

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleAddToCart = async () => {
    if (!user || !user.userProfile?.cartResponse.cartId) return;

    try {
      setIsAdding(true);

      const code = await addItemToCart({
        cartId: user.userProfile.cartResponse.cartId,
        productId: product.productId,
        quantity: quantity,
      });

      if (code === API_SUCCESS_CODE.ADD_ITEM_TO_CART_SUCCESS) {
        toast(
          code !== API_SUCCESS_CODE.LOGIN_SUCCESS ? "Thất bại" : "Thành công",
          {
            description:
              code !== API_SUCCESS_CODE.LOGIN_SUCCESS
                ? ERROR_MESSAGES[code]
                  ? ERROR_MESSAGES[code]
                  : DEFAULT_ERROR_MESSAGE
                : ADD_ITEM_TO_CART_SUCCESS_MESSAGE,
            action: {
              label: "Oke",
              onClick: () => {},
            },
          }
        );
      }
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className={cn("w-full flex items-center gap-2", className)}>
      <div className="flex items-center bg-muted rounded-full gap-2">
        <Button
          disabled={quantity <= 1}
          onClick={() => handleDecreaseQuantity()}
          variant={"ghost"}
          size={"icon"}
          className="rounded-full p-6"
        >
          <Minus />
        </Button>

        <p>{quantity}</p>

        <Button
          onClick={() => handleIncreaseQuantity()}
          variant={"ghost"}
          size={"icon"}
          className="rounded-full p-6"
        >
          <Plus />
        </Button>
      </div>
      <Button
        disabled={isAdding}
        onClick={() => handleAddToCart()}
        className="grow p-6 rounded-full bg-blue-ocean hover:bg-blue-ocean/90 text-white flex items-center justify-center gap-2"
      >
        {isAdding ? <LoaderCircle className="animate-spin" /> : <ShoppingBag />}
        <p>{isAdding ? "Đang thêm vào giỏ hàng" : "Thêm vào giỏ hàng"}</p>
      </Button>
    </div>
  );
}

function ProductInfo({ product }: { product: Product }) {
  return (
    <div className="w-full h-full space-y-10">
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          {product.discount !== null && product.discount > 0 ? (
            <div className="w-fit py-1 px-2 bg-red-700 text-xs text-red-50">
              Giảm <span className="">{product.discount}%</span>
            </div>
          ) : (
            <div></div>
          )}

          <Button variant={"outline"} size={"icon"} className="rounded-full">
            <Heart />
          </Button>
        </div>

        <div>
          <p className="text-2xl font-bold">{product.productName}</p>
          <p>{product.description}</p>
        </div>

        <div className="space-y-1">
          <p className="text-xl font-semibold">
            {formatMoney(product.getDiscountedPrice())}
          </p>
          {product.discount !== null && product.discount > 0 && (
            <p className="text-xs text-muted-foreground">
              Giá gốc: {formatMoney(product.price)}
            </p>
          )}
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="flex items-center gap-1">
            <Star size={14} className="fill-yellow-500 text-yellow-500" />
            <p>{product.avgRating}</p>
          </div>
          <p className="text-muted-foreground">({product.reviewCount})</p>
        </div>

        <div>
          <span className="text-muted-foreground">Đã bán: </span>
          <span className="font-semibold">{product.soldCount}</span>
        </div>

        <div>
          <span className="text-muted-foreground">Số lượng còn lại: </span>
          <span className="font-semibold">{product.inventory.available}</span>
        </div>

        <p>{product.bio}</p>
      </div>

      {/* Action */}
      <AddToCartButtons product={product} />
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

export default function ProductDetail({ slug }: { slug: string }) {
  const [product, setProduct] = React.useState<Product | null>(null);

  React.useEffect(() => {
    const fetchProductBySlug = async () => {
      const response = await getProductBySlug({ slug: slug });
      if (response.product) setProduct(response.product);
    };

    fetchProductBySlug();
  }, [slug]);

  if (!product) return null;

  return (
    <div className="w-full max-w-[1400px] m-auto p-4 grid lg:grid-cols-3 grid-cols-none gap-10">
      {/* Ảnh sản phẩm */}
      <ProductImagesShow imageUrls={product.images} />

      {/* Thông tin */}
      <ProductInfo product={product} />

      {/* Cách chăm sóc */}
      <PlantCare />
    </div>
  );
}
