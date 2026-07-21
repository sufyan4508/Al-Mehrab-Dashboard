"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface Props {
  implemented: number;
  inProgress: number;
  undeveloped: number;
}

// Al-Mehrab Consolidated System Colors
const COLORS = { implemented: "#10b981", inProgress: "#dfb15b", undeveloped: "#ef4444" };

export default function StatusDonut({ implemented, inProgress, undeveloped }: Props) {
  const total = implemented + inProgress + undeveloped;
  const data = [
    { name: "Implemented", key: "implemented", value: implemented },
    { name: "In Development", key: "inProgress", value: inProgress },
    { name: "Undeveloped", key: "undeveloped", value: undeveloped },
  ];
  const [active, setActive] = useState<number | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-mehrab-panel p-6 shadow-2xl"
    >
      <p className="font-display text-lg font-bold text-mehrab-textLight">Status Distribution</p>

      <div className="relative mt-2 h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={72}
              outerRadius={100}
              paddingAngle={4}
              startAngle={90}
              endAngle={-270}
              isAnimationActive
              animationDuration={800}
              onMouseEnter={(_, i) => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              {data.map((entry, i) => (
                <Cell
                  key={entry.key}
                  fill={COLORS[entry.key as keyof typeof COLORS]}
                  stroke="#0b0d10"
                  strokeWidth={3}
                  opacity={active === null || active === i ? 1 : 0.4}
                  className="transition-opacity duration-200 outline-none"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "#12161a",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                color: "#f1f4f6",
                fontSize: 13,
                fontFamily: "var(--font-plex)",
              }}
              formatter={(value: number) => [`${value} Forms`, ""]}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-display text-4xl font-bold tracking-tight text-mehrab-textLight">{total}</span>
          <span className="text-[10px] font-mono uppercase tracking-wider text-mehrab-textMuted">Forms Total</span>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {data.map((d) => {
          const pct = Math.round((d.value / total) * 100);
          return (
            <div key={d.key} className="flex items-center gap-3 text-xs font-medium">
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full ring-2 ring-white/5"
                style={{ backgroundColor: COLORS[d.key as keyof typeof COLORS] }}
              />
              <span className="w-28 shrink-0 text-mehrab-textLight/90">{d.name}</span>
              <span className="flex-1 h-1.5 overflow-hidden rounded-full bg-mehrab-bg/90 p-[0.5px]">
                <motion.span
                  className="block h-full rounded-full"
                  style={{ backgroundColor: COLORS[d.key as keyof typeof COLORS] }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              </span>
              <span className="w-16 shrink-0 text-right font-mono text-[11px] text-mehrab-textMuted">
                {d.value} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
