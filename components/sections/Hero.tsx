"use client";
  import { useEffect, useState } from "react";
import { m, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import FadeIn from "@/components/primitives/FadeIn";

const img =
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?q=80&w=1920&auto=format&fit=crop";

export default function Hero() {
    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 400], [0, -120]);
  const scale = useTransform(scrollY, [0, 400], [1, 1.1]);

  return (
    <section id="hero" data-section className="relative h-dvh snap-start flex items-center justify-center">
      <m.div className="absolute inset-0 -z-10" style={mounted ? { y, scale } : {}}>
        <Image src={img} alt="Tropical beach" fill priority className="object-cover" />
        <div className="absolute inset-0 bg-black/35" />
      </m.div>
      <div className="relative px-6 text-center max-w-3xl">
        <FadeIn y={24}>
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)] leading-tight">
            Escape to <span className="text-gradient">Azure Cove</span>
          </h1>
        </FadeIn>
        <FadeIn delay={0.1}>
          <p className="mt-4 text-lg md:text-xl text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.65)]">
            Crystal waters, powder sand, and sunset cocktails—just a scroll away.
          </p>
        </FadeIn>
        <FadeIn delay={0.2}>
          <a
            href="#inquiry"
            className="inline-flex mt-8 btn-brand"
          >
            Book an escape
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
