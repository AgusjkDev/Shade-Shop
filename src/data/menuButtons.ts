import { profile, cart, categories, theme } from "./svgs";

export interface MenuButton {
    key: string;
    "aria-label": string;
    title?: string;
    href?: string;
    children?: React.ReactNode;
    svg: SVG;
}

const menuButtons: MenuButton[] = [
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
        children: "Tema",
        svg: theme,
    },
];

export default menuButtons;
