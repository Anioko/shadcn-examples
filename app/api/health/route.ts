import { NextResponse } from 'next/server';

export async function GET() {
  // Simple test to verify server is responding
  return NextResponse.json({ 
    message: 'Server is working', 
    timestamp: new Date().toISOString(),
    frameworks: ['archimate', 'c4', 'togaf']
  });
}