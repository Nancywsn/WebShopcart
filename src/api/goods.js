//定义商品api函数

import {$get,$post} from '../utils/request.js'
import {$msg_s, $msg_e} from '../utils/msg.js'

//定义登陆方法
export let list = async ()=>{
    let data = await $get('/select1')

    console.log(data)
    return data 
        

}

export let addtocart = async (params)=>{
    let {success} = await $post('/addtocart',params)
    console.log(success)
    if(success){
        $msg_s('加入购物车成功！')
    }else{
        $msg_e('失败！请重试')
    }
    // alert(message)
    return success
}