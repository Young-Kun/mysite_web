import axios from 'axios'
import store from '@/store/index'


const message = (content) => this.$Message.error(content);

const errorHandle = (status, other) => {
    // 状态码判断
    switch (status) {
        // 401 未登录
        case 401:
            message('请先登录！');
            break;
        // 404 请求不存在
        case 404:
            message('请求的资源不存在！');
            break;
        default:
            message(other);
            console.log(other);
    }
};

// 创建axios实例
let instance = axios.create({timeout: 1000 * 12});

// 设置默认post请求头
instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

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
        token && (config.headers.Authorization = token); // 此处需修改
        return config
    },
    error => Promise.error(error)
);

// 响应拦截
axios.interceptors.response.use(
    res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
    error => {
        const { response } = error;
        if (response) {
            // 返回状态码不为2XX的范围
            errorHandle(response.status, response.data.message);
            return Promise.reject(response);
        }else{
            // 处理断网的情况
            // eg:请求超时或断网时，更新state的network状态
            // network状态在app.vue中控制着一个全局的断网提示组件的显示隐藏
            // 关于断网组件中的刷新重新获取数据，会在断网组件中说明
            if (!window.navigator.onLine) {
               store.commit('changeNetwork', false);
            } else {
                return Promise.reject(error);
            }
        }
    }
);

export default instance;