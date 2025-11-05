import React from "react";
import { ProjectProvider } from "@/lib/contexts/project-context";

export default function ReqArchitectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ProjectProvider>
      {children}
    </ProjectProvider>
  );
}
