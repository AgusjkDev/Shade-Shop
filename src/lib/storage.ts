import { getRandomId } from "./utils";

const SUPABASE_STORAGE_URL = `https://${process.env.SUPABASE_PROJECT_REF!}.supabase.co/storage/v1/object/${process.env.SUPABASE_STORAGE_BUCKET!}`;

export async function uploadImage(image: File): Promise<string | null> {
    try {
        const filename = `${getRandomId()}.${image.name.split(".").pop()}`;

        const request = await fetch(`${SUPABASE_STORAGE_URL}/${filename}`, {
            method: "POST",
            body: await image.arrayBuffer(),
            headers: {
                Authorization: `Bearer ${process.env.SUPABASE_BYPASS_TOKEN!}`,
            },
        });

        return request.status === 200 ? filename : null;
    } catch (_) {
        return null;
    }
}

export async function removeImage(filename: string) {
    try {
        await fetch(`${SUPABASE_STORAGE_URL}/${filename}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${process.env.SUPABASE_BYPASS_TOKEN!}`,
            },
        });
    } catch (_) {}
}
