import Menu from "./Menu/Menu";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex min-h-screen flex-col bg-primary-lightest md:flex-row">
            <div className="md:scrollbar px-4 md:order-2 md:max-h-screen md:flex-1 md:px-0 md:[overflow-y:overlay]">
                <div className="w-full pb-16 md:mx-auto md:w-[85%] md:pb-0">{children}</div>
            </div>

            <Menu />
        </div>
    );
}
