import { GetProducts } from "interfaces/api";
import { StatusCode } from "enums/api";

export default async function getProducts(): Promise<Product[]> {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
            next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE ?? 60) },
        });
        const response = <GetProducts>await request.json();
        if (response.status !== StatusCode.OK) {
            return [];
        }

        return response.products;
    } catch (e) {
        return [];
    }
}
