import SignupForm from "@/components/shared/sign-up-form";
import { LOGIN_PATH } from "@/lib/constants/path";
import Link from "next/link";

export default function SignupPage() {
  return (
    <main className="space-y-10 flex flex-col justify-between w-full">
      <div className="space-y-3">
        <p className="text-4xl font-bold">Tạo tài khoản mới</p>
        <p className="text-sm">
          Bạn đã có tài khoản trước đó rồi?
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
      <SignupForm />
    </main>
  );
}
