import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/lib/supabase/middleware'

export async function middleware(request: NextRequest) {
  // Only run Supabase auth if credentials are configured
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Check if both URL and key are valid (non-empty strings starting with expected format)
  const isSupabaseConfigured =
    supabaseUrl &&
    supabaseKey &&
    supabaseUrl.trim().length > 0 &&
    supabaseKey.trim().length > 0 &&
    supabaseUrl.startsWith('http')

  if (isSupabaseConfigured) {
    // Refresh Supabase auth session
    return await updateSession(request)
  }

  // Pass through if Supabase is not configured
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
