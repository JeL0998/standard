"use client";
import { useEffect, useRef, useState } from "react";
import $ from "jquery";
import { m, AnimatePresence } from "framer-motion";

export default function Newsletter() {
  const formRef = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<null | "ok" | "error">(null);

  useEffect(() => {
    const $form = $(formRef.current!);
    $form.on("submit", async (e: any) => {
      e.preventDefault();
      setStatus(null);
      const email = ($form.find('[name="email"]').val() as string) || "";
      try {
        const res = await fetch("/api/subscribe", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ email }),
        });
        const json = await res.json();
        setStatus(json.status === "ok" ? "ok" : "error");
        if (json.status === "ok") ($form[0] as HTMLFormElement).reset();
      } catch { setStatus("error"); }
    });
    return () => { $form.off("submit"); };
  }, []);

  return (
    <section id="newsletter" data-section className="h-dvh snap-start grid place-items-center px-6">
      <div className="w-full max-w-md text-center">
        <h2 className="text-3xl font-bold">Get updates & offers</h2>
        <form ref={formRef} className="mt-4 flex gap-2">
          <input name="email" type="email" required placeholder="you@example.com"
            className="flex-1 px-4 py-3 rounded-lg border outline-none focus:ring-2" />
          <button className="btn-brand">Subscribe</button>
        </form>
        <AnimatePresence>
          {status && (
            <m.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
              className="mt-3 text-sm">{status === "ok" ? "Subscribed!" : "Try again."}</m.p>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
