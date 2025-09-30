"use client";
import { m } from "framer-motion";

export default function Footer() {
  return (
    <footer className="snap-end px-6 py-10 border-t" style={{ borderColor: "rgb(var(--border))" }}>
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-xl font-semibold">Azure Cove Resort</h3>
          <p className="mt-2 text-sm">Email: <a className="underline" href="mailto:ericjanlonario.jr@gmail.com">ericjanlonario.jr@gmail.com</a></p>
          <p className="text-sm">Phone: <a className="underline" href="tel:+639940198656">0994 019 8656</a></p>
        </div>
        <div className="text-sm">
          <p>Hours: 9:00–18:00 (Mon–Sat)</p>
          <p className="mt-1">Location: Azure Cove Beach, PH</p>
        </div>
        <div className="text-sm md:text-right">
          <m.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            © <span className="font-medium">JDev</span> · All rights reserved
          </m.div>
        </div>
      </div>
    </footer>
  );
}
