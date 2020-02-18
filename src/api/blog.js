/**
 * article模块接口
 */

import base from './base'; // 导入接口域名列表
import axios from '@/api/axios'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const blog = {
    // 文章分类列表
    blogCategories () {
        return axios.get(`${base.sq}/blog-categories`)
    },
    // 文章标签列表
    blogTags () {
        return axios.get(`${base.sq}/blog-tags`)
    },
    // 文章列表
    blogArticles (params) {
        return axios.get(`${base.sq}/articles`, {params});
    },
    // 文章详情
    blogArticleDetail (id) {
        return axios.get(`${base.sq}/article/detail/${id}`);
    },
    // 创建文章
    blogCreate (params) {
        return axios.post(`${base.sq}/accesstoken`, qs.stringify(params));
    }
};

export default blog;
