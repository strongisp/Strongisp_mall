//使用封装好的Axios再次对home组件中，每个数据请求进行封装
import { request } from './request'
import Axios from 'axios'

//完整API接口：http:；
export function getHomeMultidata() {
    return request({
        url: '/home/multidata'
    })
}
//完整API接口：http:
//完整API接口：http:
//完整API接口：http:
export function getHomeGoods(type, page) {
    return request({
        url: '/home/data',
        params: {
            type,
            page
        }
    })
}