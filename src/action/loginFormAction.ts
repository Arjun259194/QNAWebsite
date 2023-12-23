"use server";
import prisma from "@/prisma";
import MailService from "@/utils/email";
import { checkPassword } from "@/utils/hash";
import z from "zod";

const LoginReqBody = z.object({
    email: z.string().email(),
    password: z.string(),
    origin: z.string(),
});
function genRandOtpCode() {
    const CODE_LEN = 6;
    const code = Math.floor(100000 + Math.random() * 900000);
    return Number(code.toString().substring(0, CODE_LEN));
}

export default async function (formData: FormData, str: string) {
    const parsedObj = LoginReqBody.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
        origin: formData.get("origin"),
    });

    if (!parsedObj.success) throw new Error(parsedObj.error.message);

    const foundUser = await prisma.user
        .findFirst({
            where: { email: parsedObj.data.email },
        })
        .catch(err => {
            console.log("err", err);
            throw new Error("Failed to fetch user");
        });

    if (!foundUser) throw new Error("User not found");

    const isAuth = await checkPassword(parsedObj.data.password, foundUser.password).catch(
        err => {
            throw new Error("failed to check password");
        }
    );

    if (!isAuth) throw new Error("not valid password");

    const OTP = await prisma.otp
        .create({
            data: {
                code: genRandOtpCode(),
                userId: foundUser.id,
            },
        })
        .catch(err => {
            console.log("err", err);
            throw new Error("Failed to fetch opt");
        });

    if (!OTP) throw new Error("failed to generate OTP code");

    const mailer = new MailService({
        pass: process.env.EMAIL_TOKEN,
        user: process.env.EMAIL_ADDRESS,
    });

    const u = new URL("/auth/verify", parsedObj.data.origin);
    u.searchParams.set("code", OTP.code.toString());
    u.searchParams.set("id", foundUser.id);

    try {
        await mailer.sendMail({
            type: "Verify",
            code: OTP.code,
            email: foundUser.email,
            username: foundUser.username,
            url: u.toString(),
        });
    } catch (err) {
        throw new Error("Failed to send OPT email");
    }

    return;
}
