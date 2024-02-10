import Image from "next/image";

export default function Index() {
    return (
        <>
            <main className="relative grid flex-1 place-items-center">
                <Image
                    alt="Imagen de fondo sobre personas vistiendo prendas con estilo"
                    src="/hero.jpg"
                    className="pointer-events-none select-none object-cover"
                    fill
                    priority
                    quality={100}
                />

                <div className="absolute flex flex-col gap-y-6 px-4">
                    <h1 className="text-shadow text-center text-title uppercase text-white shadow-black/20">
                        Shade Shop
                    </h1>

                    <h2 className="text-shadow text-center text-subtitle uppercase text-white shadow-black/20">
                        Tu tienda de confianza
                    </h2>
                </div>
            </main>
        </>
    );
}
