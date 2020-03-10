// Me config tabbar component
/** 
tab-bar-item 内置属性：
  activeColor：设置活跃状态的字体颜色；
    类型：String；
    默认：red；
*/
<template>
  <tab-bar>
    <tab-bar-item path="/home">
      <img src="@/assets/img/tabbar/home.svg" slot="item-icon" alt />
      <img src="@/assets/img/tabbar/home_active.svg" slot="item-icon-active" alt />
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item path="/category">
      <img src="@/assets/img/tabbar/category.svg" slot="item-icon" alt />
      <img src="@/assets/img/tabbar/category_active.svg" slot="item-icon-active" alt />
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item path="/cart">
      <img src="@/assets/img/tabbar/shopcart.svg" slot="item-icon" alt />
      <img src="@/assets/img/tabbar/shopcart_active.svg" slot="item-icon-active" alt />
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item path="/me">
      <img src="@/assets/img/tabbar/profile.svg" slot="item-icon" alt />
      <img src="@/assets/img/tabbar/profile_active.svg" slot="item-icon-active" alt />
      <div slot="item-text">我的</div>
    </tab-bar-item>
  </tab-bar>
</template>

<script>
import TabBar from "@/components/common/tabbar/TabBar";
import TabBarItem from "@/components/common/tabbar/TabBarItem";
export default {
  name: "",
  components: {
    TabBar,
    TabBarItem
  }
};
</script>
<style scoped>
</style>