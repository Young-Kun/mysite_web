<template>
    <Row :gutter="12">
        <i-col span="18">
            <Card>
                <Button>所有分类</Button>
                <Button v-for="(item ,idx) in blogCategories" :key="idx">
                    {{ item.name }}
                </Button>
                <hr/>
                <Button>默认排序</Button>
                <Button>发布时间</Button>
                <Button>浏览量</Button>
                <Button>评论量</Button>
                <Button>收藏量</Button>
            </Card>
            <Row>
                <article-card v-for="(item, idx) in articles" :key="idx" :article="item"></article-card>
            </Row>
        </i-col>
        <i-col span="6">
            <Card style="margin-bottom: 8px;">
                <Button type="primary">写博客</Button>
            </Card>
            <Card>
                <p slot="title">
                    <Icon type="ios-pricetags-outline"></Icon>
                    博客标签
                </p>
                <a slot="extra" @click.prevent="changeLimit">
                    更多标签
                </a>
                <Button v-for="(item ,idx) in blogTags" :key="idx">
                    {{ item.name }}
                </Button>
            </Card>
        </i-col>
    </Row>
</template>

<script>
    import {apiQuery} from "@/api/api";
    import ArticleCard from "@/components/ArticleCard";

    export default {
        name: "BlogList",
        components: {
            ArticleCard
        },
        data() {
            return {
                blogCategories: [],
                blogTags: [],
                tagsLimit: 5,
                tagsCount: 0,
                articles: [],
                articlesCount: 0
            }
        },
        methods: {
            getBlogCategories() {
                apiQuery('get', 'blog-categories').then((response) => {
                    this.blogCategories = response.data;
                }).catch((error) => {
                    console.log(error);
                })
            },
            getBlogTags(tagsLimit, tagsOffset) {
                apiQuery('get', 'blog-tags', {limit: tagsLimit, offset: tagsOffset}).then((response) => {
                    // this.blogTags = response.data.results;
                    this.tagsCount = response.data.count;
                    this.blogTags = response.data.results;
                }).catch((error) => {
                    console.log(error);
                })
            },
            changeLimit() {
                this.tagsLimit = this.tagsCount;
                this.getBlogTags(this.tagsLimit, 0)
            },
            getArticles() {
                apiQuery('get', 'articles').then((response) => {
                    this.articles = response.data.results;
                    this.articlesCount = response.data.count;
                }).catch((error) => {
                    console.log(error);
                })
            }
        },
        mounted() {
            this.getBlogCategories();
            this.getBlogTags(this.tagsLimit, 0);
            this.getArticles();
        }
    }
</script>

<style scoped>

</style>