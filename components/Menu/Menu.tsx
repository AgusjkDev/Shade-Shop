"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import MainButtons from "./MainButtons";
import Categories from "./Categories";
import AboutButtons from "./AboutButtons";

interface MenuProps {
    categories: Category[];
}

export default function Menu({ categories }: MenuProps) {
    const [showCategories, setShowCategories] = useState<boolean>(false);
    const pathname = usePathname();

    const selectedCategory =
        pathname === "/"
            ? "todas"
            : pathname?.includes("/category/")
            ? pathname.split("/").at(-1)?.toLowerCase()
            : undefined;
    const toggleShowCategories = () => setShowCategories(prevState => !prevState);
    const toggleTheme = () => document.documentElement.classList.toggle("dark");

    return (
        <div className="md:scrollbar fixed bottom-0 w-full bg-white py-3.5 md:static md:bottom-auto md:flex md:max-h-screen md:max-w-xs md:flex-col md:gap-3 md:py-8 md:[overflow-y:overlay]">
            <div className="flex items-center justify-evenly md:flex-col md:items-center md:gap-2.5">
                <h1 className="order-3 text-center text-xl font-bold text-secondary transition-colors duration-300 hover:text-secondary-dark md:order-none md:text-2xl">
                    <Link href="/">Shade Shop</Link>
                </h1>

                <MainButtons
                    toggleShowCategories={toggleShowCategories}
                    toggleTheme={toggleTheme}
                />
            </div>

            <div
                className={`${
                    showCategories ? "flex" : "hidden"
                } absolute bottom-0 h-full w-full bg-white md:static md:flex md:h-auto md:flex-col md:bg-transparent`}
            >
                <h3 className="hidden text-center text-lg font-bold text-secondary md:block">
                    Categorías
                </h3>

                <Categories
                    categories={categories}
                    selectedCategory={selectedCategory}
                    toggleShowCategories={toggleShowCategories}
                />
            </div>

            <div className="hidden items-center justify-evenly md:flex md:flex-col md:items-center md:gap-2.5">
                <h3 className="text-center text-lg font-bold text-secondary">Sobre Nosotros</h3>

                <AboutButtons />
            </div>
        </div>
    );
}
