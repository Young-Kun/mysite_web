import * as types from '@/store/MutationTypes'
import cookie from "@/store/cookie"

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
        return Promise.resolve(state.modalState.loginIsShow = true);
    },
    [types.CLOSE_LOGIN](state) {
        return Promise.resolve(state.modalState.loginIsShow = false);
    },
    [types.SHOW_REGISTER](state) {
        return Promise.resolve(state.modalState.registerIsShow = true);
    },
    [types.CLOSE_REGISTER](state) {
        return Promise.resolve(state.modalState.registerIsShow = false);
    },
    [types.ADD_BLOG_CATEGORIES](state, blog_category) {
        state.blogCategories.push(blog_category);
    },
    [types.ADD_BLOG_TAGS](state, blog_tag) {
        state.blogTags.push(blog_tag);
    }
}