import { NextRequest, NextResponse } from "next/server";

export default function middleware(req: NextRequest) {
    const token = req.cookies.get("auth")?.value;
    if (!token) NextResponse.redirect(new URL("/", req.url));

    return NextResponse.next();
}

export const config = {
    matcher: ["/user/:path"],
};
