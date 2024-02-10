import { NextResponse, type NextRequest } from "next/server";
import { Role, type User, type Role as RoleType } from "@prisma/client";

import { verify, sign, EXPIRATION } from "@/lib/jwt";

const ROLE_LEVELS: Record<RoleType, number> = {
    USER: 0,
    ADMIN: 1,
};

const PROTECTED_ROUTES: { pathname: string; role?: RoleType }[] = [
    {
        pathname: "/admin",
        role: Role.ADMIN,
    },
];

export default async function middleware(req: NextRequest) {
    const { origin, pathname } = req.nextUrl;
    const token = req.cookies.get("token")?.value;
    const isProtectedRoute = PROTECTED_ROUTES.some(route => pathname.startsWith(route.pathname));

    if (!token) {
        return isProtectedRoute
            ? NextResponse.redirect(`${origin}/login`, { status: 307 })
            : NextResponse.next();
    }

    const payload = await verify<{ user: Omit<User, "password"> }>(token);
    if (!payload) {
        const res = isProtectedRoute
            ? NextResponse.redirect(`${origin}/login`, { status: 307 })
            : NextResponse.next();
        res.cookies.delete("token");

        return res;
    }

    const newToken = await sign({ user: payload.user });
    if (!newToken) {
        return NextResponse.next();
    }

    const hasPermission = PROTECTED_ROUTES.some(
        route =>
            pathname.startsWith(route.pathname) &&
            (!route.role || ROLE_LEVELS[payload.user.role] >= ROLE_LEVELS[route.role]),
    );

    const res =
        pathname !== "/login" && pathname !== "/signup" && !(isProtectedRoute && !hasPermission)
            ? NextResponse.next()
            : NextResponse.redirect(origin, { status: 307 });

    res.cookies.set("token", newToken, { expires: Date.now() + EXPIRATION, httpOnly: true });

    return res;
}

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
