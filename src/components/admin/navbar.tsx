"use client";

import Link, { type LinkProps } from "next/link";
import { DashboardIcon, CubeIcon, ArchiveIcon } from "@radix-ui/react-icons";
import type { IconProps } from "@radix-ui/react-icons/dist/types";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NAVBAR_ITEMS: ({
    key: string;
    icon: React.ForwardRefExoticComponent<IconProps & React.RefAttributes<SVGSVGElement>>;
} & React.ComponentPropsWithoutRef<"a"> &
    LinkProps)[] = [
    {
        key: "categories",
        children: "Categorías",
        href: "/categorias",
        icon: DashboardIcon,
    },
    {
        key: "products",
        children: "Productos",
        href: "/productos",
        icon: CubeIcon,
    },
    {
        key: "stock",
        children: "Stock",
        href: "/stock",
        icon: ArchiveIcon,
    },
];

interface NavbarProps {
    onItemClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export default function Navbar({ onItemClick }: Readonly<NavbarProps>) {
    return (
        <div className="p-5">
            <nav className="flex h-full flex-col items-start gap-y-3">
                {NAVBAR_ITEMS.map(
                    ({ key, className, children, href, onClick, icon: Icon, ...props }) => (
                        <Link
                            key={key}
                            href={`/admin${href}`}
                            className={cn(
                                buttonVariants({ variant: "ghost" }),
                                "flex w-full justify-start gap-x-2.5",
                                className,
                            )}
                            onClick={e => {
                                if (onClick) onClick(e);
                                if (onItemClick) onItemClick(e);
                            }}
                            {...props}
                        >
                            <Icon />

                            {children}
                        </Link>
                    ),
                )}
            </nav>
        </div>
    );
}
