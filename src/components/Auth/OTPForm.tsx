"use client";
import { FC } from "react";
import Button from "../Button";

const OTPForm: FC = () => {
    return (
        <form className="w-full">
            <div className="flex items-center flex-col gap-2">
                <label className="text-xl capitalize font-semibold " htmlFor="otp">
                    Enter OTP
                </label>
                <input
                    required
                    className="w-10/12 text-center text-lg focus:border-blue-200 focus:shadow-blue-200 shadow-lg outline-none p-2 border-2 border-gray-300 rounded-md"
                    type="text"
                    name="code"
                    id="code"
                />
                <Button type="submit" className="w-full" variant="primary">
                    Verify
                </Button>
            </div>
        </form>
    );
};

export default OTPForm;
