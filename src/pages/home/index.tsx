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

    const weatherService = WeatherService;

    const [currentWeather, setCurrentWeather] = useState<IWeather | string>("");
    const [forecast, setForecast] = useState<IWeather[] | string>("");
    const [isSearch, setIsSearch] = useState(false);

    const { state: { country }, dispatch } = useContext(AppContext);

    useEffect(() => {
        getCountryInfo();
    }, []);

    const onSearch = (country: string) => {
        weatherService.searchWeatherByCountry(country).then(async (weather) => {
            if (weather) {
                dispatch({ type: ActionTypes.Country, payload: weather });
                const forecast = await weatherService.getFiveDayForecast();
                setCurrentWeather(weather);
                setForecast(forecast);
            }
        });
        setIsSearch(!isSearch);
    };

    const getCountryInfo = async () => {
        weatherService.getCurrentLocation().then(async () => {
            const response = await weatherService.getCurrentWeather();
            if (response instanceof String) {

            } else {
                dispatch({ type: ActionTypes.Country, payload: response });
                const forecast = await weatherService.getFiveDayForecast();
                
                setCurrentWeather(response);
                setForecast(forecast);
            }
        })
    }

    return <div className="wa-home-page">
        <SideBarComponent onClickSearchIcon={() => setIsSearch(true)} onClickCountry={() => setIsSearch(false)} />
        {isSearch ? <SearchPage onSearch={onSearch} /> : <WeatherInformation currentWeather={currentWeather} forecast={forecast} />}

    </div>
}

export default HomePage;