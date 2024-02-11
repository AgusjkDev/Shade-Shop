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
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createCategorySchema, updateCategorySchema, deleteCategorySchema } from "@/lib/schemas";
import { createCategory, updateCategory, deleteCategory } from "./actions";

interface CategoriesFormProps {
    categories: Category[];
    variant: "create" | "update" | "delete";
}

export default function CategoriesForm({ categories, variant }: Readonly<CategoriesFormProps>) {
    const categorySchema =
        variant === "create"
            ? createCategorySchema
            : variant === "update"
              ? updateCategorySchema
              : deleteCategorySchema;
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const form = useForm<z.infer<typeof categorySchema>>({
        resolver: zodResolver(categorySchema),
        defaultValues: {
            id: "",
            name: "",
        },
    });

    async function onSubmit(values: z.infer<typeof categorySchema>) {
        setIsLoading(true);

        const { success, error } = await ("id" in values && "name" in values
            ? updateCategory(values as z.infer<typeof updateCategorySchema>)
            : "id" in values
              ? deleteCategory(values)
              : createCategory(values));

        setIsLoading(false);
        form.reset();
        toast({
            description: error
                ? error
                : `Categoría ${variant === "create" ? "creada" : variant === "update" ? "editada" : "eliminada"} satisfactoriamente.`,
            variant: success ? "default" : "destructive",
        });
    }

    const currentCategory = categories.find(({ id }) => id === form.watch("id"));

    return (
        <Form {...form}>
            <form
                autoComplete="off"
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-y-6"
            >
                {variant !== "create" && (
                    <FormField
                        control={form.control}
                        name="id"
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
                                            <SelectValue
                                                placeholder={`Selecciona una categoría para ${variant === "update" ? "editar" : "eliminar"}`}
                                            />
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
                )}

                {(variant === "create" || (variant === "update" && currentCategory)) && (
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nombre</FormLabel>

                                <FormControl>
                                    <Input
                                        placeholder={
                                            currentCategory ? currentCategory.name : "Nombre"
                                        }
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
                    type="submit"
                    className="mt-3 w-[150px]"
                    variant={variant === "delete" ? "destructive" : "default"}
                >
                    {isLoading ? (
                        <SymbolIcon className="animate-spin" />
                    ) : (
                        `${variant === "create" ? "Crear" : variant === "update" ? "Editar" : "Eliminar"} categoría`
                    )}
                </Button>
            </form>
        </Form>
    );
}
