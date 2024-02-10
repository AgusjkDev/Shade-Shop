"use client";

import { useSelectedLayoutSegment } from "next/navigation";

import { Separator } from "@/components/ui/separator";

type Segment = "categorias" | "productos" | "stock";

const SEGMENTS_DATA: Record<Segment, { title: string }> = {
    categorias: {
        title: "Categorías",
    },
    productos: {
        title: "Productos",
    },
    stock: {
        title: "Stock",
    },
};

interface PageLayoutProps {
    children: React.ReactNode;
}

export default function PageLayout({ children }: Readonly<PageLayoutProps>) {
    const segment = useSelectedLayoutSegment() as Segment | null;

    if (!segment) {
        return children;
    }

    const { title } = SEGMENTS_DATA[segment];

    return (
        <div className="mx-auto flex w-[87.5%] flex-col gap-y-6 py-12">
            <h1 className="text-xl font-bold uppercase md:text-2xl">{title}</h1>

            <Separator />

            {children}
        </div>
    );
}
