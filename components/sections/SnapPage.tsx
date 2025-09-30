"use client";
import { m, MotionConfig } from "framer-motion";

export default function SnapPage({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user" transition={{ duration: 0.5 }}>
      <m.main id="snap"
        className="h-dvh overflow-y-auto snap-y snap-mandatory scrollbar-thin scrollbar-track-transparent scrollbar-thumb-cyan-500/30 hover:scrollbar-thumb-cyan-500/60"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="min-h-dvh">{children}</div>
      </m.main>
    </MotionConfig>
  );
}
