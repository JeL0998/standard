"use client";
import { m, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionShell({ id,
  children,
  className = "",
}: { id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { amount: 0.6, margin: "-10% 0px -10% 0px" });

  return (
    <section id={id} data-section className={"h-dvh snap-start grid place-items-center px-6 " + className}>
      <m.div
        ref={ref}
        initial={{ opacity: 0, y: 28, rotateX: -3 }}
        animate={inView ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0.6, y: 8 }}
        transition={{ type: "spring", stiffness: 240, damping: 28 }}
        className="w-full"
      >
        {/* accent scanline */}
        <m.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8 }}
          className="h-1 w-24 origin-left rounded-full"
          style={{ background: "rgb(var(--brand))" }}
        />
        <div className="mt-6">{children}</div>
      </m.div>
    </section>
  );
}
