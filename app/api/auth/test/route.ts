import { NextResponse } from 'next/server';

export async function GET() {
  // Test endpoint to verify environment variables
  return NextResponse.json({
    hasAdminEmail: !!process.env.ADMIN_EMAIL,
    hasAdminPassword: !!process.env.ADMIN_PASSWORD,
    adminEmail: process.env.ADMIN_EMAIL || 'NOT_SET',
    // Don't expose actual password, just confirm it exists
    passwordLength: process.env.ADMIN_PASSWORD?.length || 0,
    nodeEnv: process.env.NODE_ENV,
  });
}
