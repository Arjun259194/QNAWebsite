"use server";

import prisma from "@/prisma";
import { hashPassword } from "@/utils/hash";
import z from "zod";

const RegisterReqBody = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string(),
    bio: z.string(),
});

export default async function (formData: FormData) {
    const parsedObj = RegisterReqBody.safeParse({
        email: formData.get("email"),
        username: formData.get("username"),
        bio: formData.get("bio"),
        password: formData.get("password"),
    });

    if (!parsedObj.success) throw new Error(parsedObj.error.message);

    const data = parsedObj.data;

    const foundUser = await prisma.user.findFirst({
        where: { email: data.email },
    });

    if (foundUser) throw new Error("Email already existing");

    const dbRes = await prisma.user.create({
        data: {
            ...data,
            password: await hashPassword(data.password),
        },
    });

    if (!dbRes) throw new Error("Failed to register user");

    return;
}
