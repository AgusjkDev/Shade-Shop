"use client";

import * as React from "react";
import { Pencil2Icon } from "@radix-ui/react-icons";
import type { Category } from "@prisma/client";

import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ProductsForm from "./products-form";

type Variant = "create" | "update";

const DIALOG_DATA: Record<Variant, { children: React.ReactNode; title: string }> = {
    create: {
        children: <Button>Crear producto</Button>,
        title: "Creación de producto",
    },
    update: {
        children: (
            <Button disabled variant="outline" size="icon">
                <Pencil2Icon />
            </Button>
        ),
        title: "Edición de producto",
    },
};

interface ProductDialogProps {
    categories: Category[];
    variant: Variant;
}

export default function ProductDialog({ categories, variant }: Readonly<ProductDialogProps>) {
    const [open, setOpen] = React.useState<boolean>(false);

    const { children, title } = DIALOG_DATA[variant];

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>

            <DialogContent className="scrollbar max-h-[92.5dvh] w-[92.5%] overflow-y-auto rounded-md">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>

                <ProductsForm
                    categories={categories}
                    variant={variant}
                    onSuccess={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    );
}
