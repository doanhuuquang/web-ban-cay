"use client";

import ForgetPasswordForm from "@/components/shared/forget-password-form";
import { LOGIN_PATH } from "@/lib/constants/path";
import Link from "next/link";

export default function ForgetPasswordPage() {
  return (
    <main className="space-y-10 w-full h-full">
      <div className="space-y-3">
        <p className="text-4xl font-bold">Quên mật khẩu</p>
        <p className="text-sm">
          Quay trở lại trang
          <span>
            <Link
              href={LOGIN_PATH}
              className="text-primary underline underline-offset-2 ml-2"
            >
              Đăng nhập
            </Link>
          </span>
        </p>
      </div>

      <ForgetPasswordForm />
    </main>
  );
}
