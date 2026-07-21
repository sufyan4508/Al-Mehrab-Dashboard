"use client";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ModuleProgress } from "@/lib/types";

export default function ModuleBarChart({ modules }: { modules: ModuleProgress[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5 }}
      className="rounded-2xl border border-white/10 bg-mehrab-panel p-6 shadow-2xl"
    >
      <p className="font-display text-lg font-bold text-mehrab-textLight">Forms by Module</p>

      <div className="mt-4 h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={modules} margin={{ top: 4, right: 8, left: -22, bottom: 0 }} barGap={4}>
            <CartesianGrid stroke="rgba(255,255,255,0.03)" vertical={false} />
            <XAxis
              dataKey="code"
              stroke="#8e9ba5"
              fontSize={11}
              fontFamily="var(--font-plex-mono)"
              tickLine={false}
              axisLine={{ stroke: "rgba(255,255,255,0.08)" }}
            />
            <YAxis 
              stroke="#8e9ba5" 
              fontSize={11} 
              fontFamily="var(--font-plex-mono)" 
              tickLine={false} 
              axisLine={false} 
            />
            <Tooltip
              cursor={{ fill: "rgba(255,255,255,0.02)" }}
              contentStyle={{
                background: "#12161a",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: 12,
                color: "#f1f4f6",
                fontSize: 13,
                fontFamily: "var(--font-plex)",
              }}
              labelStyle={{ color: "#dfb15b", fontWeight: 700, fontFamily: "var(--font-plex-mono)" }}
            />
            <Legend
              wrapperStyle={{ fontSize: 11, paddingTop: 16, fontFamily: "var(--font-plex)" }}
              formatter={(v) => <span style={{ color: "#8e9ba5", fontWeight: 500 }}>{v}</span>}
            />
            <Bar dataKey="implemented" stackId="a" name="Implemented" fill="#10b981" radius={[0, 0, 0, 0]} animationDuration={800} />
            <Bar dataKey="inProgress" stackId="a" name="In Development" fill="#dfb15b" animationDuration={800} animationBegin={100} />
            <Bar dataKey="undeveloped" stackId="a" name="Undeveloped" fill="#ef4444" radius={[3, 3, 0, 0]} animationDuration={800} animationBegin={200} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
