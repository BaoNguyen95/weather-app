import { useCallback, useContext, useEffect, useState } from "react";
import { COUNTRIES } from "../../master-data";
import WeatherService from "../../service/weather.service";
import { AppContext } from "../../context/app.context";
import ActionTypes from "../../context/constants";
import { IWeather } from "../../models";
import SideBarComponent from "../../components/side-bar";
import Forecast from "../forecast";

const HomePage = () => {

    const [currentWeather, setCurrentWeather] = useState<IWeather | string>("");

    const defaultCountry = COUNTRIES.find(c => c.Code === "SG");

    const { dispatch } = useContext(AppContext);

    const getCountryInfo = useCallback(async () => {
        const weatherService = new WeatherService(defaultCountry?.Name as string);
        const response = await weatherService.getDefaultCountryInfo();
        if (response instanceof String) {

        } else {
            dispatch({ type: ActionTypes.Country, payload: response[0] });
            const currentWeather = await weatherService.getCurrentWeather();
            setCurrentWeather(currentWeather);
        }
    }, [defaultCountry, dispatch]);

    useEffect(() => {
        getCountryInfo();
    }, [dispatch, getCountryInfo]);

    return <div className="home-page">
        <SideBarComponent />

        <Forecast currentWeather={currentWeather} />

    </div>
}

export default HomePage;