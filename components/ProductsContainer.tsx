"use client";

import Link from "next/link";
import Image from "next/image";

import { LinkButton } from "components";
import { useProductFilter } from "hooks";
import { formatPrice } from "helpers";

interface ProductsContainerProps {
    category: Category;
    products: Product[];
}

export default function ProductsContainer({ category, products }: ProductsContainerProps) {
    const { filters, filteredProducts, updateFilter } = useProductFilter(products);

    return (
        <div className="flex flex-col gap-6 pb-12 pt-6 md:gap-8 md:pt-8 md:pb-16">
            <h2 className="text-center text-3xl font-bold text-secondary">{category.name}</h2>

            <select
                className="mx-auto w-48 rounded-full border-r-8 border-transparent bg-white p-3 pl-2 text-sm font-medium hover:cursor-pointer"
                onChange={e => updateFilter(e.target.value)}
            >
                {filters.map(filter => (
                    <option key={filter} value={filter}>
                        {filter}
                    </option>
                ))}
            </select>

            <main className="grid gap-y-12 px-4 md:px-0 xl:grid-cols-2 xl:gap-y-16 2xl:grid-cols-3 2xl:gap-x-16">
                {filteredProducts.map(({ _id, name, price, images }) => (
                    <div
                        key={_id}
                        className="mx-auto flex w-full max-w-[360px] flex-col justify-between gap-3 md:gap-2"
                    >
                        <div className="group flex flex-col gap-3 md:gap-2">
                            <Link href={`/product/${_id}`}>
                                <Image
                                    alt={name}
                                    src={images[0]}
                                    width={840}
                                    height={840}
                                    className="w-full rounded-sm shadow-md transition-shadow duration-300 hover:shadow-secondary-light"
                                />
                            </Link>

                            <Link
                                href={`/product/${_id}`}
                                className="mx-auto text-center text-xl font-bold leading-none text-secondary transition-colors duration-300 hover:text-secondary-dark md:text-2xl"
                            >
                                {name}
                            </Link>

                            <span className="text-center text-sm font-medium leading-none text-primary">
                                {formatPrice(price)}
                            </span>
                        </div>

                        <LinkButton href={`/product/${_id}`} className="mt-1 md:mt-1.5">
                            Ver producto
                        </LinkButton>
                    </div>
                ))}
            </main>
        </div>
    );
}
