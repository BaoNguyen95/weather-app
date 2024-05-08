import { IForecastFormat, IWeather } from "../models";

export const convertKelvinToCelsius = (K: number, fixed?: boolean) => {
    const result = (K - 273.15);
    return fixed ? result.toFixed(0) : result.toFixed(2);
}

export const formatForecast = (data: IWeather[]): IForecastFormat => {
    let dates = [...new Set(data.map(f => f.dt_txt.slice(0, 10)))];
    const result = {} as IForecastFormat;
    data.forEach(d => {
        dates.forEach(_d => {
            if (d.dt_txt.includes(_d)) {
                if (!result[_d]) {
                    result[_d] = []
                }
                result[_d].push(d);
            }
        });
    })
    return result;
}

export const convertMetersToKilometers = (meters: number) => meters / 1000;