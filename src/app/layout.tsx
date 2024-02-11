import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";

import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider, ThemeButton, Header } from "@/components";
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
        <html lang="es" suppressHydrationWarning>
            <body
                className={cn(
                    "scrollbar flex min-h-dvh flex-col bg-background font-sans text-foreground antialiased",
                    GeistSans.variable,
                )}
            >
                <ThemeProvider>
                    <Header user={session?.user} />

                    {children}

                    <div className="fixed bottom-4 right-4">
                        <ThemeButton />
                    </div>

                    <Toaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
