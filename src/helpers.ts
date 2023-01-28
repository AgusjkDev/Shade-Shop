export function sort<T>(filter: string, array: T[], key: string): T[] {
    switch (filter) {
        case "A-Z":
            return [...array].sort((a, b) => {
                const first = a[key as keyof typeof a];
                const second = b[key as keyof typeof b];

                return typeof first === "string" && typeof second === "string"
                    ? first.localeCompare(second)
                    : 0;
            });

        case "Z-A":
            return [...array].sort((a, b) => {
                const first = a[key as keyof typeof a];
                const second = b[key as keyof typeof b];

                return typeof first === "string" && typeof second === "string"
                    ? second.localeCompare(first)
                    : 0;
            });

        case "ASC":
            return [...array].sort((a, b) => {
                const first = a[key as keyof typeof a];
                const second = b[key as keyof typeof b];

                return typeof first === "number" && typeof second === "number" ? first - second : 0;
            });

        case "DESC":
            return [...array].sort((a, b) => {
                const first = a[key as keyof typeof a];
                const second = b[key as keyof typeof b];

                return typeof first === "number" && typeof second === "number" ? second - first : 0;
            });

        default:
            return array;
    }
}

export function formatPrice(price: number): string {
    const priceFormat = new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS" });

    return priceFormat.format(price);
}
