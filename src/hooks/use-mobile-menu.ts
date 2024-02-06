import * as React from "react";

import { useMediaQuery } from "@/hooks";

export default function useMobileMenu() {
    const [open, setOpen] = React.useState<boolean>(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    React.useEffect(() => {
        if (open && isDesktop) setOpen(false);
    }, [open, isDesktop]);

    return { open, onOpenChange: setOpen, close: () => setOpen(false) };
}
