"use client";

import Link from "next/link";
import type { User } from "@prisma/client";

import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components";
import MobileMenu from "./mobile-menu";
import Navbar from "./navbar";
import AuthButton from "./auth-button";

interface HeaderProps {
    user?: Omit<User, "password">;
}

export default function Header({ user }: Readonly<HeaderProps>) {
    return (
        <header className="flex items-center justify-between gap-x-5 border-b px-5 py-2.5 lg:px-10">
            <div className="md:hidden">
                <MobileMenu />
            </div>

            <Link aria-label="Ir al inicio" href="/" className="group flex-shrink-0">
                <Logo
                    priority
                    className="md:transition-transform md:group-hover:-translate-y-0.5"
                />
            </Link>

            <div className="hidden md:block">
                <Navbar />
            </div>

            {user ? (
                <AuthButton user={user} />
            ) : (
                <Link href="/login" className={buttonVariants({ variant: "outline" })}>
                    Iniciar sesión
                </Link>
            )}
        </header>
    );
}
