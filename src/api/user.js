/**
 * user模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/api/axios'; // 导入http中创建的axios实例

const user = {
    // 登录
    logIn (params) {
        return axios.post(`${base.sq}/jwt-token-auth/`, params)
    },
};

export default user;
