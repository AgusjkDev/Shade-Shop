import type { SetCategories, SetSelectedCategory, ToggleShowCategories } from "./types";

export interface AppState {
    categories: Category[];
    selectedCategory: Category;
    showCategories: boolean;
    setCategories: SetCategories;
}

export interface AppContext extends AppState {
    setSelectedCategory: SetSelectedCategory;
    toggleShowCategories: ToggleShowCategories;
}
