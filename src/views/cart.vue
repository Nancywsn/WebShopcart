<template>
    <el-breadcrumb :separator-icon="ArrowRight">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我的购物车</el-breadcrumb-item>
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
        <!-- current-change 事件来管理选中时触发的事件，它会传入 currentRow，oldCurrentRow -->
        <el-table :data="tableData" stripe style="width: 100%" height="500" highlight-current-row
            @current-change="handleCurrentChange" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" />
            <el-table-column fixed="left" type="index"></el-table-column>
            <el-table-column prop="name" label="商品名称" width="140" />
            <el-table-column prop="shopid" label="店铺" width="140" />
            <el-table-column prop="price" label="单价/元" />
            <el-table-column prop="quantity" label="数量">
                <!--数量选择框 -->
                <template #default="scope">
                    <el-input-number size="small" v-model="scope.row.quantity" :min="1" :max="100"
                        @change="handleChange(scope.row)" />
                </template>
            </el-table-column> />

            <el-table-column fixed="right" label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleRemove(scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-card>
    <div>
        <!-- 底部区域 -->
        <el-footer>
            <span>总计：</span>
            <el-text>{{ sumPrice }}</el-text>
            <span>元</span>
            <el-button type="primary" @click="shopResult">结算</el-button>
        </el-footer>
    </div>
</template>

<script>
import { Search, ArrowRight } from '@element-plus/icons-vue'
import { reactive, ref, toRefs, computed  } from 'vue'
//导航访问后台api
import { list, del } from '../api/cart'

export default {
    name: 'goods',
    setup() {
        const num = ref(1)
        const searchinput = ref('')

        let data = reactive({
            tableData: [],
            sumPrice: 0,
            selectedRows: []
        })

        //加载表格数据
        let loadTable = async () => {
            let r = await list()
            data.tableData = r
        }
        loadTable()

        //删除商品
        let handleRemove = async (row) => {
            console.log(row)

            let r = await del(row)
            if (r) { //如果删除成功
                //刷新表格信息
                loadTable()
            }
        }

        let sumup = (rows) => {
            let sum = 0;
            if (rows) {
                rows.forEach((row) => {
                    console.log(row.quantity)
                    sum += row.quantity * row.price
                    console.log(data.sumPrice)
                })
            } else {
                console.log('nothing')
            }
            return sum
        }

        //复选框事件
        let handleSelectionChange = (rows) => {
            data.sumPrice = 0
            console.log('复选框')
            console.log(rows)
            data.selectedRows = rows
            data.sumPrice = sumup(rows)
        }


        //增减数量触发函数
        const handleChange = (row) => {
            data.sumPrice = 0
            console.log(`商品 ${row.name} 的数量为：${row.quantity}`)
            data.sumPrice = sumup(data.selectedRows)
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
            data.tableData = items
        };

        let shopResult = () => {
            console.log('结算')
        }


        return {
            ...toRefs(data),
            Search,
            ArrowRight,
            num,
            handleRemove,
            shopResult,
            handleSelectionChange,
            handleChange,
            sumup,
            searchinput,
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

    span {
        margin-right: 20px;
    }

    .el-text {
        margin-right: 15px;
    }
}
</style>

