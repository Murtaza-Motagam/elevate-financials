import { NextResponse } from 'next/server';
import cookieConfig from '@/lib/config';
import { clearCookies, getCookie, setCookie } from '@/lib/cookieStorage';
import { COOKIE_KEYS } from '@/lib/constant';

export async function GET() {
  try {
    const token = await getCookie(COOKIE_KEYS.token);
    const user = await getCookie(COOKIE_KEYS.user);

    return NextResponse.json(
      { success: true, token: token, data: user },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error fetching token:', error);
    return NextResponse.json({ success: false, message: 'Server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { user, token } = body;

    await setCookie(COOKIE_KEYS.token, token, {
      maxAge: 60 * 60 * 24,
      ...cookieConfig.cookieOptions,
    });

    await setCookie(COOKIE_KEYS.user, user, {
      maxAge: 60 * 60 * 24 * 7,
      ...cookieConfig.cookieOptions,
    });

    return NextResponse.json({ success: true, message: 'User data saved successfully', user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error, message: 'Error saving user data' },
      { status: 500 },
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const { user } = body;

    await setCookie(COOKIE_KEYS.user, user, {
      maxAge: 60 * 60 * 24 * 7,
      ...cookieConfig.cookieOptions,
    });
    return NextResponse.json({ success: true, message: 'User data updated successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error, message: 'Error saving user data' },
      { status: 500 },
    );
  }
}

export async function DELETE() {

  await clearCookies();

  return NextResponse.json({ success: true, message: 'User logged out successfully' });
}
