const userName = (state) => {
    return state.userInfo.username
};

const token = (state) => {
    return state.userInfo.token
};

const blogCategories = (state) => {
    return state.blogCategories
};

const blogTags = (state) => {
    return state.blogTags
};

export default {
    userName,
    token,
    blogCategories,
    blogTags,
}