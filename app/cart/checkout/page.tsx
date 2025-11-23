import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CART_PATH, CHECKOUT_PATH } from "@/lib/constants/path";
import { SlashIcon } from "lucide-react";
import Link from "next/link";

export function BreadcrumbWithCustomSeparator() {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href="/">Trang chủ</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={CART_PATH}>Giỏ hàng của tôi</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator>
          <SlashIcon />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link href={CHECKOUT_PATH}>Thanh toán</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default function CheckoutPage() {
  return (
    <div className="w-full h-fit">
      <div className="w-full max-w-[1400px] p-4 m-auto space-y-10">
        <div className="space-y-2">
          <p className="text-xl font-bold">Thanh toán</p>

          <BreadcrumbWithCustomSeparator />
        </div>

        <div className="w-full md:grid grid-cols-2 gap-4">
          {/* Thông tin giao hàng */}
          <div className="space-y-5">
            <p className="text-lg font-semibold">Thông tin giao hàng</p>

            {/* Tên người nhận */}
            <div className="space-y-2">
              <Label htmlFor="fullname">
                Tên người nhận <span className="text-red-500">*</span>
              </Label>
              <Input
                type="text"
                id="fullname"
                placeholder="Tên người nhận đơn hàng"
                defaultValue={"Doan Huu Quang"}
              />
            </div>

            {/* Địa chỉ email của người nhận */}
            <div className="space-y-2">
              <Label htmlFor="email">
                Địa chỉ Email <span className="text-red-500">*</span>
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Địa chỉ email của người nhận"
                defaultValue={"qdoan576@gmail.com"}
              />
            </div>

            {/* Số điện thoại */}
            <div className="space-y-2">
              <Label htmlFor="phone-number">
                Số điện thoại <span className="text-red-500">*</span>
              </Label>
              <Input
                type="number"
                id="phone-number"
                placeholder="Số điện thoại của người nhận"
                defaultValue={"0336314376"}
              />
            </div>

            {/* Địa chỉ nhận hàng */}
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                {/* Tỉnh/Thành phố */}
                <div className="space-y-2">
                  <Label htmlFor="province">
                    Tỉnh/Thành phố <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="province"
                    placeholder="Tỉnh/Thành phố"
                    defaultValue={"Hà Nội"}
                  />
                </div>

                {/* Quận/Huyện */}
                <div className="space-y-2">
                  <Label htmlFor="district">
                    Quận/Huyện <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="district"
                    placeholder="Quận/Huyện"
                    defaultValue={"Gia Lâm"}
                  />
                </div>

                {/* Phường/Xã */}
                <div className="space-y-2">
                  <Label htmlFor="ward">
                    Phường/Xã <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="ward"
                    placeholder="Phường/Xã"
                    defaultValue={"TT Trâu Quỳ"}
                  />
                </div>
              </div>

              {/* Địa chỉ nhà */}
              <div className="space-y-2">
                <Label htmlFor="address">
                  Địa chỉ nhà <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  id="address"
                  placeholder="Địa chỉ nhà, số nhà, tên đường"
                  defaultValue={"75 Cửu Việt 2"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
