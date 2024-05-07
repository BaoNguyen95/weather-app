import { IWeather } from "../../models";
import "./index.scss";

interface IProps {
    data: IWeather | string;
}

const CurrentWeatherComponent = (props: IProps) => {
    const { data } = props;

    return <div className="wa-current-weather__container">
        {typeof data === "string" ?
            data :
            <div>
                {data.clouds.all}
            </div>
        }
    </div>
}

export default CurrentWeatherComponent;