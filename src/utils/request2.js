import axios from 'axios';

const service = axios.create({

    // baseURL:'http://192.168.11.234:15465/api',
    // baseURL:'http://120.26.176.118:8088',
    // baseURL:'http://bspwallet.free.idcfengye.com',
    baseURL:'http://localhost:8088',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        return config;
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

service.interceptors.response.use(
    response => {
        if (response.status === 200) {
            return response.data;
        } else {
            Promise.reject();
        }
    },
    error => {
        console.log(error);
        return Promise.reject();
    }
);

export default service;
