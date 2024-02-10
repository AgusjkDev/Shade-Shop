import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components";
import { getSession } from "@/lib/auth";
import { cn } from "@/lib/utils";

import "@/styles/globals.css";

export const metadata: Metadata = {
    title: "Shade Shop",
    description: "Shade Shop",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    const session = await getSession();

    return (
        <html lang="es">
            <body
                className={cn(
                    "scrollbar flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased",
                    GeistSans.variable,
                )}
            >
                <Header user={session?.user} />

                {children}

                <Toaster />
            </body>
        </html>
    );
}
