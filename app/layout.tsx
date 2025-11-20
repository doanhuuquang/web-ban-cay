import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import AppFooter from "@/components/shared/app-footer";
import { Toaster } from "sonner";
import { AppHeader } from "@/components/shared/app-header";
import ScrollToTop from "@/components/shared/scroll-to-top";
import ChatBotPopup from "@/components/shared/chat-bot-popup";

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
        <ScrollToTop>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ChatBotPopup />
            <AppHeader />
            {children}
            <Toaster />
            <AppFooter />
          </ThemeProvider>
        </ScrollToTop>
      </body>
    </html>
  );
}
