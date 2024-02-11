"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";
import type { ThemeProviderProps as NextThemeProviderProps } from "next-themes/dist/types";

interface ThemeProviderProps extends NextThemeProviderProps {
    children: React.ReactNode;
}

export default function ThemeProvider(props: Readonly<ThemeProviderProps>) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
            {...props}
        />
    );
}
