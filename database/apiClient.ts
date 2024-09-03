import axios, {AxiosInstance} from "axios";
import queryString from "query-string";
class Http {
    instance: AxiosInstance
    constructor(){
        this.instance = axios.create({
            baseURL: 'http://localhost:3000/api/',
            headers:{
                'Content-Type': 'application/json',
                
            },
            timeout: 10000,
        })
    }
}

const axiosClient = new Http().instance;

export default axiosClient;