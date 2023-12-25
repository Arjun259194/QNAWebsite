import prisma from "@/prisma";

function genRandOtpCode() {
    const CODE_LEN = 6;
    const code = Math.floor(100000 + Math.random() * 900000);
    return Number(code.toString().substring(0, CODE_LEN));
}

export async function FindOPT(userID: string) {
    try {
        return (
            (await prisma.otp.findFirst({
                where: { userId: userID },
                orderBy: { id: "desc" },
            })) ||
            (await prisma.otp.create({
                data: { code: genRandOtpCode(), userId: userID },
            }))
        );
    } catch (err) {
        throw new Error("failed to found the otp");
    }
}
