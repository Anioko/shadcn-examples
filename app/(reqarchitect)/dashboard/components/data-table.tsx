"use client";

import * as React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Settings } from "lucide-react";

export interface CapabilityData {
  id: number;
  name: string;
  owner: string;
  status: string;
  applications: string;
  lastUpdated: string;
}

export function DataTable({ data }: { data: CapabilityData[] }) {
  return (
    <Tabs defaultValue="capabilities" className="w-full flex-col justify-start gap-6">
      <div className="flex items-center justify-between px-4 lg:px-6">
        <TabsList className="**:data-[slot=badge]:bg-muted-foreground/30 **:data-[slot=badge]:size-5 **:data-[slot=badge]:rounded-full **:data-[slot=badge]:px-1">
          <TabsTrigger value="capabilities">
            Business Capabilities <Badge variant="secondary">{data.length}</Badge>
          </TabsTrigger>
          <TabsTrigger value="applications">
            Applications <Badge variant="secondary">23</Badge>
          </TabsTrigger>
          <TabsTrigger value="architecture">
            Architecture Reviews <Badge variant="secondary">5</Badge>
          </TabsTrigger>
          <TabsTrigger value="compliance">Compliance Status</TabsTrigger>
        </TabsList>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Settings />
            <span className="hidden lg:inline">Configure</span>
          </Button>
          <Button variant="outline" size="sm">
            <Plus />
            <span className="hidden lg:inline">Add Capability</span>
          </Button>
        </div>
      </div>
      <TabsContent
        value="capabilities"
        className="relative flex flex-col gap-4 overflow-auto px-4 lg:px-6">
        <div className="overflow-hidden rounded-lg border">
          <Table>
            <TableHeader className="bg-muted sticky top-0 z-10">
              <TableRow>
                <TableHead>Capability Name</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Supporting Applications</TableHead>
                <TableHead>Last Updated</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((capability) => (
                <TableRow key={capability.id}>
                  <TableCell className="font-medium">{capability.name}</TableCell>
                  <TableCell>{capability.owner}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={capability.status === "Active" ? "default" : "secondary"}
                    >
                      {capability.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{capability.applications}</TableCell>
                  <TableCell className="text-muted-foreground">{capability.lastUpdated}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </TabsContent>
      <TabsContent value="applications" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="architecture" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
      <TabsContent value="compliance" className="flex flex-col px-4 lg:px-6">
        <div className="aspect-video w-full flex-1 rounded-lg border border-dashed"></div>
      </TabsContent>
    </Tabs>
  );
}