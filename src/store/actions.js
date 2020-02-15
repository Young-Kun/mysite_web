import * as types from '@/store/MutationTypes'

function makeAction(type) {
    return ({commit}, ...args) => commit(type, ...args)
}

const setInfo = makeAction(types.SET_INFO);

export default {
    setInfo
}