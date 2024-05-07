import { createContext } from "react";

type AppContextType = {
  
};

const initState: AppContextType = {

}

const AppContext = createContext<AppContextType>(initState);

export default AppContext;