import axios from 'axios';

export default {
    install: function(Vue,) {
        Object.defineProperty(Vue.prototype, '$HTTP', { value: HTTP });
    }
};

export const HTTP = axios.create({
    baseURL: 'http://www.donerben.com:3000/api/',
    // headers: {
    //     Authorization: 'Bearer ' + localStorage.getItem('token'),
    // }
});

HTTP.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => Promise.reject(error)
);

// export const HTTP = axios.create({
//     baseURL: 'http://192.168.0.166:3000/api/',
//     headers: {
//         Authorization: 'Bearer ' + localStorage.getItem('token'),
//     }
// });

