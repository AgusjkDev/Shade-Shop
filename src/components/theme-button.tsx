"use client";

import { useTheme } from "next-themes";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks";

interface ThemeButtonProps {}

export default function ThemeButton(props: Readonly<ThemeButtonProps>) {
    const { theme, setTheme } = useTheme();
    const mounted = useMounted();

    if (!mounted) {
        return <Skeleton className="aspect-square w-9" />;
    }

    const toggle = () => setTheme(theme === "light" ? "dark" : "light");

    return (
        <Button variant="outline" size="icon" onClick={toggle}>
            {theme === "light" ? <MoonIcon /> : <SunIcon />}
        </Button>
    );
}
