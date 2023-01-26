import { useReducer, useEffect } from "react";

import AppContext from "./AppContext";
import AppReducer from "./AppReducer";
import initialState from "./initialState";
import { getCategories } from "services";

import type { SetCategories, SetSelectedCategory, ToggleShowCategories } from "./types";
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

    useEffect(() => {
        getCategories().then(categories => setCategories(categories));
    }, []);

    return (
        <AppContext.Provider value={{ ...state, setSelectedCategory, toggleShowCategories }}>
            {children}
        </AppContext.Provider>
    );
}
