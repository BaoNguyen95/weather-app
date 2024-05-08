import Axios, { AxiosRequestConfig } from "axios";
import { API_KEY } from "../constants/api-constants";

Axios.defaults.baseURL = "http://api.openweathermap.org";

class HttpService {
    private setHeader = () => {
        const headers = {
           
        }
        return headers;
    }

    get = async (url: string, config?: AxiosRequestConfig) => {
        const result = await Axios.create({ headers: this.setHeader() })
            .get(url + API_KEY, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response;
            });

        return result
    }

    post = async (url: string, body: any, config?: AxiosRequestConfig) => {
        const result = await await Axios.create({ headers: this.setHeader() })
            .post(url + API_KEY, body, config)
            .then(response => {
                return response.data;
            })
            .catch(error => {
                return error.response;
            });
        return result
    }
}

export default HttpService;