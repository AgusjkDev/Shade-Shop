"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import {
    createCategorySchema,
    updateCategorySchema,
    deleteCategorySchema,
    createProductSchema,
    updateProductSchema,
} from "@/lib/schemas";
import db from "@/lib/db";
import { uploadImage, removeImage } from "@/lib/storage";

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

export async function createProduct(formData: FormData): Promise<Response> {
    try {
        const parsed = await createProductSchema.safeParseAsync({
            ...Object.fromEntries(formData.entries()),
            images: formData.getAll("images"),
        });
        if (!parsed.success) {
            return { success: false, error: "¡Los campos son inválidos!" };
        }

        const { images, ...data } = parsed.data;

        const existingProduct = await db.product.findUnique({ where: { name: data.name } });
        if (existingProduct) {
            return { success: false, error: "¡Ya existe un producto con ese nombre!" };
        }

        const uploadedImages: string[] = [];

        if (images) {
            let failedUploads = false;

            (await Promise.allSettled(images.map(uploadImage))).forEach(promise => {
                if (promise.status === "rejected" || !promise.value) {
                    failedUploads = true;
                } else {
                    uploadedImages.push(promise.value);
                }
            });

            if (failedUploads) {
                uploadedImages.forEach(removeImage);

                return { success: false, error: "¡Ha ocurrido un error al subir las imágenes!" };
            }
        }

        await db.product.create({ data: { ...data, images: uploadedImages } });

        revalidatePath("/admin/productos");

        return { success: true };
    } catch (_) {
        return { success: false, error: "¡Ha ocurrido un error inesperado!" };
    }
}

export async function updateProduct(formData: FormData): Promise<Response> {
    return { success: false, error: "¡No implementado!" };
}
