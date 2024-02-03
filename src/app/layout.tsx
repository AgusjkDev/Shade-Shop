import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Shade Shop",
    description: "Shade Shop",
};

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
    return (
        <html lang="es">
            <body className={GeistSans.className}>{children}</body>
        </html>
    );
}
