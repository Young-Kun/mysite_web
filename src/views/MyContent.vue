<template>
    <Content id="content">
        <router-view></router-view>
    </Content>
</template>

<script>
    export default {
        name: "MyContent"
    }
</script>

<style scoped>
    #content {
        width: 100%;
    }

    .sider-expanded #content {
        padding: 36px;
    }

    .sider-collapsed #content {
        padding: 36px 0;
    }
</style>