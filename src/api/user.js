/**
 * user模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/api/axios'; // 导入http中创建的axios实例

const user = {
    // 登录
    logIn(username, password) {
        return axios.post(`${base.sq}/jwt-token-auth/`, {username, password})
    },
    // 发送验证码
    sendVerifyCode(account_type, account) {
        return axios.post(`${base.sq}/verify-codes/`, {account_type, account})
    },
    // 注册
    register(account_type, account, code, username, password) {
        return axios.post(`${base.sq}/register/`, {account_type, account, code, username, password})
    }
};

export default user;
