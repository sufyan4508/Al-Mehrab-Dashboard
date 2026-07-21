import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || "";
const supabaseKey = process.env.SUPABASE_KEY || "";

if (!supabaseUrl || !supabaseKey) {
  console.warn("⚠️ Warning: Supabase environment variables are missing in backend configuration!");
}

// Global serverless cloud infrastructure handshake connection
export const supabase = createClient(supabaseUrl, supabaseKey);

console.log("⚡ Al-Mehrab Enterprise Cloud Database Engine Linked Successfully.");
