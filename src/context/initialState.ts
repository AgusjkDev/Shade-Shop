import { AppState } from "./interfaces";

const initialState: AppState = {
    categories: [{ _id: "0", name: "Todas" }],
    selectedCategory: { _id: "0", name: "Todas" },
    showCategories: false,
    products: [],
    setCategories: () => {},
    setProducts: () => {},
};

export default initialState;
