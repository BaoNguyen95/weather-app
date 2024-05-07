import { useEffect } from "react";
import { API_URL } from "../constants/api-contants"
import useAxios from "../hooks"
import { Method } from "../hooks/useAxios";

export const useCurrentWeather = (location: string) => {
    const url = API_URL.LOCATION + location;

    useEffect(() => {
    }, [location]);
    
    return
}