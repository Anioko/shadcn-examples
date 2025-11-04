"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export type CRUDMode = "create" | "edit" | "view" | "delete";

export type FieldConfig = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "date" | "number" | "email";
  required?: boolean;
  options?: { label: string; value: string }[];
  placeholder?: string;
  disabled?: boolean;
};

export type CRUDDrawerProps<T = any> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: CRUDMode;
  title: string;
  description?: string;
  fields: FieldConfig[];
  data?: T;
  onSubmit: (data: T) => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
  isLoading?: boolean;
};

export function CRUDDrawer<T extends Record<string, any>>({
  open,
  onOpenChange,
  mode,
  title,
  description,
  fields,
  data,
  onSubmit,
  onDelete,
  isLoading = false,
}: CRUDDrawerProps<T>) {
  const [formData, setFormData] = React.useState<Partial<T>>(data || {});
  const [errors, setErrors] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (data) {
      setFormData(data);
    } else {
      setFormData({});
    }
    setErrors({});
  }, [data, open]);

  const handleFieldChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    fields.forEach((field) => {
      if (field.required && !formData[field.name]) {
        newErrors[field.name] = `${field.label} is required`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (mode === "view") {
      onOpenChange(false);
      return;
    }

    if (mode === "delete") {
      if (onDelete) {
        await onDelete();
      }
      onOpenChange(false);
      return;
    }

    if (!validateForm()) {
      return;
    }

    await onSubmit(formData as T);
    onOpenChange(false);
  };

  const renderField = (field: FieldConfig) => {
    const value = formData[field.name] || "";
    const isDisabled = mode === "view" || field.disabled;

    switch (field.type) {
      case "textarea":
        return (
          <Textarea
            id={field.name}
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            disabled={isDisabled}
            className={errors[field.name] ? "border-red-500" : ""}
          />
        );

      case "select":
        return (
          <Select
            value={value}
            onValueChange={(val) => handleFieldChange(field.name, val)}
            disabled={isDisabled}
          >
            <SelectTrigger className={errors[field.name] ? "border-red-500" : ""}>
              <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "date":
        return (
          <Input
            id={field.name}
            type="date"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            disabled={isDisabled}
            className={errors[field.name] ? "border-red-500" : ""}
          />
        );

      case "number":
        return (
          <Input
            id={field.name}
            type="number"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            disabled={isDisabled}
            className={errors[field.name] ? "border-red-500" : ""}
          />
        );

      case "email":
        return (
          <Input
            id={field.name}
            type="email"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            disabled={isDisabled}
            className={errors[field.name] ? "border-red-500" : ""}
          />
        );

      default:
        return (
          <Input
            id={field.name}
            type="text"
            value={value}
            onChange={(e) => handleFieldChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            disabled={isDisabled}
            className={errors[field.name] ? "border-red-500" : ""}
          />
        );
    }
  };

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <form onSubmit={handleSubmit}>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            {description && <DrawerDescription>{description}</DrawerDescription>}
          </DrawerHeader>

          <div className="px-4 py-4 space-y-4 max-h-[60vh] overflow-y-auto">
            {mode === "delete" ? (
              <div className="text-center py-6">
                <p className="text-muted-foreground">
                  Are you sure you want to delete this item? This action cannot be undone.
                </p>
              </div>
            ) : (
              fields.map((field) => (
                <div key={field.name} className="space-y-2">
                  <Label htmlFor={field.name}>
                    {field.label}
                    {field.required && <span className="text-red-500 ml-1">*</span>}
                  </Label>
                  {renderField(field)}
                  {errors[field.name] && (
                    <p className="text-sm text-red-500">{errors[field.name]}</p>
                  )}
                </div>
              ))
            )}
          </div>

          <DrawerFooter>
            {mode === "delete" ? (
              <>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Delete
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" type="button" disabled={isLoading}>
                    Cancel
                  </Button>
                </DrawerClose>
              </>
            ) : mode === "view" ? (
              <DrawerClose asChild>
                <Button variant="outline" type="button">
                  Close
                </Button>
              </DrawerClose>
            ) : (
              <>
                <Button type="submit" disabled={isLoading} className="w-full">
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  {mode === "create" ? "Create" : "Save Changes"}
                </Button>
                <DrawerClose asChild>
                  <Button variant="outline" type="button" disabled={isLoading}>
                    Cancel
                  </Button>
                </DrawerClose>
              </>
            )}
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
}
