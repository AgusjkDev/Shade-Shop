import { Type } from "./enums";

export type SetCategories = (categories: Category[]) => void;
export type SetSelectedCategory = (category: Category) => void;
export type ToggleShowCategories = () => void;

export type AppAction =
    | {
          type: Type.SET_CATEGORIES;
          payload: Category[];
      }
    | {
          type: Type.SET_SELECTED_CATEGORY;
          payload: Category;
      }
    | {
          type: Type.TOGGLE_SHOW_CATEGORIES;
          payload: boolean;
      };
