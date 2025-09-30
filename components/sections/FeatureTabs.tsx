"use client";

import SectionShell from "@/components/sections/SectionShell";
import { m, AnimatePresence, LayoutGroup } from "framer-motion";
import { useState } from "react";
import SafeImage from "@/components/primitives/SafeImage";

const TABS = [
  {
    id: "dining",
    label: "Dining",
    content:
      "Fresh seafood, tropical cocktails, and sunset grills by the shore.",
    img: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda",
  },
  {
    id: "wellness",
    label: "Wellness",
    content: "Beach yoga, spa treatments, and hammocks under palms.",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773",
  },
  {
    id: "adventure",
    label: "Adventure",
    content: "Snorkeling, paddle boarding, island hikes and cruises.",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
] as const;

export default function FeatureTabs() {
  const [current, setCurrent] = useState(0);
  const active = TABS[current];

  return (
    <section
      id="features"
      data-section
      className="relative h-dvh snap-start grid place-items-center px-6 overflow-hidden text-white"
    >
      {/* Background image + veils/fades */}
      <div className="absolute inset-0 -z-10">
        <SafeImage
          src={`${active.img}?q=80&w=2400&auto=format&fit=crop`}
          alt="features background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/30" />
        <div
          className="absolute inset-x-0 bottom-0 h-40"
          style={{
            backgroundImage:
              "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 12%, black 88%, transparent)",
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto w-full">
        <m.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center"
        >
          Highlights
        </m.h2>

        {/* Tabs */}
        <LayoutGroup>
          <div className="mt-6 flex justify-center gap-3 text-white">
            {TABS.map((t, i) => (
              <button
                key={t.id}
                onClick={() => setCurrent(i)}
                className={`relative px-3 py-1.5 text-sm font-medium transition ${
                  i === current ? "opacity-100" : "opacity-75 hover:opacity-100"
                }`}
              >
                {t.label}
                {i === current && (
                  <m.span
                    layoutId="tab-underline"
                    className="absolute left-0 right-0 -bottom-1 h-0.5 rounded-full"
                    style={{ background: "rgb(var(--brand))" }}
                  />
                )}
              </button>
            ))}
          </div>
        </LayoutGroup>

        {/* Copy only (no inline image) */}
        <div className="mt-6 min-h-[120px] grid place-items-center">
          <AnimatePresence mode="wait">
            <m.p
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="max-w-2xl text-center text-white/85"
            >
              {active.content}
            </m.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
