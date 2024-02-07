"use client";

import { PersonIcon } from "@radix-ui/react-icons";
import type { User } from "@prisma/client";

import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { logout } from "@/lib/auth";

interface AuthButtonProps {
    user: Omit<User, "password">;
}

export default function AuthButton({ user }: Readonly<AuthButtonProps>) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                    <PersonIcon className="h-5 w-5" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.email}</DropdownMenuLabel>

                <DropdownMenuSeparator />

                <DropdownMenuItem asChild>
                    <button
                        className="w-full hover:cursor-pointer"
                        onClick={async () => await logout()}
                    >
                        Cerrar sesión
                    </button>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
