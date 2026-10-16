// File: dashboard/src/lib/supabase.js
// What this does: Creates a single Supabase client that the whole dashboard uses.
// import.meta.env reads from .env.local — that&#39;s where your keys are stored safely.
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Export supabase client if keys provided, otherwise null or fallback
export const supabase = (supabaseUrl && supabaseKey && supabaseUrl.startsWith('http'))
  ? createClient(supabaseUrl, supabaseKey)
  : null