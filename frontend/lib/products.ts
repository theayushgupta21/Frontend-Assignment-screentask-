export type Product = {
    id: string;
    title: string;
    price: number;
    category: string;
    brand: string;
    image: string;
    rating: number; // 0-5
    description: string;
};

function createProductImage(title: string, category: string) {
    const slug = `${category}-${title}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");

    // Map the slug deterministically to one of DummyJSON's product image ids
    // so local mock products show images that match the DummyJSON theme.
    // Produce a small positive integer (1-30) from the slug.
    let h = 0;
    for (let i = 0; i < slug.length; i++) {
        h = (h << 5) - h + slug.charCodeAt(i);
        h |= 0;
    }
    const idx = Math.abs(h) % 30 + 1;

    return `https://cdn.dummyjson.com/product-images/${idx}.jpg`;
}

// In a real app this would come from a database / CMS / API.
// Kept as a static module so both server components (product detail)
// and client components (grid, filters) can import the same source of truth.
const catalogProducts = [
    {
        id: "p1",
        title: "Philips Precision Beard Trimmer",
        price: 2499,
        category: "Trimmer",
        brand: "Philips",
        rating: 4.3,
        description:
            "Cordless beard trimmer with 20 length settings, 90-minute runtime, and a stainless-steel blade that stays sharp for years.",
    },
    {
        id: "p2",
        title: "Oral-B Electric Toothbrush Pro",
        price: 3299,
        category: "Brush",
        brand: "Oral-B",
        rating: 4.6,
        description:
            "Pressure-sensing electric toothbrush with 3 cleaning modes and a 2-week battery life.",
    },
    {
        id: "p3",
        title: "Wooden Detangling Hair Comb",
        price: 399,
        category: "Comb",
        brand: "Philips",
        rating: 4.0,
        description:
            "Anti-static neem wood comb, gentle on scalp, wide teeth for detangling thick hair.",
    },
    {
        id: "p4",
        title: "Samsung Galaxy S23",
        price: 74999,
        category: "Phone",
        brand: "Samsung",
        rating: 4.5,
        description:
            "6.1-inch Dynamic AMOLED display, Snapdragon 8 Gen 2, triple camera system, all-day battery.",
    },
    {
        id: "p5",
        title: "Apple iPhone 14",
        price: 69999,
        category: "Phone",
        brand: "Apple",
        rating: 4.7,
        description:
            "A15 Bionic chip, advanced dual-camera system, Crash Detection, and all-day battery life.",
    },
    {
        id: "p6",
        title: "Dell XPS 13 Laptop",
        price: 89999,
        category: "Laptop",
        brand: "Dell",
        rating: 4.4,
        description:
            "13.4-inch InfinityEdge display, 12th Gen Intel Core i7, 16GB RAM, 512GB SSD.",
    },
    {
        id: "p7",
        title: "Lenovo ThinkPad E14",
        price: 54999,
        category: "Laptop",
        brand: "Lenovo",
        rating: 4.1,
        description:
            "Reliable business laptop with spill-resistant keyboard, 8GB RAM, and a full-day battery.",
    },
    {
        id: "p8",
        title: "Sony WH-1000XM5 Headphones",
        price: 29999,
        category: "Headphones",
        brand: "Sony",
        rating: 4.8,
        description:
            "Industry-leading noise cancellation, 30-hour battery life, and crystal-clear call quality.",
    },
    {
        id: "p9",
        title: "Boat Rockerz 450 Headphones",
        price: 1499,
        category: "Headphones",
        brand: "Boat",
        rating: 4.0,
        description:
            "On-ear Bluetooth headphones with 15-hour playback and padded ear cushions.",
    },
    {
        id: "p10",
        title: "LG UltraGear 27\" Monitor",
        price: 21999,
        category: "Monitor",
        brand: "LG",
        rating: 4.5,
        description:
            "27-inch QHD IPS display, 165Hz refresh rate, 1ms response time for competitive gaming.",
    },
    {
        id: "p11",
        title: "Sony Alpha a6400 Camera",
        price: 84999,
        category: "Camera",
        brand: "Sony",
        rating: 4.6,
        description:
            "Mirrorless APS-C camera with real-time eye autofocus and 4K video recording.",
    },
    {
        id: "p12",
        title: "HP Wireless Keyboard & Mouse Combo",
        price: 1999,
        category: "Keyboard",
        brand: "HP",
        rating: 3.9,
        description:
            "Slim wireless keyboard and mouse combo with a 12-month battery life.",
    },
    {
        id: "p13",
        title: "Logitech-style Ergonomic Mouse",
        price: 1299,
        category: "Mouse",
        brand: "Dell",
        rating: 4.2,
        description:
            "Ergonomic wireless mouse designed for all-day comfort with adjustable DPI.",
    },
    {
        id: "p14",
        title: "Apple Magic Keyboard",
        price: 10999,
        category: "Keyboard",
        brand: "Apple",
        rating: 4.4,
        description:
            "Rechargeable wireless keyboard with a scissor mechanism for precise, comfortable typing.",
    },
] as const;

export const products: Product[] = catalogProducts.map((product) => ({
    ...product,
    image: createProductImage(product.title, product.category),
}));

export const categories = Array.from(new Set(products.map((p) => p.category)));
export const brands = Array.from(new Set(products.map((p) => p.brand)));
export const priceBounds = {
    min: Math.min(...products.map((p) => p.price)),
    max: Math.max(...products.map((p) => p.price)),
};

export function getProductById(id: string) {
    return products.find((p) => p.id === id);
}