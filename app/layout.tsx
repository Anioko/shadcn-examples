import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import React from "react";
import GoogleAnalyticsInit from "@/lib/ga";
import { ThemeProvider } from "next-themes";

const geist = Geist({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Shadcnexamples: Shadcn UI Examples, Components and Blocks",
  description:
    "Shadcn UI examples, components, and blocks built with Tailwind CSS. For React and Vue.js. Open source. TypeScript compatible."
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
