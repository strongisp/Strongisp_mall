<template>
  <div id="detail">
    <!-- 详情页，导航 -->
    <nav-bar ref="bar">
      <div slot="left" class="back" @click="backClick">
        <img src="~@/assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in navtitle "
          :key="index"
          class="title-item"
          :class="{active:currentIndex===index}"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>

    <div class="isShowPage" v-show="!isShowLoading">
      <!-- 优化移动端滑动效果 -->
      <scroll class="content" ref="scroll" :probe-type="3" @scroll="currentScroll">
        <!-- 轮播 -->
        <detail-swipe :DETswipeData="swipeData" />

        <!-- 详情商品介绍 -->
        <detail-suggest :suggest-data="goodsSuggestData" />

        <!-- 商家店铺展示 -->
        <detail-shop-info :shop-info="shopInfoData" />

        <!-- 商品细节图片展示 -->
        <detail-info :detail-info="detailInfoData" @itemImgLoad="itemImgLoad" />

        <!-- 商品参数展示 -->
        <detail-item-param :item-params="itemParamsData" ref="param" />

        <!-- 商品评论展示 -->
        <detail-rate :rate-data="itemRateData" ref="rate" />

        <!-- 商品推荐 -->
        <div class="goods-title">
          <div>{{recommendTitle}}</div>
        </div>
        <goods-list :goods-list="RecommendData" ref="goods" />

        <!-- 底线提示 -->
        <baseline />
      </scroll>

      <!-- 返回顶部按钮 -->
      <up-back @click.native="backTopClick" v-show="isShowBack" />

      <!-- 底部导航 -->
      <detail-bottom-nav @addCart="addCart" />
    </div>

    <!-- 加载loading展示 -->
    <loading v-show="isShowLoading" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

import GoodsList from "@/components/content/goodsList/GoodsList";
import Baseline from "@/components/content/baseline/Baseline";

import DetailSwipe from "./childrenDetail/DetailSwipe";
import DetailSuggest from "./childrenDetail/DetailSuggest";
import DetailShopInfo from "./childrenDetail/DetailShopInfo";
import DetailInfo from "./childrenDetail/DetailInfo";
import DetailItemParam from "./childrenDetail/DetailItemParam";
import DetailRate from "./childrenDetail/DetailRate";
import DetailBottomNav from "./childrenDetail/DetailBottomNav";

import { debounce } from "@/common/utils";

import { itemListenerMixin, backTopMixin, loadingMixin } from "@/common/mixin";

import {
  getDetailData,
  getGoodsInfo,
  getShopInfo,
  getRecommendData
} from "@/netwrok/detail";

export default {
  name: "Detail",
  components: {
    NavBar,
    Scroll,
    GoodsList,
    Baseline,
    DetailSwipe,
    DetailSuggest,
    DetailShopInfo,
    DetailInfo,
    DetailItemParam,
    DetailRate,
    DetailBottomNav
  },
  //（混入）刷新scroll、置顶、加载loading
  mixins: [itemListenerMixin, backTopMixin, loadingMixin],
  data() {
    return {
      iid: "",
      recommendTitle: "商品推荐",
      navtitle: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
      swipeData: [],
      goodsSuggestData: {},
      shopInfoData: {},
      detailInfoData: {},
      itemParamsData: {},
      itemRateData: {},
      RecommendData: [],
      themeTopYs: [],
      getThemeTopY: null,
      currentIndex: 0,
      IsLoad: false
    };
  },
  created() {
    //获取请求参数（方法1）
    this.iid = this.$route.params.iid;
    //请求数据商品详情数据（方法2）
    getDetailData(this.iid).then(res => {
      console.log(res);
      const data = res.result;
      //保存轮播图数据
      this.swipeData = data.itemInfo.topImages;
      //保存商品介绍数据，放在一个类中（方法2）
      this.goodsSuggestData = new getGoodsInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo
      );
      //保存店铺介绍数据
      this.shopInfoData = new getShopInfo(data.shopInfo);
      //保存商品展示图片数据
      this.detailInfoData = data.detailInfo;
      //保存商品查尺寸规格数据
      this.itemParamsData = data.itemParams;
      //保存商品首评论数据（是否有数据）
      if (data.rate.list) {
        this.itemRateData = data.rate.list[0];
      }
      //隐藏loading
      this.isShowLoading = false;
    });
    //保存推荐商品数据
    getRecommendData().then(res => {
      this.RecommendData = res.data.list;
      // console.log(res);
    });

    //获取组件DOM元素垂直位置，进行防抖（连动1）
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.rate.$el.offsetTop);
      this.themeTopYs.push(this.$refs.goods.$el.offsetTop - 50);
      // console.log(this.themeTopYs);
    }, 100);
  },
  destroyed() {
    //取消全局事件监听
    this.$bus.$off("itmeImageLoad", this.itemImgListener);
  },
  methods: {
    //点击顶部标题的一些特性，流动；
    titleClick(index) {
      this.currentIndex = index;
      //优化数据无法即使获取，却执行该指令
      if (this.IsLoad) {
        //点击对应的index，实现不同的连动位置（连动3）
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 300);
      }
    },
    //点击左上角的返回特性
    backClick() {
      this.$router.go(-1);
    },
    //图片在加载成触发，调用事件总线的防抖刷新（2）
    itemImgLoad() {
      //图片加载完成，刷新scroll
      this.$refs.scroll.refresh();

      //获取组件DOM元素垂直位置（连动2）
      this.$nextTick(() => {
        this.getThemeTopY();
        this.IsLoad = true;
      });
    },
    //获取scroll当前位置（滚动位置对应标题高亮1）
    currentScroll(position) {
      //获取scroll当前Y值，对标题进行对比判断
      const positionY = -position.y;
      const length = this.themeTopYs.length;
      for (let i in this.themeTopYs) {
        i *= 1;
        if (
          (this.currentIndex !== i &&
            i < length - 1 &&
            positionY >= this.themeTopYs[i] &&
            positionY < this.themeTopYs[i + 1]) ||
          (this.currentIndex !== i &&
            i === length - 1 &&
            positionY >= this.themeTopYs[i])
        ) {
          this.currentIndex = i;
          this.$refs.bar.currentIndex = this.currentIndex;
        }
      }

      //当前scroll的Y值为1000，显示返回按钮
      this.isShowBack = positionY > 1000;
    },
    //点击加入购物车把当前需要的数据存放到vuex中（购物车2）
    addCart() {
      const product = {};
      product.image = this.swipeData[0];
      product.title = this.goodsSuggestData.title;
      product.style = this.itemRateData.style;
      product.price = this.goodsSuggestData.price;
      product.iid = this.iid;
      //提交mutations
      this.$store.dispatch("addCart", product).then(res => {
        this.$toast.show(res, 2000);
      });
    }
  }
};
</script>
<style scoped>
#detail {
  height: 100%;
  width: 100%;
  position: fixed;
  z-index: 9;
  overflow: hidden;
  background-color: #fff;
}

.isShowPage {
  height: 100%;
}

.nav-bar {
  background-color: #fff;
  box-shadow: 0 -1px 3px rgba(0, 0, 0, 0.3);
}

.title {
  display: flex;
}

.title-item {
  flex: 1;
  font-size: 13px;
  color: #333;
}

.active {
  color: var(--color-high-text);
}

.nav-bar .back {
  color: 14px;
  margin-top: 6px;
}

.content {
  /* height: calc(100vh - 44px - 49px); */
  width: 100%;
  position: absolute;
  top: 44px;
  bottom: 49px;
  overflow: hidden;
}

.goods-title {
  padding: 16px 10px 0px;
  border-top: 5px solid #eee;
  font-size: 18px;
  color: #333;
  font-weight: 600;
}

.goods-title div {
  text-align: center;
  border-bottom: 1px solid #ccc;
  padding-bottom: 10px;
}
</style>