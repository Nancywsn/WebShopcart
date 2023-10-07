<template>
    <div>
        <el-breadcrumb :separator-icon="ArrowRight">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <h3>welcome</h3>
    </div>
</template>

<script>
export default {
    name: 'welcome',
    setup() {
        //清除保存的页面数据
         window.sessionStorage.removeItem("activePath")
         
    }
}
</script>
<style scoped lang='scss'>
</style>