import MenuButton from "./MenuButton";
import { faq, terms, contact } from "data/svgs";

interface AboutButton {
    key: string;
    title: string;
    href: string;
    children: React.ReactNode;
    svg: SVG;
}

const ABOUT_BUTTONS: AboutButton[] = [
    {
        key: "faq",
        title: "¡Visita las preguntas frecuentes!",
        href: "#", // href: "/faq",
        children: "Dudas",
        svg: faq,
    },
    {
        key: "terms",
        title: "¡Visita los términos y condiciones!",
        href: "#", // href: "/terms",
        children: "Términos",
        svg: terms,
    },
    {
        key: "contact",
        title: "¡Contáctanos!",
        href: "#", // href: "/contact",
        children: "Contacto",
        svg: contact,
    },
];

export default function AboutButtons() {
    return (
        <>
            {ABOUT_BUTTONS.map(props => (
                <MenuButton {...props} />
            ))}
        </>
    );
}
