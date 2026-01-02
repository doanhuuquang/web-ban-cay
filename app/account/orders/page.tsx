"use client";

import OrderCard from "@/components/shared/order-card";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAuth } from "@/lib/contexts/auth-context";
import type { Order } from "@/lib/models/order";
import { getOrdersByProfileId } from "@/lib/services/order-service";
import { OrderStatusTypeLabel } from "@/lib/type/order-status";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Search } from "lucide-react";
import React from "react";

function FilterButtons({
  currentFilter,
  setCurrentFilter,
}: {
  currentFilter: string;
  setCurrentFilter: (filter: string) => void;
}) {
  const scrollSectionRef = React.useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = React.useState(false);
  const [canScrollRight, setCanScrollRight] = React.useState(true);

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

  const scrollAmount = 100;

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
          className="h-full absolute top-0 left-0 rounded-none bg-background dark:bg-accent text-foreground hover:bg-background hover:text-foreground border-r"
          onClick={() => handlePrev()}
        >
          <ChevronLeft />
        </Button>
      )}

      {/* Next button */}
      {canScrollRight && (
        <Button
          className="h-full absolute top-0 right-0 rounded-none bg-background dark:bg-accent text-foreground hover:bg-background hover:text-foreground border-l"
          onClick={() => handleNext()}
        >
          <ChevronRight />
        </Button>
      )}

      <div
        ref={scrollSectionRef}
        className="w-full flex overflow-x-auto scrollbar-hide "
      >
        <Button
          variant={"ghost"}
          className={cn(
            "rounded-none p-8 hover:text-primary hover:bg-background",
            currentFilter === "" && "border-b-3 border-primary text-primary"
          )}
          onClick={() => setCurrentFilter("")}
        >
          Tất cả
        </Button>
        {Object.entries(OrderStatusTypeLabel).map(([value, label], index) => (
          <Button
            key={index}
            variant={"ghost"}
            className={cn(
              "rounded-none p-8 hover:text-primary hover:bg-background",
              currentFilter === value &&
                "border-b-3 border-primary text-primary"
            )}
            onClick={() => setCurrentFilter(value)}
          >
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}

function OrderItems({ orders }: { orders: Order[] }) {
  if (orders.length === 0) {
    return (
      <div className="w-full h-full bg-background dark:bg-accent/50 p-4 text-sm text-muted-foreground">
        Chưa có đơn hàng nào trong mục này.
      </div>
    );
  }

  return (
    <div className="w-full h-fit grid grid-cols-1 gap-2">
      {orders.map((order, index) => (
        <OrderCard key={index} order={order} />
      ))}
    </div>
  );
}

export default function OrderPage() {
  const { user } = useAuth();
  const [currentFilter, setCurrentFilter] = React.useState("");
  const [searchQuery, setSearchQuery] = React.useState("");
  const [orders, setOrders] = React.useState<Order[]>([]);
  const [ordersFiltered, setOrdersFiltered] = React.useState<Order[]>([]);

  React.useEffect(() => {
    if (!user) return;

    const fetchOrders = async () => {
      const response = await getOrdersByProfileId({
        profileId: user.userProfile!.profileId,
      });

      const orders = response.orders.sort((a, b) => {
        return Number(b.orderId) - Number(a.orderId);
      });

      setOrders(orders);
    };

    fetchOrders();
  }, [user]);

  React.useEffect(() => {
    if (orders.length === 0) {
      setOrdersFiltered([]);
      return;
    }

    let filtered = orders;

    if (currentFilter !== "") {
      filtered = filtered.filter((order) => {
        return order.orderStatus === currentFilter;
      });
    }

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((order) => {
        if (order.orderId.toString().toLowerCase().includes(query)) {
          return true;
        }
      });
    }

    setOrdersFiltered(filtered);
  }, [orders, currentFilter, searchQuery]);

  return (
    <main className="h-full space-y-2">
      {/* Lọc đơn hàng */}
      <FilterButtons
        currentFilter={currentFilter}
        setCurrentFilter={setCurrentFilter}
      />

      {/* Tìm kiếm đơn hàng */}
      <InputGroup className="bg-background dark:bg-accent/50 py-8 rounded-none ring-0! border-0!">
        <InputGroupInput
          placeholder="Bạn có thể tìm kiếm theo ID đơn hàng"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
      </InputGroup>

      <OrderItems orders={ordersFiltered} />
    </main>
  );
}
