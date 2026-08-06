export default function StarRating({ rating }: { rating: number }) {
    const stars = [1, 2, 3, 4, 5];

    return (
        <div className="flex items-center gap-0.5" aria-label={`Rated ${rating} out of 5`}>
            {stars.map((star) => (
                <svg
                    key={star}
                    viewBox="0 0 20 20"
                    className={`h-4 w-4 ${star <= Math.round(rating) ? "fill-[#FF4B26]" : "fill-[#E5E4DF]"}`}
                >
                    <path d="M10 1.5l2.6 5.27 5.82.85-4.21 4.1 1 5.79L10 14.9l-5.21 2.61 1-5.79-4.21-4.1 5.82-.85z" />
                </svg>
            ))}
            <span className="font-catalog ml-1 text-xs text-[#55575E]">{rating.toFixed(1)}</span>
        </div>
    );
}