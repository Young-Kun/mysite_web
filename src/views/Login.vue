<template>
    <Form ref="loginForm" :model="loginFormModel" :rules="loginFormRule" style="margin: auto">
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
            <Button type="primary" long>登录</Button>
        </FormItem>
        <div style="display: flex; margin-top: -15px; margin-bottom: 24px">
            <span>还没有账号？去<a @click.prevent="$emit('goto-register')">注册</a></span>
            <span style="margin-left: auto"><a>忘记密码</a></span>
        </div>
    </Form>
</template>

<script>
    export default {
        name: "Login",
        data() {
            return {
                loginFormModel: {
                    account: '',
                    password: ''
                },
                loginFormRule: {
                    account: [
                        {required: true, message: '用户名/手机/邮箱 不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                        {type: 'string', min: 6, message: '密码不能低于6位', trigger: 'blur'}
                    ]
                }
            }
        },
        methods: {
            focusUser() {
                this.$refs.loginUserInput.focus()
            }
        }
    }
</script>

<style scoped>

</style>