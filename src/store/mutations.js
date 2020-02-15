import * as types from '@/store/MutationTypes'
import cookie from "@/store/cookie"
import Vue from 'vue'
import axios from "axios";


Vue.prototype.$http = axios;

export default {
    [types.SET_INFO](state) {
        state.userInfo = {
            username: cookie.getCookie('username'),
            userid: cookie.getCookie('userid'),
            token: cookie.getCookie('token')
        };
        console.log('Mutations: ', state.userInfo)
    }
}