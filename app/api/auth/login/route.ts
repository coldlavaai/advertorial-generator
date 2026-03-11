import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // Hardcoded credentials for now
    const validEmail = 'jj@coldlava.ai';
    const validPassword = 'ColdLava2026!';

    // Validate credentials (case-insensitive email)
    if (email.toLowerCase().trim() === validEmail.toLowerCase() && password === validPassword) {
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
