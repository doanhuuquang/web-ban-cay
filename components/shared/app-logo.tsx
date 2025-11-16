import { cn } from "@/lib/utils";
import Link from "next/link";
import { Anton, Lobster } from "next/font/google";
import Image from "next/image";

const locster = Lobster({
  weight: "400",
  subsets: ["latin"],
});

const SIZE_MAP_ICON = {
  xs: 20,
  sm: 30,
  md: 40,
  lg: 50,
} as const;

const SIZE_MAP_TEXT = {
  xs: 15,
  sm: 20,
  md: 25,
  lg: 35,
} as const;

export default function AppLogo({
  size = "md",
  className,
}: {
  size?: "xs" | "sm" | "md" | "lg";
  className?: string;
}) {
  return (
    <Link
      href={"/"}
      className={cn(
        "w-fit text-foreground flex items-center gap-1",
        locster.className,
        className
      )}
    >
      <Image
        src={"/assets/icons/gplant/gplant.svg"}
        alt="GPLANT"
        width={SIZE_MAP_ICON[size]}
        height={SIZE_MAP_ICON[size]}
      />

      <p style={{ fontSize: `${SIZE_MAP_TEXT[size]}px` }}>Gplant</p>
    </Link>
  );
}
