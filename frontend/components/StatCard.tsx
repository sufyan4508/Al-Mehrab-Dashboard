"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";
import AnimatedNumber from "./AnimatedNumber";

interface StatCardProps {
  label: string;
  value: number;
  total: number;
  icon: ReactNode;
  accent: "green" | "amber" | "rose";
  caption: string;
  delay?: number;
}

// Map styles seamlessly to our new brand tokens
const accentMap = {
  green: { text: "text-mehrab-green", bar: "bg-gradient-to-r from-mehrab-green to-emerald-400", ring: "border-mehrab-green/20" },
  amber: { text: "text-mehrab-amber", bar: "bg-gradient-to-r from-mehrab-amber to-yellow-400", ring: "border-mehrab-amber/20" },
  rose: { text: "text-mehrab-rose", bar: "bg-gradient-to-r from-mehrab-rose to-pink-500", ring: "border-mehrab-rose/20" },
};

export default function StatCard({ label, value, total, icon, accent, caption, delay = 0 }: StatCardProps) {
  const c = accentMap[accent];
  const pct = Math.round((value / total) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={`rounded-2xl border ${c.ring} bg-mehrab-panel p-6 shadow-xl relative overflow-hidden group`}
    >
      {/* Micro card ambient glow indicator */}
      <div className={`absolute -right-4 -bottom-4 h-16 w-16 rounded-full opacity-5 blur-xl bg-current ${c.text}`} />

      <div className="flex items-center justify-between">
        <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${c.text}`}>
          {label}
        </p>
        <span className={`${c.text} opacity-80 group-hover:opacity-100 transition-opacity`}>{icon}</span>
      </div>

      <p className="mt-3 font-display text-5xl font-bold text-mehrab-textLight">
        <AnimatedNumber value={value} />
      </p>
      <p className="mt-1 text-xs text-mehrab-textMuted">{caption}</p>

      <div className="mt-5 flex items-center justify-between text-xs font-medium">
        <span className={`font-mono font-bold ${c.text}`}>{pct}%</span>
        <span className="text-mehrab-textMuted font-mono text-[11px]">
          {value} / {total} Forms
        </span>
      </div>
      
      {/* High-fidelity custom tracking track */}
      <div className="mt-2.5 h-[5px] w-full overflow-hidden rounded-full bg-mehrab-bg/90 p-[0.5px] border border-white/5">
        <motion.div
          className={`h-full rounded-full ${c.bar}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: delay + 0.1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}
