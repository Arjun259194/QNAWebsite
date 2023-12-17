import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            backgroundImage: {
                "image-1": "url('/images/1.jpg')",
                "image-2": "url('/images/2.jpg')",
            },
            colors: {
                "sun-yellow": "#ffd64a",
            },
        },
    },
    plugins: [],
};
export default config;
