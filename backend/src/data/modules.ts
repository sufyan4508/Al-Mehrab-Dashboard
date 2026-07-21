import { ModuleProgress } from "../types";

// Swap this out for a real database query (Postgres/Mongo/etc.) —
// the controller only cares about the shape, not the source.
export const modules: ModuleProgress[] = [
  { code: "PQAMS", name: "Purchase & QA Management", implemented: 5, inProgress: 9, undeveloped: 3 },
  { code: "PROMS", name: "Production Order Management", implemented: 7, inProgress: 13, undeveloped: 7 },
  { code: "LOGMS", name: "Logistics Management", implemented: 9, inProgress: 2, undeveloped: 0 },
  { code: "HRMS", name: "Human Resource Management", implemented: 13, inProgress: 0, undeveloped: 0 },
  { code: "FINMS", name: "Finance & Accounts", implemented: 16, inProgress: 1, undeveloped: 0 },
  { code: "INVMS", name: "Inventory Management", implemented: 11, inProgress: 0, undeveloped: 0 },
  { code: "SALMS", name: "Sales & Distribution", implemented: 8, inProgress: 0, undeveloped: 4 },
  { code: "MNTMS", name: "Maintenance Management", implemented: 7, inProgress: 0, undeveloped: 0 },
];
