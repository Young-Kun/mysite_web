<template>
    <Row :gutter="12">
        <i-col span="18">
            <Card>
                <Tabs>
                    <TabPane label="所有分类" icon="logo-windows">
                        <article-card v-for="(item, idx) in articles" :key="idx" :article="item"></article-card>
                    </TabPane>
                    <TabPane v-for="(item ,idx) in blogCategories" :key="idx" :label="item.name">
                        标签内容
                    </TabPane>
                </Tabs>
            </Card>
        </i-col>
        <i-col span="6">
            <Card style="margin-bottom: 8px;">
                <Button type="primary">写博客</Button>
            </Card>
            <Card style="margin-bottom: 8px;">
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
            <Card>
                <Button>默认排序</Button>
                <Button>发布时间</Button>
                <Button>浏览量</Button>
                <Button>评论量</Button>
                <Button>收藏量</Button>
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