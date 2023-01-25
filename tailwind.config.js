const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{tsx,ts}"],
    theme: {
        extend: {
            fontFamily: {
                primary: ["var(--font-primary)", ...fontFamily.serif],
            },
            colors: {
                primary: {
                    lightest: colors.gray[100],
                    DEFAULT: colors.gray[600],
                },
                secondary: {
                    DEFAULT: colors.indigo[600],
                    dark: colors.indigo[700],
                },
            },
        },
    },
    plugins: [],
};
