import DashboardClient from "@/components/DashboardClient";
import { getDashboardSummary } from "@/lib/api";

// Server component: fetches the first paint from the Node/Express API
// (falls back to bundled sample data if the API isn't running yet).
export default async function Page() {
  const summary = await getDashboardSummary();
  return <DashboardClient initial={summary} />;
}
