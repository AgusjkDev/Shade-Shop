import type { Metadata } from "next";

import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Shade Shop",
    description: "Shade Shop",
};

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
    return (
        <html lang="es">
            <body>{children}</body>
        </html>
    );
}
