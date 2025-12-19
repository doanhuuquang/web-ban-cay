"use client";
import CouponCard from "@/components/shared/coupon-card";
import { Coupon } from "@/lib/models/coupon";
import { getAllCoupons } from "@/lib/services/coupon-service";
import React from "react";

export default function CheckoutPage() {
  const [coupons, setCoupons] = React.useState<Coupon[]>([]);

  // Fetch available coupons
  React.useEffect(() => {
    const fetchCoupons = async () => {
      const coupons: Coupon[] = await getAllCoupons();

      if (coupons.length > 0) setCoupons(coupons);
    };

    fetchCoupons();
  }, []);

  return (
    <main className="w-full h-full p-4 bg-background dark:bg-accent/50 space-y-4">
      {/* Title */}
      <p className="text-lg font-bold">Mã giảm giá</p>

      {coupons.length === 0 ? (
        <p className="text-sm text-muted-foreground">Chưa có mã giảm giá nào</p>
      ) : (
        coupons.map((coupon, index) => (
          <CouponCard key={index} coupon={coupon} />
        ))
      )}
    </main>
  );
}
