import { ReactNode, Suspense } from "react";
import { API_URL } from "../../constants";
import { StringReplace } from "../../master-data";
import { IWeather } from "../../models";
import { convertKelvinToCelsius, convertMetersToKilometers } from "../../utils";
import "./index.scss";
import BoxContainer from "../box-container";
import WeatherIcon from "../weather-icon";

interface IProps {
    data: IWeather | string;
}

type InfoType = {
    label: string;
    value: string | ReactNode;
    unit: string;
}

const CurrentWeatherComponent = (props: IProps) => {
    const { data } = props;

    // The date is not present in API response,
    // but I think, to display current weather means I can get current date.
    const today = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });


    // separate render function to make it clearer.
    const renderWeather = () => {
        const _data = data as IWeather;
        const infos: InfoType[] = [
            { label: "Humidity", value: _data.clouds.all, unit: "%" },
            { label: "Winds", value: _data.wind.speed, unit: "m/s" },
            { label: "Visibility", value: convertMetersToKilometers(_data.visibility), unit: "km" }
        ]

        return (<div className="wa-current-weather__container">
            {!data ? "Loading..." : <><div className="wa-current-weather__date">{today}</div>
                <div className="wa-current-weather__details">
                    <WeatherIcon className="wa-current-weather__icon" icon={_data.weather[0].icon} />
                    <div className="wa-current-weather__temperature">
                        <span className="wa-current-weather__temperature__detail">{convertKelvinToCelsius(_data.main.temp)}°C</span>
                        <span className="wa-current-weather__temperature__description">{_data.weather[0].description}</span>
                    </div>
                </div>
                <div className="wa-current-weather__info">
                    {infos.map(f => {
                        return (<div className="wa-current-weather__info__content" key={f.unit}>
                            <div className="wa-current-weather__info__content__label">{f.label}</div>
                            <span className="wa-current-weather__info__content__value">
                                {f.value}
                                <span className="wa-current-weather__info__content__unit">{f.unit}</span>
                            </span>
                        </div>)
                    })}
                </div></>}
        </div>)
    }

    return <BoxContainer >
        {typeof data === "string" ? <div className="wa-error-message">{data}</div> : renderWeather()}
    </BoxContainer>
}

export default CurrentWeatherComponent;