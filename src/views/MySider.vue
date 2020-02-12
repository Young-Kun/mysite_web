<template>
    <Sider id="sider">
        <div id="brand">
            LOGO
        </div>
        <keep-alive>
            <Menu theme="dark" accordion width="auto" id="sider-menu">
                <div v-for="(menu, idx) in siderMenuList" :key="idx">
                    <div v-if="menu.menu_items">
                        <Submenu :name=menu.name>
                            <template slot="title">
                                <Icon :type=menu.icon />
                                <span>{{ menu.span }}</span>
                            </template>
                            <MenuItem v-for="(item, idx) in menu.menu_items" :key="idx" :name=item.name>
                                <Icon :type=item.icon />
                                <span>{{ item.span }}</span>
                            </MenuItem>
                        </Submenu>
                    </div>
                    <div v-else>
                        <MenuItem :name=menu.name>
                            <Icon :type=menu.icon />
                            <span>{{ menu.span }}</span>
                        </MenuItem>
                    </div>
                </div>
            </Menu>
        </keep-alive>
    </Sider>
</template>

<script>
    export default {
        name: "MySider",
        data() {
            return {
                isCollapsed: false,
                siderMenuList: [
                    {
                        name: 'contents',
                        icon: 'ios-paper',
                        span: '内容管理',
                        menu_items: [
                            {name: 'articles', icon: '', span: '文章管理'},
                            {name: 'comments', icon: '', span: '评论管理'},
                        ]
                    },
                    {
                        name: 'users',
                        icon: 'ios-people',
                        span: '用户管理'
                    },
                    {
                        name: 'stats',
                        icon: 'ios-stats',
                        span: '统计分析',
                        menu_items: [
                            {name: 'favors', icon: '', span: '偏好分析'},
                            {name: 'periods', icon: '', span: '活跃时段'},
                        ]
                    },
                ]
            };
        },
    }
</script>

<style scoped>
    #sider {
        position: sticky;
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