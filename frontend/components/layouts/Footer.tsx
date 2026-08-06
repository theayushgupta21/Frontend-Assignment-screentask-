import Link from "next/link";

const socials = [
    {
        name: "Instagram",
        href: "https://instagram.com",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-[1.6]">
                <rect x="3" y="3" width="18" height="18" rx="4" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
            </svg>
        ),
    },
    {
        name: "X",
        href: "https://x.com",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M17.53 3H21l-7.36 8.41L22 21h-6.56l-5.14-6.28L4.4 21H1l7.87-8.99L2 3h6.7l4.64 5.76L17.53 3zm-1.15 16.17h1.82L7.7 4.73H5.75l10.63 14.44z" />
            </svg>
        ),
    },
    {
        name: "Facebook",
        href: "https://facebook.com",
        icon: (
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current">
                <path d="M13.5 21v-8.2h2.75l.41-3.2h-3.16V7.6c0-.93.26-1.56 1.6-1.56h1.7V3.14C15.98 3.1 15.02 3 13.9 3 11.55 3 9.94 4.44 9.94 7.1v2.5H7.18v3.2h2.76V21h3.56z" />
            </svg>
        ),
    },
];

export default function Footer() {
    return (
        <footer className="bg-[linear-gradient(90deg,#07294f_0%,#0b3b7a_100%)] text-white">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-8 sm:flex-row sm:justify-between sm:px-6">
                <Link href="/" className="font-display text-lg font-bold tracking-tight text-white">
                    Shop<span className="text-[color:var(--accent)]">.</span>
                </Link>

                <p className="font-catalog order-3 text-xs text-white/80 sm:order-2">
                    © {new Date().getFullYear()} Shop. All rights reserved.
                </p>

                <div className="order-2 flex items-center gap-2 sm:order-3">
                    {socials.map((social) => (
                        <a
                            key={social.name}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={social.name}
                            className="flex h-9 w-9 items-center justify-center rounded-sm border border-white/10 text-white/90 transition hover:border-white hover:text-[color:var(--accent)]"
                        >
                            {social.icon}
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
}