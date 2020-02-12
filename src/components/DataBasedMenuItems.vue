<template>
    <div class="menu-items-wrapper">
        <div v-for="(menu, idx) in menuListData" :key="idx">
            <div v-if="menu.menu_items">
                <Submenu :name=menu.name>
                    <template slot="title">
                        <Icon :type=menu.icon></Icon>
                        <span>{{ menu.span }}</span>
                    </template>
                    <MenuItem v-for="(item, idx) in menu.menu_items" :key="idx" :name=item.name>
                        <Icon :type=item.icon></Icon>
                        <span>{{ item.span }}</span>
                    </MenuItem>
                </Submenu>
            </div>
            <div v-else>
                <MenuItem :name=menu.name>
                    <Icon :type=menu.icon></Icon>
                    <span>{{ menu.span }}</span>
                </MenuItem>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "MenuItems",
        props: {
            menuListData: {
                type: Array,
                required: true
            },
        }
    }
</script>

<style scoped>
    .menu-items-wrapper .ivu-menu-item, .menu-items-wrapper .ivu-menu-submenu {
        white-space: nowrap;
    }
</style>