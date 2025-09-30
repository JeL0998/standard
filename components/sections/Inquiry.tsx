"use client";

import SectionShell from "@/components/sections/SectionShell";
import { m } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Status = null | "ok" | "error";

export default function Inquiry() {
  const params = useSearchParams();
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>(null);

  useEffect(() => {
    setDates(params.get("dates") || "");
    setGuests(params.get("guests") || "");
  }, [params]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setStatus(null);
    const res = await fetch("/api/inquiry", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, dates, guests, message }),
    });
    const json = await res.json();
    setStatus(json.status === "ok" ? "ok" : "error");
    if (json.status === "ok") {
      setName("");
      setEmail("");
      setDates("");
      setGuests("");
      setMessage("");
    }
  }

  return (
    <SectionShell id="inquiry">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-6 items-stretch px-6">
        {/* Form */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl border card-surface p-6"
        >
          <h3 className="text-2xl font-semibold">Inquire / Book</h3>
          <p className="mt-2 text-slate-600 text-sm">
            Tell us your preferred dates and party size. We’ll reply within 24
            hours.
          </p>

          <form onSubmit={submit} className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-lg border outline-none focus:ring-2"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-lg border outline-none focus:ring-2"
              required
            />
            <input
              placeholder="Dates"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              className="px-4 py-3 rounded-lg border outline-none focus:ring-2 sm:col-span-1"
            />
            <input
              placeholder="Guests"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="px-4 py-3 rounded-lg border outline-none focus:ring-2 sm:col-span-1"
            />
            <textarea
              placeholder="Message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="px-4 py-3 rounded-lg border outline-none focus:ring-2 sm:col-span-2"
            />
            <button className="btn-brand sm:col-span-2 mt-1">Send inquiry</button>
          </form>

          {status && (
            <p className="mt-3 text-sm">
              {status === "ok"
                ? "Thanks! We’ll get back to you shortly."
                : "Something went wrong—please try again."}
            </p>
          )}
        </m.div>

        {/* Perks / contact */}
        <m.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="rounded-2xl overflow-hidden border card-surface p-6 flex flex-col"
        >
          <div className="text-sm text-slate-600">Why book direct</div>
          <ul className="mt-3 space-y-2 text-sm">
            <li>• Best rate guarantee</li>
            <li>• Free welcome drinks</li>
            <li>• Flexible rebooking</li>
          </ul>

          <div className="mt-auto pt-6 text-sm text-slate-600">
            Or email us:{" "}
            <a className="underline" href="mailto:ericjanlonario.jr@gmail.com">
              ericjanlonario.jr@gmail.com
            </a>
            <br />
            Call:{" "}
            <a href="tel:+639940198656" className="underline">
              +63 994 019 8656
            </a>
          </div>
        </m.div>
      </div>
    </SectionShell>
  );
}
