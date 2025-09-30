"use client";
import { useEffect, useState } from "react";
import { m } from "framer-motion";

const THEMES = ["sunny","coral","dusk","palm","midnight"] as const;
type Theme = typeof THEMES[number];

export default function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("palm");

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme) || "palm";
    setTheme(saved);
    document.documentElement.dataset.theme = saved;
  }, []);

  function cycle() {
    const idx = THEMES.indexOf(theme);
    const next = THEMES[(idx + 1) % THEMES.length];
    setTheme(next);
    document.documentElement.dataset.theme = next;
    localStorage.setItem("theme", next);
  }

  return (
    <m.button
      onClick={cycle}
      whileTap={{ scale: 0.97 }}
      className="fixed right-3 top-3 z-50 rounded-full px-3 py-2 text-sm font-medium bg-[rgb(var(--brand))] text-white shadow hover:opacity-90"
      aria-label="Change theme"
      title={`Theme: ${theme} (click to change)`}
    >
      {theme}
    </m.button>
  );
}
