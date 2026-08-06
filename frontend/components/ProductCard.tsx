"use client";

import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/store/useCartStore";
import StarRating from "./Starrating";

export default function ProductCard({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <Link
            href={`/product/${product.id}`}
            className="group flex flex-col overflow-hidden rounded-sm border border-[#CFE6FF] bg-white transition hover:border-[color:var(--accent)]"
        >
            <div className="relative aspect-square w-full overflow-hidden border-b border-[#CFE6FF] bg-[#F6FBFF]">
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover transition duration-300 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
            </div>

            <div className="flex flex-1 flex-col gap-1.5 p-4">
                <span className="font-catalog text-[10px] font-bold uppercase tracking-widest text-[#5B6B80]">
                    # {product.category}
                </span>
                <h3 className="font-display line-clamp-2 text-sm font-semibold leading-snug text-[#16171B]">
                    {product.title}
                </h3>
                <StarRating rating={product.rating} />

                <div className="mt-auto flex items-center justify-between pt-3">
                    <span className="font-catalog text-lg font-bold text-[#062039]">
                        ₹{product.price.toLocaleString()}
                    </span>
                    <button
                        onClick={(e) => {
                            e.preventDefault(); // don't navigate to detail page
                            e.stopPropagation();
                            addItem(product, 1);
                        }}
                        className="font-catalog rounded-sm bg-[color:var(--accent)] px-3 py-1.5 text-[11px] font-bold uppercase tracking-wide text-white transition hover:bg-[color:var(--accent-strong)]"
                    >
                        Add
                    </button>
                </div>
            </div>
        </Link>
    );
}