import CurrentWeatherComponent from "../../components/current-weather";
import { IWeather } from "../../models";
import "./index.scss";

interface IProps {
    currentWeather: IWeather | string;
}

const Forecast = (props: IProps) => {

    const { currentWeather } = props;
    
    return (
        <>
            <CurrentWeatherComponent data={currentWeather} />

            <div className="wa-weather__container">
                <span className="wa-weather__title wa-title">5 days forecast (3 Hours)</span>
            </div>
        </>
    )
}

export default Forecast;