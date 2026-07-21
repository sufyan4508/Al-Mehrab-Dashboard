"use client";
import { motion } from "framer-motion";
import { ModuleProgress } from "@/lib/types";

export default function ModuleList({ modules }: { modules: ModuleProgress[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-mehrab-panel p-6 shadow-2xl"
    >
      <p className="font-display text-xl font-bold text-mehrab-textLight">Module Breakdown</p>

      <div className="mt-5 divide-y divide-white/15">
        {modules.map((m, i) => {
          const total = m.implemented + m.inProgress + m.undeveloped;
          const pct = Math.round((m.implemented / total) * 100);
          return (
            <motion.div
              key={m.code}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.03 }}
              className="flex items-center gap-5 py-4 transition hover:bg-white/[0.02] px-2 rounded-xl group"
            >
              {/* Module Short Code badge */}
              <span className="w-16 shrink-0 font-mono text-xs font-bold text-mehrab-gold group-hover:text-mehrab-goldSoft transition">
                {m.code}
              </span>
              
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="truncate font-medium text-mehrab-textLight/90 group-hover:text-mehrab-textLight transition">{m.name}</span>
                  <span className="ml-2 shrink-0 font-mono text-xs font-semibold text-mehrab-textMuted">
                    {m.implemented} / {total} Forms
                  </span>
                </div>
                
                {/* Thin Elite Micro-Progress Bar */}
                <div className="mt-2.5 flex h-2 overflow-hidden rounded-full bg-mehrab-bg/90 p-[1px] border border-white/5">
                  <motion.span
                    className="h-full rounded-full bg-gradient-to-r from-mehrab-green to-emerald-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(m.implemented / total) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.03 }}
                  />
                  <motion.span
                    className="h-full rounded-full bg-gradient-to-r from-mehrab-amber to-yellow-400"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(m.inProgress / total) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.03 + 0.05 }}
                  />
                  <motion.span
                    className="h-full rounded-full bg-gradient-to-r from-mehrab-rose to-pink-500"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(m.undeveloped / total) * 100}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.03 + 0.1 }}
                  />
                </div>
              </div>
              
              {/* Percentage Label */}
              <span className="w-12 shrink-0 text-right font-mono text-xs font-bold text-mehrab-gold">
                {pct}%
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
