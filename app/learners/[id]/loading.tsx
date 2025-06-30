import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function LearnerDetailLoading() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {/* Header Loading */}
            <div className="flex items-center space-x-2">
                <Skeleton className="h-8 w-8" />
                <Skeleton className="h-8 w-48" />
            </div>

            {/* Learner Header */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <Skeleton className="h-24 w-24 rounded-full" />
                <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                            <Skeleton className="h-8 w-48 mb-2" />
                            <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-32" />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-20" />
                            <Skeleton className="h-6 w-16" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {Array(3).fill(0).map((_, i) => (
                            <div key={i} className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" />
                                <div>
                                    <Skeleton className="h-4 w-20 mb-1" />
                                    <Skeleton className="h-3 w-24" />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div>
                        <div className="flex items-center justify-between mb-1">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-8" />
                        </div>
                        <Skeleton className="h-2 w-full" />
                    </div>
                </div>
            </div>

            {/* Tabs Loading */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
                {Array(5).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-9 w-20" />
                ))}
            </div>

            {/* Content Loading */}
            <div className="grid gap-4 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-32 mb-2" />
                        <Skeleton className="h-4 w-48" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div>
                                <Skeleton className="h-5 w-40 mb-2" />
                                <Skeleton className="h-4 w-24" />
                            </div>
                            <div>
                                <div className="flex items-center justify-between mb-1">
                                    <Skeleton className="h-4 w-16" />
                                    <Skeleton className="h-4 w-8" />
                                </div>
                                <Skeleton className="h-2 w-full" />
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Skeleton className="h-4 w-4" />
                                    <Skeleton className="h-4 w-24" />
                                </div>
                                <Skeleton className="h-9 w-20" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <Skeleton className="h-6 w-28 mb-2" />
                        <Skeleton className="h-4 w-36" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-4 w-28" />
                            </div>
                            <div className="flex space-x-2">
                                <Skeleton className="h-9 flex-1" />
                                <Skeleton className="h-9 flex-1" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
} 