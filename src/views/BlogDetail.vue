<template>
    <Row :gutter="12" v-if="article" type="flex">
        <BackTop></BackTop>
        <i-col :span="18">
            <Card style="height: 100%">
                <div>
                    <h1>{{ article.title }}</h1>
                    <pre>{{ article.add_time.split('T')[0] }}</pre>
                    <hr style="margin: 8px 0">
                    <div style="display: flex; align-items: center;">
                        <span>浏览： {{ article.click_num }}</span>
                        <Divider type="vertical"></Divider>
                        <span>收藏： {{ article.favor_num }}</span>
                        <Divider type="vertical"></Divider>
                        <span>评论： {{ article.comment_num }}</span>
                        <Button type="primary" style="margin-left: auto">收藏</Button>
                        <Button type="primary" style="margin-left: 8px;">分享</Button>
                    </div>
                    <hr style="margin: 8px 0">
                    <div>{{ article.content }}</div>
                </div>
            </Card>
        </i-col>
        <i-col :span="6">
            <Card dis-hover>
                <div style="text-align:center">
                    <img :src="article.user.avatar" alt="" width="100%"/>
                    <h3>作者：{{ article.user.nickname }}</h3>
                </div>
            </Card>
            <Card style="margin-top: 8px" dis-hover>
                <p slot="title">
                    文章推荐
                </p>
                <p slot="extra">
                    <Tag class="param" v-for="item in queryParams" :key="item.id" checkable color="primary" :checked="item.isChecked"
                         @on-change="getRelatedArticles(item.param)">
                        {{ item.title }}
                    </Tag>
                </p>
                <ul style="list-style: none">
                    <li v-for="item in relatedArticleList" :key="item.id">
                        <article-simple-card :article="item"></article-simple-card>
                    </li>
                </ul>
            </Card>
        </i-col>
    </Row>
</template>

<script>
    import {apiQuery} from "@/api/api";
    import ArticleSimpleCard from "@/components/ArticleSimpleCard";

    export default {
        name: "BlogDetail",
        components: {
            ArticleSimpleCard
        },
        props: {
            articleId: null,
            categoryId: null
        },
        data() {
            return {
                article: null,
                relatedArticleList: [],
                queryParams: [
                    {id: 1, param: 'sameCategory', title: '同类别', isChecked: true},
                    {id: 2, param: 'sameUser', title: '同作者', isChecked: false},
                ]
            }
        },
        methods: {
            getArticleDetail() {
                apiQuery('get', 'articles/' + this.articleId).then((response) => {
                    this.article = response.data;
                }).catch((error) => {
                    console.log(error.response);
                })
            },
            getArticles(queryParams) {
                apiQuery('get', 'articles', queryParams).then((response) => {
                    let data = response.data.results;
                    let idx = null;
                    for (let i = 0; i < data.length; i++) {
                        if (data[i].id === this.article.id) {
                            idx = i
                        }
                    }
                    data.splice(idx, 1);
                    this.relatedArticleList = data
                }).catch((error) => {
                    console.log(error.response);
                })
            },
            getRelatedArticles(param) {
                this.queryParams.forEach(function (item) {
                        item.isChecked = item.param === param;
                    });
                if (param === 'sameUser') {
                    this.getArticles({user: this.article.user.id})
                }
                if (param === 'sameCategory') {
                    this.getArticles({category: this.article.category.id})
                }
            }
        },
        mounted() {
            this.getArticleDetail();
            this.getArticles({category: this.categoryId});
        }
    }
</script>

<style scoped>
    .param {
        cursor: pointer;
    }
</style>