"use client";
import SectionShell from "@/components/sections/SectionShell";
import { m } from "framer-motion";
import SafeImage from "@/components/primitives/SafeImage";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";

const ROOMS = [
  {
    title: "Seaview Villa",
    desc: "King bed · Balcony · Breakfast",
    price: "₱7,500 / night",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
  },
  {
    title: "Garden Suite",
    desc: "Queen bed · Patio · Breakfast",
    price: "₱6,200 / night",
    img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  },
  {
    title: "Family Loft",
    desc: "2 Beds · Living area",
    price: "₱8,900 / night",
    img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267",
  },
  {
    title: "Premier Cliff",
    desc: "Panoramic view · King bed",
    price: "₱9,800 / night",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  },
] as const;

export default function RoomsCarousel() {
  const loaded = useRef(0);
  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "keepSnaps",
      inViewThreshold: 0.7,
      slidesToScroll: 1,
      startIndex: 0,
    },
    [Autoplay({ delay: 4500 })]
  );

  // Recalculate when images load to avoid the “last slide blank / sticky edges”
  const onImgLoad = () => {
    loaded.current += 1;
    if (loaded.current <= 2) embla?.reInit();
  };

  const scrollPrev = useCallback(() => embla?.scrollPrev(), [embla]);
  const scrollNext = useCallback(() => embla?.scrollNext(), [embla]);

  useEffect(() => {
    if (!embla) return;
    const keepCenter = () => embla.scrollTo(embla.selectedScrollSnap(), false);

    embla.on("reInit", keepCenter);
    return () => {
      try {
        embla.off("reInit", keepCenter);
      } catch {}
    };
  }, [embla]);

  return (
    <SectionShell id="rooms">
      <div className="max-w-6xl mx-auto">
        <m.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center"
        >
          Rooms & Rates
        </m.h2>

        <div className="relative mt-8">
          <div
            className="overflow-hidden fade-edges rounded-2xl px-[8vw]"
            ref={emblaRef}
          >
            <div className="flex gap-6 py-2">
              {ROOMS.map((r, i) => (
                <m.article
                  key={r.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.04 }}
                  className="relative shrink-0 basis-[90%] sm:basis-[68%] md:basis-[58%] lg:basis-[50%] xl:basis-[46%] rounded-3xl overflow-hidden border card-surface will-change-transform"
                >
                  <div className="relative aspect-[16/10]">
                    <SafeImage
                      src={`${r.img}?q=80&w=2000&auto=format&fit=crop`}
                      alt={r.title}
                      fill
                      className="object-cover"
                      priority
                      onLoadingComplete={onImgLoad}
                    />
                    <div
                      className="absolute inset-x-0 bottom-0 h-32"
                      style={{
                        backgroundImage:
                          "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                      }}
                    />
                    <div className="absolute left-4 bottom-4 text-white">
                      <div className="rounded-full px-3 py-1 text-xs font-semibold bg-black/50 backdrop-blur">
                        {r.price}
                      </div>
                    </div>
                  </div>
                  <div className="p-6 md:p-7">
                    <h3 className="text-2xl font-semibold">{r.title}</h3>
                    <p className="mt-2 text-slate-600">{r.desc}</p>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
                      <span
                        className="inline-flex items-center rounded-full border px-2 py-0.5"
                        style={{ borderColor: "rgb(var(--border))" }}
                      >
                        Free breakfast
                      </span>
                      <span
                        className="inline-flex items-center rounded-full border px-2 py-0.5"
                        style={{ borderColor: "rgb(var(--border))" }}
                      >
                        Airport shuttle
                      </span>
                      <span
                        className="inline-flex items-center rounded-full border px-2 py-0.5"
                        style={{ borderColor: "rgb(var(--border))" }}
                      >
                        Ocean view
                      </span>
                    </div>
                    <a href="#inquiry" className="btn-brand inline-flex mt-5">
                      Check rates
                    </a>
                  </div>
                </m.article>
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 left-2 right-2 flex items-center justify-between pointer-events-none">
            <button
              onClick={scrollPrev}
              className="pointer-events-auto h-10 w-10 rounded-full grid place-items-center border card-surface hover:opacity-90"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={scrollNext}
              className="pointer-events-auto h-10 w-10 rounded-full grid place-items-center border card-surface hover:opacity-90"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
