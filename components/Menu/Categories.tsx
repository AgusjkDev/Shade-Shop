import Link from "next/link";

import Svg from "components/Svg";
import { arrowBack } from "data/svgs";

interface CategoriesProps {
    categories: Category[];
    selectedCategory?: string;
    toggleShowCategories: () => void;
}

export default function Categories({
    categories,
    selectedCategory,
    toggleShowCategories,
}: CategoriesProps) {
    return (
        <div className="mx-auto flex h-full gap-1 overflow-x-auto bg-white px-2 md:flex-col md:gap-0 md:overflow-x-hidden md:bg-transparent md:px-0">
            {[{ _id: "0", name: "Todas" }, ...categories].map(({ _id, name }) => (
                <Link
                    key={_id}
                    href={_id !== "0" ? `/category/${name.toLowerCase()}` : "/"}
                    className={`${
                        selectedCategory === name.toLowerCase()
                            ? "text-secondary md:border-b-secondary-light"
                            : "hover:text-secondary md:border-b-primary-light md:hover:border-b-secondary-light"
                    } grid h-full place-items-center px-2 text-sm font-medium transition-colors duration-300 md:border-b-[1px] md:py-3.5 md:hover:border-b-secondary-light`}
                >
                    {name}
                </Link>
            ))}

            <button
                aria-label="Volver al menu"
                className="group px-2 md:hidden"
                onClick={toggleShowCategories}
            >
                <Svg {...arrowBack} />
            </button>
        </div>
    );
}
