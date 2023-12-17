import RegisterForm from "@/components/Auth/RegisterForm";
import AuthLayout from "@/components/layout/AuthLayout";
import Link from "next/link";
import action from "../../../action/registerFormAction";
import animationData from "../../../assets/Animation-2.json";

export default function () {
    return (
        <AuthLayout animationData={animationData}>
            <h1 className="text-2xl text-gray-800 font-bold text-center">
                Join the Knowledge Exchange Hub!
            </h1>
            <p className="text-sm text-center text-gray-500">
                Register to Participate and Share Your Expertise within Our Collage
                Community
            </p>
            <RegisterForm action={action} />
            <p className="font-semibold text-gray-500">
                Already have an account?{" "}
                <Link className="text-blue-600 underline" href="/auth/login">
                    Login
                </Link>
            </p>
        </AuthLayout>
    );
}
