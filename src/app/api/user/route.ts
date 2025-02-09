import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { profile } from "console";

let userData: Record<string, any> | null = null;

export async function GET() {
    try {
        const cookieStore = await cookies(); // ✅ Await cookies()
        const token = cookieStore.get("Authorization-token");
        const userData = cookieStore.get("userData");

        if (!token) {
            return NextResponse.json({ success: false, message: "User not authenticated" }, { status: 401 });
        }

        if (!userData) {
            return NextResponse.json({ success: false, message: "No user data found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, token: token.value, data: JSON.parse(userData.value) }, { status: 200 });

    } catch (error) {
        console.error("Error fetching token:", error);
        return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
    }
}


export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        const body = await req.json();
        const { user, token } = body;

        if (!token || !user.id) {
            return NextResponse.json({ success: false, message: "Invalid request data" }, { status: 400 });
        }

        // ✅ Store only required user fields
        cookieStore.set(
            "userData",
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
            { httpOnly: true, secure: true, path: "/" }
        );

        // ✅ Store token server-side in HTTP-only cookie
        cookieStore.set("Authorization-token", token, { httpOnly: true, secure: true, path: "/" });

        return NextResponse.json({ success: true, message: "User data saved successfully" });
    } catch (error) {
        return NextResponse.json({ success: false, message: "Error saving user data" }, { status: 500 });
    }
}

export async function DELETE() {
    const cookieStore = await cookies();
    userData = null;
    cookieStore.delete("Authorization-token");

    return NextResponse.json({ success: true, message: "User logged out successfully" });
}
