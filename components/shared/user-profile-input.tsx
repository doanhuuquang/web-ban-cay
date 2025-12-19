import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent } from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AddressTypeLabel } from "@/lib/models/role";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";

import React from "react";

type UserProfileInputContextProps = {
  isFormValid: boolean;
  userId: string;
  selectedRole: string;
  email: string;
  profileId: string;
  userName: string;
  mobileNumber: string;
  selectedGender: boolean | null;
  birthDate: Date | null;
  setUserId: (id: string) => void;
  setSelectedRole: (role: string) => void;
  setEmail: (email: string) => void;
  setProfileId: (id: string) => void;
  setUserName: (name: string) => void;
  setMobileNumber: (number: string) => void;
  setSelectedGender: (gender: boolean | null) => void;
  setBirthDate: (date: Date | null) => void;
  resetForm: () => void;
};

const UserProfileInputContext =
  React.createContext<UserProfileInputContextProps | null>(null);

function useUserProfileInput(): UserProfileInputContextProps {
  const context = React.useContext(UserProfileInputContext);
  if (!context) {
    throw new Error(
      "useUserProfileInput must be used within an UserProfileInput Provider"
    );
  }
  return context;
}

function UserIdInput() {
  const { userId, setUserId } = useUserProfileInput();
  return (
    <Input
      value={userId}
      placeholder="Mã tài khoản"
      onChange={(e) => setUserId(e.target.value)}
    />
  );
}

function EmailInput({ ...props }: React.ComponentProps<"input">) {
  const { email, setEmail } = useUserProfileInput();

  return (
    <Input
      {...props}
      value={email}
      type="email"
      placeholder="Email"
      onChange={(e) => setEmail(e.target.value)}
    />
  );
}

function RoleSelector() {
  const { selectedRole, setSelectedRole } = useUserProfileInput();

  return (
    <Select
      value={selectedRole}
      onValueChange={(value) => setSelectedRole(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Vai trong hệ thống" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Vai trò</SelectLabel>
          {Object.entries(AddressTypeLabel).map(([type, label]) => (
            <SelectItem key={type} value={type}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function UserProfileIdInput() {
  const { profileId, setProfileId } = useUserProfileInput();
  return (
    <Input
      value={profileId}
      placeholder="Mã thông tin tài khoản"
      onChange={(e) => setProfileId(e.target.value)}
    />
  );
}

function UserNameInput() {
  const { userName, setUserName } = useUserProfileInput();
  return (
    <Input
      value={userName}
      placeholder="Tên người dùng"
      onChange={(e) => setUserName(e.target.value)}
    />
  );
}

function MobileNumberInput() {
  const { mobileNumber, setMobileNumber } = useUserProfileInput();
  return (
    <Input
      value={mobileNumber}
      placeholder="số điện thoại"
      onChange={(e) => setMobileNumber(e.target.value)}
    />
  );
}

function GenderSelector() {
  const { selectedGender, setSelectedGender } = useUserProfileInput();

  return (
    <Select
      value={selectedGender?.toString() || ""}
      onValueChange={(value) => setSelectedGender(value === "true")}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Giới tính" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Giới tính</SelectLabel>
          <SelectItem value={"true"}>Nam</SelectItem>
          <SelectItem value={"false"}>Nữ</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function BirthDatePicker() {
  const { birthDate, setBirthDate } = useUserProfileInput();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          id="date"
          className="w-full justify-between font-normal p-6"
        >
          {birthDate ? format(birthDate, "dd/MM/yyyy") : "Chọn ngày sinh"}
          <ChevronDownIcon />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-0" align="start">
        <Calendar
          mode="single"
          selected={birthDate || undefined}
          captionLayout="dropdown"
          onSelect={(date) => {
            setBirthDate(date || new Date());
            setOpen(false);
          }}
        />
      </PopoverContent>
    </Popover>
  );
}

export default function UserProfileInputForm() {
  return (
    <div className="w-full grid gap-6 overflow-y-auto scrollbar-hide">
      <UserIdInput />
      <EmailInput />
      <RoleSelector />
      <UserProfileIdInput />
      <UserNameInput />
      <MobileNumberInput />
      <GenderSelector />
      <BirthDatePicker />
    </div>
  );
}

function UserProfileInputProvider({ children }: { children: React.ReactNode }) {
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
  const [userId, setUserId] = React.useState<string>("");
  const [selectedRole, setSelectedRole] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [profileId, setProfileId] = React.useState<string>("");
  const [userName, setUserName] = React.useState<string>("");
  const [mobileNumber, setMobileNumber] = React.useState<string>("");
  const [selectedGender, setSelectedGender] = React.useState<boolean | null>(
    null
  );
  const [birthDate, setBirthDate] = React.useState<Date | null>(null);

  const resetForm = () => {
    setSelectedRole("");
    setSelectedGender(null);
    setUserId("");
    setEmail("");
    setProfileId("");
    setUserName("");
    setMobileNumber("");
    setBirthDate(null);
  };

  React.useEffect(() => {
    if (
      userId &&
      selectedRole &&
      email &&
      profileId &&
      userName &&
      mobileNumber &&
      selectedGender &&
      birthDate
    ) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [
    userId,
    selectedRole,
    email,
    profileId,
    userName,
    mobileNumber,
    selectedGender,
    birthDate,
  ]);

  return (
    <UserProfileInputContext.Provider
      value={{
        isFormValid,
        userId,
        selectedRole,
        email,
        profileId,
        userName,
        mobileNumber,
        selectedGender,
        birthDate,
        setUserId,
        setSelectedRole,
        setEmail,
        setProfileId,
        setUserName,
        setMobileNumber,
        setSelectedGender,
        setBirthDate,
        resetForm,
      }}
    >
      {children}
    </UserProfileInputContext.Provider>
  );
}

export {
  useUserProfileInput,
  UserProfileInputProvider,
  UserProfileInputForm,
  UserIdInput,
  EmailInput,
  RoleSelector,
  UserProfileIdInput,
  UserNameInput,
  MobileNumberInput,
  GenderSelector,
  BirthDatePicker,
};
