import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fjalla_One } from "next/font/google";
import { useIsAppHeaderFixed } from "@/lib/hooks/use-app-header";

const dancingScript = Fjalla_One({
  weight: "400",
  subsets: ["latin"],
});

export default function AppLogo({ className }: { className?: string }) {
  const isFixed = useIsAppHeaderFixed();

  return (
    <Link
      href={"/"}
      className={cn("w-fit uppercase", dancingScript.className, className)}
    >
      <span className="text-primary">G</span>
      <span className={isFixed ? "text-white" : "text-foreground"}>Plant</span>
    </Link>
  );
}
