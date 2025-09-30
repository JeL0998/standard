"use client";
import SectionShell from "@/components/sections/SectionShell";
import { m } from "framer-motion";
import SafeImage from "@/components/primitives/SafeImage";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useEffect } from "react";

const DATA = [
  {
    name: "Mika",
    role: "Photographer",
    quote: "The sunsets were unreal. Best weekend of the year!",
    img: "https://images.unsplash.com/photo-1483683804023-6ccdb62f86ef",
  },
  {
    name: "Luis",
    role: "Traveler",
    quote: "Clean villas and super friendly staff.",
    img: "https://images.unsplash.com/photo-1512291313931-d4291048e7b5",
  },
  {
    name: "Hana",
    role: "Diver",
    quote: "Loved the snorkel tour—turtles everywhere!",
    img: "https://images.unsplash.com/photo-1519677100203-a0e668c92439",
  },
  {
    name: "Arman",
    role: "Chef",
    quote: "Rooms are spotless and the food is fantastic.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e",
  },
  {
    name: "Belle",
    role: "Parent",
    quote: "Kid-friendly and the staff went above and beyond.",
    img: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  },
] as const;

export default function TestimonialsCarousel() {
  const [emblaRef, embla] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      containScroll: "keepSnaps",
      inViewThreshold: 0.7,
      slidesToScroll: 1,
      startIndex: 0,
    },
    [Autoplay({ delay: 4800 })]
  );

  useEffect(() => {
    if (!embla) return;
    const keepCenter = () => embla.scrollTo(embla.selectedScrollSnap(), false);

    embla.on("reInit", keepCenter);

    // ✅ cleanup must return () => void
    return () => {
      try {
        embla.off("reInit", keepCenter);
      } catch {}
    };
  }, [embla]);

  return (
    <SectionShell id="testimonials">
      <div className="max-w-5xl mx-auto text-center">
        <m.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold"
        >
          What guests say
        </m.h2>

        <div
          className="mt-8 overflow-hidden rounded-2xl px-[8vw]"
          ref={emblaRef}
        >
          <div className="flex gap-6">
            {DATA.map((t) => (
              <article
                key={t.name}
                className="relative shrink-0 basis-[95%] sm:basis-[80%] md:basis-[70%]"
              >
                <div className="relative h-64 md:h-80 rounded-2xl overflow-hidden border card-surface shadow-soft">
                  <m.div
                    className="absolute inset-0"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                  >
                    <SafeImage
                      src={t.img + "?q=80&w=1600&auto=format&fit=crop"}
                      alt={t.name}
                      fill
                      className="object-cover"
                      priority
                      onLoadingComplete={() => embla?.reInit()}
                    />
                  </m.div>
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
                  <div
                    className="absolute inset-0"
                    style={{
                      WebkitMaskImage:
                        "linear-gradient(to right, transparent, black 15%, black 85%, transparent)",
                    }}
                  />
                  <div
                    className="absolute inset-x-0 bottom-0 h-24"
                    style={{
                      backgroundImage:
                        "linear-gradient(to top, rgba(0,0,0,0.55), transparent)",
                    }}
                  />
                  <blockquote className="absolute inset-0 grid items-center md:items-end p-6 text-center md:text-left text-white">
                    <p className="text-lg md:text-xl italic leading-relaxed">
                      “{t.quote}”
                    </p>
                    <footer className="mt-2 text-sm opacity-90">
                      — {t.name}, {t.role}
                    </footer>
                    <div className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] font-semibold bg-black/50 backdrop-blur border border-white/20">
                      Verified stay
                    </div>
                  </blockquote>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
