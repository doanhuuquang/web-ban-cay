"use client";

import InforField from "@/components/shared/infor-field";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import {
  CHANGE_PASSWORD_SUCCESS_MESSAGE,
  CREATE_OR_UPDATE_USER_PROFILE_SUCCESS_MESSAGE,
  LOGOUT_SUCCESS_MESSAGE,
} from "@/lib/constants/success-messages";
import { useAuth } from "@/lib/contexts/auth-context";
import { logout } from "@/lib/services/auth-service";
import { LoaderCircle, PenLine, PenSquare } from "lucide-react";
import { toast } from "sonner";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  BirthDatePicker,
  EmailInput,
  GenderSelector,
  MobileNumberInput,
  UserNameInput,
  UserProfileInputProvider,
  useUserProfileInput,
} from "@/components/shared/user-profile-input";
import React from "react";
import { updateUserProfileByUserId } from "@/lib/services/user-profile-service";
import { format } from "date-fns";
import { changePassword } from "@/lib/services/user-service";
import { Input } from "@/components/ui/input";

function UserProfile() {
  const { user, refreshUserProfile } = useAuth();
  const {
    userName,
    mobileNumber,
    selectedGender,
    birthDate,
    setEmail,
    setUserName,
    setMobileNumber,
    setSelectedGender,
    setBirthDate,
  } = useUserProfileInput();
  const [isUpdating, setIsUpdating] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (!user) return;

    setEmail(user.email);
    setUserName(user.userProfile?.username || "");
    setMobileNumber(user.userProfile?.mobileNumber || "");
    setSelectedGender(
      typeof user.userProfile?.gender === "boolean"
        ? user.userProfile.gender
        : null
    );
    setBirthDate(
      user.userProfile?.birthDate ? new Date(user.userProfile.birthDate) : null
    );
  }, [
    user,
    setEmail,
    setUserName,
    setMobileNumber,
    setSelectedGender,
    setBirthDate,
  ]);

  const handleUpdateUserProfile = async () => {
    if (!user) return;

    try {
      setIsUpdating(true);

      const code = await updateUserProfileByUserId({
        userId: user.id,
        data: {
          username: userName,
          mobileNumber: mobileNumber,
          gender: selectedGender,
          birthDate: birthDate,
        },
      });

      toast(
        code !== API_SUCCESS_CODE.CREATE_OR_UPDATE_USER_PROFILE_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.CREATE_OR_UPDATE_USER_PROFILE_SUCCESS
              ? ERROR_MESSAGES[code]
                ? ERROR_MESSAGES[code]
                : DEFAULT_ERROR_MESSAGE
              : CREATE_OR_UPDATE_USER_PROFILE_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => {},
          },
        }
      );

      refreshUserProfile();
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-3 p-4 bg-background dark:bg-accent/50">
      {/* Title */}
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Thông tin tài khoản</p>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size={"icon"} className="rounded-full">
              <PenLine />
            </Button>
          </SheetTrigger>
          <SheetContent isShowXButton={false} className="">
            <SheetHeader>
              <SheetTitle>Thông tin tài khoản</SheetTitle>
              <SheetDescription>
                Chỉnh sửa thông tin của bạn tại đây. Bấm nút Lưu khi hoàn thành.
              </SheetDescription>
            </SheetHeader>
            <div className="grid flex-1 auto-rows-min gap-6 px-4 w-full overflow-y-auto scrollbar-hide">
              <EmailInput disabled={true} />
              <UserNameInput />
              <MobileNumberInput />
              <GenderSelector />
              <BirthDatePicker />
            </div>
            <SheetFooter>
              <Button
                disabled={isUpdating}
                onClick={() => handleUpdateUserProfile()}
                type="submit"
              >
                {isUpdating ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Đang lưu...
                  </>
                ) : (
                  <>
                    <PenSquare /> Lưu chỉnh sửa
                  </>
                )}
              </Button>
              <SheetClose asChild>
                <Button variant="outline">Hủy</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      <div className="w-full space-y-1">
        <div className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-x-10">
          <InforField
            label="Họ và tên"
            value={user?.userProfile?.username || "Chưa cập nhật"}
          />
          <InforField
            label="Ngày sinh"
            value={
              format(
                user?.userProfile?.birthDate || new Date(),
                "dd/MM/yyyy"
              ) || "Chưa cập nhật"
            }
          />
          <InforField
            label="Số điện thoại"
            value={user?.userProfile?.mobileNumber || "Chưa cập nhật"}
          />
          <InforField label="Email" value={user?.email || "Chưa cập nhật"} />
        </div>
      </div>
    </div>
  );
}

function Logout() {
  const { setIsLoggedIn } = useAuth();

  const handleLogout = async () => {
    const code = await logout();

    if (code === API_SUCCESS_CODE.LOGOUT_SUCCESS) setIsLoggedIn(false);

    toast(
      code !== API_SUCCESS_CODE.LOGOUT_SUCCESS ? "Thất bại" : "Thành công",
      {
        description:
          code !== API_SUCCESS_CODE.LOGOUT_SUCCESS
            ? ERROR_MESSAGES[code]
              ? ERROR_MESSAGES[code]
              : DEFAULT_ERROR_MESSAGE
            : LOGOUT_SUCCESS_MESSAGE,
        action: {
          label: "Oke",
          onClick: () => {},
        },
      }
    );
  };

  return (
    <div className="p-4 bg-background dark:bg-accent/50 flex items-center justify-between">
      <p className="text-lg font-bold">Đổi tài khoản</p>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant={"outline"}>Đăng xuất</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-none!">
            <DialogHeader>
              <DialogTitle>Xác nhận</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn đăng xuất khỏi tài khoản không?
              </DialogDescription>
            </DialogHeader>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button onClick={() => handleLogout()}>Đăng xuất</Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

function ChangePassword() {
  const { user } = useAuth();
  const [oldPassword, setOldPassword] = React.useState<string>("");
  const [newPassword, setNewPassword] = React.useState<string>("");
  const [confirmPassword, setConfirmPassword] = React.useState<string>("");
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
  const [isChanging, setIsChanging] = React.useState<boolean>(false);

  React.useEffect(() => {
    if (oldPassword && newPassword && confirmPassword) setIsFormValid(true);
  }, [oldPassword, newPassword, confirmPassword]);

  const handleChangePassword = async () => {
    if (!user) return;

    try {
      setIsChanging(true);

      const code = await changePassword({
        userId: user!.id,
        data: {
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmPassword: confirmPassword,
        },
      });

      toast(
        code !== API_SUCCESS_CODE.CHANGE_PASSWORD_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.CHANGE_PASSWORD_SUCCESS
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

      if (code === API_SUCCESS_CODE.CHANGE_PASSWORD_SUCCESS) {
        setOldPassword("");
        setNewPassword("");
        setConfirmPassword("");
      }
    } finally {
      setIsChanging(false);
    }
  };

  return (
    <div className="p-4 bg-background dark:bg-accent/50 flex items-center justify-between">
      <p className="text-lg font-bold">Mật khẩu</p>
      <Dialog>
        <form>
          <DialogTrigger asChild>
            <Button variant={"outline"}>Đổi mật khẩu</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-none!">
            <DialogHeader>
              <DialogTitle>Đổi mật khẩu</DialogTitle>
              <DialogDescription>
                Nếu bạn không nhớ mật khẩu cũ thì có thể đăng xuất và chọn quên
                mật khẩu nhé!
              </DialogDescription>
            </DialogHeader>

            <div className="w-full space-y-4">
              <Input
                placeholder="Mật khẩu cũ"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <Input
                placeholder="Mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />

              <Input
                placeholder="Xác nhận mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Hủy</Button>
              </DialogClose>
              <Button
                disabled={!isFormValid || isChanging}
                onClick={() => (isFormValid ? handleChangePassword() : null)}
              >
                {isChanging ? (
                  <>
                    <LoaderCircle className="animate-spin" /> Đang kiểm tra
                  </>
                ) : (
                  "Xác nhận đổi mật khẩu"
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  );
}

export default function AccountPage() {
  return (
    <main className="space-y-2">
      {/* Thông tin cơ bản */}
      <UserProfileInputProvider>
        <UserProfile />
      </UserProfileInputProvider>

      <div className="grid md:grid-cols-2 gap-2">
        {/* Đổi mật khẩu */}
        <ChangePassword />

        {/* Đăng xuất */}
        <Logout />
      </div>
    </main>
  );
}
