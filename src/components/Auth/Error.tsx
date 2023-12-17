import { FC, ReactNode } from "react";

const ErrorMsg: FC<{ children: ReactNode }> = ({ children }) => (
    <p className="p-1 text-center capitalize rounded-md shadow-lg bg-red-100 text-red-800">
        {children}
    </p>
);

export default ErrorMsg;
