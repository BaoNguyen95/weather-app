import { createContext, useReducer } from 'react';
import AppReducer from './app.reducer';
import { ICountry } from '../models';

export type InitStateType = {
    country: ICountry | undefined,
    isLoading: boolean,
}

const initialState: InitStateType = {
    country: undefined,
    isLoading: false,
}

const AppContext = createContext<{
    state: InitStateType;
    dispatch: React.Dispatch<any>;
}>({
    state: initialState,
    dispatch: () => null
});

const AppProvider = ({ children }: any) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
};

export { AppContext, AppProvider };