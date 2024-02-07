"use client";

import Link from "next/link";
import type { User } from "@prisma/client";

import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components";
import { cn } from "@/lib/utils";
import MobileMenu from "./mobile-menu";
import Navbar from "./navbar";
import AuthButton from "./auth-button";

interface HeaderProps {
    user?: Omit<User, "password">;
}

export default function Header({ user }: Readonly<HeaderProps>) {
    return (
        <header className="grid grid-cols-3 items-center gap-x-5 border-b p-2.5 md:grid-cols-[1fr,5fr,1fr] lg:px-10">
            <div className="md:hidden">
                <MobileMenu />
            </div>

            <Link
                aria-label="Ir al inicio"
                href="/"
                className="group justify-self-center md:justify-self-start"
            >
                <Logo
                    priority
                    className="md:transition-transform md:group-hover:-translate-y-0.5"
                />
            </Link>

            <div className="hidden md:block md:justify-self-center">
                <Navbar />
            </div>

            <div className="justify-self-end">
                {user ? (
                    <AuthButton user={user} />
                ) : (
                    <Link
                        href="/login"
                        className={cn(
                            "max-w-full truncate",
                            buttonVariants({ variant: "outline" }),
                        )}
                    >
                        Iniciar sesión
                    </Link>
                )}
            </div>
        </header>
    );
}
