import Menu from "./Menu/Menu";

interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <div className="flex flex-col bg-primary-lightest md:flex-row">
            <div className="px-4 md:order-2 md:flex-1 md:px-0">
                <div className="mx-auto grid min-h-screen w-full place-content-center md:w-[85%]">
                    {children}
                </div>
            </div>

            <Menu />
        </div>
    );
}
