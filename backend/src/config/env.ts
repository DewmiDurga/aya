import dotenv from "dotenv";
dotenv.config();

export const ENV = {
  PORT: process.env.PORT || "4000",
  SUPABASE_URL: process.env.SUPABASE_URL || "",
  SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY || "",
  ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || "",
  CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || "http://localhost:3000"
};
