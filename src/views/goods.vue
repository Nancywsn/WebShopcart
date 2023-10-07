<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <!-- 点击首页无法使侧边栏取消高亮-->
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图 -->
    <el-card class="box-card">
        <el-row :gutter="20">
            <el-col :span="12">
                <!-- 搜索输入框 -->
                <el-input placeholder="搜素商品" v-model="searchinput" clearable @clear="loadTable()">
                    <template #append>
                        <el-button @click="search()" :icon="Search" />
                    </template>
                </el-input>
            </el-col>
        </el-row>
        <!-- max-height="500" -->
        <el-table :data="tableData" stripe style="width: 100%" height="500">
            <el-table-column fixed="left" prop="id" width="100"></el-table-column>
            <el-table-column prop="name" label="商品名称" width="140" />
            <el-table-column prop="shopid" label="店铺" width="100" />
            <el-table-column prop="sales" label="销量" width="100" />
            <el-table-column prop="stock" label="库存" width="100" />
            <el-table-column prop="price" label="单价/元" width="100" />
            <el-table-column prop="num" label="数量" width="180">
                <!--数量选择框 -->
                <template #default="scope">
                    <el-input-number size="small" v-model="scope.row.num" :min="1" :max="100"
                        @change="handleChange(scope.row)" />
                </template>
            </el-table-column> />
            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleAdd(scope.row)">加入购物车</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <div>
        <!-- 底部区域 -->
        <el-footer>
             <!-- 按下按钮左边高亮不改变？ -->
            <el-button type="primary" @click="tocart">进入购物车</el-button>
        </el-footer>
    </div>
</template>

<script>
import { Search, ArrowRight } from '@element-plus/icons-vue'
import { reactive, ref, toRefs, computed } from 'vue'
import { useRouter } from 'vue-router';
//导航访问后台api
import { list, addtocart } from '../api/goods'

//导入axios
import axios from "axios";

export default {
    name: 'goods',
    setup() {
        const router = useRouter()
        const searchinput = ref('')

        let data = reactive({
            tableData: []
        })

        //加载表格数据
        let loadTable = async () => {
            let r = await list()
            data.tableData = r
        }
        loadTable()

        //执行加入购物车操作
        let handleAdd = (row) => {
            console.log(row);
            let { id } = row
            console.log(id);

            addtocart(row)
        }


        //增减数量出发函数
        const handleChange = (row) => {
            console.log(`商品 ${row.name} 的数量为：${row.num}`);
        }

        const tocart = () => {
            router.push('/cart')
        }

        //搜索商品
        const results = computed(() => {
            return data.tableData.filter(item => item.name.includes(searchinput.value));
        });
        const search = () => {
            let items = results.value;
            items.forEach((item) => {
                console.log(item.name)
            });
            data.tableData=items
        };

        return {
            ...toRefs(data),
            Search,
            searchinput,
            ArrowRight,
            handleAdd,
            handleChange,
            tocart,
            results,
            search,
            loadTable
        }
    }
}
</script>

<style scoped lang='scss'>
.box-card {
    width: 100%;

    .el-table {
        margin-top: 15px;
    }

}

.el-footer {
    height: 10vh;
    background-color: rgb(161, 187, 182);
    display: flex; //改变位置
    justify-content: right; //水平居中
    align-items: center; //垂直居中
}
</style>

