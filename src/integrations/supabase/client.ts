import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://pveyylhlerppiwcywcyb.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2ZXl5bGhsZXJwcGl3Y3l3Y3liIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzgyMzUxNTAsImV4cCI6MjA1MzgxMTE1MH0.hy27xk-DKKUqLmWxx3TkaaniohCAbwhkVp4jV0N8Q7U";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web'
    }
  }
});