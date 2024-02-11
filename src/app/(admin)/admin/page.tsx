import Link from "next/link";
import { ResetIcon } from "@radix-ui/react-icons";

import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components";
import { cn } from "@/lib/utils";

export default function Admin() {
    return (
        <div className="flex h-full flex-col items-center justify-center gap-y-12">
            <Link aria-label="Ir al inicio" href="/" className="group rounded-md">
                <Logo className="w-72 md:transition-transform md:group-hover:-translate-y-1 md:group-focus-visible:-translate-y-1" />
            </Link>

            <Link
                href="/"
                className={cn(buttonVariants({ size: "lg" }), "flex justify-start gap-x-2.5")}
            >
                <ResetIcon />
                Volver al inicio
            </Link>
        </div>
    );
}
