"use client";

import { useRouter } from "next/navigation";
import {
  AppLoadingBackground,
  AppLoadingIcon,
} from "@/components/shared/app-loading";
import React from "react";
import Image from "next/image";
import { useAuth } from "@/lib/contexts/auth-context";

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { isLoading, isLoggedIn } = useAuth();
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
      </div>
      <main className="w-full h-full flex justify-center items-center">
        {children}
      </main>
    </div>
  );
}
