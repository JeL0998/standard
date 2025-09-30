"use client";
import { m } from "framer-motion";

export default function FadeIn({
  as: Tag = "div",
  delay = 0,
  y = 16,
  children,
  className = "",
}: {
  as?: any;
  delay?: number;
  y?: number;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <m.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={{ type: "spring", stiffness: 260, damping: 30, delay }}
      className={className}
    >
      {children}
    </m.div>
  );
}
