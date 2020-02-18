<template>
    <div @click="gotoArticleDetail">
        <Card class="article-item" style="margin-bottom: 8px">
        <div style="display: flex">
            <img :src="article.cover" alt="" class="cover-img" style="margin-right: 8px">
            <h4>{{ blog.title }}</h4>
        </div>
    </Card>
    </div>
</template>

<script>
    export default {
        name: "ArticleSimpleCard",
        props: {
            article: null,
        },
        methods: {
            gotoArticleDetail() {
                this.$router.push({
                    name: 'blog-detail',
                    params: {articleId: this.article.id, categoryId: this.article.category.id}
                });
                this.$router.go(0);
            }
        }
    }
</script>

<style scoped>
    .article-item {
        cursor: pointer;
    }

    .cover-img {
        height: 50px;
        width: 70px;
        flex: none;
    }

    ul {
        list-style-type: none;
    }
</style>