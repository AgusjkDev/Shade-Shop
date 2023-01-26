import Link from "next/link";

import MenuButtons from "./MenuButtons";
import Categories from "./Categories";

export default function Menu() {
    return (
        <div className="fixed bottom-0 flex w-full items-center justify-evenly bg-white py-3.5 md:static md:bottom-auto md:w-1/3 md:max-w-xs md:flex-col md:justify-start md:gap-4 md:py-8">
            <h1 className="order-3 text-center text-xl font-bold text-secondary hover:text-secondary-dark md:order-none md:text-2xl">
                <Link href="/">Shade Shop</Link>
            </h1>

            <MenuButtons />

            <Categories />
        </div>
    );
}
