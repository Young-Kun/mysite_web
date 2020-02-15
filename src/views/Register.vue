<template>
    <Form ref="loginForm" :model="loginFormModel" :rules="loginFormRule" style="margin: auto">
        <Divider>用户注册</Divider>
        <FormItem prop="account">
            <i-input prefix="ios-mail"
                     type="text"
                     clearable
                     v-model="loginFormModel.account"
                     placeholder="手机号/邮箱"
                     ref="registerUserInput">
            </i-input>
        </FormItem>
        <FormItem prop="verifyCode">
            <i-input type="text"
                     v-model="loginFormModel.verifyCode"
                     placeholder="验证码">
                <Icon type="md-key" slot="prepend"></Icon>
                <Button class="verify-code-send" slot="append" :loading="loading" @click="handleSendVerifyCode">
                    <span v-show="!loading">发送验证码</span>
                    <span v-show="loading">{{ waitTime }}秒后可重发</span>
                </Button>
            </i-input>
        </FormItem>
        <FormItem prop="username">
            <i-input prefix="ios-person"
                     type="text"
                     clearable
                     maxlength="150"
                     v-model="loginFormModel.username"
                     placeholder="用户名">
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
        <FormItem prop="password2">
            <i-input prefix="ios-lock"
                     type="password"
                     password
                     v-model="loginFormModel.password2"
                     placeholder="确认密码">
            </i-input>
        </FormItem>
        <FormItem>
            <Button type="primary" long>注册</Button>
        </FormItem>
        <div style="display: flex; margin-top: -15px; margin-bottom: 24px">
            <span>已有账号？去<a @click.prevent="$emit('goto-login')">登录</a></span>
            <span style="margin-left: auto"><a>忘记密码</a></span>
        </div>
    </Form>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                passwordMinLength: 3,
                loading: false,
                defaultWaitTime: 30,
                waitTime: 0,
                loginFormModel: {
                    account: '',
                    verifyCode: '',
                    username: '',
                    password: '',
                    password2: ''
                }
            }
        },
        computed: {
            loginFormRule() {
                const accountValidator = (rule, value, callback) => {
                    if (value.indexOf('@') > -1) {
                        if (!(/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/).test(value)) {
                            callback(new Error('邮箱格式不正确'))
                        }
                        callback()
                    } else {
                        if (value.length !== 11) {
                            callback(new Error('手机号码必须是11位'))
                        } else if (!(/^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/.test(value))) {
                            callback(new Error('手机号码格式不正确'))
                        }
                        callback()
                    }
                };
                const usernameValidator = (rule, value, callback) => {
                    callback()
                };
                const passwordValidator = (rule, value, callback) => {
                    if (this.loginFormModel.password2 !== '') {
                        this.$refs.loginForm.validateField('password2')
                    }
                    callback()
                };
                const password2Validator = (rule, value, callback) => {
                    if (value !== this.loginFormModel.password) {
                        callback(new Error('两次输入的密码不一致'))
                    }
                    callback()
                };
                return {
                    account: [
                        {required: true, message: '手机/邮箱 不能为空', trigger: 'change'},
                        {validator: accountValidator, trigger: 'change'}
                    ],
                    verifyCode: [
                        {required: true, message: '请输入验证码', trigger: 'change'},
                    ],
                    username: [
                        {required: true, message: '密码不能为空', trigger: 'change'},
                        {validator: usernameValidator, trigger: 'change'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'change'},
                        {
                            type: 'string',
                            min: this.passwordMinLength,
                            message: '密码不能低于' + this.passwordMinLength + '位',
                            trigger: 'change'
                        },
                        {validator: passwordValidator, trigger: 'change'}
                    ],
                    password2: [
                        {required: true, message: '请再次输入你的密码', trigger: 'change'},
                        {validator: password2Validator, trigger: 'change'}
                    ]
                }
            }
        },
        methods: {
            handleSendVerifyCode() {
                this.loading = true;
                this.waitTime = this.defaultWaitTime;
                let t1 = setInterval(() => {
                    this.waitTime -= 1;
                }, 1000);
                let t2 = setTimeout(() => {
                    this.loading = false;
                    this.waitTime = this.defaultWaitTime;
                    window.clearTimeout(t1);
                    window.clearTimeout(t2);
                }, 1000 * this.defaultWaitTime);
            },
            focusUser() {
                this.$refs.registerUserInput.focus()
            }
        }
    }
</script>

<style scoped>
    .verify-code-send:focus {
        box-shadow: none;
    }

    .verify-code-send {
        width: 8rem;
    }
</style>