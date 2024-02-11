import { Button } from "@/components/ui/button";
import { GroupedProducts } from "@/components/admin";
import db from "@/lib/db";

export default async function Products() {
    const groupedProducts = await db.category.findMany({
        include: { products: true },
        where: { products: { some: { id: { not: undefined } } } },
        orderBy: { name: "asc" },
    });

    return (
        <div className="flex flex-col items-start gap-y-6">
            <Button disabled>Crear producto</Button>

            <div className="flex w-full flex-col gap-y-3">
                <h2 className="text-sm font-semibold uppercase">Productos por categoría</h2>

                <GroupedProducts groupedProducts={groupedProducts} />
            </div>
        </div>
    );
}
