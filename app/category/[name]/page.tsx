import { redirect } from "next/navigation";

import { getCategories, getProducts } from "services";
import { ProductsContainer } from "components";

interface CategoryProps {
    params: {
        name: string;
    };
}

export default async function Category({ params }: CategoryProps) {
    const categories = await getCategories();

    const category = categories.find(
        ({ name }) => name.toLowerCase() === params.name.toLowerCase()
    );

    if (!category) return redirect("/");

    const products = await getProducts();

    return (
        <ProductsContainer
            category={category}
            products={products.filter(({ categoryId }) => categoryId === category._id)}
        />
    );
}
