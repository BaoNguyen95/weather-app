import { StringReplace } from "../master-data";

export const API_KEY = `&appid=5c74da0c1cd4ca541feabd5f4f8ef639`;

const LAT_AND_LON = `lat=${StringReplace.Two}&lon=${StringReplace.One}`;

const dataVersion = `/data/2.5`;

export const API_URL = {
    LOCATION: `/geo/1.0/direct?q=`,
    FORECAST: `${dataVersion}/forecast?${LAT_AND_LON}`,
    CURRENT_WEATHER: `${dataVersion}/weather?${LAT_AND_LON}`,
    WEATHER_ICON: `https://openweathermap.org/img/wn/${StringReplace.One}@2x.png`,
}