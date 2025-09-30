"use client";
import { m, AnimatePresence } from "framer-motion";
import { useEffect, useMemo, useState } from "react";

type Section = { id: string; label: string };

const SECTIONS: Section[] = [
  { id: "hero", label: "Home" },
  { id: "rooms", label: "Rooms & Rates" },
  { id: "features", label: "Highlights" },
  { id: "activities", label: "Activities" },
  { id: "gallery", label: "Gallery" },
  { id: "testimonials", label: "Reviews" },
  { id: "faq", label: "FAQ" },
  { id: "location", label: "Location" },
  { id: "inquiry", label: "Inquiry" },
  { id: "newsletter", label: "News" },
];

export default function DotNav() {
  const [active, setActive] = useState<string>("hero");

  // Observe sections within the snap container
  useEffect(() => {
    const root = document.getElementById("snap");
    if (!root) return;
    const sections = Array.from(root.querySelectorAll<HTMLElement>("[data-section]"));
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting && e.intersectionRatio > 0.55) {
            const id = (e.target as HTMLElement).id;
            if (id) setActive(id);
          }
        });
      },
      { root, threshold: [0.55, 0.75] }
    );
    sections.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Keyboard navigation
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const idx = SECTIONS.findIndex((s) => s.id === active);
      if (idx < 0) return;
      if (["ArrowDown","PageDown"].includes(e.key)) {
        e.preventDefault(); scrollToId(SECTIONS[Math.min(SECTIONS.length-1, idx+1)].id);
      } else if (["ArrowUp","PageUp"].includes(e.key)) {
        e.preventDefault(); scrollToId(SECTIONS[Math.max(0, idx-1)].id);
      } else if (e.key === "Home") {
        e.preventDefault(); scrollToId(SECTIONS[0].id);
      } else if (e.key === "End") {
        e.preventDefault(); scrollToId(SECTIONS[SECTIONS.length-1].id);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active]);

  function scrollToId(id: string) {
      function animateScroll(container: HTMLElement, to: number, duration = 600) {
        const start = container.scrollTop; const diff = to - start; const t0 = performance.now();
        const ease = (t:number) => t<.5 ? 4*t*t*t : 1 - Math.pow(-2*t+2,3)/2; // easeInOutCubic
        function step(t:number){ const n = Math.min(1, (t - t0)/duration); container.scrollTop = start + diff * ease(n); if(n<1) requestAnimationFrame(step); }
        requestAnimationFrame(step);
      }
    const root = document.getElementById("snap");
    const el = document.getElementById(id);
    if (!root || !el) return;
    animateScroll(root, el.offsetTop, 700);
  }

  const progress = useMemo(() => {
    const idx = SECTIONS.findIndex((s) => s.id === active);
    return (idx + 1) / SECTIONS.length;
  }, [active]);

  return (
    <div className="pointer-events-none fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:block">
      <nav aria-label="Section navigation" className="pointer-events-auto select-none">
        {/* vertical progress rail */}
        <div className="absolute right-0 top-0 bottom-0 w-0.5 rounded-full opacity-30" style={{ background: "rgb(var(--border))" }} />
        <m.div className="absolute right-0 top-0 w-0.5 rounded-full" style={{ background: "rgb(var(--brand))" }}
          initial={{ height: "0%" }} animate={{ height: `${progress*100}%` }} />
        <ul className="relative flex flex-col gap-3 pr-5">
          {SECTIONS.map((s) => {
            const isActive = s.id === active;
            return (
              <li key={s.id} className="relative h-6">
                <button
                  onClick={() => scrollToId(s.id)}
                  className="group relative flex items-center gap-2 pr-8 focus:outline-none"
                  aria-label={s.label}
                  aria-current={isActive ? "true" : "false"}
                >
                  {/* tick */}
                  <span className="absolute right-2 h-[2px] w-4 opacity-40" style={{ background: "rgb(var(--border))" }} />
                  {/* bigger hit box */}
                  <span className="absolute -inset-2" />
                  {/* dot */}
                  <m.span
                    layout
                    className="h-3.5 w-3.5 rounded-full border"
                    style={{
                      background: isActive ? "rgb(var(--brand))" : "transparent",
                      borderColor: "rgb(var(--brand))",
                    }}
                  />
                  {/* hover tooltip / active pill */}
                  <AnimatePresence>
                    {(isActive) && (
                      <m.span
                        key="pill"
                        initial={{ opacity: 0, x: 8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 8 }}
                        className="ml-1 rounded-full px-3 py-1 text-[10px] font-semibold border shadow-sm"
                        style={{
                          color: "rgb(var(--fg))",
                          background: "rgb(var(--surface))",
                          borderColor: "rgb(var(--border))",
                        }}
                      >
                        {s.label.toUpperCase()}
                      </m.span>
                    )}
                  </AnimatePresence>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
