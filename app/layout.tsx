import localFont from "@next/font/local";

import { Menu } from "components";
import { getCategories } from "services";

import "styles/globals.css";

/*
I'd like to get the font configuration in other function, but
Next.js doesn't allow it. It must be explicitly written literals.
*/
const primaryFont = localFont({
    src: [
        {
            path: "../fonts/Euclid-Circular-A-Light.ttf",
            weight: "300",
            style: "normal",
        },
        {
            path: "../fonts/Euclid-Circular-A-Light-Italic.ttf",
            weight: "300",
            style: "italic",
        },
        {
            path: "../fonts/Euclid-Circular-A-Regular.ttf",
            weight: "400",
            style: "normal",
        },
        {
            path: "../fonts/Euclid-Circular-A-Regular-Italic.ttf",
            weight: "400",
            style: "italic",
        },
        {
            path: "../fonts/Euclid-Circular-A-Medium.ttf",
            weight: "500",
            style: "normal",
        },
        {
            path: "../fonts/Euclid-Circular-A-Medium-Italic.ttf",
            weight: "500",
            style: "italic",
        },
        {
            path: "../fonts/Euclid-Circular-A-SemiBold.ttf",
            weight: "600",
            style: "normal",
        },
        {
            path: "../fonts/Euclid-Circular-A-SemiBold-Italic.ttf",
            weight: "600",
            style: "italic",
        },
        {
            path: "../fonts/Euclid-Circular-A-Bold.ttf",
            weight: "700",
            style: "normal",
        },
        {
            path: "../fonts/Euclid-Circular-A-Bold-Italic.ttf",
            weight: "700",
            style: "italic",
        },
    ],
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const categories = await getCategories();

    return (
        <html lang="es">
            <head />

            <body
                className={`flex min-h-screen flex-col bg-primary-lightest ${primaryFont.className} text-primary md:flex-row`}
            >
                <div className="md:scrollbar px-4 md:order-2 md:max-h-screen md:flex-1 md:px-0 md:[overflow-y:overlay]">
                    <div className="w-full pb-16 md:mx-auto md:w-[85%] md:pb-0">{children}</div>
                </div>

                <Menu categories={categories} />
            </body>
        </html>
    );
}
