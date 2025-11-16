"use client";

import { Laptop, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import React from "react";

export function AppThemeModeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="flex items-center gap-0 border rounded-full">
      <Button
        variant={theme == "light" ? "outline" : "ghost"}
        size={"icon"}
        onClick={() => setTheme("light")}
        className="rounded-full"
      >
        <Sun />
      </Button>
      <Button
        variant={theme == "dark" ? "outline" : "ghost"}
        size={"icon"}
        onClick={() => setTheme("dark")}
        className="rounded-full"
      >
        <Moon />
      </Button>

      <Button
        variant={theme == "system" ? "outline" : "ghost"}
        size={"icon"}
        onClick={() => setTheme("system")}
        className="rounded-full"
      >
        <Laptop />
      </Button>
    </div>
  );
}
