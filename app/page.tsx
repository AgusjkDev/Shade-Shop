import { getProducts } from "services";
import { ProductsContainer } from "components";

export default async function Index() {
    const products = await getProducts();

    return <ProductsContainer category={{ _id: "0", name: "Todas" }} products={products} />;
}
