import { Card, CardContent } from "@/components/ui/card";
import { SidebarMenuSkeleton } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";

export default function BrandsLoading() {
    return (
        <div className="bg-white rounded-lg shadow-sm border-gray-200 p-6">
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <Skeleton className="h-8 w-48" />
                    <SidebarMenuSkeleton className="h-10 w-32" />
                </div>
                <Card className="border-gray-200">
                    <CardContent className="p-4">
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
                <Card className="border-gray-200">
                    <CardContent className="p-0">
                        <div className="space-y-4 p-4">
                            {[...Array(6)]?.map((_, i) => (
                                <div key={i} className="flex items-center gap-4">
                                    <Skeleton className="h-12 w-12 rounded-lg" />
                                    <div className="flex-1 space-y-2">
                                        <Skeleton className="h-4 w-32" />
                                        <Skeleton className="h-3 w-24" />
                                    </div>
                                    <Skeleton className="h-6 w-20" />
                                    <Skeleton className="h-6 w-16" />
                                    <Skeleton className="h-8 w-8" />
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
