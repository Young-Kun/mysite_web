import * as types from '@/store/MutationTypes'

function makeAction(type) {
    return ({commit}, ...args) => commit(type, ...args)
}

const setInfo = makeAction(types.SET_INFO);
const showLogin = makeAction(types.SHOW_LOGIN);
const closeLogin = makeAction(types.CLOSE_LOGIN);
const showRegister = makeAction(types.SHOW_REGISTER);
const closeRegister = makeAction(types.CLOSE_REGISTER);
const addBlogCategory = makeAction(types.ADD_BLOG_CATEGORIES);
const addBlogTag = makeAction(types.ADD_BLOG_TAGS);
const collapseSider = makeAction(types.COLLAPSE_SIDER);
const expandSider = makeAction(types.EXPAND_SIDER);


export default {
    setInfo,
    showLogin,
    closeLogin,
    showRegister,
    closeRegister,
    addBlogCategory,
    addBlogTag,
    collapseSider,
    expandSider
}