import { NextResponse } from "next/server";
import { fetchElectronicsProducts } from "@/lib/dummyjson";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category")?.split(",").filter(Boolean);
    const brand = searchParams.get("brand")?.split(",").filter(Boolean);
    const q = searchParams.get("q")?.trim().toLowerCase();

    const priceParam = searchParams.get("price");
    let priceMin: number | undefined;
    let priceMax: number | undefined;
    if (priceParam) {
        const [min, max] = priceParam.split("-").map(Number);
        priceMin = min;
        priceMax = max;
    }

    try {
        const all = await fetchElectronicsProducts();

        const filtered = all.filter((product) => {
            const matchesCategory = !category?.length || category.includes(product.category);
            const matchesBrand = !brand?.length || brand.includes(product.brand);
            const matchesPriceMin = priceMin === undefined || product.price >= priceMin;
            const matchesPriceMax = priceMax === undefined || product.price <= priceMax;
            const matchesQuery =
                !q ||
                product.title.toLowerCase().includes(q) ||
                product.category.toLowerCase().includes(q) ||
                product.brand.toLowerCase().includes(q);

            return matchesCategory && matchesBrand && matchesPriceMin && matchesPriceMax && matchesQuery;
        });

        return NextResponse.json({ count: filtered.length, products: filtered });
    } catch (err) {
        return NextResponse.json({ error: "Failed to fetch electronics products" }, { status: 502 });
    }
}
