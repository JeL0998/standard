"use client";
import { useEffect } from "react";

const COLORS: Record<string, [number, number, number, number, number, number]> = {
  hero: [6,182,212, 8,145,178],          // cyan
  rooms: [16,185,129, 5,150,105],        // emerald
  features: [245,158,11, 217,119,6],     // amber
  gallery: [79,70,229, 67,56,202],       // indigo
  testimonials: [244,63,94, 225,29,72],  // rose
  faq: [168,85,247, 147,51,234],         // purple
  location: [14,165,233, 2,132,199],     // sky
  inquiry: [34,197,94, 22,163,74],       // green
  newsletter: [234,179,8, 202,138,4],    // yellow
};

export default function SectionThemeSync() {
  useEffect(() => {
    const root = document.getElementById("snap") || undefined;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-section]"));
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && e.intersectionRatio > 0.55) {
          const id = (e.target as HTMLElement).id;
          const c = COLORS[id];
          if (c) {
            const [r,g,b, r2,g2,b2] = c;
            document.documentElement.style.setProperty("--brand", `${r} ${g} ${b}`);
            document.documentElement.style.setProperty("--brand-600", `${r2} ${g2} ${b2}`);
          }
        }
      });
    }, { root: root as any, threshold: [0.55, 0.8] });
    sections.forEach(s => obs.observe(s));
    return () => obs.disconnect();
  }, []);
  return null;
}
