import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env";

export const isSupabaseConfigured = Boolean(
  ENV.SUPABASE_URL &&
  !ENV.SUPABASE_URL.includes("dummy") &&
  !ENV.SUPABASE_URL.includes("placeholder") &&
  !ENV.SUPABASE_URL.includes("your-project") &&
  ENV.SUPABASE_SERVICE_ROLE_KEY &&
  !ENV.SUPABASE_SERVICE_ROLE_KEY.includes("Dummy") &&
  !ENV.SUPABASE_SERVICE_ROLE_KEY.includes("your-supabase")
);

if (!isSupabaseConfigured) {
  console.warn("⚠️ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not configured with live credentials. Running with high-performance local store.");
}

export const supabaseAdmin = createClient(
  ENV.SUPABASE_URL || "https://placeholder.supabase.co",
  ENV.SUPABASE_SERVICE_ROLE_KEY || "placeholder-key",
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
);

