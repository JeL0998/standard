"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { m } from "framer-motion";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [dates, setDates] = useState("");
  const [guests, setGuests] = useState("");
  const router = useRouter();

  useEffect(() => {
    const root = document.getElementById("snap") || undefined;
    const hero = document.getElementById("hero");
    const onScroll = () => {
      const y = (document.getElementById("snap")?.scrollTop) ?? window.scrollY;
      setScrolled(y > 8);
    };
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          // visible only when hero is LESS than 50% in view
          setVisible(!(e.isIntersecting && e.intersectionRatio > 0.5));
        });
      },
      { root: root as any, threshold: [0.5] }
    );
    if (hero) obs.observe(hero);
    (root || window).addEventListener("scroll", onScroll, { passive: true } as any);
    return () => {
      obs.disconnect();
      (root || window).removeEventListener("scroll", onScroll as any);
    };
  }, []);

  function to(id: string) {
    const el = document.getElementById(id);
    const root = document.getElementById("snap") || window;
    if (!el) return;
    const top = (el as HTMLElement).offsetTop;
    if (root === window) window.scrollTo({ top, behavior: "smooth" });
    else (root as HTMLElement).scrollTo({ top, behavior: "smooth" });
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (dates) params.set("dates", dates);
    if (guests) params.set("guests", guests);
    const url = "/#inquiry" + (params.toString() ? ("?" + params.toString()) : "");
    router.push(url);
  }

  return (
    <m.header
      initial={false}
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -12,
                backgroundColor: scrolled ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.1)",
                backdropFilter: scrolled ? "blur(6px)" : "blur(0px)",
                borderBottomColor: scrolled ? "rgb(var(--border))" : "rgba(0,0,0,0)" }}
      className="fixed top-0 left-0 right-0 z-50 border-b pointer-events-auto"
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <div className="max-w-6xl mx-auto flex items-center gap-4 px-4 py-3">
        <button onClick={() => to('hero')} className="font-bold tracking-wide">Azure Cove</button>
        <nav className="ml-auto hidden md:flex items-center gap-4 text-sm">
          <button onClick={() => to('rooms')} className="hover:opacity-80">Rooms</button>
          <button onClick={() => to('features')} className="hover:opacity-80">Highlights</button>
          <button onClick={() => to('gallery')} className="hover:opacity-80">Gallery</button>
          <button onClick={() => to('testimonials')} className="hover:opacity-80">Reviews</button>
          <button onClick={() => to('inquiry')} className="hover:opacity-80">Contact</button>
        </nav>
        <form onSubmit={submit} className="ml-auto md:ml-2 hidden sm:flex items-center gap-2">
          <input value={dates} onChange={(e)=>setDates(e.target.value)} placeholder="Dates"
            className="px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2" style={{ borderColor: "rgb(var(--border))" }} />
          <input value={guests} onChange={(e)=>setGuests(e.target.value)} placeholder="Guests"
            className="px-3 py-2 rounded-lg border text-sm outline-none focus:ring-2" style={{ borderColor: "rgb(var(--border))" }} />
          <button className="btn-brand">Book</button>
        </form>
      </div>
    </m.header>
  );
}
