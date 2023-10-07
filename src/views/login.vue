<template>
    <div class="container">
        <div class="login">
            <div class="item">
                <h2>web shopping</h2>
            </div>
            <div class="item">
                <span>账号：</span>
                <div><el-input v-model="loginId" placeholder="请输入账号" /></div>
            </div>
            <div class="item">
                <span>密码：</span>
                <div><el-input type="password" v-model="loginPwd" placeholder="请输入密码" /></div>
            </div>
            <div class="item">
                <span>记住我：</span>
                <el-checkbox v-model="checked1" size="small" />
            </div>
            <div class="btn">
                <el-button type="primary" @click="userLogin">登录</el-button>
                <el-button>取消</el-button>
            </div>

        </div>
    </div>
</template>

<script>
//导入组合式api
import { reactive, toRefs } from 'vue';

import { useRouter } from 'vue-router';

export default {
    name: 'login',
    setup() {
        //清除保存的页面数据
        window.sessionStorage.removeItem("activePath")

        //获取当前项目的路由器对象
        let $router = useRouter()
        //定义登录数据
        let loginData = reactive({
            loginId: '',
            loginPwd: '',
            ckMe: false
        })

        const userLogin = () => {
            // //解构出账号和密码
            // let {loginId,loginPwd} = loginData
            // Login({loginId,loginPwd})

            $router.push('/home')
        }

        //返回数据
        return {
            ...toRefs(loginData),
            userLogin
        }
    },
}
</script>

<style scoped lang='scss'>
.container {
    width: 100%;
    height: 100vh;
    background: linear-gradient(to bottom, rgb(69, 96, 93), lightblue); //渐变色
    display: flex; //改变位置
    justify-content: center; //水平居中
    align-items: center; //垂直居中

    .login {
        width: 400px;
        height: auto;
        border: 1px solid #eee; //边框
        border-radius: 10px; //边框圆角
        color: #eee;
        padding: 10px;

        .item {
            width: auto;
            font-size: 14px;
            display: flex;
            // justify-content: center; //水平居中
            align-items: center; //垂直居中
            margin: 10px 0; //间距，上下和左右

            h2 {
                flex: 1;
                text-align: center; //居中
            }

            span {
                width: 60px;
                text-align: right; //向右对齐
            }

            div {
                flex: 1;
            }
        }

        .btn {
            text-align: center; //居中
        }

    }
}
</style>

