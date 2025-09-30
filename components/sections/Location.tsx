"use client";

import SectionShell from "@/components/sections/SectionShell";
import { m } from "framer-motion";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Location() {
  return (
    <SectionShell id="location">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-stretch px-6">
        {/* Map card (dummy) */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border card-surface relative"
        >
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-200 to-sky-300" />
          <div
            className="absolute inset-0 -z-0"
            style={{
              WebkitMaskImage:
                "radial-gradient(60% 60% at 50% 50%, black, transparent)",
            }}
          />
          <div className="h-[320px] md:h-full grid place-items-center">
            <div className="flex flex-col items-center gap-3">
              <div className="rounded-full h-14 w-14 grid place-items-center bg-white shadow">
                <MapPin className="h-6 w-6 text-sky-600" />
              </div>
              <p className="text-slate-700">Map placeholder</p>
            </div>
          </div>
        </m.div>

        {/* Details */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border card-surface p-6"
        >
          <h3 className="text-2xl font-semibold">Where to find us</h3>
          <p className="mt-2 text-slate-600">
            Azure Cove Beach Resort, Station 2, Boracay Island, Aklan 5608,
            Philippines
          </p>

          <dl className="mt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              <span>+63 994 019 8656</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <span>ericjanlonario.jr@gmail.com</span>
            </div>
          </dl>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-xl border p-3">
              <div className="font-medium">Resort hours</div>
              <div className="text-slate-600">Mon–Sun 7:00–22:00</div>
            </div>
            <div className="rounded-xl border p-3">
              <div className="font-medium">Check-in / out</div>
              <div className="text-slate-600">14:00 / 12:00</div>
            </div>
          </div>

          <a href="#inquiry" className="btn-brand inline-flex mt-6">
            Contact us
          </a>
        </m.div>
      </div>
    </SectionShell>
  );
}
