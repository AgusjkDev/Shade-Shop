"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SymbolIcon } from "@radix-ui/react-icons";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { signup, login } from "@/lib/auth";
import { signupSchema, loginSchema } from "@/lib/schemas";

interface AuthFormProps {
    variant: "signup" | "login";
}

export default function AuthForm({ variant }: Readonly<AuthFormProps>) {
    const authSchema = variant === "signup" ? signupSchema : loginSchema;
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });
    const router = useRouter();

    async function onSubmit(values: z.infer<typeof authSchema>) {
        setIsLoading(true);

        const { success, error } = await ("confirmPassword" in values
            ? signup(values)
            : login(values));
        if (success) {
            toast({
                description:
                    variant === "signup"
                        ? "Cuenta creada satisfactoriamente."
                        : "Sesión iniciada satisfactoriamente.",
            });

            return router.push("/");
        }

        setIsLoading(false);
        form.reset();
        toast({ description: error, variant: "destructive" });
    }

    const { isDirty, isValid } = form.formState;
    const isDisabled = isLoading || !isDirty || !isValid;

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-y-6"
            >
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Correo electrónico</FormLabel>

                            <FormControl>
                                <Input placeholder="Correo electrónico" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Contraseña</FormLabel>

                            <FormControl>
                                <Input placeholder="Contraseña" type="password" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                {variant === "signup" && (
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirmar contraseña</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder="Confirmar contraseña"
                                        type="password"
                                        {...field}
                                    />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />
                )}

                <Button
                    {...(isLoading && { "aria-label": "Cargando..." })}
                    disabled={isDisabled}
                    type="submit"
                    className="mt-3 w-1/4"
                >
                    {isLoading ? (
                        <SymbolIcon className="animate-spin" />
                    ) : variant === "signup" ? (
                        "Crear cuenta"
                    ) : (
                        "Iniciar sesión"
                    )}
                </Button>
            </form>
        </Form>
    );
}
