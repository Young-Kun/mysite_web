import cookie from "@/store/cookie";

const userInfo = {
    username: cookie.getCookie('username') || '',
    userid: cookie.getCookie('userid') || '',
    token: cookie.getCookie('token') || ''
};

const state = {
    userInfo
};

export default state