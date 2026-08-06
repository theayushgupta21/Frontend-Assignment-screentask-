"use client";

import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

import SearchBar from "./SearchBar";
import ThemeToggle from "./ThemeToggle";
import { useCartStore } from "@/store/useCartStore";

export default function Navbar() {
    // Cart is persisted to localStorage, which doesn't exist on the server.
    // Reading it directly during SSR would render "0" then flip after hydration,
    // causing a hydration mismatch warning. Only trust the count after mount.
    const totalItems = useCartStore((state) => state.totalItems());
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <header className="sticky top-0 z-10 border-b border-(--color-border) bg-surface/90  backdrop-blur">
            {/* 3-column grid: logo | search (centered) | cart + avatar.
          grid-cols-[1fr_2fr_1fr] keeps the search bar visually centered
          on the page instead of centered only in the leftover space. */}
            <div className="mx-auto grid max-w-7xl grid-cols-[auto_1fr_auto] items-center gap-4 px-4 py-4 sm:grid-cols-[1fr_2fr_1fr] sm:px-6">
                {/* Logo — left */}
                <Link href="/" className="font-display text-xl font-bold tracking-tighttext-(--color-foreground)">
                    Shop<span className="text-(--color-accent)">.</span>
                </Link>

                {/* Search — center, hidden on the smallest screens to keep the row from crowding */}
                <div className="hidden justify-self-stretch sm:block">
                    {/* useSearchParams inside SearchBar requires a Suspense boundary */}
                    <Suspense fallback={null}>
                        <SearchBar />
                    </Suspense>
                </div>

                {/* Cart + avatar — right */}
                <div className="flex items-center justify-end gap-3">
                    <ThemeToggle />
                    <Link
                        href="/cart"
                        className="relative rounded-sm border border-(--color-border) p-2 text-(--color-foreground) transition hover:border-(--color-foreground)"
                        aria-label="Cart"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6A1 1 0 0 0 5.6 19H17M17 19a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM9 21a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                        </svg>
                        {mounted && totalItems > 0 && (
                            <span className="font-catalog absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-sm bg-(--color-accent) px-1 text-[10px] font-bold text-white">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    <Link
                        href="#"
                        className="flex h-9 w-9 items-center justify-center rounded-sm border border-(--color-border)text-[color:var(--color-foreground)] transition hover:border-(--color-foreground)"
                        aria-label="Account"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
                            <circle cx="12" cy="8" r="3.5" />
                            <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" strokeLinecap="round" />
                        </svg>
                    </Link>
                </div>

                {/* Search on mobile — full width, second row */}
                <div className="col-span-3 sm:hidden">
                    <Suspense fallback={null}>
                        <SearchBar />
                    </Suspense>
                </div>
            </div>
        </header>
    );
}