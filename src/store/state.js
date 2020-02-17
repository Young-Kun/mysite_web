import cookie from "@/store/cookie";

const userInfo = {
    username: cookie.getCookie('username') || '',
    userid: cookie.getCookie('userid') || '',
    token: cookie.getCookie('token') || ''
};

const modalState = {
    loginIsShow: false,
    registerIsShow: false,
};

const blogCategories = [];

const blogTags = [];

export default {
    userInfo,
    modalState,
    blogCategories,
    blogTags,
};
