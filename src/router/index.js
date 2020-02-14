import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {path: '/blogs', name: 'blogs', component: () => import("@/views/BlogList")},
    {path: '/blog/detail', name: 'blog-detail', component: () => import("@/views/BlogDetail")}
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
