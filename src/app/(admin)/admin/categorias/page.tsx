import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default async function Categories() {
    return (
        <Tabs defaultValue="create" className="w-2/3">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger disabled value="create">
                    Crear
                </TabsTrigger>

                <TabsTrigger disabled value="update">
                    Editar
                </TabsTrigger>

                <TabsTrigger disabled value="delete">
                    Eliminar
                </TabsTrigger>
            </TabsList>

            <TabsContent value="create">Crear</TabsContent>

            <TabsContent value="update">Editar</TabsContent>

            <TabsContent value="delete">Eliminar</TabsContent>
        </Tabs>
    );
}
