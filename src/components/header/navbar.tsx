import Link, { type LinkProps } from "next/link";

import { cn } from "@/lib/utils";

const NAVBAR_ITEMS: ({ key: string } & React.ComponentPropsWithoutRef<"a"> & LinkProps)[] = [
    {
        key: "home",
        href: "/",
        children: "Inicio",
    },
    {
        key: "shop",
        href: "#",
        children: "Shop",
    },
    {
        key: "outlet",
        href: "#",
        children: "Outlet",
    },
    {
        key: "limited-edition",
        href: "#",
        children: "Edición Limitada",
    },
    {
        key: "stores",
        href: "#",
        children: "Tiendas",
    },
    {
        key: "help",
        href: "#",
        children: "Ayuda",
    },
];

interface NavbarProps {
    orientation?: "horizontal" | "vertical";
    onItemClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function Navbar({ orientation, onItemClick }: Readonly<NavbarProps>) {
    return (
        <nav
            className={cn(
                "flex flex-col gap-8 space-x-0 md:flex-row",
                orientation && (orientation === "horizontal" ? "flex-row" : "md:flex-col"),
            )}
        >
            {NAVBAR_ITEMS.map(({ key, className, onClick, ...props }) => (
                <Link
                    key={key}
                    className={cn(
                        "text-center text-sm font-light uppercase tracking-wider text-foreground/80 transition-colors hover:text-foreground",
                        className,
                    )}
                    onClick={e => {
                        if (onClick) onClick(e);
                        if (onItemClick) onItemClick(e);
                    }}
                    {...props}
                />
            ))}
        </nav>
    );
}
