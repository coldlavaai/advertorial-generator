import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Get credentials from environment variables with explicit fallbacks
    const adminEmail = process.env.ADMIN_EMAIL || 'jj@coldlava.ai';
    const adminPassword = process.env.ADMIN_PASSWORD || 'ColdLava2026!';

    console.log('Login attempt:', email);
    console.log('Expected email:', adminEmail);
    console.log('Env vars:', {
      hasEmail: !!process.env.ADMIN_EMAIL,
      hasPassword: !!process.env.ADMIN_PASSWORD
    });

    // Validate credentials (case-insensitive email)
    if (email.toLowerCase().trim() === adminEmail.toLowerCase().trim() && password === adminPassword) {
      // Generate a simple token
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
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Login failed' },
      { status: 500 }
    );
  }
}
