"use client";

import Image from "next/image";
import { useState } from "react";
import type { Product } from "@/lib/products";
import { useCartStore } from "@/store/useCartStore";
import StarRating from "@/components/Starrating";

export default function ProductDetailClient({ product }: { product: Product }) {
    const addItem = useCartStore((state) => state.addItem);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);
    const [added, setAdded] = useState(false);

    // No real gallery data in the mock catalog, so we simulate a few angles
    // off the single product image — swap for product.images[] in a real API.
    const images = [product.image, `${product.image}?2`, `${product.image}?3`];

    function handleAddToCart() {
        addItem(product, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
    }

    return (
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-10 px-4 py-10 sm:px-6 lg:grid-cols-2">
            {/* Image section */}
            <div>
                <div className="relative aspect-square overflow-hidden rounded-sm border border-[#D9D8D2] bg-[#F1F0EC]">
                    <Image
                        src={images[activeImage]}
                        alt={product.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                    />
                </div>
                <div className="mt-3 flex gap-3">
                    {images.map((src, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveImage(i)}
                            className={`relative h-20 w-20 overflow-hidden rounded-sm border-2 ${activeImage === i ? "border-[#FF4B26]" : "border-[#D9D8D2]"
                                }`}
                        >
                            <Image src={src} alt="" fill className="object-cover" sizes="80px" />
                        </button>
                    ))}
                </div>
            </div>

            {/* Details section */}
            <div className="flex flex-col">
                <span className="font-catalog text-xs font-bold uppercase tracking-widest text-[#FF4B26]">
                    # {product.category}
                </span>
                <h1 className="font-display mt-1 text-2xl font-bold text-[#16171B]">{product.title}</h1>

                <div className="mt-2">
                    <StarRating rating={product.rating} />
                </div>

                <p className="font-catalog mt-4 text-3xl font-bold text-[#16171B]">
                    ₹{product.price.toLocaleString()}
                </p>

                <p className="mt-4 leading-relaxed text-[#55575E]">{product.description}</p>

                <div className="mt-4 text-sm text-[#55575E]">
                    Brand: <span className="font-medium text-[#16171B]">{product.brand}</span>
                </div>

                {/* Quantity selector */}
                <div className="mt-6 flex items-center gap-4">
                    <span className="font-catalog text-xs font-bold uppercase tracking-wide text-[#55575E]">
                        Quantity
                    </span>
                    <div className="flex items-center rounded-sm border border-[#D9D8D2]">
                        <button
                            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                            className="px-3 py-1.5 text-lg text-[#55575E] hover:text-[#FF4B26]"
                            aria-label="Decrease quantity"
                        >
                            −
                        </button>
                        <span className="font-catalog w-8 text-center text-sm font-semibold">{quantity}</span>
                        <button
                            onClick={() => setQuantity((q) => q + 1)}
                            className="px-3 py-1.5 text-lg text-[#55575E] hover:text-[#FF4B26]"
                            aria-label="Increase quantity"
                        >
                            +
                        </button>
                    </div>
                </div>

                <button
                    onClick={handleAddToCart}
                    className="font-catalog mt-6 w-full rounded-sm bg-[#16171B] py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#FF4B26] sm:w-auto sm:px-10"
                >
                    {added ? "Added ✓" : "Add to Cart"}
                </button>

                {/* Reviews (optional section) */}
                <div className="mt-10 border-t border-[#D9D8D2] pt-6">
                    <h2 className="font-catalog text-xs font-bold uppercase tracking-widest text-[#55575E]">
                        Reviews
                    </h2>
                    <ReviewsList rating={product.rating} />
                </div>
            </div>
        </div>
    );
}

function ReviewsList({ rating }: { rating: number }) {
    // Static sample reviews for demo purposes — swap for real review data
    // fetched per-product in a production build.
    const reviews = [
        { name: "Aarav", comment: "Exactly as described, fast delivery.", stars: 5 },
        { name: "Priya", comment: "Good value for the price.", stars: 4 },
        { name: "Rohan", comment: "Works well, packaging could be better.", stars: Math.max(3, Math.round(rating) - 1) },
    ];

    return (
        <ul className="mt-4 space-y-4">
            {reviews.map((review, i) => (
                <li key={i} className="rounded-sm border border-[#D9D8D2] p-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-[#16171B]">{review.name}</span>
                        <StarRating rating={review.stars} />
                    </div>
                    <p className="mt-1 text-sm text-[#55575E]">{review.comment}</p>
                </li>
            ))}
        </ul>
    );
}