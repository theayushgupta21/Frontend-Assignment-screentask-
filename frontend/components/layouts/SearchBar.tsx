"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function SearchBar() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const [value, setValue] = useState(searchParams.get("q") ?? "");
    const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (debounceRef.current) clearTimeout(debounceRef.current);

        debounceRef.current = setTimeout(() => {
            const params = new URLSearchParams(searchParams.toString());
            if (value.trim()) {
                params.set("q", value.trim());
            } else {
                params.delete("q");
            }
            router.push(`${pathname}?${params.toString()}`, { scroll: false });
            // eslint-disable-next-line react-hooks/exhaustive-deps
        }, 300);

        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [value]);

    return (
        <input
            type="text"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Search the catalog..."
            className="w-full max-w-md rounded-sm border border-[#D9D8D2] bg-white px-4 py-2 text-sm text-[#16171B] outline-none placeholder:text-[#55575E] focus:border-[#16171B]"
        />
    );
}