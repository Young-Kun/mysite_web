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
        <div id="search">
            <Input search placeholder="Search..." clearable/>
        </div>
        <!--用户菜单-->
        <Dropdown placement="bottom-end" id="user">
            <div class="avatar">
                <img src="@/assets/avatar.jpg" width="36px" height="36px" alt="">
                <span>kun</span>
            </div>
            <DropdownMenu slot="list">
                <DropdownItem>修改密码</DropdownItem>
                <DropdownItem>退出</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </Header>
</template>

<script>
    import DataBasedMenuItems from "@/components/DataBasedMenuItems";

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
        margin-left: auto;
    }

    #user .avatar {
        display: flex;
        align-items: center;
    }

    #user:hover {
        background: #f8f8f9;
    }


</style>