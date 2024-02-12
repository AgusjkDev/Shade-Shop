import { ProductDialog, GroupedProducts } from "@/components/admin";
import db from "@/lib/db";

export default async function Products() {
    const categoriesWithProducts = await db.category.findMany({
        include: { products: true },
        orderBy: { name: "asc" },
    });

    const categories = categoriesWithProducts.map(({ products: _, ...category }) => category);
    const groupedProducts = categoriesWithProducts.filter(({ products }) => products.length > 0);

    return (
        <div className="flex flex-col items-start gap-y-6">
            <ProductDialog categories={categories} variant="create" />

            <div className="flex w-full flex-col gap-y-3">
                <h2 className="text-sm font-semibold uppercase">Productos por categoría</h2>

                <GroupedProducts groupedProducts={groupedProducts} categories={categories} />
            </div>
        </div>
    );
}
