"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ModuleProgress } from "@/lib/types";

interface AdminFormModalProps {
  modules: ModuleProgress[];
  onClose: () => void;
  onUpdateSuccess: (updatedModules: ModuleProgress[]) => void;
}

export default function AdminFormModal({ modules, onClose, onUpdateSuccess }: AdminFormModalProps) {
  const initialModule = modules && modules.length > 0 ? modules[0].code : "";
  
  const [selectedModuleCode, setSelectedModuleCode] = useState(initialModule);
  const [implemented, setImplemented] = useState(0);
  const [inProgress, setInProgress] = useState(0);
  const [undeveloped, setUndeveloped] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (modules && modules.length > 0) {
      const firstMod = modules[0];
      setImplemented(firstMod.implemented);
      setInProgress(firstMod.inProgress);
      setUndeveloped(firstMod.undeveloped);
    }
  }, [modules]);

  const handleModuleChange = (code: string) => {
    setSelectedModuleCode(code);
    const target = modules.find((m) => m.code === code);
    if (target) {
      setImplemented(target.implemented);
      setInProgress(target.inProgress);
      setUndeveloped(target.undeveloped);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updatedList = modules.map((m) => {
      if (m.code === selectedModuleCode) {
        return {
          ...m,
          implemented: Number(implemented),
          inProgress: Number(inProgress),
          undeveloped: Number(undeveloped),
        };
      }
      return m;
    });

    setTimeout(() => {
      onUpdateSuccess(updatedList);
      setLoading(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">
      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-lg rounded-2xl border border-white/10 bg-mehrab-panel p-6 shadow-2xl relative">
        <div className="absolute inset-x-0 top-0 h-[3px] bg-gradient-to-r from-mehrab-gold via-mehrab-maroon to-mehrab-green" />
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="font-display text-xl font-bold text-mehrab-textLight">Control Panel Subsystem</h3>
            <p className="font-mono text-[9px] uppercase tracking-wider text-mehrab-gold mt-0.5">Update ERP Module Progress</p>
          </div>
          <button type="button" onClick={onClose} className="text-mehrab-textMuted hover:text-mehrab-textLight text-xs font-mono">Close</button>
        </div>
        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <div>
            <label className="block font-mono text-[10px] font-bold text-mehrab-textMuted mb-2">Target ERP Module</label>
            <select value={selectedModuleCode} onChange={(e) => handleModuleChange(e.target.value)} className="w-full rounded-xl border border-white/10 bg-mehrab-bg px-4 py-3 text-sm text-mehrab-textLight focus:outline-none">
              {modules && modules.map((m) => (
                <option key={m.code} value={m.code} className="bg-mehrab-panel">{m.code} - {m.name}</option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-mono text-[10px] text-mehrab-green mb-2">Live Forms</label>
              <input type="number" min="0" value={implemented} onChange={(e) => setImplemented(Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-mehrab-bg px-4 py-3 text-sm text-mehrab-textLight" />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-mehrab-amber mb-2">In Dev</label>
              <input type="number" min="0" value={inProgress} onChange={(e) => setInProgress(Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-mehrab-bg px-4 py-3 text-sm text-mehrab-textLight" />
            </div>
            <div>
              <label className="block font-mono text-[10px] text-mehrab-rose mb-2">Not Started</label>
              <input type="number" min="0" value={undeveloped} onChange={(e) => setUndeveloped(Number(e.target.value))} className="w-full rounded-xl border border-white/10 bg-mehrab-bg px-4 py-3 text-sm text-mehrab-textLight" />
            </div>
          </div>
          <div className="mt-8 flex gap-3 border-t border-white/5 pt-4">
            <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-white/10 py-3 text-xs font-bold text-mehrab-textMuted">Abort</button>
            <button type="submit" disabled={loading} className="flex-1 rounded-xl bg-mehrab-gold py-3 text-xs font-bold text-mehrab-bg">{loading ? "Syncing..." : "Commit Changes"}</button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
