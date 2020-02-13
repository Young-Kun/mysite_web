<template>
    <Row :gutter="12">
        <i-col span="17">
            <Card>
                <Button>所有分类</Button>
                <Button v-for="(item ,idx) in blog_categories" :key="idx">
                    {{ item.name }}
                </Button>
                <hr/>
                <Button>默认排序</Button>
                <Button>发布时间</Button>
                <Button>浏览量</Button>
                <Button>评论量</Button>
                <Button>收藏量</Button>
            </Card>
        </i-col>
        <i-col span="7">
            <Card style="margin-bottom: 8px;">
                <Button type="primary">写博客</Button>
            </Card>
            <Card>
                <p slot="title">
                    <Icon type="ios-film-outline"></Icon>
                    博客标签
                </p>
                <a href="#" slot="extra" @click.prevent="">
                    <Icon type="ios-loop-strong"></Icon>
                    更多标签
                </a>
                <Button v-for="(item ,idx) in blog_tags.results" :key="idx">
                    {{ item.name }}
                </Button>
            </Card>
        </i-col>
    </Row>
</template>

<script>
    import {apiQuery} from "@/api/api";

    export default {
        name: "BlogList",
        data() {
            return {
                blog_categories: [],
                blog_tags: [],
            }
        },
        methods: {
            getBlogCategories() {
                apiQuery('get', 'blog-categories').then((response) => {
                    this.blog_categories = response.data
                }).catch((error) => {
                    console.log(error);
                })
            },
            getBlogTags() {
                apiQuery('get', 'blog-tags', '').then((response) => {
                    this.blog_tags = response.data
                }).catch((error) => {
                    console.log(error);
                })
            }
        },
        mounted: function () {
            this.getBlogCategories();
            this.getBlogTags()
        }
    }
</script>

<style scoped>

</style>