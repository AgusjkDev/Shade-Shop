import { AppState } from "./interfaces";
import { AppAction } from "./types";
import { Type } from "./enums";

export default function AppReducer(state: AppState, action: AppAction): AppState {
    const { type, payload } = action;

    switch (type) {
        case Type.SET_CATEGORIES:
            return {
                ...state,
                categories: [...state.categories, ...payload],
            };

        case Type.SET_SELECTED_CATEGORY:
            return {
                ...state,
                selectedCategory: payload,
            };

        case Type.TOGGLE_SHOW_CATEGORIES:
            return {
                ...state,
                showCategories: payload,
            };

        case Type.SET_PRODUCTS:
            return {
                ...state,
                products: payload,
            };

        default:
            return state;
    }
}
