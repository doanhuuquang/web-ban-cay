import { cn } from "@/lib/utils";
import Link from "next/link";
import { Anton } from "next/font/google";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
});

export default function AppLogo({ className }: { className?: string }) {
  return (
    <Link
      href={"/"}
      className={cn("w-fit uppercase", anton.className, className)}
    >
      <span className="text-primary">G</span>
      <span className="text-foreground">Plant</span>
    </Link>
  );
}
