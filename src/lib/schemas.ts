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
    id: z.string(),
});

export const updateCategorySchema = z.object({
    ...createCategorySchema.shape,
    ...deleteCategorySchema.shape,
});
