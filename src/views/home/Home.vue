<template>
  <div id="home">
    <!-- 顶部导航栏 -->
    <nav-bar class="home-nav">
      <div slot="center">{{title}}</div>
    </nav-bar>
    <nav-cat
      :catData="['流行','新款','精选']"
      class="catstyle"
      @catClick="catClick"
      v-show="isShowCatTop"
      ref="navCat1"
    />

    <!-- 优化移动端滑动效果 -->
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      @scroll="currentScroll"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <!-- 版权声明 -->
      <home-pull-refresh @refresh="onRefresh" ref="refresh">
        <van-notice-bar
          mode="closeable"
          color="#ff5777"
          background="rgb(245, 245, 245)"
        >本页面为vue_高仿蘑菇街项目，作者:Strongisp， 如有侵犯联系作者q:1461808904</van-notice-bar>

        <!-- 轮播图 -->
        <swipe :banner="bannerData" @swipeLoadImg="swipeLoadImg" />

        <!-- 推荐 -->
        <home-recommend :recommend="recommendData" />

        <!-- 推荐图片 -->
        <home-recommend-bg />

        <!-- 小（三）导航 -->
        <nav-cat :catData="['流行','新款','精选']" @catClick="catClick" ref="navCat2" />

        <!-- 首页商品展示 -->
        <goods-list :goods-list="showGoods" />
      </home-pull-refresh>

      <!-- 底线提示 -->
      <van-loading size="30px">正在努力的加载哦...</van-loading>
    </scroll>

    <!-- 置顶按钮 -->
    <up-back @click.native="backTopClick" v-show="isShowBack" />

    <!-- 加载loading展示 -->
    <loading v-show="isShowLoading" />
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";
import Loading from "@/components/common/loading/Loading";

import NavCat from "@/components/content/navcat/NavCat";
import goodsList from "@/components/content/goodsList/GoodsList";

import Swipe from "./childrenHome/HomeSwipe";
import HomeRecommend from "./childrenHome/HomeRecommend";
import HomeRecommendBg from "./childrenHome/HomeRecommendBg";
import HomePullRefresh from "./childrenHome/HomePullRefresh";

import { getHomeMultidata, getHomeGoods } from "@/netwrok/home";

import { itemListenerMixin, backTopMixin, loadingMixin } from "@/common/mixin";

export default {
  name: "Home",
  components: {
    NavBar,
    Scroll,
    Loading,
    NavCat,
    goodsList,
    Swipe,
    HomeRecommend,
    HomeRecommendBg,
    HomePullRefresh
  },
  //（混入）刷新scroll、置顶、loading
  mixins: [itemListenerMixin, backTopMixin, loadingMixin],
  data() {
    return {
      title: "蘑菇街",
      bannerData: [],
      recommendData: [],
      goodsData: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      currentType: "pop",
      catOffSetTop: 0,
      isShowCatTop: false,
      currentY: 0
    };
  },
  created() {
    //获取home的top部分数据（调用方法2）
    this.getHomeMultiData();
    //获取动态商品数据（调用方法2）
    this.getGoodsData("pop");
    this.getGoodsData("new");
    this.getGoodsData("sell");
  },
  //K_A的生命生命周期，设置保存的动态scroll的y值，让切换后回复原来位置（方法1）
  activated() {
    this.$refs.scroll.scroll.y = this.currentY;
    //刷新scroll，解决再次返回home触摸失控
    this.$refs.scroll.refresh();
  },
  deactivated() {
    //K_A的生命生命周期，存储离开时的scroll的Y值
    this.currentY = this.$refs.scroll.getScrollY();
    //取消全局事件监听
    this.$bus.$off("itmeImageLoad", this.itemImgListener);
  },
  computed: {
    //通过currentType动态变量，返回goodsData中的动态key值，并赋值给goods-list组件（navCat2）
    showGoods() {
      return this.goodsData[this.currentType].list;
    }
  },
  methods: {
    //获取上部分数据，并赋值给data中进行保存（封装方法1）
    getHomeMultiData() {
      getHomeMultidata().then(res => {
        //存储轮播数据
        this.bannerData = res.data.banner.list;
        //存储推荐数据
        this.recommendData = res.data.recommend.list;
        //加载loading
        this.isShowLoading = false;
      });
    },
    //存储动态商品数据，并赋值给data中进行保存（封装方法1）
    getGoodsData(type) {
      const page = this.goodsData[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goodsData[type].list.push(...res.data.list);
        this.goodsData[type].page += 1;

        //请求到数据进行scroll内容重新计算
        this.$refs.scroll.finishPullUp();
      });
    },
    //获取NavCat组件的点击回馈,判断点击的index动态改变变量中的key（navCat1）
    catClick(index) {
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      if (this.$refs.navCat1 !== undefined)
        this.$refs.navCat1.currentIndex = index;
      this.$refs.navCat2.currentIndex = index;
    },
    //监听scroll的当前位置
    currentScroll(position) {
      //决定显示或隐藏返回顶部按钮
      this.isShowBack = -position.y > 1000;
      //nav-cat的吸顶,判断（方法2）
      this.isShowCatTop = -position.y > this.catOffSetTop;
    },
    //获取Scroll是否到达底部执行此方法
    loadMore() {
      this.getGoodsData(this.currentType);
    },
    //nav-cat的吸顶,赋值保存（方法2）
    swipeLoadImg() {
      this.catOffSetTop = this.$refs.navCat2.$el.offsetTop;
    },
    //监听下拉刷新事件返回特效操作
    onRefresh() {
      //获取home的top部分数据（调用方法2）
      this.getHomeMultiData();
      //获取动态商品数据（调用方法2）
      this.getGoodsData("pop");
      this.getGoodsData("new");
      this.getGoodsData("sell");
      //判断是否获取到数据，则结束此刷新（注意此出不可判断goods）
      if (this.bannerData.length !== 0 && this.recommendData.length !== 0) {
        this.$refs.refresh.isLoading = false;
      }
      // //解决detail返回home自动会顶层bug
      // this.$refs.scroll.scroll.y = this.currentY;
      // //刷新scroll，解决再次返回home触摸失控
      // this.$refs.scroll.refresh();
    }
  }
};
</script>
<style scoped>
#home {
  height: calc(100vh - 49px);
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  font-size: 15px;
  color: #fff;
  font-weight: 600;

  position: relative;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;

  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.van-notice-bar {
  height: 30px;
  font-size: 12px;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 0px;
  left: 0;
  right: 0;
}

.catstyle {
  position: relative;
  z-index: 9;
}

.van-loading {
  text-align: center;
}
</style>