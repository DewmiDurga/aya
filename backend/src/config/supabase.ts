import { createClient } from "@supabase/supabase-js";
import { ENV } from "./env";

if (!ENV.SUPABASE_URL || !ENV.SUPABASE_SERVICE_ROLE_KEY) {
  console.warn("⚠️ SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY not configured. Running in mock/offline mode.");
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
