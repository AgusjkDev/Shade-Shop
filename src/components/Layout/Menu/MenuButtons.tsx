import Svg from "components/Svg";
import menuButtons, { MenuButton } from "data/menuButtons";

interface TagProps extends Omit<MenuButton, "svg"> {
    className?: string;
    onClick?: () => void;
}

export default function MenuButtons() {
    const handleCategories = () => {
        console.log("Handling categories button...");
    };

    const handleTheme = () => {
        console.log("Handling theme button...");
    };

    const Tag = (tagProps: TagProps) =>
        tagProps.href ? (
            <a {...tagProps} target="_blank" rel="noopener noreferrer" />
        ) : (
            <button {...tagProps} />
        );

    return (
        <>
            {menuButtons.map(menuButton => {
                const { key, href, children, svg } = menuButton;

                const onClick = !href && (key === "categories" ? handleCategories : handleTheme);
                const className =
                    key === "categories"
                        ? "order-4 md:hidden"
                        : key === "theme"
                        ? "order-5 md:order-none"
                        : null;

                const tagProps = { ...menuButton, ...(onClick && { onClick }), svg: undefined };

                return (
                    <Tag
                        {...tagProps}
                        className={`${
                            className ? className : ""
                        } group p-1 md:mb-1 md:grid md:min-w-[115px] md:grid-cols-[1fr,2fr] md:place-items-center md:content-center md:last:mb-0`}
                    >
                        <Svg {...svg} />

                        <span className="hidden text-sm font-medium transition-colors duration-300 group-hover:text-secondary md:block">
                            {children}
                        </span>
                    </Tag>
                );
            })}
        </>
    );
}
