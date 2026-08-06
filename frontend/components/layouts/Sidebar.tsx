"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories, brands, priceBounds, products } from "@/lib/products";

// URL is the single source of truth for filters — see ProductGrid, which
// reads the same params. This makes filters shareable/bookmarkable and
// keeps Sidebar and ProductGrid in sync without prop drilling or a
// separate filter store.

function countFor(key: "category" | "brand", value: string) {
    return products.filter((p) => p[key] === value).length;
}

export default function Sidebar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const selectedCategories = searchParams.get("category")?.split(",").filter(Boolean) ?? [];
    const selectedBrands = searchParams.get("brand")?.split(",").filter(Boolean) ?? [];

    const [priceMin, priceMax] = (searchParams.get("price") ?? `${priceBounds.min}-${priceBounds.max}`)
        .split("-")
        .map(Number);

    function updateParams(mutator: (params: URLSearchParams) => void) {
        const params = new URLSearchParams(searchParams.toString());
        mutator(params);
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }

    function toggleValue(key: "category" | "brand", value: string) {
        updateParams((params) => {
            const current = params.get(key)?.split(",").filter(Boolean) ?? [];
            const next = current.includes(value)
                ? current.filter((v) => v !== value)
                : [...current, value];

            if (next.length === 0) {
                params.delete(key);
            } else {
                params.set(key, next.join(","));
            }
        });
    }

    function setPriceRange(min: number, max: number) {
        updateParams((params) => {
            params.set("price", `${min}-${max}`);
        });
    }

    function clearAll() {
        router.push(pathname, { scroll: false });
    }

    const hasActiveFilters =
        selectedCategories.length > 0 ||
        selectedBrands.length > 0 ||
        searchParams.has("price");

    return (
        <aside className="w-72 shrink-0 rounded-sm border border-[#D9D8D2] bg-white p-5">
            <div className="mb-5 flex items-center justify-between border-b border-[#D9D8D2] pb-4">
                <h2 className="font-display text-lg font-bold text-[#16171B]">Filters</h2>
                {hasActiveFilters && (
                    <button
                        onClick={clearAll}
                        className="font-catalog text-[11px] font-bold uppercase tracking-wide text-[#FF4B26] hover:underline"
                    >
                        Clear
                    </button>
                )}
            </div>

            {/* Categories */}
            <div className="mb-6">
                <h3 className="font-catalog mb-3 text-[11px] font-bold uppercase tracking-widest text-[#55575E]">
                    Category
                </h3>

                <div className="max-h-44 space-y-1 overflow-y-auto">
                    {categories.map((item) => (
                        <label
                            key={item}
                            className="flex cursor-pointer items-center justify-between gap-3 rounded-sm px-2 py-1.5 transition hover:bg-[#F1F0EC]"
                        >
                            <span className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="accent-[#FF4B26]"
                                    checked={selectedCategories.includes(item)}
                                    onChange={() => toggleValue("category", item)}
                                />
                                <span className="text-sm text-[#16171B]">{item}</span>
                            </span>
                            <span className="font-catalog text-xs text-[#55575E]">
                                {countFor("category", item)}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Price */}
            <div className="mb-6 border-t border-[#D9D8D2] pt-5">
                <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-catalog text-[11px] font-bold uppercase tracking-widest text-[#55575E]">
                        Price
                    </h3>
                    <span className="font-catalog rounded-sm bg-[#16171B] px-2 py-1 text-xs font-bold text-white">
                        ₹{priceMin.toLocaleString()}–₹{priceMax.toLocaleString()}
                    </span>
                </div>

                <div className="space-y-3">
                    <div>
                        <label className="font-catalog text-[10px] uppercase text-[#55575E]">Min</label>
                        <input
                            type="range"
                            min={priceBounds.min}
                            max={priceBounds.max}
                            value={priceMin}
                            onChange={(e) => {
                                const next = Math.min(Number(e.target.value), priceMax);
                                setPriceRange(next, priceMax);
                            }}
                            className="w-full accent-[#FF4B26]"
                        />
                    </div>
                    <div>
                        <label className="font-catalog text-[10px] uppercase text-[#55575E]">Max</label>
                        <input
                            type="range"
                            min={priceBounds.min}
                            max={priceBounds.max}
                            value={priceMax}
                            onChange={(e) => {
                                const next = Math.max(Number(e.target.value), priceMin);
                                setPriceRange(priceMin, next);
                            }}
                            className="w-full accent-[#FF4B26]"
                        />
                    </div>
                </div>
            </div>

            {/* Brands */}
            <div className="border-t border-[#D9D8D2] pt-5">
                <h3 className="font-catalog mb-3 text-[11px] font-bold uppercase tracking-widest text-[#55575E]">
                    Brand
                </h3>

                <div className="max-h-44 space-y-1 overflow-y-auto">
                    {brands.map((brand) => (
                        <label
                            key={brand}
                            className="flex cursor-pointer items-center justify-between gap-3 rounded-sm px-2 py-1.5 transition hover:bg-[#F1F0EC]"
                        >
                            <span className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="accent-[#FF4B26]"
                                    checked={selectedBrands.includes(brand)}
                                    onChange={() => toggleValue("brand", brand)}
                                />
                                <span className="text-sm text-[#16171B]">{brand}</span>
                            </span>
                            <span className="font-catalog text-xs text-[#55575E]">
                                {countFor("brand", brand)}
                            </span>
                        </label>
                    ))}
                </div>
            </div>
        </aside>
    );
}
