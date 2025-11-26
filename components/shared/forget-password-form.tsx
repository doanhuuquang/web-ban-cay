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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { REGEXP_ONLY_DIGITS } from "input-otp";

import { LoaderCircle } from "lucide-react";
import React from "react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { changePassword, getOTP } from "@/lib/services/auth-service";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import {
  CHANGE_PASSWORD_SUCCESS_MESSAGE,
  SEND_OTP_SUCCESS_MESSAGE,
} from "@/lib/constants/success-messages";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";

const inputClassName =
  "px-5 py-7 bg-background/60 text-foreground border-1 w-full outline-none focus:border-primary";
const inputOptClassName = "w-full! max-w-14 h-14";

const formSchema = z
  .object({
    email: email("Vui lòng nhập địa chỉ email hợp lệ."),
    otp: z.string().min(6, "OTP không hợp lệ."),
    password: z.string().min(6, {
      message: "Mật khẩu phải có ít nhất 8 ký tự.",
    }),
    confirm_password: z.string().min(6, {
      message: "Xác nhận mật khẩu phải có ít nhất 8 ký tự.",
    }),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirm_password"],
  });

export default function ForgetPasswordForm() {
  const [loading, setLoading] = React.useState(false);
  const [isSendingOTP, setIsSendingOTP] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      otp: "",
      password: "",
      confirm_password: "",
    },
  });

  const handleGetOTP = async () => {
    if (form.getValues("email") === "") {
      form.setFocus("email");
      form.setError("email", {
        type: "min",
        message: "Vui lòng nhập địa chỉ email.",
      });
      return;
    }

    try {
      setIsSendingOTP(true);

      const code = await getOTP(form.getValues("email"));

      toast(
        code !== API_SUCCESS_CODE.FORGET_PASSWORD_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.FORGET_PASSWORD_SUCCESS
              ? ERROR_MESSAGES[code]
                ? ERROR_MESSAGES[code]
                : DEFAULT_ERROR_MESSAGE
              : SEND_OTP_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => {},
          },
        }
      );
    } finally {
      setIsSendingOTP(false);
    }
  };

  const handleChangePassword = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);

      const code = await changePassword({
        email: values.email,
        otp: values.otp,
        newPassword: values.password,
      });

      if (code === 200) form.reset();

      toast(
        code !== API_SUCCESS_CODE.RESET_PASSWORD_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.RESET_PASSWORD_SUCCESS
              ? ERROR_MESSAGES[code]
                ? ERROR_MESSAGES[code]
                : DEFAULT_ERROR_MESSAGE
              : CHANGE_PASSWORD_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => {},
          },
        }
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleChangePassword)}
        className={cn("col-span-4 space-y-5", loading && "disable")}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="w-full flex items-center justify-between">
                <FormLabel>Email</FormLabel>
                <Button
                  disabled={isSendingOTP}
                  variant={"link"}
                  type="button"
                  onClick={() => handleGetOTP()}
                  className="text-primary hover:underline hover:cursor-pointer text-sm font-semibold p-0!"
                >
                  {isSendingOTP && <LoaderCircle className="animate-spin" />}
                  {isSendingOTP ? "Đang gửi" : "Gửi OTP"}
                </Button>
              </div>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  {...field}
                  className={inputClassName}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-5 w-full">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Mật khẩu mới</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Nhập mật khẩu mới"
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
            name="confirm_password"
            render={({ field }) => (
              <FormItem className="grow">
                <FormLabel>Xác nhận mật khẩu</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Xác nhận mật khẩu"
                    {...field}
                    className={inputClassName}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="otp"
          render={({ field }) => (
            <FormItem className="grow">
              <FormLabel>Mã OTP</FormLabel>
              <FormControl>
                <InputOTP
                  id="input-otp"
                  maxLength={6}
                  pattern={REGEXP_ONLY_DIGITS}
                  {...field}
                >
                  <InputOTPGroup className="w-full!">
                    <InputOTPSlot index={0} className={inputOptClassName} />
                    <InputOTPSlot index={1} className={inputOptClassName} />
                    <InputOTPSlot index={2} className={inputOptClassName} />
                    <InputOTPSlot index={3} className={inputOptClassName} />
                    <InputOTPSlot index={4} className={inputOptClassName} />
                    <InputOTPSlot index={5} className={inputOptClassName} />
                  </InputOTPGroup>
                </InputOTP>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <p className="text-xs text-muted-foreground">
          <span className="text-red-500">*</span> Mật khẩu phải có ít nhất 8 ký
          tự, bao gồm ký tự in hoa, số và ký tự đặc biệt
        </p>

        <Button
          disabled={loading || !form.formState.isValid}
          type="submit"
          className="w-full py-5 hover:cursor-pointer mt-3"
        >
          <p className="uppercase">
            {loading ? "Đang kiểm tra thông tin..." : "Thay đổi mật khẩu"}
          </p>
          {loading ? <LoaderCircle className="animate-spin" /> : <></>}
        </Button>
      </form>
    </Form>
  );
}
