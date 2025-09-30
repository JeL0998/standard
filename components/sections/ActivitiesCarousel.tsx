"use client";
import SectionShell from "@/components/sections/SectionShell";
import { m } from "framer-motion";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

const DATA = [
  ["Snorkeling Reef Tour", "Discover corals and sea turtles in crystal waters.", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"],
  ["Sunset Cruise", "Golden hour sails with refreshments.", "https://images.unsplash.com/photo-1468413253725-0d5181091126"],
  ["Island Hike", "Explore lush trails and hidden coves.", "https://images.unsplash.com/photo-1469474968028-56623f02e42e"],
  ["Beach Yoga", "Start the day with an ocean-breeze flow.", "https://images.unsplash.com/photo-1506126613408-eca07ce68773"],
  ["Paddle Boarding", "Calm lagoon perfect for beginners.", "https://images.unsplash.com/photo-1493558103817-58b2924bce98"],
] as const;

export default function ActivitiesCarousel() {
  const [emblaRef, embla] = useEmblaCarousel(
    { loop: true, align: "center", containScroll: "keepSnaps", inViewThreshold: 0.7, slidesToScroll: 1, startIndex: 0 },
    [Autoplay({ delay: 4000 })]
  );
  const [index, setIndex] = useState(0);

  const onSelect = useCallback(() => embla && setIndex(embla.selectedScrollSnap()), [embla]);
  useEffect(() => { if (!embla) return; onSelect(); embla.on("select", onSelect); embla.on("reInit", onSelect); }, [embla, onSelect]);

  return (
    <SectionShell id="activities">
      <div className="max-w-6xl mx-auto">
        <m.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-center">
          Activities
        </m.h2>

        <div className="relative mt-8">
          <div className="overflow-hidden fade-edges rounded-2xl px-[8vw]" ref={emblaRef}>
            <div className="flex gap-4">
              {DATA.map(([title, desc, src], i) => (
                <m.article
                  key={title}
                  className="relative shrink-0 basis-[88%] sm:basis-[62%] md:basis-[48%] lg:basis-[42%] rounded-2xl overflow-hidden border card-surface will-change-transform"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                >
                  <div className="relative aspect-[4/3]">
                    <Image src={`${src}?q=80&w=1400&auto=format&fit=crop`} alt={title} fill className="object-cover" priority />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="mt-2 text-slate-600">{desc}</p>
                  </div>
                  <m.div className="absolute inset-0 pointer-events-none" animate={{ opacity: index === i ? 0 : 0.08, scale: index === i ? 1 : 0.985 }} transition={{ duration: 0.3 }} style={{ background: "black" }} />
                </m.article>
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between">
            <button onClick={() => embla?.scrollPrev()} className="h-10 w-10 rounded-full grid place-items-center border card-surface hover:opacity-90">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => embla?.scrollNext()} className="h-10 w-10 rounded-full grid place-items-center border card-surface hover:opacity-90">
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {DATA.map((_, i) => (
              <button
                key={i}
                onClick={() => embla?.scrollTo(i)}
                className="h-2.5 w-2.5 rounded-full border"
                style={{ background: index === i ? "rgb(var(--brand))" : "transparent", borderColor: "rgb(var(--brand))" }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
