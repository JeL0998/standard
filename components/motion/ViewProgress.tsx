"use client";
import { useEffect, useRef } from "react";
import { useScroll, useSpring, m } from "framer-motion";

export default function ViewProgress() {
  // useScroll expects a RefObject<HTMLElement>
  const containerRef = useRef<HTMLElement | null>(null);

  // Attach #snap after mount so SSR stays stable
  useEffect(() => {
    containerRef.current = document.getElementById("snap") as HTMLElement | null;
  }, []);

  // Now it's a RefObject<HTMLElement>
  const { scrollYProgress } = useScroll({ container: containerRef });
  const scaleX = useSpring(scrollYProgress, { stiffness: 180, damping: 24, mass: 0.2 });

  return (
    <m.div
      className="fixed top-0 left-0 right-0 h-0.5 bg-[rgb(var(--brand))] z-50"
      style={{ transformOrigin: "0 0", scaleX }}
    />
  );
}
