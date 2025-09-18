import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import React from "react";
import GoogleAnalyticsInit from "@/lib/ga";
import { ThemeProvider } from "next-themes";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

const geist = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500"]
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
        <ThemeProvider attribute="class">{children}</ThemeProvider>
        {process.env.NODE_ENV === "production" ? <GoogleAnalyticsInit /> : null}
      </body>
    </html>
  );
}
