import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email({ message: "¡El correo electrónico tiene un formato inválido!" }),
    password: z
        .string()
        .min(8, { message: "¡La contraseña debe contener por lo menos 8 caracteres!" })
        .max(128, { message: "¡La contraseña es demasiado extensa!" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-#!$@%^&*()_+|~=`{}\[\]:";'<>?,.\/ ])/, {
            message:
                "¡La contraseña debe contener por lo menos una minúscula, una mayúscula, un número y un símbolo!",
        }),
});

export const signupSchema = loginSchema
    .extend({
        confirmPassword: z.string().refine(Boolean, { message: "¡Este campo es obligatorio!" }),
    })
    .refine(({ password, confirmPassword }) => password === confirmPassword, {
        path: ["confirmPassword"],
        message: "¡Las contraseñas no coinciden!",
    });

export const createCategorySchema = z.object({
    name: z
        .string()
        .min(3, { message: "¡El nombre de la categoría debe contener por lo menos 3 caracteres!" })
        .max(32, { message: "¡El nombre de la categoría es demasiado extenso!" }),
});

export const deleteCategorySchema = z.object({
    id: z.string().refine(Boolean, { message: "Debes seleccionar una categoría para continuar." }),
});

export const updateCategorySchema = z.object({
    ...createCategorySchema.shape,
    ...deleteCategorySchema.shape,
});

export const createProductSchema = z.object({
    name: z
        .string()
        .min(8, { message: "¡El nombre del producto debe contener por lo menos 8 caracteres!" })
        .max(64, { message: "¡El nombre del producto es demasiado extenso!" }),
    description: z
        .string()
        .min(16, {
            message: "¡La descripción del producto debe contener por lo menos 16 caracteres!",
        })
        .max(512, { message: "¡La descripción del producto es demasiado extensa!" }),
    price: z
        .number()
        .or(z.string())
        .pipe(z.coerce.number().transform(value => parseFloat(value.toString())))
        .refine(value => value > 0, { message: "¡El precio del producto debe ser mayor a 0!" }),
    images: z
        .array(
            z.custom<File>(value => value instanceof File, {
                message: "¡Solo se aceptan archivos!",
            }),
        )
        .refine(files => files.length <= 5, {
            message: "¡Solo se admiten hasta 5 imágenes por producto!",
        })
        .refine(
            files =>
                files.every(({ type }) =>
                    ["image/avif", "image/jpg", "image/jpeg", "image/png", "image/webp"].includes(
                        type,
                    ),
                ),
            { message: "¡Solo se admiten imágenes con formato .avif, .jpg, .jpeg, .png y .webp!" },
        )
        .refine(
            files =>
                files.every(
                    ({ size }) =>
                        size <=
                        Number(process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE_MB ?? 3) * 1024 * 1024,
                ),
            {
                message: `¡Cada imagen del producto no debe superar los ${Number(process.env.NEXT_PUBLIC_MAX_IMAGE_SIZE_MB ?? 3)}MB!`,
            },
        )
        .optional(),
    categoryId: z
        .string()
        .refine(Boolean, { message: "¡La categoría del producto es obligatoria!" }),
});

export const deleteProductSchema = z.object({
    id: z.string().refine(Boolean, { message: "Debes seleccionar una producto para continuar." }),
});

export const updateProductSchema = z.object({
    ...createProductSchema.shape,
    ...deleteProductSchema.shape,
});
