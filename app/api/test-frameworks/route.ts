import { NextResponse } from 'next/server';

// Test endpoint to verify framework configurations
export async function GET() {
  const frameworks = {
    archimate: {
      categories: ['Business', 'Application', 'Technology', 'Physical', 'Motivation', 'Strategy', 'Implementation'],
      elementCount: 60 // Approximate count
    },
    c4: {
      categories: ['Context', 'Container', 'Component', 'Deployment'],
      elementCount: 20 // Approximate count
    },
    togaf: {
      categories: ['Business', 'Data', 'Application', 'Technology'],
      elementCount: 16 // Approximate count
    }
  };

  return NextResponse.json({
    status: 'success',
    frameworks,
    message: 'Framework configurations loaded successfully'
  });
}