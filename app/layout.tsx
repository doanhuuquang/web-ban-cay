import "./globals.css";
import type { Metadata } from "next";
import { Fira_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import AppFooter from "@/components/shared/app-footer";
import { Toaster } from "sonner";
import {
  AppHeaderProvider,
  AppHeaderContent,
} from "@/components/shared/app-header";
import AuthProvider from "@/lib/contexts/auth-context";

const firaSans = Fira_Sans({
  weight: ["400", "500", "600", "700"],
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
      <body className={`${firaSans.className} antialiased min-w-xs`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            <AppHeaderProvider>
              <AppHeaderContent />
              <Toaster />
              {children}
              <AppFooter />
            </AppHeaderProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
