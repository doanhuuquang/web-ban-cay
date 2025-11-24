import Link from "next/link";
import LoginForm from "@/components/shared/login-form";
import { SIGN_UP_PATH } from "@/lib/constants/path";

export default function LoginPage() {
  return (
    <main className="space-y-10  w-full">
      <div className="space-y-3">
        <p className="text-4xl font-bold">Chào mừng bạn quay trở lại</p>
        <p className="text-sm">
          Bạn chưa có tài khoản?
          <span>
            <Link
              href={SIGN_UP_PATH}
              className="text-primary underline underline-offset-2 ml-2"
            >
              Đăng ký ngay
            </Link>
          </span>
        </p>
      </div>
      <LoginForm />
    </main>
  );
}
