import Sidebar from "@/components/shared/account-sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Receipt, ShoppingBag } from "lucide-react";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-fit bg-accent dark:bg-background">
      <div className="w-full max-w-[1400px] m-auto md:px-4 py-4 space-y-4">
        <div className="w-full overflow-hidden px-4 py-6 grid md:grid-cols-3 grid-cols-1 gap-6 md:divide-x-3 divide-blue-ocean bg-background dark:bg-accent/50 shadow-sm">
          <div className="flex items-center gap-4">
            <Avatar className="size-15">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <div>
              <p className="font-bold text-lg">Doan Huu Quang</p>
              <p className="text-sm text-muted-foreground">0336314376</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-ocean size-15 flex items-center justify-center rounded-full">
              <ShoppingBag className="text-primary-foreground" />
            </div>

            <div>
              <p className="font-bold text-lg">0</p>
              <p className="text-sm text-muted-foreground">
                Tổng số đơn hàng đã mua
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-blue-ocean size-15 flex items-center justify-center rounded-full">
              <Receipt className="text-primary-foreground" />
            </div>

            <div>
              <p className="font-bold text-lg">0₫</p>
              <p className="text-sm text-muted-foreground">
                Tổng tiền tích lũy
              </p>
            </div>
          </div>
        </div>

        <div className="w-full grid md:grid-cols-3 grid-cols-1 gap-4">
          <Sidebar className="h-full md:col-span-1 bg-background dark:bg-accent/50 shadow-sm" />
          <main className="w-full md:col-span-2 overflow-hidden shadow-sm">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
