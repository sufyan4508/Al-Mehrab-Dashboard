"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { RefreshCw, LogOut, Sun, Moon, MehrabLogo } from "./icons";

interface HeaderProps {
  companyName: string;
  reportLabel: string;
  lastUpdated: string;
  onRefresh: () => void;
  refreshing: boolean;
  onLogout?: () => void;
}

export default function Header({
  companyName,
  reportLabel,
  lastUpdated,
  onRefresh,
  refreshing,
  onLogout,
}: HeaderProps) {
  const [timeLabel, setTimeLabel] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    if (lastUpdated) {
      const formatted = new Date(lastUpdated).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      setTimeLabel(formatted);
    }
  }, [lastUpdated]);

  const toggleTheme = () => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.style.setProperty("--bg-custom", "#f4f6f8");
      root.style.setProperty("--panel-custom", "#ffffff");
      root.style.setProperty("--text-light-custom", "#0f172a");
      root.style.setProperty("--text-muted-custom", "#64748b");
      root.classList.add("light-theme");
    } else {
      root.style.setProperty("--bg-custom", "#0b0d10");
      root.style.setProperty("--panel-custom", "#12161a");
      root.style.setProperty("--text-light-custom", "#f1f4f6");
      root.style.setProperty("--text-muted-custom", "#8e9ba5");
      root.classList.remove("light-theme");
    }
    setIsDarkMode(!isDarkMode);
  };

  return (
    <header className="relative overflow-hidden rounded-2xl border border-white/10 bg-mehrab-panel shadow-2xl transition-colors duration-300">
      <div className="absolute -left-16 -top-16 h-40 w-40 rounded-full bg-mehrab-maroon/20 blur-3xl" />
      <div className="absolute -right-16 -bottom-16 h-40 w-40 rounded-full bg-mehrab-gold/10 blur-3xl" />
      
      <div className="absolute inset-x-0 top-0 h-[3px] flex">
        {["#10b981", "#dfb15b", "#ef4444"].map((color, index) => (
          <div key={index} className="flex-1" style={{ backgroundColor: color }} />
        ))}
      </div>

      <div className="relative flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <motion.div
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex items-center gap-4"
        >
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-mehrab-maroon to-mehrab-maroonDeep text-mehrab-gold shadow-lg border border-mehrab-gold/20">
            <MehrabLogo size={22} />
          </div>
          <div>
            <h1 className="font-display text-2xl font-bold leading-none tracking-tight text-mehrab-textLight sm:text-3xl">
              Al-Mehrab Enterprise
            </h1>
            <p className="mt-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.25em] text-mehrab-gold">
              {reportLabel || "ENTERPRISE PROGRESS MONITOR"}
            </p>
            <p className="mt-1 text-xs text-mehrab-textMuted">
              System Live Synced: {timeLabel || "Loading..."}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 15 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.05 }}
          className="flex items-center gap-2.5"
        >
          <button
            onClick={toggleTheme}
            aria-label="Toggle Dashboard Theme"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-mehrab-textMuted transition hover:border-mehrab-gold hover:text-mehrab-gold"
          >
            {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          <button
            onClick={onRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 rounded-xl bg-mehrab-gold px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-mehrab-bg transition hover:bg-mehrab-goldSoft active:scale-[0.97] disabled:opacity-50"
          >
            <motion.span
              animate={refreshing ? { rotate: 360 } : { rotate: 0 }}
              transition={refreshing ? { duration: 0.8, repeat: Infinity, ease: "linear" } : {}}
              className="flex"
            >
              <RefreshCw size={14} />
            </motion.span>
            {refreshing ? "Updating..." : "Refresh"}
          </button>
          
          {/* Working Logout Terminal Trigger Button */}
          <button
            onClick={onLogout}
            aria-label="Sign out secure terminal"
            className="flex items-center justify-center rounded-xl border border-white/10 p-2.5 text-mehrab-textMuted transition hover:border-mehrab-rose hover:bg-mehrab-rose/10 hover:text-mehrab-rose-400 group"
          >
            <LogOut size={16} />
            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 text-[10px] font-mono uppercase tracking-wider transition-all duration-300">
              Exit Auth
            </span>
          </button>
        </motion.div>
      </div>
    </header>
  );
}
