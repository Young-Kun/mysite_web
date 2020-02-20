<template>
    <Footer style="display: flex">
        <div>
            @CopyRight youngkun.site
        </div>
        <a target="_blank"
           href="http://www.beian.miit.gov.cn/"
           style="color: gray;text-decoration: none; white-space: nowrap; display: flex; align-items: center; margin-left: auto">
            浙ICP备20001410号-1
        </a>
        <a target="_blank"
           href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=33078202001132"
           style="color: gray; text-decoration:none; white-space: nowrap; display: flex; align-items: center; margin-left: 24px">
            <img src="@/assets/beian.png"/>
            浙公网安备33078202001132号
        </a>
    </Footer>
</template>

<script>
    export default {
        name: "MyFooter"
    }
</script>

<style scoped>

</style>