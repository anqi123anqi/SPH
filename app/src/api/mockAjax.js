//对于axios进行二次封装
import axios from 'axios'
//引入进度条 nprogress
import nprogress from 'nprogress'
//引入进度条样式
import 'nprogress/nprogress.css'
//start:进度条开始  done:进度条借结束
// console.log(nprogress)

//1.利用axios对象的方法create，去创建一个axios实例
const requests = axios.create({
  //   //配置对象
  baseURL: '/mock',
  //代表请求超时的时间5s
  timeout: 5000,
})
//请求拦截器：在发起请求之前，
requests.interceptors.request.use((config) => {
  //config:配置对象，**headers请求头
  //进度条开始
  nprogress.start()
  return config
})

//响应拦截器：
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数：服务器响应数据之后
    //进度条结束
    nprogress.done()
    return res.data
  },
  (error) => {
    //服务器响应失败的回调函数
    return Promise.reject(new error('Fail'))
  }
)
export default requests
