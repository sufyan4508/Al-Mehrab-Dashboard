import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dashboardRoutes from "./routes/dashboard.routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

app.use(cors({ origin: CORS_ORIGIN }));
app.use(express.json());

app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.use("/api/dashboard", dashboardRoutes);

app.listen(PORT, () => {
  // Al-Mehrab branding fixed here
  console.log(`🚀 Al-Mehrab ERP Central API active on http://localhost:${PORT}`);
});
