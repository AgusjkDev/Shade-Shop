import { useContext } from "react";

import AppContext from "context/AppContext";
import Svg from "components/Svg";
import { arrowBack } from "data/svgs";

const BREAKPOINT = 768;

export default function Categories() {
    const { categories, selectedCategory, setSelectedCategory, toggleShowCategories } =
        useContext(AppContext);

    const handleCategory = (category: Category) => {
        if (document.documentElement.clientWidth < BREAKPOINT) toggleShowCategories();

        setSelectedCategory(category);
    };

    return (
        <div className="mx-auto flex h-full gap-1 overflow-x-auto px-2 md:flex-col md:gap-0">
            {categories.map(({ _id, name }) => (
                <button
                    key={_id}
                    className={`${
                        selectedCategory._id === _id
                            ? "text-secondary md:border-b-secondary-light"
                            : "hover:text-secondary md:border-b-primary-light md:hover:border-b-secondary-light"
                    } px-2 text-sm font-medium transition-colors duration-300 md:gap-0 md:border-b-[1px] md:py-3.5`}
                    onClick={() => handleCategory({ _id, name })}
                >
                    {name}
                </button>
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
