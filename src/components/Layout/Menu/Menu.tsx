import { useContext } from "react";
import Link from "next/link";

import AppContext from "context/AppContext";
import MainButtons from "./MainButtons";
import Categories from "./Categories";
import AboutButtons from "./AboutButtons";

export default function Menu() {
    const { showCategories } = useContext(AppContext);

    return (
        <div className="md:scrollbar fixed bottom-0 w-full bg-white py-3.5 md:static md:bottom-auto md:flex md:max-h-screen md:max-w-xs md:flex-col md:gap-3 md:py-8 md:[overflow-y:overlay]">
            <div className="flex items-center justify-evenly md:flex-col md:items-center md:gap-2.5">
                <h1 className="order-3 text-center text-xl font-bold text-secondary hover:text-secondary-dark md:order-none md:text-2xl">
                    <Link href="/">Shade Shop</Link>
                </h1>

                <MainButtons />
            </div>

            <div
                className={`${
                    showCategories ? "flex" : "hidden"
                } absolute bottom-0 h-full w-full bg-white md:static md:flex md:h-auto md:flex-col md:bg-transparent`}
            >
                <h3 className="hidden text-center text-lg font-bold text-secondary md:block">
                    Categorías
                </h3>

                <Categories />
            </div>

            <div className="hidden items-center justify-evenly md:flex md:flex-col md:items-center md:gap-2.5">
                <h3 className="text-center text-lg font-bold text-secondary">Sobre Nosotros</h3>

                <AboutButtons />
            </div>
        </div>
    );
}
