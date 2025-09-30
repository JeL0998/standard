"use client";
import SectionShell from "@/components/sections/SectionShell";
import { m } from "framer-motion";
import Image from "next/image";

const images = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda",
  "https://images.unsplash.com/photo-1473625247510-8ceb1760943f",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
].map(u => u + "?q=80&w=1200&auto=format&fit=crop");

export default function Gallery() {
    const edgeMask = { WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" } as any;
  return (
    <SectionShell id="gallery">
      <div className="w-full px-6 max-w-6xl mx-auto">
        <m.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-center mb-6">
          Gallery
        </m.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4" style={edgeMask}>
          {images.map((src, i) => (
            <m.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.03, ease: [0.22,1,0.36,1] }} className="relative aspect-[4/3] rounded-xl overflow-hidden border card-surface">
              <Image src={src} alt={"Resort view " + (i+1)} fill className="object-cover hover:scale-105 transition will-change-transform" />
            </m.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
