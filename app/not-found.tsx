import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-fit">
      <div className="w-full max-w-[1400px] px-4 pb-15 m-auto flex flex-col items-center">
        <div className="w-full max-w-sm relative aspect-square object-cover object-center">
          <Image
            src={"/assets/images/decorations/404.svg"}
            alt="404"
            fill
            className="absolute top-0 left-0 w-full"
          />
        </div>

        <div className="grid items-center text-center max-w-sm">
          <p className="text-xl font-bold mb-2">Awww, Đừng lo nha</p>

          <p className="text-sm font-bold">Đó chỉ là lỗi 404 thôi!</p>

          <p className="text-sm text-muted-foreground">
            Nội dung bạn đang tìm kiếm không tồn tại hoặc đã bị gỡ bỏ trước đó
            rồi!
          </p>
        </div>

        <Link href={"/"} className="mt-6">
          <Button>Quay về trang chủ</Button>
        </Link>
      </div>
    </div>
  );
}
