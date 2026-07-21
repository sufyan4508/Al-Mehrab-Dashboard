"use client";
import { motion } from "framer-motion";

/**
 * Signature element: an animated warp/weft "loom" pattern.
 * Horizontal threads (weft) sweep across vertical warp lines on load,
 * evoking a fabric being woven — the single visual idea the page is built around.
 */
export default function WeavePattern({ className = "" }: { className?: string }) {
  const warpCount = 18;
  const weftCount = 6;

  return (
    <svg
      viewBox="0 0 700 160"
      className={className}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {Array.from({ length: warpCount }).map((_, i) => (
        <line
          key={`warp-${i}`}
          x1={(700 / warpCount) * i + 10}
          y1={0}
          x2={(700 / warpCount) * i + 10}
          y2={160}
          stroke="#f5f0e8"
          strokeOpacity={0.08}
          strokeWidth={1}
        />
      ))}
      {Array.from({ length: weftCount }).map((_, i) => (
        <motion.line
          key={`weft-${i}`}
          x1={0}
          x2={700}
          y1={(160 / weftCount) * i + 14}
          y2={(160 / weftCount) * i + 14}
          stroke="#eab308"
          strokeOpacity={0.35}
          strokeWidth={1.4}
          strokeDasharray="14 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.35 }}
          transition={{ duration: 1.6, delay: i * 0.12, ease: "easeInOut" }}
        />
      ))}
    </svg>
  );
}
