import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function AssignmentsLoading() {
    return (
        <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
            {/* Header Loading */}
            <div className="flex items-center justify-between space-y-2">
                <div className="flex items-center space-x-2">
                    <Skeleton className="h-8 w-8" />
                    <Skeleton className="h-8 w-48" />
                </div>
                <Skeleton className="h-10 w-40" />
            </div>

            {/* Stats Loading */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
                {Array(5).fill(0).map((_, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-4" />
                        </CardHeader>
                        <CardContent>
                            <Skeleton className="h-8 w-12 mb-1" />
                            <Skeleton className="h-3 w-24" />
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Tabs Loading */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
                {Array(4).fill(0).map((_, i) => (
                    <Skeleton key={i} className="h-9 w-28" />
                ))}
            </div>

            {/* Filter Bar Loading */}
            <Card>
                <CardContent className="p-6">
                    <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-24" />
                    </div>
                </CardContent>
            </Card>

            {/* Assignments List Loading */}
            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <Skeleton className="h-6 w-36 mb-2" />
                            <Skeleton className="h-4 w-52" />
                        </div>
                        <Skeleton className="h-4 w-4" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {Array(4).fill(0).map((_, i) => (
                            <div key={i} className="flex items-center space-x-4 rounded-lg border p-4">
                                <Skeleton className="h-4 w-4" />
                                <div className="flex-1 space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Skeleton className="h-5 w-40" />
                                        <Skeleton className="h-5 w-20" />
                                        <Skeleton className="h-5 w-16" />
                                        <Skeleton className="h-5 w-16" />
                                    </div>
                                    <Skeleton className="h-4 w-72" />
                                    <div className="grid grid-cols-4 gap-4">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-20" />
                                        <Skeleton className="h-4 w-16" />
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        <Skeleton className="h-5 w-20" />
                                        <Skeleton className="h-5 w-24" />
                                        <Skeleton className="h-5 w-16" />
                                    </div>
                                </div>
                                <div className="flex flex-col space-y-2">
                                    <Skeleton className="h-8 w-8" />
                                    <Skeleton className="h-8 w-8" />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
} 