"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { createCategorySchema, updateCategorySchema, deleteCategorySchema } from "@/lib/schemas";
import db from "@/lib/db";

type Response = { success: true; error?: undefined } | { success: false; error: string };

export async function createCategory(
    values: z.infer<typeof createCategorySchema>,
): Promise<Response> {
    try {
        const parsed = await createCategorySchema.safeParseAsync(values);
        if (!parsed.success) {
            return { success: false, error: "¡Los campos son inválidos!" };
        }

        const { name } = parsed.data;

        const existingCategory = await db.category.findUnique({ where: { name } });
        if (existingCategory) {
            return { success: false, error: "¡Ya existe una categoría con ese nombre!" };
        }

        await db.category.create({ data: { name } });

        revalidatePath("/admin/categorias");

        return { success: true };
    } catch (_) {
        return { success: false, error: "¡Ha ocurrido un error inesperado!" };
    }
}

export async function updateCategory(
    values: z.infer<typeof updateCategorySchema>,
): Promise<Response> {
    try {
        const parsed = await updateCategorySchema.safeParseAsync(values);
        if (!parsed.success) {
            return { success: false, error: "¡Los campos son inválidos!" };
        }

        const { id, name } = parsed.data;

        await db.category.update({ data: { name }, where: { id } });

        revalidatePath("/admin/categorias");

        return { success: true };
    } catch (_) {
        return { success: false, error: "¡Ha ocurrido un error inesperado!" };
    }
}

export async function deleteCategory(
    values: z.infer<typeof deleteCategorySchema>,
): Promise<Response> {
    try {
        const parsed = await deleteCategorySchema.safeParseAsync(values);
        if (!parsed.success) {
            return { success: false, error: "¡Los campos son inválidos!" };
        }

        const { id } = parsed.data;

        await db.category.delete({ where: { id } });

        revalidatePath("/admin/categorias");

        return { success: true };
    } catch (_) {
        return { success: false, error: "¡Ha ocurrido un error inesperado!" };
    }
}
