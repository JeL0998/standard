"use client";

import SectionShell from "@/components/sections/SectionShell";
import { m, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { HelpCircle } from "lucide-react";

const ITEMS = [
  [
    "What time is check-in and check-out?",
    "Check-in is 2:00 PM, and check-out is 12:00 PM. Early check-in is subject to availability.",
  ],
  [
    "Do you offer airport transfers?",
    "Yes, we can arrange shuttle service from Caticlan or Kalibo with advance notice.",
  ],
  [
    "Is breakfast included?",
    "Daily breakfast is included for all room types. Options for dietary needs are available upon request.",
  ],
  [
    "Can I rebook my stay?",
    "Absolutely. We offer flexible rebooking up to 48 hours before arrival, subject to date availability.",
  ],
  ["Do you have Wi-Fi?", "Yes, high-speed Wi-Fi is available in all rooms and public areas."],
  [
    "Are pets allowed?",
    "Small, house-trained pets are welcome in select rooms with a cleaning fee. Please inform us in advance.",
  ],
] as const;

function QA({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border card-surface p-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-start gap-3 text-left"
      >
        <HelpCircle className="h-5 w-5 mt-0.5" />
        <div>
          <div className="font-medium">{q}</div>
          <AnimatePresence initial={false}>
            {open && (
              <m.p
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="mt-2 text-sm text-slate-600"
              >
                {a}
              </m.p>
            )}
          </AnimatePresence>
        </div>
      </button>
    </div>
  );
}

export default function FAQ() {
  return (
    <SectionShell id="faq">
      <div className="max-w-6xl mx-auto px-6">
        <m.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-bold text-center"
        >
          FAQ
        </m.h2>
        <div className="mt-6 grid md:grid-cols-2 gap-4">
          {ITEMS.map(([q, a]) => (
            <QA key={q} q={q} a={a} />
          ))}
        </div>
      </div>
    </SectionShell>
  );
}
