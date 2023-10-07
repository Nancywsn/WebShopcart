//请求相关,对axios做封装
//导入nprogress
import NProgress from 'nprogress'
//导入nprogress的样式
import 'nprogress/nprogress.css'

//导入axios
import axios from "axios";

import{BASE_URL} from '../config/conster.js'

//初始化一个axios对象，使用自定义配置新建一个实例
const instance = axios.create({
    //设置请求地址前缀
    baseURL: BASE_URL,
    //请求超时时间
    timeout: 30000,
    //自定义请求头
    //headers: {'X-Custom-Header': 'foobar'}
    headers:{'Content-Type':'application/json'}
  });

// 添加请求拦截器
  instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    NProgress.start();
    return config;
  }, function (error) {
    // 对请求错误做些什么
    NProgress.done();	
    return Promise.reject(error);
  });

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    NProgress.done();	
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    NProgress.done();	
    return Promise.reject(error);
  });

//定义一个get请求方法
//params必须是一个简单对象或 URLSearchParams 对象
  export let $get = async(url,params)=>{
    console.log('get')
    let {data} = await instance.get(url,{params})
    return data
  }

//定义一个post请求方法
export const $post = async (url, params) => {
  console.log('post')
  // 创建一个空的 FormData 对象
  const formData = new FormData  // 将请求体中的数据添加到 FormData 对象中
  Object.keys(params).forEach((key) => {
    formData.append(key, params[key])
  })
  // 发起 post 请求，并将 FormData 对象作为请求体
  const { data } = await instance.post(url, formData)
  return data
}
