// This Layout renders both signup and login pages.

import { AuthCard } from "@/components/auth";

export default function AuthLayout() {
    return (
        <div className="grid flex-1 place-items-center py-8">
            <AuthCard />
        </div>
    );
}
