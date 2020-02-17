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
    },
    [types.SHOW_LOGIN](state) {
        state.modalState.loginIsShow = true;
    },
    [types.CLOSE_LOGIN](state) {
        state.modalState.loginIsShow = false;
    },
    [types.SHOW_REGISTER](state) {
        state.modalState.registerIsShow = true;
    },
    [types.CLOSE_REGISTER](state) {
        state.modalState.registerIsShow = false;
    },
}