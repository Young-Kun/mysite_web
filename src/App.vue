<template>
    <div id="app">
        <Layout class="ivu-layout-has-sider" id="wrapper">
            <my-sider/>
            <Layout id="inside-wrapper">
                <my-header />
                <my-content />
                <my-footer />
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

    export default {
        name: 'app',
        components: {
            Register,
            Login,
            MySider,
            MyHeader,
            MyContent,
            MyFooter
        }
    }
</script>

<style>
    #inside-wrapper {
        overflow: initial;
        min-height: 100vh;
    }

    body::-webkit-scrollbar {
        display: none;
    }
</style>
