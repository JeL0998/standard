"use client";
import SectionShell from "@/components/sections/SectionShell";
import { m } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

const IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
  "https://images.unsplash.com/photo-1473625247510-8ceb1760943f",
  "https://images.unsplash.com/photo-1493558103817-58b2924bce98",
  "https://images.unsplash.com/photo-1473116763249-2faaef81ccda",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
  "https://images.unsplash.com/photo-1500375592092-40eb2168fd21",
,
  "https://images.unsplash.com/photo-1520975916090-3105956dac38",
  "https://images.unsplash.com/photo-1470246973918-29a93221c455",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
];

export default function GalleryLightbox() {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <SectionShell id="gallery">
      <div className="w-full px-6 max-w-6xl mx-auto">
        <m.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-3xl md:text-5xl font-bold text-center mb-6">
          Gallery
        </m.h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 fade-edges">
          {IMAGES.map((u, i) => {
            const src = u + "?q=80&w=1600&auto=format&fit=crop";
            return (
              <button key={i} onClick={() => { setIndex(i); setOpen(true); }}
                className="relative aspect-[4/3] rounded-xl overflow-hidden border card-surface group">
                <Image src={src} alt={"Resort view " + (i+1)} fill className="object-cover group-hover:scale-105 transition" />
                <m.div initial={{ opacity: 0 }} whileHover={{ opacity: 0.08 }} className="absolute inset-0 bg-black" />
              </button>
            );
          })}
        </div>

        <Lightbox open={open} close={() => setOpen(false)} index={index}
          slides={IMAGES.map(u => ({ src: u + "?q=80&w=2400&auto=format&fit=crop" }))} />
      </div>
    </SectionShell>
  );
}
