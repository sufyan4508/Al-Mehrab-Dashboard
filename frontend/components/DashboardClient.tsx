"use client";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { DashboardSummary, ModuleProgress } from "@/lib/types";
import { getDashboardSummary } from "@/lib/api";
import Header from "./Header";
import OverallProgress from "./OverallProgress";
import StatCard from "./StatCard";
import StatusDonut from "./StatusDonut";
import ModuleBarChart from "./ModuleBarChart";
import ModuleList from "./ModuleList";
import AuthPortal from "./AuthPortal";
import AdminFormModal from "./manager";
import { CheckCircle, Code, AlertTriangle } from "./icons";

export default function DashboardClient({ initial }: { initial: DashboardSummary }) {
  const [data, setData] = useState(initial);
  const [refreshing, setRefreshing] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Sync state initially with server data
  useEffect(() => {
    if (initial) {
      setData(initial);
    }
  }, [initial]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setCheckingAuth(false);
    });
    return () => unsubscribe();
  }, []);

  const handleRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const next = await getDashboardSummary();
      setData({ ...next });
    } catch (error) {
      console.error("Refresh break sequence:", error);
    } finally {
      setTimeout(() => setRefreshing(false), 500);
    }
  }, []);

  // REAL LIVE DATA PIPELINE: Push updates straight to our Express Node API
  const handleDataUpdate = async (updatedModules: ModuleProgress[]) => {
    setRefreshing(true);
    try {
      // Dhoondna ke kis single module ko user ne change kiya hai
      const currentActiveCode = updatedModules.find((m, index) => {
        const prev = data.modules[index];
        return prev && (
          m.implemented !== prev.implemented ||
          m.inProgress !== prev.inProgress ||
          m.undeveloped !== prev.undeveloped
        );
      })?.code;

      const targetMod = updatedModules.find(m => m.code === currentActiveCode);

      if (targetMod) {
        // Execute real REST API transaction query handshake
        const response = await fetch("http://localhost:4000/api/dashboard/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: targetMod.code,
            implemented: targetMod.implemented,
            inProgress: targetMod.inProgress,
            undeveloped: targetMod.undeveloped
          })
        });

        if (!response.ok) throw new Error("Cloud synchronization handshake rejected.");
        
        // Refresh full screen dataset directly from database payload to ensure integrity
        const cleanFreshSummary = await getDashboardSummary();
        setData(cleanFreshSummary);
      }
    } catch (error) {
      console.error("Failed to sync structural payload transaction with cloud database:", error);
      alert("Database error: Synchronization failed. Rolling back interface state.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout runtime failure:", error);
    }
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mehrab-bg font-mono text-xs uppercase tracking-widest text-mehrab-gold">
        Establishing Corporate Secure Handshake...
      </div>
    );
  }

  if (!user) {
    return <AuthPortal onAuthSuccess={() => handleRefresh()} />;
  }

  const total = data.implemented + data.inProgress + data.undeveloped;

  return (
    <main className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-10">
      <Header
        companyName="Al-Mehrab"
        reportLabel={data.reportLabel || "ENTERPRISE PROGRESS MONITOR"}
        lastUpdated={data.lastUpdated}
        onRefresh={handleRefresh}
        refreshing={refreshing}
        onLogout={handleLogout}
      />

      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-mehrab-maroon to-mehrab-maroonDeep border border-mehrab-gold/30 px-5 py-3 text-xs font-bold uppercase tracking-wider text-mehrab-goldSoft hover:text-mehrab-textLight shadow-xl hover:brightness-110 active:scale-[0.98] transition"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" />
          </svg>
          Update Enterprise Metrics
        </button>
      </div>

      <motion.div 
        animate={refreshing ? { opacity: 0.6, scale: 0.99 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-5"
      >
        <div className="lg:col-span-2">
          <OverallProgress
            implemented={data.implemented}
            inProgress={data.inProgress}
            undeveloped={data.undeveloped}
            totalForms={data.totalForms}
            totalModules={data.totalModules}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:col-span-3 lg:grid-cols-1 lg:gap-4">
          <StatCard label="Implemented" value={data.implemented} total={total} icon={<CheckCircle />} accent="green" caption="Developed & live in production" delay={0.05} />
          <StatCard label="In Development" value={data.inProgress} total={total} icon={<Code />} accent="amber" caption="Under technical development" delay={0.12} />
          <StatCard label="Undeveloped" value={data.undeveloped} total={total} icon={<AlertTriangle />} accent="rose" caption="Not yet started or queued" delay={0.2} />
        </div>
      </motion.div>

      <motion.div animate={refreshing ? { opacity: 0.6 } : { opacity: 1 }} className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <StatusDonut implemented={data.implemented} inProgress={data.inProgress} undeveloped={data.undeveloped} />
        <ModuleBarChart modules={data.modules} />
      </motion.div>

      <motion.div animate={refreshing ? { opacity: 0.6 } : { opacity: 1 }} className="mt-6">
        <ModuleList modules={data.modules} />
      </motion.div>

      <AnimatePresence>
        {isModalOpen && (
          <AdminFormModal
            modules={data.modules}
            onClose={() => setIsModalOpen(false)}
            onUpdateSuccess={handleDataUpdate}
          />
        )}
      </AnimatePresence>

      <motion.footer className="mt-12 text-center font-mono text-[10px] uppercase tracking-widest text-mehrab-textMuted">
        Al-Mehrab ERP • Enterprise Control Center • Core System Safe State
      </motion.footer>
    </main>
  );
}
