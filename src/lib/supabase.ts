import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.SUPABASE_URL || (import.meta.env ? import.meta.env.VITE_SUPABASE_URL : undefined);
const supabaseKey =
  process.env.SUPABASE_ANON_KEY ||
  (import.meta.env ? import.meta.env.VITE_SUPABASE_ANON_KEY : undefined);

export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

if (supabase) {
  console.log("[Supabase] Initialized successfully.");
} else {
  console.warn(
    "[Supabase] Credentials not set in environment. Falling back to local file storage.",
  );
}
