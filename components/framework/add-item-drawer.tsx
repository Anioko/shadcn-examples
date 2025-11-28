"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
} from "@/components/ui/drawer"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const formSchema = z.object({
    header: z.string().min(2, {
        message: "Header must be at least 2 characters.",
    }),
    type: z.string().min(1, {
        message: "Type is required.",
    }),
    status: z.string().min(1, {
        message: "Status is required.",
    }),
    target: z.string().optional(),
    limit: z.string().optional(),
    reviewer: z.string().optional(),
})

interface AddItemDrawerProps {
    open: boolean
    onOpenChange: (open: boolean) => void
    frameworkSlug: string
    grandchildId: string
    grandchildName: string
    onSuccess?: (data: any) => void
}

export function AddItemDrawer({
    open,
    onOpenChange,
    frameworkSlug,
    grandchildId,
    grandchildName,
    onSuccess,
}: AddItemDrawerProps) {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            header: "",
            type: grandchildName,
            status: "Not Started",
            target: "",
            limit: "",
            reviewer: "Assign reviewer",
        },
    })

    // Reset form when drawer opens
    React.useEffect(() => {
        if (open) {
            form.reset({
                header: "",
                type: grandchildName,
                status: "Not Started",
                target: "",
                limit: "",
                reviewer: "Assign reviewer",
            })
        }
    }, [open, grandchildName, form])

    function onSubmit(values: z.infer<typeof formSchema>) {
        // Simulate API call
        setTimeout(() => {
            const newItem = {
                ...values,
                id: Math.floor(Math.random() * 10000),
                grandchildId,
                frameworkSlug,
            }

            console.log("Submitting:", newItem)
            toast.success("Item added successfully")
            onSuccess?.(newItem)
            onOpenChange(false)
        }, 500)
    }

    return (
        <Drawer open={open} onOpenChange={onOpenChange}>
            <DrawerContent>
                <div className="mx-auto w-full max-w-sm">
                    <DrawerHeader>
                        <DrawerTitle>Add {grandchildName}</DrawerTitle>
                        <DrawerDescription>
                            Add a new item to the {grandchildName} list.
                        </DrawerDescription>
                    </DrawerHeader>
                    <div className="p-4 pb-0">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                <FormField
                                    control={form.control}
                                    name="header"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Header</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Item name" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="status"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Not Started">Not Started</SelectItem>
                                                        <SelectItem value="In Process">In Process</SelectItem>
                                                        <SelectItem value="Done">Done</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="reviewer"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Reviewer</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select reviewer" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Assign reviewer">Unassigned</SelectItem>
                                                        <SelectItem value="Eddie Lake">Eddie Lake</SelectItem>
                                                        <SelectItem value="Jamik Tashpulatov">Jamik Tashpulatov</SelectItem>
                                                        <SelectItem value="Emily Whalen">Emily Whalen</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="target"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Target</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="0" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="limit"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Limit</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="0" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <DrawerFooter>
                                    <Button type="submit">Submit</Button>
                                    <DrawerClose asChild>
                                        <Button variant="outline">Cancel</Button>
                                    </DrawerClose>
                                </DrawerFooter>
                            </form>
                        </Form>
                    </div>
                </div>
            </DrawerContent>
        </Drawer>
    )
}
