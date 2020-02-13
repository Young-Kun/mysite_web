import axios from 'axios'

let host = 'http://127.0.0.1:8000';

// method: 请求方法
// assets: 资源名称
// params: request中包含的请求参数
export const apiQuery = (method, url, data) => {
    return axios({
        method: method,
        url: `${host}` + '/' + url + '/',
        data: data
    })
};
