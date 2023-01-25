import Svg from "components/Svg";
import { MenuButton } from "data/menuButtons";

interface MenuButtonProps extends MenuButton {
    onClick?: () => void;
    className?: string;
}

interface TagProps extends Omit<MenuButtonProps, "svg"> {}

export default function MenuButtonComponent(props: MenuButtonProps) {
    const { className, svg, children } = props;
    const tagProps = { ...props, className: undefined, svg: undefined };

    const Tag = (tagProps: TagProps) =>
        tagProps.href ? (
            <a {...tagProps} target="_blank" rel="noopener noreferrer" />
        ) : (
            <button {...tagProps} />
        );

    return (
        <Tag
            {...tagProps}
            className={`group p-1 md:mb-1 md:grid md:min-w-[115px] md:grid-cols-[1fr,2fr] md:place-items-center md:content-center md:last:mb-0${
                className ? ` ${className}` : ""
            }`}
        >
            <Svg {...svg} />

            <span className="hidden text-sm font-medium transition-colors duration-300 group-hover:text-secondary md:block">
                {children}
            </span>
        </Tag>
    );
}
