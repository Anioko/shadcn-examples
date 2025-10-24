import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import React from "react";
import GoogleAnalyticsInit from "@/lib/ga";
import { ThemeProvider } from "next-themes";

const geist = localFont({
  src: [
    {
      path: "../assets/Inter/Inter_18pt-Light.ttf",
      weight: "300",
      style: "normal"
    },
    {
      path: "../assets/Inter/Inter_18pt-Regular.ttf",
      weight: "400",
      style: "normal"
    },
    {
      path: "../assets/Inter/Inter_18pt-Medium.ttf",
      weight: "500",
      style: "normal"
    },
    {
      path: "../assets/Inter/Inter_18pt-SemiBold.ttf",
      weight: "600",
      style: "normal"
    },
    {
      path: "../assets/Inter/Inter_18pt-Bold.ttf",
      weight: "700",
      style: "normal"
    }
  ]
});

export const metadata: Metadata = {
  title: "ReqArchitect: Enterprise Architecture Platform",
  description:
    "ReqArchitect is a comprehensive enterprise architecture platform for strategic planning, requirements management, and business model analysis. Built with modern web technologies."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${geist.className} `}>
        <ThemeProvider defaultTheme="light" attribute="class" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === "production" ? <GoogleAnalyticsInit /> : null}
      </body>
    </html>
  );
}
