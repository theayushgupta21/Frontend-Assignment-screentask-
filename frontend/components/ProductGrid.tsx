"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { products, priceBounds } from "@/lib/products";
import ProductCard from "./ProductCard";

export default function ProductGrid() {
    const searchParams = useSearchParams();

    const selectedCategories = searchParams.get("category")?.split(",").filter(Boolean) ?? [];
    const selectedBrands = searchParams.get("brand")?.split(",").filter(Boolean) ?? [];
    const query = searchParams.get("q")?.trim().toLowerCase() ?? "";

    const [priceMin, priceMax] = (searchParams.get("price") ?? `${priceBounds.min}-${priceBounds.max}`)
        .split("-")
        .map(Number);

    const filtered = useMemo(() => {
        return products.filter((product) => {
            const matchesCategory =
                selectedCategories.length === 0 || selectedCategories.includes(product.category);

            const matchesBrand =
                selectedBrands.length === 0 || selectedBrands.includes(product.brand);

            const matchesPrice = product.price >= priceMin && product.price <= priceMax;

            const matchesQuery =
                query.length === 0 ||
                product.title.toLowerCase().includes(query) ||
                product.category.toLowerCase().includes(query) ||
                product.brand.toLowerCase().includes(query);

            return matchesCategory && matchesBrand && matchesPrice && matchesQuery;
        });
    }, [selectedCategories, selectedBrands, priceMin, priceMax, query]);

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