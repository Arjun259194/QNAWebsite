import OTPForm from "@/components/Auth/OTPForm";
import AuthLayout from "@/components/layout/AuthLayout";
import animationData from "../../../assets/Animation-1.json";

export default async function () {
    return (
        <AuthLayout animationData={animationData}>
            <h1 className="text-2xl text-gray-800 font-bold text-center">
                Verify your email address
            </h1>
            <p className="text-sm text-center text-gray-500">
                We have send an OTP email to your email address.
                <br /> verify you email by entering the OTP code below
            </p>
            <OTPForm />
        </AuthLayout>
    );
}
