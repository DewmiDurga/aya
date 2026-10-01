import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

// Client-side Supabase instance — uses the ANON key only.
// The service role key must never appear in the mobile app.
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false
  }
});
