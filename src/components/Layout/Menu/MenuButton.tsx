import Svg from "components/Svg";
import { ToggleShowCategories } from "context/types";

interface MenuButtonProps {
    "aria-label"?: string;
    title?: string;
    href?: string;
    children?: React.ReactNode;
    svg: SVG;
    className?: string;
    onClick?: ToggleShowCategories | (() => {});
}

interface TagProps extends Omit<MenuButtonProps, "svg"> {}

export default function MenuButton(props: MenuButtonProps) {
    const { children, svg, className } = props;
    const tagProps = { ...props, children: undefined, svg: undefined, className: undefined };

    const Tag = (tagProps: TagProps) => {
        return tagProps.href ? (
            <a {...tagProps} target="_blank" rel="noopener noreferrer" />
        ) : (
            <button {...tagProps} />
        );
    };

    return (
        <Tag
            {...tagProps}
            className={`${
                className ? className : ""
            } group p-2 md:grid md:min-w-[120px] md:grid-cols-[1fr,2fr] md:justify-items-center`}
        >
            <Svg {...svg} />

            <span className="hidden text-sm font-medium transition-colors duration-300 group-hover:text-secondary md:block">
                {children}
            </span>
        </Tag>
    );
}
