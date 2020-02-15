const userName = (state) => {
    return state.userInfo.username
};

const token = (state) => {
    return state.userInfo.token
};

export default {
    userName,
    token
}