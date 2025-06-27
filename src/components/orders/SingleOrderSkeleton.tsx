import { Card, CardContent, CardHeader } from '../ui/card';
import { Skeleton } from '../ui/skeleton';

export default function SingleOrderSkeleton() {
    return (
        <Card className="w-full">
            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div className="space-y-1">
                        <Skeleton className="h-5 w-40" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-3 w-3 rounded-full" />
                            <Skeleton className="h-3 w-24" />
                        </div>
                    </div>
                    <Skeleton className="h-6 w-24 rounded-full" />
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Products List Skeleton */}
                <div>
                    <Skeleton className="h-4 w-24 mb-2" />
                    <div className="space-y-2">
                        {[1, 2].map((item) => (
                            <div key={item} className="flex items-center gap-3 p-2 bg-muted/30 rounded-lg">
                                <Skeleton className="w-12 h-12 rounded-md" />
                                <div className="flex-1 min-w-0 space-y-1">
                                    <Skeleton className="h-4 w-3/4" />
                                    <Skeleton className="h-3 w-1/2" />
                                </div>
                                <div className="text-right">
                                    <Skeleton className="h-4 w-16" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                    {/* Shipping Info Skeleton */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20 mb-2" />
                        <div className="space-y-2">
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-3 w-3 rounded-full" />
                                <Skeleton className="h-3 w-32" />
                            </div>
                            <div className="flex items-start gap-1">
                                <Skeleton className="h-3 w-3 rounded-full" />
                                <div className="min-w-0 space-y-1">
                                    <Skeleton className="h-3 w-40" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                            <div className="flex items-center gap-1">
                                <Skeleton className="h-3 w-3 rounded-full" />
                                <Skeleton className="h-3 w-28" />
                            </div>
                        </div>
                    </div>

                    {/* Payment Info Skeleton */}
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20 mb-2" />
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-3 w-12" />
                            </div>
                            <div className="flex justify-between">
                                <Skeleton className="h-3 w-16" />
                                <Skeleton className="h-3 w-12" />
                            </div>
                            <div className="h-px bg-muted my-1" />
                            <div className="flex justify-between">
                                <Skeleton className="h-3 w-10" />
                                <Skeleton className="h-3 w-16" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Transaction ID Skeleton */}
                <div className="flex items-center justify-center gap-2 pt-2 border-t">
                    <Skeleton className="h-3 w-3 rounded-full" />
                    <Skeleton className="h-3 w-36" />
                </div>
            </CardContent>
        </Card>
    );
} 