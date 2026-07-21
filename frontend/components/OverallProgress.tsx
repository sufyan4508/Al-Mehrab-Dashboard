"use client";
import { motion } from "framer-motion";
import AnimatedNumber from "./AnimatedNumber";

interface Props {
  implemented: number;
  inProgress: number;
  undeveloped: number;
  totalForms: number;
  totalModules: number;
}

export default function OverallProgress({
  implemented,
  inProgress,
  undeveloped,
  totalForms,
  totalModules,
}: Props) {
  const total = implemented + inProgress + undeveloped;
  const pct = Math.round((implemented / total) * 100);
  const wImpl = (implemented / total) * 100;
  const wProg = (inProgress / total) * 100;
  const wUndev = (undeveloped / total) * 100;

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-mehrab-maroonDeep/30 via-mehrab-panel to-mehrab-panel p-6 sm:p-8 shadow-2xl"
    >
      {/* Subtle modern background glow */}
      <div className="absolute -right-12 -top-12 h-32 w-32 rounded-full bg-mehrab-gold/5 blur-2xl" />

      <p className="font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-mehrab-gold">
        OVERALL IMPLEMENTATION PROGRESS
      </p>

      <div className="mt-4 flex items-end gap-3">
        <span className="font-display text-6xl font-bold tracking-tight text-mehrab-gold sm:text-7xl">
          <AnimatedNumber value={pct} suffix="%" />
        </span>
        <span className="pb-2 text-xs font-medium uppercase tracking-wider text-mehrab-textMuted">
          of all forms live
        </span>
      </div>

      {/* Modern High-Contrast Progress Bar */}
      <div className="mt-8 flex h-3.5 w-full overflow-hidden rounded-full bg-mehrab-bg/80 p-[2px] border border-white/5">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-mehrab-green to-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${wImpl}%` }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
        />
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-mehrab-amber to-yellow-400"
          initial={{ width: 0 }}
          animate={{ width: `${wProg}%` }}
          transition={{ duration: 1, delay: 0.45, ease: "easeOut" }}
        />
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-mehrab-rose to-pink-500"
          initial={{ width: 0 }}
          animate={{ width: `${wUndev}%` }}
          transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
        />
      </div>

      <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 text-xs">
        <Legend color="bg-mehrab-green" label="Implemented" value={implemented} />
        <Legend color="bg-mehrab-amber" label="In Development" value={inProgress} />
        <Legend color="bg-mehrab-rose" label="Undeveloped" value={undeveloped} />
      </div>

      {/* Lower Metrics Panel */}
      <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
        <div className="bg-mehrab-bg/40 p-4 rounded-xl border border-white/5">
          <p className="font-display text-4xl font-bold text-mehrab-textLight">
            <AnimatedNumber value={totalForms} />
          </p>
          <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-mehrab-textMuted">Total Forms</p>
        </div>
        <div className="bg-mehrab-bg/40 p-4 rounded-xl border border-white/5">
          <p className="font-display text-4xl font-bold text-mehrab-textLight">
            <AnimatedNumber value={totalModules} />
          </p>
          <p className="mt-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-mehrab-textMuted">Active Modules</p>
        </div>
      </div>
    </motion.section>
  );
}

function Legend({ color, label, value }: { color: string; label: string; value: number }) {
  return (
    <span className="flex items-center gap-2.5 text-mehrab-textLight/90">
      <span className={`h-2.5 w-2.5 rounded-full ring-2 ring-white/10 ${color}`} />
      <span className="font-mono font-bold text-mehrab-textLight">{value}</span>
      <span className="text-mehrab-textMuted">{label}</span>
    </span>
  );
}
