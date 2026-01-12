import { createBrowserClient } from '@supabase/ssr'

/**
 * Create a Supabase client for use in the browser (Client Components)
 * This should only be called in client-side code
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
