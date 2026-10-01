import { createClient } from "@supabase/supabase-js";
import { env } from "./env";

// SERVER-ONLY client using the service role key.
// Never send this key to the mobile app — it bypasses RLS.
export const supabaseAdmin = createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
