"use server";
import prisma from "@/prisma";
import MailService from "@/utils/email";
import z from "zod";

const LoginReqBody = z.object({ email: z.string().email(), password: z.string() });
function genRandOtpCode() {
    const CODE_LEN = 6;
    const code = Math.floor(100000 + Math.random() * 900000);
    return Number(code.toString().substring(0, CODE_LEN));
}

export default async function (formData: FormData) {
    const parsedObj = LoginReqBody.safeParse({
        email: formData.get("email"),
        password: formData.get("password"),
    });

    if (!parsedObj.success) throw new Error(parsedObj.error.message);

    const foundUser = await prisma.user.findFirst({
        where: { email: parsedObj.data.email },
    });

    if (!foundUser) throw new Error("User not found");

    const OTP = await prisma.otp.create({
        data: {
            code: genRandOtpCode(),
            userId: foundUser.id,
        },
    });

    if (!OTP) throw new Error("failed to generate OTP code");

    const mailer = new MailService({
        pass: process.env.EMAIL_TOKEN,
        user: process.env.EMAIL_ADDRESS,
    });

    try {
        await mailer.sendMail({
            type: "OTP",
            code: OTP.code,
            email: foundUser.email,
            username: foundUser.username,
        });
    } catch (err) {
        throw new Error("Failed to send OPT email");
    }

    return;
}
