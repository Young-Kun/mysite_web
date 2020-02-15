<template>
    <Form ref="loginForm"
          :model="loginFormModel"
          :rules="loginFormRule"
          style="margin: auto">
        <Divider>用户登录</Divider>
        <FormItem prop="account" autofocus>
            <i-input prefix="ios-person"
                     type="text"
                     clearable
                     maxlength="150"
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
        <FormItem>
            <Button type="primary" long @click="handleSubmit('loginForm')">登录</Button>
        </FormItem>
        <div style="display: flex; margin-top: -15px; margin-bottom: 24px">
            <span>还没有账号？去<a @click.prevent="$emit('goto-register')">注册</a></span>
            <span style="margin-left: auto"><a>忘记密码</a></span>
        </div>
    </Form>
</template>

<script>
    import {apiQuery} from "@/api/api";
    import cookie from "@/store/cookie";
    import {mapActions} from 'vuex';

    export default {
        name: "Login",
        data() {
            return {
                passwordMinLength: 3,
                loginFormModel: {
                    account: '',
                    password: ''
                },
            }
        },
        computed: {
            loginFormRule() {
                return {
                    account: [
                        {required: true, message: '用户名/手机/邮箱 不能为空', trigger: 'change'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'change'},
                        {
                            type: 'string',
                            min: this.passwordMinLength,
                            message: '密码不能低于' + this.passwordMinLength + '位',
                            trigger: 'change'
                        },
                    ]
                }
            }
        },
        methods: {
            focusUser() {
                this.$refs.loginUserInput.focus()
            },
            ...mapActions(['setInfo']),
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        apiQuery('post', 'jwt-token-auth', null, {
                            username: this.loginFormModel.account,
                            password: this.loginFormModel.password
                        }).then((response) => {
                            cookie.setCookie('username', this.loginFormModel.account);
                            cookie.setCookie('token', response.data.token);
                            this.setInfo();
                            this.$emit('login-success');
                        }).catch((error) => {
                            console.log(error.response);
                            this.$Message.error('用户名或密码错误！')
                        });
                    } else {
                        this.$Message.error('数据填写有误，请检查')
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>