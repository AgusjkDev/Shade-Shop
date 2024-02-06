"use client";

import * as React from "react";
import Link from "next/link";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";

import { Sheet, SheetTrigger, SheetContent, SheetHeader } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components";
import { useMobileMenu } from "@/hooks";
import Navbar from "./navbar";

interface MobileMenuProps {}

export default function MobileMenu(props: Readonly<MobileMenuProps>) {
    const { open, onOpenChange, close } = useMobileMenu();

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <HamburgerMenuIcon className="h-5 w-5" />
                </Button>
            </SheetTrigger>

            <SheetContent
                side="left"
                className="flex w-full flex-col items-center justify-evenly sm:max-w-none"
            >
                <SheetHeader>
                    <Link aria-label="Ir al inicio" href="/" onClick={close}>
                        <Logo className="w-36" />
                    </Link>
                </SheetHeader>

                <Navbar orientation="vertical" onItemClick={close} />
            </SheetContent>
        </Sheet>
    );
}
