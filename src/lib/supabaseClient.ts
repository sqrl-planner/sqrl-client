import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY

if (!supabaseUrl) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL")
}

if (!supabaseKey) {
  throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_KEY")
}

export const supabase = createClient(supabaseUrl, supabaseKey)
