import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { API_KEY } from '../constants/api-constants';

// Set your base URL (replace with your API endpoint)
axios.defaults.baseURL = "http://api.openweathermap.org";

type UseAxiosResponse<T> = {
    response?: AxiosResponse<T>;
    error?: AxiosError;
    loading: boolean;
};

export enum Method {
    GET = "GET",
    POST = "POST"
}

export const useAxios = <T>(axiosParams: AxiosRequestConfig): UseAxiosResponse<T> => {
    const [response, setResponse] = useState<AxiosResponse<T>>();
    const [error, setError] = useState<AxiosError>();
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchData = async (params: AxiosRequestConfig) => {
            params.url = params.url + API_KEY;
            try {
                const result = await axios.request<T>(params);
                setResponse(result);
            } catch (err: any) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData(axiosParams);
    }, [axiosParams]);

    return { response, error, loading };
};
