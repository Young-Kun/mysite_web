/**
 * article模块接口列表
 */

import base from './base'; // 导入接口域名列表
import axios from '@/api/axios'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const article = {
    // 文章列表
    articleList () {
        return axios.get(`${base.sq}/articles`);
    },
    // 文章详情
    articleDetail (id) {
        return axios.get(`${base.sq}/article/detail/${id}`);
    },
    // post提交
    articleCreate (params) {
        return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
    }
    // 其他接口…………
};

export default article;
