import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/blogs',
        name: 'blogs',
        component: () => import("@/views/BlogList")
    },
    {
        path: '/blog/blog:articleId',
        name: 'blog-detail',
        props: true,
        component: () => import("@/views/BlogDetail")
    },
    {
        path: '/blog/create',
        name: 'blog-create',
        component: () => import("@/views/BlogCreate")
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
