import { cn } from "@/lib/utils";
import Link from "next/link";
import { Anton, Fugaz_One } from "next/font/google";

const dancingScript = Fugaz_One({
  weight: "400",
  subsets: ["latin"],
});

export default function AppLogo({
  className,
  isLogoDark = false,
  isHeaderFixed = false,
}: {
  className?: string;
  isLogoDark?: boolean;
  isHeaderFixed?: boolean;
}) {
  return (
    <Link
      href={"/"}
      className={cn("w-fit uppercase", dancingScript.className, className)}
    >
      <span className="text-primary">G</span>
      <span
        className={cn(
          isHeaderFixed ? "text-white" : "text-[#1e1e1e] dark:text-foreground",
          isLogoDark && "text-white"
        )}
      >
        Plant
      </span>
    </Link>
  );
}
