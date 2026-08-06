"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "theme";

type Theme = "light" | "dark";

function getPreferredTheme(): Theme {
    if (typeof window === "undefined") {
        return "light";
    }

    const stored = localStorage.getItem(THEME_KEY);
    if (stored === "light" || stored === "dark") {
        return stored;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
}

export default function ThemeToggle() {
    const [theme, setTheme] = useState<Theme>("light");

    useEffect(() => {
        const nextTheme = getPreferredTheme();
        setTheme(nextTheme);
        document.documentElement.dataset.theme = nextTheme;
    }, []);

    function handleToggle() {
        const nextTheme: Theme = theme === "dark" ? "light" : "dark";
        setTheme(nextTheme);
        applyTheme(nextTheme);
    }

    return (
        <button
            type="button"
            onClick={handleToggle}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-sm borderborder-(--color-border) bg-(--color-surface-strong) text-(--color-foreground) transition hover:border-(--color-foreground) hover:text-(--color-accent)"
        >
            {theme === "dark" ? "☀️" : "🌙"}
        </button>
    );
}
