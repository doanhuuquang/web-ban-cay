"use client";

import AddressForm, {
  AddressSelectorProvider,
  useAddressSelector,
} from "@/components/shared/address-selector";
import InforField from "@/components/shared/infor-field";
import { Button } from "@/components/ui/button";
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
import { useAuth } from "@/lib/contexts/auth-context";
import { Address, AddressType } from "@/lib/models/address";
import {
  createAddressByProfileId,
  deleteAddressByAddressIdAndProfileId,
  updateAddressByAddressIdAndProfileId,
} from "@/lib/services/address-service";
import { cn } from "@/lib/utils";
import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  LoaderCircle,
  PenSquare,
  Plus,
  Settings2,
  SquarePen,
  Trash,
} from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import { API_SUCCESS_CODE } from "@/lib/constants/api-success-code";
import {
  DEFAULT_ERROR_MESSAGE,
  ERROR_MESSAGES,
} from "@/lib/constants/error-messages";
import {
  CREATED_ADDRESS_SUCCESS_MESSAGE,
  DELETE_ADDRESS_SUCCESS_MESSAGE,
  UPDATE_ADDRESS_SUCCESS_MESSAGE,
} from "@/lib/constants/success-messages";
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

function AddressList({
  addresses,
  currentAddress,
  setCurrentAddress,
}: {
  addresses: Address[];

  currentAddress: Address | null;
  setCurrentAddress: (address: Address) => void;
}) {
  const scrollSectionRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState<boolean>(false);
  const [canScrollRight, setCanScrollRight] = React.useState<boolean>(true);

  const checkScroll = () => {
    if (scrollSectionRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollSectionRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
    }
  };

  React.useEffect(() => {
    checkScroll();
    const carousel = scrollSectionRef.current;
    if (!carousel) return;

    carousel.addEventListener("scroll", checkScroll);
    window.addEventListener("resize", checkScroll);

    return () => {
      carousel.removeEventListener("scroll", checkScroll);
      window.removeEventListener("resize", checkScroll);
    };
  }, []);

  const scrollAmount = 300;

  const handlePrev = () => {
    scrollSectionRef.current?.scrollBy({
      left: -scrollAmount,
      behavior: "smooth",
    });
  };

  const handleNext = () => {
    scrollSectionRef.current?.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full bg-background dark:bg-accent/50 relative">
      {/* Prev button */}
      {canScrollLeft && (
        <Button
          className="h-full absolute top-0 left-0 rounded-none bg-background dark:bg-accent/90 text-foreground hover:bg-background hover:text-foreground border-r"
          onClick={() => handlePrev()}
        >
          <ChevronLeft />
        </Button>
      )}

      {/* Next button */}
      {canScrollRight && (
        <Button
          className="h-full absolute top-0 right-0 rounded-none bg-background dark:bg-accent/90 text-foreground hover:bg-background hover:text-foreground border-l"
          onClick={() => handleNext()}
        >
          <ChevronRight />
        </Button>
      )}

      <div
        ref={scrollSectionRef}
        className="w-full flex overflow-x-auto scrollbar-hide"
      >
        {addresses.length === 0 ? (
          <p className="px-4 py-6 text-muted-foreground">Chưa có địa chỉ nào</p>
        ) : (
          addresses.map((address, index) => (
            <Button
              key={index}
              variant={"ghost"}
              className={cn(
                "rounded-none px-4 py-8 hover:text-primary hover:bg-background shrink-0",
                currentAddress?.addressId === address.addressId &&
                  "border-b-3 border-primary text-primary"
              )}
              onClick={() => setCurrentAddress(address)}
            >
              {address.label ?? address.shortAddress}

              {address.isDefault && (
                <p className="px-1 py-0.5 bg-primary text-primary-foreground text-[7px] font-light">
                  Mặc định
                </p>
              )}
            </Button>
          ))
        )}
      </div>
    </div>
  );
}

function CreateNewAddress() {
  const { user } = useAuth();
  const {
    selectedProvince,
    selectedDistrict,
    selectedWard,
    street,
    fullName,
    phone,
    additionalInfo,
    addressType,
    isDefault,
    postalCode,
    label,
    resetForm,
  } = useAddressSelector();
  const [isShowSheet, setIsShowSheet] = React.useState<boolean>(false);
  const [isCreating, setIsCreating] = React.useState<boolean>(false);
  const [isValid, setIsValid] = React.useState<boolean>(false);

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
      setIsValid(true);
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
    isValid,
    isDefault,
  ]);

  const handleCreateAddress = async () => {
    if (!user || !user.userProfile || !isValid) return;

    try {
      setIsCreating(true);

      const code = await createAddressByProfileId({
        userProfileId: user.userProfile.profileId,
        data: {
          fullName: fullName,
          phone: phone,
          street: street,
          ward: selectedWard!,
          district: selectedDistrict!,
          province: selectedProvince!,
          postalCode: postalCode,
          additionalInfo: additionalInfo,
          isDefault: isDefault,
          type: addressType,
          label: label,
        },
      });

      toast(
        code !== API_SUCCESS_CODE.CREATE_ADDRESS_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.CREATE_ADDRESS_SUCCESS
              ? ERROR_MESSAGES[code]
                ? ERROR_MESSAGES[code]
                : DEFAULT_ERROR_MESSAGE
              : CREATED_ADDRESS_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => {},
          },
        }
      );

      if (code === API_SUCCESS_CODE.CREATE_ADDRESS_SUCCESS) {
        resetForm();
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <Sheet open={isShowSheet} onOpenChange={setIsShowSheet}>
      <SheetTrigger asChild>
        <Button className="w-full bg-background text-foreground py-6 hover:bg-background/50 hover:text-foreground">
          <Plus />
          Thêm địa chỉ mới
        </Button>
      </SheetTrigger>
      <SheetContent isShowXButton={false} className="sm:max-w-lg w-full">
        <SheetHeader>
          <SheetTitle>Thêm địa chỉ giao hàng mới</SheetTitle>
          <SheetDescription>
            Bạn có thể chỉnh sửa hoặc xóa địa chỉ sau khi thêm mới.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 px-4 overflow-y-auto scrollbar-hide">
          <AddressForm />
        </div>
        <SheetFooter>
          <Button
            type="submit"
            disabled={isCreating || !isValid}
            onClick={() => handleCreateAddress()}
          >
            {isCreating ? <LoaderCircle className="animate-spin" /> : <Plus />}
            Thêm
          </Button>
          <SheetClose asChild>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Hủy</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Xác nhận hủy</DialogTitle>
                  <DialogDescription>
                    Bạn có chắc chắn muốn hủy việc thêm địa chỉ mới? Mọi thay
                    đổi bạn đã thực hiện sẽ không được lưu.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Tiếp tục thêm mới</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        resetForm();
                        setIsShowSheet(false);
                      }}
                    >
                      Hủy
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function UpdateAddress({
  address,
  isShowUpdateSheet,
  setIsShowUpdateSheet,
}: {
  address: Address;
  isShowUpdateSheet: boolean;
  setIsShowUpdateSheet: (value: boolean) => void;
}) {
  const [isUpdating, setIsUpdating] = React.useState<boolean>(false);
  const [isValid, setIsValid] = React.useState<boolean>(false);

  const { user } = useAuth();
  const {
    selectedProvince,
    selectedDistrict,
    selectedWard,
    street,
    fullName,
    phone,
    additionalInfo,
    addressType,
    isDefault,
    postalCode,
    label,
    resetForm,
  } = useAddressSelector();

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
      setIsValid(true);
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
    isValid,
    isDefault,
  ]);

  const handleUpdateAddress = async () => {
    if (!user || !user.userProfile || !isValid) return;

    try {
      setIsUpdating(true);

      const code = await updateAddressByAddressIdAndProfileId({
        addressId: address.addressId,
        profileId: user.userProfile.profileId,
        data: {
          fullName: fullName,
          phone: phone,
          street: street,
          ward: selectedWard!,
          district: selectedDistrict!,
          province: selectedProvince!,
          postalCode: postalCode,
          additionalInfo: additionalInfo,
          isDefault: isDefault,
          type: addressType,
          label: label,
        },
      });

      toast(
        code !== API_SUCCESS_CODE.UPDATE_ADDRESS_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.UPDATE_ADDRESS_SUCCESS
              ? ERROR_MESSAGES[code]
                ? ERROR_MESSAGES[code]
                : DEFAULT_ERROR_MESSAGE
              : UPDATE_ADDRESS_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => {},
          },
        }
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Sheet open={isShowUpdateSheet} onOpenChange={setIsShowUpdateSheet}>
      <SheetContent isShowXButton={false} className="sm:max-w-lg w-full">
        <SheetHeader>
          <SheetTitle>Chỉnh sửa địa chỉ giao hàng</SheetTitle>
          <SheetDescription>
            Bạn có thể chỉnh sửa hoặc xóa địa chỉ sau khi thêm mới.
          </SheetDescription>
        </SheetHeader>
        <div className="flex-1 px-4 overflow-y-auto scrollbar-hide">
          <AddressForm address={address} formType={"UPDATE"} />
        </div>
        <SheetFooter>
          <Button
            type="submit"
            disabled={isUpdating || !isValid}
            onClick={() => {
              handleUpdateAddress();
            }}
          >
            {isUpdating ? (
              <LoaderCircle className="animate-spin" />
            ) : (
              <SquarePen />
            )}
            Lưu thay đổi
          </Button>
          <SheetClose asChild>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Hủy</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Xác nhận hủy</DialogTitle>
                  <DialogDescription>
                    Bạn có chắc chắn muốn hủy việc chỉnh sửa địa chỉ? Mọi thay
                    đổi bạn đã thực hiện sẽ không được lưu.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Tiếp tục chỉnh sửa</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      onClick={() => {
                        resetForm();
                        setIsShowUpdateSheet(false);
                      }}
                    >
                      Hủy
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

function DeliveryAddress({ address }: { address: Address }) {
  const { user } = useAuth();
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false);
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [isShowUpdateSheet, setIsShowUpdateSheet] = React.useState(false);

  const handleDeleteAddress = async () => {
    if (!user || !user.userProfile) return;

    try {
      setIsDeleting(true);

      const code = await deleteAddressByAddressIdAndProfileId({
        addressId: address.addressId,
        profileId: user!.userProfile!.profileId,
      });

      toast(
        code !== API_SUCCESS_CODE.CREATE_ADDRESS_SUCCESS
          ? "Thất bại"
          : "Thành công",
        {
          description:
            code !== API_SUCCESS_CODE.DELETE_ADDRESS_SUCCESS
              ? ERROR_MESSAGES[code]
                ? ERROR_MESSAGES[code]
                : DEFAULT_ERROR_MESSAGE
              : DELETE_ADDRESS_SUCCESS_MESSAGE,
          action: {
            label: "Oke",
            onClick: () => {},
          },
        }
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div className="w-full p-4 bg-background dark:bg-accent/50 space-y-3">
        {/* Title */}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold">Địa chỉ giao hàng</p>

          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size={"icon"} className="rounded-full">
                <Ellipsis />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end">
              <DropdownMenuLabel>Lựa chọn</DropdownMenuLabel>
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  Đặt làm mặc định
                  <DropdownMenuShortcut>
                    <Settings2 />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => setIsShowUpdateSheet(true)}>
                  Chỉnh sửa
                  <DropdownMenuShortcut>
                    <PenSquare />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>

                <DropdownMenuItem onSelect={() => setShowDeleteDialog(true)}>
                  Xóa
                  <DropdownMenuShortcut>
                    <Trash />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="w-full grid md:grid-cols-2 grid-cols-1 md:gap-x-10">
          <InforField label="Tỉnh/Thành phố" value={address.province} />
          <InforField label="Quận/Huyện" value={address.district} />
          <InforField label="Phường/Xã" value={address.ward} />
          <InforField
            label="Số Nhà, Đường, Tên Tòa Nhà"
            value={address.street}
          />
          <InforField
            label="Thông tin bổ sung"
            value={address.additionalInfo}
          />
          <InforField label="Mã bưu điện" value={address.postalCode} />
          <InforField label="Loại địa chỉ" value={AddressType[address.type]} />
          <InforField label="Tên người nhận" value={address.fullName} />
          <InforField label="Số điện thoại" value={address.phone} />
        </div>
      </div>
      {/* Xóa địa chỉ */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogTrigger asChild></DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa địa chỉ này? Không thể hoàn tác sau khi
              thực hiện xóa.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Hủy</Button>
            </DialogClose>
            <Button
              className="bg-red-600 text-red-50 hover:bg-red-700 hover:text-red-50"
              onClick={() => handleDeleteAddress()}
            >
              {isDeleting ? (
                <>
                  <LoaderCircle className="animate-spin" /> Đang xóa
                </>
              ) : (
                "Xóa địa chỉ này"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      {/* Cập nhật địa chỉ */}
      <UpdateAddress
        address={address}
        isShowUpdateSheet={isShowUpdateSheet}
        setIsShowUpdateSheet={setIsShowUpdateSheet}
      />
    </>
  );
}

export default function AddressesPage() {
  const { user } = useAuth();
  const [currentAddress, setCurrentAddress] = React.useState<Address | null>(
    null
  );

  return (
    <AddressSelectorProvider>
      <main className="h-full space-y-2">
        {/* Danh sách thông tin giao hàng */}
        <AddressList
          addresses={
            user?.userProfile?.addressResponse.map(Address.fromJson) || []
          }
          currentAddress={currentAddress}
          setCurrentAddress={setCurrentAddress}
        />

        <CreateNewAddress />

        {!currentAddress ? (
          <div className="w-full h-full bg-background p-4">
            <p className="text-muted-foreground text-sm">
              Vui lòng chọn địa chỉ để xem
            </p>
          </div>
        ) : (
          <>
            {/* Địa chỉ giao hàng */}
            <DeliveryAddress address={currentAddress} />
          </>
        )}
      </main>
    </AddressSelectorProvider>
  );
}
