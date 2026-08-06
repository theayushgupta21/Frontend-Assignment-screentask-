import type { Product } from "./products";

// DummyJSON is a free, no-auth public API with real product data and real
// photos. Categories relevant to an electronics catalog:
const ELECTRONICS_CATEGORIES = [
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories",
] as const;

type DummyJsonProduct = {
    id: number;
    title: string;
    description: string;
    price: number; // USD
    rating: number;
    brand?: string;
    thumbnail: string;
    images: string[];
};

type DummyJsonResponse = {
    products: DummyJsonProduct[];
};

const USD_TO_INR = 83;

function toCategoryLabel(slug: string) {
    return slug
        .split("-")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join(" ");
}

function normalize(raw: DummyJsonProduct, categorySlug: string): Product {
    return {
        id: `dj-${raw.id}`,
        title: raw.title,
        price: Math.round(raw.price * USD_TO_INR),
        category: toCategoryLabel(categorySlug),
        brand: raw.brand ?? "Generic",
        image: raw.thumbnail,
        rating: raw.rating,
        description: raw.description,
    };
}

export async function fetchElectronicsProducts(): Promise<Product[]> {
    const responses = await Promise.all(
        ELECTRONICS_CATEGORIES.map((category) =>
            fetch(`https://dummyjson.com/products/category/${category}?limit=12`, {
                next: { revalidate: 3600 },
            }).then((res) => {
                if (!res.ok) throw new Error(`DummyJSON request failed for ${category}`);
                return res.json() as Promise<DummyJsonResponse>;
            })
        )
    );

    return responses.flatMap((response, i) =>
        response.products.map((product) => normalize(product, ELECTRONICS_CATEGORIES[i]))
    );
}

export async function fetchElectronicsProductById(id: string): Promise<Product | null> {
    const rawId = id.replace(/^dj-/, "");

    const res = await fetch(`https://dummyjson.com/products/${rawId}`, { next: { revalidate: 3600 } });

    if (!res.ok) return null;

    const raw: DummyJsonProduct & { category: string } = await res.json();
    return normalize(raw, raw.category);
}
