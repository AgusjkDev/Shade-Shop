import { useState, useEffect } from "react";

import { sort } from "helpers";

const filters = ["A-Z", "Z-A", "ASC", "DESC"];

export default function useProductFilter(products: Product[]) {
    const [filter, setFilter] = useState<string>(filters[0]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

    useEffect(() => {
        setFilteredProducts(
            sort(filter, products, ["A-Z", "Z-A"].includes(filter) ? "name" : "price")
        );
    }, [filter]);

    return { filters: filters, filteredProducts, updateFilter: setFilter };
}
