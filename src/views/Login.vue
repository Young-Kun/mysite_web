<template>
    <Modal v-model="modalState.loginIsShow"
           footer-hide
           :mask-closable="false"
           width="360px"
           @on-visible-change="handleFocus">
        <Form ref="loginForm"
              :model="loginFormModel"
              :rules="loginFormRule"
              @keydown.enter.native="handleLoginFormSubmit">
            <Divider style="margin-bottom: 24px">用户登录</Divider>
            <FormItem prop="account">
                <i-input prefix="ios-person"
                         type="text"
                         clearable
                         maxlength="125"
                         v-model="loginFormModel.account"
                         placeholder="用户名/手机号/邮箱"
                         ref="loginUserInput">
                </i-input>
            </FormItem>
            <FormItem prop="password">
                <i-input prefix="ios-lock"
                         type="password"
                         password
                         v-model="loginFormModel.password"
                         placeholder="密码">
                </i-input>
            </FormItem>
            <FormItem style="text-align: left; margin-bottom: 0">
                <Checkbox v-model="loginFormModel.rememberMe">记住我10天</Checkbox>
            </FormItem>
            <FormItem>
                <Button type="primary" long @click="handleLoginFormSubmit">登录</Button>
            </FormItem>
            <div style="display: flex; margin-top: -15px; margin-bottom: 24px">
                <span>还没有账号？去<a @click.prevent="gotoRegister">注册</a></span>
                <span style="margin-left: auto"><a>忘记密码</a></span>
            </div>
        </Form>
    </Modal>
</template>

<script>
    import {apiQuery} from "@/api/api";
    import cookie from "@/store/cookie";
    import {mapActions, mapState} from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                loginFormModel: {
                    account: '',
                    password: '',
                    rememberMe: true
                },
                loginFormRule: {
                    account: [
                        {required: true, message: '用户名/手机/邮箱 不能为空', trigger: 'change'},
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'change'},
                    ]
                }
            }
        },
        computed: {
            ...mapState([
                'modalState',
            ]),
        },
        methods: {
            ...mapActions([
                'setInfo',
                'closeLogin',
                'showRegister',
            ]),
            handleFocus() {
                this.$nextTick(() => {
                    this.$refs.loginUserInput.focus();
                });
            },
            gotoRegister() {
                this.showRegister();
            },
            handleLoginFormSubmit() {
                this.$refs.loginForm.validate((valid) => {
                    if (valid) {
                        apiQuery('post', 'jwt-token-auth', null, {
                            username: this.loginFormModel.account,
                            password: this.loginFormModel.password
                        }).then((response) => {
                            let expiresDays = this.loginFormModel.rememberMe ? 10 : null;
                            cookie.setCookie('username', this.loginFormModel.account, expiresDays);
                            cookie.setCookie('token', response.data.token, expiresDays);
                            this.setInfo();
                            this.closeLogin();
                            this.$Message.success('登录成功！')
                        }).catch((error) => {
                            console.log(error);
                            this.$Message.error('用户名或密码错误！')
                        });
                    } else {
                        this.$Message.error('数据填写有误！')
                    }
                })
            },
        },
    }
</script>

<style scoped>

</style>