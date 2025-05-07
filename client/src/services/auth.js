import axiosRequest from '../config/axios';
import { SERVER_URL } from '../config/env';

class AuthServices {
    static AUTH_URL = `${SERVER_URL}/auth`;

    static active = async () => {
        try {
            const response = await axiosRequest({
                url: this.AUTH_URL
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    static signup = async signupInputs => {
        try {
            const response = await axiosRequest({
                url: `${this.AUTH_URL}/signup`,
                method: 'POST',
                data: signupInputs
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    static login = async loginInputs => {
        try {
            const response = await axiosRequest({
                url: `${this.AUTH_URL}/login`,
                method: 'POST',
                data: loginInputs
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };

    static logout = async () => {
        try {
            const response = await axiosRequest({
                url: `${this.AUTH_URL}/logout`,
                method: 'POST'
            });

            return response.data;
        } catch (error) {
            return error.response.data;
        }
    };
}

export default AuthServices;
