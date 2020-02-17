<template>
    <Modal v-model="modalState.registerIsShow"
           footer-hide
           :mask-closable="false"
           width="360px"
           @on-visible-change="handleFocus">
        <Form ref="registerForm"
              :model="registerFormModel"
              :rules="registerFormRule"
              @keydown.enter.native="handleRegisterFormSubmit">
            <Divider style="margin-bottom: 24px">用户注册</Divider>
            <FormItem prop="account">
                <i-input prefix="ios-mail"
                         type="text"
                         clearable
                         v-model="registerFormModel.account"
                         placeholder="手机号/邮箱"
                         ref="registerUserInput">
                </i-input>
            </FormItem>
            <FormItem prop="verifyCode">
                <i-input type="text"
                         v-model="registerFormModel.verifyCode"
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
                         v-model="registerFormModel.username"
                         placeholder="用户名">
                </i-input>
            </FormItem>
            <FormItem prop="password">
                <i-input prefix="ios-lock"
                         type="password"
                         password
                         v-model="registerFormModel.password"
                         placeholder="密码">
                </i-input>
            </FormItem>
            <FormItem prop="password2">
                <i-input prefix="ios-lock"
                         type="password"
                         password
                         v-model="registerFormModel.password2"
                         placeholder="确认密码">
                </i-input>
            </FormItem>
            <FormItem>
                <Button type="primary" long @click="handleRegisterFormSubmit">注册</Button>
            </FormItem>
            <div style="display: flex; margin-top: -15px; margin-bottom: 24px">
                <span>已有账号？去<a @click.prevent="gotoLogin">登录</a></span>
                <span style="margin-left: auto"><a>忘记密码</a></span>
            </div>
        </Form>
    </Modal>

</template>

<script>
    import {apiQuery} from "@/api/api";
    import {mapActions, mapState} from "vuex";

    export default {
        name: "Register",
        data() {
            return {
                passwordMinLength: 3,
                usernameMinLength: 3,
                loading: false,
                defaultWaitTime: 30,
                waitTime: 0,
                registerFormModel: {
                    account: '',
                    verifyCode: '',
                    username: '',
                    password: '',
                    password2: ''
                }
            }
        },
        computed: {
            ...mapState([
                'modalState',
            ]),
            registerFormRule() {
                const accountValidator = (rule, value, callback) => {
                    if (value.indexOf('@') > -1 || !(/^[0-9]+$/).test(value)) {
                        if (!(/^[*#\u4e00-\u9fa5 a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/).test(value)) {
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
                    if (!(/^[A-Za-z0-9_]+$/).test(value)) {
                        callback(new Error('用户名只能由数字、字母、下划线组成'))
                    }
                    if (!(/^[A-Za-z]+.*$/).test(value)) {
                        callback(new Error('用户名必须以字母开头'))
                    }
                    callback()
                };
                const passwordValidator = (rule, value, callback) => {
                    if (this.registerFormModel.password2 !== '') {
                        this.$refs.registerForm.validateField('password2')
                    }
                    callback()
                };
                const password2Validator = (rule, value, callback) => {
                    if (value !== this.registerFormModel.password) {
                        callback(new Error('两次输入的密码不一致'))
                    }
                    callback()
                };
                return {
                    account: [
                        {required: true, message: '手机/邮箱 不能为空', trigger: 'blur'},
                        {validator: accountValidator, trigger: 'blur'}
                    ],
                    verifyCode: [
                        {required: true, message: '请输入验证码', trigger: 'blur'},
                    ],
                    username: [
                        {required: true, message: '用户名不能为空', trigger: 'blur'},
                        {validator: usernameValidator, trigger: 'blur'},
                        {
                            type: 'string',
                            min: this.usernameMinLength,
                            message: '用户名不能低于' + this.usernameMinLength + '位',
                            trigger: 'blur'
                        },
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {
                            type: 'string',
                            min: this.passwordMinLength,
                            message: '密码不能低于' + this.passwordMinLength + '位',
                            trigger: 'blur'
                        },
                        {validator: passwordValidator, trigger: 'blur'}
                    ],
                    password2: [
                        {required: true, message: '请再次输入你的密码', trigger: 'blur'},
                        {validator: password2Validator, trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            ...mapActions([
                'closeRegister',
                'showLogin',
            ]),
            handleFocus() {
                this.$nextTick(() => {
                    this.$refs.registerUserInput.focus();
                });
            },
            gotoLogin() {
                this.closeRegister();
                this.$nextTick(() => {
                    this.showLogin();
                });
            },
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
                this.$refs.registerForm.validateField('account', (errors) => {
                    if (errors) {
                        return this.$Message.error(errors);
                    }
                    let account = this.registerFormModel.account;
                    let account_type = account.indexOf('@') > -1 ? 'email' : 'mobile';
                    apiQuery('post', 'verify-codes', null, {
                        account: account,
                        account_type: account_type
                    }).then(() => {
                        this.$Message.success('验证码发送成功，5分钟内有效');
                    }).catch((error) => {
                        console.log(error);
                        this.$Message.error(Object.values(error.response.data)[0][0])
                    });
                });
            },
            handleRegisterFormSubmit() {
                this.$refs.registerForm.validate((valid) => {
                    if (valid) {
                        let account = this.registerFormModel.account;
                        let account_type = account.indexOf('@') > -1 ? 'email' : 'mobile';
                        apiQuery('post', 'register', null, {
                            account_type: account_type,
                            account: account,
                            code: this.registerFormModel.verifyCode,
                            username: this.registerFormModel.username,
                            password: this.registerFormModel.password
                        }).then(() => {
                            this.registerFormModel = {
                                account: '',
                                verifyCode: '',
                                username: '',
                                password: '',
                                password2: ''
                            };
                            this.closeRegister();
                            this.$nextTick(() => {
                                this.showLogin();
                            });
                            this.$Message.success('注册成功，请登录！')
                        }).catch((error) => {
                            console.log(error);
                            this.$Message.error(Object.values(error.response.data)[0][0])
                        });
                    } else {
                        this.$Message.error('数据填写有误，请检查')
                    }
                })
            },
        },
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