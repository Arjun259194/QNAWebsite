import prisma from "@/prisma";
import { newToken } from "@/utils/jwt";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

import z from "zod";

const queryParam = z.object({ code: z.string(), id: z.string() });

export async function GET(req: NextRequest) {
    const params = queryParam.safeParse({
        code: req.nextUrl.searchParams.get("code"),
        id: req.nextUrl.searchParams.get("id"),
    });
    if (!params.success) {
        console.log("not valid params");
        console.log(req.nextUrl.searchParams);
        return redirect("/error_message");
    }

    const otp = await prisma.otp.findFirst({
        where: {
            userId: params.data.id,
        },
        orderBy: {
            userId: "desc",
        },
    });

    if (!otp || otp.code.toString() !== params.data.code) {
        console.log("otp not matched");
        return redirect("/error_message");
    }

    const token = newToken(otp.userId);

    await prisma.otp.delete({
        where: {
            id: otp.id,
        },
    });

    // req.headers.set("Set-Cookie", `auth=${token}; Max-Age=86400; Path=/; HttpOnly`);
    // req.headers.set("Location", `/profile`);

    return NextResponse.redirect(new URL("/profile", req.url), {
        headers: {
            "Set-Cookie": `auth=${token}; Max-Age=86400; Path=/; HttpOnly`,
        },
    });
}
