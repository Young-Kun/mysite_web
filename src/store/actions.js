import * as types from '@/store/MutationTypes'

function makeAction(type) {
    return ({commit}, ...args) => commit(type, ...args)
}

const setInfo = makeAction(types.SET_INFO);
const showLogin = makeAction(types.SHOW_LOGIN);
const showRegister = makeAction(types.SHOW_REGISTER);

export default {
    setInfo,
    showLogin,
    showRegister,
}