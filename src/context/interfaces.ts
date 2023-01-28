import type {
    SetCategories,
    SetSelectedCategory,
    ToggleShowCategories,
    SetProducts,
} from "./types";

export interface AppState {
    categories: Category[];
    selectedCategory: Category;
    showCategories: boolean;
    products: Product[];
    setCategories: SetCategories;
    setProducts: SetProducts;
}

export interface AppContext extends AppState {
    setSelectedCategory: SetSelectedCategory;
    toggleShowCategories: ToggleShowCategories;
}
