import { GetCategories } from "interfaces/api";
import { StatusCode } from "enums/api";

export default async function getCategories(): Promise<Category[]> {
    try {
        const request = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/categories`, {
            next: { revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE ?? 60) },
        });
        const response = <GetCategories>await request.json();
        if (response.status !== StatusCode.OK) {
            return [];
        }

        return response.categories;
    } catch (e) {
        return [];
    }
}
