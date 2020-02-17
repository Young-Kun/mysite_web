<template>
    <Row :gutter="12">
        <BackTop :height="1"></BackTop>
        <i-col span="18">
            <Card>
                <Tabs @on-click="handleSelectCategory" v-model="activeCategory">
                    <TabPane label="所有分类" name="all"></TabPane>
                    <TabPane v-for="item  in blogCategories" :key="item.id" :label="item.name"
                             :name="item.id.toString()"></TabPane>
                </Tabs>
                <Card :bordered="false" dis-hover style="margin-bottom: 24px; background: #f5f7f9">
                    <Button shape="circle" size="small" @click="handleOrdering('default')" style="margin-right: 8px;">
                        默认排序
                    </Button>
                    <ButtonGroup>
                        <Button v-for="item  in orderingFields" :key="item.id" shape="circle" size="small"
                                @click="handleOrdering(item)">
                            {{ item.label }}
                            <Icon v-show="item.ordering===1" type="md-arrow-dropup"/>
                            <Icon v-show="item.ordering===2" type="md-arrow-dropdown"/>
                        </Button>
                    </ButtonGroup>
                </Card>
                <article-card v-for="item  in articles" :key="item.id" :article="item"
                              @category-click="handleCategoryClick" @tag-click="handleTagClick"></article-card>
                <Card dis-hover :bordered="false" style="text-align: right">
                    <Page show-total show-elevator show-sizer :total="articlesCount" @on-change="handlePagination"
                          @on-page-size-change="handlePageSizeChange"/>
                </Card>
            </Card>
        </i-col>
        <i-col span="6">
            <div>
                <Card style="margin-bottom: 8px;">
                    <Button @click="showAllArticles">显示所有文章</Button>
                </Card>
                <Card style="margin-bottom: 8px;">
                    <Button type="primary" @click="handleCreateBlog">写博客</Button>
                </Card>
                <Card style="margin-bottom: 8px;">
                    <p slot="title">
                        <Icon type="ios-pricetags-outline"></Icon>
                        博客标签
                    </p>
                    <Button style="margin: 3px 1px" shape="circle" @click="handleSelectTags('all')">所有标签</Button>
                    <Button size="small" style="margin: 3px 1px" shape="circle" v-for="item  in blogTags" :key="item.id"
                            @click="handleSelectTags(item)">
                        {{ item.name }}
                    </Button>
                    <Tooltip placement="bottom">
                        <div slot="content">
                            <small>更多标签</small>
                        </div>
                    </Tooltip>
                </Card>
            </div>
        </i-col>
    </Row>
</template>

<script>
    import {apiQuery} from "@/api/api";
    import ArticleCard from "@/components/ArticleCard";
    import {mapGetters} from 'vuex';

    export default {
        name: "BlogList",
        components: {
            ArticleCard
        },
        data() {
            return {
                activeCategory: '',
                tagsLimit: 5,
                tagsCount: 0,
                articles: [],
                articlesCount: 0,
                filterParams: {
                    page: null,
                    page_size: null,
                    category: null,
                    ordering: null,
                    tags: null,
                },
                orderingFields: [
                    {field: 'add_time', label: '发布时间', ordering: 0},
                    {field: 'modify_time', label: '最后修改', ordering: 0},
                    {field: 'click_num', label: '点击量', ordering: 0},
                    {field: 'favor_num', label: '收藏量', ordering: 0},
                    {field: 'comment_num', label: '评论量', ordering: 0},
                    {field: 'user', label: '文章作者', ordering: 0},
                    {field: 'title', label: '标题', ordering: 0},
                ]
            }
        },
        computed: {
            ...mapGetters([
                'blogCategories',
                'blogTags',
            ])
        },
        methods: {
            getArticles(queryParams) {
                apiQuery('get', 'articles', queryParams).then((response) => {
                    this.articles = response.data.results;
                    this.articlesCount = response.data.count;
                }).catch((error) => {
                    console.log(error);
                })
            },
            handleSelectCategory(category) {
                this.filterParams.page = null;
                this.filterParams.category = category === 'all' ? null : category;
                this.getArticles(this.filterParams);
            },
            handleOrdering(item) {
                // 把其他字段排序顺序设为0：不排序，改变当前字段的排序顺序
                this.orderingFields.forEach(function (value) {
                    if (value === item) {
                        value.ordering = value.ordering === 0 ? 2 : (value.ordering === 2 ? 1 : 2)
                    } else {
                        value.ordering = 0
                    }
                });
                // 返回排序结果
                let field = item.ordering === 0 ? null : (item.ordering === 1 ? item.field : '-' + item.field);
                this.filterParams.ordering = item === 'default' ? null : field;
                this.getArticles(this.filterParams);
            },
            handleSelectTags(tag) {
                this.filterParams.page = null;
                this.filterParams.tags = tag === 'all' ? null : tag.id;
                this.getArticles(this.filterParams);
            },
            handleCategoryClick(category) {
                this.activeCategory = category;
                this.handleSelectCategory(category);
            },
            handleTagClick(tag) {
                this.handleSelectTags(tag);
            },
            showAllArticles() {
                this.filterParams.category = null;
                this.filterParams.tags = null;
                this.activeCategory = 'all';
                this.getArticles(this.filterParams);
            },
            handlePagination(page) {
                this.filterParams.page = page;
                this.getArticles(this.filterParams);
            },
            handlePageSizeChange(pageSize) {
                this.filterParams.page_size = pageSize;
                this.getArticles(this.filterParams);
            },
            handleCreateBlog() {
                this.$router.push({name: 'blog-create'})
            }
        },
        mounted() {
            this.getArticles(this.filterParams);
        }
    }
</script>

<style scoped>

</style>