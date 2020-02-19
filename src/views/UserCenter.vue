<template>
    <Row type="flex">
        <Card style="flex: auto; margin-right: 48px">
            <Form ref="userInfoForm" :model="userInfoModel" :rules="userInfoRule" :label-width="100"
                  style="padding-right: 48px">
                <FormItem label="用户名">
                    <i-input v-model="userInfoModel.username" disabled></i-input>
                </FormItem>
                <FormItem label="手机号">
                    <i-input v-model="userInfoModel.mobile" disabled></i-input>
                </FormItem>
                <FormItem label="邮箱">
                    <i-input type="email" v-model="userInfoModel.email" disabled></i-input>
                </FormItem>
                <FormItem label="昵称" prop="nickname">
                    <i-input v-model="userInfoModel.nickname"></i-input>
                </FormItem>
                <FormItem label="地址" prop="address">
                    <i-input v-model="userInfoModel.address"></i-input>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <RadioGroup v-model="userInfoModel.gender">
                        <Radio label="male">男</Radio>
                        <Radio label="female">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem label="生日" prop="birth">
                    <DatePicker v-model="userInfoModel.birth"></DatePicker>
                </FormItem>
                <FormItem label="个人简介" prop="introduction">
                    <i-input type="textarea" v-model="userInfoModel.introduction"></i-input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('userInfoForm')">提交修改</Button>
                </FormItem>
            </Form>
        </Card>
        <div style="width: 300px">
            <Card>
                <div>
                    <img src="" style="width: 100%; height: 268px"/>
                </div>
                <Upload :before-upload="handleUpload"
                        action="/">
                    <Button icon="ios-cloud-upload-outline">上传头像</Button>
                </Upload>
                <div v-if="file">
                    <div>将要上传的头像: {{ file.name }}</div>
                    <Button type="primary" @click="upload" :loading="loadingStatus">{{ loadingStatus ? '上传中': '点击上传'}}
                    </Button>
                </div>
            </Card>
        </div>
    </Row>
</template>

<script>
    export default {
        name: "UserCenter",
        data() {
            return {
                file: null,
                loadingStatus: false,
                userInfoModel: {
                    username: '',
                    mobile: '',
                    email: '',
                    nickname: '',
                    address: '',
                    gender: '',
                    birth: '',
                    introduction: ''
                },
                userInfoRule: {}
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('成功');
                    } else {
                        this.$Message.error('失败');
                    }
                })
            },
            handleUpload(file) {
                this.file = file;
                return false;
            }
        }
    }
</script>

<style scoped>

</style>