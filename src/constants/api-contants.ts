import { STRING_REPLACE } from "../master-data";

export const API_KEY = `&appid=5c74da0c1cd4ca541feabd5f4f8ef639`;

const LAT_AND_LON = `lat=${STRING_REPLACE.LAT}&lon=${STRING_REPLACE.LON}`;

export const API_URL = {
    LOCATION: `/geo/1.0/direct?q=`,
    FORECAST: `/data/2.5/forecast/hourly?${LAT_AND_LON}`,
    CURRENT_WEATHER: `/data/2.5/weather?${LAT_AND_LON}`
}