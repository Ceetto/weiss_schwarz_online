import axios from "axios";
import {useNavigate} from "react-router-dom";

const api = axios.create({
    baseURL: `//${process.env.REACT_APP_API_URL_LOCAL}`,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use(
    (config) => {
        const access = localStorage.getItem('access');
        if (access) {
            config.headers.Authorization = `Bearer ${access}`;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);


api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if ((error.response.status === 401 || error.response.status === 403) && !originalRequest._retry) {
            originalRequest._retry = true;
            try {
                const refresh = localStorage.getItem('refresh');
                const response = await axios.post(`${api.defaults.baseURL}/auth/login/refresh/`, { "refresh": refresh });
                const access = response.data['access'];
                localStorage.setItem('access', access);
                originalRequest.headers.Authorization = `Bearer ${access}`;
                return axios(originalRequest);
            } catch (err:any) {
                return Promise.reject(err);
            }
        }

        return Promise.reject(error);
    }
);

export default api;
