import Link from "next/link";

interface LinkButtonProps {
    href: string;
    children: React.ReactNode;
    className?: string;
}

export default function LinkButton({ href, children, className }: LinkButtonProps) {
    return (
        <Link
            href={href}
            className={`w-full rounded-sm bg-secondary p-3 text-center font-primary text-sm font-semibold uppercase text-white transition-colors duration-300 hover:bg-secondary-dark${
                className ? ` ${className}` : ""
            }`}
        >
            {children}
        </Link>
    );
}
