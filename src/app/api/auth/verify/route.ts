import prisma from "@/prisma";
import { newToken } from "@/utils/jwt";
import { NextRequest, NextResponse } from "next/server";

import z from "zod";

const queryParam = z.object({ code: z.string(), id: z.string() });

export async function GET(req: NextRequest) {
    const RedirectUrl = new URL("/message", req.url);

    const params = queryParam.safeParse({
        code: req.nextUrl.searchParams.get("code"),
        id: req.nextUrl.searchParams.get("id"),
    });

    if (!params.success) {
        RedirectUrl.searchParams.set(
            "message",
            "Verification link does not have valid validation data. Try again"
        );
        RedirectUrl.searchParams.set("state", "err");
        return NextResponse.redirect(RedirectUrl);
    }

    const otp = await prisma.otp.findFirst({
        where: {
            userId: params.data.id,
            code: Number(params.data.code),
        },
        orderBy: {
            userId: "desc",
        },
    });

    if (!otp || otp.code.toString() !== params.data.code) {
        RedirectUrl.searchParams.set("message", "not valid Link, try again");
        RedirectUrl.searchParams.set("state", "err");
        return NextResponse.redirect(RedirectUrl);
    }

    const token = newToken(otp.userId);

    await prisma.otp.delete({
        where: {
            id: otp.id,
        },
    });

    return NextResponse.redirect(new URL("/user/profile", req.url), {
        headers: {
            "Set-Cookie": `auth=${token}; Max-Age=86400; Path=/; HttpOnly`,
        },
    });
}
