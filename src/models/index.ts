// in /models/ folder, this file will be a root folder, every modals file will be imported here.
// in this project, I just need to define some modals so don't need to separate it.
interface ILonLat {
    lat: number;
    lon: number;
}

export interface ICountry extends ILonLat {
    code: number;
    zip: string;
    name: string;
    country: string;
    state?: string;
    sys: {
        country: string;
    }
}

interface IWeatherDetails {
    id: number;
    main: string;
    description: string;
    icon: string;
}

interface IWind {
    speed: number;
    deg: number;
    gust: number;
}

export enum IApiCode {
    Success = "200",
    Error = "404",
}
export interface IApiResponse<T> {
    cod: IApiCode;
    (arg: T): T
}

export interface IWeather {
    dt_txt: string;
    coord: ILonLat;
    weather: Array<IWeatherDetails>;
    base: string;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
        sea_level: number;
        grnd_level: number;
    },
    visibility: number,
    wind: IWind,
    rain: {
        "1h": number;
    },
    clouds: {
        all: number
    },
    dt: number,
    sys: {
        type: number,
        id: number,
        country: string,
        sunrise: number,
        sunset: number
    },
    timezone: number,
    id: number,
    name: string,
}

export interface IForecast {
    list: IWeather[];
    cod: IApiCode;
}

export interface IForecastFormat {
    [key: string]: IWeather[]
}

export type ErrorType = string;