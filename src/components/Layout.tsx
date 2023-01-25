interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return <div className="min-h-screen grid place-items-center">{children}</div>;
}
