<template>
    <Row :gutter="12">
        <i-col :span="18">
            <h2>{{ article.title }}</h2>
            <hr/>
            <div v-html="article.content"></div>
        </i-col>
        <i-col :span="6">
        </i-col>
    </Row>
</template>

<script>
    export default {
        name: "BlogDetail",
        computed: {
            article() {
                return this.$route.params.article
            }
        }
    }
</script>

<style scoped>

</style>