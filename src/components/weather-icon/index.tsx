import { API_URL } from "../../constants";
import { StringReplace } from "../../master-data";

interface IProp {
    icon: string;
    className: string;
}
const WeatherIcon = (props: IProp) => {
    const { className, icon } = props;

    // This image can be used by lazy loading image to enhance performance
    return <img className={className} src={API_URL.WEATHER_ICON.replace(StringReplace.One, icon)} alt="Weather Icon" />
}

export default WeatherIcon;