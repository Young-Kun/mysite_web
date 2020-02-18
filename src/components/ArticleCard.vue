<template>
    <div>
        <div class="wrapper">
            <img :src="article.cover" alt="" class="cover-img" @click="gotoArticleDetail">
            <ul class="text-wrapper">
                <a style="color: #101117" @click.prevent="gotoArticleDetail">
                    <h2>{{ article.title }}</h2>
                </a>
                <li class="brief">{{ article.brief }}</li>
                <li class="info">分类：
                    <Button type="error" shape="circle" size="small" @click="handleClickCategory">
                        {{ article.category.name }}
                    </Button>
                </li>
                <li class="info">标签：
                    <Button type="warning" size="small" shape="circle" v-for="tag in article.tags" :key="tag.id"
                            style="margin-right: 8px" @click="handleClickTag(tag)">
                        {{ tag.name }}
                    </Button>
                </li>
                <li class="info">
                    点击：
                    <Badge :count="article.click_num" style="margin-right: 12px"></Badge>
                    收藏：
                    <Badge :count="article.favor_num" style="margin-right: 12px"></Badge>
                    评论：
                    <Badge :count="article.comment_num" style="margin-right: 12px"></Badge>
                </li>
                <li class="info">
                    {{ article.user.nickname }} 发表于 {{ article.add_time.split('T')[0] }}
                    <i class="pub-date">修改于 {{ article.modify_time.split('T')[0] }}</i>
                </li>
            </ul>
        </div>
        <Divider/>
    </div>
</template>

<script>
    export default {
        name: "ArticleCard",
        props: {
            article: null
        },
        methods: {
            handleClickCategory() {
                this.$emit('category-click', this.article.category.id.toString())
            },
            handleClickTag(tag) {
                this.$emit('tag-click', tag)
            },
            gotoArticleDetail() {
                this.$router.push({
                    name: 'blog-detail',
                    params: {articleId: this.article.id, categoryId: this.article.category.id}
                })
            }
        }
    }
</script>

<style scoped>
    .cover-img {
        height: 170px;
        width: 250px;
        cursor: pointer;
        flex: none;
    }

    .cover-img:hover {
        box-shadow: 0 0 3px 3px rgba(53, 64, 82, 0.3);
    }

    .brief {
        margin-left: 24px;
        margin-top: 8px;
    }

    .info {
        margin-top: 8px;
        white-space: nowrap;
        overflow: hidden;
    }

    .pub-date {
        float: right;
    }

    .wrapper {
        display: flex;
    }

    .text-wrapper {
        flex: auto;
        padding-left: 24px;
    }

    ul {
        list-style-type: none;
    }
</style>