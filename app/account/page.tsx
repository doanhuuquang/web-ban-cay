"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/lib/contexts/auth-context";
import { SquarePen } from "lucide-react";

export default function AccountPage() {
  const { user } = useAuth();

  return (
    <main className="space-y-2">
      {/* Thông tin cơ bản */}
      <div className="space-y-5 p-4 bg-background dark:bg-accent/50">
        {/* Title */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Thông tin tài khoản</p>
          <div className="flex items-center gap-2 text-sm text-primary">
            <p>Cập nhật</p>
            <SquarePen size={15} />
          </div>
        </div>

        <div className="w-full space-y-1">
          <Avatar className="size-15">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <div className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-x-10">
            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Họ và tên</p>
              <p>{user?.userProfile?.userName || "Chưa cập nhật"}</p>
            </div>

            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Ngày sinh</p>
              <p>
                {user?.userProfile?.birthDate?.getDate() || "Chưa cập nhật"}
              </p>
            </div>

            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Số điện thoại</p>
              <p>{user?.userProfile?.mobileNumber || "Chưa cập nhật"}</p>
            </div>

            <div className="w-full flex items-center justify-between gap-4 py-4">
              <p className="text-muted-foreground">Email</p>
              <p>{user?.email || "Chưa cập nhật"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-2">
        {/* Đổi mật khẩu */}
        <div className="p-4 bg-background dark:bg-accent/50 flex items-center justify-between">
          <p className="text-lg font-bold">Mật khẩu</p>
          <div className="flex items-center gap-2 text-sm text-primary">
            <p>Đổi mật khẩu</p>
            <SquarePen size={15} />
          </div>
        </div>

        {/* Phương thức đăng nhập */}
        <div className="p-4 bg-background dark:bg-accent/50">
          <p className="font-bold">Phương thức đăng nhập</p>
          <p className="text-muted-foreground text-sm">Google</p>
        </div>
      </div>
    </main>
  );
}
