"use client";
import { FormAction } from "@/types";
import { FC } from "react";
import { toast } from "react-hot-toast";
import Button from "../Button";
import InputText from "../TextInput";

const LoginForm: FC<{ action: FormAction }> = ({ action }) => {
    const updatedAction = action.bind("something in the way");
    return (
        <form
            action={async formData => {
                let isRedirect = false;
                try {
                    await updatedAction(formData);
                    toast.success("Mail sent");
                    isRedirect = true;
                } catch (error) {
                    toast.error(`${error}`);
                    isRedirect = false;
                }
                isRedirect ? toast.success("check your email") : null;
            }}
            className=" w-full md:w-4/5 space-y-2 md:space-y-4">
            <InputText text="Email" type="email" name="email" />
            <InputText text="Password" type="password" name="password" />
            <input type="hidden" name="origin" value={window.location.origin} />
            <Button type="submit" className="w-full" variant="primary">
                Login
            </Button>
        </form>
    );
};

export default LoginForm;
