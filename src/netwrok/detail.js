import { request } from './request'

//完成API：http:
export function getDetailData(iid) {
    return request({
        url: 'detail',
        params: {
            iid
        }
    })
}
//通过类，整合获取到商品介绍的数据（方法1）
export class getGoodsInfo {
    constructor(itemInfo, columns, shopInfo) {
        this.title = itemInfo.title
        this.price = itemInfo.lowNowPrice
        this.oldPrice = itemInfo.oldPrice
        this.desc = itemInfo.discountDesc
        this.descBGC = itemInfo.discountBgColor
        this.columns = columns
        this.services = shopInfo.services
        this.lowPrice = itemInfo.lowPrice
    }
}

export class getShopInfo {
    constructor(shopInfo) {
        this.logo = shopInfo.shopLogo
        this.name = shopInfo.name
        this.fans = shopInfo.cFans
        this.sells = shopInfo.cSells
        this.score = shopInfo.score
        this.goods = shopInfo.cGoods
    }
}

//完整API：http://106.54.54.237:8000/api/wh/recommend
export function getRecommendData() {
    return request({
        url: 'recommend'
    })
}
