<template>
  <div class="shop-info">
    <div class="title">
      <img :src="shopInfo.logo" alt />
      <span>{{shopInfo.name}}</span>
    </div>
    <div class="news">
      <div class="left">
        <div class="fans">
          <div class="num">{{shopInfo.fans | sellCountFilter}}</div>
          <div class="text">{{message[0]}}</div>
        </div>
        <div class="all">
          <div class="num">{{shopInfo.goods}}</div>
          <div class="text">{{message[1]}}</div>
        </div>
      </div>
      <div class="right">
        <div class="score" v-for="(item,index) in shopInfo.score" :key="index">
          <span>{{item.name}}</span>
          <span class="mark">{{item.score}}</span>
          <span class="better" :class="{red:item.isBetter}">{{item.isBetter?'高':'低'}}</span>
        </div>
      </div>
    </div>
    <div class="main-shop">
      <div>
        <a href="http://m.meilishuo.com/">进店逛逛</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailShopInfo",
  props: {
    shopInfo: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  filters: {
    sellCountFilter(value) {
      if (value < 10000) return value;
      return (value / 10000).toFixed(1) + "万";
    }
  },
  data() {
    return {
      message: ["总销量", "全部宝贝"]
    };
  }
};
</script>
<style scoped>
.shop-info {
  height: 210px;
  position: relative;
  padding: 14px 10px 20px;
  background-color: #fff;
  transform: translateZ(0);
}

.title {
  position: relative;
}

.title img {
  height: 46px;
  width: 46px;
  border: 1px solid rgb(118, 118, 118);
  border-radius: 50%;
}

.title span {
  position: absolute;
  top: 14px;
  margin-left: 14px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}

.news {
  padding-top: 16px;
  display: flex;
}

.left,
.right {
  flex: 1;
}

.left {
  display: flex;
  text-align: center;
}

.left::after {
  content: "";
  width: 1px;
  background-color: #bbb;
}

.fans,
.all {
  flex: 1;
  color: #333;
  margin-top: 6px;
}

.fans div,
.all div {
  height: 22px;
  letter-spacing: 1px;
  line-height: 22px;
}

.fans .text,
.all .text {
  font-size: 13px;
}

.score {
  font-size: 12px;

  padding-left: 20px;
  display: flex;
}

.score span {
  margin-right: 12px;
  margin-bottom: 2px;
  color: #333;
}

.score .mark {
  display: inline-block;
  width: 24px;
  margin-right: 10px;
}
.score .better {
  background-color: rgb(9, 247, 84);
  border-radius: 2px;
  color: #fff;
}

.score .red {
  background-color: red;
}

.main-shop {
  margin-top: 24px;
  text-align: center;
  height: 32px;
}

.main-shop div {
  display: inline;
  background-color: #eee;
  padding: 8px 36px;
  border-radius: 6px;
  font-size: 14px;
  color: #333;
}
</style>