//定义管理员api函数

import {$get,$post} from '../utils/request.js'

//定义登陆方法
export let Login = async (params)=>{
    let data = await $get('/select1',params)
        console.log(data);
}