import { Button } from "@/components/ui/button";
import { SquarePen } from "lucide-react";

export default function CheckoutPage() {
  return (
    <main className="space-y-1">
      {/* Danh sách thông tin giao hàng */}
      <div className="w-full flex items-center gap-4 flex-wrap bg-background dark:bg-accent/50 p-4">
        <div className="p-2 hover:text-primary cursor-pointer border-l-3 bg-primary/10 border-primary text-primary">
          75 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP.HCM
          <span className="bg-primary text-primary-foreground px-3 py-1 text-xs ml-2">
            Mặc định
          </span>
        </div>

        <div className="p-2 hover:text-primary cursor-pointer">
          75 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP.HCM
        </div>

        <div className="p-2 hover:text-primary cursor-pointer">
          75 Nguyễn Thị Minh Khai, Phường 6, Quận 3, TP.HCM
        </div>
      </div>

      {/* Địa chỉ giao hàng */}
      <div className="w-full h-full p-4 bg-background dark:bg-accent/50">
        {/* Title */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Địa chỉ giao hàng</p>

          <div className="flex items-center gap-2 text-sm text-primary">
            <p>Cập nhật</p>
            <SquarePen size={15} />
          </div>
        </div>

        <Button variant="link" className="p-0 text-sm">
          Đặt làm mặc định
        </Button>

        <div className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-x-10 md:divide-y-0 divide-y divide-accent/50">
          <div className="divide-y divide-accent/50">
            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Tỉnh/Thành phố</p>
              <p>Hà Nội</p>
            </div>

            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Quận/Huyện</p>
              <p>Gia Lâm</p>
            </div>
          </div>

          <div className="divide-y divide-accent/50">
            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Phường/Xã</p>
              <p>TT.Trâu Quỳ</p>
            </div>

            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Số Nhà</p>
              <p>75 Cửu Việt 2</p>
            </div>
          </div>
        </div>
      </div>

      {/* Thông tin người nhận */}
      <div className="w-full h-full p-4 bg-background dark:bg-accent/50">
        {/* Title */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Thông tin người nhận</p>

          <div className="flex items-center gap-2 text-sm text-primary">
            <p>Cập nhật</p>
            <SquarePen size={15} />
          </div>
        </div>

        <div className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-x-10 md:divide-y-0 divide-y divide-accent/50">
          <div className="divide-y divide-accent/50">
            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Tên người nhận</p>
              <p>Nguyễn Thị Thanh Hương</p>
            </div>
          </div>

          <div className="divide-y divide-accent/50">
            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Số điện thoại</p>
              <p>0123456789</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
