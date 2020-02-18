<template>
    <Row :gutter="12" v-if="article" type="flex">
        <BackTop :height="1"></BackTop>
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
                <div slot="extra">
                    <RadioGroup type="button" size="small" value="同类别" @on-change="getRelatedArticles">
                        <Radio label="同类别" style="padding: 0 3px"></Radio>
                        <Radio label="同作者" style="padding: 0 3px"></Radio>
                    </RadioGroup>
                </div>
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
    import {apiQuery} from "@/api";
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
            }
        },
        methods: {
            getArticleDetail() {
                apiQuery('get', 'article/detail/' + this.articleId).then((response) => {
                    this.article = response.data;
                }).catch((error) => {
                    console.log(error);
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
            getRelatedArticles(name) {
                if (name === '同作者') {
                    this.getArticles({user: this.article.user.id})
                }
                if (name === '同类别') {
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
    .ivu-radio-default {
        border: none!important;
    }
    .ivu-radio-checked {
        border: none!important;
    }
    .ivu-radio-wrapper-checked {
        border: none;
        background: #2d8cf0;
        color: #fff;
    }
</style>