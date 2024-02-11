import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: Date, variant: "small" | "normal" | "large" = "normal") {
    const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: variant === "large" ? "long" : undefined,
        hour: variant === "normal" || variant === "large" ? "numeric" : undefined,
        minute: variant === "normal" || variant === "large" ? "numeric" : undefined,
    } satisfies Intl.DateTimeFormatOptions;

    return new Intl.DateTimeFormat("es-ES", options).format(date);
}
