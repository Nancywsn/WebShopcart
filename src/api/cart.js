//定义购物车api函数

import {$get,$post} from '../utils/request.js'
import {$msg_s, $msg_e, $confirm} from '../utils/msg.js'

//定义登陆方法
export let list = async ()=>{
    let data = await $get('/cart')

    console.log(data)
    return data
}

//删除
export let del = async (params) =>{
    await $confirm('是否确定删除\t'+params.name)
    //发请求
    let {success} = await $post('/delete',params)
    console.log(success)
    if(success){
        $msg_s('删除成功！')
    }else{
        $msg_e('失败！请重试')
    }
    // alert(message)
    return success

}