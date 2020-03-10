<template>
  <div id="cart">
    <!-- 顶部导航栏 -->
    <cart-nav-bar />

    <scroll class="content" ref="scroll">
      <!-- 商品列表 -->
      <cart-goods-list />
    </scroll>
    <!-- 商品总计栏 -->
    <cart-bottom-bar />
  </div>
</template>

<script>
import CartNavBar from "./childrenCart/CartNavBar";
import CartGoodsList from "./childrenCart/CartGoodsList";
import CartBottomBar from "./childrenCart/CartBottomBar";
import scroll from "@/components/common/scroll/Scroll";

export default {
  name: "Cart",
  components: {
    CartNavBar,
    CartGoodsList,
    CartBottomBar,
    scroll
  },
  mounted() {},
  //进入页面刷新，scroll内容大小
  activated() {
    this.$refs.scroll.refresh();
  }
};
</script>
<style scoped>
#cart {
  height: 100%;
  width: 100%;
  position: fixed;
}

.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 80px;
  left: 0;
  right: 0;
}
</style>