"use server";

import { cookies } from "next/headers";
import { z } from "zod";
import bcrypt from "bcrypt";

import { signupSchema, loginSchema } from "@/lib/schemas";
import db from "@/lib/db";
import { sign, EXPIRATION } from "@/lib/jwt";

type AuthResponse = { success: true; error?: undefined } | { success: false; error: string };

export async function signup(values: z.infer<typeof signupSchema>): Promise<AuthResponse> {
    try {
        const parsed = await signupSchema.safeParseAsync(values);
        if (!parsed.success) {
            return { success: false, error: "¡Los campos son inválidos!" };
        }

        const { email, password } = parsed.data;

        const existingUser = await db.user.findUnique({ where: { email } });
        if (existingUser) {
            return { success: false, error: "¡El correo electrónico se encuentra en uso!" };
        }

        const user = await db.user.create({
            data: { email, password: await bcrypt.hash(password, 10) },
        });
        const { password: _, ...rest } = user;
        const token = await sign({ user: rest });
        if (!token) {
            return { success: false, error: "¡Ha ocurrido un error al generar la sesión!" };
        }

        cookies().set("token", token, { expires: Date.now() + EXPIRATION, httpOnly: true });

        return { success: true };
    } catch (_) {
        return { success: false, error: "¡Ha ocurrido un error inesperado!" };
    }
}

export async function login(values: z.infer<typeof loginSchema>): Promise<AuthResponse> {
    try {
        const parsed = await loginSchema.safeParseAsync(values);
        if (!parsed.success) {
            return { success: false, error: "¡Los campos son inválidos!" };
        }

        const { email, password } = parsed.data;

        const user = await db.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return { success: false, error: "¡Las credenciales son inválidas!" };
        }

        const { password: _, ...rest } = user;
        const token = await sign({ user: rest });
        if (!token) {
            return { success: false, error: "¡Ha ocurrido un error al generar la sesión!" };
        }

        cookies().set("token", token, { expires: Date.now() + EXPIRATION, httpOnly: true });

        return { success: true };
    } catch (_) {
        return { success: false, error: "¡Ha ocurrido un error inesperado!" };
    }
}