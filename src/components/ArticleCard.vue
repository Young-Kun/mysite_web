<template>
    <div v-if="article">
        <div class="wrapper">
            <img :src="article.cover" alt="" class="cover-img">
            <ul class="text-wrapper">
                <li><h2>{{ article.title }}</h2></li>
                <li class="brief">{{ article.brief }}</li>
                <li class="info">分类：
                    <Badge type="primary" :text="article.category.name"></Badge>
                </li>
                <li class="info">标签：
                    <Badge type="normal" v-for="(tag, idx) in article.tags" :key="idx" :text="tag.name"
                           style="margin-right: 8px"></Badge>
                </li>
                <li class="info">
                    点击：<Badge type="normal" :count="article.click_num"></Badge>
                    收藏：<Badge type="normal" :count="article.favor_num"></Badge>
                    评论：<Badge type="normal" :count="article.comment_num"></Badge>
                </li>
                <li class="info pub-date">
                    {{ article.user.nickname }} 发表于 {{ article.add_time.split('T')[0] }}
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
        }
    }
</script>

<style scoped>
    .cover-img {
        height: 170px;
        width: 250px;
    }

    .brief {
        margin-left: 24px;
        margin-top: 8px;
    }

    .info {
        margin-top: 8px;
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