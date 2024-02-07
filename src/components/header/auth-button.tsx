import { PersonIcon } from "@radix-ui/react-icons";
import type { User } from "@prisma/client";

import { Button } from "@/components/ui/button";

interface AuthButtonProps {
    user: Omit<User, "password">;
}

export default function AuthButton({ user }: Readonly<AuthButtonProps>) {
    return (
        <Button disabled variant="outline" size="icon">
            <PersonIcon className="h-5 w-5" />
        </Button>
    );
}
