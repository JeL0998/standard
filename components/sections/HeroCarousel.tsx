"use client";
import { m } from "framer-motion";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const SLIDES = [
  { src: "https://images.unsplash.com/photo-1500375592092-40eb2168fd21", title: "Waves & Sunsets", subtitle: "Luxury stays by the shore" },
  { src: "https://images.unsplash.com/photo-1473116763249-2faaef81ccda", title: "Swim & Snorkel", subtitle: "Crystal lagoons await" },
  { src: "https://images.unsplash.com/photo-1493558103817-58b2924bce98", title: "Dine by the Sea", subtitle: "Fresh catches, golden hour" },
].map(s => ({ ...s, src: s.src + "?q=80&w=2400&auto=format&fit=crop" }));

export default function HeroCarousel() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4500 })]);

  return (
    <section id="hero" data-section className="relative h-dvh snap-start">
      <div className="absolute inset-0 overflow-hidden" ref={emblaRef}>
        <div className="flex h-full">
          {SLIDES.map((s, i) => (
            <div key={i} className="relative shrink-0 basis-full h-full">
              <Image src={s.src} alt={s.title} fill priority={i===0} className="object-cover" />
              <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-x-0 bottom-0 h-40" style={{
                  backgroundImage: "linear-gradient(to top, rgba(0,0,0,0.5), transparent)"
                }} />
            </div>
          ))}
        </div>
      </div>
      <div className="relative h-full flex items-center justify-center text-center px-6">
        <m.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">Azure Cove</h1>
          <p className="mt-3 text-white/90">Beachfront resort · Philippines</p>
          <a href="#rooms" className="btn-brand inline-flex mt-6">See rooms</a>
        </m.div>
      </div>
    </section>
  );
}
