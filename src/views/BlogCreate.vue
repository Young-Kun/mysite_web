<template>
    <Row>
        <Card class="content-wrapper">
            <Tabs value="MarkDown" :animated="false">
                <TabPane label="MarkDown" name="MarkDown">
                    <mavon-editor :style="{zIndex}" v-model="editorContent"
                                  @change="handleMavonChange" @save="handleMavonSave"
                                  @fullScreen="handleMavonFullScreen">
                    </mavon-editor>
                </TabPane>
                <TabPane label="富文本" name="RichText" disabled>
                    <i-input v-model="formValidate.content" type="textarea"
                             :autosize="{minRows: 10}"
                             placeholder="请输入文章内容(富文本)">
                    </i-input>
                </TabPane>
            </Tabs>
        </Card>
        <divider>请填写文章的其他信息</divider>

        <Row>
            <i-col :span="12" :offset="6">
                <Card class="info-wrapper">
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
                        <FormItem label="封面" prop="cover" required>
                            <Upload type="drag" action="/" :format="['jpg', 'jpeg', 'png']" :max-size="10240"
                                    :before-upload="handleBeforeUpload">
                                <div style="padding: 20px 0">
                                    <div>
                                        <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                                        <p>点击选择或拖动图片来上传</p>
                                    </div>
                                    <div v-if="formValidate.cover">
                                        <img :src="formValidate.cover.url" alt=""/>
                                    </div>
                                </div>
                            </Upload>
                            <div v-if="formValidate.cover">已上传：{{ formValidate.cover.name }}</div>
                        </FormItem>
                        <FormItem>
                            <Button type="warning" @click="handleSubmitArticle" style="float: right">发布文章</Button>
                            <Button type="primary" @click="handleReset">重置表单</Button>
                        </FormItem>
                    </Form>
                </Card>
            </i-col>
        </Row>

    </Row>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "BlogCreate",
        data() {
            return {
                editorType: 'markdown',
                zIndex: 900,
                editorContent: '',
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
                    ],
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
            handleMavonChange(value, render) {
                this.formValidate.content = render;
            },
            // save 需重写
            handleMavonSave(value, render) {
                return render;
            },
            handleMavonFullScreen(status) {
                status === true ? this.zIndex = 1500 : this.zIndex = 900;
            },
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
                        let formData = new FormData();
                        formData.append('category', this.formValidate.category);
                        this.formValidate.tags.forEach((value) => {
                            formData.append('tags', value)
                        });
                        formData.append('title', this.formValidate.title);
                        formData.append('brief', this.formValidate.brief);
                        formData.append('cover', this.formValidate.cover);
                        formData.append('content', this.formValidate.content);
                        this.$api.blog.blogCreate(formData).then((response) => {
                            this.$router.push({name: 'blog-detail', params: {articleId: response.data.id}});
                            console.log(response);
                            this.$Message.success('发布成功！')
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
            },
        }
    }
</script>

<style scoped>

</style>