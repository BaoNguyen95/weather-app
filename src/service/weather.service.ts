import { API_URL, ERROR_MESSAGE } from "../constants";
import { StringReplace } from "../master-data";
import { ErrorType, IApiCode, IApiResponse, ICountry, IForecast, IWeather } from "../models";
import HttpService from "./http.service";

class WeatherService {

    countryName: string;
    httpService: HttpService;
    lon?: string;
    lat?: string;

    constructor(countryName: string) {
        this.countryName = countryName;
        this.httpService = new HttpService();
    }

    async getDefaultCountryInfo(): Promise<Array<ICountry> | ErrorType> {
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

    async getCurrentWeather(): Promise<IWeather | ErrorType> {
        try {
            if (this.lon && this.lat) {
                const url = API_URL.CURRENT_WEATHER.replace(StringReplace.One, this.lon).replace(StringReplace.Two, this.lat);
                const result: IWeather = await this.httpService.get(url);
                return result;
            }
            return ERROR_MESSAGE.COUNTRY_NOT_FOUND as ErrorType;
        } catch (error) {
            return error as ErrorType;
        }
    }

    async getFiveDayForecast(): Promise<IWeather[] | ErrorType> {
        try {
            if (this.lon && this.lat) {
                const url = API_URL.FORECAST.replace(StringReplace.One, this.lon).replace(StringReplace.Two, this.lat);
                const result: IForecast = await this.httpService.get(url);
                return result.cod === IApiCode.Success ? result.list : ERROR_MESSAGE.COUNTRY_NOT_FOUND;
            }
            return ERROR_MESSAGE.COUNTRY_NOT_FOUND as ErrorType;
        } catch (error) {
            return error as ErrorType;
        }
    }
}

export default WeatherService;