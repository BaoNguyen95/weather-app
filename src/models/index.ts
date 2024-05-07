interface ILonLat {
    lat: number;
    lon: number;
}

export interface ICountry extends ILonLat {
    code: number;
    zip: string;
    name: string;
    country: string;
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

export interface IWeather {
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
    cod: number
}  