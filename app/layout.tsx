import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AppFooter from "@/components/shared/app-footer";
import { Toaster } from "sonner";
import { AppHeader } from "@/components/shared/app-header";
import UserProvider from "@/lib/contexts/user-context";

const manrope = Manrope({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mua cây cảnh & dụng cụ làm vườn online | GPlant",
  icons: {
    icon: [{ url: "/assets/icons/gplant/gplant.svg" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${manrope.className} antialiased min-w-xs`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <AppHeader />
            {children}
            <Toaster />
            <AppFooter />
          </UserProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
