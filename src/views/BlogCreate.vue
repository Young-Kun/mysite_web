<template>
    <Row>
        <Card class="content-wrapper">
            <Tabs value="MarkDown" :animated="false">
                <TabPane label="MarkDown" name="MarkDown">
                    <i-input v-model="formValidate.content" type="textarea" :autosize="{minRows: 10}"
                             placeholder="请输入文章内容(markdown)">
                    </i-input>
                </TabPane>
                <TabPane label="富文本" name="RichText">
                    <i-input v-model="formValidate.content" type="textarea" :autosize="{minRows: 10}"
                             placeholder="请输入文章内容(富文本)">
                    </i-input>
                </TabPane>
            </Tabs>
        </Card>
        <Button long type="primary" style="margin-top: 12px">暂存</Button>
        <divider>请填写文章的其他信息</divider>
        <Card class="info-wrapper">
            <Row type=flex>
                <i-col :span="12" style="margin: auto">
                    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                        <FormItem label="标题" prop="title">
                            <i-input v-model="formValidate.title" placeholder="请输入标题..."></i-input>
                        </FormItem>
                        <FormItem label="分类" prop="category">
                            <Select v-model="formValidate.category" placeholder="请选择文章分类">
                                <Option v-for="item in blogCategories" :key="item.id" :value="item.id">
                                    {{ item.name }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="标签" prop="tags">
                            <Select v-model="formValidate.tags" multiple placeholder="请选择文章标签">
                                <Option v-for="item in blogTags" :key="item.id" :value="item.id">
                                    {{ item.name }}
                                </Option>
                            </Select>
                        </FormItem>
                        <FormItem label="简介" prop="brief">
                            <i-input v-model="formValidate.brief" type="textarea" :autosize="{minRows:2}"
                                     placeholder="请输入120字内的简介"></i-input>
                        </FormItem>
                        <FormItem label="封面" prop="cover">
                            <Upload action="/" :before-upload="handleBeforeUpload">
                                <Button icon="ios-cloud-upload-outline">为文章选择封面图像</Button>
                            </Upload>
                        </FormItem>
                        <FormItem>
                            <Button type="primary" @click="handleSubmitArticle">发布文章</Button>
                            <Button type="primary" @click="handleReset">重置表单</Button>
                        </FormItem>
                    </Form>
                </i-col>
            </Row>
        </Card>
    </Row>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "BlogCreate",
        data() {
            return {
                editorType: 'markdown',
                formValidate: {
                    title: '',
                    category: '',
                    tags: [],
                    cover: null,
                    brief: '',
                    content: ''
                },
                ruleValidate: {
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'},
                    ],
                    category: [
                        {type: 'number', required: true, message: '分类是必填的', trigger: 'change'},
                    ],
                    tags: [
                        {type: 'array', required: true, message: '标签是必填的', trigger: 'change'},
                    ],
                    brief: [
                        {required: true, message: '简介不能为空', trigger: 'blur'},
                        {type: 'string', max: 120, message: '简介应小于120个字', trigger: 'blur'},
                    ]
                }
            }
        },
        computed: {
            ...mapGetters([
                'blogCategories',
                'blogTags',
            ])
        },
        methods: {
            handleBeforeUpload(file) {
                this.formValidate.cover = file;
                return false;
            },
            handleSubmitArticle() {
                this.$refs.formValidate.validate((valid) => {
                    if (this.formValidate.content.length < 10) {
                        this.$Message.error('请填写文章内容');
                        return false;
                    }
                    if (valid) {
                        this.$api.blog.blogCreate(
                            this.formValidate.category,
                            this.formValidate.tags,
                            this.formValidate.title,
                            this.formValidate.brief,
                            this.formValidate.cover,
                            this.formValidate.content
                        ).then((response) => {
                            this.$router.push({name: 'blog-detail', params: {articleId: response.data.id}});
                            console.log(response);
                            this.$Message.success('发布成功！(文章如有敏感信息，已被屏蔽)')
                        }).catch((error) => {
                            console.log(error);
                            this.$Message.error('请先登录！')
                        });
                    } else {
                        this.$Message.error('表单有误，请检查！')
                    }
                })
            },
            handleReset() {
                this.$refs.formValidate.resetFields();
            }
        }
    }
</script>

<style scoped>

</style>