"use client";

import * as React from "react";
import { usePathname } from "next/navigation";

export function useIsAppHeaderFixed() {
  const [isFixed, setIsFixed] = React.useState<boolean>(false);

  const pathname = usePathname();
  /*
      "/products/"  → "/products"
      "/products"   → "/products"
      "/"           → "/"
  */
  const currentPath = pathname?.replace(/\/+$/, "") || "/";

  React.useEffect(() => {
    if (currentPath !== "/") {
      setIsFixed(false);
      return;
    }

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsFixed(false);
      } else {
        setIsFixed(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentPath]);

  return isFixed;
}
