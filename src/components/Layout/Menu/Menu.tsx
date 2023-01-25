import MenuButton from "./MenuButton";
import { menuButtons } from "data";

export default function Menu() {
    const handleCategories = () => {
        console.log("Handling categories button...");
    };

    const handleTheme = () => {
        console.log("Handling theme button...");
    };

    return (
        <div className="fixed bottom-0 flex w-full items-center justify-evenly bg-white py-3.5 md:static md:bottom-auto md:w-1/3 md:max-w-xs md:flex-col md:justify-start md:gap-4 md:py-8">
            <a
                href="/"
                className="order-3 text-center text-xl font-bold text-secondary hover:text-secondary-dark md:order-none md:text-2xl"
            >
                Shade Shop
            </a>

            {menuButtons.map(menuButton => {
                const { key, href } = menuButton;

                const onClick = !href && (key === "categories" ? handleCategories : handleTheme);
                const className =
                    key === "categories"
                        ? "order-4 md:hidden"
                        : key === "theme"
                        ? "order-5 md:order-none"
                        : null;

                return (
                    <MenuButton
                        {...{
                            ...menuButton,
                            ...(onClick && { onClick }),
                            ...(className && { className }),
                        }}
                    />
                );
            })}
        </div>
    );
}
