import axios from 'axios';

const service = axios.create({
    //本地
    // baseURL: 'http://124.156.139.172:8080',
    //47服务器
    // baseURL: 'http://47.103.39.109:15465/api',
    // baseURL:'http://192.168.11.234:15465/api',
    // baseURL:'http://120.26.176.118:8088',
    // baseURL:'http://bspwallet.free.idcfengye.com',
    baseURL:'http://localhost:8088',
    timeout: 5000
});

service.interceptors.request.use(
    config => {
        // config.headers['Content-Type'] = 'text/plain' ;// 关键所在
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
