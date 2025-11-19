import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

function PaymentCard({
  bankName,
  bankLogo,
  cardNumber,
  bankCardOwnerName,
  bankBranch,
  isDefaultPaymentMenthod,
}: {
  bankName: string;
  bankLogo: string;
  cardNumber: string;
  bankCardOwnerName: string;
  bankBranch: string;
  isDefaultPaymentMenthod: boolean;
}) {
  return (
    <main className="flex md:flex-row flex-col md:items-center gap-4">
      <Image
        src={bankLogo}
        alt={bankName}
        width={80}
        height={80}
        className="shrink-0"
      />

      <div className="text-sm max-w-xs">
        <div className="flex items-center gap-2">
          <p className="w-full mb-1.5 uppercase truncate">{bankName}</p>
          {isDefaultPaymentMenthod && (
            <div className="bg-primary text-primary-foreground px-3 py-1 text-xs ml-2 shrink-0">
              Mặc định
            </div>
          )}
        </div>
        <p className="w-full truncate">Họ và tên: {bankCardOwnerName}</p>
        <p className="w-full truncate">
          <span className="text-muted-foreground">Chi nhánh:</span> {bankBranch}
        </p>
      </div>

      <p className="font-semibold w-full">{cardNumber}</p>

      <div className="flex flex-row items-center justify-end gap-4">
        <Button variant={"link"} className="text-foreground">
          Xóa
        </Button>
        <Button variant={"outline"} className="rounded-none">
          Thiết lập mặc định
        </Button>
      </div>
    </main>
  );
}

export default function CheckoutPage() {
  return (
    <main className="w-full h-full p-4 bg-background dark:bg-accent/50 space-y-5">
      {/* Title */}
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold">Tài khoản ngân hàng</p>

        <div className="flex items-center gap-2 text-sm text-primary">
          <Plus size={15} />
          <p>Thêm ngân hàng</p>
        </div>
      </div>

      <div className="divide-y">
        <div className="py-5">
          <PaymentCard
            bankName="Viet Capital Bank - NHTMCP Ban Viet"
            bankLogo="/assets/icons/payments/apple-pay.svg"
            cardNumber="1234 5678 9012 3456"
            bankCardOwnerName="DOAN HUU QUANG"
            bankBranch="CN Ha Noi/ Chi nhanh khac"
            isDefaultPaymentMenthod={true}
          />
        </div>

        <div className="py-5">
          <PaymentCard
            bankName="Viet Capital Bank - NHTMCP Ban Viet"
            bankLogo="/assets/icons/payments/apple-pay.svg"
            cardNumber="1234 5678 9012 3456"
            bankCardOwnerName="DOAN HUU QUANG"
            bankBranch="CN Ha Noi/ Chi nhanh khac"
            isDefaultPaymentMenthod={false}
          />
        </div>
      </div>
    </main>
  );
}
