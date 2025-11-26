import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { VIETNAM_PROVINCES } from "@/lib/constants/vietnam-provinces";
import { Address } from "@/lib/models/address";
import React from "react";
import { set } from "react-hook-form";

type AddressSelctorContextProps = {
  selectedProvince: string | null;
  selectedDistrict: string | null;
  selectedWard: string | null;
  street: string;
  fullName: string;
  phone: string;
  additionalInfo: string;
  isDefault: boolean;
  addressType: string;
  label: string;
  postalCode: string;
  setSelectedProvince: (province: string | null) => void;
  setSelectedDistrict: (district: string | null) => void;
  setSelectedWard: (ward: string | null) => void;
  setStreet: (street: string) => void;
  setFullName: (name: string) => void;
  setPhone: (phoneNumber: string) => void;
  setAdditionalInfo: (info: string) => void;
  setIsDefault: (isDefault: boolean) => void;
  setAddressType: (type: string) => void;
  setLabel: (label: string) => void;
  setPostalCode: (code: string) => void;
  resetForm: () => void;
};

const AddressSelectorContext =
  React.createContext<AddressSelctorContextProps | null>(null);

function useAddressSelector(): AddressSelctorContextProps {
  const context = React.useContext(AddressSelectorContext);
  if (!context) {
    throw new Error(
      "useAddressSelector must be used within an AddressSelectorContext Provider"
    );
  }
  return context;
}

function ProvinceSelector() {
  const { selectedProvince, setSelectedProvince } = useAddressSelector();

  return (
    <Select
      value={selectedProvince || undefined}
      onValueChange={(value) => setSelectedProvince(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Tỉnh/Thành phố" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tỉnh/Thành phố</SelectLabel>
          {VIETNAM_PROVINCES.map((province, index) => (
            <SelectItem key={index} value={province.name}>
              {province.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function DistrictSelector() {
  const { selectedDistrict, selectedProvince, setSelectedDistrict } =
    useAddressSelector();

  return (
    <Select
      value={selectedDistrict || undefined}
      onValueChange={(value) => setSelectedDistrict(value)}
      disabled={!selectedProvince}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Quận/Huyện" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Quận/Huyện</SelectLabel>
          {VIETNAM_PROVINCES.map(
            (province) =>
              province.name === selectedProvince &&
              province.districts.map((district, index) => (
                <SelectItem key={index} value={district.name}>
                  {district.name}
                </SelectItem>
              ))
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function WardSelector() {
  const { selectedWard, selectedProvince, selectedDistrict, setSelectedWard } =
    useAddressSelector();

  return (
    <Select
      value={selectedWard || undefined}
      onValueChange={(value) => setSelectedWard(value)}
      disabled={!selectedDistrict}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Phường/Xã" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Phường/Xã</SelectLabel>
          {VIETNAM_PROVINCES.map(
            (province) =>
              province.name === selectedProvince &&
              province.districts.map(
                (district) =>
                  district.name === selectedDistrict &&
                  district.wards.map((ward, index) => (
                    <SelectItem key={index} value={ward.name}>
                      {ward.name}
                    </SelectItem>
                  ))
              )
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function StreetInput() {
  const { street, setStreet } = useAddressSelector();
  return (
    <Input
      value={street}
      placeholder="Số Nhà, Đường, Tên Tòa Nhà"
      onChange={(e) => setStreet(e.target.value)}
    />
  );
}

function ReciverNameInput() {
  const { fullName, setFullName } = useAddressSelector();
  return (
    <Input
      value={fullName}
      placeholder="Tên người nhận"
      onChange={(e) => setFullName(e.target.value)}
    />
  );
}

function ReciverPhoneNumberInput() {
  const { phone, setPhone } = useAddressSelector();
  return (
    <Input
      value={phone}
      placeholder="Số điện thoại người nhận"
      onChange={(e) => setPhone(e.target.value)}
    />
  );
}

function AdditionalInfoInput() {
  const { additionalInfo, setAdditionalInfo } = useAddressSelector();
  return (
    <Input
      value={additionalInfo}
      placeholder="Thông tin bổ sung"
      onChange={(e) => setAdditionalInfo(e.target.value)}
    />
  );
}

function LabelInput() {
  const { label, setLabel } = useAddressSelector();
  return (
    <Input
      value={label}
      placeholder="Tiêu đề địa chỉ"
      onChange={(e) => setLabel(e.target.value)}
    />
  );
}

function PostalCode() {
  const { postalCode, setPostalCode } = useAddressSelector();

  return (
    <Input
      value={postalCode}
      placeholder="Mã bưu điện"
      onChange={(e) => setPostalCode(e.target.value)}
    />
  );
}

function IsDefaultCheckbox() {
  const { isDefault, setIsDefault } = useAddressSelector();
  return (
    <div className="flex items-center gap-3">
      <Checkbox
        id="default"
        checked={isDefault}
        onCheckedChange={(checked) => {
          setIsDefault(checked === true);
        }}
      />
      <Label htmlFor="default">Đặt làm địa chỉ mặc định</Label>
    </div>
  );
}

function AddressTypes() {
  const { addressType, setAddressType } = useAddressSelector();

  return (
    <Select
      value={addressType || undefined}
      onValueChange={(value) => setAddressType(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Loại địa chỉ" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Loại địa chỉ</SelectLabel>
          <SelectItem value="HOME">Nhà riêng</SelectItem>
          <SelectItem value="WORK">Cơ quan</SelectItem>
          <SelectItem value="SCHOOL">Trường học</SelectItem>
          <SelectItem value="OTHER">Khác</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export default function AddressForm({
  formType = "CREATE",
  address,
}: {
  formType?: "CREATE" | "UPDATE";
  address?: Address;
}) {
  const {
    setIsDefault,
    setAddressType,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedWard,
    setStreet,
    setAdditionalInfo,
    setLabel,
    setPostalCode,
    setFullName,
    setPhone,
    resetForm,
  } = useAddressSelector();

  React.useEffect(() => {
    if (formType === "CREATE" && !address) {
      resetForm();
      return;
    }

    if (formType === "UPDATE" && address) {
      setIsDefault(address.isDefault);
      setAddressType(address.type);
      setSelectedProvince(address.province);
      setSelectedDistrict(address.district);
      setSelectedWard(address.ward);
      setStreet(address.street);
      setAdditionalInfo(address.additionalInfo);
      setLabel(address.label);
      setPostalCode(address.postalCode);
      setFullName(address.fullName);
      setPhone(address.phone);
    }
  }, [
    address,
    formType,
    setAdditionalInfo,
    setAddressType,
    setFullName,
    setIsDefault,
    setLabel,
    setPhone,
    setPostalCode,
    setSelectedDistrict,
    setSelectedProvince,
    setSelectedWard,
    setStreet,
    resetForm,
  ]);

  return (
    <div className="w-full grid gap-6 overflow-y-auto scrollbar-hide">
      <IsDefaultCheckbox />
      <AddressTypes />
      <ProvinceSelector />
      <DistrictSelector />
      <WardSelector />
      <StreetInput />
      <AdditionalInfoInput />
      <LabelInput />
      <PostalCode />
      <ReciverNameInput />
      <ReciverPhoneNumberInput />
    </div>
  );
}

function AddressSelectorProvider({ children }: { children: React.ReactNode }) {
  const [selectedProvince, setSelectedProvince] = React.useState<string | null>(
    null
  );
  const [selectedDistrict, setSelectedDistrict] = React.useState<string | null>(
    null
  );
  const [selectedWard, setSelectedWard] = React.useState<string | null>(null);
  const [street, setStreet] = React.useState<string>("");
  const [fullName, setFullName] = React.useState<string>("");
  const [phone, setPhone] = React.useState<string>("");
  const [additionalInfo, setAdditionalInfo] = React.useState<string>("");
  const [isDefault, setIsDefault] = React.useState<boolean>(false);
  const [addressType, setAddressType] = React.useState<string>("");
  const [label, setLabel] = React.useState<string>("");
  const [postalCode, setPostalCode] = React.useState<string>("");

  const resetForm = () => {
    setSelectedProvince(null);
    setSelectedDistrict(null);
    setSelectedWard(null);
    setStreet("");
    setFullName("");
    setPhone("");
    setAdditionalInfo("");
    setIsDefault(false);
    setAddressType("");
    setLabel("");
    setPostalCode("");
  };

  return (
    <AddressSelectorContext.Provider
      value={{
        selectedProvince,
        selectedDistrict,
        selectedWard,
        street,
        fullName,
        phone,
        additionalInfo,
        isDefault,
        addressType,
        label,
        postalCode,
        setSelectedProvince,
        setSelectedDistrict,
        setSelectedWard,
        setStreet,
        setFullName,
        setPhone,
        setAdditionalInfo,
        setIsDefault,
        setAddressType,
        setLabel,
        setPostalCode,
        resetForm,
      }}
    >
      {children}
    </AddressSelectorContext.Provider>
  );
}

export {
  useAddressSelector,
  AddressSelectorProvider,
  ProvinceSelector,
  DistrictSelector,
  WardSelector,
  StreetInput,
  ReciverNameInput,
  ReciverPhoneNumberInput,
  AdditionalInfoInput,
  LabelInput,
  IsDefaultCheckbox,
};
