import { API_URL } from "../constants/api-contants";
import { STRING_REPLACE } from "../master-data";
import { ICountry, IWeather } from "../models";
import HttpService from "./http.service";

class WeatherService {

    countryName: string;
    httpService: HttpService;
    lon: string | undefined;
    lat: string | undefined;

    constructor(countryName: string) {
        this.countryName = countryName;
        this.httpService = new HttpService();
    }

    async getDefaultCountryInfo(): Promise<Array<ICountry> | string> {
        try {
            const url = API_URL.LOCATION + this.countryName;
            const result: Array<ICountry> = await this.httpService.get(url);
            this.lon = String(result[0].lon);
            this.lat = String(result[0].lat);
            return result;
        } catch (error) {
            return error as string;
        }
    }

    async getCurrentWeather(): Promise<IWeather | string> {
        try {
            if (this.lon && this.lat) {
                const url = API_URL.CURRENT_WEATHER.replace(STRING_REPLACE.LON, this.lon).replace(STRING_REPLACE.LAT, this.lat);
                const result: IWeather = await this.httpService.get(url);
                return result;
            }
            return "Country is undefined.";
        } catch (error) {
            return error as string;
        }
    }
}

export default WeatherService;