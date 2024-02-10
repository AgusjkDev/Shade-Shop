import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { CategoriesForm } from "@/components/admin";
import db from "@/lib/db";

export default async function Categories() {
    const categories = await db.category.findMany({ orderBy: { name: "asc" } });

    return (
        <Tabs defaultValue="create" className="w-full md:w-2/3 2xl:w-1/2">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="create">Crear</TabsTrigger>

                <TabsTrigger value="update">Editar</TabsTrigger>

                <TabsTrigger value="delete">Eliminar</TabsTrigger>
            </TabsList>

            <TabsContent value="create">
                <CategoriesForm categories={categories} variant="create" />
            </TabsContent>

            <TabsContent value="update">
                <CategoriesForm categories={categories} variant="update" />
            </TabsContent>

            <TabsContent value="delete">
                <CategoriesForm categories={categories} variant="delete" />
            </TabsContent>
        </Tabs>
    );
}
