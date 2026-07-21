export type FormStatus = "implemented" | "in_progress" | "undeveloped";

export interface ModuleProgress {
  code: string;
  name: string;
  implemented: number;
  inProgress: number;
  undeveloped: number;
}

export interface DashboardSummary {
  companyName: string;
  reportLabel: string;
  totalForms: number;
  totalModules: number;
  implemented: number;
  inProgress: number;
  undeveloped: number;
  lastUpdated: string;
  modules: ModuleProgress[];
}
