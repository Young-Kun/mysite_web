<template>
    <div id="app">
        <Layout class="ivu-layout-has-sider" id="wrapper" :class="siderCollapsed?'sider-collapsed':'sider-expanded'">
            <my-sider ref="mysider"/>
            <Layout id="inside-wrapper">
                <my-header @siderIsExpanded="handleSiderStatus('expanded')"
                           @siderIsCollapsed="handleSiderStatus('collapsed')"/>
                <my-content/>
                <my-footer/>
            </Layout>
        </Layout>
        <login></login>
        <register></register>
    </div>
</template>

<script>
    import MySider from "@/views/MySider";
    import MyHeader from "@/views/MyHeader";
    import MyContent from "@/views/MyContent";
    import MyFooter from "@/views/MyFooter";
    import Login from "@/views/Login";
    import Register from "@/views/Register";
    import {mapActions, mapState} from 'vuex';

    export default {
        name: 'app',
        components: {
            Register,
            Login,
            MySider,
            MyHeader,
            MyContent,
            MyFooter
        },
        computed: {
            ...mapState([
                'siderCollapsed'
            ])
        },
        methods: {
            ...mapActions([
                'addBlogCategory',
                'addBlogTag',
            ]),
            handleSiderStatus(status) {
                if(status==='expanded'){
                    this.$refs.mysider.$data.siderIsCollapsed = false;
                }else{
                    this.$refs.mysider.$data.siderIsCollapsed = true;
                }
            }
        },
        mounted() {
            this.$api.blog.blogCategories().then((res) => {
                res.data.forEach((category) => {
                    this.addBlogCategory(category);
                })
            }).catch((error) => {
                console.log(error);
            });
            this.$api.blog.blogTags().then((res) => {
                res.data.forEach((tag) => {
                    this.addBlogTag(tag);
                })
            }).catch((error) => {
                console.log(error);
            });
        },
    }
</script>

<style>
    #inside-wrapper {
        min-height: 100vh;
        min-width: 100%;
        max-width: 100%;
        padding-top: 64px;
    }

    .sider-expanded #inside-wrapper {
        padding-left: 200px;
    }

    .sider-collapsed #inside-wrapper {
        padding-left: 0;
    }
</style>
