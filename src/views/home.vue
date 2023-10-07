<template>
    <el-container class="homecontainer">
        <!-- 头部区域 -->
        <el-header>
            <div>
                <span>web电子商城</span>
            </div>
        </el-header>
        <el-container>
            <!-- 左边侧边栏 -->
            <el-aside width="200px">
                <!-- 侧边栏菜单区域 -->
                <el-menu active-text-color="#ffd04b" background-color="rgb(69, 96, 93)" text-color="#fff" router
                    :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-menu-item index="goods" @click="saveNavState('goods')">
                        <span>商品列表</span>
                    </el-menu-item>
                    <!-- <el-menu-item index="none">
                        <span>店铺列表</span>
                    </el-menu-item> -->
                    <el-menu-item index="cart" @click="saveNavState('cart')">
                        <span>我的购物车</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <!-- 中间主体区域 -->
                <el-main>
                    <!-- 路由占位符 -->
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>

import { watch } from 'vue'
export default {
    name: 'home',
    setup() {

        let activePath = window.sessionStorage.getItem('activePath')
        console.log(activePath)

        //保存链接的激活状态
        const saveNavState = (activePath) => {
            window.sessionStorage.setItem('activePath', activePath)
        }

        // watch(activePath, (newCount) => {
        //     console.log('new count is: ${newCount}')
        // })

        return {
            saveNavState,
            activePath,
            watch
        }
    }

}
</script>


<style scoped lang='scss'>
.homecontainer {
    height: 100vh;


    .el-header {
        height: 15vh;
        background-color: rgb(69, 96, 93);
        display: flex;
        justify-content: space-between; //左右贴边布局
        align-items: center; //垂直居中

        span {
            font-size: 40px;
            color: #eee;
            margin-left: 15px;
        }

    }

    .el-aside {
        background-color: rgb(69, 96, 93);

        .el-menu-item {
            display: flex; //改变位置
            justify-content: center; //水平居中
        }
    }

    .el-main {
        background-color: rgb(196, 215, 212);
    }

}
</style>

