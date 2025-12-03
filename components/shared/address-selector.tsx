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

import { AddressTypeLabel } from "@/lib/models/address";
import { District } from "@/lib/models/district";
import { Province } from "@/lib/models/province";
import { Ward } from "@/lib/models/ward";
import {
  getDistricts,
  getProvinces,
  getWards,
} from "@/lib/services/ghn-service";
import React from "react";

type AddressSelctorContextProps = {
  isFormValid: boolean;
  selectedProvince: Province | null;
  selectedDistrict: District | null;
  selectedWard: Ward | null;
  street: string;
  fullName: string;
  phone: string;
  additionalInfo: string;
  isDefault: boolean;
  addressType: string;
  label: string;
  postalCode: string;
  setSelectedProvince: (province: Province | null) => void;
  setSelectedDistrict: (district: District | null) => void;
  setSelectedWard: (ward: Ward | null) => void;
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
  const [provinces, setProvinces] = React.useState<Province[]>([]);

  const {
    selectedProvince,
    setSelectedProvince,
    setSelectedDistrict,
    setSelectedWard,
  } = useAddressSelector();

  React.useEffect(() => {
    const fetchProvinces = async () => {
      const response = await getProvinces();
      setProvinces(response.provinces);
    };

    fetchProvinces();
  }, []);

  return (
    <Select
      value={selectedProvince?.provinceID || ""}
      onValueChange={(value) => {
        setSelectedProvince(
          provinces.find((province) => province.provinceID === value) || null
        );
        setSelectedDistrict(null);
        setSelectedWard(null);
      }}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Tỉnh/Thành phố" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tỉnh/Thành phố</SelectLabel>
          {provinces.map((province, index) => (
            <SelectItem key={index} value={province.provinceID}>
              {province.provinceName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function DistrictSelector() {
  const [districts, setDistricts] = React.useState<District[]>([]);
  const {
    selectedProvince,
    selectedDistrict,
    setSelectedDistrict,
    setSelectedWard,
  } = useAddressSelector();

  React.useEffect(() => {
    if (!selectedProvince) {
      setDistricts([]);
      return;
    }

    const fetchDistricts = async () => {
      const response = await getDistricts({
        provinceId: selectedProvince.provinceID,
      });
      setDistricts(response.districts);
    };

    fetchDistricts();
  }, [selectedProvince]);

  return (
    <Select
      value={selectedDistrict?.districtID || ""}
      onValueChange={(value) => {
        setSelectedDistrict(
          districts.find((district) => district.districtID === value) || null
        );
        setSelectedWard(null);
      }}
      disabled={!selectedProvince}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Quận/Huyện" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Quận/Huyện</SelectLabel>
          {districts.map((district, index) => (
            <SelectItem key={index} value={district.districtID}>
              {district.districtName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

function WardSelector() {
  const [wards, setWards] = React.useState<Ward[]>([]);
  const { selectedProvince, selectedDistrict, selectedWard, setSelectedWard } =
    useAddressSelector();

  React.useEffect(() => {
    if (!selectedProvince || !selectedDistrict) {
      setWards([]);
      return;
    }

    const fetchWards = async () => {
      const response = await getWards({
        districtId: selectedDistrict.districtID,
      });
      setWards(response.wards);
    };

    fetchWards();
  }, [selectedProvince, selectedDistrict]);

  return (
    <Select
      value={selectedWard?.wardCode.toString() || ""}
      onValueChange={(value) =>
        setSelectedWard(wards.find((ward) => ward.wardCode === value) || null)
      }
      disabled={!selectedDistrict}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Phường/Xã" />
      </SelectTrigger>

      <SelectContent>
        <SelectGroup>
          <SelectLabel>Phường/Xã</SelectLabel>

          {wards.map((ward, index) => (
            <SelectItem key={index} value={ward.wardCode}>
              {ward.wardName}
            </SelectItem>
          ))}
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
        checked={isDefault}
        id="default"
        onCheckedChange={(checked) => setIsDefault(Boolean(checked))}
      />
      <Label htmlFor="default">Đặt làm địa chỉ mặc định</Label>
    </div>
  );
}

function AddressTypes() {
  const { addressType, setAddressType } = useAddressSelector();

  return (
    <Select
      value={addressType}
      onValueChange={(value) => setAddressType(value)}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Loại địa chỉ" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Loại địa chỉ</SelectLabel>
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

export default function AddressForm() {
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
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);
  const [selectedProvince, setSelectedProvince] =
    React.useState<Province | null>(null);
  const [selectedDistrict, setSelectedDistrict] =
    React.useState<District | null>(null);
  const [selectedWard, setSelectedWard] = React.useState<Ward | null>(null);
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

  React.useEffect(() => {
    if (
      selectedProvince &&
      selectedDistrict &&
      selectedWard &&
      street &&
      fullName &&
      phone &&
      addressType &&
      postalCode &&
      label &&
      additionalInfo
    ) {
      setIsFormValid(true);
    }
  }, [
    selectedProvince,
    selectedDistrict,
    selectedWard,
    street,
    fullName,
    phone,
    additionalInfo,
    addressType,
    postalCode,
    label,
  ]);

  return (
    <AddressSelectorContext.Provider
      value={{
        isFormValid,
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
