"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "@/lib/firebase/firebase-auth";
import { useRouter } from "next/navigation";
import AppLoading from "@/components/shared/app-loading";
import React from "react";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Kiểm tra xem người dùng đã đăng nhập chưa
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  React.useEffect(() => {
    if (!loading && user) {
      router.push("/");
    }
  }, [loading, user, router]);

  if (loading) return <AppLoading />;

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full max-w-[1400px] max-h-[1500px] m-auto px-4 py-5 gap-10">
      <div className="w-full h-full flex flex-col justify-between gap-10 bg-[url(/assets/images/decorations/bg-auth.jpg)] bg-center bg-cover max-h-[900px] rounded-xl p-5 my-auto">
        <Link
          href={"/"}
          className="w-fit rounded-full bg-black/20  text-white  py-2 px-3 text-xs flex items-center gap-2"
        >
          <ArrowLeft className="size-4" />
          Quay lại
        </Link>

        <p className={cn("text-4xl font-bold text-white uppercase leading-13")}>
          Sống xanh, không khí trong lành
        </p>
      </div>
      <main className="w-full h-full flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
