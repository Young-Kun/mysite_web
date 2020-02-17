/* eslint-disable */

import axios from 'axios'
import store from '@/store'

// http request 拦截器
axios.interceptors.request.use(
    config => {
        if (store.state.userInfo.token) {
            config.headers.Authorization = `JWT ${store.state.userInfo.token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
);