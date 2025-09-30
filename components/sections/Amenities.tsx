"use client";
import SectionShell from "@/components/sections/SectionShell";
import { m } from "framer-motion";

const items = [
  ["Seaside Villas", "Wake to ocean whispers in modern villas."],
  ["Infinity Pool", "Sip & swim with a panoramic horizon."],
  ["Island Dining", "Fresh-caught seafood & sunset grills."],
  ["Water Sports", "Kayak, dive, and snorkel with turtles."],
] as const;

export default function Amenities() {
  return (
    <SectionShell id="amenities">
      <div className="max-w-5xl mx-auto text-center">
        <m.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} className="text-3xl md:text-5xl font-bold">Amenities</m.h2>
        <div className="mt-10 grid sm:grid-cols-2 gap-6 md:gap-8">
          {items.map(([title, desc], i) => (
            <m.div
              key={title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ type: "spring", delay: i * 0.05 }}
              className="rounded-2xl p-6 md:p-8 border card-surface backdrop-blur"
            >
              <h3 className="text-xl font-semibold">{title}</h3>
              <p className="mt-2 text-slate-600">{desc}</p>
            </m.div>
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
