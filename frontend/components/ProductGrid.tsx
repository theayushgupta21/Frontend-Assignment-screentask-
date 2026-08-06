"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useEffect, useState } from "react";
import type { Product } from "@/lib/products";
import { products as staticProducts } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
    const searchParams = useSearchParams();

    const [products, setProducts] = useState<Product[] | null>(null);

    useEffect(() => {
        // Fetch filtered products from the new API route. If it fails, fall
        // back to the static catalog so the UI remains usable.
        const qs = typeof window !== "undefined" ? window.location.search : "";

        fetch(`/api/electronics${qs}`)
            .then((res) => (res.ok ? res.json() : Promise.reject(res)))
            .then((data) => setProducts(data.products ?? []))
            .catch(() => setProducts(staticProducts));
    }, [searchParams?.toString()]);

    const selectedCategories = searchParams.get("category")?.split(",").filter(Boolean) ?? [];
    const selectedBrands = searchParams.get("brand")?.split(",").filter(Boolean) ?? [];
    const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

    // If the API returned products we assume server-side filtering applied
    // and just display them. While loading (products === null) fall back to
    // client filtering of the static catalog so the UI is responsive.
    const filtered = useMemo(() => {
        const source = products === null ? staticProducts : products;

        return source.filter((product) => {
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(product.category);

            const matchesBrand =
                selectedBrands.length === 0 || selectedBrands.includes(product.brand);

            // price filter only applied client-side when present in the URL
            const priceParam = searchParams.get("price");
            if (priceParam) {
                const [min, max] = priceParam.split("-").map(Number);
                if (product.price < min || product.price > max) return false;
            }

            const matchesQuery =
                query.length === 0 ||
                product.title.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query);

            return matchesCategory && matchesBrand && matchesQuery;
        });
    }, [products, selectedCategories, selectedBrands, query, searchParams]);

    if (filtered.length === 0) {
        return (
            <div className="flex flex-1 flex-col items-center justify-center rounded-sm border border-dashed border-[#D9D8D2] py-24 text-center">
                <p className="font-catalog text-xs font-bold uppercase tracking-widest text-[#55575E]">
                    0 results
                </p>
                <p className="font-display mt-2 text-lg font-semibold text-[#16171B]">No products found</p>
                <p className="mt-1 text-sm text-[#55575E]">
                    Try clearing a filter or searching for something else.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    );
}