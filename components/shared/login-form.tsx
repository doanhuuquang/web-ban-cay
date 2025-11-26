"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { email, z } from "zod";

import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { LoaderCircle } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { cn } from "@/lib/utils";

import { loginWithEmailAndPassword } from "@/lib/services/auth-service";
import { toast } from "sonner";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import { LOGIN_SUCCESS_MESSAGE } from "@/lib/constants/success-messages";
import { useAuth } from "@/lib/contexts/auth-context";
import { FORGET_PASSWORD_PATH } from "@/lib/constants/path";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";

// Style cho input
const inputClassName =
  "px-5 py-7 bg-background/60 text-foreground border-1 w-full outline-none focus:border-primary";

// Form schema
const formSchema = z.object({
  email: email("Vui lòng nhập địa chỉ email hợp lệ."),
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 8 ký tự.",
  }),
});

export default function LoginForm() {
  const [loading, setLoading] = React.useState(false);
  const [isChecked, setIsChecked] = React.useState<boolean>(false);
  const { setIsLoggedIn } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (value: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const code = await loginWithEmailAndPassword({
        email: value.email,
        password: value.password,
      });

      toast(
        code !== API_SUCCESS_CODE.LOGIN_SUCCESS ? "Thất bại" : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.LOGIN_SUCCESS
              ? ERROR_MESSAGES[code]
                ? ERROR_MESSAGES[code]
                : DEFAULT_ERROR_MESSAGE
              : LOGIN_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => {},
          },
        }
      );

      if (code === 200) setIsLoggedIn(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleLogin)}
        className={cn("col-span-4 space-y-5", loading && "disable")}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Email"
                  {...field}
                  className={inputClassName}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="grow">
              <div className="w-full flex items-center justify-between gap-4">
                <FormLabel>Mật khẩu</FormLabel>
                <Link
                  href={FORGET_PASSWORD_PATH}
                  className="text-sm hover:underline"
                >
                  Quên mật khẩu
                </Link>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Mật khẩu"
                  {...field}
                  className={inputClassName}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-3">
          <Checkbox
            id="terms"
            checked={isChecked}
            onCheckedChange={() => setIsChecked(!isChecked)}
          />
          <Label htmlFor="terms">
            <p className="text-muted-foreground text-xs space-x-1">
              <span>
                Bằng việc nhấn vào nút Đăng nhập, chúng tôi hiểu rằng bạn đã đọc
                và đồng ý với
              </span>
              <Link
                href={"/"}
                className="font-semibold text-foreground underline underline-offset-1"
              >
                Chính sách bảo mật
              </Link>
              <span>và</span>
              <Link
                href={"/"}
                className="font-semibold text-foreground underline underline-offset-1"
              >
                Điều khoản sử dụng
              </Link>
            </p>
          </Label>
        </div>

        <div className="space-y-3">
          <Button
            disabled={loading || !isChecked}
            type="submit"
            className="w-full py-5 hover:cursor-pointer"
          >
            <p className="uppercase">
              {loading ? "Đang kiểm tra thông tin..." : "Đăng nhập"}
            </p>
            {loading ? <LoaderCircle className="animate-spin" /> : <></>}
          </Button>

          <div className="w-full flex items-center gap-5 text-muted-foreground text-sm">
            <div className="grow bg-accent h-px"></div>
            <p>Hoặc</p>
            <div className="grow bg-accent h-px"></div>
          </div>

          <Button
            variant={"outline"}
            className="w-full py-5 hover:cursor-pointer flex items-center gap-3"
          >
            <Image
              src="/assets/icons/google/google.svg"
              alt="Google Icon"
              width={20}
              height={20}
            />
            <p className="uppercase">Đăng nhập bằng tài khoản Google</p>
          </Button>
        </div>
      </form>
    </Form>
  );
}
