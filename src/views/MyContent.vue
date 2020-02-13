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
        padding: 36px;
        width: 100%;
    }
</style>