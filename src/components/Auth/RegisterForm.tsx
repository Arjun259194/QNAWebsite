"use client";
import { RedirectType, redirect } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";
import Button from "../Button";
import InputText from "../TextInput";

const RegisterForm: FC<{ action: (arg1: FormData) => Promise<void> }> = ({ action }) => {
    const [showPassword, setShowPassword] = useState(false);
    return (
        <form
            action={async (formData: FormData) => {
                let isRedirect = false;
                try {
                    await action(formData);
                    toast.success("User registered");
                    isRedirect = true;
                } catch (error) {
                    toast.error(`${error}`);
                    isRedirect = false;
                }

                isRedirect ? redirect("/auth/login", RedirectType.push) : null;
            }}
            className=" w-full md:w-4/5 space-y-2 md:space-y-4">
            <InputText name="username" text="Username" type="text" required />
            <InputText name="email" text="Email" type="email" required />
            <div className="relative flex flex-col">
                <label
                    className="text-gray-500 font-semibold capitalize text-lg"
                    htmlFor="bio">
                    Bio{" "}
                    <span className="text-sm font-normal">(can be changes later)</span>
                </label>
                <textarea
                    spellCheck
                    className="shadow-md border border-gray-400 text-base px-2 py-1 rounded-md outline-none"
                    required
                    name="bio"
                    id="bio"></textarea>
            </div>
            <InputText
                name="password"
                text="Password"
                type={!showPassword ? "password" : "text"}
                required>
                <button
                    className="capitalize w-min gap-1 mx-1 text-blue-600"
                    onClick={() => setShowPassword(!showPassword)}
                    type="button">
                    {!showPassword ? "show" : "hide"}
                </button>
            </InputText>
            <Button className="w-full" variant="primary" type="submit">
                Continue
            </Button>
        </form>
    );
};

export default RegisterForm;
