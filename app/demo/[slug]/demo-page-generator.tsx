"use client";

import { redirect } from 'next/navigation'
import { useEffect } from 'react'

export default function DemoPageGenerator({ name }: { name: string }) {
  useEffect(() => {
    // Since examples have been removed, redirect to ReqArchitect dashboard
    window.location.href = '/dashboard';
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting to ReqArchitect...</h1>
        <p className="text-muted-foreground">Examples have been moved to ReqArchitect modules.</p>
      </div>
    </div>
  );
}
