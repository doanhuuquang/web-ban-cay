import ProductCard from "@/components/shared/product-card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { productItemsSample } from "@/lib/constants/product-items";
import { ArrowDownNarrowWide, ArrowDownWideNarrow, Search } from "lucide-react";

export default function SearchPage() {
  return (
    <main className="w-full max-w-[1400px] m-auto p-4">
      <div className="h-16"></div>
      <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
        <div className="space-y-2">
          {/* Thanh tìm kiếm */}
          <div className="bg-background">
            <InputGroup className="py-6">
              <InputGroupInput type="email" placeholder="Bạn muốn tìm gì?" />
              <InputGroupAddon>
                <Search />
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* Số lượng kết quả */}
          <p className="text-sm text-muted-foreground my-5">
            Tìm thấy <span className="font-semibold">1000</span> sản phẩm cho từ
            khóa <span className="font-semibold">Hehehe</span>
          </p>

          {/* Sắp xếp */}
          <p className="font-semibold text-muted-foreground">Sắp xếp theo</p>
          <div className="flex items-center gap-4">
            <Button variant={"outline"} size={"sm"}>
              Liên quan
            </Button>
            <Button variant={"outline"} size={"sm"}>
              <ArrowDownWideNarrow /> Giá cao
            </Button>
            <Button variant={"outline"} size={"sm"}>
              <ArrowDownNarrowWide />
              Giá thấp
            </Button>
          </div>
        </div>

        <div className="w-full col-span-2 grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 md:gap-4 gap-2">
          {productItemsSample.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
