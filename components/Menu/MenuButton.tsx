import Link from "next/link";

import Svg from "components/Svg";

interface MenuButtonProps {
    "aria-label"?: string;
    title?: string;
    href?: string;
    children?: React.ReactNode;
    svg: SVG;
    className?: string;
    onClick?: () => void;
}

interface TagProps extends Omit<MenuButtonProps, "svg"> {}

export default function MenuButton(props: MenuButtonProps) {
    const { children, svg, className } = props;
    const tagProps = { ...props, children: undefined, svg: undefined, className: undefined };

    const Tag = (tagProps: TagProps) => {
        return tagProps.href ? (
            <Link {...tagProps} href={tagProps.href} />
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
