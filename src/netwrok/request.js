//实例Axios封装
import Axios from 'axios'

export function request(config) {
    const axios = Axios.create({
        baseURL: '已隐藏PAI，不能完全访问',
        timeout: 20000
    })

    axios.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })

    return axios(config)
}
