"use client";
import Lottie from "lottie-react";
import { FC, ReactNode } from "react";

type Props = {
    children: ReactNode;
    animationData: any;
};

const AuthLayout: FC<Props> = ({ children, animationData }) => {
    return (
        <main className="w-screen h-screen grid grid-cols-2">
            <section className="bg-image-1 bg-cover bg-no-repeat bg-right flex items-center justify-center col-span-2 md:col-span-1">
                <div className="bg-white py-10 border border-gray-200 rounded-xl space-y-2 shadow-lg px-10 md:p-5 mx-5 flex flex-col items-center">
                    {children}
                </div>
            </section>
            <section className="hidden md:flex relative bg-gradient-to-r from-sun-yellow to-white bg-cover bg-center bg-no-repeat">
                <Lottie animationData={animationData} />
            </section>
        </main>
    );
};

export default AuthLayout;
