import { supabase } from "../lib/supabase";

export const authApi = {
  signUpWithPhone: (phone: string) =>
    supabase.auth.signInWithOtp({ phone }),
  verifyOtp: (phone: string, token: string) =>
    supabase.auth.verifyOtp({ phone, token, type: "sms" }),
  signOut: () => supabase.auth.signOut(),
  getSession: () => supabase.auth.getSession()
};
