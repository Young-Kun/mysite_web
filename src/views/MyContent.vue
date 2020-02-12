<template>
    <Content id="content">
        <Breadcrumb :style="{margin: '20px 0'}">
            <BreadcrumbItem>Home</BreadcrumbItem>
            <BreadcrumbItem>Components</BreadcrumbItem>
            <BreadcrumbItem>Layout</BreadcrumbItem>
        </Breadcrumb>
        <Card>
            <div style="min-height: 500px">
                Content
            </div>
        </Card>
    </Content>
</template>

<script>
    export default {
        name: "MyContent"
    }
</script>

<style scoped>
    #content {
        padding: 0 36px;
    }
</style>