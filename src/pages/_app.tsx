import type { AppProps } from "next/app";
import Head from "next/head";
import localFont from "@next/font/local";

import AppProvider from "context/AppProvider";

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

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Shade Shop</title>
            </Head>

            <style jsx global>
                {`
                    :root {
                        --font-primary: ${primaryFont.style.fontFamily};
                    }
                `}
            </style>

            <AppProvider>
                <Component {...pageProps} />
            </AppProvider>
        </>
    );
}
