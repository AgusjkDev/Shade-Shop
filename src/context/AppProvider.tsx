import { useReducer, useEffect } from "react";

import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import initialState from "./initialState";
import { getCategories, getProducts } from "services";

import type {
    SetCategories,
    SetSelectedCategory,
    ToggleShowCategories,
    SetProducts,
} from "./types";
import { Type } from "./enums";

interface AppProviderProps {
    children: React.ReactNode;
}

export default function AppProvider({ children }: AppProviderProps) {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    const setCategories: SetCategories = categories => {
        return dispatch({
            type: Type.SET_CATEGORIES,
            payload: categories,
        });
    };

    const setSelectedCategory: SetSelectedCategory = category => {
        return dispatch({
            type: Type.SET_SELECTED_CATEGORY,
            payload: category,
        });
    };

    const toggleShowCategories: ToggleShowCategories = () => {
        return dispatch({
            type: Type.TOGGLE_SHOW_CATEGORIES,
            payload: !state.showCategories,
        });
    };

    const setProducts: SetProducts = products => {
        return dispatch({
            type: Type.SET_PRODUCTS,
            payload: products,
        });
    };

    useEffect(() => {
        Promise.all([getCategories(), getProducts()]).then(([categories, products]) => {
            setCategories(categories);
            setProducts(products);
        });
    }, []);

    return (
        <AppContext.Provider value={{ ...state, setSelectedCategory, toggleShowCategories }}>
            {children}
        </AppContext.Provider>
    );
}
