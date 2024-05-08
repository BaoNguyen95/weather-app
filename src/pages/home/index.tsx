import { useCallback, useContext, useEffect, useState } from "react";
import { COUNTRIES } from "../../master-data";
import WeatherService from "../../service/weather.service";
import { AppContext } from "../../context/app.context";
import ActionTypes from "../../context/constants";
import { IWeather } from "../../models";
import SideBarComponent from "../../components/side-bar";
import WeatherInformation from "../../components/weather-information";
import SearchPage from "../search-page";
import "./index.scss";

const HomePage = () => {

    const [currentWeather, setCurrentWeather] = useState<IWeather | string>("");
    const [forecast, setForecast] = useState<IWeather[] | string>("");
    const [isSearch, setIsSearch] = useState(false);
    const [defaultCountry, setDefaultCountry] = useState(COUNTRIES.find(c => c.Code === "SG"));

    const { dispatch } = useContext(AppContext);

    const onSearch = (country: string) => {
        setDefaultCountry(COUNTRIES.find(c => c.Code === country));
        setIsSearch(!isSearch);
    };

    const getCountryInfo = useCallback(async () => {
        const weatherService = new WeatherService(defaultCountry?.Name as string);
        const response = await weatherService.getDefaultCountryInfo();
        if (response instanceof String) {

        } else {
            dispatch({ type: ActionTypes.Country, payload: response[0] });

            const currentWeather = await weatherService.getCurrentWeather();
            const forecast = await weatherService.getFiveDayForecast();

            setCurrentWeather(currentWeather);
            setForecast(forecast);
        }
    }, [defaultCountry, dispatch]);

    useEffect(() => {
        getCountryInfo();
    }, [dispatch, getCountryInfo]);

    return <div className="wa-home-page">
        <SideBarComponent onClickSearchIcon={() => setIsSearch(true)} onClickCountry={() => setIsSearch(false)} />
        {isSearch ? <SearchPage onSearch={onSearch} /> : <WeatherInformation currentWeather={currentWeather} forecast={forecast} />}

    </div>
}

export default HomePage;