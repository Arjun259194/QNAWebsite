import Link from "next/link";

export default function Home() {
    return (
        <section>
            <Link href={"/auth/login"}>Login page</Link>
        </section>
    );
}
