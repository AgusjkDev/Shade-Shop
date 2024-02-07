import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { Header } from "@/components";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Shade Shop",
    description: "Shade Shop",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="es">
            <body
                className={cn(
                    "flex h-dvh flex-col bg-background font-sans text-foreground antialiased",
                    GeistSans.variable,
                )}
            >
                <Header />

                {children}
            </body>
        </html>
    );
}
