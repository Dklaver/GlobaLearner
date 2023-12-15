import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000/',
});

// Add a request interceptor
instance.interceptors.request.use(
    (config) => {
        
        // Add the Authorization header if a JWT token is available

        const jwtToken = localStorage.getItem('jwt');

        if (jwtToken) {
            config.headers['Authorization'] = `Bearer ${jwtToken}`;
        }

        return config;
    },
    (error) => {
        // Do something with request error
        return Promise.reject(error);
    }
);

export default instance;