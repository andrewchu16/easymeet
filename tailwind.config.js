/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        fontFamily: {
            sans: ["Albert Sans", "Calibri", "Arial", "sans-serif"],
        },
        extend: {
            colors: {
                dark: "#404040",
                light: "#ffffff",
                body: "#6A6A6A",
                lightgray: "#EFEFEF",
                primary: "#6BCB96",
                secondary: "#95d5b2",
                tertiary: "#6bcb96",
            },
        },
    },
    plugins: [],
};
