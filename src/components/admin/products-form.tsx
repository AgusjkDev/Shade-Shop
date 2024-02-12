"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SymbolIcon } from "@radix-ui/react-icons";
import type { Category } from "@prisma/client";

import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { FileInput } from "@/components";
import { createProductSchema, updateProductSchema } from "@/lib/schemas";
import { createProduct, updateProduct } from "./actions";

interface ProductsFormProps {
    categories: Category[];
    variant: "create" | "update";
    onSuccess: () => void;
}

export default function ProductsForm({
    categories,
    variant,
    onSuccess,
}: Readonly<ProductsFormProps>) {
    const productSchema = variant === "create" ? createProductSchema : updateProductSchema;
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const form = useForm<z.infer<typeof productSchema>>({
        resolver: zodResolver(productSchema),
        defaultValues: {
            name: "",
            description: "",
            price: 0.0,
            categoryId: "",
        },
    });

    async function onSubmit(values: z.infer<typeof productSchema>) {
        setIsLoading(true);

        const formData = new FormData();
        for (const [key, value] of Object.entries(values)) {
            if (typeof value === "string") {
                formData.append(key, value);
                continue;
            }

            if (typeof value === "number") {
                formData.append(key, value.toString());
                continue;
            }

            value.forEach(image => formData.append("images", image, image.name));
        }

        const { success, error } = await (variant === "create"
            ? createProduct(formData)
            : updateProduct(formData));

        setIsLoading(false);
        form.reset();
        onSuccess();
        toast({
            description: error
                ? error
                : `Producto ${variant === "create" ? "creado" : "editado"} satisfactoriamente.`,
            variant: success ? "default" : "destructive",
        });
    }

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-y-6"
            >
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Nombre</FormLabel>

                            <FormControl>
                                <Input placeholder="Nombre" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Descripción</FormLabel>

                            <FormControl>
                                <Textarea
                                    placeholder="Descripción"
                                    className="scrollbar min-h-28 resize-y"
                                    {...field}
                                />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Precio</FormLabel>

                            <FormControl>
                                <Input placeholder="Precio" type="number" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="images"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Imágenes</FormLabel>

                            <FormControl>
                                <FileInput accept=".avif, .jpg, .jpeg, .png, .webp" {...field} />
                            </FormControl>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="categoryId"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Categoría</FormLabel>

                            <Select
                                disabled={categories.length === 0}
                                onValueChange={field.onChange}
                                value={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Selecciona la categoría del producto" />
                                    </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                    {categories.map(({ id, name }) => (
                                        <SelectItem key={id} value={id}>
                                            {name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>

                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button
                    {...(isLoading && { "aria-label": "Cargando..." })}
                    type="submit"
                    className="mt-3 w-[150px]"
                >
                    {isLoading ? (
                        <SymbolIcon className="animate-spin" />
                    ) : (
                        `${variant === "create" ? "Crear" : "Editar"} producto`
                    )}
                </Button>
            </form>
        </Form>
    );
}
