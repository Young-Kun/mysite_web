import cookie from "@/store/cookie";

const userInfo = {
    username: cookie.getCookie('username') || '',
    userid: cookie.getCookie('userid') || '',
    token: cookie.getCookie('token') || ''
};

export default {
    userInfo
};
