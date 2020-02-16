<template>
    <Header id="header">
        <!--折叠触发器-->
        <div id="sider-toggle">
            <Icon type="md-menu" size="20"/>
        </div>
        <!--菜单-->
        <keep-alive>
            <Menu mode="horizontal" theme="light">
                <data-based-menu-items :menu-list-data=topMenuList></data-based-menu-items>
            </Menu>
        </keep-alive>
        <!--搜索框-->
        <div id="search" style="margin-right: auto">
            <Input search placeholder="Search..." clearable/>
        </div>
        <Menu v-if="!userName" mode="horizontal" theme="light" style="padding: 0 24px">
            <!--注册按钮-->
            <a type="text" @click.prevent="handleShowRegisterModal">注册</a>
            <Modal v-model="showRegisterModal"
                   footer-hide
                   :mask-closable="false"
                   style="text-align: center"
                   @on-visible-change="handleFocus('registerComponent', $event)">
                <register ref="registerComponent" style="width: 60%" @goto-login="gotoLogin"
                          @register-success="handleRegisterSuccess"></register>
            </Modal>
            <Divider type="vertical"></Divider>
            <!--登录按钮-->
            <a type="text" @click.prevent="handleShowLoginModal">登录</a>
            <Modal v-model="showLoginModal"
                   footer-hide
                   :mask-closable="false"
                   style="text-align: center"
                   @on-visible-change="handleFocus('loginComponent', $event)">
                <login ref="loginComponent" style="width: 60%" @goto-register="gotoRegister"
                       @login-success="handleLoginSuccess"></login>
            </Modal>
        </Menu>
        <!--用户菜单-->
        <Dropdown v-if="userName" placement="bottom-end" id="user" @on-click="handleUserMenuClick" style="margin-right: 24px">
            <div class="avatar">
                <img src="@/assets/avatar.jpg" width="36px" height="36px" alt="">
                <span>{{ userName }}</span>
            </div>
            <DropdownMenu slot="list" class="user-menu">
                <DropdownItem name="change-password">修改密码</DropdownItem>
                <DropdownItem name="logout"><Icon type="ios-log-out" /><span>退出</span></DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </Header>
</template>

<script>
    import DataBasedMenuItems from "@/components/DataBasedMenuItems";
    import Login from "@/views/Login";
    import Register from "@/views/Register";
    import cookie from "@/store/cookie";
    import {mapGetters, mapActions} from 'vuex';

    export default {
        name: "MyHeader",
        components: {
            Register,
            Login,
            DataBasedMenuItems
        },
        data() {
            return {
                showRegisterModal: false,
                showLoginModal: false,
                topMenuList: [
                    {
                        id: 1,
                        name: 'guide',
                        icon: 'ios-book',
                        span: '指南'
                    },
                    {
                        id: 2,
                        name: 'quick_start',
                        icon: 'ios-bicycle',
                        span: '快速入门'
                    },
                    {
                        id: 3,
                        name: 'eco',
                        icon: 'ios-cart',
                        span: '商城',
                        menu_items: [
                            {id: 1, name: 'books', icon: '', span: '书籍'},
                            {id: 2, name: 'videos', icon: '', span: '视频学习'},
                        ]
                    }
                ]
            }
        },
        computed: {
            ...mapGetters(['userName']),
        },
        methods: {
            ...mapActions(['setInfo']),
            gotoRegister() {
                this.showLoginModal = false;
                this.showRegisterModal = true;
            },
            gotoLogin() {
                this.showRegisterModal = false;
                this.showLoginModal = true;
            },
            handleShowLoginModal() {
                this.showLoginModal = true;
            },
            handleShowRegisterModal() {
                this.showRegisterModal = true;
            },
            handleFocus(name, isShow) {
                if (isShow) {
                    this.$nextTick(() => {
                        this.$refs[name].focusUser();
                    })
                }
            },
            handleLoginSuccess() {
                this.$Message.success('登录成功！');
                this.showLoginModal = false;
            },
            handleRegisterSuccess() {
                this.$Message.success('注册成功！');
                this.showRegisterModal = false;
            },
            handleUserMenuClick(name) {
                if (name === 'logout') {
                    cookie.delCookie('username');
                    cookie.delCookie('userid');
                    cookie.delCookie('token');
                    this.setInfo();
                    this.$Message.success('退出成功')
                }
            }
        }
    }
</script>

<style scoped>
    #header {
        position: sticky;
        top: 0;
        z-index: 1000;
        padding: 0;
        box-shadow: 0 0 6px 1px rgba(53, 64, 82, 0.1);
        display: flex;
        flex-flow: row nowrap;
        background: #fff;
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
        display: inline-block;
        width: 260px;
        padding: 0 20px;
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