import BoxContainer from "../box-container";
import CurrentWeatherComponent from "../current-weather";
import ForecastComponent from "../forecast";
import { IWeather } from "../../models";
import { formatForecast } from "../../utils";
import "./index.scss";

interface IProps {
    currentWeather: IWeather | string;
    forecast: IWeather[] | string;
}

const WeatherInformation = (props: IProps) => {
    const { currentWeather, forecast } = props;

    const renderForecast = (data: IWeather[]) => {
        const formatData = formatForecast(data);
        return Object.keys(formatData).map((date, i) => {
            const title = i === 0 ? "Today" : new Date(date).toLocaleDateString('en-US', { month: 'long', day: 'numeric' });
            return <ForecastComponent key={title} title={title} data={formatData[date]} />
        })
    }

    return (
        <div className="wa-forecast-container">
            <CurrentWeatherComponent data={currentWeather} />
            <BoxContainer title="5 days forecast (3 Hours)">
                {typeof forecast === "string" ? forecast : renderForecast(forecast)}
            </BoxContainer>
        </div>
    )
}

export default WeatherInformation;