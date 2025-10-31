import { cn } from "@/lib/utils";
import Link from "next/link";
import { Anton, Fjalla_One, Lobster_Two } from "next/font/google";

const dancingScript = Anton({
  weight: "400",
  subsets: ["latin"],
});

export default function AppLogo({
  className,
  isHeaderFixed = false,
}: {
  className?: string;
  isHeaderFixed?: boolean;
}) {
  return (
    <Link
      href={"/"}
      className={cn("w-fit uppercase", dancingScript.className, className)}
    >
      <span className="text-primary">G</span>
      <span className={isHeaderFixed ? "text-white" : "text-foreground"}>
        Plant
      </span>
    </Link>
  );
}
