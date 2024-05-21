import { AxiosError } from "axios";
import { API_URL, ERROR_MESSAGE } from "../constants";
import { StringReplace } from "../master-data";
import { ErrorType, IApiCode, ICountry, IForecast, IWeather } from "../models";
import HttpService from "./http.service";

class WeatherService {

    httpService: HttpService;
    lon?: string;
    lat?: string;

    constructor() {
        this.httpService = new HttpService();
    }

    private handleError(error: GeolocationPositionError) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                alert("User denied geolocation access.");
                // You can display a message to the user here
                break;
            case error.POSITION_UNAVAILABLE:
                alert("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                alert("The request to get location timed out.");
                break;
            default:
                alert("Geolocation is not supported by this browser.");
        }
    }

    getCurrentLocation(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(({ coords }) => {
                    this.lon = coords.longitude.toString();
                    this.lat = coords.latitude.toString();
                    resolve();
                }, error => {
                    this.handleError(error);
                    reject();
                });
            } else {
                this.handleError({ code: 400 } as GeolocationPositionError);
                reject();
            }
        })
    }

    async searchWeatherByCountry(search: string): Promise<string | IWeather> {
        try {
            const url = API_URL.LOCATION + search;
            const result: Array<ICountry> = await this.httpService.get(url);
            this.lon = String(result[0].lon);
            this.lat = String(result[0].lat);
            return await this.getCurrentWeather();
        }
        catch (error: any) {
            return error;
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

    async getCountryList(search: string): Promise<ICountry[] | ErrorType> {
        try {
            const url = API_URL.LOCATION + search + "&limit=10";
            const result: ICountry[] = await this.httpService.get(url);
            if (result.length !== 0) {
                return result;
            } else {
                return ERROR_MESSAGE.INVALID_COUNTRY as ErrorType;
            }
        } catch (error) {
            return error as ErrorType;
        }
    }
}

export default new WeatherService();