<template>
    <Card v-if="article" style="margin-bottom: 8px; margin-top: 8px">
        <Row :gutter="8">
            <i-col span="6">
                <img :src="article.cover" alt="" class="cover-img">
            </i-col>
            <i-col span="18">
                <h3>{{ article.title }}</h3>
                <p class="brief">{{ article.brief }}</p>
                <p class="info">分类：
                    <Badge :text="article.category.name"></Badge>
                </p>
                <p class="info">标签：
                    <Badge type="warning" v-for="(tag, idx) in article.tags" :key="idx" :text="tag.name"
                           style="margin-right: 8px"></Badge>
                </p>
                <p class="info pub-date">
                    {{ article.user.nickname }} 发表于 {{ article.add_time.split('T')[0] }}
                </p>
            </i-col>
        </Row>
    </Card>
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
        height: 150px;
        width: 100%;
    }

    .brief {
        margin-left: 16px;
        margin-top: 8px;
        margin-right: 8px;
    }

    .info {
        margin-top: 8px;
    }

    .info.pub-date {
        float: right;
    }
</style>