const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{tsx,ts}"],
    theme: {
        extend: {
            fontFamily: {
                primary: ["var(--font-primary)", ...fontFamily.serif],
            },
        },
    },
    plugins: [],
};
