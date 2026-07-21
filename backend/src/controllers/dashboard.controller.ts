import { Request, Response } from "express";
import { supabase } from "../data/db";
import { ModuleProgress, DashboardSummary } from "../types";

// 1. Get Live Data from Supabase Cloud
export const getDashboardData = async (_req: Request, res: Response) => {
  try {
    const { data: dbModules, error } = await supabase
      .from("erp_modules")
      .select("*")
      .order("code", { ascending: true });

    if (error) throw error;

    // Map database snake_case to frontend camelCase structure smoothly
    const mappedModules: ModuleProgress[] = (dbModules || []).map((m: any) => ({
      code: m.code,
      name: m.name,
      implemented: m.implemented,
      inProgress: m.in_progress, // Mapping fix
      undeveloped: m.undeveloped,
    }));

    // Calculate core metrics aggregates on the fly
    let implemented = 0;
    let inProgress = 0;
    let undeveloped = 0;

    mappedModules.forEach((m) => {
      implemented += m.implemented;
      inProgress += m.inProgress;
      undeveloped += m.undeveloped;
    });

    const summary: DashboardSummary = {
      companyName: "Al-Mehrab",
      reportLabel: "ENTERPRISE PROGRESS MONITOR",
      lastUpdated: new Date().toISOString(),
      implemented,
      inProgress,
      undeveloped,
      totalForms: implemented + inProgress + undeveloped,
      totalModules: mappedModules.length,
      modules: mappedModules,
    };

    return res.json(summary);
  } catch (err: any) {
    console.error("Database fetch exception:", err.message);
    return res.status(500).json({ error: "Failed to fetch cloud dashboard aggregates." });
  }
};

// 2. Update Data from Admin Form Submission
export const updateModuleProgress = async (req: Request, res: Response) => {
  const { code, implemented, inProgress, undeveloped } = req.body;

  if (!code) {
    return res.status(400).json({ error: "Missing module verification code parameter." });
  }

  try {
    const { data, error } = await supabase
      .from("erp_modules")
      .update({
        implemented: Number(implemented),
        in_progress: Number(inProgress), // Database mapping
        undeveloped: Number(undeveloped),
        updated_at: new Date().toISOString()
      })
      .eq("code", code)
      .select();

    if (error) throw error;

    return res.json({ success: true, message: `Module ${code} metrics synchronized safely.`, data });
  } catch (err: any) {
    console.error("Database commit failure:", err.message);
    return res.status(500).json({ error: "Failed to push records transaction to cloud." });
  }
};
