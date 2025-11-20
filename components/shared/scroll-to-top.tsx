"use client";

import { Button } from "@/components/ui/button";
import { ChevronsUp } from "lucide-react";
import React from "react";

export default function ScrollToTop({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isShow, setIsShow] = React.useState<boolean>(false);

  React.useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY >= 500 && !isShow) {
        setIsShow(true);
      } else if (currentY < 500 && isShow) {
        setIsShow(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isShow]);

  const scrollToTop = () => {
    return window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="w-full h-full">
      {isShow && (
        <Button
          size={"icon"}
          onClick={() => scrollToTop()}
          className="fixed bottom-19 right-4 z-50 rounded-full p-6 hover:scale-110 transition-all border-2 border-background"
        >
          <ChevronsUp className="size-7" />
        </Button>
      )}

      {children}
    </div>
  );
}
