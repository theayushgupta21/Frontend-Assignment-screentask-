import { Suspense } from "react";
import Navbar from "@/components/layouts/Navbar";
import Sidebar from "@/components/layouts/Sidebar";
import ProductGrid from "@/components/ProductGrid";

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#F1F0EC]">
            <Navbar />

            <main className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row">
                {/* Sidebar and ProductGrid both read useSearchParams, which requires
            a Suspense boundary in the App Router. */}
                <Suspense fallback={<div className="w-72" />}>
                    <Sidebar />
                </Suspense>

                <div className="flex-1">
                    <Suspense fallback={<GridSkeleton />}>
                        <ProductGrid />
                    </Suspense>
                </div>
            </main>
        </div>
    );
}

function GridSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-72 animate-pulse rounded-sm bg-[#E5E4DF]" />
            ))}
        </div>
    );
}