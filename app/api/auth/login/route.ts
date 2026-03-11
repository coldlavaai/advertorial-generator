import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Get credentials from environment variables (set in Vercel)
    const adminEmail = process.env.ADMIN_EMAIL || 'jj@coldlava.ai';
    const adminPassword = process.env.ADMIN_PASSWORD || 'ColdLava2026!';

    // Validate credentials
    if (email === adminEmail && password === adminPassword) {
      // Generate a simple token (in production, use JWT)
      const token = Buffer.from(`${email}:${Date.now()}`).toString('base64');

      return NextResponse.json(
        { success: true, token },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
