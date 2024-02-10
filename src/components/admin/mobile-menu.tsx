"use client";

import { ChevronUpIcon } from "@radix-ui/react-icons";

import { Skeleton } from "@/components/ui/skeleton";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useMounted, useMobileMenu } from "@/hooks";
import Navbar from "./navbar";

interface MobileMenuProps {}

export default function MobileMenu(props: Readonly<MobileMenuProps>) {
    const mounted = useMounted();
    const { open, onOpenChange, close } = useMobileMenu();

    if (!mounted) {
        return <Skeleton className="aspect-square w-9" />;
    }

    return (
        <Sheet open={open} onOpenChange={onOpenChange}>
            <SheetTrigger>
                <Button variant="outline" size="icon">
                    <ChevronUpIcon className="h-4 w-4" />
                </Button>
            </SheetTrigger>

            <SheetContent className="scrollbar h-full overflow-y-auto" side="bottom">
                <Navbar />
            </SheetContent>
        </Sheet>
    );
}
