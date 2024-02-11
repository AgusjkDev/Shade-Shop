import Link from "next/link";
import { OpenInNewWindowIcon, Pencil2Icon, TrashIcon } from "@radix-ui/react-icons";
import type { Category, Product } from "@prisma/client";

import {
    Accordion,
    AccordionTrigger,
    AccordionItem,
    AccordionContent,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";

interface GroupedProductsProps {
    groupedProducts: (Category & { products: Product[] })[];
}

export default function GroupedProducts({ groupedProducts }: Readonly<GroupedProductsProps>) {
    return (
        <Accordion type="single" collapsible>
            {groupedProducts.map(({ id: categoryId, name: categoryName, products }) => (
                <AccordionItem key={categoryId} value={categoryId}>
                    <AccordionTrigger>{categoryName}</AccordionTrigger>

                    <AccordionContent className="mx-3 md:mx-6">
                        <Accordion type="single" collapsible>
                            {products.map(({ id, name, createdAt, updatedAt }) => (
                                <AccordionItem key={id} value={id}>
                                    <AccordionTrigger>{name}</AccordionTrigger>

                                    <AccordionContent className="flex flex-col gap-y-1">
                                        <span className="text-xs text-foreground/60">
                                            Fecha de creación:&nbsp;
                                            {formatDate(createdAt)}
                                        </span>

                                        <span className="text-xs text-foreground/60">
                                            Última actualización:&nbsp;
                                            {formatDate(updatedAt)}
                                        </span>

                                        <div className="flex gap-x-2 pt-3">
                                            <Link
                                                href="#"
                                                target="_blank"
                                                className={buttonVariants({
                                                    variant: "outline",
                                                    size: "icon",
                                                })}
                                            >
                                                <OpenInNewWindowIcon />
                                            </Link>

                                            <Button disabled variant="outline" size="icon">
                                                <Pencil2Icon />
                                            </Button>

                                            <Button disabled variant="destructive" size="icon">
                                                <TrashIcon />
                                            </Button>
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            ))}
                        </Accordion>
                    </AccordionContent>
                </AccordionItem>
            ))}
        </Accordion>
    );
}
