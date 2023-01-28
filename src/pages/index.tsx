import { useContext } from "react";
import Link from "next/link";
import Image from "next/image";

import AppContext from "context/AppContext";
import { Layout } from "components";
import { formatPrice } from "helpers";

export default function Index() {
    const { selectedCategory, products } = useContext(AppContext);

    return (
        <Layout>
            <div className="flex flex-col gap-6 pb-12 pt-6 md:gap-8 md:pt-8 md:pb-16">
                <h2 className="text-center text-3xl font-bold text-secondary">
                    {selectedCategory.name}
                </h2>

                <main className="grid gap-y-12 px-4 md:px-0 xl:grid-cols-2 xl:gap-y-16 2xl:grid-cols-3 2xl:gap-x-16">
                    {(selectedCategory._id === "0"
                        ? products
                        : products.filter(({ categoryId }) => categoryId === selectedCategory._id)
                    ).map(({ _id, name, price, images }) => (
                        <div
                            key={_id}
                            className="mx-auto flex w-full max-w-[360px] flex-col justify-between gap-3 md:gap-2"
                        >
                            <div className="group flex flex-col gap-3 md:gap-2">
                                <Link href={`/products/${_id}`}>
                                    <Image
                                        alt={name}
                                        src={images[0]}
                                        width={840}
                                        height={840}
                                        className="w-full rounded-sm shadow-md transition-shadow duration-300 hover:shadow-secondary-light"
                                    />
                                </Link>

                                <Link
                                    href={`/products/${_id}`}
                                    className="mx-auto text-center text-xl font-semibold leading-none text-secondary transition-colors duration-300 hover:text-secondary-dark md:text-2xl"
                                >
                                    {name}
                                </Link>

                                <span className="text-center text-sm font-medium leading-none text-primary">
                                    {formatPrice(price)}
                                </span>
                            </div>

                            <Link
                                href={`/products/${_id}`}
                                className="mt-1 w-full rounded-sm bg-secondary p-3 text-center font-primary text-sm font-semibold uppercase text-white transition-colors duration-300 hover:bg-secondary-dark md:mt-1.5"
                            >
                                Ver producto
                            </Link>
                        </div>
                    ))}
                </main>
            </div>
        </Layout>
    );
}
