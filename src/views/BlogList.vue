<template>
    <Row :gutter="12">
        <BackTop :height="1"></BackTop>
        <i-col span="18">
            <Card>
                <Tabs @on-click="handleSelectCategory">
                    <TabPane label="所有分类" name="all"></TabPane>
                    <TabPane v-for="(item ,idx) in blogCategories" :key="idx" :label="item.name"
                             :name="item.id.toString()"></TabPane>
                </Tabs>
                <Card :bordered="false" dis-hover style="margin-bottom: 24px; background: #f5f7f9">
                    <Button shape="circle" size="small" @click="handleOrdering('default')" style="margin-right: 8px;">
                        默认排序
                    </Button>
                    <ButtonGroup>
                        <Button v-for="(item, idx) in orderingFields" :key="idx" shape="circle" size="small"
                                @click="handleOrdering(item)">
                            {{ item.label }}
                            <Icon v-show="item.ordering===1" type="md-arrow-dropdown"/>
                            <Icon v-show="item.ordering===2" type="md-arrow-dropup"/>
                        </Button>
                    </ButtonGroup>
                </Card>
                <article-card v-for="(item, idx) in articles" :key="idx" :article="item"></article-card>
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
                articlesCount: 0,
                filterParams: {
                    category: null,
                    ordering: null
                },
                orderingFields: [
                    {field: 'add_time', label: '发布时间', ordering: 0},
                    {field: 'click_num', label: '点击量', ordering: 0},
                    {field: 'favor_num', label: '收藏量', ordering: 0},
                    {field: 'comment_num', label: '评论量', ordering: 0},
                    {field: 'user', label: '文章作者', ordering: 0},
                ]
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
            getArticles(queryParams) {
                apiQuery('get', 'articles', queryParams).then((response) => {
                    this.articles = response.data.results;
                    this.articlesCount = response.data.count;
                }).catch((error) => {
                    console.log(error);
                })
            },
            handleSelectCategory(name) {
                this.filterParams.category = name === 'all' ? null : name;
                this.getArticles(this.filterParams);
            },
            handleOrdering(item) {
                // 把其他字段排序顺序设为0：不排序，改变当前字段的排序顺序
                this.orderingFields.forEach(function (value) {
                    if(value === item){
                        value.ordering = value.ordering === 0 ? 1 : (value.ordering === 1 ? 2 : 1)
                    }else{
                        value.ordering = 0
                    }
                });
                // 返回排序结果
                let field = item.ordering === 0 ? null : (item.ordering === 1 ? item.field : '-' + item.field)
                this.filterParams.ordering = item === 'default' ? null : field;
                this.getArticles(this.filterParams);
            }
        },
        mounted() {
            this.getBlogCategories();
            this.getBlogTags(this.tagsLimit, 0);
            this.getArticles(this.filterParams);
        }
    }
</script>

<style scoped>

</style>