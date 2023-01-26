import { createContext } from "react";

import { AppContext } from "./interfaces";

const AppContext = createContext<AppContext>({} as AppContext);

export default AppContext;
