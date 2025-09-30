"use client";
import { m, useScroll } from "framer-motion";
import { useEffect, useState } from "react";

export default function ViewProgress() {
  const [root, setRoot] = useState<HTMLElement | null>(null);
  useEffect(() => { setRoot(document.getElementById("snap")); }, []);
  const { scrollYProgress } = useScroll({ container: root ?? undefined });

  return (
    <div className="fixed left-0 right-0 top-0 h-1 z-50" style={{ background: "rgb(var(--border))" }}>
      <m.div className="h-full origin-left" style={{ background: "rgb(var(--brand))", scaleX: scrollYProgress }} />
    </div>
  );
}
