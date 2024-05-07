import { InitStateType } from './app.context';
import ActionTypes from './constants';

const AppReducer = (state: InitStateType, action: any) => {
    switch (action.type) {
        case ActionTypes.Country:
            return { ...state, country: action.payload }
        case ActionTypes.Forecast:
            return { ...state, forecast: action.payload }
        default:
            return state;
    }
};

export default AppReducer;
