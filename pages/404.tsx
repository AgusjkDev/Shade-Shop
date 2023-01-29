import { LinkButton } from "components";

import "styles/globals.css";

export default function NotFound() {
    return (
        <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col items-center justify-center gap-8 px-4">
            <h1 className="text-center text-3xl font-bold text-secondary">
                ¡Página no encontrada!
            </h1>

            <LinkButton href="/">Volver a Shade Shop</LinkButton>
        </main>
    );
}
