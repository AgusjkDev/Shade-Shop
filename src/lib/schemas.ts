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
