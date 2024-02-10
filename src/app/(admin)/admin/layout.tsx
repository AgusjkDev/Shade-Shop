import { Navbar, MobileMenu } from "@/components/admin";

export default function AdminLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <div className="flex flex-grow basis-0 divide-x overflow-y-auto">
            <aside className="hidden w-1/3 max-w-[275px] overflow-y-auto md:block">
                <Navbar />
            </aside>

            <main className="w-full overflow-y-auto pb-14 md:pb-0">{children}</main>

            <div className="fixed bottom-0 grid w-full place-items-center border-t bg-background py-2.5 md:hidden">
                <MobileMenu />
            </div>
        </div>
    );
}
