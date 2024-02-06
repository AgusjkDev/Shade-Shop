import Image, { type ImageProps } from "next/image";

import { cn } from "@/lib/utils";

interface LogoProps extends Omit<ImageProps, "alt" | "src" | "width" | "height"> {}

export default function Logo({ className, ...props }: Readonly<LogoProps>) {
    return (
        <Image
            alt="Logo de Shade Shop"
            src="/logo.svg"
            className={cn("w-24", className)}
            width={440}
            height={215}
            quality={100}
            {...props}
        />
    );
}
