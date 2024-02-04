import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { cn } from "@/lib/utils";

import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Shade Shop",
    description: "Shade Shop",
};

export default function RootLayout({ children }: Readonly<React.PropsWithChildren>) {
    return (
        <html lang="es">
            <body
                className={cn(
                    "bg-background font-sans text-foreground antialiased",
                    GeistSans.variable,
                )}
            >
                {children}
            </body>
        </html>
    );
}
