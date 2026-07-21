import { Router } from "express";
import { getDashboardData, updateModuleProgress } from "../controllers/dashboard.controller";

const router = Router();

// Standard REST architectural gateway pipelines
router.get("/", getDashboardData);
router.post("/update", updateModuleProgress);

export default router;
