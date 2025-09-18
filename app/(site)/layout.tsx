import { SiteHeader } from "@/components/site-header";
import React from "react";
import { SiteFooter } from "@/components/site-footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SiteHeader />
      {children}

      <Card className="mx-auto mb-10 max-w-2xl py-10 text-center">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Didn&#39;t find what you were looking for?
          </CardTitle>
          <CardDescription>
            Share your ideas for new examples, components, and features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button>
            <Link
              href="https://github.com/shadcn-examples/shadcn-examples/discussions/categories/suggestions"
              target="_blank">
              Make a suggestion
            </Link>
          </Button>
        </CardContent>
      </Card>
      <SiteFooter />
    </>
  );
}
