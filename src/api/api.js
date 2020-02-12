import axios from 'axios'

let host = 'http://127.0.0.1:8000';

// 验证码
export const getVerifyCode = params => {
    return axios.post(`${host}/code/`, params)
};

// 注册
export const registUser = params => {
    return axios.post(`${host}/register/`, params)
};

// 登录
export const loginUser = params => {
    return axios.post(`${host}/login/`, params)
};