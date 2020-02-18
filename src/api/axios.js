import axios from 'axios'
import store from '@/store/index'


// 创建axios实例
let instance = axios.create({timeout: 1000 * 12});


/**
 * 请求拦截
 * 每次请求前，如果存在token则在请求头中携带token
 */
instance.interceptors.request.use(
    config => {
        // 每次发送请求之前判断vuex中是否存在token
        // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
        // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
        const token = store.state.userInfo.token;
        token && (config.headers.Authorization = `JWT ${token}`);
        return config
    },
    error => Promise.reject(error)
);

export default instance;