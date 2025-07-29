import { NextResponse } from 'next/server';
import { APP_VERSION } from '@/lib/constants';

export async function GET() {
  try {
    // In a real app, you might check database connectivity, etc.
    // For now, a simple health check is sufficient.
    return NextResponse.json({
      status: 'ok',
      version: APP_VERSION,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: 'Health check failed',
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 503 }
    );
  }
}

// Disable caching for this route
export const revalidate = 0;
