"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, Plus, Upload } from 'lucide-react';
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUploadBannerMutation } from "@/features/api/apiSlice";

const bannerSchema = z.object({
    name: z.string().min(1, "Banner name is required"),
    url: z.string().url("Please enter a valid image URL"),
});

type BannerFormData = z.infer<typeof bannerSchema>;

export default function AddBanner() {
    const [uploadBanner] = useUploadBannerMutation();
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<BannerFormData>({
        resolver: zodResolver(bannerSchema),
        defaultValues: {
            name: "",
            url: "",
        },
    });

    const onSubmit = async (data: BannerFormData) => {
        setIsLoading(true);
        try {
            await uploadBanner(data).unwrap();
            form.reset();
            setOpen(false);
        } catch (error) {
            console.error("Failed to upload banner:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const watchedUrl = form.watch("url");

    return (
        <div className="p-8">
            <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex justify-center">
                    <Dialog open={open} onOpenChange={setOpen}>
                        <DialogTrigger asChild>
                            <Button className="bg-red-600 hover:bg-red-700 text-white">
                                <Plus className="h-4 w-4 mr-2" />
                                Add Banner
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[500px]">
                            <DialogHeader>
                                <DialogTitle>Add New Banner</DialogTitle>
                                <DialogDescription>
                                    Upload a new banner to your dashboard. Enter the banner name and image URL.
                                </DialogDescription>
                            </DialogHeader>

                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Banner Name</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Enter banner name"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    A descriptive name for your banner
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="url"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Image URL</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="https://example.com/banner.jpg"
                                                        {...field}
                                                        disabled={isLoading}
                                                    />
                                                </FormControl>
                                                <FormDescription>
                                                    Direct URL to your banner image
                                                </FormDescription>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />

                                    {/* Preview Section */}
                                    {watchedUrl && watchedUrl.length > 0 && (
                                        <div className="space-y-2">
                                            <FormLabel>Preview</FormLabel>
                                            <div className="border rounded-lg p-3 bg-muted/20">
                                                <div className="relative w-full h-40 bg-muted rounded overflow-hidden">
                                                    <img
                                                        src={watchedUrl || "/placeholder.svg"}
                                                        alt="Banner preview"
                                                        className="w-full h-full object-cover transition-opacity duration-200"
                                                        onLoad={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.style.opacity = "1";
                                                        }}
                                                        onError={(e) => {
                                                            const target = e.target as HTMLImageElement;
                                                            target.src = "/placeholder.svg?height=160&width=400&text=Invalid+Image+URL";
                                                            target.style.opacity = "0.7";
                                                        }}
                                                        style={{ opacity: "0.8" }}
                                                    />
                                                </div>
                                                <p className="text-xs text-muted-foreground mt-2 truncate">
                                                    {watchedUrl}
                                                </p>
                                            </div>
                                        </div>
                                    )}

                                    <DialogFooter>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => setOpen(false)}
                                            disabled={isLoading}
                                        >
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={isLoading}>
                                            {isLoading ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Creating...
                                                </>
                                            ) : (
                                                <>
                                                    <Upload className="mr-2 h-4 w-4" />
                                                    Create Banner
                                                </>
                                            )}
                                        </Button>
                                    </DialogFooter>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
