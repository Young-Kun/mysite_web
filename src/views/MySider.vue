<template>
    <Sider id="sider" collapsed-width="0" collapsible v-model="isCollapsed" hide-trigger>
        <div id="brand" @click="backToIndex">
            LOGO
        </div>
        <keep-alive>
            <Menu theme="dark" accordion width="auto" id="sider-menu">
                <data-based-menu-items :menu-list-data=siderMenuList></data-based-menu-items>
            </Menu>
        </keep-alive>
    </Sider>
</template>

<script>
    import DataBasedMenuItems from "@/components/DataBasedMenuItems";

    export default {
        name: "MySider",
        components: {
            DataBasedMenuItems
        },
        data() {
            return {
                isCollapsed: false,
                siderMenuList: [
                    // {
                    //     id: 1,
                    //     name: 'contents',
                    //     icon: 'ios-paper',
                    //     span: '查看文章',
                    //     menu_items: [
                    //         {id: 1, name: 'articles', icon: '', span: '文章列表'},
                    //         {id: 2, name: 'comments', icon: '', span: '评论管理'},
                    //     ]
                    // },
                    {
                        id: 1,
                        name: 'write',
                        icon: 'ios-book',
                        span: '写文章',
                        to: {name: 'blog-create'},
                        menu_items: ''
                    },
                    {
                        id: 2,
                        name: 'articles',
                        icon: 'ios-paper',
                        span: '查看文章',
                        to: {name: 'blogs'},
                        menu_items: ''
                    },
                    // {
                    //     id: 3,
                    //     name: 'stats',
                    //     icon: 'ios-stats',
                    //     span: '统计分析',
                    //     menu_items: [
                    //         {id: 1, name: 'favors', icon: '', span: '偏好分析', to: {name: 'blogs'}},
                    //         {id: 2, name: 'periods', icon: '', span: '活跃时段'},
                    //     ]
                    // },
                ]
            };
        },
        methods: {
            backToIndex() {
                this.$router.push({name: 'index'}).catch(() => {});
            }
        }
    }
</script>

<style scoped>
    #sider {
        position: fixed;
        top: 0;
        left: 0;
        height: 100vh;
        z-index: 1000;
    }

    #brand {
        height: 64px;
        line-height: 64px;
        color: #fff;
        text-align: center;
        font-size: xx-large;
        border-bottom: 1px solid #101117;
        cursor: pointer;
    }

    #sider-menu {
        overflow-y: auto;
        overflow-x: hidden;
        height: calc(100vh - 64px);
    }

    #sider-menu::-webkit-scrollbar {
        display: none;
    }
</style>