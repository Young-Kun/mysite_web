<template>
    <Header id="header">
        <!--折叠触发器-->
        <div id="sider-toggle">
            <Icon type="md-menu" size="20"/>
        </div>
        <!--菜单-->
        <Row style="width: 100%">
            <i-col :span="6">
                <keep-alive>
                    <Menu mode="horizontal" theme="light">
                        <data-based-menu-items :menu-list-data=topMenuList></data-based-menu-items>
                    </Menu>
                </keep-alive>
            </i-col>
            <i-col :xs="0" :lg="6">
                <!--搜索框-->
                <div id="search">
                    <Input search placeholder="Search..." clearable/>
                </div>
            </i-col>
            <i-col :xs="18" :lg="12" style="display: flex">
                <div style="margin-right: auto"></div>
                <Menu v-if="!userName" mode="horizontal" theme="light" style="padding: 0 24px">
                    <!--注册按钮-->
                    <a @click.prevent="handleShowRegisterModal">注册</a>
                    <Divider type="vertical"></Divider>
                    <!--登录按钮-->
                    <a @click.prevent="handleShowLoginModal">登录</a>
                </Menu>
                <!--用户菜单-->
                <Dropdown v-if="userName" placement="bottom-end" id="user" @on-click="handleUserMenuClick"
                          style="margin-right: 24px">
                    <div class="avatar">
                        <img src="@/assets/avatar.jpg" width="36px" height="36px" alt="">
                        <span>{{ userName }}</span>
                    </div>
                    <DropdownMenu slot="list" class="user-menu">
                        <DropdownItem name="user-center">个人中心</DropdownItem>
                        <DropdownItem name="change-password">修改密码</DropdownItem>
                        <DropdownItem name="logout">
                            <Icon type="ios-log-out"/>
                            <span>退出</span>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </i-col>
        </Row>
    </Header>
</template>

<script>
    import DataBasedMenuItems from "@/components/DataBasedMenuItems";
    import cookie from "@/store/cookie";
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "MyHeader",
        components: {
            DataBasedMenuItems
        },
        data() {
            return {
                topMenuList: [
                    {
                        id: 1,
                        name: 'guide',
                        icon: 'ios-book',
                        span: '写博客',
                        to: {name: 'blog-create'}
                    },
                    {
                        id: 2,
                        name: 'quick_start',
                        icon: 'ios-bicycle',
                        span: '看博客',
                        to: {name: 'blogs'}
                    },
                    // {
                    //     id: 3,
                    //     name: 'eco',
                    //     icon: 'ios-cart',
                    //     span: '凑数的',
                    //     menu_items: [
                    //         {id: 1, name: 'books', icon: '', span: '书籍'},
                    //         {id: 2, name: 'videos', icon: '', span: '视频学习'},
                    //     ]
                    // }
                ]
            }
        },
        computed: {
            ...mapGetters([
                'userName',
            ]),
        },
        methods: {
            ...mapActions([
                'setInfo',
                'showLogin',
                'showRegister',
            ]),
            handleShowLoginModal() {
                this.showLogin();
            },
            handleShowRegisterModal() {
                this.showRegister();
            },
            handleUserMenuClick(name) {
                if (name === 'logout') {
                    cookie.delCookie('username');
                    cookie.delCookie('userid');
                    cookie.delCookie('token');
                    this.setInfo();
                    this.$Message.success('退出成功');
                }
                if (name === 'user-center') {
                    this.$router.push({name: 'user-center'}).catch(() => {
                    });
                }
            }
        }
    }
</script>

<style scoped>
    #header {
        position: fixed;
        top: 0;
        right: 0;
        padding: 0;
        z-index: 1000;
        box-shadow: 0 0 6px 1px rgba(53, 64, 82, 0.1);
        background: #fff;
        display: flex;
        flex-flow: row nowrap;
    }

    .sider-expanded #header {
        width: calc(100% - 200px);
    }

    .sider-collapsed #header {
        width: 100%;
    }

    .menu-items-wrapper {
        display: flex;
        height: 64px;
        line-height: 64px;
    }

    .ivu-menu-horizontal.ivu-menu-light:after {
        height: 0;
    }

    #sider-toggle {
        display: flex;
        cursor: pointer;
        padding: 10px;
    }

    #sider-toggle:hover {
        background: #f8f8f9;
    }

    #sider-toggle i {
        margin: auto;
    }

    #search {
        width: 260px;
        padding: 0 20px;
        display: inline-block;
    }

    #user {
        cursor: pointer;
        padding: 0 10px;
    }

    #user .avatar {
        display: flex;
        align-items: center;
    }

    #user:hover {
        background: #f8f8f9;
    }

    .user-menu i {
        margin-right: 6px;
    }

</style>