import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const cookieStore = await cookies();
    const body = await req.json();
    const { user } = body;

    // ✅ Store only required user fields
    cookieStore.set(
      'userData',
      JSON.stringify({
        id: user.id,
        profileImg: user.profileImg,
        firstName: user.firstName,
        lastName: user.lastName,
        name: user.name,
        username: user.username,
        email: user.email,
        role: user.role,
        mobNo: user.mobNo,
        status: user.status,
        accountDetails: user.accountDetails,
      }),
      { httpOnly: true, secure: true, path: '/' },
    );
    return NextResponse.json({ success: true, message: 'User data updated successfully' });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error, message: 'Error saving user data' },
      { status: 500 },
    );
  }
}
