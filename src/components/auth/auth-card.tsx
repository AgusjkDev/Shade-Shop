"use client";

import Link, { type LinkProps } from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";

import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import AuthForm from "./auth-form";

type CardData = {
    title: string;
    description: string;
    footer: {
        text: string;
        anchor?: React.ComponentPropsWithoutRef<"a"> & LinkProps;
    };
};
const CARDS_DATA: {
    signup: CardData;
    login: CardData;
} = {
    signup: {
        title: "Creación de cuenta",
        description: "Crea una cuenta para empezar a comprar.",
        footer: {
            text: "¿Ya tienes una cuenta?",
            anchor: {
                href: "/login",
                children: "Iniciar sesión",
            },
        },
    },
    login: {
        title: "Inicio de sesión",
        description: "Inicia sesión para acceder a tu cuenta.",
        footer: {
            text: "¿No tienes una cuenta?",
            anchor: {
                href: "/signup",
                children: "Registrarse",
            },
        },
    },
};

interface AuthCardProps {}

export default function AuthCard(props: Readonly<AuthCardProps>) {
    const segment = useSelectedLayoutSegment() as "signup" | "login";

    const { title, description, footer } = CARDS_DATA[segment];

    return (
        <Card className="w-[92.5%] sm:w-4/5 md:w-full md:max-w-xl lg:max-w-2xl 2xl:max-w-3xl">
            <CardHeader>
                <CardTitle>{title}</CardTitle>

                <CardDescription>{description}</CardDescription>
            </CardHeader>

            <CardContent>
                <AuthForm variant={segment} />
            </CardContent>

            <CardFooter>
                <span className="flex gap-x-1 text-xs text-foreground/80">
                    {footer.text}
                    {footer.anchor && (
                        <Link
                            {...footer.anchor}
                            className={cn(
                                "underline transition-colors hover:text-foreground",
                                footer.anchor.className,
                            )}
                        />
                    )}
                </span>
            </CardFooter>
        </Card>
    );
}
