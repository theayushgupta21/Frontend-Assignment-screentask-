"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/layouts/Navbar";
import { useCartStore } from "@/store/useCartStore";

const SHIPPING = 99;

export default function CartPage() {
    const { items, updateQuantity, removeItem, totalPrice } = useCartStore();

    // Avoid rendering localStorage-derived state before hydration completes.
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    const subtotal = mounted ? totalPrice() : 0;
    const shipping = items.length > 0 ? SHIPPING : 0;
    const total = subtotal + shipping;

    return (
        <div className="min-h-screen bg-[#F1F0EC]">
            <Navbar />

            <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
                <h1 className="font-display mb-6 text-2xl font-bold text-[#16171B]">Your Cart</h1>

                {!mounted ? null : items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center rounded-sm border border-dashed border-[#D9D8D2] py-24 text-center">
                        <p className="font-display text-lg font-semibold text-[#16171B]">Your cart is empty</p>
                        <Link
                            href="/"
                            className="font-catalog mt-4 rounded-sm bg-[#16171B] px-6 py-2 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#FF4B26]"
                        >
                            Continue shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
                        {/* Item list */}
                        <div className="space-y-4 lg:col-span-2">
                            {items.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex items-center gap-4 rounded-sm border border-[#D9D8D2] bg-white p-4"
                                >
                                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-sm bg-[#F1F0EC]">
                                        <Image src={item.image} alt={item.title} fill className="object-cover" sizes="80px" />
                                    </div>

                                    <div className="flex-1">
                                        <Link href={`/product/${item.id}`} className="font-display text-sm font-semibold text-[#16171B] hover:text-[#FF4B26]">
                                            {item.title}
                                        </Link>
                                        <p className="font-catalog mt-1 text-sm text-[#55575E]">₹{item.price.toLocaleString()}</p>
                                    </div>

                                    <div className="flex items-center rounded-sm border border-[#D9D8D2]">
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                            className="px-3 py-1 text-lg text-[#55575E] hover:text-[#FF4B26]"
                                            aria-label="Decrease quantity"
                                        >
                                            −
                                        </button>
                                        <span className="font-catalog w-8 text-center text-sm font-semibold">{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                            className="px-3 py-1 text-lg text-[#55575E] hover:text-[#FF4B26]"
                                            aria-label="Increase quantity"
                                        >
                                            +
                                        </button>
                                    </div>

                                    <p className="font-catalog w-24 text-right text-sm font-bold text-[#16171B]">
                                        ₹{(item.price * item.quantity).toLocaleString()}
                                    </p>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="text-xs font-semibold text-red-600 hover:underline"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>

                        {/* Summary */}
                        <div className="h-fit rounded-sm border border-[#D9D8D2] bg-white p-6">
                            <h2 className="font-catalog mb-4 text-xs font-bold uppercase tracking-widest text-[#55575E]">
                                Order Summary
                            </h2>
                            <div className="font-catalog space-y-2 text-sm text-[#55575E]">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>₹{subtotal.toLocaleString()}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>₹{shipping.toLocaleString()}</span>
                                </div>
                            </div>
                            <div className="font-catalog mt-4 flex justify-between border-t border-[#D9D8D2] pt-4 text-base font-bold text-[#16171B]">
                                <span>Total</span>
                                <span>₹{total.toLocaleString()}</span>
                            </div>
                            <button className="font-catalog mt-6 w-full rounded-sm bg-[#16171B] py-3 text-xs font-bold uppercase tracking-wide text-white transition hover:bg-[#FF4B26]">
                                Checkout
                            </button>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
