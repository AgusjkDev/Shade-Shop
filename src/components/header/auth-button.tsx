import { PersonIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";

interface AuthButtonProps {}

export default function AuthButton(props: Readonly<AuthButtonProps>) {
    return (
        <Button disabled variant="outline" size="icon">
            <PersonIcon className="h-5 w-5" />
        </Button>
    );
}
