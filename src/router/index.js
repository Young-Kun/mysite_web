import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        redirect: {name: 'index'}
    },
    {
        path: '/index',
        name: 'index',
        component: () => import("@/views/Index")
    },
    {
        path: '/blogs',
        name: 'blogs',
        component: () => import("@/views/BlogList"),
    },
    {
        path: '/blog-detail/:articleId',
        name: 'blog-detail',
        props: true,
        component: () => import("@/views/BlogDetail")
    },
    {
        path: '/blog-create',
        name: 'blog-create',
        component: () => import("@/views/BlogCreate")
    },
    {
        path: '/user-center',
        name: 'user-center',
        component: () => import("@/views/UserCenter")
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
});

export default router
