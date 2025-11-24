"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import {
  AppLoadingBackground,
  AppLoadingIcon,
} from "@/components/shared/app-loading";
import React from "react";
import Image from "next/image";
import { useUser } from "@/lib/contexts/auth-context";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isLoading, isLoggedIn } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!isLoading && isLoggedIn) {
      router.push("/");
    }
  }, [isLoading, isLoggedIn, router]);

  if (isLoading)
    return (
      <AppLoadingBackground>
        <AppLoadingIcon title="Đang kiểm tra thông tin" />
      </AppLoadingBackground>
    );

  return (
    <div className="grid lg:grid-cols-2 grid-cols-1 w-full max-w-[1400px] max-h-[1500px] m-auto px-4 py-5 gap-10">
      <div className="w-full h-full flex flex-col justify-between gap-10 max-h-[900px] lg:aspect-auto aspect-4/2 rounded-xl p-5 my-auto relative overflow-hidden bg-purple-500/20">
        <Image
          src={"/assets/images/decorations/girl-taking-care-plants.svg"}
          alt="Gplant"
          fill
          className="w-full h-full absolute top-0 left-0 z-0 object-cover object-center"
        />

        <Link
          href={"/"}
          className="w-fit rounded-full bg-black/20  text-white  py-2 px-3 text-xs flex items-center gap-2 z-1"
        >
          <ArrowLeft className="size-4" />
          Quay lại
        </Link>
      </div>
      <main className="w-full h-full flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
