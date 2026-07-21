import { DashboardSummary } from "./types";

// Points at the Node/Express backend in /backend.
// Set NEXT_PUBLIC_API_URL in .env.local to override (defaults to local dev server).
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function getDashboardSummary(): Promise<DashboardSummary> {
  try {
    const res = await fetch(`${API_URL}/api/dashboard`, {
      next: { revalidate: 30 }, // refresh every 30s on the server
    });
    if (!res.ok) throw new Error(`API responded ${res.status}`);
    return (await res.json()) as DashboardSummary;
  } catch {
    // Fallback so the UI still renders if the backend isn't running yet.
    return FALLBACK_SUMMARY;
  }
}

export const FALLBACK_SUMMARY: DashboardSummary = {
  companyName: "Naseem Fabrics",
  reportLabel: "ERP Development Progress",
  totalForms: 114,
  totalModules: 8,
  implemented: 76,
  inProgress: 24,
  undeveloped: 14,
  lastUpdated: new Date().toISOString(),
  modules: [
    { code: "PQAMS", name: "Purchase & QA Management", implemented: 5, inProgress: 9, undeveloped: 3 },
    { code: "PROMS", name: "Production Order Management", implemented: 7, inProgress: 13, undeveloped: 7 },
    { code: "LOGMS", name: "Logistics Management", implemented: 9, inProgress: 2, undeveloped: 0 },
    { code: "HRMS", name: "Human Resource Management", implemented: 13, inProgress: 0, undeveloped: 0 },
    { code: "FINMS", name: "Finance & Accounts", implemented: 16, inProgress: 1, undeveloped: 0 },
    { code: "INVMS", name: "Inventory Management", implemented: 11, inProgress: 0, undeveloped: 0 },
    { code: "SALMS", name: "Sales & Distribution", implemented: 8, inProgress: 0, undeveloped: 4 },
    { code: "MNTMS", name: "Maintenance Management", implemented: 7, inProgress: 0, undeveloped: 0 },
  ],
};
