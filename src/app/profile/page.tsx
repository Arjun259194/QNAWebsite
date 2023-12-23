import { cookies } from "next/headers";
import { redirect } from "next/navigation";
export default function () {
    const cookie = cookies().get("auth");
    if (!cookie) redirect("/auth/login");
    return (
        <>
            <h1>You are at the profile page</h1>
        </>
    );
}
