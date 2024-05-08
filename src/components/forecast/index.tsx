import { IWeather } from "../../models";
import { convertKelvinToCelsius } from "../../utils";
import WeatherIcon from "../weather-icon";
import "./index.scss";

interface IProps {
    data: IWeather[];
    title: string;
}
const ForecastComponent = (props: IProps) => {

    const { data, title } = props;

    return <div className="wa-forecast">
        <div className="wa-forecast__title">{title}</div>
        {data.map(d => {
            const time = d.dt_txt.split(" ")[1].slice(0, 5);
            const tempMax = convertKelvinToCelsius(d.main.temp_max);
            const tempMin = convertKelvinToCelsius(d.main.temp_min);

            return (
                <div className="wa-forecast__item" key={d.id}>
                    <div className="wa-forecast__left">
                        <span className="wa-forecast__left__time">{time}</span>
                        <div className="wa-forecast__left__weather">
                            <WeatherIcon className="wa-forecast__left__weather__icon" icon={d.weather[0].icon} />
                            <span className="wa-forecast__left__weather__temp">{tempMax} / {tempMin}°C</span>
                        </div>

                    </div>
                    <div className="wa-forecast__right">{d.weather[0].description.toLowerCase()}</div>
                </div>
            )
        })}
    </div>
}

export default ForecastComponent;