"use client";

import { ChevronUpIcon } from "@radix-ui/react-icons";

import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useMobileMenu } from "@/hooks";
import Navbar from "./navbar";

interface MobileMenuProps {}

export default function MobileMenu(props: Readonly<MobileMenuProps>) {
    const { open, onOpenChange, close } = useMobileMenu();

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                    <ChevronUpIcon className="h-4 w-4" />
                </Button>
            </SheetTrigger>

            <SheetContent className="scrollbar h-full overflow-y-auto" side="bottom">
                <Navbar onItemClick={close} />
            </SheetContent>
        </Sheet>
    );
}
