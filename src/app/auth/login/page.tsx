import action from "@/action/loginFormAction";
import LoginForm from "@/components/Auth/LoginForm";
import AuthLayout from "@/components/layout/AuthLayout";
import Link from "next/link";
import animationData from "../../../assets/Animation-1.json";

export default async function () {
    return (
        <AuthLayout animationData={animationData}>
            <h1 className="text-2xl text-gray-800 font-bold text-center">
                Join the Knowledge Exchange Hub!
            </h1>
            <p className="text-sm text-center text-gray-500">
                Register to Participate and Share Your Expertise within Our Collage
                Community
            </p>
            <LoginForm action={action} />
            <p className="font-semibold text-gray-500">
                New on the platform?{" "}
                <Link className="text-blue-600 underline" href="/auth/register">
                    Register
                </Link>
            </p>
        </AuthLayout>
    );
}
