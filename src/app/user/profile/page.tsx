import prisma from "@/prisma";
import { validToken } from "@/utils/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function () {
    const token = cookies().get("auth")?.value!;
    const id = validToken(token);

    const user = await prisma.user.findFirst({ where: { id: id as string } });
    if (!user) redirect("/message?message=something+went+wrong&state=err");
    return (
        <>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className="p-8 bg-white rounded shadow-md w-80">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800">
                        {user.username}
                    </h2>
                    <p className="text-gray-500">{user.email}</p>
                    <p className="mt-4 text-gray-600">{user.bio}</p>
                </div>
            </div>
        </>
    );
}
