<template>
  <div id="category">
    <!-- 导航栏 -->
    <nav-bar>
      <div slot="center">{{title}}</div>
    </nav-bar>

    <!-- 左侧主题栏 -->
    <slide-bar :slide-bar-list="categoryList" @slideBarItemClick="slideBarItemClick" />

    <!-- 优化移动端滑动效果 -->
    <scroll class="content" ref="scroll" @scroll="scroll" :probeType="3">
      <!-- 右侧top部分 -->
      <subcategory :category-list="subcategoryList[currentIndex]" />

      <!-- 右侧center，推荐导航部分 -->
      <nav-cat :cat-data="titleList" @catClick="catClick" ref="navCat" />

      <!-- 右侧bottom，商品展示部分 -->
      <goods-list :goodsList="categoryDetailList" />

      <!-- loading加载展示 -->
      <loading v-show="isShowLoading" />

      <!-- 底线提示 -->
      <baseline />
    </scroll>

    <!-- 右侧置顶按钮 -->
    <up-back @click.native="backTopClick" v-show="isShowBack" />
  </div>
</template>

<script>
import { backTopMixin, loadingMixin } from "@/common/mixin";

import NavBar from "@/components/common/navbar/NavBar";
import Scroll from "@/components/common/scroll/Scroll";

import NavCat from "@/components/content/navcat/NavCat";
import GoodsList from "@/components/content/goodsList/GoodsList";
import Baseline from "@/components/content/baseline/Baseline";

import SlideBar from "./childrenCate/SlideBar";
import Subcategory from "./childrenCate/Subcategory";

import {
  getCategory,
  getSubcategory,
  getCategoryDetail
} from "netwrok/category";

export default {
  name: "Category",
  components: {
    NavBar,
    Scroll,
    Baseline,
    NavCat,
    GoodsList,
    SlideBar,
    Subcategory
  },
  //（混入）置顶、loading
  mixins: [backTopMixin, loadingMixin],
  data() {
    return {
      title: "分类",
      //左侧主题栏数据
      categoryList: [],
      currentIndex: 0,
      //分类内容数据
      subcategoryList: [],
      titleList: ["流行", "新款", "精选"],
      categoryDetailList: [],
      //存储key值
      keyList: []
    };
  },
  created() {
    //请求网络数据（2）
    this.getCategory();
  },
  methods: {
    //使用axios实例封装，再次封装为方法，再created中直接调用
    getCategory() {
      //请求分类的左侧分类主题数据（1）
      getCategory().then(res => {
        console.log(res.data.category.list);
        //存储左侧主题栏数据
        this.categoryList = res.data.category.list;
        //渲染数据后读取左侧数据
        this.$nextTick(() => {
          // 读取参数协助右侧top请求对应的数据
          this.getSubcategory(this.categoryList[0].maitKey, 0);
          this.getCategoryDetail(this.categoryList[0].miniWallkey, "pop");
          //初始化push第一个key进去
          this.keyList.push(this.categoryList[0].maitKey);
        });
      });
    },
    //请求左侧对应的右侧top请求数据(3)
    getSubcategory(key, index) {
      getSubcategory(key).then(res => {
        // console.log(this.subcategoryList);
        this.subcategoryList[index] = res.data.list;
        //请求到数据，隐藏loading
        this.isShowLoading = false;
      });
    },
    //请求左侧对应的右侧商品数据(4)
    getCategoryDetail(miniWallkey, type) {
      getCategoryDetail(miniWallkey, type).then(res => {
        this.categoryDetailList = res;
      });
    },
    //监听右侧navCat点击切换商品(5)
    catClick(index) {
      //临时存放数据类型
      const typeList = ["pop", "new", "sell"];
      this.getCategoryDetail(
        this.categoryList[this.currentIndex].miniWallkey,
        typeList[index]
      );
    },
    //监听左侧主题栏的点击(6)
    slideBarItemClick({ maitKey, index }) {
      //请求到数据，显示loading
      this.isShowLoading = true;
      //根据index动态切换右侧top动态效果
      this.currentIndex = index;
      //每次切换分类初始化navCat的下标
      this.$refs.navCat.currentIndex = 0;
      //请求对应的推荐商品列表
      this.getCategoryDetail(
        this.categoryList[this.currentIndex].miniWallkey,
        "pop"
      );
      //点击存储左侧点击的maintkey值
      this.keyList[index] = maitKey;
      //通过点击的下标和参数，请求不同的数据
      this.getSubcategory(this.categoryList[this.currentIndex].maitKey, index);
      //右侧展示区域Y值回归为0
      this.$refs.scroll.scrollTo(0, 0, 0);
    },
    //监听scroll当前位置
    scroll(position) {
      //决定显示或隐藏返回顶部按钮
      this.isShowBack = -position.y > 1000;
    }
  }
};
</script>
<style scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  font-size: 15px;
  font-weight: 600;
}
.content {
  position: fixed;
  top: 44px;
  right: 0;
  bottom: 50px;
  left: 100px;
  overflow: hidden;
}
</style>