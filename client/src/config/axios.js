import axios from 'axios';
import { SERVER_URL } from './env';

const axiosRequest = axios.create({
    baseURL: SERVER_URL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default axiosRequest;
