import { useContext } from "react";

import AppContext from "context/AppContext";
import { profile, cart, categories, theme } from "data/svgs";
import MenuButton from "./MenuButton";

export interface MainButton {
    key: string;
    "aria-label": string;
    title?: string;
    href?: string;
    children?: React.ReactNode;
    svg: SVG;
}

const MAIN_BUTTONS: MainButton[] = [
    {
        key: "profile",
        "aria-label": "Ir a mi perfil",
        title: "¡Visita tu perfil!",
        href: "#", // href: "/profile",
        children: "Perfil",
        svg: profile,
    },
    {
        key: "cart",
        "aria-label": "Ir a mi carrito",
        title: "¡Visita tu carrito!",
        href: "#", // href: "/cart",
        children: "Carrito",
        svg: cart,
    },
    {
        key: "categories",
        "aria-label": "Ver categorías",
        svg: categories,
    },
    {
        key: "theme",
        "aria-label": "Cambiar tema",
        title: "¡Cambia el tema de la página!",
        children: "Tema",
        svg: theme,
    },
];

export default function MainButons() {
    const { toggleShowCategories } = useContext(AppContext);

    const handleTheme = () => {
        console.log("Handling theme...");
    };

    return (
        <>
            {MAIN_BUTTONS.map(props => {
                const { key, href } = props;

                const onClick =
                    !href && (key === "categories" ? toggleShowCategories : handleTheme);
                const className =
                    key === "categories" ? "order-4 md:hidden" : key === "theme" ? "order-5" : null;

                const menuButtonProps = {
                    ...props,
                    ...(onClick && { onClick }),
                    ...(className && { className }),
                };

                return <MenuButton {...menuButtonProps} key={key} />;
            })}
        </>
    );
}
