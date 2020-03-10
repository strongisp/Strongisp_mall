import { request } from './request'


//完整API：http:
export function getCategory() {
    return request({
        url: '/category'
    })
}

//完整API：http:(此参数为category中的maitKey值)
export function getSubcategory(maitKey) {
    return request({
        url: '/subcategory',
        params: {
            maitKey
        }
    })
}

//完整API：http:(此参数为category中的maitKey值，类型为pop)
export function getCategoryDetail(miniWallkey, type) {
    return request({
        url: '/subcategory/detail',
        params: {
            miniWallkey,
            type
        }
    })
}