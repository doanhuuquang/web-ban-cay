import { Checkbox } from "@/components/ui/checkbox";
import { formatMoney } from "@/lib/helpers/format-money";
import { Coupon } from "@/lib/models/coupon";
import { format } from "date-fns";
import { Banknote, Percent } from "lucide-react";

export default function CouponCard({
  coupon,
  onClick,
  isSelected = false,
}: {
  coupon: Coupon;
  onClick?: () => void;
  isSelected?: boolean;
}) {
  return (
    <div className="w-full grid grid-cols-6 border-l-5 bg-background dark:bg-muted/50 border-orange-500 border-dashed">
      <div className="w-full h-full bg-linear-to-r from-orange-500 to-orange-400 flex items-center justify-center">
        {coupon.discountType === "PERCENTAGE" ? (
          <Percent className="text-orange-100 size-7" />
        ) : (
          <Banknote className="text-orange-100 size-7" />
        )}
      </div>
      <div className="col-span-5 p-4 border flex justify-between gap-4">
        <div className="space-y-1">
          {coupon.discountType === "PERCENTAGE" ? (
            <p className="font-semibold">
              Giảm {coupon.discountPercent}% tối đa{" "}
              {formatMoney(coupon.maxDiscountAmount)}
            </p>
          ) : (
            <p className="font-semibold">
              Giảm -{formatMoney(coupon.discountAmount)}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Đơn tối thiểu {formatMoney(coupon.minOrderValue)}
          </p>

          <p className="text-xs text-muted-foreground">
            Hết hạn {format(coupon.expiryDate, "dd/MM/yyyy")}
          </p>
        </div>

        {onClick && (
          <Checkbox
            checked={isSelected}
            onClick={() => onClick()}
            className="rounded-full size-5 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
          />
        )}
      </div>
    </div>
  );
}
